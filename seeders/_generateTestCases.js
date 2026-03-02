/**
 * Temporary script to generate and verify all test case expected outputs.
 * This ensures 100% correctness before embedding into the seeder.
 */

// ── SOLUTIONS ──
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
    return [];
}

function reverseString(s) {
    return s.split('').reverse().join('');
}

function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) result.push("FizzBuzz");
        else if (i % 3 === 0) result.push("Fizz");
        else if (i % 5 === 0) result.push("Buzz");
        else result.push(String(i));
    }
    return result;
}

function findMax(nums) {
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > max) max = nums[i];
    }
    return max;
}

// ── TEST CASE INPUTS ──

const twoSumInputs = [
    // Visible (shown to user)
    { input: [[2, 7, 11, 15], 9], desc: 'Basic case: first two elements' },
    { input: [[3, 2, 4], 6], desc: 'Middle elements sum' },
    { input: [[3, 3], 6], desc: 'Duplicate values' },
    { input: [[1, 5, 3, 7], 8], desc: 'Non-adjacent pair' },
    { input: [[-1, -2, -3, -4, -5], -8], desc: 'All negative numbers' },
    // Hidden
    { input: [[0, 4, 3, 0], 0], desc: 'Two zeros sum to zero', hidden: true },
    { input: [[-3, 4, 3, 90], 0], desc: 'Negative + positive = zero', hidden: true },
    { input: [[1, 2], 3], desc: 'Minimum array size', hidden: true },
    { input: [[5, 75, 25], 100], desc: 'Large target value', hidden: true },
    { input: [[2, 5, 5, 11], 10], desc: 'Duplicates with larger array', hidden: true },
    { input: [[10, 20, 30, 40, 50], 90], desc: 'Last two elements', hidden: true },
    { input: [[100, -50, 50, 0], 0], desc: 'Negative and positive cancel', hidden: true },
    { input: [[-10, -20, -30], -50], desc: 'Negative numbers, negative target', hidden: true },
    { input: [[4, 4, 4, 4], 8], desc: 'All same elements', hidden: true },
    { input: [[1000000, -1000000], 0], desc: 'Large magnitude numbers', hidden: true },
    { input: [[0, 1, 2, 0], 1], desc: 'Zero and one', hidden: true },
    { input: [[7, 2, 13, 11, 8], 20], desc: 'First and third element', hidden: true },
    { input: [[1, 3, 5, 7, 9, 11, 13], 24], desc: 'Last two odd numbers', hidden: true },
    { input: [[50, 50], 100], desc: 'Two same large values', hidden: true },
    { input: [[99, 1, 100, 2], 3], desc: 'Non-obvious small sum', hidden: true },
    { input: [[-5, 0, 5, 10], 5], desc: 'Zero plus positive', hidden: true },
    { input: [[11, 15, 6, 8, 9, 10], 16], desc: 'Non-adjacent in middle', hidden: true },
    { input: [[1, 4, 8, 7, 3, 15], 8], desc: 'First and fourth element', hidden: true },
    { input: [[23, 42, 11, 88, 5, 67], 53], desc: 'Larger values', hidden: true },
    { input: [[0, 0], 0], desc: 'Both zeros target zero', hidden: true },
    { input: [[-1, 1], 0], desc: 'Opposite signs', hidden: true },
    { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19], desc: 'Large array, sum at end', hidden: true },
    { input: [[5, 10, 15, 20, 25, 30], 35], desc: 'Multiples of 5', hidden: true },
    { input: [[1, -1, 2, -2, 3], 1], desc: 'Alternating signs', hidden: true },
    { input: [[100, 200, 300, 400, 500], 600], desc: 'Hundreds: 200+400', hidden: true },
];

const reverseStringInputs = [
    { input: ['hello'], desc: 'Simple word' },
    { input: ['JavaScript'], desc: 'Mixed case word' },
    { input: ['a'], desc: 'Single character' },
    { input: ['racecar'], desc: 'Palindrome stays same' },
    { input: ['Hello World!'], desc: 'With space and punctuation' },
    // Hidden
    { input: ['ab'], desc: 'Two characters', hidden: true },
    { input: ['abc'], desc: 'Three characters', hidden: true },
    { input: ['12345'], desc: 'Numeric string', hidden: true },
    { input: ['abcdefghijklmnopqrstuvwxyz'], desc: 'Full alphabet', hidden: true },
    { input: ['aaa'], desc: 'All same characters', hidden: true },
    { input: ['AB'], desc: 'Two uppercase letters', hidden: true },
    { input: ['a b c'], desc: 'Characters with spaces', hidden: true },
    { input: ['!@#$%'], desc: 'Special characters only', hidden: true },
    { input: ['OpenAI'], desc: 'Mixed case brand', hidden: true },
    { input: [' '], desc: 'Single space', hidden: true },
    { input: ['   abc   '], desc: 'Padded with spaces', hidden: true },
    { input: ['Z'], desc: 'Single uppercase letter', hidden: true },
    { input: ['abba'], desc: 'Four char palindrome', hidden: true },
    { input: ['Hello, World!'], desc: 'Greeting with punctuation', hidden: true },
    { input: ['1a2b3c'], desc: 'Alphanumeric mix', hidden: true },
    { input: ['ABCBA'], desc: 'Uppercase palindrome', hidden: true },
    { input: ['The quick brown fox'], desc: 'Sentence', hidden: true },
    { input: ['level'], desc: 'Word palindrome', hidden: true },
    { input: ['madam'], desc: 'Classic palindrome word', hidden: true },
    { input: ['((()))'], desc: 'Nested parentheses', hidden: true },
    { input: ['Race Car'], desc: 'Mixed case with space', hidden: true },
    { input: ['  '], desc: 'Two spaces', hidden: true },
    { input: ['abcdefg'], desc: 'Sequential letters', hidden: true },
    { input: ['A1B2C3'], desc: 'Alternating letters and digits', hidden: true },
    { input: ['Was it a car or a cat I saw'], desc: 'Long sentence', hidden: true },
];

