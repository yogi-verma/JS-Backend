const mongoose = require('mongoose');
const OutputBasedQuestion = require('../models/OutputBasedQuestion');
const logger = require('../logger');

require('dotenv').config();

// ════════════════════════════════════════════════════════════════════════════
// OUTPUT-BASED QUESTIONS  (JavaScript & React)
// ════════════════════════════════════════════════════════════════════════════

const outputBasedQuestions = [

    // ═══════════════════════════════════════════════════════════════════════
    // JAVASCRIPT — Output-Based Questions
    // ═══════════════════════════════════════════════════════════════════════

    {
        question: `What is the output?\n\nfunction sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Lydia';\n  let age = 21;\n}\nsayHi();`,
        options: [
            'Lydia and undefined',
            'Lydia and ReferenceError',
            'ReferenceError and 21',
            'undefined and ReferenceError'
        ],
        correctIndex: 3,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`var name` is hoisted and initialised to `undefined` until the assignment line is reached. `let age` is also hoisted but stays in the Temporal Dead Zone (TDZ) — accessing it before its declaration throws a ReferenceError.'
    },
    {
        question: `What is the output?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}`,
        options: [
            '0 1 2 and 0 1 2',
            '0 1 2 and 3 3 3',
            '3 3 3 and 0 1 2',
            '3 3 3 and 3 3 3'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`var` is function-scoped, so by the time the setTimeout callbacks execute the loop has finished and `i` is 3 for all three callbacks. `let` is block-scoped — each iteration gets its own `i`, so the callbacks log 0, 1, 2.'
    },
    {
        question: `What is the output?\n\nconst shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2;\n  },\n  perimeter: () => 2 * Math.PI * this.radius,\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());`,
        options: [
            '20 and 62.83185307179586',
            '20 and NaN',
            'NaN and 62.83185307179586',
            'NaN and NaN'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`diameter()` is a regular method so `this` refers to the `shape` object — `this.radius` is 10, result is 20. `perimeter` is an arrow function which does not have its own `this`; it inherits `this` from the surrounding (module/global) scope where `this.radius` is `undefined`, so `2 * Math.PI * undefined` evaluates to `NaN`.'
    },
    {
        question: `What is the output?\n\n+true;\n!'Lydia';`,
        options: [
            '1 and false',
            'false and NaN',
            'false and false',
            '1 and true'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The unary `+` operator converts its operand to a number — `+true` becomes `1`. The logical NOT `!` operator converts the operand to a boolean and negates it — `"Lydia"` is truthy, so `!"Lydia"` is `false`.'
    },
    {
        question: `Which of the following is a valid way to access the property \`small\` on \`mouse\`?\n\nconst bird = { size: 'small' };\nconst mouse = { name: 'Mickey', small: true };`,
        options: [
            'mouse.bird.size',
            'mouse[bird.size]',
            'mouse[bird["size"]]',
            'Both B and C'
        ],
        correctIndex: 3,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: '`bird.size` evaluates to the string `"small"`, so `mouse[bird.size]` is equivalent to `mouse["small"]` which is `true`. Similarly `bird["size"]` also evaluates to `"small"`, so `mouse[bird["size"]]` resolves to the same thing. `mouse.bird.size` is invalid because `mouse` has no `bird` property — it would throw a TypeError.'
    },
    {
        question: `What is the output?\n\nlet c = { greeting: 'Hey!' };\nlet d;\n\nd = c;\nc.greeting = 'Hello';\nconsole.log(d.greeting);`,
        options: [
            'Hello',
            'Hey!',
            'undefined',
            'ReferenceError'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'Objects are reference types in JavaScript. When `d = c` is executed, `d` points to the same object in memory as `c`. Changing `c.greeting` mutates the shared object, so `d.greeting` also reflects the change.'
    },
    {
        question: `What is the output?\n\nlet a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);`,
        options: [
            'true true true',
            'true true false',
            'true false false',
            'false false false'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`new Number(3)` creates a Number object, not a primitive. Loose equality (`==`) coerces the object to its primitive value, so `a == b` is `true`. Strict equality (`===`) checks type as well — since `b` is an object and `a`/`c` are primitives, both `a === b` and `b === c` are `false`.'
    },
    {
        question: `What is the output?\n\nclass Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n  constructor({ newColor = 'green' } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: 'purple' });\nconsole.log(freddie.colorChange('orange'));`,
        options: [
            'orange',
            'purple',
            'green',
            'TypeError'
        ],
        correctIndex: 3,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`colorChange` is a static method — it lives on the `Chameleon` class itself, not on its instances. Calling `freddie.colorChange()` throws a `TypeError` because the method does not exist on the instance.'
    },
    {
        question: `What is the output?\n\nlet greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);`,
        options: [
            '{}',
            'ReferenceError: greetign is not defined',
            'undefined',
            'TypeError'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'In non-strict mode, assigning to an undeclared variable (`greetign`) implicitly creates a global variable. So `greetign` becomes `{}` on the global object, and `console.log(greetign)` prints `{}`.'
    },
    {
        question: `What happens when we do this?\n\nfunction bark() {\n  console.log('Woof!');\n}\n\nbark.animal = 'dog';`,
        options: [
            'Nothing, this is totally fine!',
            'SyntaxError',
            'ReferenceError',
            'TypeError'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'Functions in JavaScript are first-class objects. You can add properties to them just like any other object. `bark.animal = "dog"` simply adds a property to the function object — no error is thrown.'
    },
    {
        question: `What is the output?\n\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst member = new Person('Lydia', 'Hallie');\nPerson.getFullName = function() {\n  return \`\${this.firstName} \${this.lastName}\`;\n};\n\nconsole.log(member.getFullName());`,
        options: [
            'TypeError',
            '"Lydia Hallie"',
            'SyntaxError',
            'undefined undefined'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`getFullName` is added directly to the `Person` constructor function, not to `Person.prototype`. Instance `member` does not have access to properties on the constructor itself — only to those on its prototype chain. Calling `member.getFullName()` throws a `TypeError` because the method is not found on the instance.'
    },
    {
        question: `What will be the output?\n\nlet arr = [1, 2, 3, 4, 5, -6, 7];\narr.length = 0;\nconsole.log(arr);`,
        options: [
            '[]',
            '[1, 2, 3, 4, 5, -6, 7]',
            'undefined',
            'TypeError'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The length of the array has been set to 0, so the array becomes empty. Setting `arr.length = 0` is a common way to clear an array in JavaScript.'
    },
    {
        question: `What will be the output?\n\nx = 10;\nconsole.log(x);\nvar x;`,
        options: [
            'undefined',
            '10',
            'ReferenceError',
            'null'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The declaration of the variable x is hoisted to the top of its scope. The assignment `x = 10` happens before `console.log(x)`, so the output is 10.'
    },
    {
        question: `What will be the output?\n\nlet a = { x: 1, y: 2 };\nlet b = a;\nb.x = 3;\nconsole.log(a);\nconsole.log(b);`,
        options: [
            '{ x: 1, y: 2 } and { x: 3, y: 2 }',
            '{ x: 3, y: 2 } and { x: 3, y: 2 }',
            '{ x: 1, y: 2 } and { x: 1, y: 2 }',
            'TypeError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: '`a` and `b` both point to the same object reference. Modifying `b.x` also changes `a.x` because they share the same underlying object in memory.'
    },
    {
        question: `What will be the output?\n\nfor (var i = 0; i < 10; i++) {\n  setTimeout(function() {\n    console.log("value is " + i);\n  });\n}`,
        options: [
            '"value is 0" through "value is 9"',
            '10 times "value is 10"',
            '10 times "value is undefined"',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`var` has function scope, and there is only one shared binding for all iterations. By the time the setTimeout callbacks execute, the loop has completed and `i` is 10. All callbacks log "value is 10".'
    },
    {
        question: `What will be the output?\n\nfor (let i = 0; i < 10; i++) {\n  setTimeout(function() {\n    console.log("value is " + i);\n  });\n}`,
        options: [
            '10 times "value is 10"',
            '"value is 0" through "value is 9"',
            '10 times "value is undefined"',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`let` has block scope, and a new binding is created for each iteration. Each setTimeout callback captures its own `i`, so the values logged are 0 through 9.'
    },
    {
        question: `What will be the output?\n\nfunction hello() {\n  console.log("1");\n  setTimeout(() => {\n    console.log("2");\n  });\n  console.log("3");\n}\nhello();`,
        options: [
            '1 → 2 → 3',
            '1 → 3 → 2',
            '2 → 1 → 3',
            '3 → 1 → 2'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`console.log("1")` runs first. Then `setTimeout` schedules its callback for the next event loop iteration. `console.log("3")` runs synchronously. Finally, the setTimeout callback executes, logging "2".'
    },
    {
        question: `What will be the output?\n\nlet f = "8";\nlet a = 1;\nconsole.log((+f) + a + 1);`,
        options: [
            '"811"',
            '10',
            '"81"',
            'NaN'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The expression `(+f)` is a shorthand way to convert the string value of `f` to a number. Therefore `(+f)` evaluates to 8. Then `8 + 1 + 1` equals 10.'
    },
    {
        question: `What will be the output?\n\nlet a = 10;\nif (true) {\n  let a = 20;\n  console.log(a, "inside");\n}\nconsole.log(a, "outside");`,
        options: [
            '20 "inside" and 20 "outside"',
            '10 "inside" and 10 "outside"',
            '20 "inside" and 10 "outside"',
            'ReferenceError'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The variable `a` declared inside the `if` block has block scope and does not affect the value of the outer `a` variable. Inside the block `a` is 20, outside it remains 10.'
    },
    {
        question: `What will be the output?\n\nvar a = "xyz";\nvar a = "pqr";\nconsole.log(a);`,
        options: [
            '"xyz"',
            '"pqr"',
            'SyntaxError',
            'undefined'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'Both variables are declared using `var` with the same name `a`. The second declaration overrides the first. Since `var` allows re-declaration, no error is thrown and the value is "pqr".'
    },
    {
        question: `What will be the output?\n\nconst arr1 = [1, 2, 3, 4];\nconst arr2 = [6, 7, 5];\nconst result = [...arr1, ...arr2];\nconsole.log(result);`,
        options: [
            '[1, 2, 3, 4, 6, 7, 5]',
            '[[1, 2, 3, 4], [6, 7, 5]]',
            '[6, 7, 5, 1, 2, 3, 4]',
            'TypeError'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The spread operator (`...`) concatenates the two arrays into the `result` array. Elements from `arr1` come first, followed by elements from `arr2`.'
    },
    {
        question: `What will be the output?\n\nconst person1 = { name: 'xyz', age: 21 };\nconst person2 = { city: 'abc', ...person1 };\nconsole.log(person2);`,
        options: [
            '{ city: "abc" }',
            '{ name: "xyz", age: 21 }',
            '{ city: "abc", name: "xyz", age: 21 }',
            'TypeError'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The spread operator (`...`) copies all the properties from `person1` into `person2`. The resulting object contains the `city` property along with `name` and `age` from `person1`.'
    },
    {
        question: `What will be the output?\n\nconsole.log(5 < 6 < 7);`,
        options: [
            'true',
            'false',
            'TypeError',
            'undefined'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'The `<` operator evaluates left to right. First `5 < 6` evaluates to `true`. Then `true < 7` — JavaScript coerces `true` to 1, so the expression becomes `1 < 7`, which is `true`.'
    },
    {
        question: `What will be the output?\n\nconsole.log(7 > 6 > 5);`,
        options: [
            'true',
            'false',
            'TypeError',
            'undefined'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'The `>` operator evaluates left to right. First `7 > 6` evaluates to `true`. Then `true > 5` — JavaScript coerces `true` to 1, so the expression becomes `1 > 5`, which is `false`.'
    },
    {
        question: `What will be the output?\n\nconsole.log(0 == false);\nconsole.log(1 == true);`,
        options: [
            'true and true',
            'true and false',
            'false and true',
            'false and false'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The `==` operator converts operands to a common type before comparison. `false` is converted to 0, so `0 == false` becomes `0 == 0` which is `true`. `true` is converted to 1, so `1 == true` becomes `1 == 1` which is `true`.'
    },
    {
        question: `What will be the output?\n\nconsole.log([11, 2, 31] + [4, 5, 6]);`,
        options: [
            '[11, 2, 31, 4, 5, 6]',
            '"11,2,314,5,6"',
            'NaN',
            'TypeError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'The `+` operator converts both arrays to strings before concatenating. `[11, 2, 31]` becomes `"11,2,31"` and `[4, 5, 6]` becomes `"4,5,6"`. The result is the string `"11,2,314,5,6"`.'
    },
    {
        question: `What will be the output?\n\nconsole.log({} == {});\nconsole.log({} === {});`,
        options: [
            'true and true',
            'true and false',
            'false and true',
            'false and false'
        ],
        correctIndex: 3,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'When you compare objects using `==` or `===`, it checks if they refer to the exact same object. Even though the two empty objects look the same, they point to different memory locations, so both comparisons return `false`.'
    },
    {
        question: `What will be the output?\n\nlet x = 5;\nlet y = x++;\nconsole.log(y);\nconsole.log(x);`,
        options: [
            '5 and 5',
            '6 and 6',
            '5 and 6',
            '6 and 5'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The post-increment operator (`x++`) returns the value before incrementing. So `y` is assigned 5, then `x` becomes 6.'
    },
    {
        question: `What will be the output?\n\nlet x = 5;\nlet y = ++x;\nconsole.log(y);\nconsole.log(x);`,
        options: [
            '5 and 5',
            '6 and 6',
            '5 and 6',
            '6 and 5'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The pre-increment operator (`++x`) increments first and then returns the value. So `x` becomes 6 and `y` is assigned 6.'
    },
    {
        question: `What will be the output?\n\nconsole.log('apple'.split(''));`,
        options: [
            '["apple"]',
            '["a", "p", "p", "l", "e"]',
            '"a,p,p,l,e"',
            'TypeError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The `split` method splits a string into an array of substrings based on a specified separator. An empty string `""` as separator splits every character individually.'
    },
    {
        question: `What will be the output?\n\nconst arr = [2, 3, 5, 2, 8, 10, 5];\nconsole.log(arr.indexOf(5));`,
        options: [
            '0',
            '2',
            '6',
            '-1'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The `indexOf` method returns the index of the first occurrence of the specified element in the array. The value 5 first appears at index 2.'
    },
    {
        question: `What will be the output?\n\nconst array = [8, 18, 28, 38];\nconst result = array.map(element => element + 2)\n               .filter((element) => element > 25);\nconsole.log(result);`,
        options: [
            '[28, 38]',
            '[30, 40]',
            '[10, 20, 30, 40]',
            '[28, 30, 38, 40]'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'The `map` increments each element by 2, producing `[10, 20, 30, 40]`. Then `filter` keeps only elements greater than 25, resulting in `[30, 40]`.'
    },
    {
        question: `What will be the output?\n\nfunction checkValue(value) {\n  var result = Array.isArray(value);\n  console.log(result);\n}\ncheckValue([1, 2, 3]);`,
        options: [
            'true',
            'false',
            'undefined',
            'TypeError'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: '`Array.isArray()` checks if the provided value is an array. Since `[1, 2, 3]` is an array, the method returns `true`.'
    },
    {
        question: `What will be the output?\n\nfunction sum(a = 5, b = 7) {\n  return a + b;\n}\nconsole.log(sum(undefined, 20));`,
        options: [
            'NaN',
            '25',
            '27',
            'undefined'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'When `undefined` is passed as the value for parameter `a`, the default value 5 is used. Parameter `b` receives 20. So the result is `5 + 20 = 25`.'
    },
    {
        question: `What will be the output?\n\nconsole.log(10 + "5");\nconsole.log("5" + 10);`,
        options: [
            '15 and 15',
            '"105" and "510"',
            '15 and "510"',
            '"105" and 15'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'Since one operand is a string, the `+` operator performs string concatenation instead of numeric addition. `10 + "5"` produces `"105"` and `"5" + 10` produces `"510"`.'
    },
    {
        question: `What will be the output?\n\nconsole.log(10 - "5");\nconsole.log("5" - 10);`,
        options: [
            '"5" and "-5"',
            '5 and -5',
            'NaN and NaN',
            '5 and NaN'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'When the subtraction operator `-` is used, the operands are converted to numbers before performing the subtraction. `10 - 5` equals `5` and `5 - 10` equals `-5`.'
    },
    {
        question: `What will be the output?\n\nconsole.log(printName());\nfunction printName() {\n  return "Hi my name is Bob";\n}`,
        options: [
            '"Hi my name is Bob"',
            'undefined',
            'ReferenceError',
            'TypeError'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'Regular function declarations are hoisted to the top of their scope. You can access and call them even before they appear in the code. So `printName()` works and returns the string.'
    },
    {
        question: `What will be the output?\n\nconsole.log(printName());\nconst printName = () => {\n  return "Hi my name is Bob";\n};`,
        options: [
            '"Hi my name is Bob"',
            'undefined',
            'ReferenceError',
            'TypeError'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'Arrow functions assigned to `const` are not hoisted like regular function declarations. Accessing `printName` before initialization throws a `ReferenceError: Cannot access \'printName\' before initialization`.'
    },
    {
        question: `What will be the output?\n\nconst userDetails = {\n  firstName: "Surbhi",\n  lastName: "Dighe",\n  age: 20,\n  address: {\n    city: "Hyderabad",\n    country: "India",\n  },\n};\n\nlet cloneUserDetails = { ...userDetails };\nuserDetails.age = 22;\nuserDetails.address.city = "Banglore";\n\nconsole.log(cloneUserDetails.age);\nconsole.log(cloneUserDetails.address.city);`,
        options: [
            '22 and "Hyderabad"',
            '20 and "Hyderabad"',
            '22 and "Banglore"',
            '20 and "Banglore"'
        ],
        correctIndex: 3,
        category: 'javascript',
        difficulty: 'Hard',
        explanation: 'The spread syntax creates a shallow copy. Primitive properties like `age` are independent — the clone keeps 20. However, the nested `address` object is still a shared reference, so changing `userDetails.address.city` also affects the clone.'
    },
    {
        question: `What will be the output?\n\nfunction hello() {\n  console.log(name);\n  console.log(age);\n  var name = "Alice";\n  let age = 21;\n}\nhello();`,
        options: [
            '"Alice" and 21',
            'undefined and ReferenceError',
            'ReferenceError and undefined',
            'undefined and undefined'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'The variable `name` declared with `var` is hoisted and initialized to `undefined`. The variable `age` declared with `let` is hoisted but remains in the Temporal Dead Zone — accessing it before declaration throws a ReferenceError.'
    },
    {
        question: `What will be the output?\n\nconst arr1 = [1, 2, 3];\nconst arr2 = [1, 2, 3];\nconst str = "1,2,3";\n\nconsole.log(arr1 == str);\nconsole.log(arr1 == arr2);`,
        options: [
            'true and true',
            'false and false',
            'true and false',
            'false and true'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'With `==`, JavaScript converts `arr1` to its string representation `"1,2,3"`, which equals `str`, so the first comparison is `true`. However, `arr1` and `arr2` are different objects in memory, so comparing them by reference returns `false`.'
    },
    {
        question: `What will be the output?\n\nconst a = { x: 1 };\nconst b = { x: 1 };\nconsole.log(a === b);\nconsole.log(a.x === b.x);`,
        options: [
            'true and true',
            'false and false',
            'false and true',
            'true and false'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: '`a === b` compares whether they refer to the exact same object in memory. They are two different objects, so it evaluates to `false`. `a.x === b.x` compares the primitive values — both are 1, so it evaluates to `true`.'
    },
    {
        question: `What will be the output?\n\nconst arr = [10, -1, 2];\narr.sort((a, b) => a - b);\nconsole.log(arr);`,
        options: [
            '[10, 2, -1]',
            '[-1, 2, 10]',
            '[2, -1, 10]',
            '[10, -1, 2]'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The compare function `(a, b) => a - b` sorts the numbers numerically in ascending order. The sorted result is `[-1, 2, 10]`.'
    },
    {
        question: `What will be the output?\n\nconst arr = [11, 0, '', false, 2, 1];\nconst filtered = arr.filter(Boolean);\nconsole.log(filtered);`,
        options: [
            '[11, 0, "", false, 2, 1]',
            '[11, 2, 1]',
            '[0, "", false]',
            '[true, false, false, false, true, true]'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`filter(Boolean)` removes all falsy values (0, empty string, false, null, undefined, NaN) from the array and keeps only truthy ones. The result is `[11, 2, 1]`.'
    },
    {
        question: `What will be the output?\n\nvar x = 0;\nvar y = 10;\nif (x) {\n  console.log(x);\n}\nif (y) {\n  console.log(y);\n}`,
        options: [
            '0 and 10',
            '10',
            '0',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: '`x = 0` is falsy, so the first `if` block does not execute. `y = 10` is truthy, so the second `if` block runs and logs 10.'
    },
    {
        question: `What will be the output?\n\nconst obj = {\n  var1: 1,\n  var2: 2\n};\nconst { var1, var2 } = obj;\nconsole.log(var1, var2);`,
        options: [
            'undefined undefined',
            '1 2',
            '{ var1: 1 } { var2: 2 }',
            'Error'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'Object destructuring extracts the values of `var1` and `var2` from the `obj` object and assigns them to local variables. `console.log(var1, var2)` prints `1 2`.'
    },
    {
        question: `What will be the output?\n\nconst user = {\n  name: "Surbhi Dighe",\n  country: "India"\n};\nconst { name: fullname, country } = user;\nconsole.log(fullname);\nconsole.log(name);`,
        options: [
            '"Surbhi Dighe" and "Surbhi Dighe"',
            '"Surbhi Dighe" and ReferenceError',
            'undefined and "Surbhi Dighe"',
            'ReferenceError and ReferenceError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'The `name` property from `user` is assigned to a local variable `fullname` via destructuring renaming. `fullname` holds "Surbhi Dighe", but `name` is not directly accessible as a variable, causing a ReferenceError.'
    },
    {
        question: `What will be the output?\n\nconst person = {\n  firstName: 'Surbhi',\n};\nconst { lastName = "dighe" } = person;\nconsole.log(lastName);`,
        options: [
            'undefined',
            '"dighe"',
            '"Surbhi"',
            'ReferenceError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The `lastName` property does not exist in the `person` object. The destructuring syntax provides a default value ("dighe") which is used when the property is missing.'
    },
    {
        question: `What will be the output?\n\nconst person = {\n  firstName: 'Surbhi',\n};\nconst { firstName = "Henry" } = person;\nconsole.log(firstName);`,
        options: [
            '"Henry"',
            '"Surbhi"',
            'undefined',
            'Error'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'The `firstName` property exists in the `person` object with the value "Surbhi". The default value "Henry" is ignored because defaults only apply when the property does not exist or is `undefined`.'
    },
    {
        question: `What will be the output?\n\nvar a = 10;\nlet a = 20;\nconsole.log(a);`,
        options: [
            '10',
            '20',
            'SyntaxError',
            'TypeError'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'In JavaScript, you cannot redeclare a variable with `let` if it has already been declared with `var` in the same scope. This throws a `SyntaxError: Identifier \'a\' has already been declared`.'
    },
    {
        question: `What will be the output?\n\nconst arr = ["A", "B", "C", "D", "E"];\nconsole.log(Object.keys(arr));`,
        options: [
            '["A", "B", "C", "D", "E"]',
            '["0", "1", "2", "3", "4"]',
            '[0, 1, 2, 3, 4]',
            'TypeError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'In JavaScript, arrays are a special type of object. `Object.keys()` on an array returns an array of strings representing the indices of the array elements.'
    },
    {
        question: `What will be the output?\n\nfunction modify(obj) {\n  obj.name = "Updated";\n}\nlet person = { name: "Original" };\nmodify(person);\nconsole.log(person.name);\n\nfunction reassign(obj) {\n  obj = { name: "New Object" };\n}\nreassign(person);\nconsole.log(person.name);`,
        options: [
            '"Updated" and "New Object"',
            '"Original" and "Original"',
            '"Updated" and "Updated"',
            '"Original" and "New Object"'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Hard',
        explanation: 'Modifying an object\'s properties inside a function reflects outside because the reference is shared. However, reassigning the object parameter inside a function does not affect the original reference. So after `modify`, `person.name` is "Updated". After `reassign`, the original reference is unchanged — `person.name` remains "Updated".'
    },
    {
        question: `What will be the output?\n\nlet a = { x: 1, y: { alpha: 10, beta: 20 } };\nlet b = { ...a };\n\nb.x = 101;\nb.y.alpha = 1001;\n\nconsole.log(a.x);\nconsole.log(a.y.alpha);`,
        options: [
            '101 and 1001',
            '1 and 10',
            '1 and 1001',
            '101 and 10'
        ],
        correctIndex: 2,
        category: 'javascript',
        difficulty: 'Hard',
        explanation: 'The spread operator creates a shallow copy. Changing `b.x` does not affect `a.x` because primitives are copied by value — `a.x` remains 1. However, nested objects are shared references, so `b.y.alpha = 1001` also changes `a.y.alpha`.'
    },
    {
        question: `What will be the output?\n\nconsole.log('Start');\n\nsetTimeout(() => {\n  console.log('setTimeout');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('Promise');\n});\n\nconsole.log('End');`,
        options: [
            'Start → End → setTimeout → Promise',
            'Start → End → Promise → setTimeout',
            'Start → Promise → End → setTimeout',
            'Start → setTimeout → Promise → End'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Hard',
        explanation: 'Synchronous code runs first (Start, End). Then microtasks (Promise callbacks) run before macrotasks (setTimeout). So the order is: Start → End → Promise → setTimeout.'
    },
    {
        question: `What will be the output?\n\nvar array = [1, 2, 3, 4, 5];\ndelete array[2];\nconsole.log(array.length);`,
        options: [
            '4',
            '5',
            '3',
            'undefined'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'The `delete` operator removes the element but does not reindex the array or change its length. It leaves an undefined hole at that index. The length remains 5.'
    },
    {
        question: `What will be the output?\n\nlet x = ["a", "b", "c"];\nlet y = ["a", "b", "c"];\nlet z = y;\n\nconsole.log(x == y);\nconsole.log(z == y);\nconsole.log(z == x);`,
        options: [
            'true, true, true',
            'false, true, false',
            'false, false, false',
            'true, true, false'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: 'Arrays are objects compared by reference. `x` and `y` are different arrays at different memory locations, so `x == y` is `false`. `z` is assigned to `y`, so they share the same reference — `z == y` is `true`. `z` and `x` are different references, so `z == x` is `false`.'
    },
    {
        question: `What will be the output?\n\nlet x;\nconsole.log(x);\nx = 20;\nconsole.log(x);\nx = "John";\nconsole.log(x);`,
        options: [
            'undefined, undefined, undefined',
            'undefined, 20, "John"',
            'null, 20, "John"',
            'ReferenceError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'First, `x` is declared but not assigned, so it is `undefined`. Then `x` is assigned 20, so the second log prints 20. Finally `x` is reassigned to "John", so the third log prints "John".'
    },
    {
        question: `What will be the output?\n\nlet text;\nswitch (1) {\n  case 0:\n    text = "This is zero";\n    break;\n  case 1:\n    text = "This is one";\n  case 2:\n    text = "This is two";\n    break;\n  default:\n    text = "No matches found!";\n}\nconsole.log(text);`,
        options: [
            '"This is one"',
            '"This is two"',
            '"No matches found!"',
            'undefined'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`switch(1)` matches `case 1` and sets `text` to "This is one". But there is no `break`, so execution falls through into `case 2`, overwriting `text` to "This is two". The `break` in `case 2` then stops execution.'
    },
    {
        question: `What will be the output?\n\nconst user = {\n  name: 'Aman Bhoria!',\n  logMessage() {\n    console.log(this.name);\n  }\n};\nsetTimeout(user.logMessage, 1000);`,
        options: [
            '"Aman Bhoria!"',
            'undefined',
            'TypeError',
            'null'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Hard',
        explanation: 'When `user.logMessage` is passed as a callback to `setTimeout`, it loses the `user` context. The function is called with `this` pointing to the global object (or `undefined` in strict mode), where `this.name` is `undefined`.'
    },
    {
        question: `What will be the output?\n\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { b: 3, c: 4 };\n\nconst finalObj = Object.assign({}, obj1, obj2);\nconsole.log(finalObj);`,
        options: [
            '{ a: 1, b: 2, c: 4 }',
            '{ a: 1, b: 3, c: 4 }',
            '{ b: 3, c: 4 }',
            '{ a: 1, b: 2, b: 3, c: 4 }'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Medium',
        explanation: '`Object.assign` merges objects left to right. When keys conflict, the value from the later object overwrites the earlier one. `obj2.b` (3) overwrites `obj1.b` (2), resulting in `{ a: 1, b: 3, c: 4 }`.'
    },
    {
        question: `What will be the output?\n\nlet a = {};\nlet b = { key: "abc" };\nlet c = { key: "efg" };\n\na[b] = 111;\na[c] = 222;\nconsole.log(a[b]);`,
        options: [
            '111',
            '222',
            'undefined',
            'TypeError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Hard',
        explanation: 'Using an object as a key in a normal object converts it to the string `"[object Object]"`. Both `b` and `c` become the same key. So `a[b] = 111` and `a[c] = 222` both write to `a["[object Object]"]`, and the second value (222) overwrites the first.'
    },
    {
        question: `What will be the output?\n\nfunction printName(firstName, lastName) {\n  firstName = "Aman";\n  lastName = "Bhoria";\n  return arguments[0] + " " + arguments[1];\n}\n\nlet name = printName("John", "Doe");\nconsole.log(name);`,
        options: [
            '"John Doe"',
            '"Aman Bhoria"',
            '"undefined undefined"',
            'TypeError'
        ],
        correctIndex: 1,
        category: 'javascript',
        difficulty: 'Hard',
        explanation: 'In non-strict mode, the `arguments` object is linked to the named parameters. When you reassign `firstName` and `lastName`, the corresponding `arguments[0]` and `arguments[1]` are updated as well, so the function returns "Aman Bhoria".'
    },
    {
        question: `What will be the output?\n\nlet x = true + false;\nlet y = x + 1;\n\nconsole.log(x, y);`,
        options: [
            '1 and 2',
            'true and 2',
            'NaN and NaN',
            '"truefalse" and "truefalse1"'
        ],
        correctIndex: 0,
        category: 'javascript',
        difficulty: 'Easy',
        explanation: 'When the `+` operator is used with boolean values, JavaScript performs implicit type coercion: `true` is converted to 1 and `false` is converted to 0. So `true + false` equals 1, and `1 + 1` equals 2.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REACT — Output-Based Questions
    // ═══════════════════════════════════════════════════════════════════════

    {
        question: `What is the output after clicking the button once?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  const handleClick = () => {\n    setCount(count + 1);\n    setCount(count + 1);\n  };\n\n  return <button onClick={handleClick}>{count}</button>;\n}`,
        options: [
            '0',
            '1',
            '2',
            'NaN'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'React batches state updates inside event handlers. Both setCount(count + 1) calls use the same stale value of count (0). Therefore both updates calculate 1, and React applies the last update. Final state becomes 1, not 2.'
    },
    {
        question: `What is the output after clicking the button once?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  const handleClick = () => {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n  };\n\n  return <button onClick={handleClick}>{count}</button>;\n}`,
        options: [
            '0',
            '1',
            '2',
            'NaN'
        ],
        correctIndex: 2,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'The functional update form receives the latest state value each time it runs. The first update changes 0 → 1, and the second receives 1 and updates it to 2. This prevents stale state issues when multiple updates occur in the same event.'
    },
    {
        question: `What is the output in the console?\n\nfunction App() {\n  React.useEffect(() => {\n    console.log("Effect ran");\n  }, []);\n\n  console.log("Render");\n\n  return <div>Hello</div>;\n}`,
        options: [
            'Effect ran → Render',
            'Render → Effect ran',
            'Render only',
            'Effect ran only'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'React first renders the component, executing the function body and logging "Render". After the DOM is painted, React runs useEffect. Because the dependency array is empty, the effect runs only once after the initial render.'
    },
    {
        question: `What is logged after clicking the button once?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  React.useEffect(() => {\n    console.log("Effect:", count);\n  }, [count]);\n\n  return <button onClick={() => setCount(count + 1)}>Click</button>;\n}`,
        options: [
            'Effect: 0',
            'Effect: 1',
            'Effect: undefined',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'The effect depends on count. Whenever count changes, React runs the effect again. Clicking the button updates the state to 1, triggering a re-render and then executing the effect with the new value.'
    },
    {
        question: `What is logged after clicking the button once?\n\nfunction Child() {\n  console.log("Child render");\n  return <div>Child</div>;\n}\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  return (\n    <>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <Child />\n    </>\n  );\n}`,
        options: [
            'Nothing is logged',
            'Child render',
            'App render',
            'Child render → App render'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'When count updates, the parent component re-renders. Since Child is inside the parent and not memoized, it also re-renders. React re-executes the Child function, producing "Child render" in the console each time the parent renders.'
    },
    {
        question: `What is logged after clicking the button once?\n\nfunction App() {\n  const countRef = React.useRef(0);\n\n  const handleClick = () => {\n    countRef.current++;\n    console.log(countRef.current);\n  };\n\n  return <button onClick={handleClick}>Click</button>;\n}`,
        options: [
            '0',
            '1',
            'undefined',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'useRef stores a mutable value that persists across renders but does not trigger re-renders when changed. Updating countRef.current simply changes the value in memory and logs it without causing React to render the component again.'
    },
    {
        question: `What is logged when the component unmounts?\n\nfunction App() {\n  React.useEffect(() => {\n    console.log("Mount");\n\n    return () => {\n      console.log("Cleanup");\n    };\n  }, []);\n\n  return <div>Hello</div>;\n}`,
        options: [
            'Mount',
            'Cleanup',
            'Mount → Cleanup',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'The function returned from useEffect is the cleanup function. React runs it before the component unmounts or before running the effect again. In this example, it runs only when the component is removed from the DOM.'
    },
    {
        question: `What is rendered on screen?\n\nconst items = ["A", "B", "C"];\n\nfunction App() {\n  return (\n    <>\n      {items.map((item, index) => (\n        <div key={index}>{item}</div>\n      ))}\n    </>\n  );\n}`,
        options: [
            'A B C',
            'A',
            'Nothing renders',
            'Error: key is required'
        ],
        correctIndex: 0,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'React uses the key prop to identify list elements during reconciliation. Using the index works for static lists but may cause incorrect UI updates if items are reordered, inserted, or removed, because React may reuse DOM elements incorrectly.'
    },
    {
        question: `What is logged after 1 second?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  const handleClick = () => {\n    setTimeout(() => {\n      console.log(count);\n    }, 1000);\n  };\n\n  return (\n    <button onClick={() => {\n      setCount(5);\n      handleClick();\n    }}>\n      Click\n    </button>\n  );\n}`,
        options: [
            '5',
            '0',
            'undefined',
            'NaN'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Hard',
        explanation: 'JavaScript closures capture the variable value at the time the function is created. handleClick captures count as 0. Even though setCount(5) runs, the timeout callback still logs the old value stored in the closure.'
    },
    {
        question: `What is displayed after clicking the button once?\n\nfunction App() {\n  const [a, setA] = React.useState(1);\n  const [b, setB] = React.useState(2);\n\n  const handleClick = () => {\n    setA(a + 1);\n    setB(b + 1);\n  };\n\n  return <button onClick={handleClick}>{a + b}</button>;\n}`,
        options: [
            '3',
            '4',
            '5',
            '6'
        ],
        correctIndex: 2,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'Initially a + b equals 3. Clicking updates a to 2 and b to 3. React batches the updates and re-renders once with the new values. The displayed result becomes 2 + 3, which equals 5.'
    },
    {
        question: `What is logged in development with StrictMode?\n\nfunction App() {\n  console.log("Render");\n  return <div>Hello</div>;\n}`,
        options: [
            'Render',
            'Render → Render',
            'Nothing is logged',
            'Error'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'React Strict Mode intentionally renders components twice in development to detect side effects and unsafe lifecycle usage. This double rendering occurs only in development mode and does not happen in production builds.'
    },
    {
        question: `What is the output?\n\nfunction Greeting({ name = "Guest" }) {\n  return <h1>Hello {name}</h1>;\n}\n\nfunction App() {\n  return <Greeting />;\n}`,
        options: [
            'Hello',
            'Hello Guest',
            'Hello undefined',
            'Error: name is required'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'The destructuring assignment provides a default value "Guest" if the name prop is not passed. When Greeting is rendered without props, React uses this default value, resulting in "Hello Guest" being displayed.'
    },
    {
        question: `What is rendered?\n\nfunction App() {\n  const isLoggedIn = false;\n\n  return <div>{isLoggedIn && <h1>Welcome</h1>}</div>;\n}`,
        options: [
            'Welcome',
            'false',
            'Nothing renders inside the div',
            'Error'
        ],
        correctIndex: 2,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'The && operator returns the second operand only if the first is truthy. Since isLoggedIn is false, the expression evaluates to false. React ignores false values in rendering, so nothing appears in the DOM.'
    },
    {
        question: `What is the console output?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  if (count === 0) {\n    setCount(1);\n  }\n\n  console.log(count);\n  return <div>{count}</div>;\n}`,
        options: [
            '0',
            '1',
            '0 → 1',
            'Infinite loop'
        ],
        correctIndex: 2,
        category: 'react',
        difficulty: 'Hard',
        explanation: 'During the first render count is 0, so setCount(1) runs. React schedules another render. The first render logs 0, then React re-renders with updated state 1, logging 1. React prevents infinite loops because the condition becomes false.'
    },
    {
        question: `What is the console output?\n\nfunction App() {\n  const [count] = React.useState(() => {\n    console.log("Initialize");\n    return 5;\n  });\n\n  return <div>{count}</div>;\n}`,
        options: [
            'Initialize (on every render)',
            'Initialize (only once)',
            '5',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'When a function is passed to useState, React calls it only during the initial render to compute the initial state. This lazy initialization avoids recalculating expensive values on every render.'
    },
    {
        question: `What is the console output?\n\nfunction App() {\n  React.useEffect(() => {\n    console.log("Effect 1");\n  }, []);\n\n  React.useEffect(() => {\n    console.log("Effect 2");\n  }, []);\n\n  return <div>Hello</div>;\n}`,
        options: [
            'Effect 2 → Effect 1',
            'Effect 1 → Effect 2',
            'Effect 1 only',
            'Effect 2 only'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'React executes useEffect hooks in the order they are declared inside the component. After the initial render finishes and the DOM is painted, React runs the first effect and then the second effect sequentially.'
    },
    {
        question: `What is the console output?\n\nfunction App() {\n  const handleClick = () => console.log("Clicked");\n\n  return <button onClick={handleClick()}>Click</button>;\n}`,
        options: [
            'Clicked (on button click)',
            'Clicked (during render)',
            'Nothing is logged',
            'Error'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'handleClick() is executed immediately during render because parentheses call the function. The return value (undefined) becomes the event handler. Therefore "Clicked" logs during rendering instead of when the button is clicked.'
    },
    {
        question: `What is logged after multiple clicks?\n\nfunction App() {\n  let count = 0;\n\n  const handleClick = () => {\n    count++;\n    console.log(count);\n  };\n\n  return <button onClick={handleClick}>Click</button>;\n}`,
        options: [
            '1 → 2 → 3',
            '1 → 1 → 1',
            '0 → 0 → 0',
            'NaN'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'Local variables inside components reset on every render. Since count is not stored in useState or useRef, it reinitializes to 0 on each render. Therefore every click increments from 0 to 1 again.'
    },
    {
        question: `What is logged after three clicks?\n\nfunction App() {\n  const count = React.useRef(0);\n\n  const handleClick = () => {\n    count.current++;\n    console.log(count.current);\n  };\n\n  return <button onClick={handleClick}>Click</button>;\n}`,
        options: [
            '1 → 1 → 1',
            '1 → 2 → 3',
            '0 → 1 → 2',
            'NaN'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'useRef stores a mutable object that persists between renders. Updating count.current does not trigger re-rendering but keeps the updated value in memory, so the counter increments correctly across multiple clicks.'
    },
    {
        question: `What is the console output?\n\nfunction Child() {\n  console.log("Child");\n  return <div>Child</div>;\n}\n\nfunction App() {\n  console.log("Parent");\n  return <Child />;\n}`,
        options: [
            'Child → Parent',
            'Parent → Child',
            'Parent only',
            'Child only'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'React renders components top-down. The parent component function runs first, logging "Parent". During its rendering process, React then executes the Child component, which logs "Child".'
    },
    {
        question: `What is the console output?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  React.useEffect(() => {\n    setCount(5);\n  }, []);\n\n  console.log(count);\n\n  return <div>{count}</div>;\n}`,
        options: [
            '5',
            '0',
            '0 → 5',
            '5 → 0'
        ],
        correctIndex: 2,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'The first render logs 0. After rendering, useEffect runs and updates the state to 5. React schedules another render with the new state, logging 5.'
    },
    {
        question: `What happens after clicking the button?\n\nfunction App() {\n  const [count, setCount] = React.useState(1);\n\n  const handleClick = () => {\n    setCount(1);\n  };\n\n  console.log("Render");\n\n  return <button onClick={handleClick}>{count}</button>;\n}`,
        options: [
            'Render (logs again)',
            'No additional render',
            'Error',
            'Render → Render'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'React compares the previous and new state values. If the state value remains unchanged, React skips re-rendering the component to optimize performance.'
    },
    {
        question: `What is the console output?\n\nfunction App() {\n  const value = React.useMemo(() => {\n    console.log("Calculating");\n    return 10;\n  }, []);\n\n  return <div>{value}</div>;\n}`,
        options: [
            'Calculating (every render)',
            'Calculating (only once)',
            '10',
            'Nothing is logged'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Medium',
        explanation: 'useMemo runs the provided function during the initial render because the dependency array is empty. React stores the computed value and reuses it in future renders without recalculating unless dependencies change.'
    },
    {
        question: `What is displayed after clicking the button?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  const handleClick = () => {\n    setCount(1);\n    setCount(2);\n  };\n\n  return <button onClick={handleClick}>{count}</button>;\n}`,
        options: [
            '0',
            '1',
            '2',
            '3'
        ],
        correctIndex: 2,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'React batches state updates inside event handlers. Both updates run in the same event cycle, and the last state update overrides the previous one. Therefore the final rendered state becomes 2.'
    },
    {
        question: `What is the console output?\n\nfunction App() {\n  const [a] = React.useState(1);\n  const [b] = React.useState(2);\n\n  console.log(a, b);\n\n  return null;\n}`,
        options: [
            '1 2',
            '2 1',
            'undefined undefined',
            'Error'
        ],
        correctIndex: 0,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'React hooks rely on consistent call order across renders. Each useState call corresponds to a specific position in the component. React stores and retrieves state values based on this order.'
    },
    {
        question: `What is logged when the button is clicked?\n\nfunction App() {\n  const handleClick = () => console.log("Click");\n\n  return <button onClick={() => handleClick()}>Click</button>;\n}`,
        options: [
            'Click (during render)',
            'Click (on button click)',
            'Nothing is logged',
            'Error'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'The arrow function delays execution of handleClick until the click event occurs. Unlike directly calling handleClick() during render, this wrapper ensures the function runs only when the button is clicked.'
    },
    {
        question: `What is logged after clicking the button once?\n\nfunction Child({ value }) {\n  console.log("Child Render");\n  return <div>{value}</div>;\n}\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n\n  return (\n    <>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <Child value="Hello" />\n    </>\n  );\n}`,
        options: [
            'Nothing is logged',
            'Child Render',
            'Hello',
            'Error'
        ],
        correctIndex: 1,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'Even though the prop "Hello" does not change, the parent component re-renders after state updates. Since Child is not memoized, React renders it again during every parent re-render.'
    },
    {
        question: `What is the console output?\n\nfunction Child() {\n  console.log("Child Render");\n  return <div>Child</div>;\n}\n\nfunction App() {\n  const show = false;\n\n  return <div>{show && <Child />}</div>;\n}`,
        options: [
            'Child Render',
            'false',
            'No output',
            'Error'
        ],
        correctIndex: 2,
        category: 'react',
        difficulty: 'Easy',
        explanation: 'The logical && operator renders the right side only when the left side is truthy. Since show is false, the Child component is never rendered, so its function body does not execute.'
    }

];

// ════════════════════════════════════════════════════════════════════════════
// SEEDER FUNCTION
// ════════════════════════════════════════════════════════════════════════════

const seedOutputBasedQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('MongoDB connected for output-based questions seeder');

        // ── 1. Clear existing documents so the seeder is idempotent ─────────
        const deleted = await OutputBasedQuestion.deleteMany({});
        if (deleted.deletedCount > 0) {
            logger.info(`Cleared ${deleted.deletedCount} existing output-based question(s).`);
        }

        // ── 2. Insert fresh questions ────────────────────────────────────────
        await OutputBasedQuestion.insertMany(outputBasedQuestions);
        logger.info(`Successfully seeded ${outputBasedQuestions.length} output-based questions.`);

        // Print summary
        const jsCount = outputBasedQuestions.filter(q => q.category === 'javascript').length;
        const reactCount = outputBasedQuestions.filter(q => q.category === 'react').length;
        logger.info(`Breakdown → JavaScript: ${jsCount} | React: ${reactCount}`);

        await mongoose.disconnect();
        logger.info('MongoDB disconnected');
        process.exit(0);
    } catch (error) {
        logger.error('Output-based questions seeder failed:', error);
        process.exit(1);
    }
};

seedOutputBasedQuestions();
