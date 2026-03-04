const mongoose = require('mongoose');
const DailyQuizQuestion = require('../models/DailyQuizQuestion');
const logger = require('../logger');

require('dotenv').config();

// ════════════════════════════════════════════════════════════════════════════
// DAILY QUIZ QUESTIONS  (40 questions: 10 JS Theory · 10 JS Output · 10 React Theory · 10 React Output)
// ════════════════════════════════════════════════════════════════════════════

const dailyQuizQuestions = [

    // ═══════════════════════════════════════════════════════════════════════
    // JAVASCRIPT – THEORY  (10 questions)
    // ═══════════════════════════════════════════════════════════════════════

    {
        question: 'What is a closure in JavaScript?',
        options: [
            'A function that is immediately invoked when defined',
            'A function that retains access to its outer (lexical) scope even after the outer function has returned',
            'A way to prevent variable hoisting inside functions',
            'A method used to copy objects by value'
        ],
        correctIndex: 1,
        explanation: 'A closure is formed when a function "remembers" variables from its surrounding lexical environment even after the outer function has finished executing. This lets inner functions access outer variables persistently.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['closures', 'scope', 'functions']
    },
    {
        question: 'What is the difference between `null` and `undefined` in JavaScript?',
        options: [
            'They are identical; both mean "no value"',
            '`null` means a variable has been declared but not assigned; `undefined` is an intentional absence of value',
            '`undefined` means a variable has been declared but not assigned; `null` is an intentional empty value set by the programmer',
            '`null` is a number type and `undefined` is a string type'
        ],
        correctIndex: 2,
        explanation: '`undefined` is automatically assigned to variables that have been declared but not given a value. `null` is explicitly assigned by developers to indicate "no value intentionally". typeof null returns "object" (a known quirk), while typeof undefined returns "undefined".',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Easy',
        tags: ['types', 'null', 'undefined']
    },
    {
        question: 'What does the event loop do in JavaScript?',
        options: [
            'It compiles JavaScript code before execution',
            'It monitors the call stack and the callback queue, pushing queued callbacks onto the stack when it is empty',
            'It handles memory allocation and garbage collection',
            'It converts asynchronous code to synchronous code automatically'
        ],
        correctIndex: 1,
        explanation: 'The event loop continuously checks if the call stack is empty. When it is, it moves the first callback from the callback (task) queue to the stack. This is how JavaScript handles asynchronous operations despite being single-threaded.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['event-loop', 'async', 'concurrency']
    },
    {
        question: 'What is hoisting in JavaScript?',
        options: [
            'Moving all code to the top of the file before parsing',
            'The browser\'s mechanism to lazy-load scripts',
            'JavaScript\'s behaviour of moving variable and function declarations to the top of their scope during compilation',
            'Converting var variables into let variables automatically'
        ],
        correctIndex: 2,
        explanation: 'During the compilation phase, JavaScript moves (hoists) declarations of variables (var) and function declarations to the top of their scope. var declarations are hoisted and initialised to undefined; let/const are hoisted but stay in the Temporal Dead Zone until the line of declaration.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['hoisting', 'scope', 'var', 'let', 'const']
    },
    {
        question: 'What is the difference between `==` and `===` in JavaScript?',
        options: [
            'They are identical in all cases',
            '`==` checks value only (with type coercion); `===` checks both value and type (no coercion)',
            '`===` checks value only; `==` checks both value and type',
            '`===` is used only for comparing objects'
        ],
        correctIndex: 1,
        explanation: '`==` performs type coercion before comparing, so `"5" == 5` is true. `===` (strict equality) does not coerce types, so `"5" === 5` is false. It is best practice to use `===` to avoid unexpected coercion bugs.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Easy',
        tags: ['equality', 'coercion', 'operators']
    },
    {
        question: 'What is the purpose of `Promise.all()`?',
        options: [
            'Runs promises one after another and resolves when the last one finishes',
            'Resolves as soon as the first promise resolves',
            'Takes an array of promises and resolves when ALL resolve, or rejects as soon as ANY rejects',
            'Converts synchronous functions into promises'
        ],
        correctIndex: 2,
        explanation: '`Promise.all()` accepts an iterable of promises and returns a single promise that resolves with an array of all resolved values when every input promise resolves. If any promise rejects, the returned promise immediately rejects with that rejection reason.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['promises', 'async', 'Promise.all']
    },
    {
        question: 'What is a prototype in JavaScript?',
        options: [
            'A blueprint class used with the `class` keyword',
            'An object from which other objects inherit properties through the prototype chain',
            'A special kind of array used to store class methods',
            'A reserved keyword to define getters and setters'
        ],
        correctIndex: 1,
        explanation: 'Every JavaScript object has an internal [[Prototype]] link (accessible via `__proto__` or `Object.getPrototypeOf()`). When a property or method is not found on an object, JavaScript looks up the prototype chain until it finds it or reaches null.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['prototype', 'inheritance', 'OOP']
    },
    {
        question: 'Which statement is TRUE about `let` vs `var`?',
        options: [
            '`var` is block-scoped; `let` is function-scoped',
            '`let` is block-scoped and not accessible before its declaration; `var` is function-scoped and hoisted to undefined',
            '`let` and `var` behave identically inside loops',
            '`var` cannot be re-declared while `let` can be re-declared in the same scope'
        ],
        correctIndex: 1,
        explanation: '`let` is block-scoped (lives only inside the `{}` where it is declared) and is in the Temporal Dead Zone until the declaration line. `var` is function-scoped, is hoisted, and initialised to `undefined`, making it accessible (as undefined) before the line of declaration.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Easy',
        tags: ['let', 'var', 'scope', 'hoisting']
    },
    {
        question: 'What does `Array.prototype.reduce()` do?',
        options: [
            'Removes duplicate elements from an array',
            'Executes a reducer function on each element, accumulating a single output value',
            'Filters out falsy values from an array',
            'Returns a new array of the same length with each element transformed'
        ],
        correctIndex: 1,
        explanation: '`reduce((accumulator, currentValue) => ..., initialValue)` iterates over the array, passing the accumulated result and the current element through the callback. The final accumulated value is returned. It is highly versatile: you can build sums, objects, flattened arrays, etc.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['array', 'reduce', 'higher-order-functions']
    },
    {
        question: 'What is the difference between `call()`, `apply()`, and `bind()`?',
        options: [
            'They are all identical — just different syntax',
            '`call()` and `apply()` invoke the function immediately with a given `this`; `bind()` returns a new function bound to the given `this`',
            '`bind()` invokes immediately; `call()` and `apply()` return new functions',
            '`apply()` sets `this` permanently; `call()` and `bind()` set it only for one call'
        ],
        correctIndex: 1,
        explanation: 'All three let you set `this` explicitly. `call(thisArg, arg1, arg2)` invokes now with individual args. `apply(thisArg, [args])` invokes now with an array. `bind(thisArg)` returns a new function with `this` permanently bound — useful for callbacks and partial application.',
        category: 'javascript',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['call', 'apply', 'bind', 'this']
    },

    // ═══════════════════════════════════════════════════════════════════════
    // JAVASCRIPT – OUTPUT  (10 questions)
    // ═══════════════════════════════════════════════════════════════════════

    {
        question: 'What is the output of the following code?\n\n```js\nconsole.log(typeof null);\n```',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
        explanation: '`typeof null` returns `"object"` — a long-standing bug in JavaScript that was never fixed to preserve backward compatibility. `null` is its own primitive type, but `typeof` reports it as `"object"`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['typeof', 'null', 'quirks']
    },
    {
        question: 'What is logged to the console?\n\n```js\nconsole.log(0.1 + 0.2 === 0.3);\n```',
        options: ['true', 'false', 'TypeError', 'NaN'],
        correctIndex: 1,
        explanation: 'Due to floating-point precision issues in IEEE 754, `0.1 + 0.2` equals `0.30000000000000004`, not exactly `0.3`. Therefore the strict equality check returns `false`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['floating-point', 'precision', 'quirks']
    },
    {
        question: 'What does this code print?\n\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```',
        options: ['0 1 2', '3 3 3', '0 0 0', 'undefined undefined undefined'],
        correctIndex: 1,
        explanation: 'Because `var` is function-scoped (not block-scoped), all three closures share the SAME `i`. By the time the timeouts fire, the loop has finished and `i` is `3`. Use `let` instead to create a new binding per iteration.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['closures', 'var', 'setTimeout', 'loop']
    },
    {
        question: 'What is the output?\n\n```js\nconsole.log(1 + "2" + 3);\n```',
        options: ['"123"', '6', '"33"', '"15"'],
        correctIndex: 0,
        explanation: 'JavaScript evaluates left-to-right. `1 + "2"` triggers string coercion → `"12"`. Then `"12" + 3` → `"123"`. Once a string enters a `+` chain, subsequent operands are also coerced to strings.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['coercion', 'operators', 'strings']
    },
    {
        question: 'What does this print?\n\n```js\nconsole.log([] + []);\nconsole.log([] + {});\nconsole.log({} + []);\n```',
        options: [
            '"" then "[object Object]" then "[object Object]"',
            '"[][]" then "{}[]" then "{}"',
            '"" then "[object Object]" then 0',
            'All three print "[object Object]"'
        ],
        correctIndex: 0,
        explanation: '`[] + []` → both arrays coerce to `""` → `""`. `[] + {}` → `""` + `"[object Object]"` → `"[object Object]"`. `{} + []` — when `{}` is a statement (not an object literal), it is treated as an empty block, so this becomes `+[]` = `0`. But inside `console.log()` the `{}` is an expression, so it evaluates like `[] + {}` → `"[object Object]"`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Hard',
        tags: ['coercion', 'objects', 'arrays', 'quirks']
    },
    {
        question: 'What is printed?\n\n```js\nfunction foo() {\n  console.log(x);\n  var x = 5;\n}\nfoo();\n```',
        options: ['5', 'ReferenceError', 'undefined', 'null'],
        correctIndex: 2,
        explanation: 'Due to hoisting, `var x` is moved to the top of `foo` and initialised to `undefined`. The `console.log(x)` runs before the assignment `x = 5`, so it prints `undefined`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['hoisting', 'var', 'undefined']
    },
    {
        question: 'What is the output?\n\n```js\nconst a = [1, 2, 3];\nconst b = a;\nb.push(4);\nconsole.log(a);\n```',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'TypeError', '[4]'],
        correctIndex: 1,
        explanation: 'Arrays (and objects) are assigned by reference in JavaScript. `b` points to the same array in memory as `a`. Pushing to `b` mutates the shared array, so `a` also shows `[1, 2, 3, 4]`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['reference-types', 'arrays', 'mutation']
    },
    {
        question: 'What is logged?\n\n```js\nasync function getData() {\n  return 42;\n}\nconsole.log(getData());\n```',
        options: ['42', 'undefined', 'Promise { 42 }', 'Promise { <pending> }'],
        correctIndex: 3,
        explanation: 'An `async` function always returns a Promise. When called, it returns `Promise { <pending> }` at the point of the `console.log`. The resolved value (42) is accessible only via `.then()` or `await`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['async', 'promises', 'async-await']
    },
    {
        question: 'What is the output?\n\n```js\nconst obj = { a: 1, b: 2 };\nconst { a, ...rest } = obj;\nconsole.log(rest);\n```',
        options: ['{ a: 1, b: 2 }', '{ b: 2 }', '{ a: 1 }', 'undefined'],
        correctIndex: 1,
        explanation: 'The rest syntax (`...rest`) in destructuring collects all remaining own enumerable properties into a new object. After extracting `a`, only `b` is left, so `rest` is `{ b: 2 }`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['destructuring', 'spread', 'rest', 'objects']
    },
    {
        question: 'What does this code log?\n\n```js\nconsole.log(!!0, !!1, !!"", !!"hello");\n```',
        options: [
            'false true false true',
            'true false true false',
            '0 1 "" "hello"',
            'false false false true'
        ],
        correctIndex: 0,
        explanation: 'The double-negation `!!` converts any value to its boolean equivalent. `0` and `""` are falsy → `false`; `1` and any non-empty string are truthy → `true`. Output: `false true false true`.',
        category: 'javascript',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['truthy-falsy', 'boolean', 'type-coercion']
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REACT – THEORY  (10 questions)
    // ═══════════════════════════════════════════════════════════════════════

    {
        question: 'What is the purpose of the `useEffect` hook in React?',
        options: [
            'To create reusable stateful logic for sharing between components',
            'To manage complex state transitions with actions and reducers',
            'To perform side effects (data fetching, subscriptions, DOM mutations) after render',
            'To memoize expensive calculations and avoid unnecessary re-renders'
        ],
        correctIndex: 2,
        explanation: '`useEffect` lets you synchronise a component with external systems. It runs after every render by default, but you can control when it re-runs with a dependency array. Returning a cleanup function from it handles teardown (e.g., clearing timers, unsubscribing).',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Easy',
        tags: ['hooks', 'useEffect', 'side-effects']
    },
    {
        question: 'What is the Virtual DOM in React?',
        options: [
            'A browser API that renders components faster than the real DOM',
            'A lightweight in-memory representation of the real DOM that React uses to batch and minimise actual DOM updates',
            'A separate thread React uses to render components in parallel',
            'The JSX syntax tree before it is transpiled to JavaScript'
        ],
        correctIndex: 1,
        explanation: 'React maintains a lightweight JavaScript object tree (Virtual DOM) that mirrors the real DOM. When state changes, React creates a new Virtual DOM snapshot, diffs it against the previous one (reconciliation), and applies only the minimal set of real DOM changes —  making updates efficient.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Easy',
        tags: ['virtual-dom', 'reconciliation', 'performance']
    },
    {
        question: 'What is the difference between controlled and uncontrolled components in React?',
        options: [
            'Controlled components use class syntax; uncontrolled use function syntax',
            'In a controlled component the form data is driven by React state; in an uncontrolled component the data is managed by the DOM itself (via refs)',
            'Controlled components are rendered only once; uncontrolled components re-render on every keystroke',
            'Controlled components require Redux; uncontrolled components use local state'
        ],
        correctIndex: 1,
        explanation: 'A controlled component binds its input value to React state (`value={state}` + `onChange`). React is the single source of truth. An uncontrolled component lets the DOM handle its own state; you read values using a `ref`. Controlled components give you more predictable, testable behaviour.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['forms', 'controlled', 'uncontrolled', 'refs']
    },
    {
        question: 'When does React re-render a component?',
        options: [
            'Only when `forceUpdate()` is called explicitly',
            'Whenever the parent re-renders, regardless of props',
            'When its state or props change, or when its parent re-renders (unless memoised)',
            'Only when the browser window is resized'
        ],
        correctIndex: 2,
        explanation: 'React re-renders a component when: (1) its own state changes via `setState` / a state setter, (2) its props change because the parent passed new values, or (3) the parent re-renders (even if props are the same — unless `React.memo` is used). Context value changes also trigger re-renders for subscribed consumers.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['re-render', 'state', 'props', 'performance']
    },
    {
        question: 'What is the `key` prop used for in React lists?',
        options: [
            'To encrypt list item data before rendering',
            'To give each list item a unique CSS class automatically',
            'To help React identify which items have changed, been added, or removed during reconciliation',
            'To control the tab order of focusable elements inside a list'
        ],
        correctIndex: 2,
        explanation: 'The `key` prop is a special hint to React\'s reconciliation algorithm. When a list re-renders, React uses keys to match elements between renders. Stable, unique keys (e.g., IDs) allow React to update only changed items instead of recreating the entire list.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Easy',
        tags: ['keys', 'lists', 'reconciliation']
    },
    {
        question: 'What does `React.memo()` do?',
        options: [
            'Memoises the return value of an expensive calculation inside a component',
            'Wraps a component so React skips re-rendering it if its props have not changed (shallow comparison)',
            'Stores the previous state value for comparison in `useEffect`',
            'Prevents a component from being garbage collected when unmounted'
        ],
        correctIndex: 1,
        explanation: '`React.memo` is a higher-order component that wraps a functional component. React will skip re-rendering it if the previous and next props are shallowly equal. For deep comparisons you can pass a custom `areEqual` function as the second argument.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['memo', 'performance', 'optimisation']
    },
    {
        question: 'What is the purpose of `useCallback` hook?',
        options: [
            'To memoize the result of an expensive computation',
            'To return a memoised callback function that only changes when its dependencies change',
            'To subscribe to a context value and re-run when it changes',
            'To delay the invocation of a function until after the next render'
        ],
        correctIndex: 1,
        explanation: '`useCallback(fn, deps)` returns the same function reference between renders unless one of the dependencies changes. This is useful when passing callbacks to memoised child components (`React.memo`) to prevent unnecessary re-renders caused by new function references on each render.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['useCallback', 'hooks', 'performance', 'memoization']
    },
    {
        question: 'What is Context API in React used for?',
        options: [
            'Managing server-side state and caching API responses',
            'Passing data through the component tree without manually threading props at every level',
            'Creating global event listeners for DOM events',
            'Replacing all useState hooks with a centralised store'
        ],
        correctIndex: 1,
        explanation: 'React Context lets you share values (theme, user, locale, etc.) across many components without "prop drilling". You create a context with `React.createContext`, provide a value with `<Context.Provider>`, and consume it with `useContext` in any descendant component.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['context', 'prop-drilling', 'state-management']
    },
    {
        question: 'What is the role of the dependency array in `useEffect`?',
        options: [
            'It lists all the side effects the effect should perform',
            'It controls when the effect re-runs: the effect is only re-executed when one of the listed values changes',
            'It declares which state variables the effect is allowed to read',
            'It is mandatory and causes a build error if omitted'
        ],
        correctIndex: 1,
        explanation: 'The dependency array tells React when to re-run the effect. `[]` → runs only on mount (and cleanup on unmount). `[a, b]` → re-runs when `a` or `b` changes. Omitting it entirely → runs after every render. Including all values read inside the effect prevents stale-closure bugs.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['useEffect', 'dependencies', 'hooks']
    },
    {
        question: 'What does `useReducer` offer over `useState`?',
        options: [
            'It is always faster and should replace useState everywhere',
            'It allows components to share state without Context or Redux',
            'It is better suited for complex state logic with multiple sub-values or when the next state depends on the previous',
            'It automatically persists state to localStorage'
        ],
        correctIndex: 2,
        explanation: '`useReducer(reducer, initialState)` is preferable when: state has multiple sub-fields that update together, the next state calculation is complex, or you want to centralise state logic in a pure reducer function (similar to Redux). For simple, independent values `useState` is simpler.',
        category: 'react',
        questionType: 'theory',
        difficulty: 'Medium',
        tags: ['useReducer', 'useState', 'state-management', 'hooks']
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REACT – OUTPUT  (10 questions)
    // ═══════════════════════════════════════════════════════════════════════

    {
        question: 'How many times does this component render after the button is clicked once?\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <button onClick={() => {\n      setCount(count + 1);\n      setCount(count + 1);\n    }}>\n      {count}\n    </button>\n  );\n}\n```',
        options: [
            'Renders once, count becomes 2',
            'Renders twice, count becomes 2 after second render',
            'Renders once, count becomes 1 (both setCount calls use the same stale value)',
            'Renders twice, count becomes 1 after second render'
        ],
        correctIndex: 2,
        explanation: 'Both `setCount(count + 1)` calls use the same captured `count` value (0 in this example), so both schedule an update to `0 + 1 = 1`. React batches them and applies the update once, resulting in count = 1. To get count = 2, use the functional form: `setCount(prev => prev + 1)`.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['useState', 'batching', 'stale-closure']
    },
    {
        question: 'What will be rendered on the initial load?\n\n```jsx\nfunction App() {\n  const [data, setData] = React.useState(null);\n  React.useEffect(() => {\n    setData("loaded");\n  }, []);\n  return <div>{data ? data : "loading"}</div>;\n}\n```',
        options: [
            '"loaded" immediately',
            '"loading" then "loaded" after effect runs',
            'Nothing — null causes an error',
            '"loading" permanently because the effect has an empty dependency array'
        ],
        correctIndex: 1,
        explanation: 'React renders the component first (with `data = null`, so "loading" appears), commits the DOM, then runs the `useEffect`. The effect calls `setData("loaded")`, triggering a re-render that shows "loaded". So the sequence is: loading → loaded.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['useEffect', 'useState', 'rendering-cycle']
    },
    {
        question: 'What is the issue and result of this code?\n\n```jsx\nfunction App() {\n  const [count, setCount] = React.useState(0);\n  React.useEffect(() => {\n    setCount(count + 1);\n  });\n  return <div>{count}</div>;\n}\n```',
        options: [
            'Renders correctly, showing 1',
            'Causes an infinite re-render loop',
            'Shows 0 because the effect runs after render and is ignored',
            'Throws a React error: "Too many state updates"'
        ],
        correctIndex: 1,
        explanation: 'The effect has NO dependency array, so it runs after EVERY render. It calls `setCount`, which triggers a re-render, which triggers the effect again — resulting in an infinite loop. To run once, use `[]`. To react to specific values, list them as dependencies.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['useEffect', 'infinite-loop', 'dependencies']
    },
    {
        question: 'What does this component render?\n\n```jsx\nfunction Greet({ name }) {\n  return <p>Hello, {name || "Guest"}!</p>;\n}\n// Usage:\n<Greet />\n```',
        options: [
            '"Hello, !"',
            '"Hello, undefined!"',
            '"Hello, Guest!"',
            'Nothing — a prop without a value throws an error'
        ],
        correctIndex: 2,
        explanation: 'When `name` is not passed, its value is `undefined`. In JavaScript, `undefined || "Guest"` evaluates to `"Guest"` because `undefined` is falsy. So the component renders "Hello, Guest!".',
        category: 'react',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['props', 'default-values', 'OR-operator']
    },
    {
        question: 'What is rendered by this JSX?\n\n```jsx\nfunction List() {\n  const items = [];\n  return (\n    <ul>\n      {items.length && <li>Item</li>}\n    </ul>\n  );\n}\n```',
        options: [
            'An empty `<ul>`',
            '`<ul><li>Item</li></ul>`',
            '`<ul>0</ul>` — the number 0 is rendered',
            'Nothing is rendered'
        ],
        correctIndex: 2,
        explanation: 'This is a common React gotcha. `items.length` is `0` (a number). `0 && <li>Item</li>` short-circuits to `0`. React renders numbers, so `0` appears in the DOM. To avoid this, use a boolean: `items.length > 0 && <li>Item</li>` or a ternary.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['conditional-rendering', 'short-circuit', 'gotchas']
    },
    {
        question: 'What value does `count` have after clicking the button once?\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = React.useState(0);\n  const increment = React.useCallback(() => {\n    setCount(prev => prev + 1);\n  }, []);\n  return <button onClick={increment}>{count}</button>;\n}\n```',
        options: ['0', '1', '2', 'NaN'],
        correctIndex: 1,
        explanation: 'The functional updater form `setCount(prev => prev + 1)` always uses the latest state value regardless of stale closures. Even though `useCallback` has an empty dep array (and `increment` never changes), the state updates correctly to 1.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['useCallback', 'useState', 'functional-updater']
    },
    {
        question: 'What happens when this component mounts and then unmounts?\n\n```jsx\nReact.useEffect(() => {\n  const id = setInterval(() => console.log("tick"), 1000);\n  return () => clearInterval(id);\n}, []);\n```',
        options: [
            'Sets up the interval on mount; does NOT clear it on unmount',
            'Sets up the interval on mount; clears it when the component unmounts',
            'Runs the interval cleanup immediately without starting it',
            'Throws an error because cleanup functions cannot have arguments'
        ],
        correctIndex: 1,
        explanation: 'The effect runs once on mount (empty dep array) and starts the interval. The returned cleanup function is called by React when the component unmounts, clearing the interval. This is the correct pattern for managing subscriptions and timers in React.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['useEffect', 'cleanup', 'setInterval']
    },
    {
        question: 'What is rendered `<b>` when `show` is `false`?\n\n```jsx\nfunction App() {\n  const [show, setShow] = React.useState(false);\n  return (\n    <div>\n      {show && <span>Visible</span>}\n      <b>{show ? "yes" : "no"}</b>\n    </div>\n  );\n}\n```',
        options: ['"yes"', '"no"', 'Nothing', '"false"'],
        correctIndex: 1,
        explanation: 'The ternary `show ? "yes" : "no"` evaluates the else branch when `show` is `false`, so `<b>` renders "no". The `{show && <span>}` part renders nothing because `false` is not rendered by React.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['conditional-rendering', 'ternary', 'useState']
    },
    {
        question: 'What does `useMemo` return in this example?\n\n```jsx\nconst doubled = React.useMemo(() => {\n  return [1, 2, 3].map(n => n * 2);\n}, []);\nconsole.log(doubled);\n```',
        options: ['A Promise resolving to [2, 4, 6]', '[2, 4, 6]', 'A memoised function', '[1, 2, 3]'],
        correctIndex: 1,
        explanation: '`useMemo` executes the factory function and returns its RESULT (not the function itself). Here it returns `[2, 4, 6]`. The value is memoised — React will not recompute it unless the dependencies change (in this case, never, since the dep array is empty).',
        category: 'react',
        questionType: 'output',
        difficulty: 'Easy',
        tags: ['useMemo', 'hooks', 'memoization']
    },
    {
        question: 'How many times does `console.log("render")` print when the button is clicked once?\n\n```jsx\nconst Child = React.memo(({ label }) => {\n  console.log("render");\n  return <span>{label}</span>;\n});\nfunction Parent() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n      <Child label="fixed" />\n    </>\n  );\n}\n```',
        options: ['0 — Child never re-renders', '1 — Child re-renders once with Parent', '2 — Parent and Child both log', 'Depends on React version'],
        correctIndex: 0,
        explanation: '`React.memo` wraps `Child` and shallow-compares its props. Since `label` is always the string `"fixed"` (same reference between renders), React skips re-rendering `Child`. `console.log("render")` is only called on the initial mount, not on the button click.',
        category: 'react',
        questionType: 'output',
        difficulty: 'Medium',
        tags: ['memo', 'performance', 're-render', 'props']
    }
];

// ════════════════════════════════════════════════════════════════════════════
// SEEDER FUNCTION
// ════════════════════════════════════════════════════════════════════════════

const seedDailyQuizQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('MongoDB connected for daily quiz seeder');

        // ── 1. Drop any stale indexes that don't belong to this schema ──────
        // A leftover `order_1` unique index causes bulk-write failures because
        // none of our questions have an `order` field (all would be null).
        try {
            await DailyQuizQuestion.collection.dropIndex('order_1');
            logger.info('Dropped stale index: order_1');
        } catch (_) {
            // Index didn't exist — that's fine, continue.
        }

        // ── 2. Clear existing documents so the seeder is idempotent ─────────
        const deleted = await DailyQuizQuestion.deleteMany({});
        if (deleted.deletedCount > 0) {
            logger.info(`Cleared ${deleted.deletedCount} existing daily quiz question(s).`);
        }

        // ── 3. Insert fresh questions ────────────────────────────────────────
        await DailyQuizQuestion.insertMany(dailyQuizQuestions);
        logger.info(`Successfully seeded ${dailyQuizQuestions.length} daily quiz questions.`);

        // Print summary
        const jsTh = dailyQuizQuestions.filter(q => q.category === 'javascript' && q.questionType === 'theory').length;
        const jsOp = dailyQuizQuestions.filter(q => q.category === 'javascript' && q.questionType === 'output').length;
        const rxTh = dailyQuizQuestions.filter(q => q.category === 'react'      && q.questionType === 'theory').length;
        const rxOp = dailyQuizQuestions.filter(q => q.category === 'react'      && q.questionType === 'output').length;
        logger.info(`Breakdown → JS Theory: ${jsTh} | JS Output: ${jsOp} | React Theory: ${rxTh} | React Output: ${rxOp}`);

        await mongoose.disconnect();
        logger.info('MongoDB disconnected');
        process.exit(0);
    } catch (error) {
        logger.error('Daily quiz seeder failed:', error);
        process.exit(1);
    }
};

seedDailyQuizQuestions();
