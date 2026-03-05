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
