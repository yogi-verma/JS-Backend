const mongoose = require('mongoose');
const InterviewQuestion = require('../models/InterviewQuestion');
const logger = require('../logger');

const interviewQuestionsData = [
    // ═══════════════════════════════════════════════════
    // EASY QUESTIONS (1-10)
    // ═══════════════════════════════════════════════════
    {
        question: 'What is the difference between var, let, and const?',
        answer: 'var is function-scoped and hoisted with undefined. let and const are block-scoped and in temporal dead zone until initialized. const cannot be reassigned after declaration.',
        codingExamples: [
            {
                title: 'var - Function Scoped',
                code: `function example() {
    if (true) {
        var x = 10;
    }
    console.log(x); // 10 — var is function-scoped
}
example();`,
                explanation: 'var is accessible outside the if block because it is function-scoped, not block-scoped.'
            },
            {
                title: 'let - Block Scoped',
                code: `function example() {
    if (true) {
        let y = 20;
        console.log(y); // 20
    }
    // console.log(y); // ReferenceError: y is not defined
}
example();`,
                explanation: 'let is block-scoped, so it cannot be accessed outside the if block.'
            },
            {
                title: 'const - Cannot Reassign',
                code: `const PI = 3.14;
// PI = 3.15; // TypeError: Assignment to constant variable

const obj = { name: 'John' };
obj.name = 'Jane'; // This works — const prevents reassignment, not mutation
console.log(obj.name); // 'Jane'`,
                explanation: 'const prevents reassignment of the variable itself, but object properties can still be modified.'
            }
        ],
        difficulty: 'Easy',
        order: 1,
        category: 'Variables & Scope'
    },
    {
        question: 'What is hoisting?',
        answer: 'JavaScript\'s behavior of moving declarations to the top of scope during compilation. Function declarations are fully hoisted; var is hoisted with undefined; let/const are hoisted but in temporal dead zone.',
        codingExamples: [
            {
                title: 'Function Declaration Hoisting',
                code: `greet(); // "Hello!" — works because function declarations are fully hoisted

function greet() {
    console.log("Hello!");
}`,
                explanation: 'Function declarations are fully hoisted — both the name and the body are moved to the top.'
            },
            {
                title: 'var Hoisting',
                code: `console.log(x); // undefined — var is hoisted but initialized as undefined
var x = 5;
console.log(x); // 5`,
                explanation: 'var declarations are hoisted to the top, but the assignment stays in place. So x exists but is undefined until the assignment line.'
            },
            {
                title: 'let/const Temporal Dead Zone',
                code: `// console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
console.log(a); // 10

// console.log(b); // ReferenceError
const b = 20;`,
                explanation: 'let and const are hoisted but remain in the Temporal Dead Zone (TDZ) until the declaration is reached.'
            }
        ],
        difficulty: 'Easy',
        order: 2,
        category: 'Variables & Scope'
    },
    {
        question: 'What are JavaScript data types?',
        answer: '8 types: 7 primitives (String, Number, Boolean, Undefined, Null, Symbol, BigInt) and 1 reference type (Object). Primitives are immutable and stored by value; objects are mutable and stored by reference.',
        codingExamples: [
            {
                title: 'Primitive Types',
                code: `let str = "Hello";        // String
let num = 42;             // Number
let bool = true;          // Boolean
let undef = undefined;    // Undefined
let nul = null;           // Null
let sym = Symbol("id");   // Symbol
let big = 9007199254740991n; // BigInt

console.log(typeof str);   // "string"
console.log(typeof num);   // "number"
console.log(typeof bool);  // "boolean"
console.log(typeof undef); // "undefined"
console.log(typeof nul);   // "object" (known bug)
console.log(typeof sym);   // "symbol"
console.log(typeof big);   // "bigint"`,
                explanation: 'JavaScript has 7 primitive types. Note that typeof null returns "object" which is a historical bug in JavaScript.'
            },
            {
                title: 'Reference Type (Object)',
                code: `let obj = { name: "John" };
let arr = [1, 2, 3];
let func = function() {};

// Stored by reference
let obj2 = obj;
obj2.name = "Jane";
console.log(obj.name); // "Jane" — both point to same object

// Primitives are stored by value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 — a is unchanged`,
                explanation: 'Objects are stored by reference. When you assign an object to another variable, both variables point to the same object in memory.'
            }
        ],
        difficulty: 'Easy',
        order: 3,
        category: 'Data Types'
    },
    {
        question: 'What is == vs ===?',
        answer: '== performs type coercion before comparison. === checks both value and type without conversion. Example: 5 == \'5\' is true but 5 === \'5\' is false.',
        codingExamples: [
            {
                title: 'Loose Equality (==)',
                code: `console.log(5 == '5');     // true — string '5' is coerced to number 5
console.log(0 == false);   // true — false is coerced to 0
console.log(null == undefined); // true — special case
console.log('' == 0);      // true — empty string coerced to 0`,
                explanation: '== (loose equality) converts the operands to the same type before comparing. This can lead to unexpected results.'
            },
            {
                title: 'Strict Equality (===)',
                code: `console.log(5 === '5');    // false — different types (number vs string)
console.log(0 === false);  // false — different types (number vs boolean)
console.log(null === undefined); // false — different types
console.log('' === 0);     // false — different types

console.log(5 === 5);      // true — same type and value
console.log('hello' === 'hello'); // true`,
                explanation: '=== (strict equality) checks both value and type without any conversion. Always prefer === for predictable comparisons.'
            }
        ],
        difficulty: 'Easy',
        order: 4,
        category: 'Operators'
    },
    {
        question: 'What is typeof operator?',
        answer: 'Returns string indicating operand type: "string", "number", "boolean", "undefined", "object", "function", "symbol". Note: typeof null returns "object" (known bug).',
        codingExamples: [
            {
                title: 'typeof with Different Types',
                code: `console.log(typeof "hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" ← known bug!
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" ← arrays are objects
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());    // "symbol"`,
                explanation: 'typeof returns a string indicating the type. Two gotchas: typeof null is "object" (historical bug) and typeof [] is "object" (arrays are objects).'
            },
            {
                title: 'Practical Usage',
                code: `function checkType(value) {
    if (typeof value === 'string') {
        return 'It is a string: ' + value;
    } else if (typeof value === 'number') {
        return 'It is a number: ' + value;
    } else if (typeof value === 'undefined') {
        return 'It is undefined';
    }
    return 'Other type: ' + typeof value;
}

console.log(checkType("hi"));  // "It is a string: hi"
console.log(checkType(42));    // "It is a number: 42"

// Safe check for undefined variables
if (typeof someVar === 'undefined') {
    console.log('someVar is not defined'); // No ReferenceError!
}`,
                explanation: 'typeof is commonly used for type checking. It is especially useful for safely checking if a variable exists without throwing a ReferenceError.'
            }
        ],
        difficulty: 'Easy',
        order: 5,
        category: 'Operators'
    },
    {
        question: 'What are truthy and falsy values?',
        answer: 'Falsy: false, 0, "" (empty string), null, undefined, NaN, 0n. All other values are truthy including "0", "false", [], {}. Used in boolean contexts like if statements.',
        codingExamples: [
            {
                title: 'Falsy Values',
                code: `const falsyValues = [false, 0, "", null, undefined, NaN, 0n];

falsyValues.forEach(val => {
    if (val) {
        console.log(val, '→ truthy');
    } else {
        console.log(val, '→ falsy'); // All print falsy
    }
});`,
                explanation: 'There are exactly 7 falsy values in JavaScript. Everything else is truthy.'
            },
            {
                title: 'Surprising Truthy Values',
                code: `// These are all TRUTHY (common gotchas!)
if ("0")     console.log('"0" is truthy');       // ✓
if ("false") console.log('"false" is truthy');   // ✓
if ([])      console.log('[] is truthy');        // ✓
if ({})      console.log('{} is truthy');        // ✓
if (-1)      console.log('-1 is truthy');        // ✓

// Practical usage
const name = "" || "Default";
console.log(name); // "Default" — empty string is falsy

const count = 0 || 10;
console.log(count); // 10 — 0 is falsy`,
                explanation: 'Empty arrays [], empty objects {}, and strings like "0" or "false" are truthy because they are non-empty values.'
            }
        ],
        difficulty: 'Easy',
        order: 6,
        category: 'Data Types'
    },
    {
        question: 'What is undefined vs null?',
        answer: 'undefined means variable declared but not assigned, or function has no return. null is intentional assignment meaning "no value". typeof undefined is "undefined"; typeof null is "object" (historical bug).',
        codingExamples: [
            {
                title: 'undefined Examples',
                code: `let x;
console.log(x); // undefined — declared but not assigned

function doSomething() {
    // no return statement
}
console.log(doSomething()); // undefined

const obj = { name: "John" };
console.log(obj.age); // undefined — property doesn't exist

console.log(typeof undefined); // "undefined"`,
                explanation: 'undefined means a variable exists but has no value assigned. JavaScript gives this automatically in several situations.'
            },
            {
                title: 'null Examples',
                code: `let user = null; // intentionally set to "no value"
console.log(user); // null

// Common pattern: reset a variable
let data = { id: 1, name: "test" };
data = null; // intentionally clearing the reference

console.log(typeof null); // "object" — historical bug!

// Comparison
console.log(null == undefined);  // true (loose)
console.log(null === undefined); // false (strict)`,
                explanation: 'null is explicitly assigned to indicate "no value" or "empty". It is an intentional absence of value, unlike undefined which is automatic.'
            }
        ],
        difficulty: 'Easy',
        order: 7,
        category: 'Data Types'
    },
    {
        question: 'What is the DOM?',
        answer: 'Document Object Model - programming interface for HTML/XML as tree structure. Allows JavaScript to access and manipulate elements, attributes, and styles. Each HTML element becomes a node.',
        codingExamples: [
            {
                title: 'Accessing DOM Elements',
                code: `// Select elements
const heading = document.getElementById('title');
const buttons = document.querySelectorAll('.btn');
const first = document.querySelector('.container p');

// Modify content
heading.textContent = 'New Title';
heading.innerHTML = '<span>Styled Title</span>';

// Modify styles
heading.style.color = 'blue';
heading.style.fontSize = '24px';

// Modify attributes
heading.setAttribute('class', 'main-title');
heading.classList.add('highlight');`,
                explanation: 'The DOM provides methods to select, read, and modify HTML elements. JavaScript can change content, styles, and attributes dynamically.'
            },
            {
                title: 'Creating & Removing Elements',
                code: `// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'greeting';

// Add to page
document.body.appendChild(newDiv);

// Remove element
const oldElement = document.getElementById('old');
oldElement.remove();

// Event listener
newDiv.addEventListener('click', function() {
    console.log('Div clicked!');
});`,
                explanation: 'The DOM allows creating new elements, adding them to the page, removing existing elements, and attaching event listeners.'
            }
        ],
        difficulty: 'Easy',
        order: 8,
        category: 'DOM'
    },
    {
        question: 'What are template literals?',
        answer: 'Use backticks for strings with multi-line support and interpolation. Variables/expressions embedded using ${expression}. Cleaner than concatenation with + operator.',
        codingExamples: [
            {
                title: 'String Interpolation',
                code: `const name = "Alice";
const age = 25;

// Old way (concatenation)
const old = "Hello, " + name + "! You are " + age + " years old.";

// Template literal
const modern = \`Hello, \${name}! You are \${age} years old.\`;

console.log(modern); // "Hello, Alice! You are 25 years old."

// Expressions inside \${}
console.log(\`Next year you'll be \${age + 1}\`);
console.log(\`Is adult: \${age >= 18 ? 'Yes' : 'No'}\`);`,
                explanation: 'Template literals use backticks and ${} for embedding variables and expressions directly in strings.'
            },
            {
                title: 'Multi-line Strings',
                code: `// Old way
const oldHTML = '<div>\\n' +
    '  <h1>Title</h1>\\n' +
    '  <p>Content</p>\\n' +
    '</div>';

// Template literal — preserves whitespace and newlines
const html = \`
<div>
    <h1>Title</h1>
    <p>Content</p>
</div>
\`;

console.log(html);`,
                explanation: 'Template literals preserve line breaks and whitespace, making multi-line strings much cleaner to write.'
            }
        ],
        difficulty: 'Easy',
        order: 9,
        category: 'Strings'
    },
    {
        question: 'What is the spread operator?',
        answer: '... expands iterables into individual elements. Used for array copying [...arr], merging [...arr1, ...arr2], function arguments func(...arr), and object copying {...obj}. Creates shallow copies.',
        codingExamples: [
            {
                title: 'Spread with Arrays',
                code: `const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Copy array
const copy = [...arr1];
console.log(copy); // [1, 2, 3]

// Merge arrays
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Add elements
const withExtra = [0, ...arr1, 4];
console.log(withExtra); // [0, 1, 2, 3, 4]`,
                explanation: 'Spread operator (...) expands array elements. Useful for copying, merging, and inserting elements.'
            },
            {
                title: 'Spread with Objects',
                code: `const user = { name: "John", age: 30 };
const address = { city: "NYC", zip: "10001" };

// Copy object
const userCopy = { ...user };

// Merge objects
const fullProfile = { ...user, ...address };
console.log(fullProfile);
// { name: "John", age: 30, city: "NYC", zip: "10001" }

// Override properties
const updated = { ...user, age: 31, role: "admin" };
console.log(updated);
// { name: "John", age: 31, role: "admin" }`,
                explanation: 'Spread with objects copies all properties. When merging, later properties override earlier ones with the same key.'
            }
        ],
        difficulty: 'Easy',
        order: 10,
        category: 'Operators'
    },

    // ═══════════════════════════════════════════════════
    // MEDIUM QUESTIONS (11-20)
    // ═══════════════════════════════════════════════════
    {
        question: 'What is a closure?',
        answer: 'Function with access to outer function\'s variables even after outer function returns. "Remembers" lexical environment. Useful for data privacy, callbacks, and function factories.',
        codingExamples: [
            {
                title: 'Basic Closure',
                code: `function outer() {
    let count = 0; // private variable

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
// count is not accessible directly, only through inner()`,
                explanation: 'inner() "closes over" the count variable from outer(). Even after outer() finishes, inner() still has access to count.'
            },
            {
                title: 'Closure for Data Privacy',
                code: `function createBankAccount(initialBalance) {
    let balance = initialBalance; // private

    return {
        deposit(amount) {
            balance += amount;
            return \`Deposited \${amount}. Balance: \${balance}\`;
        },
        withdraw(amount) {
            if (amount > balance) return 'Insufficient funds';
            balance -= amount;
            return \`Withdrew \${amount}. Balance: \${balance}\`;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50));  // "Deposited 50. Balance: 150"
console.log(account.withdraw(30)); // "Withdrew 30. Balance: 120"
console.log(account.getBalance()); // 120
// console.log(account.balance);   // undefined — truly private!`,
                explanation: 'Closures enable true data privacy. The balance variable cannot be accessed directly — only through the returned methods.'
            }
        ],
        difficulty: 'Medium',
        order: 11,
        category: 'Functions & Scope'
    },
    {
        question: 'What is the event loop?',
        answer: 'Mechanism for handling async operations in single-threaded environment. Call stack executes code, Web APIs handle async ops, callback queue stores callbacks, event loop moves them to stack when empty.',
        codingExamples: [
            {
                title: 'Event Loop in Action',
                code: `console.log('1. Start');

setTimeout(() => {
    console.log('2. Timeout callback');
}, 0);

Promise.resolve().then(() => {
    console.log('3. Promise callback');
});

console.log('4. End');

// Output order:
// 1. Start
// 4. End
// 3. Promise callback  ← microtask (higher priority)
// 2. Timeout callback   ← macrotask`,
                explanation: 'Even with 0ms timeout, setTimeout runs after synchronous code and promises. Microtasks (Promises) have priority over macrotasks (setTimeout).'
            },
            {
                title: 'Call Stack & Task Queue',
                code: `function first() {
    console.log('first');
}

function second() {
    setTimeout(() => {
        console.log('second');
    }, 0);
}

function third() {
    console.log('third');
}

first();   // Goes to call stack → executes → "first"
second();  // setTimeout goes to Web API → callback to queue
third();   // Goes to call stack → executes → "third"
// Call stack empty → event loop moves "second" callback to stack
// Output: "first", "third", "second"`,
                explanation: 'The event loop continuously checks: Is the call stack empty? If yes, take the next callback from the queue and push it to the stack.'
            }
        ],
        difficulty: 'Medium',
        order: 12,
        category: 'Async JavaScript'
    },
    {
        question: 'What is the this keyword?',
        answer: 'Refers to object executing current function. In methods: owner object; in functions: global object (undefined in strict mode); in arrow functions: lexically inherited from parent. Set explicitly with call/apply/bind.',
        codingExamples: [
            {
                title: 'this in Different Contexts',
                code: `const person = {
    name: "Alice",
    greet() {
        console.log(\`Hi, I'm \${this.name}\`); // this = person
    }
};
person.greet(); // "Hi, I'm Alice"

// Regular function
function showThis() {
    console.log(this); // window (browser) or global (Node)
}
// In strict mode: undefined

// Arrow function — inherits this
const team = {
    name: "Dev Team",
    members: ["Alice", "Bob"],
    show() {
        this.members.forEach(member => {
            console.log(\`\${member} is in \${this.name}\`);
            // Arrow function inherits 'this' from show()
        });
    }
};
team.show();`,
                explanation: 'this depends on HOW the function is called, not where it is defined. Arrow functions are the exception — they inherit this from the enclosing scope.'
            },
            {
                title: 'Explicit Binding with call/apply/bind',
                code: `function introduce(greeting) {
    console.log(\`\${greeting}, I'm \${this.name}\`);
}

const user = { name: "John" };

// call — invoke with specific this
introduce.call(user, "Hello"); // "Hello, I'm John"

// apply — same but args as array
introduce.apply(user, ["Hi"]); // "Hi, I'm John"

// bind — returns new function with bound this
const boundIntro = introduce.bind(user);
boundIntro("Hey"); // "Hey, I'm John"`,
                explanation: 'call and apply invoke immediately with a specific this. bind returns a new function with this permanently set.'
            }
        ],
        difficulty: 'Medium',
        order: 13,
        category: 'Functions & Scope'
    },
    {
        question: 'Arrow functions vs regular functions?',
        answer: 'Use => syntax. No own this (lexically bound), no arguments object, cannot be constructors, implicit return for single expressions. Example: const add = (a, b) => a + b.',
        codingExamples: [
            {
                title: 'Syntax Comparison',
                code: `// Regular function
function add(a, b) {
    return a + b;
}

// Arrow function equivalents
const add1 = (a, b) => { return a + b; };
const add2 = (a, b) => a + b;  // implicit return
const double = x => x * 2;     // single param, no parens needed
const greet = () => 'Hello!';  // no params

console.log(add2(3, 5));  // 8
console.log(double(4));   // 8
console.log(greet());     // "Hello!"`,
                explanation: 'Arrow functions provide shorter syntax. Single expressions have implicit return. Single parameter does not need parentheses.'
            },
            {
                title: 'this Behavior Difference',
                code: `const timer = {
    seconds: 0,

    // Regular function — 'this' is lost in callback
    startBroken() {
        setInterval(function() {
            this.seconds++; // 'this' is window/undefined, NOT timer
            console.log(this.seconds); // NaN
        }, 1000);
    },

    // Arrow function — 'this' inherited from startFixed
    startFixed() {
        setInterval(() => {
            this.seconds++; // 'this' is timer ✓
            console.log(this.seconds); // 1, 2, 3...
        }, 1000);
    }
};`,
                explanation: 'Arrow functions do not have their own this. They inherit it from the enclosing scope, which is why they work correctly inside callbacks.'
            }
        ],
        difficulty: 'Medium',
        order: 14,
        category: 'Functions & Scope'
    },
    {
        question: 'What is the difference between call, apply, and bind?',
        answer: 'All set this value. call: invokes immediately with individual args func.call(obj, a, b). apply: invokes with array func.apply(obj, [a, b]). bind: returns new bound function func.bind(obj).',
        codingExamples: [
            {
                title: 'call vs apply vs bind',
                code: `function greet(greeting, punctuation) {
    return \`\${greeting}, \${this.name}\${punctuation}\`;
}

const user = { name: "Alice" };

// call — pass args individually
console.log(greet.call(user, "Hello", "!"));
// "Hello, Alice!"

// apply — pass args as array
console.log(greet.apply(user, ["Hi", "?"]));
// "Hi, Alice?"

// bind — returns new function, invoke later
const greetAlice = greet.bind(user);
console.log(greetAlice("Hey", "."));
// "Hey, Alice."

const greetAliceHi = greet.bind(user, "Hi");
console.log(greetAliceHi("!!"));
// "Hi, Alice!!"  ← partial application`,
                explanation: 'call and apply invoke the function immediately. bind returns a new function with this permanently set. bind also supports partial application.'
            },
            {
                title: 'Practical Use Case',
                code: `// Borrowing methods
const numbers = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const arr = Array.prototype.slice.call(numbers);
console.log(arr); // ['a', 'b', 'c']

// Math.max with array (apply)
const scores = [85, 92, 78, 95, 88];
const highest = Math.max.apply(null, scores);
console.log(highest); // 95

// Event handler with bind
class Button {
    constructor(label) {
        this.label = label;
    }
    click() {
        console.log(\`\${this.label} clicked\`);
    }
}
const btn = new Button("Submit");
const handler = btn.click.bind(btn); // preserve this
// document.addEventListener('click', handler);`,
                explanation: 'Common patterns: borrowing array methods with call, passing arrays to Math functions with apply, and preserving this in event handlers with bind.'
            }
        ],
        difficulty: 'Medium',
        order: 15,
        category: 'Functions & Scope'
    },
    {
        question: 'What is prototypal inheritance?',
        answer: 'Objects inherit properties/methods through prototype chain. Every object has [[Prototype]] linking to another object. JavaScript searches object, then prototype chain until reaching null.',
        codingExamples: [
            {
                title: 'Prototype Chain',
                code: `const animal = {
    isAlive: true,
    eat() {
        console.log(\`\${this.name} is eating\`);
    }
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.bark = function() {
    console.log("Woof!");
};

dog.eat();  // "Rex is eating" — inherited from animal
dog.bark(); // "Woof!" — own method

console.log(dog.isAlive);  // true — inherited
console.log(dog.hasOwnProperty('name'));    // true
console.log(dog.hasOwnProperty('isAlive')); // false — inherited`,
                explanation: 'dog inherits from animal via the prototype chain. JavaScript looks for properties on the object first, then walks up the chain.'
            },
            {
                title: 'Constructor Functions & Prototype',
                code: `function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Methods on prototype are shared by all instances
Person.prototype.greet = function() {
    return \`Hi, I'm \${this.name}, \${this.age} years old\`;
};

const alice = new Person("Alice", 25);
const bob = new Person("Bob", 30);

console.log(alice.greet()); // "Hi, I'm Alice, 25 years old"
console.log(bob.greet());   // "Hi, I'm Bob, 30 years old"

// Both share the same greet function
console.log(alice.greet === bob.greet); // true`,
                explanation: 'Methods defined on the prototype are shared across all instances, saving memory compared to defining methods inside the constructor.'
            }
        ],
        difficulty: 'Medium',
        order: 16,
        category: 'Objects & Prototypes'
    },
    {
        question: 'What are Promises?',
        answer: 'Represent eventual completion/failure of async operation. Three states: pending, fulfilled, rejected. Use .then() for success, .catch() for errors, .finally() for cleanup. Cleaner than callbacks.',
        codingExamples: [
            {
                title: 'Creating & Using Promises',
                code: `const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "Alice" });
            } else {
                reject(new Error("Invalid ID"));
            }
        }, 1000);
    });
};

fetchUser(1)
    .then(user => console.log(user))     // { id: 1, name: "Alice" }
    .catch(err => console.error(err))
    .finally(() => console.log("Done")); // Always runs`,
                explanation: 'A Promise wraps an async operation. resolve() for success, reject() for failure. .then() handles success, .catch() handles errors, .finally() runs regardless.'
            },
            {
                title: 'Promise Chaining & Utilities',
                code: `// Chaining
fetch('/api/user')
    .then(res => res.json())
    .then(user => fetch(\`/api/posts/\${user.id}\`))
    .then(res => res.json())
    .then(posts => console.log(posts))
    .catch(err => console.error(err));

// Promise.all — wait for all
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
    .then(values => console.log(values)); // [1, 2, 3]

// Promise.race — first to settle
Promise.race([
    new Promise(r => setTimeout(() => r('slow'), 2000)),
    new Promise(r => setTimeout(() => r('fast'), 500))
]).then(result => console.log(result)); // "fast"`,
                explanation: 'Promise chaining avoids callback hell. Promise.all waits for all promises. Promise.race resolves with the first settled promise.'
            }
        ],
        difficulty: 'Medium',
        order: 17,
        category: 'Async JavaScript'
    },
    {
        question: 'What is async/await?',
        answer: 'Syntactic sugar for Promises. async function returns Promise. await pauses execution until Promise resolves. Makes async code look synchronous and easier to debug than .then() chains.',
        codingExamples: [
            {
                title: 'Basic async/await',
                code: `// Promise version
function getUser() {
    return fetch('/api/user')
        .then(res => res.json())
        .then(user => {
            console.log(user);
            return user;
        });
}

// async/await version — much cleaner
async function getUserAsync() {
    const res = await fetch('/api/user');
    const user = await res.json();
    console.log(user);
    return user; // automatically wrapped in Promise
}`,
                explanation: 'async/await makes asynchronous code look and behave like synchronous code. await pauses the function until the promise resolves.'
            },
            {
                title: 'Error Handling with try/catch',
                code: `async function fetchData() {
    try {
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed:', error.message);
        return null;
    } finally {
        console.log('Fetch attempt complete');
    }
}

// Parallel execution with await
async function loadDashboard() {
    // Sequential (slow)
    // const users = await getUsers();
    // const posts = await getPosts();

    // Parallel (fast ✓)
    const [users, posts] = await Promise.all([
        getUsers(),
        getPosts()
    ]);
    return { users, posts };
}`,
                explanation: 'Use try/catch for error handling. Use Promise.all with await for parallel async operations instead of sequential awaits.'
            }
        ],
        difficulty: 'Medium',
        order: 18,
        category: 'Async JavaScript'
    },
    {
        question: 'What is event bubbling and capturing?',
        answer: 'Three phases: capturing (root to target), target, bubbling (target to root). Bubbling is default where events propagate to ancestors. Use event.stopPropagation() to stop or addEventListener(e, h, true) for capturing.',
        codingExamples: [
            {
                title: 'Event Bubbling',
                code: `// HTML: <div id="parent"><button id="child">Click</button></div>

document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent clicked');
});

document.getElementById('child').addEventListener('click', () => {
    console.log('Child clicked');
});

// Clicking the button outputs:
// "Child clicked"  ← target phase
// "Parent clicked"  ← bubbling phase (propagates up)

// Stop bubbling
document.getElementById('child').addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Child clicked — event stops here');
});`,
                explanation: 'By default, events bubble up from the target element to its ancestors. Use stopPropagation() to prevent this.'
            },
            {
                title: 'Capturing & Event Delegation',
                code: `// Capturing phase — add third argument 'true'
document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent (capture)');
}, true); // ← capturing

document.getElementById('child').addEventListener('click', () => {
    console.log('Child');
});

// Clicking child outputs:
// "Parent (capture)"  ← capturing (root to target)
// "Child"             ← target

// Event Delegation — efficient pattern using bubbling
document.getElementById('list').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log('Clicked:', e.target.textContent);
    }
});
// One listener handles clicks on ALL <li> items!`,
                explanation: 'Capturing goes from root to target (opposite of bubbling). Event delegation uses bubbling to handle events on parent instead of each child — great for dynamic lists.'
            }
        ],
        difficulty: 'Medium',
        order: 19,
        category: 'DOM'
    },
    {
        question: 'What is debouncing vs throttling?',
        answer: 'Debouncing delays execution until wait period after last call (e.g., search autocomplete). Throttling executes at most once per time period (e.g., scroll events). Debouncing waits for silence; throttling ensures regular intervals.',
        codingExamples: [
            {
                title: 'Debounce Implementation',
                code: `function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Usage: Search input
const searchAPI = (query) => console.log('Searching:', query);
const debouncedSearch = debounce(searchAPI, 300);

// User types: "j", "ja", "jav", "java"
// Only calls API once with "java" (300ms after last keystroke)
input.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});`,
                explanation: 'Debounce waits until the user stops triggering the event for a specified delay. Only the last call executes. Perfect for search inputs.'
            },
            {
                title: 'Throttle Implementation',
                code: `function throttle(func, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Usage: Scroll event
const handleScroll = () => console.log('Scroll position:', window.scrollY);
const throttledScroll = throttle(handleScroll, 200);

// Fires at most once every 200ms during scrolling
window.addEventListener('scroll', throttledScroll);`,
                explanation: 'Throttle ensures the function fires at a regular interval regardless of how many times the event triggers. Great for scroll and resize events.'
            }
        ],
        difficulty: 'Medium',
        order: 20,
        category: 'Performance'
    },

    // ═══════════════════════════════════════════════════
    // HARD QUESTIONS (21-30)
    // ═══════════════════════════════════════════════════
    {
        question: 'What is a pure function?',
        answer: 'Returns same output for same inputs with no side effects. Doesn\'t modify external state, perform I/O, or mutate arguments. Predictable, testable, enables memoization.',
        codingExamples: [
            {
                title: 'Pure vs Impure Functions',
                code: `// ✅ Pure function — same input always gives same output
function add(a, b) {
    return a + b;
}
console.log(add(2, 3)); // always 5

// ❌ Impure — depends on external state
let tax = 0.1;
function calculateTotal(price) {
    return price + (price * tax); // depends on external 'tax'
}

// ❌ Impure — modifies external state (side effect)
let count = 0;
function increment() {
    count++; // mutates external variable
    return count;
}`,
                explanation: 'Pure functions depend only on their inputs and produce no side effects. They are predictable and easy to test.'
            },
            {
                title: 'Making Functions Pure',
                code: `// ❌ Impure — mutates the original array
function addItemImpure(arr, item) {
    arr.push(item); // side effect!
    return arr;
}

// ✅ Pure — returns new array
function addItemPure(arr, item) {
    return [...arr, item]; // no mutation
}

const original = [1, 2, 3];
const newArr = addItemPure(original, 4);
console.log(original); // [1, 2, 3] — unchanged
console.log(newArr);   // [1, 2, 3, 4] — new array

// ✅ Pure object update
function updateUser(user, name) {
    return { ...user, name }; // new object, no mutation
}`,
                explanation: 'Pure functions never mutate their arguments. Use spread operator or other methods to create new copies instead of modifying the original.'
            }
        ],
        difficulty: 'Hard',
        order: 21,
        category: 'Functional Programming'
    },
    {
        question: 'What is currying?',
        answer: 'Transforms multi-argument function into sequence of single-argument functions. func(a, b, c) becomes func(a)(b)(c). Enables partial application and composition.',
        codingExamples: [
            {
                title: 'Basic Currying',
                code: `// Regular function
function add(a, b, c) {
    return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried version
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}
console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function version
const curriedAddArrow = a => b => c => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6`,
                explanation: 'Currying transforms a function that takes multiple arguments into a chain of functions, each taking a single argument.'
            },
            {
                title: 'Practical Currying',
                code: `// Partial application with currying
const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Logger factory
const createLogger = level => message => {
    console.log(\`[\${level.toUpperCase()}] \${message}\`);
};

const info = createLogger('info');
const error = createLogger('error');

info('Server started');  // [INFO] Server started
error('Disk full');      // [ERROR] Disk full`,
                explanation: 'Currying enables partial application — pre-filling some arguments to create specialized functions. Very useful for creating reusable utilities.'
            }
        ],
        difficulty: 'Hard',
        order: 22,
        category: 'Functional Programming'
    },
    {
        question: 'What is memoization?',
        answer: 'Optimization caching function results by arguments. Returns cached result for same arguments instead of recalculating. Trades memory for speed, useful for expensive recursive functions.',
        codingExamples: [
            {
                title: 'Memoize Function',
                code: `function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('Cache hit!');
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = (n) => {
    console.log('Computing...');
    return n * n;
};

const memoized = memoize(expensiveCalc);
console.log(memoized(5)); // Computing... 25
console.log(memoized(5)); // Cache hit! 25
console.log(memoized(6)); // Computing... 36`,
                explanation: 'memoize wraps a function and caches results. If the same arguments are used again, it returns the cached result instead of recalculating.'
            },
            {
                title: 'Memoized Fibonacci',
                code: `// Without memoization — O(2^n) exponential!
function fibSlow(n) {
    if (n <= 1) return n;
    return fibSlow(n - 1) + fibSlow(n - 2);
}

// With memoization — O(n) linear
function fibFast(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibFast(n - 1, memo) + fibFast(n - 2, memo);
    return memo[n];
}

console.time('slow');
console.log(fibSlow(35)); // Takes seconds
console.timeEnd('slow');

console.time('fast');
console.log(fibFast(35)); // Near instant
console.timeEnd('fast');`,
                explanation: 'Memoization dramatically improves recursive functions like Fibonacci by avoiding redundant calculations. Reduces time complexity from O(2^n) to O(n).'
            }
        ],
        difficulty: 'Hard',
        order: 23,
        category: 'Performance'
    },
    {
        question: 'What is the difference between shallow copy and deep copy?',
        answer: 'Shallow copies references to nested objects (one level). Methods: Object.assign(), {...obj}, slice(). Deep copy recursively copies all nested objects. Methods: structuredClone(), JSON.parse(JSON.stringify()).',
        codingExamples: [
            {
                title: 'Shallow Copy Problem',
                code: `const original = {
    name: "Alice",
    address: { city: "NYC", zip: "10001" }
};

// Shallow copy methods
const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);

// Changing nested object affects both!
shallow1.address.city = "LA";
console.log(original.address.city); // "LA" ← changed!
console.log(shallow1.name);         // "Alice"

// Top-level is independent
shallow1.name = "Bob";
console.log(original.name); // "Alice" ← not affected`,
                explanation: 'Shallow copy only copies the first level. Nested objects are still shared references, so modifying them affects the original.'
            },
            {
                title: 'Deep Copy Solutions',
                code: `const original = {
    name: "Alice",
    address: { city: "NYC" },
    hobbies: ["reading", "coding"]
};

// Method 1: structuredClone (modern, recommended)
const deep1 = structuredClone(original);
deep1.address.city = "LA";
console.log(original.address.city); // "NYC" ← safe!

// Method 2: JSON parse/stringify (has limitations)
const deep2 = JSON.parse(JSON.stringify(original));
// ⚠️ Loses: functions, undefined, Date objects, RegExp, Map, Set

// Method 3: Recursive function
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    const clone = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}`,
                explanation: 'Deep copy creates completely independent copies. structuredClone is the modern recommended approach. JSON method has limitations with special types.'
            }
        ],
        difficulty: 'Hard',
        order: 24,
        category: 'Objects & Prototypes'
    },
    {
        question: 'What are higher-order functions?',
        answer: 'Take functions as arguments or return functions. Examples: map, filter, reduce. Enable functional programming, code reusability, and abstraction.',
        codingExamples: [
            {
                title: 'Built-in Higher-Order Functions',
                code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map — transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter — keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// reduce — accumulate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 55

// Chaining
const result = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * 3)
    .reduce((acc, n) => acc + n, 0);
console.log(result); // 90`,
                explanation: 'map, filter, and reduce are higher-order functions because they take a function as an argument. They can be chained for powerful data transformations.'
            },
            {
                title: 'Creating Higher-Order Functions',
                code: `// Function that returns a function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// Function that takes a function
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}
repeat(3, console.log); // 0, 1, 2

// Compose functions
const compose = (...fns) => (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const doubleIt = x => x * 2;
const transform = compose(doubleIt, addOne);
console.log(transform(3)); // 8 → (3+1)*2`,
                explanation: 'Higher-order functions can accept functions as arguments or return new functions. compose chains multiple functions together right-to-left.'
            }
        ],
        difficulty: 'Hard',
        order: 25,
        category: 'Functional Programming'
    },
    {
        question: 'What is the execution context?',
        answer: 'Environment where code executes containing variables, functions, this. Types: Global, Function, Eval. Has creation phase (hoisting, setting this) and execution phase. Managed via call stack.',
        codingExamples: [
            {
                title: 'Execution Context Phases',
                code: `// Global Execution Context is created first
var globalVar = "I'm global";

function outer() {
    // Function Execution Context created when called
    var outerVar = "I'm outer";

    function inner() {
        // Another Function Execution Context
        var innerVar = "I'm inner";
        console.log(innerVar);  // own variable
        console.log(outerVar);  // from outer context
        console.log(globalVar); // from global context
    }

    inner();
}

outer();

// Creation Phase:
// 1. Creates variable object (hoisting)
// 2. Creates scope chain
// 3. Sets 'this' value

// Execution Phase:
// 1. Assigns values to variables
// 2. Executes code line by line`,
                explanation: 'Each function call creates a new execution context with two phases: creation (hoisting + scope chain + this) and execution (assignments + running code).'
            },
            {
                title: 'Call Stack Visualization',
                code: `function first() {
    console.log("first start");
    second();
    console.log("first end");
}

function second() {
    console.log("second start");
    third();
    console.log("second end");
}

function third() {
    console.log("third start");
    console.log("third end");
}

first();
// Call Stack progression:
// [Global] → [Global, first] → [Global, first, second]
// → [Global, first, second, third]
// third completes → pops off
// → [Global, first, second] → second completes
// → [Global, first] → first completes
// → [Global]

// Output:
// "first start" → "second start" → "third start"
// → "third end" → "second end" → "first end"`,
                explanation: 'The call stack is LIFO (Last In, First Out). Each function call pushes a context onto the stack, and it pops off when the function returns.'
            }
        ],
        difficulty: 'Hard',
        order: 26,
        category: 'Functions & Scope'
    },
    {
        question: 'What is lexical scoping?',
        answer: 'Function\'s variable access determined by physical code location. Inner functions access outer variables regardless of where called. Enables closures.',
        codingExamples: [
            {
                title: 'Lexical Scope in Action',
                code: `const globalVal = "global";

function outer() {
    const outerVal = "outer";

    function inner() {
        const innerVal = "inner";
        // Can access all outer scopes
        console.log(innerVal);  // "inner"  — own scope
        console.log(outerVal);  // "outer"  — parent scope
        console.log(globalVal); // "global" — global scope
    }

    inner();
    // console.log(innerVal); // ReferenceError — can't look inward
}

outer();`,
                explanation: 'Lexical scoping means variable access is determined by where functions are written in the code, not where they are called. Inner can see outer, but not vice versa.'
            },
            {
                title: 'Lexical Scope vs Dynamic Scope',
                code: `const x = 10;

function foo() {
    console.log(x); // What does this print?
}

function bar() {
    const x = 20;
    foo(); // 10 — NOT 20!
}

bar();

// JavaScript uses LEXICAL scoping:
// foo() was DEFINED where x = 10, so it uses that x
// If JS used dynamic scoping, it would use x = 20 (caller's scope)

// This is why closures work:
function makeGreeter(name) {
    return function() {
        console.log(\`Hello, \${name}!\`);
        // 'name' is determined by where this function was CREATED
    };
}

const greetAlice = makeGreeter("Alice");
greetAlice(); // "Hello, Alice!" — remembers lexical scope`,
                explanation: 'JavaScript uses lexical (static) scoping — variables are resolved based on where the function is defined in the source code, not where it is called from.'
            }
        ],
        difficulty: 'Hard',
        order: 27,
        category: 'Functions & Scope'
    },
    {
        question: 'What are generators?',
        answer: 'Functions that pause/resume using function* and yield. Return iterator with next() returning {value, done}. Useful for lazy evaluation, infinite sequences, async iteration.',
        codingExamples: [
            {
                title: 'Basic Generator',
                code: `function* numberGen() {
    console.log("Start");
    yield 1;
    console.log("After first yield");
    yield 2;
    console.log("After second yield");
    yield 3;
    console.log("End");
}

const gen = numberGen();

console.log(gen.next()); // "Start" → { value: 1, done: false }
console.log(gen.next()); // "After first yield" → { value: 2, done: false }
console.log(gen.next()); // "After second yield" → { value: 3, done: false }
console.log(gen.next()); // "End" → { value: undefined, done: true }

// Can use for...of
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const num of range(1, 5)) {
    console.log(num); // 1, 2, 3, 4, 5
}`,
                explanation: 'Generators pause at each yield and resume when next() is called. They return an iterator object with value and done properties.'
            },
            {
                title: 'Infinite Sequence & Practical Use',
                code: `// Infinite ID generator — lazy evaluation
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3
// Goes forever but only computes when asked!

// Passing values into generator
function* calculator() {
    const a = yield 'Enter first number';
    const b = yield 'Enter second number';
    yield \`Sum: \${a + b}\`;
}

const calc = calculator();
console.log(calc.next());      // { value: 'Enter first number', done: false }
console.log(calc.next(10));    // { value: 'Enter second number', done: false }
console.log(calc.next(20));    // { value: 'Sum: 30', done: false }`,
                explanation: 'Generators enable lazy evaluation — values are computed only when needed. You can also pass values back into the generator via next(value).'
            }
        ],
        difficulty: 'Hard',
        order: 28,
        category: 'Advanced JavaScript'
    },
    {
        question: 'What is the difference between microtask and macrotask?',
        answer: 'Macrotasks: setTimeout, setInterval, I/O (task queue). Microtasks: Promises, queueMicrotask() (microtask queue). Event loop executes all microtasks after each macrotask, giving them priority.',
        codingExamples: [
            {
                title: 'Execution Order',
                code: `console.log('1. Script start');        // Synchronous

setTimeout(() => {
    console.log('2. setTimeout');        // Macrotask
}, 0);

Promise.resolve()
    .then(() => console.log('3. Promise 1'))   // Microtask
    .then(() => console.log('4. Promise 2'));   // Microtask

queueMicrotask(() => {
    console.log('5. queueMicrotask');    // Microtask
});

console.log('6. Script end');           // Synchronous

// Output:
// 1. Script start     ← sync
// 6. Script end       ← sync
// 3. Promise 1        ← microtask
// 5. queueMicrotask   ← microtask
// 4. Promise 2        ← microtask
// 2. setTimeout       ← macrotask`,
                explanation: 'Order: synchronous code first, then ALL microtasks (Promise, queueMicrotask), then the next macrotask (setTimeout). Microtasks always have priority.'
            },
            {
                title: 'Nested Tasks',
                code: `setTimeout(() => {
    console.log('1. Macro 1');

    Promise.resolve().then(() => {
        console.log('2. Micro inside Macro 1');
    });
}, 0);

setTimeout(() => {
    console.log('3. Macro 2');
}, 0);

Promise.resolve().then(() => {
    console.log('4. Micro 1');

    setTimeout(() => {
        console.log('5. Macro inside Micro 1');
    }, 0);
});

// Output:
// 4. Micro 1              ← microtask runs first
// 1. Macro 1              ← first macrotask
// 2. Micro inside Macro 1 ← microtask after macrotask
// 3. Macro 2              ← second macrotask
// 5. Macro inside Micro 1 ← last macrotask`,
                explanation: 'After each macrotask, the event loop drains the entire microtask queue before moving to the next macrotask. This is why microtasks nested inside macrotasks run before the next macrotask.'
            }
        ],
        difficulty: 'Hard',
        order: 29,
        category: 'Async JavaScript'
    },
    {
        question: 'What is the module pattern?',
        answer: 'Uses closures for private/public encapsulation preventing global pollution. Returns object with public methods accessing private variables through closure. Modern alternative: ES6 modules with import/export.',
        codingExamples: [
            {
                title: 'IIFE Module Pattern',
                code: `const CounterModule = (function() {
    // Private variables and functions
    let count = 0;
    const MAX = 100;

    function validate(n) {
        return n >= 0 && n <= MAX;
    }

    // Public API (revealed)
    return {
        increment() {
            if (validate(count + 1)) {
                count++;
            }
            return count;
        },
        decrement() {
            if (validate(count - 1)) {
                count--;
            }
            return count;
        },
        getCount() {
            return count;
        }
    };
})();

console.log(CounterModule.increment()); // 1
console.log(CounterModule.increment()); // 2
console.log(CounterModule.decrement()); // 1
console.log(CounterModule.getCount());  // 1
// CounterModule.count → undefined (private!)
// CounterModule.validate → undefined (private!)`,
                explanation: 'The IIFE creates a closure. Private variables and functions are hidden. Only the returned object with public methods is accessible.'
            },
            {
                title: 'ES6 Module Alternative',
                code: `// mathUtils.js — ES6 Module
let secretKey = 'abc123'; // private to module

export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

export function createCalculator(initialValue = 0) {
    let value = initialValue;
    return {
        add(n) { value += n; return this; },
        subtract(n) { value -= n; return this; },
        result() { return value; }
    };
}

export default { add, multiply, createCalculator };

// app.js — importing
// import { add, multiply } from './mathUtils.js';
// import Calculator from './mathUtils.js';

// console.log(add(2, 3));        // 5
// const calc = createCalculator(10);
// console.log(calc.add(5).subtract(3).result()); // 12
// secretKey is NOT accessible — truly private`,
                explanation: 'ES6 modules are the modern alternative to the module pattern. Each file is a module with its own scope. Only exported values are accessible to other files.'
            }
        ],
        difficulty: 'Hard',
        order: 30,
        category: 'Advanced JavaScript'
    }
];

