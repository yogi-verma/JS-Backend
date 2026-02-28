const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Module = require('../models/Module');
const logger = require('../logger');

const javascriptLessonsData = [
    {
        phase: 'Phase 2: Functions & Scope',
        concepts: [
            {
                name: 'Function Declaration & Expression',
                content: `
# Function Declaration & Expression

## What are Functions?

Functions are reusable blocks of code that perform specific tasks. They are one of the fundamental building blocks in JavaScript. Functions help you organize your code, make it more readable, and avoid repetition by allowing you to reuse the same code multiple times.

## Function Declaration

A **function declaration** (also called a function statement) defines a named function using the \`function\` keyword. Function declarations are **hoisted**, which means they can be called before they are defined in the code.

### Syntax:
\`\`\`javascript
function functionName(parameters) {
    // code to be executed
    return value; // optional
}
\`\`\`

### Example 1: Basic Function Declaration
\`\`\`javascript
// Function declaration
function greet() {
    console.log("Hello, World!");
}

// Calling the function
greet(); // Output: Hello, World!
\`\`\`

**Explanation:** 
- We declare a function named \`greet\` using the \`function\` keyword
- The function body is enclosed in curly braces \`{}\`
- When we call \`greet()\`, it executes the code inside the function
- This function doesn't take any parameters and doesn't return anything

### Example 2: Function with Parameters
\`\`\`javascript
// Function declaration with parameters
function greetUser(name) {
    console.log("Hello, " + name + "!");
}

// Calling the function with an argument
greetUser("Alice");  // Output: Hello, Alice!
greetUser("Bob");    // Output: Hello, Bob!
\`\`\`

**Explanation:**
- The function \`greetUser\` accepts one parameter called \`name\`
- Parameters act as placeholders for values that will be passed when the function is called
- When we call \`greetUser("Alice")\`, the value "Alice" is assigned to the \`name\` parameter
- This makes functions dynamic and reusable with different inputs

### Example 3: Function with Multiple Parameters
\`\`\`javascript
// Function with multiple parameters
function addNumbers(num1, num2) {
    let sum = num1 + num2;
    console.log("The sum is: " + sum);
}

addNumbers(5, 3);    // Output: The sum is: 8
addNumbers(10, 20);  // Output: The sum is: 30
\`\`\`

**Explanation:**
- This function takes two parameters: \`num1\` and \`num2\`
- Inside the function, we calculate the sum and store it in a variable
- Multiple parameters are separated by commas
- Order matters - the first argument goes to the first parameter, and so on

### Example 4: Function with Return Statement
\`\`\`javascript
// Function that returns a value
function multiply(a, b) {
    let result = a * b;
    return result;
}

// Storing the returned value
let product = multiply(4, 5);
console.log(product);  // Output: 20

// Using returned value directly
console.log(multiply(3, 7));  // Output: 21
\`\`\`

**Explanation:**
- The \`return\` statement sends a value back to where the function was called
- After a return statement, the function stops executing
- The returned value can be stored in a variable or used directly
- If no return statement is used, the function returns \`undefined\` by default

### Example 5: Hoisting with Function Declaration
\`\`\`javascript
// Calling function before declaration (this works!)
sayHello();  // Output: Hello from hoisted function!

// Function declaration
function sayHello() {
    console.log("Hello from hoisted function!");
}
\`\`\`

**Explanation:**
- Function declarations are **hoisted** to the top of their scope
- This means you can call the function before its declaration in the code
- JavaScript moves function declarations to the top during the compilation phase
- This is a unique feature of function declarations

## Function Expression

A **function expression** defines a function as part of an expression, usually by assigning it to a variable. Function expressions are **not hoisted**, so they must be defined before they are called.

### Syntax:
\`\`\`javascript
const functionName = function(parameters) {
    // code to be executed
    return value; // optional
};
\`\`\`

### Example 1: Basic Function Expression
\`\`\`javascript
// Function expression
const greet = function() {
    console.log("Hello from function expression!");
};

// Calling the function
greet();  // Output: Hello from function expression!
\`\`\`

**Explanation:**
- We create a function without a name (anonymous function) and assign it to a variable \`greet\`
- The variable now holds a reference to the function
- We call the function using the variable name followed by parentheses
- This is stored in a variable just like any other value

### Example 2: Function Expression with Parameters
\`\`\`javascript
// Function expression with parameters
const calculateArea = function(length, width) {
    return length * width;
};

let area = calculateArea(5, 10);
console.log("Area: " + area);  // Output: Area: 50
\`\`\`

**Explanation:**
- This function expression takes two parameters and returns their product
- The function is stored in the \`calculateArea\` variable
- We can call it just like a function declaration
- The returned value is stored in the \`area\` variable

### Example 3: Named Function Expression
\`\`\`javascript
// Named function expression
const factorial = function fact(n) {
    if (n <= 1) {
        return 1;
    }
    return n * fact(n - 1);  // Recursive call using the name 'fact'
};

console.log(factorial(5));  // Output: 120
// console.log(fact(5));    // Error: fact is not defined
\`\`\`

**Explanation:**
- This is a named function expression where the function has a name \`fact\`
- The name \`fact\` is only available inside the function itself (useful for recursion)
- Outside the function, we must use the variable name \`factorial\`
- This is helpful for recursive functions and debugging

### Example 4: Function Expression NOT Hoisted
\`\`\`javascript
// This will cause an error!
// sayGoodbye();  // Error: Cannot access 'sayGoodbye' before initialization

// Function expression
const sayGoodbye = function() {
    console.log("Goodbye!");
};

// Now we can call it
sayGoodbye();  // Output: Goodbye!
\`\`\`

**Explanation:**
- Function expressions are **not hoisted** like function declarations
- You must define the function expression before calling it
- Variables declared with \`const\` and \`let\` are in the "temporal dead zone" before initialization
- This is a key difference between function declarations and expressions

### Example 5: Function Expression as a Callback
\`\`\`javascript
// Function expression used as a callback
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(num) {
    return num * 2;
});

console.log(doubled);  // Output: [2, 4, 6, 8, 10]
\`\`\`

**Explanation:**
- Function expressions are commonly used as callback functions
- Here, we pass an anonymous function to the \`map\` method
- The function is executed for each element in the array
- Function expressions are perfect for one-time use callbacks

## Key Differences Between Declaration and Expression

| Feature | Function Declaration | Function Expression |
|---------|---------------------|-------------------|
| **Syntax** | \`function name() {}\` | \`const name = function() {}\` |
| **Hoisting** | Yes - can be called before definition | No - must be defined before use |
| **Name Requirement** | Must have a name | Can be anonymous or named |
| **When to Use** | When you want hoisting behavior | When you want more control over when the function is available |

## Real-World Example: Combined Usage
\`\`\`javascript
// Function declaration for utility function
function validateAge(age) {
    return age >= 18;
}

// Function expression for specific operation
const processUser = function(name, age) {
    console.log("Processing user: " + name);
    
    if (validateAge(age)) {
        console.log(name + " is an adult.");
        return true;
    } else {
        console.log(name + " is a minor.");
        return false;
    }
};

// Using both functions
let result1 = processUser("John", 25);   // Processing user: John
                                          // John is an adult.
let result2 = processUser("Sarah", 16);  // Processing user: Sarah
                                          // Sarah is a minor.

console.log("Result 1:", result1);  // Result 1: true
console.log("Result 2:", result2);  // Result 2: false
\`\`\`

**Explanation:**
- We use a function declaration for \`validateAge\` - a utility function we might want to use anywhere
- We use a function expression for \`processUser\` - more controlled, defined when we need it
- Both types work together seamlessly in real applications
- Choose the type that best fits your use case and coding style

## Practice Exercises

### Exercise 1: Create a Function Declaration
Create a function called \`calculateDiscount\` that takes a price and discount percentage, then returns the final price after discount.

\`\`\`javascript
// Your solution:
function calculateDiscount(price, discountPercent) {
    let discount = price * (discountPercent / 100);
    let finalPrice = price - discount;
    return finalPrice;
}

console.log(calculateDiscount(100, 20));  // Should output: 80
\`\`\`

### Exercise 2: Create a Function Expression
Create a function expression called \`isEven\` that takes a number and returns \`true\` if it's even, \`false\` otherwise.

\`\`\`javascript
// Your solution:
const isEven = function(number) {
    return number % 2 === 0;
};

console.log(isEven(4));   // Should output: true
console.log(isEven(7));   // Should output: false
\`\`\`

## Summary

- **Functions** are reusable blocks of code that perform specific tasks
- **Function Declarations** use the \`function\` keyword, are hoisted, and must have a name
- **Function Expressions** assign a function to a variable, are not hoisted, and can be anonymous
- Both types can accept parameters and return values
- Use function declarations when you want hoisting and global utility functions
- Use function expressions when you want more control and for callbacks
- Understanding both types will make you a more flexible JavaScript developer

## Key Takeaways

✓ Function declarations are hoisted - you can use them before they're defined
✓ Function expressions are not hoisted - define them before use
✓ Both can accept parameters and return values
✓ Function expressions are great for callbacks and conditional function assignment
✓ Choose the right type based on your specific needs and coding style
                `
            },
            {
                name: 'Arrow Functions',
                content: `
# Arrow Functions

## What are Arrow Functions?

Arrow functions (also called **fat arrow functions**) were introduced in **ES6 (ECMAScript 2015)**. They provide a shorter and more concise syntax for writing functions compared to traditional function expressions. Arrow functions use the \`=>\` (fat arrow) syntax.

Besides the shorter syntax, arrow functions have important differences in how they handle the \`this\` keyword, which makes them especially useful in certain situations like callbacks and methods on arrays.

## Basic Syntax

\`\`\`javascript
// Traditional function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function equivalent
const addArrow = (a, b) => {
    return a + b;
};

// Even shorter - implicit return (single expression)
const addShort = (a, b) => a + b;
\`\`\`

## Arrow Function Syntax Rules

| Scenario | Syntax | Example |
|----------|--------|---------|
| **Multiple parameters** | \`(a, b) => {}\` | \`(x, y) => x + y\` |
| **Single parameter** | \`a => {}\` (parentheses optional) | \`x => x * 2\` |
| **No parameters** | \`() => {}\` | \`() => console.log("Hi")\` |
| **Single expression** | \`() => expression\` (implicit return) | \`(a, b) => a + b\` |
| **Multiple statements** | \`() => { statements }\` (explicit return needed) | \`(a, b) => { let sum = a + b; return sum; }\` |

---

### Example 1: Basic Arrow Function
\`\`\`javascript
// Traditional function expression
const greet = function() {
    return "Hello, World!";
};

// Arrow function equivalent
const greetArrow = () => {
    return "Hello, World!";
};

// Arrow function with implicit return
const greetShort = () => "Hello, World!";

console.log(greet());        // Output: Hello, World!
console.log(greetArrow());   // Output: Hello, World!
console.log(greetShort());   // Output: Hello, World!
\`\`\`

**Explanation:**
- All three functions do the same thing - return the string "Hello, World!"
- The arrow function version is shorter and more concise
- When the function body has only one expression, you can omit the curly braces \`{}\` and the \`return\` keyword — the value is returned implicitly
- The \`() =>\` syntax replaces \`function()\`

### Example 2: Arrow Function with a Single Parameter
\`\`\`javascript
// Traditional function
const double = function(num) {
    return num * 2;
};

// Arrow function - parentheses optional for single parameter
const doubleArrow = num => num * 2;

console.log(double(5));        // Output: 10
console.log(doubleArrow(5));   // Output: 10
\`\`\`

**Explanation:**
- When there is only **one parameter**, you can omit the parentheses around it
- \`num => num * 2\` is a valid and clean syntax
- The function takes \`num\`, multiplies it by 2, and returns the result implicitly
- This is the most compact form of an arrow function

### Example 3: Arrow Function with Multiple Parameters
\`\`\`javascript
// Arrow function with multiple parameters
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

console.log(add(10, 5));       // Output: 15
console.log(subtract(10, 5));  // Output: 5
console.log(multiply(10, 5));  // Output: 50
\`\`\`

**Explanation:**
- When there are **multiple parameters**, parentheses \`()\` are required
- Each function takes two parameters and performs a calculation
- The result is returned implicitly since each has a single expression
- This is a clean and readable way to create simple utility functions

### Example 4: Arrow Function with Function Body (Multiple Statements)
\`\`\`javascript
// Arrow function with multiple statements
const describeNumber = (num) => {
    let description = "";

    if (num > 0) {
        description = num + " is positive";
    } else if (num < 0) {
        description = num + " is negative";
    } else {
        description = num + " is zero";
    }

    return description;
};

console.log(describeNumber(5));    // Output: 5 is positive
console.log(describeNumber(-3));   // Output: -3 is negative
console.log(describeNumber(0));    // Output: 0 is zero
\`\`\`

**Explanation:**
- When the function body has **multiple statements**, you must use curly braces \`{}\`
- You must explicitly use the \`return\` keyword to return a value
- The implicit return only works for single-expression arrow functions
- This behaves exactly like a traditional function, just with shorter syntax

### Example 5: Arrow Functions with Array Methods
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);  // Output: [2, 4, 6, 8, 10]

// Double each number
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // Output: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Sum all numbers
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // Output: 55

// Find first number greater than 5
const found = numbers.find(num => num > 5);
console.log(found);  // Output: 6
\`\`\`

**Explanation:**
- Arrow functions shine when used with array methods like \`filter\`, \`map\`, \`reduce\`, \`find\`
- The concise syntax makes callback functions much more readable
- \`filter\` creates a new array with elements that pass the test
- \`map\` creates a new array by transforming each element
- \`reduce\` accumulates all values into a single result
- \`find\` returns the first element that matches the condition

### Example 6: Arrow Functions and \`this\` Keyword
\`\`\`javascript
// Problem with traditional function and 'this'
const person1 = {
    name: "Alice",
    hobbies: ["reading", "coding", "gaming"],
    showHobbies: function() {
        // 'this' refers to person1 here
        this.hobbies.forEach(function(hobby) {
            // 'this' is undefined here (in strict mode) or refers to global object
            // console.log(this.name + " likes " + hobby); // ERROR!
        });
    }
};

// Solution with arrow function and 'this'
const person2 = {
    name: "Bob",
    hobbies: ["reading", "coding", "gaming"],
    showHobbies: function() {
        // Arrow function does NOT have its own 'this'
        // It inherits 'this' from the surrounding scope (person2)
        this.hobbies.forEach(hobby => {
            console.log(this.name + " likes " + hobby);
        });
    }
};

person2.showHobbies();
// Output:
// Bob likes reading
// Bob likes coding
// Bob likes gaming
\`\`\`

**Explanation:**
- In traditional functions, \`this\` depends on **how the function is called**
- Inside a regular callback in \`forEach\`, \`this\` loses its reference to the object
- Arrow functions do **not have their own \`this\`** — they inherit \`this\` from the enclosing lexical scope
- This makes arrow functions perfect for callbacks where you need to access the outer \`this\`
- This is one of the most important differences between arrow functions and regular functions

### Example 7: Returning an Object Literal
\`\`\`javascript
// Wrapping object literal in parentheses for implicit return
const createUser = (name, age) => ({ name: name, age: age });

// Using shorthand property names
const createUserShort = (name, age) => ({ name, age });

console.log(createUser("Alice", 25));
// Output: { name: 'Alice', age: 25 }

console.log(createUserShort("Bob", 30));
// Output: { name: 'Bob', age: 30 }
\`\`\`

**Explanation:**
- To return an object literal implicitly, wrap it in parentheses \`()\`
- Without parentheses, JavaScript would interpret the \`{}\` as a function body, not an object
- \`({ name, age })\` uses ES6 shorthand property syntax where \`name: name\` becomes just \`name\`
- This pattern is very common in React and functional programming

## When NOT to Use Arrow Functions

\`\`\`javascript
// 1. As object methods (arrow function doesn't bind its own 'this')
const car = {
    brand: "Toyota",
    getBrand: () => {
        return this.brand;  // 'this' is NOT the car object!
    }
};
console.log(car.getBrand());  // Output: undefined

// Correct way: use regular function
const carFixed = {
    brand: "Toyota",
    getBrand: function() {
        return this.brand;  // 'this' correctly refers to carFixed
    }
};
console.log(carFixed.getBrand());  // Output: Toyota

// 2. Arrow functions cannot be used as constructors
// const Person = (name) => { this.name = name; };
// const p = new Person("Alice"); // TypeError: Person is not a constructor
\`\`\`

**Explanation:**
- Don't use arrow functions as object methods because \`this\` won't refer to the object
- Arrow functions cannot be used with \`new\` — they are not constructors
- Use regular functions when you need dynamic \`this\` binding

## Summary

- Arrow functions provide a shorter syntax using \`=>\`
- Single expression can be returned implicitly (without \`return\` keyword)
- Single parameter doesn't need parentheses
- Arrow functions do **not** have their own \`this\` — they inherit it from the surrounding scope
- Perfect for callbacks, array methods, and short utility functions
- Do NOT use them as object methods or constructors

## Key Takeaways

✓ Arrow functions are concise: \`(a, b) => a + b\`
✓ Implicit return works for single expressions
✓ \`this\` is inherited from the enclosing scope (lexical \`this\`)
✓ Great with array methods like \`map\`, \`filter\`, \`reduce\`
✓ Cannot be used as constructors or with \`new\`
✓ Wrap object literals in parentheses for implicit return: \`() => ({})\`
                `
            },
            {
                name: 'Default Parameters',
                content: `
# Default Parameters

## What are Default Parameters?

Default parameters allow you to set **default values** for function parameters. If a function is called without providing a value for a parameter (or if \`undefined\` is passed), the default value is used instead. This feature was introduced in **ES6 (ECMAScript 2015)**.

Before ES6, developers had to manually check for missing arguments inside the function body. Default parameters make this much cleaner and more readable.

## Syntax

\`\`\`javascript
function functionName(param1 = defaultValue1, param2 = defaultValue2) {
    // code to be executed
}
\`\`\`

---

### Example 1: Basic Default Parameters
\`\`\`javascript
// Without default parameters (old way)
function greetOld(name) {
    name = name || "Guest";
    console.log("Hello, " + name + "!");
}

// With default parameters (ES6 way)
function greetNew(name = "Guest") {
    console.log("Hello, " + name + "!");
}

greetOld();          // Output: Hello, Guest!
greetOld("Alice");   // Output: Hello, Alice!

greetNew();          // Output: Hello, Guest!
greetNew("Bob");     // Output: Hello, Bob!
\`\`\`

**Explanation:**
- The old way used \`||\` (OR operator) to set default values, but this has issues with falsy values like \`0\`, \`""\`, or \`false\`
- With ES6 default parameters, you assign the default directly in the parameter list: \`name = "Guest"\`
- If no argument is passed, or \`undefined\` is passed, the default value \`"Guest"\` is used
- If an argument is provided, it overrides the default value

### Example 2: Multiple Default Parameters
\`\`\`javascript
function createProfile(name = "Anonymous", age = 0, country = "Unknown") {
    console.log("Name: " + name);
    console.log("Age: " + age);
    console.log("Country: " + country);
    console.log("---");
}

// All defaults used
createProfile();
// Output:
// Name: Anonymous
// Age: 0
// Country: Unknown
// ---

// Partial arguments provided
createProfile("Alice");
// Output:
// Name: Alice
// Age: 0
// Country: Unknown
// ---

// All arguments provided
createProfile("Bob", 25, "USA");
// Output:
// Name: Bob
// Age: 25
// Country: USA
// ---
\`\`\`

**Explanation:**
- You can set default values for multiple parameters
- Parameters without arguments use their defaults from left to right
- When you call \`createProfile("Alice")\`, only \`name\` gets the provided value; \`age\` and \`country\` use defaults
- You can override all defaults by providing all arguments

### Example 3: Default Parameters with Expressions
\`\`\`javascript
// Default value can be an expression
function getTimestamp(date = new Date()) {
    return date.toISOString();
}

console.log(getTimestamp());
// Output: current date/time in ISO format, e.g. 2026-02-28T10:30:00.000Z

console.log(getTimestamp(new Date("2025-01-01")));
// Output: 2025-01-01T00:00:00.000Z

// Default value using a function call
function generateId() {
    return Math.floor(Math.random() * 10000);
}

function createItem(name, id = generateId()) {
    return { name: name, id: id };
}

console.log(createItem("Laptop"));
// Output: { name: 'Laptop', id: 7382 } (random id)

console.log(createItem("Phone", 42));
// Output: { name: 'Phone', id: 42 }
\`\`\`

**Explanation:**
- Default values are not limited to simple values — they can be **expressions** or **function calls**
- \`new Date()\` is evaluated only when no argument is provided
- \`generateId()\` is called only when \`id\` is not passed — the expression is evaluated **lazily** at call time
- This is powerful for generating dynamic defaults like timestamps, random IDs, etc.

### Example 4: Default Parameters Using Previous Parameters
\`\`\`javascript
// A default parameter can reference earlier parameters
function calculatePrice(price, tax = price * 0.1, total = price + tax) {
    console.log("Price: $" + price);
    console.log("Tax: $" + tax);
    console.log("Total: $" + total);
}

calculatePrice(100);
// Output:
// Price: $100
// Tax: $10
// Total: $110

calculatePrice(100, 20);
// Output:
// Price: $100
// Tax: $20
// Total: $120

calculatePrice(100, 20, 150);
// Output:
// Price: $100
// Tax: $20
// Total: $150
\`\`\`

**Explanation:**
- A default parameter can reference **previous parameters** in the same parameter list
- \`tax = price * 0.1\` uses the value of \`price\` to calculate the default tax
- \`total = price + tax\` uses both \`price\` and \`tax\` (whether default or provided)
- Parameters are evaluated left to right, so a default cannot reference a parameter that comes after it

### Example 5: Default Parameters with Arrow Functions
\`\`\`javascript
// Arrow function with default parameters
const greet = (name = "World") => \`Hello, \${name}!\`;

console.log(greet());          // Output: Hello, World!
console.log(greet("Alice"));   // Output: Hello, Alice!

// Arrow function: calculate shipping cost
const calculateShipping = (weight, ratePerKg = 5, handlingFee = 10) => {
    const shippingCost = weight * ratePerKg + handlingFee;
    return shippingCost;
};

console.log(calculateShipping(3));          // Output: 25 (3*5 + 10)
console.log(calculateShipping(3, 8));       // Output: 34 (3*8 + 10)
console.log(calculateShipping(3, 8, 5));    // Output: 29 (3*8 + 5)
\`\`\`

**Explanation:**
- Default parameters work exactly the same way with arrow functions
- The syntax is clean: \`(name = "World") => ...\`
- You can combine arrow functions with template literals for even cleaner code
- Default parameters make functions more flexible without requiring all arguments

### Example 6: Undefined vs Null with Default Parameters
\`\`\`javascript
function showValue(value = "default") {
    console.log("Value:", value);
}

showValue();           // Output: Value: default  (no argument → uses default)
showValue(undefined);  // Output: Value: default  (undefined → uses default)
showValue(null);       // Output: Value: null      (null is a valid value)
showValue(0);          // Output: Value: 0         (0 is a valid value)
showValue("");         // Output: Value:            (empty string is valid)
showValue(false);      // Output: Value: false      (false is a valid value)
\`\`\`

**Explanation:**
- Default values are triggered **only** when the argument is \`undefined\` or not provided
- \`null\` does **NOT** trigger the default — it's treated as a deliberate value
- This is a key difference from the old \`||\` pattern, which would replace all falsy values (\`0\`, \`""\`, \`false\`, \`null\`)
- ES6 defaults are more precise and predictable

### Example 7: Practical Real-World Example
\`\`\`javascript
// API request function with sensible defaults
const fetchData = (url, method = "GET", headers = { "Content-Type": "application/json" }, timeout = 5000) => {
    console.log("Fetching:", url);
    console.log("Method:", method);
    console.log("Headers:", JSON.stringify(headers));
    console.log("Timeout:", timeout + "ms");
    console.log("---");
};

// Simple GET request — only URL needed
fetchData("https://api.example.com/users");
// Output:
// Fetching: https://api.example.com/users
// Method: GET
// Headers: {"Content-Type":"application/json"}
// Timeout: 5000ms

// POST request with custom method
fetchData("https://api.example.com/users", "POST");
// Output:
// Fetching: https://api.example.com/users
// Method: POST
// Headers: {"Content-Type":"application/json"}
// Timeout: 5000ms
\`\`\`

**Explanation:**
- Default parameters are perfect for configuration functions
- Users only need to provide the values that differ from sensible defaults
- This pattern is widely used in HTTP libraries, UI components, and configuration systems
- It makes APIs easier to use while remaining flexible

## Summary

- Default parameters provide fallback values when arguments are missing or \`undefined\`
- They replace the old \`param = param || defaultValue\` pattern with a cleaner syntax
- Default values can be simple values, expressions, or function calls
- Later defaults can reference earlier parameters
- Only \`undefined\` (or missing argument) triggers the default, not \`null\` or other falsy values
- Work with all function types: declarations, expressions, and arrow functions

## Key Takeaways

✓ Syntax: \`function greet(name = "World")\`
✓ Defaults are used when argument is \`undefined\` or not provided
✓ \`null\` does NOT trigger default values
✓ Defaults can be expressions or function calls (evaluated lazily)
✓ Later parameters can reference earlier ones in defaults
✓ Makes functions more flexible and APIs easier to use
                `
            },
            {
                name: 'Rest & Spread Operator',
                content: `
# Rest & Spread Operator

## Introduction

The **rest operator** (\`...\`) and the **spread operator** (\`...\`) look identical — both use three dots \`...\` — but they do opposite things depending on where they are used. Both were introduced in **ES6 (ECMAScript 2015)**.

- **Rest Operator**: **Collects** multiple elements into a single array or object. Used in function parameters and destructuring.
- **Spread Operator**: **Expands** (spreads) an array or object into individual elements. Used in function calls, array literals, and object literals.

> **Easy memory trick:** Rest **gathers** things together. Spread **pulls** things apart.

---

## Part 1: Rest Operator (\`...\`)

The rest operator collects the remaining arguments or elements into an array (or object). It's used in function parameters and destructuring patterns.

### Syntax:
\`\`\`javascript
// In function parameters
function myFunc(...args) {
    // args is an array of all passed arguments
}

// In destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
\`\`\`

---

### Example 1: Rest Operator in Function Parameters
\`\`\`javascript
// Rest operator collects all arguments into an array
function sum(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log(sum(1, 2));           // Output: 3
console.log(sum(1, 2, 3, 4));     // Output: 10
console.log(sum(10, 20, 30));     // Output: 60
\`\`\`

**Explanation:**
- \`...numbers\` collects **all** arguments passed to the function into an array called \`numbers\`
- No matter how many arguments you pass, they all get collected
- Inside the function, \`numbers\` is a real array (unlike the old \`arguments\` object)
- This makes the function flexible — it can accept any number of arguments

### Example 2: Rest Operator with Named Parameters
\`\`\`javascript
// Rest operator must be the LAST parameter
function introduce(greeting, ...names) {
    names.forEach(name => {
        console.log(greeting + ", " + name + "!");
    });
}

introduce("Hello", "Alice", "Bob", "Charlie");
// Output:
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!

introduce("Hi", "David");
// Output:
// Hi, David!
\`\`\`

**Explanation:**
- The first argument \`"Hello"\` is assigned to \`greeting\`
- All remaining arguments are collected into the \`names\` array by the rest operator
- The rest parameter must always be the **last** parameter in the function definition
- This lets you have fixed parameters alongside a flexible number of additional ones

### Example 3: Rest Operator in Array Destructuring
\`\`\`javascript
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

// Destructure with rest
const [first, second, ...remaining] = fruits;

console.log(first);       // Output: Apple
console.log(second);      // Output: Banana
console.log(remaining);   // Output: ["Cherry", "Date", "Elderberry"]
\`\`\`

**Explanation:**
- \`first\` gets the first element \`"Apple"\`
- \`second\` gets the second element \`"Banana"\`
- \`...remaining\` collects all the rest of the elements into a new array
- This is a powerful way to separate specific elements from the rest of an array

### Example 4: Rest Operator in Object Destructuring
\`\`\`javascript
const user = {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
    country: "USA",
    role: "developer"
};

// Extract specific properties, collect the rest
const { name, email, ...otherDetails } = user;

console.log(name);          // Output: Alice
console.log(email);         // Output: alice@example.com
console.log(otherDetails);  // Output: { age: 25, country: 'USA', role: 'developer' }
\`\`\`

**Explanation:**
- \`name\` and \`email\` are extracted as individual variables
- \`...otherDetails\` collects all remaining properties into a new object
- The original \`user\` object is not modified
- This pattern is very common in React for separating props you need from the rest

---

## Part 2: Spread Operator (\`...\`)

The spread operator expands an iterable (like an array or object) into individual elements. It's the opposite of the rest operator.

### Syntax:
\`\`\`javascript
// In array literals
const newArray = [...oldArray, newElement];

// In object literals
const newObj = { ...oldObj, newProperty: value };

// In function calls
myFunc(...args);
\`\`\`

---

### Example 5: Spread Operator with Arrays
\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combining arrays
const combined = [...arr1, ...arr2];
console.log(combined);  // Output: [1, 2, 3, 4, 5, 6]

// Adding elements while spreading
const withExtra = [0, ...arr1, 3.5, ...arr2, 7];
console.log(withExtra);  // Output: [0, 1, 2, 3, 3.5, 4, 5, 6, 7]
\`\`\`

**Explanation:**
- \`...arr1\` expands \`[1, 2, 3]\` into individual elements \`1, 2, 3\`
- You can combine multiple arrays into one using spread
- You can also insert extra elements anywhere while spreading arrays
- This creates a **new array** — the original arrays are not modified

### Example 6: Spread Operator to Copy Arrays
\`\`\`javascript
const original = [1, 2, 3, 4, 5];

// Creating a shallow copy
const copy = [...original];

copy.push(6);

console.log(original);  // Output: [1, 2, 3, 4, 5] (unchanged)
console.log(copy);      // Output: [1, 2, 3, 4, 5, 6]

// Without spread (reference copy - both point to same array)
const refCopy = original;
refCopy.push(99);
console.log(original);  // Output: [1, 2, 3, 4, 5, 99] (modified!)
\`\`\`

**Explanation:**
- \`[...original]\` creates a **shallow copy** of the array — a new array with the same elements
- Modifying the copy does not affect the original
- Without spread, \`const refCopy = original\` creates a **reference** — both variables point to the same array
- Spread is the modern, clean way to copy arrays (replaces \`Array.from()\` or \`.slice()\`)

### Example 7: Spread Operator with Objects
\`\`\`javascript
const userDefaults = {
    theme: "light",
    language: "English",
    notifications: true
};

const userPreferences = {
    theme: "dark",
    fontSize: 16
};

// Merge objects (later properties override earlier ones)
const settings = { ...userDefaults, ...userPreferences };

console.log(settings);
// Output: {
//   theme: 'dark',           ← overridden by userPreferences
//   language: 'English',     ← from userDefaults
//   notifications: true,     ← from userDefaults
//   fontSize: 16             ← from userPreferences
// }
\`\`\`

**Explanation:**
- Spread with objects copies all properties into a new object
- When properties have the same key (like \`theme\`), the **last one wins**
- \`userPreferences.theme\` (\`"dark"\`) overrides \`userDefaults.theme\` (\`"light"\`)
- This is a common pattern for merging default settings with user preferences

### Example 8: Spread Operator in Function Calls
\`\`\`javascript
function addThreeNumbers(a, b, c) {
    return a + b + c;
}

const numbers = [10, 20, 30];

// Without spread - you'd need to do this:
console.log(addThreeNumbers(numbers[0], numbers[1], numbers[2]));  // 60

// With spread - much cleaner!
console.log(addThreeNumbers(...numbers));  // Output: 60

// Using with Math.max
const scores = [85, 92, 78, 96, 88];
console.log(Math.max(...scores));  // Output: 96
console.log(Math.min(...scores));  // Output: 78
\`\`\`

**Explanation:**
- \`...numbers\` expands the array into individual arguments: \`addThreeNumbers(10, 20, 30)\`
- This is extremely useful with functions like \`Math.max\` and \`Math.min\` that expect individual arguments, not arrays
- It replaces the old \`Function.prototype.apply()\` method

### Example 9: Spread to Update Objects (Immutable Pattern)
\`\`\`javascript
const student = {
    name: "Alice",
    age: 20,
    grade: "B"
};

// Update grade without mutating the original
const updatedStudent = { ...student, grade: "A" };

console.log(student);
// Output: { name: 'Alice', age: 20, grade: 'B' } (unchanged)

console.log(updatedStudent);
// Output: { name: 'Alice', age: 20, grade: 'A' } (updated copy)

// Add new properties
const studentWithCourse = { ...student, course: "JavaScript", year: 2026 };
console.log(studentWithCourse);
// Output: { name: 'Alice', age: 20, grade: 'B', course: 'JavaScript', year: 2026 }
\`\`\`

**Explanation:**
- Spread creates a new object with all properties from \`student\`
- Adding \`grade: "A"\` after the spread overrides the original value
- The original \`student\` object remains unchanged — this is called **immutability**
- This pattern is heavily used in React state management and Redux

---

## Rest vs Spread — Side by Side

| Feature | Rest (\`...\`) | Spread (\`...\`) |
|---------|--------------|----------------|
| **Purpose** | Collects elements into an array/object | Expands elements from an array/object |
| **Location** | Function parameters, destructuring (left side of \`=\`) | Function calls, array/object literals (right side of \`=\`) |
| **Effect** | Gathers several items into one | Splits one item into many |
| **Example** | \`function sum(...nums)\` | \`console.log(...arr)\` |

---

## Real-World Example: Combining Rest and Spread
\`\`\`javascript
// A logging utility using rest and spread together
function logMessage(level, ...messages) {
    const timestamp = new Date().toLocaleTimeString();
    const fullMessage = messages.join(" ");
    console.log(\`[\${timestamp}] [\${level.toUpperCase()}] \${fullMessage}\`);
}

logMessage("info", "Server", "started", "on", "port", "3000");
// Output: [10:30:45 AM] [INFO] Server started on port 3000

logMessage("error", "Database", "connection", "failed");
// Output: [10:30:45 AM] [ERROR] Database connection failed

// Merging user input with defaults using spread
const defaultConfig = { host: "localhost", port: 3000, debug: false };
const userConfig = { port: 8080, debug: true };

const finalConfig = { ...defaultConfig, ...userConfig };
console.log(finalConfig);
// Output: { host: 'localhost', port: 8080, debug: true }

// Copying and extending arrays
const basicPermissions = ["read", "write"];
const adminPermissions = [...basicPermissions, "delete", "manage-users"];
console.log(adminPermissions);
// Output: ['read', 'write', 'delete', 'manage-users']
\`\`\`

**Explanation:**
- \`logMessage\` uses **rest** to collect all message parts into an array, then joins them
- \`finalConfig\` uses **spread** to merge default and user configurations
- \`adminPermissions\` uses **spread** to extend the basic permissions array
- In practice, rest and spread are often used together to build flexible, clean code

## Practice Exercises

### Exercise 1: Rest Operator
Create a function \`average\` that takes any number of scores and returns the average.

\`\`\`javascript
// Your solution:
const average = (...scores) => {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
};

console.log(average(80, 90, 100));       // Should output: 90
console.log(average(70, 85, 90, 95));    // Should output: 85
\`\`\`

### Exercise 2: Spread Operator
Given two arrays, create a new sorted array containing all elements from both.

\`\`\`javascript
// Your solution:
const arr1 = [3, 1, 4];
const arr2 = [2, 5, 6];

const sorted = [...arr1, ...arr2].sort((a, b) => a - b);
console.log(sorted);  // Should output: [1, 2, 3, 4, 5, 6]
\`\`\`

### Exercise 3: Object Spread
Create a function that takes a user object and returns a new object with an added \`updatedAt\` timestamp.

\`\`\`javascript
// Your solution:
const addTimestamp = (user) => {
    return { ...user, updatedAt: new Date().toISOString() };
};

const user = { name: "Alice", email: "alice@example.com" };
const updated = addTimestamp(user);
console.log(updated);
// Output: { name: 'Alice', email: 'alice@example.com', updatedAt: '2026-02-28T...' }
console.log(user);  // Original unchanged
\`\`\`

## Summary

- **Rest operator (\`...\`)** collects multiple elements into a single array or object
- **Spread operator (\`...\`)** expands an array or object into individual elements
- Both use the same \`...\` syntax but serve opposite purposes
- Rest is used in function parameters and destructuring (left side)
- Spread is used in function calls, arrays, and objects (right side)
- Spread creates shallow copies — great for immutability patterns
- Both are essential in modern JavaScript, React, and Node.js development

## Key Takeaways

✓ Rest gathers: \`function sum(...nums)\` — collects args into an array
✓ Spread expands: \`Math.max(...arr)\` — spreads array into arguments
✓ Spread copies arrays: \`[...arr]\` and objects: \`{...obj}\` (shallow copy)
✓ Spread merges: \`{...defaults, ...overrides}\` — later values win
✓ Rest must be the last parameter in functions and destructuring
✓ Both are heavily used in React, Redux, and modern JavaScript patterns
                `
            },
            {
                name: 'Callback Functions',
                content: `
# Callback Functions

## What is a Callback Function?

A **callback function** is a function that is **passed as an argument** to another function and is **executed (called back) later** — usually after some operation completes. Callbacks are how JavaScript handles **asynchronous operations** and are fundamental to understanding how JavaScript works.

In simple terms: A callback is a function you give to another function, saying _"call this when you're done."_

## Why Do We Need Callbacks?

JavaScript is **single-threaded**, meaning it can execute only one piece of code at a time. Callbacks allow us to:
- Handle tasks that take time (network requests, file reading, timers)
- Execute code in a specific order
- Keep the program responsive while waiting for operations to complete

---

### Example 1: Basic Callback Function
\`\`\`javascript
// A function that accepts another function as an argument
function greet(name, callback) {
    console.log("Hello, " + name + "!");
    callback();  // Call the callback function
}

// The callback function
function sayGoodbye() {
    console.log("Goodbye! Have a great day!");
}

// Pass sayGoodbye as a callback
greet("Alice", sayGoodbye);
// Output:
// Hello, Alice!
// Goodbye! Have a great day!
\`\`\`

**Explanation:**
- \`greet\` is a function that takes two arguments: a \`name\` and a \`callback\`
- \`sayGoodbye\` is passed as the callback argument (notice: no parentheses — we pass the function itself, not its result)
- Inside \`greet\`, after printing the greeting, it calls \`callback()\` which executes \`sayGoodbye\`
- This lets us customize what happens after the greeting

### Example 2: Anonymous Callback Function
\`\`\`javascript
function processNumber(num, callback) {
    let result = callback(num);
    console.log("Result: " + result);
}

// Passing anonymous functions as callbacks
processNumber(5, function(n) {
    return n * 2;
});
// Output: Result: 10

processNumber(5, function(n) {
    return n * n;
});
// Output: Result: 25

// Using arrow functions as callbacks
processNumber(5, (n) => n + 10);
// Output: Result: 15
\`\`\`

**Explanation:**
- We don't have to define a named function — we can pass an anonymous function directly
- The same \`processNumber\` function produces different results depending on which callback we pass
- Arrow functions make callbacks even more concise
- This pattern makes functions highly reusable and flexible

### Example 3: Callbacks with Array Methods
\`\`\`javascript
const students = [
    { name: "Alice", score: 85 },
    { name: "Bob", score: 92 },
    { name: "Charlie", score: 78 },
    { name: "Diana", score: 96 },
    { name: "Eve", score: 88 }
];

// forEach — callback runs for each element
students.forEach(function(student) {
    console.log(student.name + ": " + student.score);
});
// Output:
// Alice: 85
// Bob: 92
// Charlie: 78
// Diana: 96
// Eve: 88

// filter — callback decides which elements to keep
const topStudents = students.filter(student => student.score >= 90);
console.log(topStudents);
// Output: [{ name: 'Bob', score: 92 }, { name: 'Diana', score: 96 }]

// map — callback transforms each element
const names = students.map(student => student.name);
console.log(names);
// Output: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']

// sort — callback defines sort order
const sorted = [...students].sort((a, b) => b.score - a.score);
console.log(sorted[0].name + " has the highest score!");
// Output: Diana has the highest score!
\`\`\`

**Explanation:**
- \`forEach\`, \`filter\`, \`map\`, and \`sort\` all accept callback functions
- The callback is automatically called with each element of the array
- Each method uses the callback differently: \`forEach\` just executes, \`filter\` keeps/removes, \`map\` transforms, \`sort\` compares
- These are the most common uses of callbacks in everyday JavaScript

### Example 4: Callbacks with Timers
\`\`\`javascript
console.log("Step 1: Start");

// setTimeout — calls the callback after a delay
setTimeout(function() {
    console.log("Step 2: This runs after 2 seconds");
}, 2000);

console.log("Step 3: This runs immediately (doesn't wait for timeout)");

// Output:
// Step 1: Start
// Step 3: This runs immediately (doesn't wait for timeout)
// Step 2: This runs after 2 seconds  (appears after 2s delay)

// setInterval — calls the callback repeatedly
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log("Tick " + count);
    if (count >= 3) {
        clearInterval(intervalId);  // Stop after 3 ticks
        console.log("Timer stopped!");
    }
}, 1000);
// Output (one per second):
// Tick 1
// Tick 2
// Tick 3
// Timer stopped!
\`\`\`

**Explanation:**
- \`setTimeout\` takes a callback and a delay (in milliseconds) — calls the callback once after the delay
- JavaScript doesn't pause — it continues executing the next lines while waiting
- That's why "Step 3" appears before "Step 2" even though it comes after in the code
- \`setInterval\` calls the callback repeatedly at the specified interval
- This demonstrates JavaScript's **asynchronous** nature powered by callbacks

### Example 5: Callback Hell (The Problem)
\`\`\`javascript
// Simulating asynchronous operations with callbacks
function getUser(userId, callback) {
    setTimeout(() => {
        console.log("Got user");
        callback({ id: userId, name: "Alice" });
    }, 1000);
}

function getOrders(user, callback) {
    setTimeout(() => {
        console.log("Got orders for " + user.name);
        callback(["Order1", "Order2"]);
    }, 1000);
}

function getOrderDetails(order, callback) {
    setTimeout(() => {
        console.log("Got details for " + order);
        callback({ order: order, total: 99.99 });
    }, 1000);
}

// Callback Hell — deeply nested callbacks
getUser(1, function(user) {
    getOrders(user, function(orders) {
        getOrderDetails(orders[0], function(details) {
            console.log("Final result:", details);
            // Imagine more nesting here...
        });
    });
});
// Output (each line after 1 second):
// Got user
// Got orders for Alice
// Got details for Order1
// Final result: { order: 'Order1', total: 99.99 }
\`\`\`

**Explanation:**
- When multiple async operations depend on each other, callbacks get deeply nested
- This is called **"Callback Hell"** or the **"Pyramid of Doom"**
- The code becomes hard to read, maintain, and debug
- This problem is why **Promises** and **async/await** were introduced later in JavaScript
- Understanding callback hell helps you appreciate why modern JavaScript uses Promises

### Example 6: Custom Higher-Order Function with Callbacks
\`\`\`javascript
// A custom function that accepts different callbacks for success and error
function fetchUserData(userId, onSuccess, onError) {
    // Simulating an API call
    if (userId > 0) {
        const user = { id: userId, name: "Alice", email: "alice@example.com" };
        onSuccess(user);
    } else {
        onError("Invalid user ID");
    }
}

// Using the function
fetchUserData(
    1,
    function(user) {
        console.log("Success! User:", user.name);
    },
    function(error) {
        console.log("Error:", error);
    }
);
// Output: Success! User: Alice

fetchUserData(
    -1,
    (user) => console.log("Success! User:", user.name),
    (error) => console.log("Error:", error)
);
// Output: Error: Invalid user ID
\`\`\`

**Explanation:**
- A function can accept multiple callbacks for different scenarios (success/error)
- This is a common pattern in Node.js and older JavaScript APIs
- The caller decides what happens on success and on error — very flexible
- This pattern evolved into the Promise pattern (\`.then()\` and \`.catch()\`)

## Synchronous vs Asynchronous Callbacks

| Type | Description | Example |
|------|-------------|--------|
| **Synchronous** | Executed immediately during the function call | \`array.forEach(callback)\`, \`array.map(callback)\` |
| **Asynchronous** | Executed later, after some operation completes | \`setTimeout(callback)\`, \`fetch().then(callback)\` |

## Summary

- A callback is a function passed as an argument to another function
- Callbacks enable asynchronous programming in JavaScript
- Array methods (\`forEach\`, \`map\`, \`filter\`, \`sort\`) use synchronous callbacks
- Timers (\`setTimeout\`, \`setInterval\`) and API calls use asynchronous callbacks
- Nested callbacks create "Callback Hell" — solved by Promises and async/await
- Callbacks are the foundation for understanding Promises and async patterns

## Key Takeaways

✓ Callbacks are functions passed as arguments to other functions
✓ Pass the function reference (no parentheses): \`greet("Alice", sayGoodbye)\`
✓ Callbacks can be named functions, anonymous functions, or arrow functions
✓ Array methods are the most common use of synchronous callbacks
✓ \`setTimeout\` / \`setInterval\` demonstrate asynchronous callbacks
✓ Callback hell → Promises → async/await (the evolution of async JavaScript)
                `
            },
            {
                name: 'Scope (Global, Function, Block)',
                content: `
# Scope in JavaScript

## What is Scope?

**Scope** determines the **accessibility (visibility) of variables** in different parts of your code. It defines where a variable can be read, modified, or used. Understanding scope is essential because it prevents naming conflicts and keeps your code predictable.

Think of scope like rooms in a building — a variable declared inside a room (function) is only accessible inside that room. Variables declared in the hallway (global scope) can be accessed from any room.

JavaScript has three types of scope:
1. **Global Scope** — accessible everywhere
2. **Function Scope** — accessible only inside a function
3. **Block Scope** — accessible only inside a block \`{} \` (with \`let\` and \`const\`)

---

## 1. Global Scope

Variables declared **outside any function or block** are in the global scope. They can be accessed from **anywhere** in your code.

### Example 1: Global Scope
\`\`\`javascript
// Global variable — declared outside any function
let appName = "LearnJS";
const version = "2.0";
var counter = 0;

function showAppInfo() {
    // Can access global variables inside a function
    console.log("App: " + appName);
    console.log("Version: " + version);
}

showAppInfo();
// Output:
// App: LearnJS
// Version: 2.0

console.log(counter);  // Output: 0 — accessible here too
\`\`\`

**Explanation:**
- \`appName\`, \`version\`, and \`counter\` are declared outside any function — they are global
- Global variables can be accessed inside functions, blocks, or anywhere in the file
- In the browser, global \`var\` variables become properties of the \`window\` object
- Global variables should be used sparingly — too many can cause naming conflicts

### Example 2: Global Scope Pollution Problem
\`\`\`javascript
// Two different developers both use 'name' as a global variable
var name = "Alice";

function greetUser() {
    console.log("Hello, " + name);
}

// Later in the code (maybe a different file)...
var name = "System_Admin";

greetUser();
// Output: Hello, System_Admin  (NOT "Alice" — it was overwritten!)
\`\`\`

**Explanation:**
- Both \`name\` variables are in global scope — the second one overwrites the first
- This is called **global scope pollution** — a common source of bugs
- This is why we should minimize global variables and use \`let\`/\`const\` with block scope

---

## 2. Function Scope

Variables declared **inside a function** are only accessible **within that function**. They cannot be accessed from outside. All three keywords (\`var\`, \`let\`, \`const\`) create function-scoped variables when declared inside a function.

### Example 3: Function Scope
\`\`\`javascript
function calculateTotal() {
    let price = 100;        // Function-scoped
    const tax = 0.1;        // Function-scoped
    var discount = 10;      // Function-scoped

    let total = price + (price * tax) - discount;
    console.log("Total: $" + total);  // Output: Total: $100
}

calculateTotal();

// Trying to access function-scoped variables outside
// console.log(price);     // ReferenceError: price is not defined
// console.log(tax);       // ReferenceError: tax is not defined
// console.log(discount);  // ReferenceError: discount is not defined
\`\`\`

**Explanation:**
- \`price\`, \`tax\`, and \`discount\` are all declared inside the function
- They are only accessible within \`calculateTotal\`
- Trying to access them outside the function throws a \`ReferenceError\`
- Each function call creates its own scope — variables are created and destroyed with each call

### Example 4: Function Scope — Same Variable Names, Different Scopes
\`\`\`javascript
let message = "I am global";

function showMessage() {
    let message = "I am local";     // Different variable — function scope
    console.log(message);            // Uses the local variable
}

showMessage();
// Output: I am local

console.log(message);
// Output: I am global  (global variable is unchanged)
\`\`\`

**Explanation:**
- The \`message\` inside the function is a completely different variable from the global \`message\`
- The local variable **shadows** the global one inside the function
- The global variable is untouched — it still has its original value
- This is called **variable shadowing** — the inner scope takes priority

### Example 5: Nested Function Scope
\`\`\`javascript
function outer() {
    let outerVar = "I'm from outer";

    function inner() {
        let innerVar = "I'm from inner";
        console.log(outerVar);  // Can access outer function's variable
        console.log(innerVar);  // Can access own variable
    }

    inner();
    console.log(outerVar);      // Can access own variable
    // console.log(innerVar);   // ReferenceError! Can't access inner's variable
}

outer();
// Output:
// I'm from outer
// I'm from inner
// I'm from outer
\`\`\`

**Explanation:**
- The \`inner\` function can access variables from \`outer\` (its parent scope)
- The \`outer\` function **cannot** access variables from \`inner\`
- Scope works like a one-way mirror: inner scopes can look outward, but outer scopes cannot look inward
- This is called the **scope chain** — JavaScript searches from inner to outer scopes

---

## 3. Block Scope

A **block** is any code between curly braces \`{}\` — like in \`if\`, \`for\`, \`while\`, or just standalone \`{}\`. Variables declared with \`let\` and \`const\` are block-scoped, but \`var\` is **NOT** block-scoped.

### Example 6: Block Scope with let and const
\`\`\`javascript
if (true) {
    let blockLet = "I'm let (block-scoped)";
    const blockConst = "I'm const (block-scoped)";
    var notBlockScoped = "I'm var (NOT block-scoped)";

    console.log(blockLet);       // Output: I'm let (block-scoped)
    console.log(blockConst);     // Output: I'm const (block-scoped)
    console.log(notBlockScoped); // Output: I'm var (NOT block-scoped)
}

// Outside the block:
// console.log(blockLet);       // ReferenceError!
// console.log(blockConst);     // ReferenceError!
console.log(notBlockScoped);    // Output: I'm var (NOT block-scoped)  — STILL WORKS!
\`\`\`

**Explanation:**
- \`let\` and \`const\` are **confined to the block** they're declared in
- \`var\` **ignores block scope** — it's either global or function-scoped
- This is one of the biggest reasons \`let\` and \`const\` are preferred over \`var\`
- \`var\` leaking out of blocks can cause unexpected bugs

### Example 7: Block Scope in Loops
\`\`\`javascript
// Using let — each iteration has its own scope
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("let i:", i);
    }, 100);
}
// Output:
// let i: 0
// let i: 1
// let i: 2

// Using var — shares the same variable across all iterations
for (var j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("var j:", j);
    }, 100);
}
// Output:
// var j: 3
// var j: 3
// var j: 3
\`\`\`

**Explanation:**
- With \`let\`, each loop iteration creates a **new block scope** with its own \`i\`
- With \`var\`, there's only **one shared \`j\`** — by the time \`setTimeout\` runs, the loop is done and \`j\` is 3
- This is a classic interview question and a common source of bugs with \`var\`
- Always use \`let\` in loops to avoid this problem

### Example 8: Block Scope in Practice
\`\`\`javascript
function processScores(scores) {
    let total = 0;               // Function scope
    const passingScore = 60;     // Function scope

    for (let i = 0; i < scores.length; i++) {  // 'i' is block-scoped to the for loop
        let score = scores[i];   // Block scope — new 'score' each iteration

        if (score >= passingScore) {
            const status = "PASS";   // Block scope — only inside this if
            console.log(score + ": " + status);
            total++;
        } else {
            const status = "FAIL";   // Different block — different 'status' variable
            console.log(score + ": " + status);
        }

        // console.log(status);  // ReferenceError! 'status' only exists inside if/else blocks
    }

    // console.log(i);       // ReferenceError! 'i' only exists in the for loop
    // console.log(score);   // ReferenceError! 'score' only exists in the for block
    console.log("Passed: " + total + "/" + scores.length);
}

processScores([85, 42, 96, 55, 73]);
// Output:
// 85: PASS
// 42: FAIL
// 96: PASS
// 55: FAIL
// 73: PASS
// Passed: 3/5
\`\`\`

**Explanation:**
- \`total\` and \`passingScore\` are in function scope — accessible throughout the function
- \`i\` is block-scoped to the \`for\` loop
- \`score\` is block-scoped to each iteration of the loop
- \`status\` is block-scoped to each \`if\`/\`else\` block — two separate variables
- Block scoping keeps variables tightly contained, making code safer and more predictable

---

## Scope Chain — How JavaScript Finds Variables

\`\`\`javascript
let global = "🌍 Global";

function outerFunction() {
    let outer = "📦 Outer";

    function innerFunction() {
        let inner = "🎁 Inner";

        // JavaScript searches: inner scope → outer scope → global scope
        console.log(inner);    // Found in inner scope
        console.log(outer);    // Found in outer scope
        console.log(global);   // Found in global scope
    }

    innerFunction();
}

outerFunction();
// Output:
// 🎁 Inner
// 📦 Outer
// 🌍 Global
\`\`\`

**Explanation:**
- When JavaScript encounters a variable, it starts looking in the **current scope**
- If not found, it moves to the **parent scope**, then the **grandparent scope**, and so on
- This chain continues up to the **global scope**
- If the variable isn't found anywhere, a \`ReferenceError\` is thrown
- This lookup process is called the **scope chain**

## Comparison Table

| Feature | \`var\` | \`let\` | \`const\` |
|---------|-------|------|--------|
| **Global Scope** | ✓ | ✓ | ✓ |
| **Function Scope** | ✓ | ✓ | ✓ |
| **Block Scope** | ✗ (leaks out!) | ✓ | ✓ |
| **Hoisted** | ✓ (as \`undefined\`) | ✓ (but in TDZ) | ✓ (but in TDZ) |
| **Re-declarable** | ✓ | ✗ | ✗ |
| **Re-assignable** | ✓ | ✓ | ✗ |

## Summary

- **Global scope**: Variables accessible everywhere — use sparingly
- **Function scope**: Variables accessible only inside the function — all keywords (\`var\`, \`let\`, \`const\`)
- **Block scope**: Variables accessible only inside \`{}\` — only \`let\` and \`const\` (NOT \`var\`)
- JavaScript uses a **scope chain** to look up variables from inner to outer scopes
- Use \`let\` and \`const\` to get predictable block scoping behavior
- Avoid \`var\` to prevent scope-related bugs

## Key Takeaways

✓ Scope controls where variables are accessible in your code
✓ Three types: Global, Function, and Block scope
✓ \`let\` and \`const\` are block-scoped; \`var\` is not
✓ Inner scopes can access outer scopes (scope chain), but not vice versa
✓ \`var\` in loops is a classic bug — use \`let\` instead
✓ Minimize global variables to avoid polluting the global scope
                `
            },
            {
                name: 'Execution Context & Call Stack',
                content: `
# Execution Context & Call Stack

## What is Execution Context?

An **execution context** is the environment in which JavaScript code is evaluated and executed. Every time JavaScript runs code, it creates an execution context that contains:
1. **Variable Environment** — the variables, functions, and arguments available
2. **Scope Chain** — references to outer scopes
3. **\`this\` binding** — what \`this\` refers to

Think of an execution context as a "box" that holds everything the currently running code needs.

## Types of Execution Context

| Type | Created When | Contains |
|------|-------------|----------|
| **Global Execution Context (GEC)** | When the script first runs | Global variables, functions, \`this\` (= \`window\` in browser) |
| **Function Execution Context (FEC)** | When a function is called | Function's local variables, arguments, \`this\` |
| **Eval Execution Context** | When \`eval()\` is used | (Rarely used — avoid \`eval\`) |

---

## Two Phases of Execution Context

Every execution context goes through two phases:

### Phase 1: Creation Phase (Memory Allocation)
\`\`\`javascript
// What JavaScript does BEFORE executing any code:
console.log(myVar);     // Output: undefined  (not an error!)
console.log(myFunc);    // Output: [Function: myFunc]
// console.log(myLet);  // ReferenceError: Cannot access before initialization

var myVar = "Hello";
let myLet = "World";

function myFunc() {
    return "I'm a function";
}
\`\`\`

**Explanation — What happens in the Creation Phase:**
- JavaScript scans the code and allocates memory for variables and functions
- \`var\` variables are stored with the value \`undefined\` (hoisted)
- \`let\` and \`const\` variables are stored but NOT initialized (Temporal Dead Zone)
- Function declarations are stored **with their complete code** (fully hoisted)
- No code is actually executed yet in this phase

### Phase 2: Execution Phase
\`\`\`javascript
var name = "Alice";   // Creation phase: name = undefined
                       // Execution phase: name = "Alice"

function greet() {
    var message = "Hello";  // New execution context created for this function
    console.log(message + ", " + name);
}

greet();  // Output: Hello, Alice
// Execution phase: greet() is called → new function execution context is created
\`\`\`

**Explanation:**
- In the Execution Phase, JavaScript goes through the code line by line
- Variables get their actual values assigned
- When a function is called, a **new execution context** is created for that function
- After the function finishes, its execution context is destroyed

---

## What is the Call Stack?

The **call stack** is a data structure that keeps track of **which function is currently being executed** and **which functions are waiting** to be executed. It works on the **LIFO (Last In, First Out)** principle — the last function pushed onto the stack is the first one to be popped off.

### Example 1: Visualizing the Call Stack
\`\`\`javascript
function first() {
    console.log("first() start");
    second();
    console.log("first() end");
}

function second() {
    console.log("second() start");
    third();
    console.log("second() end");
}

function third() {
    console.log("third() start");
    console.log("third() end");
}

first();

// Output:
// first() start
// second() start
// third() start
// third() end
// second() end
// first() end
\`\`\`

**Call Stack visualization step-by-step:**
\`\`\`
Step 1: [Global]                    → Script starts
Step 2: [Global, first()]           → first() is called
Step 3: [Global, first(), second()] → second() is called inside first()
Step 4: [Global, first(), second(), third()] → third() is called inside second()
Step 5: [Global, first(), second()] → third() finishes, popped off
Step 6: [Global, first()]           → second() finishes, popped off
Step 7: [Global]                    → first() finishes, popped off
Step 8: []                          → Global context done, stack is empty
\`\`\`

**Explanation:**
- The Global Execution Context is the first thing pushed onto the stack
- Each function call pushes a new execution context onto the stack
- When a function returns, its context is **popped off** the stack
- Execution resumes in the function that is now on top of the stack
- The call stack ensures functions execute in the correct order

### Example 2: Call Stack with Return Values
\`\`\`javascript
function multiply(a, b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}

function printSquare(n) {
    let result = square(n);
    console.log("Square of " + n + " is " + result);
}

printSquare(5);
// Output: Square of 5 is 25
\`\`\`

**Call Stack step-by-step:**
\`\`\`
1. [Global]                                    → Script starts
2. [Global, printSquare(5)]                     → printSquare called
3. [Global, printSquare(5), square(5)]          → square called
4. [Global, printSquare(5), square(5), multiply(5,5)] → multiply called
5. [Global, printSquare(5), square(5)]          → multiply returns 25
6. [Global, printSquare(5)]                     → square returns 25
7. [Global]                                     → printSquare prints & returns
\`\`\`

**Explanation:**
- Each function call creates a new frame on the call stack
- Return values flow back down the stack to the calling function
- The call stack tracks the entire chain of function calls
- This is exactly what you see in browser DevTools when debugging

### Example 3: Stack Overflow Error
\`\`\`javascript
// A function that calls itself forever (infinite recursion)
function infinite() {
    console.log("Calling...");
    infinite();  // Calls itself — never stops!
}

// infinite();  // Uncomment to see the error
// Error: Maximum call stack size exceeded (Stack Overflow!)

// Correct recursion — has a base case to stop
function countdown(n) {
    if (n <= 0) {
        console.log("Done!");
        return;  // Base case — stops the recursion
    }
    console.log(n);
    countdown(n - 1);
}

countdown(3);
// Output:
// 3
// 2
// 1
// Done!
\`\`\`

**Explanation:**
- If a function keeps calling itself without a stopping condition, the call stack fills up
- Every environment has a maximum stack size — exceeding it causes a **Stack Overflow** error
- Always include a **base case** in recursive functions to prevent this
- The name "Stack Overflow" (and the famous website) comes from this exact concept!

### Example 4: Execution Context in Action
\`\`\`javascript
let globalVar = "global";

function outer() {
    let outerVar = "outer";

    function inner() {
        let innerVar = "inner";
        console.log(innerVar);   // "inner"  — from inner's own context
        console.log(outerVar);   // "outer"  — from outer's context (scope chain)
        console.log(globalVar);  // "global" — from global context (scope chain)
    }

    inner();
}

outer();
\`\`\`

**Each execution context:**
\`\`\`
Global EC:  { globalVar: "global", outer: fn }
   ↓ outer() called
Outer EC:   { outerVar: "outer", inner: fn }  → scope chain → Global EC
   ↓ inner() called
Inner EC:   { innerVar: "inner" }  → scope chain → Outer EC → Global EC
\`\`\`

**Explanation:**
- Each execution context has its own variable environment
- The scope chain connects each context to its parent
- When \`inner\` looks for \`outerVar\`, it doesn't find it locally, so it goes up the scope chain
- This is how scope and execution contexts work together

### Example 5: How \`this\` Differs in Execution Contexts
\`\`\`javascript
// Global context
console.log(this);  // In browser: Window object | In Node.js: {} (module)

const user = {
    name: "Alice",
    greet: function() {
        // Function execution context — 'this' = the object that called it
        console.log("Hello, I'm " + this.name);
    },
    greetArrow: () => {
        // Arrow function — 'this' inherited from enclosing scope (global)
        console.log("Hello, I'm " + this.name);  // 'this' is NOT 'user'
    }
};

user.greet();       // Output: Hello, I'm Alice
user.greetArrow();  // Output: Hello, I'm undefined

function standalone() {
    console.log(this);  // In strict mode: undefined | Non-strict: global object
}

standalone();
\`\`\`

**Explanation:**
- Each execution context has its own \`this\` binding
- In the global context, \`this\` refers to the global object (\`window\` in browsers)
- In a regular method, \`this\` refers to the object that called the method
- Arrow functions don't have their own \`this\` — they inherit it from the parent context
- Understanding \`this\` is directly tied to understanding execution contexts

## Summary

- **Execution Context**: The environment where code runs — contains variables, scope chain, and \`this\`
- **Two phases**: Creation phase (memory allocation) and Execution phase (code runs)
- **Call Stack**: LIFO data structure that tracks function execution order
- Each function call creates a new execution context pushed onto the call stack
- When a function returns, its context is popped off the call stack
- Infinite recursion causes a **Stack Overflow** error

## Key Takeaways

✓ Every script starts with a Global Execution Context
✓ Every function call creates a new Function Execution Context
✓ Creation Phase: memory is allocated (\`var\` = undefined, functions = full code)
✓ Execution Phase: code runs line by line
✓ Call Stack = LIFO — last function called is the first to finish
✓ Stack Overflow = too many function calls with no exit condition
✓ The call stack is what you see in browser DevTools debugger
                `
            },
            {
                name: 'Closures (Concept + Practical Use Cases)',
                content: `
# Closures in JavaScript

## What is a Closure?

A **closure** is formed when a function **"remembers"** the variables from its outer (enclosing) scope, even after the outer function has finished executing. In simple terms, a closure gives an inner function access to the variables of its outer function — permanently.

> **MDN Definition:** A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).

### The Core Idea:
\`\`\`
Outer function runs → creates variables → returns inner function → outer function finishes
But... the inner function STILL has access to those variables!
\`\`\`

Closures are not something you manually create — they happen automatically whenever a function is defined inside another function.

---

### Example 1: Your First Closure
\`\`\`javascript
function outerFunction() {
    let count = 0;  // This variable is "enclosed" by the inner function

    function innerFunction() {
        count++;
        console.log("Count: " + count);
    }

    return innerFunction;  // Return the inner function
}

const counter = outerFunction();  // outerFunction has finished executing

counter();  // Output: Count: 1
counter();  // Output: Count: 2
counter();  // Output: Count: 3
// The inner function still remembers 'count' even though outerFunction is done!
\`\`\`

**Explanation:**
- \`outerFunction\` creates a variable \`count\` and returns \`innerFunction\`
- After \`outerFunction()\` runs, normally its variables would be garbage collected
- But \`innerFunction\` still references \`count\` — so JavaScript keeps it alive
- Each call to \`counter()\` increments the same \`count\` variable
- This is a closure — the inner function "closes over" the outer function's variables

### Example 2: Closure with Parameters
\`\`\`javascript
function multiplier(factor) {
    // 'factor' is enclosed by the returned function
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);   // factor = 2, locked in
const triple = multiplier(3);   // factor = 3, locked in
const tenTimes = multiplier(10); // factor = 10, locked in

console.log(double(5));     // Output: 10  (5 * 2)
console.log(triple(5));     // Output: 15  (5 * 3)
console.log(tenTimes(5));   // Output: 50  (5 * 10)

console.log(double(100));   // Output: 200 (100 * 2)
\`\`\`

**Explanation:**
- \`multiplier(2)\` returns a function that remembers \`factor = 2\`
- Each call to \`multiplier\` creates a new closure with its own \`factor\`
- \`double\`, \`triple\`, and \`tenTimes\` are all separate closures with different \`factor\` values
- This pattern is called a **function factory** — a function that creates other functions

### Example 3: Closure for Data Privacy (Encapsulation)
\`\`\`javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // Private variable — not directly accessible

    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                console.log("Deposited: $" + amount + " | Balance: $" + balance);
            }
        },
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                console.log("Withdrawn: $" + amount + " | Balance: $" + balance);
            } else {
                console.log("Insufficient funds! Balance: $" + balance);
            }
        },
        getBalance: function() {
            return balance;
        }
    };
}

const myAccount = createBankAccount(1000);

myAccount.deposit(500);
// Output: Deposited: $500 | Balance: $1500

myAccount.withdraw(200);
// Output: Withdrawn: $200 | Balance: $1300

console.log(myAccount.getBalance());  // Output: 1300

// Cannot access balance directly!
console.log(myAccount.balance);  // Output: undefined
// The 'balance' variable is private — only accessible through the methods
\`\`\`

**Explanation:**
- \`balance\` is a private variable — it cannot be accessed or modified directly from outside
- The returned object's methods (\`deposit\`, \`withdraw\`, \`getBalance\`) form closures over \`balance\`
- This is **data privacy / encapsulation** — one of the most practical uses of closures
- JavaScript doesn't have private variables natively (before class private fields) — closures simulate them

### Example 4: Closures in Loops (Common Interview Question)
\`\`\`javascript
// Problem with var in loops
for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log("var loop: " + i);  // All print 4!
    }, i * 1000);
}
// Output (each after 1s):
// var loop: 4
// var loop: 4
// var loop: 4

// Solution 1: Use let (block scope creates fresh closure each iteration)
for (let j = 1; j <= 3; j++) {
    setTimeout(function() {
        console.log("let loop: " + j);
    }, j * 1000);
}
// Output (each after 1s):
// let loop: 1
// let loop: 2
// let loop: 3

// Solution 2: Use IIFE to create closure manually
for (var k = 1; k <= 3; k++) {
    (function(num) {
        setTimeout(function() {
            console.log("IIFE loop: " + num);
        }, num * 1000);
    })(k);  // Pass current 'k' into the IIFE
}
// Output (each after 1s):
// IIFE loop: 1
// IIFE loop: 2
// IIFE loop: 3
\`\`\`

**Explanation:**
- With \`var\`, there's only one \`i\` shared across all iterations — by the time \`setTimeout\` runs, \`i\` is 4
- With \`let\`, each iteration creates a new block scope with a fresh \`j\` — each closure captures a different value
- The IIFE (Immediately Invoked Function Expression) solution creates a new function scope for each iteration
- This is one of the most commonly asked closure questions in interviews

### Example 5: Closure for Memoization (Caching)
\`\`\`javascript
function memoize(fn) {
    const cache = {};  // Closed-over cache object

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache[key] !== undefined) {
            console.log("Cache hit for: " + key);
            return cache[key];
        }

        console.log("Computing for: " + key);
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Expensive calculation
function slowSquare(n) {
    // Simulate slow operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result = n * n;
    }
    return result;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5));   // Computing for: [5]    → 25
console.log(fastSquare(5));   // Cache hit for: [5]    → 25 (instant!)
console.log(fastSquare(10));  // Computing for: [10]   → 100
console.log(fastSquare(10));  // Cache hit for: [10]   → 100 (instant!)
\`\`\`

**Explanation:**
- \`memoize\` returns a function that closes over a \`cache\` object
- When called with the same arguments, it returns the cached result instead of re-computing
- The \`cache\` persists between calls because of the closure
- This is a real-world performance optimization used in React (\`useMemo\`), lodash, etc.

### Example 6: Closure for Event Handlers
\`\`\`javascript
function createButtonHandler(buttonName) {
    let clickCount = 0;  // Private counter per button

    return function() {
        clickCount++;
        console.log(buttonName + " clicked " + clickCount + " time(s)");
    };
}

const handleSave = createButtonHandler("Save");
const handleDelete = createButtonHandler("Delete");

handleSave();    // Output: Save clicked 1 time(s)
handleSave();    // Output: Save clicked 2 time(s)
handleDelete();  // Output: Delete clicked 1 time(s)  (separate counter!)
handleSave();    // Output: Save clicked 3 time(s)
handleDelete();  // Output: Delete clicked 2 time(s)
\`\`\`

**Explanation:**
- Each call to \`createButtonHandler\` creates an independent closure with its own \`clickCount\`
- The \`Save\` button and \`Delete\` button have completely separate counters
- This pattern is commonly used for event handlers in web applications
- In React, this is similar to how custom hooks maintain independent state

### Example 7: Module Pattern using Closures
\`\`\`javascript
const UserModule = (function() {
    // Private variables and functions
    let users = [];
    let nextId = 1;

    function findUserIndex(id) {
        return users.findIndex(user => user.id === id);
    }

    // Public API (returned object)
    return {
        addUser: function(name, email) {
            const user = { id: nextId++, name, email };
            users.push(user);
            console.log("Added: " + name);
            return user;
        },
        removeUser: function(id) {
            const index = findUserIndex(id);
            if (index !== -1) {
                const removed = users.splice(index, 1)[0];
                console.log("Removed: " + removed.name);
                return removed;
            }
            console.log("User not found");
        },
        getUsers: function() {
            return [...users];  // Return copy, not the original
        },
        getCount: function() {
            return users.length;
        }
    };
})();

UserModule.addUser("Alice", "alice@example.com");    // Added: Alice
UserModule.addUser("Bob", "bob@example.com");        // Added: Bob
console.log(UserModule.getCount());                   // Output: 2
console.log(UserModule.getUsers());
// Output: [{ id: 1, name: 'Alice', email: 'alice@example.com' }, ...]

// Cannot access private variables directly
console.log(UserModule.users);     // Output: undefined
console.log(UserModule.nextId);    // Output: undefined
\`\`\`

**Explanation:**
- The IIFE creates a closure that encapsulates \`users\`, \`nextId\`, and \`findUserIndex\`
- Only the returned object's methods are publicly accessible
- This is the **Module Pattern** — widely used before ES6 modules existed
- It demonstrates closures for data privacy, encapsulation, and organized code

---

## Common Closure Use Cases

| Use Case | Description |
|----------|-------------|
| **Data Privacy** | Hide variables from outside access |
| **Function Factories** | Create specialized functions |
| **Memoization/Caching** | Remember computed results |
| **Event Handlers** | Maintain state per handler |
| **Module Pattern** | Organize code with private/public API |
| **Iterators** | Track position in a sequence |
| **Currying** | Transform multi-arg functions into single-arg chains |

## Practice Exercises

### Exercise 1: Create a Counter
\`\`\`javascript
// Create a closure-based counter with increment, decrement, and reset
function createCounter(start = 0) {
    let count = start;

    return {
        increment: () => { count++; return count; },
        decrement: () => { count--; return count; },
        reset: () => { count = start; return count; },
        getValue: () => count
    };
}

const counter = createCounter(10);
console.log(counter.increment());  // 11
console.log(counter.increment());  // 12
console.log(counter.decrement());  // 11
console.log(counter.reset());      // 10
\`\`\`

### Exercise 2: Rate Limiter
\`\`\`javascript
// Create a function that limits how often a callback can run
function createRateLimiter(callback, minInterval) {
    let lastCalled = 0;

    return function(...args) {
        const now = Date.now();
        if (now - lastCalled >= minInterval) {
            lastCalled = now;
            return callback(...args);
        } else {
            console.log("Rate limited! Try again later.");
        }
    };
}

const limitedLog = createRateLimiter((msg) => console.log(msg), 2000);
limitedLog("Hello");       // Output: Hello
limitedLog("World");       // Output: Rate limited! Try again later.
// Wait 2+ seconds...
// limitedLog("Again");    // Output: Again
\`\`\`

## Summary

- A **closure** is when an inner function retains access to its outer function's variables
- Closures happen automatically when functions are nested
- The outer function's variables persist in memory as long as the closure exists
- Closures enable **data privacy**, **function factories**, **memoization**, and more
- The **Module Pattern** uses closures to create private/public APIs
- Closures in loops are a classic interview topic (\`var\` vs \`let\`)

## Key Takeaways

✓ A closure = inner function + its lexical environment
✓ Closures keep outer variables alive even after the outer function returns
✓ Each closure instance has its own independent copy of the enclosed variables
✓ Practical uses: data privacy, caching, event handlers, module pattern
✓ Use \`let\` in loops to create proper closures per iteration
✓ Closures are fundamental to advanced JS patterns — master them!
                `
            }
        ],
        order: 2,
        estimatedDuration: 1200, // 20 hours total for all concepts
        difficulty: 'beginner',
        tags: ['javascript', 'functions', 'scope', 'phase2', 'function-declaration', 'function-expression', 'arrow-functions', 'default-parameters', 'rest-operator', 'spread-operator', 'callbacks', 'scope-chain', 'execution-context', 'call-stack', 'closures'],
        resources: [
            {
                title: 'MDN - Functions',
                type: 'documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
                description: 'Comprehensive guide to JavaScript functions'
            },
            {
                title: 'JavaScript.info - Functions',
                type: 'article',
                url: 'https://javascript.info/function-basics',
                description: 'Detailed tutorial on function basics and expressions'
            },
            {
                title: 'Eloquent JavaScript - Functions',
                type: 'article',
                url: 'https://eloquentjavascript.net/03_functions.html',
                description: 'Chapter on functions from Eloquent JavaScript'
            },
            {
                title: 'FreeCodeCamp - JavaScript Functions',
                type: 'article',
                url: 'https://www.freecodecamp.org/news/what-is-a-function-javascript-function-examples/',
                description: 'Beginner-friendly guide to JavaScript functions'
            }
        ]
    }
];

