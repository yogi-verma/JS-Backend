const vm = require('vm');

/**
 * Deep equality comparison for test case output validation.
 * Handles arrays, objects, primitives, null, undefined, NaN.
 */
function deepEqual(a, b) {
    // Handle identical references & primitives
    if (a === b) return true;

    // Handle NaN
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) return true;

    // Handle null/undefined
    if (a === null || b === null || a === undefined || b === undefined) return false;

    // Handle different types
    if (typeof a !== typeof b) return false;

    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    // One is array, other is not
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    // Handle objects
    if (typeof a === 'object') {
        const keysA = Object.keys(a).sort();
        const keysB = Object.keys(b).sort();
        if (keysA.length !== keysB.length) return false;
        for (let i = 0; i < keysA.length; i++) {
            if (keysA[i] !== keysB[i]) return false;
            if (!deepEqual(a[keysA[i]], b[keysB[i]])) return false;
        }
        return true;
    }

    return false;
}

/**
 * Safely serialize output for display.
 */
function serializeOutput(value) {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'function') return 'function';
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

/**
 * Execute user code against a set of test cases in a sandboxed VM.
 *
 * @param {string} userCode - The user's JavaScript code
 * @param {string} functionName - The function name the user must implement
 * @param {Array} testCases - Array of { input, expectedOutput, description, isHidden }
 * @param {number} timeoutMs - Timeout per test case in milliseconds (default 5000)
 * @returns {{ results: Array, allPassed: boolean, totalTests: number, passedTests: number, totalExecutionTime: number }}
 */
function executeCode(userCode, functionName, testCases, timeoutMs = 5000) {
    const results = [];
    let allPassed = true;
    let passedTests = 0;
    let totalExecutionTime = 0;

    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const startTime = process.hrtime.bigint();

        try {
            // Build the sandbox with minimal safe globals
            const sandbox = {
                console: {
                    log: () => {},
                    warn: () => {},
                    error: () => {}
                },
                parseInt,
                parseFloat,
                isNaN,
                isFinite,
                Math,
                Number,
                String,
                Boolean,
                Array,
                Object,
                JSON,
                Map,
                Set,
                WeakMap,
                WeakSet,
                Symbol,
                Promise,
                RegExp,
                Date,
                Error,
                TypeError,
                RangeError,
                SyntaxError,
                ReferenceError,
                Infinity,
                NaN,
                undefined
            };

            const context = vm.createContext(sandbox);

            // Serialize arguments for injection into the script
            const args = testCase.input.map(arg => JSON.stringify(arg)).join(', ');

            // Build the execution script
            const script = new vm.Script(`
                ${userCode}

                // Verify the function exists
                if (typeof ${functionName} !== 'function') {
                    throw new Error('Function "${functionName}" is not defined. Make sure you define the function correctly.');
                }

                __result__ = ${functionName}(${args});
            `, {
                filename: 'user-solution.js',
                timeout: timeoutMs
            });

            script.runInContext(context, { timeout: timeoutMs });

            const actualOutput = sandbox.__result__;
            const endTime = process.hrtime.bigint();
            const executionTime = Number(endTime - startTime) / 1e6; // ms
            totalExecutionTime += executionTime;

            const passed = deepEqual(actualOutput, testCase.expectedOutput);

            if (!passed) allPassed = false;
            else passedTests++;

            results.push({
                testCaseIndex: i,
                passed,
                actualOutput,
                expectedOutput: testCase.expectedOutput,
                description: testCase.description || `Test Case ${i + 1}`,
                executionTime: Math.round(executionTime * 100) / 100,
                error: null
            });
        } catch (error) {
            const endTime = process.hrtime.bigint();
            const executionTime = Number(endTime - startTime) / 1e6;
            totalExecutionTime += executionTime;

            allPassed = false;

            let errorMessage = error.message;
            let errorType = 'runtime_error';

            if (error.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') {
                errorMessage = `Time Limit Exceeded (${timeoutMs}ms). Your solution may contain an infinite loop or is too slow.`;
                errorType = 'time_limit_exceeded';
            } else if (error instanceof SyntaxError) {
                errorType = 'compilation_error';
                errorMessage = `Compilation Error: ${error.message}`;
            } else if (error instanceof ReferenceError) {
                errorType = 'runtime_error';
                errorMessage = `Runtime Error: ${error.message}`;
            } else if (error instanceof TypeError) {
                errorType = 'runtime_error';
                errorMessage = `Runtime Error: ${error.message}`;
            } else if (error instanceof RangeError) {
                errorType = 'runtime_error';
                errorMessage = `Runtime Error: ${error.message}`;
            }

            results.push({
                testCaseIndex: i,
                passed: false,
                actualOutput: null,
                expectedOutput: testCase.expectedOutput,
                description: testCase.description || `Test Case ${i + 1}`,
                executionTime: Math.round(executionTime * 100) / 100,
                error: errorMessage,
                errorType
            });
        }
    }

    return {
        results,
        allPassed,
        totalTests: testCases.length,
        passedTests,
        totalExecutionTime: Math.round(totalExecutionTime * 100) / 100
    };
}

/**
 * Validate that user code doesn't contain dangerous patterns.
 * Returns { safe: boolean, reason?: string }
 */
function validateCode(userCode) {
    const dangerousPatterns = [
        { pattern: /require\s*\(/, reason: 'Usage of require() is not allowed' },
        { pattern: /import\s+/, reason: 'Usage of import is not allowed' },
        { pattern: /process\./, reason: 'Access to process is not allowed' },
        { pattern: /child_process/, reason: 'Access to child_process is not allowed' },
        { pattern: /\beval\s*\(/, reason: 'Usage of eval() is not allowed' },
        { pattern: /Function\s*\(/, reason: 'Usage of Function constructor is not allowed' },
        { pattern: /global\b/, reason: 'Access to global object is not allowed' },
        { pattern: /globalThis\b/, reason: 'Access to globalThis is not allowed' },
        { pattern: /\bfs\b/, reason: 'File system access is not allowed' },
        { pattern: /\bhttp\b/, reason: 'Network access is not allowed' },
        { pattern: /\bnet\b/, reason: 'Network access is not allowed' },
        { pattern: /setTimeout|setInterval|setImmediate/, reason: 'Timer functions are not allowed in solutions' },
        { pattern: /while\s*\(\s*true\s*\)/, reason: 'Infinite loops are not allowed' },
        { pattern: /for\s*\(\s*;\s*;\s*\)/, reason: 'Infinite loops are not allowed' }
    ];

    for (const { pattern, reason } of dangerousPatterns) {
        if (pattern.test(userCode)) {
            return { safe: false, reason };
        }
    }

    // Check code length (max 10KB)
    if (userCode.length > 10240) {
        return { safe: false, reason: 'Code exceeds maximum allowed size (10KB)' };
    }

    return { safe: true };
}

module.exports = {
    executeCode,
    validateCode,
    deepEqual,
    serializeOutput
};