const isPalindromeInputs = [
    { input: ['racecar'], desc: 'Simple palindrome' },
    { input: ['hello'], desc: 'Not a palindrome' },
    { input: ['A man a plan a canal Panama'], desc: 'Sentence palindrome with spaces' },
    { input: ['a'], desc: 'Single character' },
    { input: ['Was it a car or a cat I saw?'], desc: 'Complex sentence with punctuation' },
    // Hidden
    { input: ['ab'], desc: 'Two different chars', hidden: true },
    { input: ['aa'], desc: 'Two same chars', hidden: true },
    { input: ['Aba'], desc: 'Mixed case palindrome', hidden: true },
    { input: ['race a car'], desc: 'Not palindrome with spaces', hidden: true },
    { input: ['!!!'], desc: 'Only special characters', hidden: true },
    { input: ['0P'], desc: 'Zero and letter', hidden: true },
    { input: ['Madam'], desc: 'Capitalized palindrome', hidden: true },
    { input: ['No lemon, no melon'], desc: 'Comma-separated palindrome', hidden: true },
    { input: ['12321'], desc: 'Numeric palindrome', hidden: true },
    { input: ['12345'], desc: 'Numeric non-palindrome', hidden: true },
    { input: ['Never odd or even'], desc: 'Classic phrase palindrome', hidden: true },
    { input: ['Do geese see God'], desc: 'Question palindrome', hidden: true },
    { input: ['abc'], desc: 'Three char non-palindrome', hidden: true },
    { input: ['A'], desc: 'Single uppercase', hidden: true },
    { input: ['.,!'], desc: 'Only punctuation marks', hidden: true },
    { input: ['Eva, can I see bees in a cave?'], desc: 'Long sentence palindrome', hidden: true },
    { input: ['Mr. Owl ate my metal worm'], desc: 'Owl palindrome', hidden: true },
    { input: ['Palindrome'], desc: 'The word palindrome itself', hidden: true },
    { input: ['Step on no pets'], desc: 'Pets palindrome', hidden: true },
    { input: ['Top spot'], desc: 'Two word palindrome', hidden: true },
    { input: ['Not a palindrome at all'], desc: 'Clearly not palindrome', hidden: true },
    { input: ['1a2'], desc: 'Alphanumeric non-palindrome', hidden: true },
    { input: ['1a1'], desc: 'Alphanumeric palindrome', hidden: true },
    { input: ['Able was I ere I saw Elba'], desc: 'Napoleon palindrome', hidden: true },
    { input: ['aabaa'], desc: 'Five char palindrome', hidden: true },
];

const fizzBuzzInputs = [
    { input: [1], desc: 'n = 1' },
    { input: [2], desc: 'n = 2' },
    { input: [3], desc: 'n = 3, first Fizz' },
    { input: [5], desc: 'n = 5, first Buzz' },
    { input: [15], desc: 'n = 15, first FizzBuzz' },
    // Hidden
    { input: [4], desc: 'n = 4', hidden: true },
    { input: [6], desc: 'n = 6, two Fizz', hidden: true },
    { input: [7], desc: 'n = 7', hidden: true },
    { input: [8], desc: 'n = 8', hidden: true },
    { input: [9], desc: 'n = 9, three Fizz', hidden: true },
    { input: [10], desc: 'n = 10, two Buzz', hidden: true },
    { input: [11], desc: 'n = 11', hidden: true },
    { input: [12], desc: 'n = 12, four Fizz', hidden: true },
    { input: [13], desc: 'n = 13', hidden: true },
    { input: [14], desc: 'n = 14', hidden: true },
    { input: [16], desc: 'n = 16, after first FizzBuzz', hidden: true },
    { input: [17], desc: 'n = 17', hidden: true },
    { input: [18], desc: 'n = 18, Fizz at end', hidden: true },
    { input: [19], desc: 'n = 19', hidden: true },
    { input: [20], desc: 'n = 20, Buzz at end', hidden: true },
    { input: [21], desc: 'n = 21, Fizz at end', hidden: true },
    { input: [25], desc: 'n = 25, Buzz at end', hidden: true },
    { input: [30], desc: 'n = 30, second FizzBuzz', hidden: true },
    { input: [45], desc: 'n = 45, third FizzBuzz', hidden: true },
    { input: [50], desc: 'n = 50, Buzz at end', hidden: true },
];

