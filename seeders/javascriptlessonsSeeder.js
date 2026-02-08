const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Module = require('../models/Module');
const logger = require('../logger');

const javascriptLessonsData = [
    {
        title: 'Introduction to JavaScript',
        description: 'Learn the basics of JavaScript, its history, and how to set up your development environment. Understand where JavaScript runs and write your first lines of code.',
        content: `
# Introduction to JavaScript

## What is JavaScript?
JavaScript is a lightweight, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.

## History of JavaScript
JavaScript was created by Brendan Eich in 1995 while he was working at Netscape Communications. Originally named "Mocha," then "LiveScript," it was finally renamed to "JavaScript."

## Setting Up Your Environment
1. **Browser Console**: Every modern browser has a built-in JavaScript console
2. **Node.js**: Install Node.js to run JavaScript outside the browser
3. **Code Editor**: VS Code is highly recommended for JavaScript development

## Your First JavaScript Code
\`\`\`javascript
// This is a comment
console.log("Hello, World!");

// Variables
let message = "Welcome to JavaScript!";
console.log(message);
\`\`\`

## Where JavaScript Runs
- **Client-side**: In web browsers
- **Server-side**: With Node.js
- **Mobile apps**: React Native, Ionic
- **Desktop apps**: Electron

## Key Takeaways
- JavaScript is essential for web development
- It can run in browsers and on servers
- It's beginner-friendly yet powerful
        `,
        order: 1,
        isPublished: true,
        estimatedDuration: 30,
        difficulty: 'beginner',
        type: 'theory',
        objectives: [
            'Understand what JavaScript is and its role in web development',
            'Set up a JavaScript development environment',
            'Write and execute your first JavaScript code',
            'Know the different environments where JavaScript runs'
        ],
        tags: ['javascript', 'introduction', 'basics', 'setup', 'beginner'],
        resources: [
            {
                title: 'MDN JavaScript Guide',
                type: 'documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
                description: 'Official MDN documentation for JavaScript'
            },
            {
                title: 'JavaScript.info',
                type: 'article',
                url: 'https://javascript.info/',
                description: 'Modern JavaScript tutorial'
            }
        ],
        exercises: [
            {
                question: 'Who created JavaScript?',
                type: 'multiple-choice',
                options: ['Brendan Eich', 'Tim Berners-Lee', 'James Gosling', 'Guido van Rossum'],
                correctAnswer: 'Brendan Eich',
                explanation: 'Brendan Eich created JavaScript in 1995 while working at Netscape Communications.',
                points: 10
            },
            {
                question: 'JavaScript can only run in web browsers.',
                type: 'true-false',
                options: ['True', 'False'],
                correctAnswer: 'False',
                explanation: 'JavaScript can also run on servers using Node.js, and in mobile and desktop applications.',
                points: 10
            }
        ]
    },
    {
        title: 'Variables and Data Types',
        description: 'Master JavaScript variables using let, const, and var. Explore primitive data types including strings, numbers, booleans, null, undefined, and symbols.',
        content: `
# Variables and Data Types

## Declaring Variables
JavaScript provides three ways to declare variables:

### let
\`\`\`javascript
let age = 25;
age = 26; // Can be reassigned
\`\`\`

### const
\`\`\`javascript
const PI = 3.14159;
// PI = 3.14; // Error: Cannot reassign a constant
\`\`\`

### var (legacy)
\`\`\`javascript
var name = "John";
// Avoid using var in modern JavaScript
\`\`\`

## Primitive Data Types

### 1. String
\`\`\`javascript
let greeting = "Hello";
let name = 'World';
let template = \`Hello, \${name}!\`; // Template literal
\`\`\`

### 2. Number
\`\`\`javascript
let integer = 42;
let decimal = 3.14;
let negative = -10;
let scientific = 2.5e6; // 2,500,000
\`\`\`

### 3. Boolean
\`\`\`javascript
let isActive = true;
let isCompleted = false;
\`\`\`

### 4. Null and Undefined
\`\`\`javascript
let empty = null; // Intentional absence of value
let notDefined; // undefined by default
\`\`\`

### 5. Symbol (ES6)
\`\`\`javascript
let id = Symbol('unique');
\`\`\`

### 6. BigInt (ES2020)
\`\`\`javascript
let bigNumber = 9007199254740991n;
\`\`\`

## Type Checking
\`\`\`javascript
console.log(typeof "hello"); // "string"
console.log(typeof 42);      // "number"
console.log(typeof true);    // "boolean"
console.log(typeof null);    // "object" (quirk)
console.log(typeof undefined); // "undefined"
\`\`\`

## Best Practices
- Use \`const\` by default
- Use \`let\` when you need to reassign
- Never use \`var\` in modern code
- Use meaningful variable names
        `,
        order: 2,
        isPublished: true,
        estimatedDuration: 45,
        difficulty: 'beginner',
        type: 'theory',
        objectives: [
            'Understand the difference between let, const, and var',
            'Know all primitive data types in JavaScript',
            'Use template literals for string interpolation',
            'Check variable types using typeof'
        ],
        tags: ['javascript', 'variables', 'data-types', 'primitives', 'let', 'const'],
        resources: [
            {
                title: 'MDN - Data Types and Structures',
                type: 'documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures',
                description: 'Complete guide to JavaScript data types'
            },
            {
                title: 'Var, Let, and Const Explained',
                type: 'video',
                url: 'https://www.youtube.com/watch?v=9WIJQDvt4Us',
                description: 'Video explanation of variable declarations'
            }
        ],
        exercises: [
            {
                question: 'Which keyword should you use for variables that will NOT be reassigned?',
                type: 'multiple-choice',
                options: ['var', 'let', 'const', 'define'],
                correctAnswer: 'const',
                explanation: 'const is used for variables that should not be reassigned. It helps prevent accidental mutations.',
                points: 10
            },
            {
                question: 'What is the result of: typeof null?',
                type: 'multiple-choice',
                options: ['null', 'undefined', 'object', 'string'],
                correctAnswer: 'object',
                explanation: 'This is a known quirk in JavaScript. typeof null returns "object" due to a historical bug that was never fixed for backward compatibility.',
                points: 15
            },
            {
                question: 'Write code to declare a constant called MAX_USERS with value 100',
                type: 'code',
                correctAnswer: 'const MAX_USERS = 100;',
                explanation: 'Use const for constants and UPPER_SNAKE_CASE naming convention for constant values.',
                points: 20
            }
        ]
    },
    {
        title: 'Functions and Scope',
        description: 'Learn how to create reusable code blocks with functions. Understand function declarations, expressions, arrow functions, and the concept of scope in JavaScript.',
        content: `
# Functions and Scope

## Function Declaration
\`\`\`javascript
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Alice")); // "Hello, Alice!"
\`\`\`

## Function Expression
\`\`\`javascript
const add = function(a, b) {
    return a + b;
};

console.log(add(5, 3)); // 8
\`\`\`

## Arrow Functions (ES6)
\`\`\`javascript
// Standard arrow function
const multiply = (a, b) => {
    return a * b;
};

// Concise arrow function (implicit return)
const square = x => x * x;

// Multiple parameters
const sum = (a, b) => a + b;

console.log(square(4)); // 16
\`\`\`

## Default Parameters
\`\`\`javascript
function greet(name = "Guest") {
    return \`Hello, \${name}!\`;
}

console.log(greet());      // "Hello, Guest!"
console.log(greet("Bob")); // "Hello, Bob!"
\`\`\`

## Rest Parameters
\`\`\`javascript
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10
\`\`\`

## Scope

### Global Scope
\`\`\`javascript
let globalVar = "I'm global";

function showGlobal() {
    console.log(globalVar); // Accessible
}
\`\`\`

### Function Scope
\`\`\`javascript
function myFunction() {
    let localVar = "I'm local";
    console.log(localVar); // Accessible
}
// console.log(localVar); // Error: not defined
\`\`\`

### Block Scope (let and const)
\`\`\`javascript
if (true) {
    let blockVar = "I'm block-scoped";
    const alsoBlock = "Me too";
}
// console.log(blockVar); // Error: not defined
\`\`\`

## Closures
\`\`\`javascript
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

## Best Practices
- Use arrow functions for callbacks
- Keep functions small and focused
- Use default parameters instead of || checks
- Understand the scope of your variables
        `,
        order: 3,
        isPublished: true,
        estimatedDuration: 60,
        difficulty: 'beginner',
        type: 'theory',
        objectives: [
            'Create functions using declaration, expression, and arrow syntax',
            'Use default and rest parameters effectively',
            'Understand global, function, and block scope',
            'Explain what closures are and how they work'
        ],
        tags: ['javascript', 'functions', 'scope', 'closures', 'arrow-functions'],
        resources: [
            {
                title: 'MDN - Functions',
                type: 'documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
                description: 'Comprehensive guide to JavaScript functions'
            },
            {
                title: 'Understanding Closures',
                type: 'article',
                url: 'https://javascript.info/closure',
                description: 'In-depth explanation of closures'
            }
        ],
        exercises: [
            {
                question: 'Which is the correct syntax for an arrow function that squares a number?',
                type: 'multiple-choice',
                options: ['const square = x -> x * x;', 'const square = x => x * x;', 'const square = (x) -> x * x;', 'const square = function(x) => x * x;'],
                correctAnswer: 'const square = x => x * x;',
                explanation: 'Arrow functions use => (fat arrow) syntax. For single parameters, parentheses are optional, and for single expressions, return is implicit.',
                points: 10
            },
            {
                question: 'Variables declared with let inside a block are accessible outside that block.',
                type: 'true-false',
                options: ['True', 'False'],
                correctAnswer: 'False',
                explanation: 'let and const are block-scoped, meaning they are only accessible within the block where they are declared.',
                points: 10
            },
            {
                question: 'Write an arrow function called double that takes a number and returns it multiplied by 2',
                type: 'code',
                correctAnswer: 'const double = n => n * 2;',
                explanation: 'Arrow functions with a single parameter and single expression can be written concisely.',
                points: 20
            }
        ]
    },
    {
        title: 'Arrays and Objects',
        description: 'Work with complex data structures in JavaScript. Learn to create, manipulate, and iterate over arrays and objects using modern methods and syntax.',
        content: `
# Arrays and Objects

## Arrays

### Creating Arrays
\`\`\`javascript
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null];
\`\`\`

### Array Methods

#### Adding and Removing Elements
\`\`\`javascript
const arr = [1, 2, 3];

arr.push(4);      // Add to end: [1, 2, 3, 4]
arr.pop();        // Remove from end: [1, 2, 3]
arr.unshift(0);   // Add to start: [0, 1, 2, 3]
arr.shift();      // Remove from start: [1, 2, 3]
\`\`\`

#### Transforming Arrays
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - accumulate values
const sum = numbers.reduce((total, n) => total + n, 0);
// 15

// find - get first matching element
const found = numbers.find(n => n > 3);
// 4

// some/every - check conditions
const hasEven = numbers.some(n => n % 2 === 0); // true
const allPositive = numbers.every(n => n > 0); // true
\`\`\`

#### Spread Operator
\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
const copy = [...arr1]; // Create a copy
\`\`\`

## Objects

### Creating Objects
\`\`\`javascript
const person = {
    name: "John",
    age: 30,
    city: "New York"
};
\`\`\`

### Accessing Properties
\`\`\`javascript
console.log(person.name);      // Dot notation
console.log(person["age"]);    // Bracket notation

// Dynamic access
const key = "city";
console.log(person[key]); // "New York"
\`\`\`

### Modifying Objects
\`\`\`javascript
person.email = "john@example.com"; // Add property
person.age = 31;                   // Update property
delete person.city;                // Remove property
\`\`\`

### Object Methods
\`\`\`javascript
const user = {
    name: "Alice",
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
};

console.log(user.greet()); // "Hello, I'm Alice"
\`\`\`

### Destructuring
\`\`\`javascript
// Object destructuring
const { name, age } = person;

// Array destructuring
const [first, second] = [1, 2, 3];

// With default values
const { country = "USA" } = person;
\`\`\`

### Object Spread
\`\`\`javascript
const defaults = { theme: "light", language: "en" };
const userPrefs = { theme: "dark" };

const settings = { ...defaults, ...userPrefs };
// { theme: "dark", language: "en" }
\`\`\`

### Useful Object Methods
\`\`\`javascript
Object.keys(person);   // ["name", "age", "email"]
Object.values(person); // ["John", 31, "john@example.com"]
Object.entries(person); // [["name", "John"], ["age", 31], ...]
\`\`\`
        `,
        order: 4,
        isPublished: true,
        estimatedDuration: 75,
        difficulty: 'intermediate',
        type: 'theory',
        objectives: [
            'Create and manipulate arrays using modern methods',
            'Use map, filter, reduce, and other array methods',
            'Work with objects and their properties',
            'Apply destructuring and spread operators'
        ],
        tags: ['javascript', 'arrays', 'objects', 'methods', 'destructuring', 'spread'],
        resources: [
            {
                title: 'MDN - Array',
                type: 'documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
                description: 'Complete Array documentation'
            },
            {
                title: 'JavaScript Array Methods',
                type: 'article',
                url: 'https://javascript.info/array-methods',
                description: 'Deep dive into array methods'
            },
            {
                title: 'Destructuring Assignment',
                type: 'video',
                url: 'https://www.youtube.com/watch?v=NIq3qLaHCIs',
                description: 'Visual guide to destructuring'
            }
        ],
        exercises: [
            {
                question: 'Which method creates a new array with elements that pass a test?',
                type: 'multiple-choice',
                options: ['map()', 'filter()', 'reduce()', 'find()'],
                correctAnswer: 'filter()',
                explanation: 'filter() creates a new array with all elements that pass the test implemented by the provided function.',
                points: 10
            },
            {
                question: 'What does the following code return? [1, 2, 3].map(x => x * 2)',
                type: 'multiple-choice',
                options: ['[2, 4, 6]', '12', '[1, 2, 3, 1, 2, 3]', '6'],
                correctAnswer: '[2, 4, 6]',
                explanation: 'map() creates a new array by calling the provided function on every element. Each element is multiplied by 2.',
                points: 10
            },
            {
                question: 'Write code to extract the name and age from an object using destructuring: const person = { name: "John", age: 25, city: "NYC" }',
                type: 'code',
                correctAnswer: 'const { name, age } = person;',
                explanation: 'Object destructuring allows you to extract properties into variables with matching names.',
                points: 20
            }
        ]
    },
    {
        title: 'Asynchronous JavaScript',
        description: 'Master async programming in JavaScript. Learn callbacks, promises, async/await, and how to handle API calls and asynchronous operations effectively.',
        content: `
# Asynchronous JavaScript

## Understanding Asynchronous Code
JavaScript is single-threaded but can handle asynchronous operations through the event loop.

## Callbacks (Traditional Way)
\`\`\`javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data loaded!");
    }, 1000);
}

fetchData((result) => {
    console.log(result); // After 1 second: "Data loaded!"
});
\`\`\`

### Callback Hell Problem
\`\`\`javascript
getData((a) => {
    getMoreData(a, (b) => {
        getEvenMoreData(b, (c) => {
            // Nested callbacks become hard to read
        });
    });
});
\`\`\`

## Promises

### Creating Promises
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
    const success = true;
    
    if (success) {
        resolve("Operation successful!");
    } else {
        reject(new Error("Operation failed!"));
    }
});
\`\`\`

### Using Promises
\`\`\`javascript
promise
    .then(result => {
        console.log(result);
        return "Next value";
    })
    .then(nextResult => {
        console.log(nextResult);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log("Cleanup");
    });
\`\`\`

### Promise Methods
\`\`\`javascript
// Wait for all promises
Promise.all([promise1, promise2, promise3])
    .then(results => console.log(results));

// Wait for first to settle
Promise.race([promise1, promise2])
    .then(result => console.log(result));

// Wait for all to settle (success or failure)
Promise.allSettled([promise1, promise2])
    .then(results => console.log(results));
\`\`\`

## Async/Await (ES2017)

### Basic Syntax
\`\`\`javascript
async function fetchUser() {
    try {
        const response = await fetch('https://api.example.com/user');
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
\`\`\`

### Arrow Function Syntax
\`\`\`javascript
const fetchData = async () => {
    const data = await someAsyncOperation();
    return data;
};
\`\`\`

### Parallel Execution
\`\`\`javascript
async function fetchAll() {
    // Sequential (slower)
    const user = await fetchUser();
    const posts = await fetchPosts();

    // Parallel (faster)
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
    ]);
    
    return { user, posts };
}
\`\`\`

## Fetch API

### GET Request
\`\`\`javascript
async function getUsers() {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const users = await response.json();
    return users;
}
\`\`\`

### POST Request
\`\`\`javascript
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    return response.json();
}
\`\`\`

## Error Handling Best Practices
\`\`\`javascript
async function safeApiCall() {
    try {
        const data = await fetchData();
        return { success: true, data };
    } catch (error) {
        console.error("API Error:", error.message);
        return { success: false, error: error.message };
    }
}
\`\`\`

## Key Takeaways
- Use async/await for cleaner async code
- Always handle errors with try/catch
- Use Promise.all for parallel operations
- The Fetch API is the modern way to make HTTP requests
        `,
        order: 5,
        isPublished: true,
        estimatedDuration: 90,
        difficulty: 'intermediate',
        type: 'theory',
        objectives: [
            'Understand the event loop and asynchronous behavior',
            'Create and consume Promises',
            'Use async/await for cleaner asynchronous code',
            'Make HTTP requests using the Fetch API',
            'Handle errors in asynchronous operations'
        ],
        tags: ['javascript', 'async', 'promises', 'async-await', 'fetch', 'api'],
        resources: [
            {
                title: 'MDN - Promises',
                type: 'documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
                description: 'Complete Promise documentation'
            },
            {
                title: 'JavaScript Event Loop Explained',
                type: 'video',
                url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
                description: 'Famous talk explaining the event loop'
            },
            {
                title: 'Async/Await Tutorial',
                type: 'article',
                url: 'https://javascript.info/async-await',
                description: 'Comprehensive async/await guide'
            }
        ],
        exercises: [
            {
                question: 'What keyword is used before a function to make it return a Promise?',
                type: 'multiple-choice',
                options: ['await', 'async', 'promise', 'defer'],
                correctAnswer: 'async',
                explanation: 'The async keyword before a function makes it automatically return a Promise and allows the use of await inside it.',
                points: 10
            },
            {
                question: 'Promise.all() waits for all promises even if one fails.',
                type: 'true-false',
                options: ['True', 'False'],
                correctAnswer: 'False',
                explanation: 'Promise.all() rejects immediately when any of the input promises rejects. Use Promise.allSettled() to wait for all promises regardless of outcome.',
                points: 10
            },
            {
                question: 'Which method would you use to run multiple async operations in parallel and wait for all results?',
                type: 'multiple-choice',
                options: ['Promise.race()', 'Promise.all()', 'Promise.any()', 'await each one sequentially'],
                correctAnswer: 'Promise.all()',
                explanation: 'Promise.all() takes an array of promises and returns a single promise that resolves when all promises resolve, with an array of their results.',
                points: 15
            },
            {
                question: 'Write an async function called getData that fetches from "https://api.example.com/data" and returns the JSON',
                type: 'code',
                correctAnswer: 'async function getData() { const response = await fetch("https://api.example.com/data"); return response.json(); }',
                explanation: 'Async functions use the async keyword and can await promises. The fetch API returns a Response object that has a json() method.',
                points: 25
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

        // Clear existing lessons for JavaScript module
        await Lesson.deleteMany({ moduleId: jsModule._id });
        logger.info('Cleared existing JavaScript lessons');

        // Create lessons
        const createdLessons = [];
        
        for (const lessonData of javascriptLessonsData) {
            const lesson = new Lesson({
                ...lessonData,
                moduleId: jsModule._id
            });
            await lesson.save();
            createdLessons.push(lesson);
            logger.info(`Created lesson: ${lesson.title}`);
        }

        // Set prerequisites (each lesson requires the previous one)
        for (let i = 1; i < createdLessons.length; i++) {
            createdLessons[i].prerequisites = [createdLessons[i - 1]._id];
            await createdLessons[i].save();
            logger.info(`Set prerequisite for "${createdLessons[i].title}": "${createdLessons[i - 1].title}"`);
        }

        logger.info(`JavaScript lessons seeding completed successfully. Created ${createdLessons.length} lessons.`);
        return createdLessons;

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