const seedJavascriptLessons = async () => {
    try {
        // Find the JavaScript module
        const jsModule = await Module.findOne({ name: 'javascript' });
        
        if (!jsModule) {
            logger.error('JavaScript module not found. Please run modulesSeeder first.');
            throw new Error('JavaScript module not found');
        }

        // Upsert lessons — create new ones, update existing ones
        let createdCount = 0;
        let updatedCount = 0;
        
        for (const lessonData of javascriptLessonsData) {
            const existingLesson = await Lesson.findOne({ 
                moduleId: jsModule._id, 
                order: lessonData.order 
            });

            if (existingLesson) {
                // Update existing lesson with latest data
                Object.assign(existingLesson, lessonData);
                await existingLesson.save();
                updatedCount++;
                logger.info(`Updated: ${lessonData.phase} (order: ${lessonData.order})`);
            } else {
                // Create new lesson
                const lesson = new Lesson({
                    ...lessonData,
                    moduleId: jsModule._id
                });
                await lesson.save();
                createdCount++;
                logger.info(`Created: ${lessonData.phase} (order: ${lessonData.order})`);
            }
        }

        logger.info(`JavaScript lessons seeding completed. Created: ${createdCount}, Updated: ${updatedCount}.`);
        return { createdCount, updatedCount };

    } catch (error) {
        logger.error('Error seeding JavaScript lessons:', error);
        throw error;
    }
};

// Run seeder if executed directly
if (require.main === module) {
    require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
    
    const connectDB = async () => {
        try {
            const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/oauth-app';
            await mongoose.connect(mongoUri);
            logger.info('Connected to MongoDB');
            
            await seedJavascriptLessons();
            
            await mongoose.disconnect();
            logger.info('Disconnected from MongoDB');
            process.exit(0);
        } catch (error) {
            logger.error('Seeder failed:', error);
            process.exit(1);
        }
    };
    
    connectDB();
}

module.exports = { seedJavascriptLessons, javascriptLessonsData };