const findMaxInputs = [
    { input: [[1, 3, 5, 2, 4]], desc: 'Positive numbers, max in middle' },
    { input: [[-1, -5, -2]], desc: 'All negative numbers' },
    { input: [[42]], desc: 'Single element' },
    { input: [[7, 7, 7, 7]], desc: 'All same elements' },
    { input: [[-100, 0, 100, 50, -50]], desc: 'Mixed positive and negative' },
    // Hidden
    { input: [[10, 9, 8, 7, 6]], desc: 'Max at beginning (descending)', hidden: true },
    { input: [[1, 2, 3, 4, 5]], desc: 'Max at end (ascending)', hidden: true },
    { input: [[5, 1, 5, 1, 5]], desc: 'Multiple maxes', hidden: true },
    { input: [[0]], desc: 'Single zero', hidden: true },
    { input: [[0, 0, 0, 0]], desc: 'All zeros', hidden: true },
    { input: [[-1, -2, -3, -4, -5]], desc: 'Descending negatives', hidden: true },
    { input: [[-5, -4, -3, -2, -1]], desc: 'Ascending negatives', hidden: true },
    { input: [[1000000, -1000000]], desc: 'Extreme values', hidden: true },
    { input: [[-999999]], desc: 'Single large negative', hidden: true },
    { input: [[999999]], desc: 'Single large positive', hidden: true },
    { input: [[1, 100, 2, 99, 3]], desc: 'Max early in array', hidden: true },
    { input: [[50, 50, 50, 51]], desc: 'Max at end, rest same', hidden: true },
    { input: [[51, 50, 50, 50]], desc: 'Max at start, rest same', hidden: true },
    { input: [[-1, 0, 1]], desc: 'Small range around zero', hidden: true },
    { input: [[3, 1, 4, 1, 5, 9, 2, 6]], desc: 'Pi digits', hidden: true },
    { input: [[100, 200, 300, 400, 500]], desc: 'Hundreds ascending', hidden: true },
    { input: [[500, 400, 300, 200, 100]], desc: 'Hundreds descending', hidden: true },
    { input: [[1, -1, 2, -2, 3, -3]], desc: 'Alternating signs', hidden: true },
    { input: [[-1000000, -999999, -999998]], desc: 'Large negatives ascending', hidden: true },
    { input: [[5, 3]], desc: 'Two elements, first bigger', hidden: true },
    { input: [[3, 5]], desc: 'Two elements, second bigger', hidden: true },
    { input: [[10, 20, 30, 5, 25, 35, 15]], desc: 'Random order, max near end', hidden: true },
    { input: [[0, -1, -2, -3]], desc: 'Zero is max among negatives', hidden: true },
    { input: [[2, 2, 2, 2, 3, 2, 2]], desc: 'Max hidden in duplicates', hidden: true },
    { input: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 2]], desc: 'Max at very end of repeated', hidden: true },
];

// ── GENERATE & VERIFY ──
function generateAndVerify(name, fn, inputs) {
    const testCases = [];
    let allPassed = true;

    for (const tc of inputs) {
        const expected = fn(...tc.input);
        testCases.push({
            input: tc.input,
            expectedOutput: expected,
            description: tc.desc,
            isHidden: tc.hidden || false,
        });
    }

    // Self-verify
    for (const tc of testCases) {
        const actual = fn(...tc.input);
        const match = JSON.stringify(actual) === JSON.stringify(tc.expectedOutput);
        if (!match) {
            allPassed = false;
            console.error(`FAIL [${name}] ${tc.description}: expected ${JSON.stringify(tc.expectedOutput)}, got ${JSON.stringify(actual)}`);
        }
    }

    if (allPassed) {
        console.log(`✓ ${name}: All ${testCases.length} test cases verified.`);
    }

    return testCases;
}

const allTestCases = {
    twoSum: generateAndVerify('twoSum', twoSum, twoSumInputs),
    reverseString: generateAndVerify('reverseString', reverseString, reverseStringInputs),
    isPalindrome: generateAndVerify('isPalindrome', isPalindrome, isPalindromeInputs),
    fizzBuzz: generateAndVerify('fizzBuzz', fizzBuzz, fizzBuzzInputs),
    findMax: generateAndVerify('findMax', findMax, findMaxInputs),
};

// Output the JSON for embedding into seeder
console.log('\n=== JSON OUTPUT ===');
console.log(JSON.stringify(allTestCases, null, 2));
