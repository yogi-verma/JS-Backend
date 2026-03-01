const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Module = require('../models/Module');
const logger = require('../logger');

const javascriptLessonsData = [
    {
        phase: 'Phase 9: Memory & Performance',
        concepts: [
            {
                name: 'Stack vs Heap',
                content: `# Stack vs Heap

## How JavaScript Manages Memory

JavaScript uses two memory regions to store data during execution: the **Stack** and the **Heap**. Understanding the difference is essential for writing performant code and avoiding memory-related bugs.

## The Stack

The **Stack** is a small, fast, ordered region of memory that follows the **LIFO** (Last In, First Out) principle. It stores:

- **Primitive values**: \`number\`, \`string\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, \`bigint\`
- **Function call frames**: each function call creates a frame on the stack containing local variables, arguments, and a return address
- **References** (pointers) to objects stored in the Heap

### Stack Characteristics

| Feature | Stack |
|---|---|
| Speed | Very fast (direct access) |
| Size | Small and fixed (typically ~1MB) |
| Management | Automatic (push/pop) |
| Data | Primitives, function frames, references |
| Access | LIFO order |
| Lifetime | Removed when function returns |

### How Primitives Live on the Stack

\`\`\`javascript
let a = 10;      // 10 is stored on the stack
let b = a;        // A COPY of 10 is stored on the stack
b = 20;

console.log(a);   // 10 — unchanged, because b got its own copy
console.log(b);   // 20
\`\`\`

Each primitive variable holds its own independent value on the stack. Assigning one to another creates a **copy**.

### The Call Stack

Every time a function is called, a new **frame** is pushed onto the call stack. When the function returns, its frame is popped off.

\`\`\`javascript
function multiply(x, y) {
  return x * y;       // Frame 3: multiply(3, 4)
}

function square(n) {
  return multiply(n, n); // Frame 2: square(3)
}

function printSquare(n) {
  const result = square(n); // Frame 1: printSquare(3)
  console.log(result);
}

printSquare(3);
// Call Stack (bottom to top):
// 1. printSquare(3)
// 2. square(3)
// 3. multiply(3, 3)
// multiply returns 9 → popped
// square returns 9 → popped
// printSquare logs 9 → popped
// Stack is empty
\`\`\`

### Stack Overflow

When the call stack exceeds its size limit (usually from infinite recursion):

\`\`\`javascript
function infinite() {
  return infinite(); // Keeps pushing frames, never pops
}

infinite();
// Uncaught RangeError: Maximum call stack size exceeded

// Every call adds a frame:
// Frame 1: infinite()
// Frame 2: infinite()
// Frame 3: infinite()
// ... thousands more until crash
\`\`\`

\`\`\`javascript
// Fix: add a base case
function countdown(n) {
  if (n <= 0) return; // Base case — stops recursion
  console.log(n);
  countdown(n - 1);
}

countdown(5); // 5, 4, 3, 2, 1 — no overflow
\`\`\`

## The Heap

The **Heap** is a large, unstructured region of memory used for **dynamic allocation**. It stores:

- **Objects**: \`{}\`
- **Arrays**: \`[]\`
- **Functions**: \`function() {}\`
- **Maps, Sets, RegExp**, and other complex types

### Heap Characteristics

| Feature | Heap |
|---|---|
| Speed | Slower (requires lookup) |
| Size | Large and dynamic (grows as needed) |
| Management | Garbage Collector |
| Data | Objects, arrays, functions |
| Access | By reference |
| Lifetime | Until no references remain |

### How Objects Live on the Heap

\`\`\`javascript
let user1 = { name: 'Alice', age: 25 };
// Stack: user1 holds a REFERENCE (memory address) pointing to Heap
// Heap: { name: 'Alice', age: 25 } stored here

let user2 = user1;
// Stack: user2 holds a COPY of the REFERENCE (same address)
// Both user1 and user2 point to the SAME object in Heap

user2.age = 30;

console.log(user1.age); // 30 — SAME object was modified!
console.log(user2.age); // 30
\`\`\`

### Visualizing Stack vs Heap

\`\`\`javascript
let count = 42;                        // Stack: count = 42
let name = 'Alice';                    // Stack: name = 'Alice'
let scores = [90, 85, 92];            // Stack: scores = <ref1>  →  Heap: [90, 85, 92]
let user = { name: 'Alice', age: 25 }; // Stack: user = <ref2>   →  Heap: { name: 'Alice', age: 25 }

function greet(person) {               // Stack: person = <ref2> (copy of reference)
  return 'Hello ' + person.name;
}

// Memory Layout:
// ┌──────────────────┐     ┌──────────────────────────────┐
// │     STACK         │     │           HEAP                │
// │──────────────────│     │──────────────────────────────│
// │ count: 42         │     │ [90, 85, 92]        ← ref1  │
// │ name: 'Alice'     │     │ { name:'Alice',age:25} ← ref2│
// │ scores: <ref1>    │     │                              │
// │ user: <ref2>      │     │                              │
// └──────────────────┘     └──────────────────────────────┘
\`\`\`

## Copy Behavior: Value vs Reference

### Primitives — Copy by Value (Stack)

\`\`\`javascript
let x = 'hello';
let y = x;       // y gets its own copy
y = 'world';

console.log(x);  // 'hello' — unaffected
console.log(y);  // 'world'
\`\`\`

### Objects — Copy by Reference (Heap)

\`\`\`javascript
let arr1 = [1, 2, 3];
let arr2 = arr1;       // arr2 points to the SAME array
arr2.push(4);

console.log(arr1);     // [1, 2, 3, 4] — both see the change
console.log(arr2);     // [1, 2, 3, 4]

// To create an independent copy:
let arr3 = [...arr1];           // Shallow copy (spread)
let arr4 = JSON.parse(JSON.stringify(arr1)); // Deep copy
let arr5 = structuredClone(arr1); // Deep copy (modern)
\`\`\`

### Function Arguments

\`\`\`javascript
// Primitives are passed by value
function changeValue(val) {
  val = 100;
}
let num = 5;
changeValue(num);
console.log(num); // 5 — unchanged

// Objects are passed by reference
function changeObject(obj) {
  obj.name = 'Bob';
}
let person = { name: 'Alice' };
changeObject(person);
console.log(person.name); // 'Bob' — changed!

// But reassigning the parameter doesn't affect the original
function replaceObject(obj) {
  obj = { name: 'Charlie' }; // New reference, doesn't affect original
}
replaceObject(person);
console.log(person.name); // 'Bob' — still Bob
\`\`\`

## Equality Comparison

\`\`\`javascript
// Primitives: compared by VALUE
console.log(5 === 5);         // true
console.log('hi' === 'hi');   // true

// Objects: compared by REFERENCE (memory address)
console.log({} === {});       // false — different objects in heap
console.log([] === []);       // false — different arrays in heap

const a = { x: 1 };
const b = a;
console.log(a === b);         // true — same reference

const c = { x: 1 };
console.log(a === c);         // false — different reference, even though content is identical
\`\`\`

## Performance Implications

\`\`\`javascript
// Stack operations are fast — use primitives when possible
// Instead of:
const config = { isEnabled: true }; // Heap allocation

// Prefer (when a simple flag suffices):
const isEnabled = true;              // Stack only — faster

// Avoid creating unnecessary objects in hot loops
// Bad:
for (let i = 0; i < 1000000; i++) {
  const point = { x: i, y: i * 2 }; // 1M heap allocations → GC pressure
  processPoint(point);
}

// Better (reuse object):
const point = { x: 0, y: 0 };
for (let i = 0; i < 1000000; i++) {
  point.x = i;
  point.y = i * 2;
  processPoint(point);
}
\`\`\`

## Key Takeaway

The Stack stores primitives and function call frames — it's fast, small, and automatically managed. The Heap stores objects, arrays, and functions — it's large and managed by the garbage collector. Primitives are copied by value (independent), while objects are copied by reference (shared). Understanding this distinction is key to avoiding mutation bugs and writing memory-efficient code.`
            },
            {
                name: 'Garbage Collection',
                content: `# Garbage Collection

## What is Garbage Collection?

**Garbage Collection (GC)** is JavaScript's automatic memory management system. It identifies memory that is no longer being used (unreachable) and frees it so new allocations can reuse that space.

You don't manually allocate or free memory in JavaScript — the engine does it for you. But understanding how it works helps you avoid memory leaks and write performant applications.

## The Memory Lifecycle

Every piece of data in JavaScript goes through three stages:

\`\`\`
1. Allocation    →  Memory is reserved when you create values
2. Usage         →  Reading/writing the value in your code
3. Deallocation  →  GC frees memory when value is no longer reachable
\`\`\`

\`\`\`javascript
// 1. Allocation
let user = { name: 'Alice', age: 25 };   // Object allocated on the heap
let scores = [90, 85, 92];               // Array allocated on the heap

// 2. Usage
console.log(user.name);                  // Reading the object
scores.push(88);                         // Modifying the array

// 3. Deallocation
user = null;                              // Reference removed — object becomes eligible for GC
scores = null;                            // Reference removed — array becomes eligible for GC
// GC will eventually free the memory used by these
\`\`\`

## Reachability — The Core Concept

The garbage collector uses **reachability** to decide what to keep and what to free. A value is **reachable** if it can be accessed through any chain of references starting from **roots**.

### Roots (Always Reachable)

- Global variables (\`window\` in browsers, \`global\` in Node.js)
- Currently executing function's local variables and parameters
- Variables in the current closure chain
- The call stack

### Example: Becoming Unreachable

\`\`\`javascript
let user = { name: 'Alice' };
// The object { name: 'Alice' } is reachable through 'user'

user = null;
// Now nothing references the object — it's UNREACHABLE
// GC will free the memory
\`\`\`

\`\`\`javascript
let a = { name: 'Alice' };
let b = a;
// Object has TWO references: a and b

a = null;
// Object still reachable through b — NOT collected

b = null;
// NOW the object has zero references — eligible for GC
\`\`\`

### Interconnected Objects

\`\`\`javascript
function createFamily() {
  let husband = { name: 'John' };
  let wife = { name: 'Jane' };

  husband.wife = wife;
  wife.husband = husband;

  return { father: husband, mother: wife };
}

let family = createFamily();

// All objects reachable through 'family':
// family → father (John) → wife (Jane) → husband (John) — circular, but reachable

family = null;
// Now the entire cluster is unreachable — ALL of them are eligible for GC
// Modern GC handles circular references correctly
\`\`\`

## Mark-and-Sweep Algorithm

Modern JavaScript engines (V8 in Chrome/Node.js, SpiderMonkey in Firefox) use the **Mark-and-Sweep** algorithm:

### How It Works

\`\`\`
Step 1: MARK PHASE
  - Start from all roots
  - Follow every reference chain
  - Mark every reachable object as "alive"

Step 2: SWEEP PHASE
  - Scan the entire heap
  - Any object NOT marked = unreachable
  - Free the memory of unmarked objects
  - Clear all marks for the next cycle
\`\`\`

\`\`\`javascript
// Visual example:
let root = {
  child1: { data: 'keep me' },
  child2: { data: 'keep me too' }
};
let orphan = { data: 'nobody references me' };
orphan = null; // Lost the only reference

// Mark phase: root → child1 ✓, root → child2 ✓
// orphan object is NOT marked (unreachable)
// Sweep phase: orphan's memory is freed
\`\`\`

## Generational Garbage Collection

V8 (Chrome, Node.js) uses **generational GC** based on the observation that most objects die young:

### Young Generation (Nursery)

- Small memory space (~1-8MB)
- New objects are allocated here
- Collected frequently (Minor GC / Scavenge)
- Very fast — only copies surviving objects
- Most objects die here and never get promoted

### Old Generation (Tenured)

- Large memory space (~hundreds of MB)
- Objects that survive multiple young GC cycles are promoted here
- Collected less frequently (Major GC / Mark-Sweep-Compact)
- Slower but runs less often

\`\`\`javascript
// Most temporary objects die in the young generation:
function processData(items) {
  const temp = items.map(i => i * 2);  // Temporary — dies after function returns
  const result = temp.filter(i => i > 10); // Temporary
  return result.reduce((a, b) => a + b, 0); // temp and result become unreachable
}
// temp and result are short-lived → collected in young generation
// Very efficient — no Major GC needed
\`\`\`

## Memory Leaks — When GC Can't Help

A **memory leak** occurs when your code keeps references to objects that are no longer needed, preventing GC from freeing them. The memory usage grows over time until the app crashes or slows down.

### Leak 1: Forgotten Event Listeners

\`\`\`javascript
// LEAK: listener keeps a reference to heavyData via closure
function setupHandler() {
  const heavyData = new Array(1000000).fill('x');

  document.getElementById('btn').addEventListener('click', function handler() {
    console.log(heavyData.length);
  });
}
setupHandler();
// heavyData can NEVER be collected because the event handler references it
// Even if the button is removed from DOM, the listener may still hold the reference

// FIX: remove the listener when no longer needed
function setupHandlerFixed() {
  const heavyData = new Array(1000000).fill('x');

  function handler() {
    console.log(heavyData.length);
  }

  const btn = document.getElementById('btn');
  btn.addEventListener('click', handler);

  // Cleanup function
  return () => {
    btn.removeEventListener('click', handler);
    // Now heavyData can be garbage collected
  };
}

const cleanup = setupHandlerFixed();
// Later when done:
cleanup();
\`\`\`

### Leak 2: Forgotten Timers

\`\`\`javascript
// LEAK: interval keeps running and holding references
let data = fetchHugeDataset();

const intervalId = setInterval(() => {
  processData(data); // 'data' is kept alive by this closure
}, 1000);

// Even if you set data = null elsewhere, the closure still holds the reference to the original

// FIX: clear the interval when done
clearInterval(intervalId);
data = null; // NOW the data can be collected
\`\`\`

### Leak 3: Detached DOM Nodes

\`\`\`javascript
// LEAK: removed DOM element still referenced in JS
const elements = [];

function addElement() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  elements.push(div); // JS array still references it
}

function removeElement() {
  const div = elements[0];
  document.body.removeChild(div); // Removed from DOM
  // BUT still in 'elements' array → memory not freed!
}

// FIX: also remove from the array
function removeElementFixed() {
  const div = elements.shift(); // Remove from array
  document.body.removeChild(div); // Remove from DOM
  // Now div has no references → eligible for GC
}
\`\`\`

### Leak 4: Growing Global State

\`\`\`javascript
// LEAK: unbounded growth
const cache = {};

function memoize(key, expensiveComputation) {
  if (!cache[key]) {
    cache[key] = expensiveComputation();
  }
  return cache[key];
}
// Cache grows forever — nothing is ever removed!

// FIX 1: Use a Map with a size limit
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // Move to end (most recent)
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.maxSize) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest); // Remove oldest entry
    }
  }
}

// FIX 2: Use WeakMap for automatic cleanup
const weakCache = new WeakMap();
// Keys must be objects — when the key object is GC'd, entry is auto-removed
\`\`\`

### Leak 5: Closures Holding Large Scope

\`\`\`javascript
// LEAK: closure accidentally retains large data
function createProcessor() {
  const hugeArray = new Array(1000000).fill({ data: 'x'.repeat(100) });
  const importantValue = hugeArray.length;

  return function process() {
    // Only uses importantValue, but closure retains ALL of createProcessor's scope
    // Including hugeArray!
    return importantValue * 2;
  };
}

// FIX: null out what you don't need
function createProcessorFixed() {
  let hugeArray = new Array(1000000).fill({ data: 'x'.repeat(100) });
  const importantValue = hugeArray.length;
  hugeArray = null; // Release the large array before returning

  return function process() {
    return importantValue * 2;
  };
}
\`\`\`

## WeakRef and WeakMap — GC-Friendly References

### WeakMap

Keys in a \`WeakMap\` are held **weakly** — they don't prevent garbage collection:

\`\`\`javascript
let user = { name: 'Alice' };
const metadata = new WeakMap();
metadata.set(user, { lastLogin: Date.now() });

console.log(metadata.get(user)); // { lastLogin: ... }

user = null;
// The { name: 'Alice' } object AND its WeakMap entry are both eligible for GC
// No manual cleanup needed!
\`\`\`

### WeakRef

\`WeakRef\` holds a weak reference to an object — it can be collected even while the WeakRef exists:

\`\`\`javascript
let target = { data: 'important' };
const ref = new WeakRef(target);

console.log(ref.deref()); // { data: 'important' }

target = null;
// After GC runs:
console.log(ref.deref()); // undefined — object was collected
\`\`\`

### FinalizationRegistry

Run cleanup code when an object is garbage collected:

\`\`\`javascript
const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Object with id "\${heldValue}" was garbage collected\`);
});

let obj = { name: 'temp' };
registry.register(obj, 'temp-object-1');

obj = null;
// Eventually logs: 'Object with id "temp-object-1" was garbage collected'
\`\`\`

## Detecting Memory Leaks

### Using Chrome DevTools

1. **Memory tab** → Take Heap Snapshot
2. Perform the action that might leak
3. Take another Heap Snapshot
4. Compare snapshots — look for objects that shouldn't still exist
5. Check "Objects allocated between snapshot 1 and 2"

### Using Performance Monitor

1. Open DevTools → \`Ctrl+Shift+P\` → "Show Performance Monitor"
2. Watch the "JS Heap Size" graph
3. If memory keeps growing without dropping → likely a leak
4. Healthy pattern: sawtooth (grows then drops when GC runs)

### Programmatic Detection

\`\`\`javascript
// Log heap usage over time (Node.js)
setInterval(() => {
  const mem = process.memoryUsage();
  console.log({
    heapUsed: (mem.heapUsed / 1048576).toFixed(2) + ' MB',
    heapTotal: (mem.heapTotal / 1048576).toFixed(2) + ' MB',
    rss: (mem.rss / 1048576).toFixed(2) + ' MB',
    external: (mem.external / 1048576).toFixed(2) + ' MB'
  });
}, 5000);

// Browser
if (performance.memory) {
  console.log({
    usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
    totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB'
  });
}
\`\`\`

## Best Practices for Memory Management

\`\`\`javascript
// 1. Nullify references when done
let data = loadLargeDataset();
processData(data);
data = null; // Allow GC

// 2. Remove event listeners
const handler = () => console.log('click');
element.addEventListener('click', handler);
// When done:
element.removeEventListener('click', handler);

// 3. Clear timers
const id = setInterval(doWork, 1000);
// When done:
clearInterval(id);

// 4. Use WeakMap/WeakSet for caches
const cache = new WeakMap(); // Auto-cleanup

// 5. Avoid global variables
// Bad:
window.bigData = loadEverything();
// Good:
function process() {
  const bigData = loadEverything();
  // bigData is local — collected when function ends
}

// 6. Be careful with closures
function createHandler(bigData) {
  const summary = summarize(bigData); // Extract what you need
  // Don't capture bigData in the closure:
  return () => console.log(summary);
}

// 7. Use structuredClone sparingly on large objects
// It creates deep copies — doubles memory usage temporarily
\`\`\`

## Key Takeaway

JavaScript's garbage collector automatically frees unreachable memory using the mark-and-sweep algorithm. Memory leaks happen when your code accidentally keeps references alive (forgotten listeners, timers, detached DOM nodes, unbounded caches, closures). Use WeakMap/WeakRef for GC-friendly references, clean up resources explicitly, and use DevTools Memory tab to detect and diagnose leaks. Understanding GC helps you write applications that stay fast and stable over time.`
            },
            {
                name: 'Memory Leaks',
                content: `# Memory Leaks

## What is a Memory Leak?

A **memory leak** occurs when your application allocates memory but fails to release it when it's no longer needed. The garbage collector can't free this memory because references to it still exist — even though you no longer use the data.

Over time, leaked memory accumulates, causing your application to slow down, consume excessive resources, and eventually crash.

## How to Identify a Memory Leak

### Symptoms

- Application becomes slower over time
- Browser tab memory usage keeps growing
- Page becomes unresponsive after extended use
- Node.js process RSS (Resident Set Size) grows continuously
- "Out of memory" errors or tab crashes

### Healthy vs Leaking Memory Pattern

\`\`\`
Healthy (Sawtooth Pattern):
Memory ▲
       │  ╱╲  ╱╲  ╱╲  ╱╲
       │ ╱  ╲╱  ╲╱  ╲╱  ╲
       │╱
       └──────────────────→ Time
       GC runs periodically, memory drops back down

Leaking (Upward Trend):
Memory ▲
       │              ╱╲
       │          ╱╲ ╱  ╲
       │      ╱╲ ╱  ╲
       │  ╱╲ ╱  ╲
       │ ╱  ╲
       │╱
       └──────────────────→ Time
       GC runs but memory never fully recovers
\`\`\`

## The 7 Most Common Memory Leaks

### 1. Accidental Global Variables

Variables declared without \`let\`, \`const\`, or \`var\` become globals and persist for the entire page lifetime:

\`\`\`javascript
// LEAK: accidental global
function processData() {
  results = computeExpensiveData(); // No let/const → global variable!
  // 'results' lives on window.results forever
}

// Even 'this' can create accidental globals
function MyClass() {
  this.data = new Array(1000000); // If called without 'new', 'this' = window
}
MyClass(); // Forgot 'new' → window.data = huge array!

// FIX: Always use strict mode and let/const
'use strict'; // Throws error on accidental globals

function processDataFixed() {
  const results = computeExpensiveData(); // Local — GC'd when function ends
  return results;
}
\`\`\`

### 2. Forgotten Event Listeners

Event listeners hold references to their callbacks and any variables captured in closures:

\`\`\`javascript
// LEAK: listeners accumulate on every call
function setupSearch() {
  const cache = new Array(100000).fill('data');

  document.getElementById('search').addEventListener('input', (e) => {
    filterResults(e.target.value, cache); // cache lives as long as this listener
  });
}

// Called on every page navigation in SPA
setupSearch(); // Adds listener #1 + cache #1
setupSearch(); // Adds listener #2 + cache #2 (old one still exists!)
setupSearch(); // Adds listener #3 + cache #3

// FIX 1: Remove before re-adding
let currentHandler = null;
function setupSearchFixed() {
  const searchEl = document.getElementById('search');
  const cache = new Array(100000).fill('data');

  if (currentHandler) {
    searchEl.removeEventListener('input', currentHandler);
  }

  currentHandler = (e) => filterResults(e.target.value, cache);
  searchEl.addEventListener('input', currentHandler);
}

// FIX 2: Use AbortController (modern approach)
let abortController = null;
function setupSearchModern() {
  if (abortController) abortController.abort(); // Removes all previous listeners
  abortController = new AbortController();

  const cache = new Array(100000).fill('data');

  document.getElementById('search').addEventListener('input', (e) => {
    filterResults(e.target.value, cache);
  }, { signal: abortController.signal });
}

// FIX 3: Use { once: true } for one-time listeners
button.addEventListener('click', handleClick, { once: true });
// Automatically removed after first trigger
\`\`\`

### 3. Uncleared Timers and Intervals

\`setInterval\` keeps running (and holding references) until explicitly cleared:

\`\`\`javascript
// LEAK: interval never cleared
function startPolling() {
  const hugeBuffer = new ArrayBuffer(10 * 1024 * 1024); // 10MB

  setInterval(() => {
    const view = new DataView(hugeBuffer);
    sendData(view); // hugeBuffer held alive by closure
  }, 1000);
}
// Called again on re-mount → another 10MB interval running

// FIX: track and clear intervals
class Poller {
  constructor() {
    this.intervalId = null;
    this.buffer = null;
  }

  start() {
    this.stop(); // Clear previous interval first
    this.buffer = new ArrayBuffer(10 * 1024 * 1024);

    this.intervalId = setInterval(() => {
      const view = new DataView(this.buffer);
      sendData(view);
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.buffer = null; // Release buffer
    }
  }
}

// React useEffect pattern
useEffect(() => {
  const id = setInterval(fetchData, 5000);
  return () => clearInterval(id); // Cleanup on unmount
}, []);
\`\`\`

### 4. Detached DOM Elements

Removing an element from the DOM doesn't free its memory if JavaScript still references it:

\`\`\`javascript
// LEAK: detached DOM tree held in memory
const detachedNodes = new Map();

function createWidget(id) {
  const container = document.createElement('div');
  container.innerHTML = '<div class="widget"><h2>Widget</h2><p>Content...</p></div>';
  document.body.appendChild(container);
  detachedNodes.set(id, container); // Stored reference
}

function removeWidget(id) {
  const container = detachedNodes.get(id);
  container.remove(); // Removed from DOM
  // BUT detachedNodes still holds the reference → LEAK
}

// FIX: delete from the Map too
function removeWidgetFixed(id) {
  const container = detachedNodes.get(id);
  container.remove();
  detachedNodes.delete(id); // Remove the reference → now GC can collect
}
\`\`\`

\`\`\`javascript
// LEAK: table rows stored in external array
const rows = [];

function renderTable(data) {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = ''; // Clears DOM but not our array!

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = \`<td>\${item.name}</td><td>\${item.value}</td>\`;
    tbody.appendChild(tr);
    rows.push(tr); // Accumulates across re-renders!
  });
}

// FIX: clear the array before re-rendering
function renderTableFixed(data) {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  rows.length = 0; // Clear previous references

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = \`<td>\${item.name}</td><td>\${item.value}</td>\`;
    tbody.appendChild(tr);
    rows.push(tr);
  });
}
\`\`\`

### 5. Closures Capturing More Than Needed

Closures capture the entire parent scope, not just the variables they use:

\`\`\`javascript
// LEAK: closure retains entire scope
function createHandler() {
  const config = { theme: 'dark', lang: 'en' };      // Small — intended
  const hugeDataset = loadMillionRecords();             // HUGE — not intended
  const summary = summarize(hugeDataset);               // Small — intended

  return function onClick() {
    // Only uses config and summary, but hugeDataset is also retained
    // because it's in the same scope
    render(config, summary);
  };
}

// FIX: null out large variables before returning
function createHandlerFixed() {
  const config = { theme: 'dark', lang: 'en' };
  let hugeDataset = loadMillionRecords();
  const summary = summarize(hugeDataset);
  hugeDataset = null; // Release BEFORE creating the closure

  return function onClick() {
    render(config, summary);
  };
}

// FIX 2: extract computation into a separate function
function createHandlerBetter() {
  const config = { theme: 'dark', lang: 'en' };
  const summary = computeSummary(); // hugeDataset is local to computeSummary

  return function onClick() {
    render(config, summary);
  };
}

function computeSummary() {
  const hugeDataset = loadMillionRecords();
  return summarize(hugeDataset);
  // hugeDataset is GC'd when computeSummary returns
}
\`\`\`

### 6. Unbounded Caches and Collections

Caches that grow without limits are one of the most common leaks in production:

\`\`\`javascript
// LEAK: cache grows infinitely
const apiCache = new Map();

async function fetchWithCache(url) {
  if (apiCache.has(url)) return apiCache.get(url);

  const response = await fetch(url);
  const data = await response.json();
  apiCache.set(url, data); // Never removed!
  return data;
}

// After 10,000 unique API calls → 10,000 cached responses in memory

// FIX: LRU cache with max size and TTL
class SmartCache {
  constructor(maxSize = 100, ttlMs = 60000) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    this.cache = new Map();
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check TTL
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return undefined;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key, value) {
    this.cache.delete(key); // Remove if exists (for re-ordering)
    this.cache.set(key, { value, timestamp: Date.now() });

    // Evict oldest if over limit
    if (this.cache.size > this.maxSize) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new SmartCache(50, 30000); // Max 50 items, 30s TTL
\`\`\`

### 7. Forgotten Observers and Subscriptions

\`\`\`javascript
// LEAK: IntersectionObserver never disconnected
function setupLazyLoad() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });

  // Observer keeps running even after images are loaded
}

// FIX: unobserve loaded images and disconnect when done
function setupLazyLoadFixed() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target); // Stop watching this one
      }
    });
  });

  const images = document.querySelectorAll('img[data-src]');
  let loadedCount = 0;

  images.forEach(img => observer.observe(img));

  // Track loaded count and disconnect when all done
  function loadImage(img) {
    img.src = img.dataset.src;
    loadedCount++;
    if (loadedCount === images.length) {
      observer.disconnect(); // All done — free the observer
    }
  }
}
\`\`\`

## Detecting Memory Leaks with DevTools

### Step-by-Step Heap Snapshot Comparison

1. Open Chrome DevTools → Memory tab
2. Select "Heap snapshot" → Click "Take snapshot" (Snapshot 1)
3. Perform the action you suspect leaks (navigate, open/close modal, etc.)
4. Take Snapshot 2
5. Select Snapshot 2 → Change dropdown to "Comparison"
6. Sort by "Size Delta" or "# New" — look for unexpected growth
7. Click objects to see what's retaining them in the "Retainers" panel

### Allocation Timeline

1. Memory tab → Select "Allocation instrumentation on timeline"
2. Click Start
3. Perform actions
4. Click Stop
5. Blue bars = allocated, gray bars = freed
6. Blue bars that never turn gray = potential leaks

### Performance Monitor

\`\`\`
Ctrl+Shift+P → "Show Performance Monitor"

Watch these counters:
- JS Heap Size: should stabilize, not grow indefinitely
- DOM Nodes: should stay roughly constant
- JS Event Listeners: should not keep increasing
- Documents: should be 1 (more = detached iframes)
\`\`\`

## Memory Leak Prevention Checklist

1. Always use \`let\`/\`const\` — never create accidental globals
2. Remove event listeners when components unmount
3. Clear all \`setInterval\`/\`setTimeout\` on cleanup
4. Use \`AbortController\` for fetch and event listener cleanup
5. Don't store DOM references in long-lived collections
6. Bound your caches with max size and TTL
7. Null out large variables in closures before returning functions
8. Disconnect observers (\`MutationObserver\`, \`IntersectionObserver\`, \`ResizeObserver\`)
9. Cancel pending promises/requests on unmount
10. Use \`WeakMap\`/\`WeakSet\`/\`WeakRef\` for metadata and caches keyed by objects

## Key Takeaway

Memory leaks are silent killers — they don't crash immediately but degrade performance over time. The most common causes are forgotten event listeners, uncleared timers, detached DOM nodes, unbounded caches, and closures capturing too much. Use Chrome DevTools Heap Snapshots to detect leaks, follow the prevention checklist, and always clean up after yourself. A disciplined cleanup pattern prevents 90% of memory issues.`
            },
            {
                name: 'Performance Optimization Techniques',
                content: `# Performance Optimization Techniques

## Why Performance Matters

- **User Experience**: 53% of users abandon sites that take over 3 seconds to load
- **SEO**: Google uses Core Web Vitals as a ranking factor
- **Conversion**: Every 100ms of latency costs ~1% in sales (Amazon study)
- **Mobile Users**: Slower CPU and network — optimizations matter even more

## 1. Minimize DOM Manipulation

DOM operations are the **most expensive** thing JavaScript does in the browser. The DOM is a bridge between JavaScript and the rendering engine — every interaction crosses that bridge.

### Batch DOM Reads and Writes

\`\`\`javascript
// BAD: read-write-read-write causes layout thrashing
function updateElements(elements) {
  elements.forEach(el => {
    const height = el.offsetHeight;     // READ → triggers layout
    el.style.height = height * 2 + 'px'; // WRITE → invalidates layout
    // Next iteration's READ forces a fresh layout calculation!
  });
}

// GOOD: batch all reads first, then all writes
function updateElementsOptimized(elements) {
  // Phase 1: READ all
  const heights = elements.map(el => el.offsetHeight);

  // Phase 2: WRITE all
  elements.forEach((el, i) => {
    el.style.height = heights[i] * 2 + 'px';
  });
  // Only ONE layout recalculation!
}
\`\`\`

### Use DocumentFragment for Bulk Inserts

\`\`\`javascript
// BAD: 1000 individual DOM mutations
function addItems(items) {
  const list = document.getElementById('list');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    list.appendChild(li); // Triggers reflow on EACH append
  });
}

// GOOD: build everything off-DOM, append once
function addItemsOptimized(items) {
  const list = document.getElementById('list');
  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    fragment.appendChild(li); // No reflow — fragment is off-DOM
  });

  list.appendChild(fragment); // Single reflow
}
\`\`\`

### Use innerHTML for Large Updates

\`\`\`javascript
// For large lists, innerHTML can be faster than createElement
function renderListFast(items) {
  const html = items.map(item =>
    \`<li class="item"><span>\${item.name}</span><span>\${item.price}</span></li>\`
  ).join('');

  document.getElementById('list').innerHTML = html; // Single DOM update
}
\`\`\`

## 2. Debouncing and Throttling

Control how often expensive functions execute in response to rapid events (scroll, resize, input).

### Debounce — Wait Until Activity Stops

Delays execution until a pause in activity. Perfect for search inputs.

\`\`\`javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: only search after user stops typing for 300ms
const searchInput = document.getElementById('search');

const debouncedSearch = debounce(async (query) => {
  const results = await fetch(\`/api/search?q=\${query}\`);
  renderResults(await results.json());
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Without debounce: 20 keystrokes = 20 API calls
// With debounce:    20 keystrokes = 1 API call (after 300ms pause)
\`\`\`

### Throttle — Limit Execution Rate

Ensures a function runs at most once per interval. Perfect for scroll/resize.

\`\`\`javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

// Usage: update scroll position at most every 100ms
const throttledScroll = throttle(() => {
  const scrollY = window.scrollY;
  updateProgressBar(scrollY);
  checkInfiniteScroll(scrollY);
}, 100);

window.addEventListener('scroll', throttledScroll);

// Without throttle: 100+ calls per second while scrolling
// With throttle:    10 calls per second maximum
\`\`\`

### When to Use Which

| Technique | Use Case | Example |
|---|---|---|
| Debounce | Wait for activity to stop | Search input, form validation, resize end |
| Throttle | Limit frequency of execution | Scroll handler, mousemove, game loop |

## 3. Efficient Loops and Iterations

### Choose the Right Loop

\`\`\`javascript
const arr = new Array(1000000).fill(1);

// Performance ranking (fastest to slowest for simple iteration):
// 1. for loop — fastest, direct index access
for (let i = 0; i < arr.length; i++) { /* ... */ }

// 2. for...of — clean, slightly slower
for (const item of arr) { /* ... */ }

// 3. forEach — function call overhead per iteration
arr.forEach(item => { /* ... */ });

// 4. for...in — slowest, designed for objects not arrays
for (const i in arr) { /* ... */ } // AVOID for arrays
\`\`\`

### Cache Array Length

\`\`\`javascript
// Slightly slower: .length re-evaluated each iteration
for (let i = 0; i < hugeArray.length; i++) { }

// Faster: length cached
for (let i = 0, len = hugeArray.length; i < len; i++) { }
\`\`\`

### Break Early When Possible

\`\`\`javascript
// BAD: scans entire array even after finding the item
const found = users.filter(u => u.id === targetId)[0];

// GOOD: stops at first match
const found = users.find(u => u.id === targetId);

// GOOD: use Set for O(1) lookups instead of array O(n)
const idSet = new Set(userIds);
const hasUser = idSet.has(targetId); // O(1) vs array.includes() O(n)
\`\`\`

### Use Map Over Object for Frequent Lookups

\`\`\`javascript
// Object: keys are always strings, prototype chain overhead
const objCache = {};
objCache['key1'] = 'value1';

// Map: any key type, optimized for frequent add/delete, no prototype
const mapCache = new Map();
mapCache.set('key1', 'value1');
mapCache.set(42, 'value2');          // Non-string keys
mapCache.set(userObj, 'metadata');   // Object keys

// Map is faster for:
// - Frequent additions and deletions
// - Large collections (1000+ entries)
// - When you need .size or iteration order
\`\`\`

## 4. Lazy Loading and Code Splitting

### Lazy Load Images

\`\`\`javascript
// Native lazy loading (modern browsers)
<img src="photo.jpg" loading="lazy" alt="Description">

// Intersection Observer approach
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
}, { rootMargin: '200px' }); // Start loading 200px before visible

document.querySelectorAll('img.lazy').forEach(img => observer.observe(img));
\`\`\`

### Dynamic Imports (Code Splitting)

\`\`\`javascript
// Instead of importing everything upfront:
import { heavyChart } from './charts'; // Loaded even if user never sees charts

// Dynamically import only when needed:
async function showChart() {
  const { heavyChart } = await import('./charts'); // Loaded on demand
  heavyChart.render(data);
}

// React.lazy for component-level code splitting
const ChartComponent = React.lazy(() => import('./ChartComponent'));

function Dashboard() {
  return (
    <Suspense fallback={<Loader />}>
      <ChartComponent data={data} />
    </Suspense>
  );
}
\`\`\`

## 5. Web Workers for Heavy Computation

Move CPU-intensive work off the main thread to keep the UI responsive:

\`\`\`javascript
// main.js — UI thread stays responsive
const worker = new Worker('worker.js');

worker.postMessage({ data: largeDataset, operation: 'sort' });

worker.onmessage = (event) => {
  const sorted = event.data;
  renderResults(sorted); // Update UI with results
};

// Show loading indicator while worker computes
showSpinner();
\`\`\`

\`\`\`javascript
// worker.js — runs on a separate thread
self.onmessage = (event) => {
  const { data, operation } = event.data;

  let result;
  if (operation === 'sort') {
    result = data.sort((a, b) => a.value - b.value); // CPU-heavy
  } else if (operation === 'filter') {
    result = data.filter(item => item.score > 50);
  }

  self.postMessage(result); // Send result back to main thread
};
\`\`\`

## 6. Memoization and Caching

### Memoize Expensive Computations

\`\`\`javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive recursive function
const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(40); // Instant with memoization, minutes without
\`\`\`

### React.memo and useMemo

\`\`\`javascript
// Prevent unnecessary re-renders
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item => <ListItem key={item.id} {...item} />);
});
// Only re-renders when 'items' reference changes

// Cache expensive computations in React
function Dashboard({ users, filter }) {
  const filteredUsers = useMemo(() => {
    return users.filter(u => u.role === filter) // Only recomputes when users or filter changes
                .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, filter]);

  return <UserList users={filteredUsers} />;
}
\`\`\`

## 7. Reduce Network Overhead

### Request Batching

\`\`\`javascript
// BAD: 10 individual requests
async function loadAllData(ids) {
  const results = [];
  for (const id of ids) {
    results.push(await fetch(\`/api/items/\${id}\`)); // Sequential!
  }
  return results;
}

// BETTER: parallel requests
async function loadAllDataParallel(ids) {
  const promises = ids.map(id => fetch(\`/api/items/\${id}\`));
  return Promise.all(promises); // All at once
}

// BEST: single batch request
async function loadAllDataBatched(ids) {
  const response = await fetch('/api/items/batch', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
  return response.json(); // One request, all data
}
\`\`\`

### Abort Unnecessary Requests

\`\`\`javascript
let currentController = null;

async function search(query) {
  // Cancel previous request if still in flight
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    const response = await fetch(\`/api/search?q=\${query}\`, {
      signal: currentController.signal,
    });
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') return null; // Intentionally cancelled
    throw error;
  }
}
\`\`\`

## 8. Optimize Rendering

### requestAnimationFrame for Visual Updates

\`\`\`javascript
// BAD: updating position in a tight loop or setTimeout
function animate() {
  element.style.left = position + 'px';
  position += 1;
  setTimeout(animate, 16); // Not synced with display refresh
}

// GOOD: synced with browser's refresh rate (60fps)
function animateOptimized() {
  element.style.left = position + 'px';
  position += 1;
  requestAnimationFrame(animateOptimized);
}
requestAnimationFrame(animateOptimized);
\`\`\`

### Use CSS Transforms Instead of Layout Properties

\`\`\`javascript
// BAD: triggers layout recalculation (expensive)
element.style.left = x + 'px';
element.style.top = y + 'px';

// GOOD: only triggers compositing (GPU-accelerated, cheap)
element.style.transform = \`translate(\${x}px, \${y}px)\`;
\`\`\`

### Virtual Scrolling for Long Lists

\`\`\`javascript
// Instead of rendering 10,000 DOM nodes:
// Only render what's visible in the viewport (~20 items)
// Libraries: react-window, react-virtualized, tanstack-virtual

// Concept:
function VirtualList({ items, itemHeight, viewportHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(viewportHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: viewportHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i} style={{ height: itemHeight }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// 10,000 items but only ~20 DOM nodes at any time
\`\`\`

## 9. String Optimization

\`\`\`javascript
// BAD: string concatenation in loops creates many intermediate strings
let result = '';
for (let i = 0; i < 100000; i++) {
  result += 'item ' + i + ', '; // New string created each iteration
}

// GOOD: use array join
const parts = [];
for (let i = 0; i < 100000; i++) {
  parts.push(\`item \${i}\`);
}
const result = parts.join(', '); // Single string creation at the end

// GOOD: template literals for readability (same perf as concat for small strings)
const greeting = \`Hello, \${name}! You have \${count} messages.\`;
\`\`\`

## 10. Performance Measurement

### Using Performance API

\`\`\`javascript
// Measure specific operations
performance.mark('start-operation');
expensiveOperation();
performance.mark('end-operation');
performance.measure('operation-duration', 'start-operation', 'end-operation');

const measure = performance.getEntriesByName('operation-duration')[0];
console.log(\`Operation took: \${measure.duration.toFixed(2)}ms\`);
\`\`\`

### Quick Benchmarking Utility

\`\`\`javascript
function benchmark(name, fn, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const total = end - start;
  console.log(\`\${name}: \${total.toFixed(2)}ms total, \${(total / iterations).toFixed(4)}ms per call\`);
}

// Compare approaches
benchmark('Array.push', () => {
  const arr = [];
  for (let i = 0; i < 1000; i++) arr.push(i);
});

benchmark('Array prealloc', () => {
  const arr = new Array(1000);
  for (let i = 0; i < 1000; i++) arr[i] = i;
});
\`\`\`

## Performance Optimization Checklist

1. **Measure first** — profile before optimizing (don't guess bottlenecks)
2. **Minimize DOM access** — batch reads/writes, use fragments
3. **Debounce/throttle** — control event handler frequency
4. **Lazy load** — images, components, routes on demand
5. **Code split** — dynamic imports for heavy modules
6. **Use Web Workers** — offload CPU-heavy work
7. **Memoize** — cache expensive computations
8. **Virtualize** — render only visible items in long lists
9. **Use CSS transforms** — for animations (GPU-accelerated)
10. **Reduce network** — batch requests, abort stale ones, cache responses

## Key Takeaway

Performance optimization is about making smart trade-offs. Always measure first with DevTools Performance tab, identify the actual bottleneck, then apply targeted optimizations. The biggest wins usually come from reducing DOM manipulation, debouncing event handlers, lazy loading, and virtualizing long lists. Don't micro-optimize — focus on the changes that have measurable impact on user experience.`
            }
        ],
        order: 9,
        estimatedDuration: 60,
        difficulty: 'advanced',
        tags: ['javascript', 'memory', 'performance', 'stack', 'heap', 'garbage-collection', 'memory-leaks', 'weakmap', 'v8', 'optimization', 'debounce', 'throttle', 'lazy-loading']
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

        // Upsert lessons � create new ones, update existing ones
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