// ═══════════════════════════════════════════════════
// SEEDER FUNCTION
// ═══════════════════════════════════════════════════

const seedInterviewQuestions = async () => {
    try {
        logger.info('Starting interview questions seeder...');

        let createdCount = 0;
        let updatedCount = 0;

        for (const questionData of interviewQuestionsData) {
            const existingQuestion = await InterviewQuestion.findOne({ order: questionData.order });

            if (existingQuestion) {
                // Update existing question
                Object.assign(existingQuestion, questionData);
                await existingQuestion.save();
                updatedCount++;
                logger.info(`Updated question ${questionData.order}: "${questionData.question.substring(0, 50)}..."`);
            } else {
                // Create new question
                const newQuestion = new InterviewQuestion(questionData);
                await newQuestion.save();
                createdCount++;
                logger.info(`Created question ${questionData.order}: "${questionData.question.substring(0, 50)}..."`);
            }
        }

        logger.info(`Interview questions seeding complete! Created: ${createdCount}, Updated: ${updatedCount}`);
        return { createdCount, updatedCount };
    } catch (error) {
        logger.error('Error seeding interview questions:', error);
        throw error;
    }
};

// Run directly if executed as a script
if (require.main === module) {
    require('dotenv').config();

    mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            logger.info('Connected to MongoDB for seeding');
            await seedInterviewQuestions();
            await mongoose.disconnect();
            logger.info('Disconnected from MongoDB');
            process.exit(0);
        })
        .catch(err => {
            logger.error('MongoDB connection error:', err);
            process.exit(1);
        });
}

module.exports = seedInterviewQuestions;
