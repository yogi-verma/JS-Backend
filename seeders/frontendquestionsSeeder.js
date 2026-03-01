const mongoose = require("mongoose");
const FrontendQuestion = require("../models/FrontendQuestion");
const logger = require("../logger");

const frontendQuestionsData = [
  // ==================== TYPESCRIPT (ADVANCED) ====================
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 1,
    question: "How does TypeScript's type system work?",
    answer:
      "1. TypeScript uses a static type system — all type checking happens at compile time, not at runtime.\n2. It uses structural typing (duck typing) — compatibility is based on the shape of data, not the declared type name.\n3. Supports gradual typing — you can mix typed and untyped code, adopting types incrementally.\n4. Type inference automatically deduces types from assigned values, so you don't need to annotate everything manually.\n5. All type information is erased at runtime — the compiled JavaScript output contains zero type annotations.\n6. Structural typing means if an object has at least the required properties, it's compatible even if created elsewhere.\n7. Supports advanced features like union types, intersection types, generics, conditional types, and mapped types.\n8. The compiler (tsc) catches type mismatches, missing properties, and incorrect function signatures before code ever runs.",
    codingExamples: [
      {
        title: "Structural Typing — Shape-Based Compatibility",
        code: `type User = {\n  name: string;\n};\n\nconst person = {\n  name: "John",\n  age: 25,\n  email: "john@test.com"\n};\n\nconst user: User = person; // ✅ Allowed\n// person has at least { name: string }\n\n// But direct assignment catches extras:\n// const user2: User = { name: "John", age: 25 }; // ❌ Error`,
        explanation:
          "TypeScript checks structure, not identity. person has name (string) which satisfies User's shape. Extra properties are allowed when assigning from a variable, but caught in direct object literals — this is called excess property checking.",
      },
      {
        title: "Type Inference in Action",
        code: `// TypeScript infers types automatically\nlet count = 10;          // inferred: number\nlet name = "Alice";      // inferred: string\nlet active = true;       // inferred: boolean\n\n// Function return type inferred\nfunction add(a: number, b: number) {\n  return a + b;          // inferred return: number\n}\n\n// Array inference\nconst items = [1, 2, 3]; // inferred: number[]\n\n// Object inference\nconst user = {\n  name: "John",          // inferred: { name: string; age: number }\n  age: 25\n};`,
        explanation:
          "You rarely need explicit type annotations for variables. TypeScript infers the type from the initial value. Function return types are inferred from the return statement. This keeps code clean while maintaining full type safety.",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 2,
    question: "What are generics and real-world use cases?",
    answer:
      "1. Generics let you create reusable, type-safe components and functions that work with multiple types while preserving type information.\n2. They use type parameters (like <T>) that act as placeholders — filled in when the function or type is used.\n3. Generic constraints (extends) restrict what types are allowed, ensuring the generic has required properties.\n4. Real-world use cases include API response wrappers, reusable list/table components, utility functions, and state management.\n5. Without generics, you'd use 'any' and lose all type safety, or duplicate code for every type variant.\n6. TypeScript can often infer generic types from arguments, so you don't always need to specify them explicitly.\n7. Generics work with functions, interfaces, classes, and type aliases — they're the foundation of reusable TypeScript code.\n8. Built-in generics include Array<T>, Promise<T>, Map<K, V>, Record<K, V>, and all utility types like Partial<T>.",
    codingExamples: [
      {
        title: "Generic API Response Wrapper",
        code: `type ApiResponse<T> = {\n  data: T;\n  success: boolean;\n  error?: string;\n};\n\ntype User = { id: number; name: string };\ntype Product = { id: number; price: number };\n\n// Same wrapper, different data types\nconst userRes: ApiResponse<User> = {\n  data: { id: 1, name: "John" },\n  success: true\n};\n\nconst productRes: ApiResponse<Product> = {\n  data: { id: 1, price: 29.99 },\n  success: true\n};\n\n// Generic fetch function\nasync function fetchApi<T>(url: string): Promise<ApiResponse<T>> {\n  const res = await fetch(url);\n  return res.json();\n}`,
        explanation:
          "ApiResponse<T> is written once but works with any data type. When used as ApiResponse<User>, TypeScript knows data is exactly { id: number; name: string }. The fetchApi function returns properly typed responses without any code duplication.",
      },
      {
        title: "Generic Constraints",
        code: `// Constraint: T must have a length property\nfunction getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}\n\ngetLength("hello");     // ✅ string has length\ngetLength([1, 2, 3]);   // ✅ array has length\ngetLength({ length: 5 }); // ✅ has length\n// getLength(123);       // ❌ number has no length\n\n// Constraint with keyof\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { name: "John", age: 25 };\ngetProperty(user, "name"); // ✅ returns string\n// getProperty(user, "email"); // ❌ "email" not in keyof User`,
        explanation:
          "extends constrains what T can be. The first function only accepts types with a length property. getProperty uses keyof T to ensure the key actually exists on the object — TypeScript even infers the correct return type (string for 'name', number for 'age').",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 3,
    question: "What is the difference between interface and type?",
    answer:
      "1. interface defines object shapes and supports declaration merging — multiple declarations with the same name are automatically combined.\n2. type is more versatile — it can alias primitives, unions, tuples, intersections, and computed types.\n3. Both support extending: interface uses 'extends', type uses intersection (&) — functionally equivalent for objects.\n4. Only interface supports declaration merging, which is essential for augmenting third-party library types.\n5. Only type supports union types (A | B), mapped types, conditional types, and template literal types.\n6. For public APIs and library definitions, interface is preferred because consumers can extend it via merging.\n7. For complex type operations (unions, discriminated unions, utility types), type is the only option.\n8. Rule of thumb: use interface for object shapes and public contracts, use type for everything else (unions, primitives, advanced types).",
    codingExamples: [
      {
        title: "Declaration Merging (Interface Only)",
        code: `// Interface — declaration merging ✅\ninterface User {\n  name: string;\n}\n\ninterface User {\n  age: number;\n}\n\n// Merged into: { name: string; age: number }\nconst user: User = { name: "John", age: 25 }; // ✅\n\n// Type — no merging ❌\ntype Product = {\n  name: string;\n};\n\n// type Product = { price: number }; // ❌ Duplicate identifier\n\n// Real use: augmenting library types\ninterface Window {\n  myApp: { version: string };\n}`,
        explanation:
          "Declaring interface User twice merges both into one type. This is impossible with type — redeclaring gives an error. Declaration merging is critical for extending third-party types like Window, Express.Request, or library definitions.",
      },
      {
        title: "Union & Advanced Types (Type Only)",
        code: `// Union types — only with type\ntype Status = "loading" | "success" | "error";\ntype ID = string | number;\n\n// Discriminated union\ntype Result =\n  | { status: "success"; data: string }\n  | { status: "error"; message: string };\n\nfunction handle(result: Result) {\n  if (result.status === "success") {\n    console.log(result.data);    // TS knows data exists\n  } else {\n    console.log(result.message); // TS knows message exists\n  }\n}\n\n// Extending objects — both work\ninterface Animal { name: string; }\ninterface Dog extends Animal { breed: string; }\n\ntype AnimalT = { name: string };\ntype DogT = AnimalT & { breed: string };`,
        explanation:
          "Union types, literal types, and discriminated unions only work with type. For object extension, both interface (extends) and type (&) produce the same result. The discriminated union pattern enables TypeScript to narrow types based on a shared discriminant field.",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 4,
    question: "What are conditional types?",
    answer:
      "1. Conditional types choose between two types based on a condition — syntax: T extends U ? X : Y.\n2. They work like ternary operators but at the type level, enabling dynamic type logic at compile time.\n3. The 'infer' keyword extracts types from within a pattern — used to pull out return types, parameter types, etc.\n4. Conditional types distribute over unions — IsString<string | number> becomes IsString<string> | IsString<number>.\n5. Built-in utility types like ReturnType<T>, Parameters<T>, and Extract<T, U> are all conditional types internally.\n6. They enable writing type-level functions that transform types based on their structure.\n7. Combined with generics, they create powerful type utilities for validation, extraction, and transformation.\n8. Use cases include API response typing, event handler inference, recursive type unwrapping, and form validation types.",
    codingExamples: [
      {
        title: "Basic Conditional Type with Infer",
        code: `// Basic conditional type\ntype IsString<T> = T extends string ? "yes" : "no";\n\ntype A = IsString<string>;  // "yes"\ntype B = IsString<number>;  // "no"\ntype C = IsString<"hello">; // "yes"\n\n// Using infer to extract types\ntype GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\ntype Fn1 = () => string;\ntype Fn2 = (x: number) => boolean;\n\ntype R1 = GetReturnType<Fn1>; // string\ntype R2 = GetReturnType<Fn2>; // boolean\ntype R3 = GetReturnType<number>; // never`,
        explanation:
          "IsString checks if T is assignable to string. infer R captures whatever the return type is — if T matches a function shape, R is extracted; otherwise it falls through to never. This is exactly how TypeScript's built-in ReturnType<T> works.",
      },
      {
        title: "Distributive Conditional Types",
        code: `// Distributive: applies to each union member\ntype ToArray<T> = T extends any ? T[] : never;\n\ntype Result = ToArray<string | number>;\n// = string[] | number[]  (NOT (string | number)[])\n\n// Non-distributive: wrap in tuple\ntype ToArrayND<T> = [T] extends [any] ? T[] : never;\ntype Result2 = ToArrayND<string | number>;\n// = (string | number)[]\n\n// Practical: extract only string keys\ntype StringKeys<T> = {\n  [K in keyof T]: T[K] extends string ? K : never;\n}[keyof T];\n\ntype User = { name: string; age: number; email: string };\ntype Keys = StringKeys<User>; // "name" | "email"`,
        explanation:
          "When a conditional type receives a union, it distributes — applying the condition to each member separately. Wrapping in a tuple prevents distribution. StringKeys iterates object keys and keeps only those whose values are strings — a common pattern for filtering types.",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 5,
    question: "What are mapped types?",
    answer:
      "1. Mapped types transform existing types by iterating over their keys using the [K in keyof T] syntax.\n2. They create new types by applying modifications to each property — adding readonly, making optional, changing value types, etc.\n3. Built-in utility types (Partial, Required, Readonly, Pick, Omit, Record) are all mapped types internally.\n4. The keyof operator extracts all property names as a union of string literals, which mapped types iterate over.\n5. You can add (+) or remove (-) modifiers: -readonly removes readonly, -? makes properties required.\n6. Template literal types combine with mapped types to create transformed key names (e.g., prefixing with 'get').\n7. Mapped types with 'as' clause enable key renaming and filtering during iteration.\n8. They eliminate boilerplate — instead of manually creating Readonly/Partial variants, one mapped type generates them automatically.",
    codingExamples: [
      {
        title: "Custom Mapped Types",
        code: `type User = {\n  name: string;\n  age: number;\n  email: string;\n};\n\n// Make all properties readonly\ntype ReadonlyUser = {\n  readonly [K in keyof User]: User[K];\n};\n// { readonly name: string; readonly age: number; readonly email: string }\n\n// Make all properties optional\ntype PartialUser = {\n  [K in keyof User]?: User[K];\n};\n\n// Make all properties nullable\ntype NullableUser = {\n  [K in keyof User]: User[K] | null;\n};\n\n// Generic version — works with any type\ntype MyReadonly<T> = {\n  readonly [K in keyof T]: T[K];\n};`,
        explanation:
          "keyof User produces 'name' | 'age' | 'email'. The mapped type iterates each key K and creates a new property with the same value type User[K]. Adding readonly or ? modifies every property uniformly. The generic version works with any type — this is exactly how TypeScript's built-in Readonly<T> is implemented.",
      },
      {
        title: "Key Remapping with As Clause",
        code: `type User = {\n  name: string;\n  age: number;\n  email: string;\n};\n\n// Create getters for each property\ntype Getters<T> = {\n  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];\n};\n\ntype UserGetters = Getters<User>;\n// {\n//   getName: () => string;\n//   getAge: () => number;\n//   getEmail: () => string;\n// }\n\n// Filter: keep only string properties\ntype StringOnly<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K];\n};\n\ntype StringFields = StringOnly<User>;\n// { name: string; email: string }`,
        explanation:
          "The 'as' clause remaps keys during iteration. Capitalize transforms 'name' to 'Name', and template literals prepend 'get'. For filtering, mapping a key to 'never' removes it from the result. These two patterns — renaming and filtering — are the most powerful applications of mapped types.",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 6,
    question: "How does type narrowing work?",
    answer:
      "1. Type narrowing reduces a broad union type into a more specific type using runtime checks that TypeScript can analyze.\n2. typeof guards narrow primitives — typeof x === 'string' tells TypeScript x is definitely a string in that branch.\n3. The 'in' operator narrows by property existence — 'bark' in animal proves it's a Dog, not a Cat.\n4. instanceof narrows class instances — error instanceof TypeError confirms it's a TypeError.\n5. Equality checks (===, !==, switch) narrow literal types and eliminate null/undefined.\n6. Custom type guards (function isX(val): val is Type) let you write reusable narrowing logic for complex checks.\n7. Discriminated unions use a shared literal field (kind, type, status) — switching on it narrows the entire object.\n8. TypeScript's control flow analysis tracks narrowing through if/else, switch, ternaries, and even early returns and throws.",
    codingExamples: [
      {
        title: "Multiple Narrowing Techniques",
        code: `function process(value: string | number | null) {\n  // Truthiness narrowing — eliminates null\n  if (!value) return;\n  // value: string | number\n\n  // typeof narrowing\n  if (typeof value === "string") {\n    console.log(value.toUpperCase()); // TS knows: string\n  } else {\n    console.log(value.toFixed(2));    // TS knows: number\n  }\n}\n\n// 'in' operator narrowing\ntype Dog = { bark: () => void; name: string };\ntype Cat = { meow: () => void; name: string };\n\nfunction speak(animal: Dog | Cat) {\n  if ("bark" in animal) {\n    animal.bark();  // TS knows: Dog\n  } else {\n    animal.meow();  // TS knows: Cat\n  }\n}`,
        explanation:
          "Each check narrows the type in its branch. Truthiness check removes null. typeof separates string from number. The 'in' operator checks property existence to distinguish between Dog and Cat. TypeScript tracks all of this through control flow analysis.",
      },
      {
        title: "Custom Type Guard & Discriminated Union",
        code: `// Custom type guard\nfunction isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nfunction format(input: unknown) {\n  if (isString(input)) {\n    console.log(input.toUpperCase()); // TS knows: string\n  }\n}\n\n// Discriminated union\ntype Result =\n  | { status: "success"; data: string }\n  | { status: "error"; message: string }\n  | { status: "loading" };\n\nfunction handle(result: Result) {\n  switch (result.status) {\n    case "success":\n      console.log(result.data);    // TS knows data exists\n      break;\n    case "error":\n      console.log(result.message); // TS knows message exists\n      break;\n    case "loading":\n      console.log("Loading...");   // no extra fields\n      break;\n  }\n}`,
        explanation:
          "The 'value is string' return type makes isString a type guard — when it returns true, TypeScript narrows the variable in the calling scope. Discriminated unions use a shared literal field (status) — switching on it narrows the entire object shape per case.",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 7,
    question: "How do you type complex React components?",
    answer:
      "1. Define explicit prop types using type or interface — never rely on implicit any for component props.\n2. Use React.ReactNode for children that can be any renderable content (string, JSX, arrays, null).\n3. Generic components (List<T>, Table<T>) preserve item types through the component — essential for reusable data components.\n4. React.forwardRef requires two type params: the ref element type and the props type — forwardRef<HTMLInputElement, Props>.\n5. Event handlers use React.MouseEvent<HTMLButtonElement>, React.ChangeEvent<HTMLInputElement>, etc. for proper typing.\n6. Discriminated union props model mutually exclusive variants — e.g., a Button that's either 'link' with href or 'button' with onClick.\n7. React.ComponentProps<typeof Component> extracts props from existing components for composition or wrapping.\n8. Use React.FC sparingly in modern React — prefer direct function declarations with typed props for simpler, more explicit code.",
    codingExamples: [
      {
        title: "Generic Component with Typed Events",
        code: `type ListProps<T> = {\n  items: T[];\n  renderItem: (item: T) => React.ReactNode;\n  onSelect?: (item: T) => void;\n};\n\nfunction List<T>({ items, renderItem, onSelect }: ListProps<T>) {\n  return (\n    <ul>\n      {items.map((item, i) => (\n        <li key={i} onClick={() => onSelect?.(item)}>\n          {renderItem(item)}\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// Usage — T is inferred as User\ntype User = { id: number; name: string };\n<List\n  items={users}\n  renderItem={(user) => <span>{user.name}</span>}\n  onSelect={(user) => console.log(user.id)}\n/>`,
        explanation:
          "List<T> is generic — when items is User[], TypeScript infers T as User throughout. renderItem receives User, onSelect receives User. No type assertions needed. This pattern is essential for reusable data display components like lists, tables, and dropdowns.",
      },
      {
        title: "ForwardRef & Discriminated Union Props",
        code: `// ForwardRef with types\ntype InputProps = {\n  label: string;\n  error?: string;\n} & React.InputHTMLAttributes<HTMLInputElement>;\n\nconst Input = React.forwardRef<HTMLInputElement, InputProps>(\n  ({ label, error, ...rest }, ref) => (\n    <div>\n      <label>{label}</label>\n      <input ref={ref} {...rest} />\n      {error && <span>{error}</span>}\n    </div>\n  )\n);\n\n// Discriminated union props\ntype ButtonProps =\n  | { variant: "link"; href: string; onClick?: never }\n  | { variant: "button"; onClick: () => void; href?: never };\n\nfunction ActionButton(props: ButtonProps) {\n  if (props.variant === "link") {\n    return <a href={props.href}>Link</a>;\n  }\n  return <button onClick={props.onClick}>Click</button>;\n}`,
        explanation:
          "forwardRef takes <RefElement, Props> — this gives proper typing for both the ref and the spread props. The discriminated union ensures you can't pass href to a button variant or onClick to a link variant — TypeScript enforces mutual exclusivity at compile time.",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 8,
    question: "How do declaration files (.d.ts) work?",
    answer:
      "1. Declaration files (.d.ts) describe the types and shapes of existing JavaScript code without containing any implementation.\n2. They let TypeScript understand untyped JS libraries — providing autocomplete, type checking, and documentation.\n3. DefinitelyTyped (@types/*) is the community repository with .d.ts files for thousands of npm packages.\n4. The 'declare' keyword tells TypeScript something exists at runtime without providing implementation code.\n5. 'declare module' creates type definitions for entire modules — used for untyped third-party packages.\n6. 'declare global' augments global types like Window, NodeJS.Process, or adding custom properties.\n7. TypeScript generates .d.ts files automatically from .ts source when declaration: true is set in tsconfig.\n8. Triple-slash directives (/// <reference types=\"...\" />) and typeRoots in tsconfig control which declarations are included.",
    codingExamples: [
      {
        title: "Declaring Module & Global Types",
        code: `// types/my-library.d.ts\ndeclare module "my-untyped-library" {\n  export function calculate(x: number, y: number): number;\n  export function format(value: string): string;\n  export interface Config {\n    apiKey: string;\n    timeout?: number;\n  }\n  export default function init(config: Config): void;\n}\n\n// types/global.d.ts\ndeclare global {\n  interface Window {\n    myApp: {\n      version: string;\n      env: "dev" | "prod";\n    };\n  }\n}\n\nexport {}; // makes this a module\n\n// Now TypeScript knows:\nimport init, { calculate } from "my-untyped-library";\nconsole.log(window.myApp.version);`,
        explanation:
          "declare module provides types for a package that has no built-in TypeScript support. declare global augments existing global interfaces like Window. The empty export {} is required to make the file a module so declare global works. After these declarations, imports and globals are fully typed.",
      },
      {
        title: "Auto-Generated Declarations",
        code: `// src/utils.ts (source file)\nexport function add(a: number, b: number): number {\n  return a + b;\n}\n\nexport interface User {\n  id: number;\n  name: string;\n}\n\nexport type Status = "active" | "inactive";\n\n// dist/utils.d.ts (auto-generated with declaration: true)\nexport declare function add(a: number, b: number): number;\n\nexport interface User {\n  id: number;\n  name: string;\n}\n\nexport type Status = "active" | "inactive";\n\n// tsconfig.json\n// {\n//   "compilerOptions": {\n//     "declaration": true,\n//     "outDir": "./dist"\n//   }\n// }`,
        explanation:
          "With declaration: true in tsconfig, TypeScript strips implementation and generates .d.ts files alongside .js output. The function body is removed, leaving only the signature. This is how npm packages ship types — consumers get type safety without needing the source TypeScript files.",
      },
    ],
  },
  {
    category: "TYPESCRIPT (ADVANCED)",
    order: 9,
    question: "How do you safely handle any and unknown?",
    answer:
      "1. 'any' completely disables type checking — TypeScript treats it as compatible with every type, bypassing all safety.\n2. 'unknown' is the type-safe counterpart of any — it accepts any value but requires narrowing before you can use it.\n3. With any, you can call methods, access properties, and assign to typed variables without errors — silent bugs at runtime.\n4. With unknown, TypeScript forces you to check the type first (typeof, instanceof, type guard) before any operation.\n5. Use unknown for values from external sources — API responses, JSON.parse, user input, third-party libraries.\n6. Use ESLint rules (@typescript-eslint/no-explicit-any) to prevent any from creeping into the codebase.\n7. Type assertions (value as Type) should be a last resort — they override the compiler and can mask real bugs.\n8. The migration path from any to unknown is: replace any → add type guards at usage sites → let TypeScript verify correctness.",
    codingExamples: [
      {
        title: "any vs unknown — Safety Comparison",
        code: `// any — no safety at all ❌\nlet dangerous: any = "hello";\ndangerous.toUpperCase(); // ✅ No error\ndangerous.foo.bar.baz;   // ✅ No error (crashes at runtime!)\nconst num: number = dangerous; // ✅ No error\n\n// unknown — requires narrowing ✅\nlet safe: unknown = "hello";\n// safe.toUpperCase();    // ❌ Error: Object is of type 'unknown'\n// safe.foo;              // ❌ Error\n// const num: number = safe; // ❌ Error\n\n// Must narrow first\nif (typeof safe === "string") {\n  safe.toUpperCase();    // ✅ TypeScript knows it's string\n}\n\nif (safe instanceof Error) {\n  console.log(safe.message); // ✅ TypeScript knows it's Error\n}`,
        explanation:
          "any lets you do anything — TypeScript won't catch bugs even if the code will crash at runtime. unknown blocks all operations until you prove the type with a runtime check. This is why unknown should always be preferred — it forces safe code while still accepting any input value.",
      },
      {
        title: "Safe JSON Parsing with Type Guards",
        code: `// Unsafe approach with any ❌\nfunction parseUnsafe(json: string): any {\n  return JSON.parse(json);\n}\nconst data = parseUnsafe('{}');\ndata.user.name; // No error, crashes at runtime!\n\n// Safe approach with unknown ✅\ntype User = { id: number; name: string };\n\nfunction isUser(value: unknown): value is User {\n  return (\n    typeof value === "object" &&\n    value !== null &&\n    "id" in value &&\n    "name" in value &&\n    typeof (value as User).id === "number" &&\n    typeof (value as User).name === "string"\n  );\n}\n\nfunction parseSafe(json: string): unknown {\n  return JSON.parse(json);\n}\n\nconst result = parseSafe('{"id": 1, "name": "John"}');\nif (isUser(result)) {\n  console.log(result.name); // ✅ Safely typed as User\n}`,
        explanation:
          "The unsafe version returns any — null.user.name compiles fine but crashes. The safe version returns unknown and uses a custom type guard (isUser) to validate the shape at runtime. Only after the guard passes does TypeScript allow accessing User properties. This pattern is essential for API responses and deserialized data.",
      },
    ],
  },
];

const seedFrontendQuestions = async () => {
  try {
    logger.info("Starting frontend questions seeder...");

    let createdCount = 0;
    let updatedCount = 0;

    for (const questionData of frontendQuestionsData) {
      const existingQuestion = await FrontendQuestion.findOne({
        category: questionData.category,
        order: questionData.order,
      });

      if (existingQuestion) {
        Object.assign(existingQuestion, questionData);
        await existingQuestion.save();
        updatedCount++;
        logger.info(
          `Updated [${questionData.category}] Q${questionData.order}: "${questionData.question.substring(0, 50)}..."`,
        );
      } else {
        const newQuestion = new FrontendQuestion(questionData);
        await newQuestion.save();
        createdCount++;
        logger.info(
          `Created [${questionData.category}] Q${questionData.order}: "${questionData.question.substring(0, 50)}..."`,
        );
      }
    }

    logger.info(
      `Frontend questions seeding complete! Created: ${createdCount}, Updated: ${updatedCount}`,
    );
    return { createdCount, updatedCount };
  } catch (error) {
    logger.error("Error seeding frontend questions:", error);
    throw error;
  }
};

// Run directly if executed as a script
if (require.main === module) {
  require("dotenv").config();

  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      logger.info("Connected to MongoDB for seeding");
      await seedFrontendQuestions();
      await mongoose.disconnect();
      logger.info("Disconnected from MongoDB");
      process.exit(0);
    })
    .catch((err) => {
      logger.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

module.exports = seedFrontendQuestions;
