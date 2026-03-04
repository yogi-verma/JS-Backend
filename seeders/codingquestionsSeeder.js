const mongoose = require('mongoose');
const CodingQuestion = require('../models/CodingQuestion');
const UserCodingProgress = require('../models/UserCodingProgress');
const UserStreak = require('../models/UserStreak');
const logger = require('../logger');

const codingQuestionsData = [
    // ═══════════════════════════════════════════════════
    // EASY QUESTIONS (1–5)
    // ═══════════════════════════════════════════════════

    // ───────────────────────────────────────────────────
    // 1. TWO SUM  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Two Sum',
        slug: 'two-sum',
        description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nReturn the answer as an array of two indices.`,
        difficulty: 'Easy',
        order: 1,
        category: 'Arrays',
        functionName: 'twoSum',
        starterCode: `function twoSum(nums, target) {\n  // Write your solution here\n\n}`,
        solution: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use two nested loops to check every pair of numbers. For each element, iterate through the rest of the array to find if any other element adds up to the target. This approach has O(n²) time complexity and O(1) space complexity.',
                code: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use a hash map to store each number and its index as you iterate. For each element, calculate the complement (target - current number) and check if it exists in the map. This gives O(n) time complexity and O(n) space complexity.',
                code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`
            }
        ],
        examples: [
            { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
            { input: 'nums = [3,2,4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' }
        ],
        constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists.'],
        hints: ['Try using a hash map to store values you have seen.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1], description: 'Basic case: first two elements' },
            { input: [[3, 2, 4], 6], expectedOutput: [1, 2], description: 'Middle elements sum' },
            { input: [[3, 3], 6], expectedOutput: [0, 1], description: 'Duplicate values' },
            { input: [[1, 5, 3, 7], 8], expectedOutput: [1, 2], description: 'Non-adjacent pair' },
            { input: [[-1, -2, -3, -4, -5], -8], expectedOutput: [2, 4], description: 'All negative numbers' },
            // ── Hidden test cases (25) ──
            { input: [[0, 4, 3, 0], 0], expectedOutput: [0, 3], description: 'Two zeros sum to zero', isHidden: true },
            { input: [[-3, 4, 3, 90], 0], expectedOutput: [0, 2], description: 'Negative + positive = zero', isHidden: true },
            { input: [[1, 2], 3], expectedOutput: [0, 1], description: 'Minimum array size', isHidden: true },
            { input: [[5, 75, 25], 100], expectedOutput: [1, 2], description: 'Large target value', isHidden: true },
            { input: [[2, 5, 5, 11], 10], expectedOutput: [1, 2], description: 'Duplicates with larger array', isHidden: true },
            { input: [[10, 20, 30, 40, 50], 90], expectedOutput: [3, 4], description: 'Last two elements', isHidden: true },
            { input: [[100, -50, 50, 0], 0], expectedOutput: [1, 2], description: 'Negative and positive cancel', isHidden: true },
            { input: [[-10, -20, -30], -50], expectedOutput: [1, 2], description: 'Negative numbers, negative target', isHidden: true },
            { input: [[4, 4, 4, 4], 8], expectedOutput: [0, 1], description: 'All same elements', isHidden: true },
            { input: [[1000000, -1000000], 0], expectedOutput: [0, 1], description: 'Large magnitude numbers', isHidden: true },
            { input: [[0, 1, 2, 0], 1], expectedOutput: [0, 1], description: 'Zero and one', isHidden: true },
            { input: [[7, 2, 13, 11, 8], 20], expectedOutput: [0, 2], description: 'First and third element', isHidden: true },
            { input: [[1, 3, 5, 7, 9, 11, 13], 24], expectedOutput: [5, 6], description: 'Last two odd numbers', isHidden: true },
            { input: [[50, 50], 100], expectedOutput: [0, 1], description: 'Two same large values', isHidden: true },
            { input: [[99, 1, 100, 2], 3], expectedOutput: [1, 3], description: 'Non-obvious small sum', isHidden: true },
            { input: [[-5, 0, 5, 10], 5], expectedOutput: [1, 2], description: 'Zero plus positive', isHidden: true },
            { input: [[11, 15, 6, 8, 9, 10], 16], expectedOutput: [2, 5], description: 'Non-adjacent in middle', isHidden: true },
            { input: [[1, 4, 8, 7, 3, 15], 8], expectedOutput: [0, 3], description: 'First and fourth element', isHidden: true },
            { input: [[23, 42, 11, 88, 5, 67], 53], expectedOutput: [1, 2], description: 'Larger values', isHidden: true },
            { input: [[0, 0], 0], expectedOutput: [0, 1], description: 'Both zeros target zero', isHidden: true },
            { input: [[-1, 1], 0], expectedOutput: [0, 1], description: 'Opposite signs', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19], expectedOutput: [8, 9], description: 'Large array, sum at end', isHidden: true },
            { input: [[5, 10, 15, 20, 25, 30], 35], expectedOutput: [2, 3], description: 'Multiples of 5', isHidden: true },
            { input: [[1, -1, 2, -2, 3], 1], expectedOutput: [1, 2], description: 'Alternating signs', isHidden: true },
            { input: [[100, 200, 300, 400, 500], 600], expectedOutput: [1, 3], description: 'Hundreds: 200+400', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 2. REVERSE STRING  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Reverse String',
        slug: 'reverse-string',
        description: `Write a function that reverses a string. The input is given as a string \`s\`.\n\nReturn the reversed string.`,
        difficulty: 'Easy',
        order: 2,
        category: 'Strings',
        functionName: 'reverseString',
        starterCode: `function reverseString(s) {\n  // Write your solution here\n\n}`,
        solution: `function reverseString(s) {\n  return s.split('').reverse().join('');\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate through the string from the last character to the first, appending each character to a new string. This approach has O(n) time complexity but may have O(n²) due to string concatenation in some languages. In JavaScript, it uses O(n) space for the result string.',
                code: `function reverseString(s) {\n  let result = '';\n  for (let i = s.length - 1; i >= 0; i--) {\n    result += s[i];\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Convert the string to an array, use the built-in reverse() method, and join it back into a string. This is concise and runs in O(n) time with O(n) space. Alternatively, you can use a two-pointer swap approach on the array for an in-place reversal.',
                code: `function reverseString(s) {\n  return s.split('').reverse().join('');\n}`
            }
        ],
        examples: [
            { input: 's = "hello"', output: '"olleh"', explanation: '' },
            { input: 's = "JavaScript"', output: '"tpircSavaJ"', explanation: '' }
        ],
        constraints: ['1 <= s.length <= 10^5', 's consists of printable ASCII characters.'],
        hints: ['You can convert the string to an array, reverse it, and join it back.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: ['hello'], expectedOutput: 'olleh', description: 'Simple word' },
            { input: ['JavaScript'], expectedOutput: 'tpircSavaJ', description: 'Mixed case word' },
            { input: ['a'], expectedOutput: 'a', description: 'Single character' },
            { input: ['racecar'], expectedOutput: 'racecar', description: 'Palindrome stays same' },
            { input: ['Hello World!'], expectedOutput: '!dlroW olleH', description: 'With space and punctuation' },
            // ── Hidden test cases (25) ──
            { input: ['ab'], expectedOutput: 'ba', description: 'Two characters', isHidden: true },
            { input: ['abc'], expectedOutput: 'cba', description: 'Three characters', isHidden: true },
            { input: ['12345'], expectedOutput: '54321', description: 'Numeric string', isHidden: true },
            { input: ['abcdefghijklmnopqrstuvwxyz'], expectedOutput: 'zyxwvutsrqponmlkjihgfedcba', description: 'Full alphabet', isHidden: true },
            { input: ['aaa'], expectedOutput: 'aaa', description: 'All same characters', isHidden: true },
            { input: ['AB'], expectedOutput: 'BA', description: 'Two uppercase letters', isHidden: true },
            { input: ['a b c'], expectedOutput: 'c b a', description: 'Characters with spaces', isHidden: true },
            { input: ['!@#$%'], expectedOutput: '%$#@!', description: 'Special characters only', isHidden: true },
            { input: ['OpenAI'], expectedOutput: 'IAnepO', description: 'Mixed case brand', isHidden: true },
            { input: [' '], expectedOutput: ' ', description: 'Single space', isHidden: true },
            { input: ['   abc   '], expectedOutput: '   cba   ', description: 'Padded with spaces', isHidden: true },
            { input: ['Z'], expectedOutput: 'Z', description: 'Single uppercase letter', isHidden: true },
            { input: ['abba'], expectedOutput: 'abba', description: 'Four char palindrome', isHidden: true },
            { input: ['Hello, World!'], expectedOutput: '!dlroW ,olleH', description: 'Greeting with punctuation', isHidden: true },
            { input: ['1a2b3c'], expectedOutput: 'c3b2a1', description: 'Alphanumeric mix', isHidden: true },
            { input: ['ABCBA'], expectedOutput: 'ABCBA', description: 'Uppercase palindrome', isHidden: true },
            { input: ['The quick brown fox'], expectedOutput: 'xof nworb kciuq ehT', description: 'Sentence', isHidden: true },
            { input: ['level'], expectedOutput: 'level', description: 'Word palindrome', isHidden: true },
            { input: ['madam'], expectedOutput: 'madam', description: 'Classic palindrome word', isHidden: true },
            { input: ['((()))'], expectedOutput: ')))(((', description: 'Nested parentheses', isHidden: true },
            { input: ['Race Car'], expectedOutput: 'raC ecaR', description: 'Mixed case with space', isHidden: true },
            { input: ['  '], expectedOutput: '  ', description: 'Two spaces', isHidden: true },
            { input: ['abcdefg'], expectedOutput: 'gfedcba', description: 'Sequential letters', isHidden: true },
            { input: ['A1B2C3'], expectedOutput: '3C2B1A', description: 'Alternating letters and digits', isHidden: true },
            { input: ['Was it a car or a cat I saw'], expectedOutput: 'was I tac a ro rac a ti saW', description: 'Long sentence', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 3. PALINDROME CHECK  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Palindrome Check',
        slug: 'palindrome-check',
        description: `Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.\n\nA palindrome reads the same forwards and backwards. Consider only alphanumeric characters and ignore case.`,
        difficulty: 'Easy',
        order: 3,
        category: 'Strings',
        functionName: 'isPalindrome',
        starterCode: `function isPalindrome(s) {\n  // Write your solution here\n\n}`,
        solution: `function isPalindrome(s) {\n  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Clean the string by removing non-alphanumeric characters and converting to lowercase. Then create a reversed copy and compare it with the original cleaned string. This uses O(n) time and O(n) space for the reversed string.',
                code: `function isPalindrome(s) {\n  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  const reversed = cleaned.split('').reverse().join('');\n  return cleaned === reversed;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use a two-pointer technique. After cleaning the string, place one pointer at the start and one at the end. Compare characters moving inward. If any mismatch is found, return false. This uses O(n) time and O(n) space for the cleaned string, but avoids creating an extra reversed copy.',
                code: `function isPalindrome(s) {\n  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let left = 0, right = cleaned.length - 1;\n  while (left < right) {\n    if (cleaned[left] !== cleaned[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}`
            }
        ],
        examples: [
            { input: 's = "racecar"', output: 'true', explanation: 'racecar reads the same forwards and backwards.' },
            { input: 's = "hello"', output: 'false', explanation: '' }
        ],
        constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
        hints: ['Clean the string first — remove non-alphanumeric characters and convert to lowercase.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: ['racecar'], expectedOutput: true, description: 'Simple palindrome' },
            { input: ['hello'], expectedOutput: false, description: 'Not a palindrome' },
            { input: ['A man a plan a canal Panama'], expectedOutput: true, description: 'Sentence palindrome with spaces' },
            { input: ['a'], expectedOutput: true, description: 'Single character' },
            { input: ['Was it a car or a cat I saw?'], expectedOutput: true, description: 'Complex sentence with punctuation' },
            // ── Hidden test cases (25) ──
            { input: ['ab'], expectedOutput: false, description: 'Two different chars', isHidden: true },
            { input: ['aa'], expectedOutput: true, description: 'Two same chars', isHidden: true },
            { input: ['Aba'], expectedOutput: true, description: 'Mixed case palindrome', isHidden: true },
            { input: ['race a car'], expectedOutput: false, description: 'Not palindrome with spaces', isHidden: true },
            { input: ['!!!'], expectedOutput: true, description: 'Only special characters', isHidden: true },
            { input: ['0P'], expectedOutput: false, description: 'Zero and letter', isHidden: true },
            { input: ['Madam'], expectedOutput: true, description: 'Capitalized palindrome', isHidden: true },
            { input: ['No lemon, no melon'], expectedOutput: true, description: 'Comma-separated palindrome', isHidden: true },
            { input: ['12321'], expectedOutput: true, description: 'Numeric palindrome', isHidden: true },
            { input: ['12345'], expectedOutput: false, description: 'Numeric non-palindrome', isHidden: true },
            { input: ['Never odd or even'], expectedOutput: true, description: 'Classic phrase palindrome', isHidden: true },
            { input: ['Do geese see God'], expectedOutput: true, description: 'Question palindrome', isHidden: true },
            { input: ['abc'], expectedOutput: false, description: 'Three char non-palindrome', isHidden: true },
            { input: ['A'], expectedOutput: true, description: 'Single uppercase', isHidden: true },
            { input: ['.,!'], expectedOutput: true, description: 'Only punctuation marks', isHidden: true },
            { input: ['Eva, can I see bees in a cave?'], expectedOutput: true, description: 'Long sentence palindrome', isHidden: true },
            { input: ['Mr. Owl ate my metal worm'], expectedOutput: true, description: 'Owl palindrome', isHidden: true },
            { input: ['Palindrome'], expectedOutput: false, description: 'The word palindrome itself', isHidden: true },
            { input: ['Step on no pets'], expectedOutput: true, description: 'Pets palindrome', isHidden: true },
            { input: ['Top spot'], expectedOutput: true, description: 'Two word palindrome', isHidden: true },
            { input: ['Not a palindrome at all'], expectedOutput: false, description: 'Clearly not palindrome', isHidden: true },
            { input: ['1a2'], expectedOutput: false, description: 'Alphanumeric non-palindrome', isHidden: true },
            { input: ['1a1'], expectedOutput: true, description: 'Alphanumeric palindrome', isHidden: true },
            { input: ['Able was I ere I saw Elba'], expectedOutput: true, description: 'Napoleon palindrome', isHidden: true },
            { input: ['aabaa'], expectedOutput: true, description: 'Five char palindrome', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 4. FIZZBUZZ  (25 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'FizzBuzz',
        slug: 'fizzbuzz',
        description: `Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:\n\n- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.\n- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.\n- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.\n- \`answer[i] == i\` (as a string) if none of the above conditions are true.`,
        difficulty: 'Easy',
        order: 4,
        category: 'Logic',
        functionName: 'fizzBuzz',
        starterCode: `function fizzBuzz(n) {\n  // Write your solution here\n\n}`,
        solution: `function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) result.push("FizzBuzz");\n    else if (i % 3 === 0) result.push("Fizz");\n    else if (i % 5 === 0) result.push("Buzz");\n    else result.push(String(i));\n  }\n  return result;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate from 1 to n. For each number, check divisibility by 3 and 5 separately using multiple if statements. Build a string by concatenating "Fizz" and/or "Buzz" if divisible, otherwise use the number itself. This is straightforward with O(n) time and O(n) space.',
                code: `function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    let str = '';\n    if (i % 3 === 0) str += 'Fizz';\n    if (i % 5 === 0) str += 'Buzz';\n    if (str === '') str = String(i);\n    result.push(str);\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Iterate from 1 to n and check divisibility by 15 first (for FizzBuzz), then by 3 (Fizz), then by 5 (Buzz). This avoids string concatenation and uses direct comparisons. Time complexity is O(n) and space complexity is O(n) for the result array.',
                code: `function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) result.push('FizzBuzz');\n    else if (i % 3 === 0) result.push('Fizz');\n    else if (i % 5 === 0) result.push('Buzz');\n    else result.push(String(i));\n  }\n  return result;\n}`
            }
        ],
        examples: [
            { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]', explanation: '' },
            { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', explanation: '' }
        ],
        constraints: ['1 <= n <= 10^4'],
        hints: ['Check divisibility by 15 first (both 3 and 5), then 3, then 5.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [1], expectedOutput: ['1'], description: 'n = 1' },
            { input: [2], expectedOutput: ['1', '2'], description: 'n = 2' },
            { input: [3], expectedOutput: ['1', '2', 'Fizz'], description: 'n = 3, first Fizz' },
            { input: [5], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz'], description: 'n = 5, first Buzz' },
            { input: [15], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'], description: 'n = 15, first FizzBuzz' },
            // ── Hidden test cases (20) ──
            { input: [4], expectedOutput: ['1', '2', 'Fizz', '4'], description: 'n = 4', isHidden: true },
            { input: [6], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz'], description: 'n = 6, two Fizz', isHidden: true },
            { input: [7], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7'], description: 'n = 7', isHidden: true },
            { input: [8], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8'], description: 'n = 8', isHidden: true },
            { input: [9], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz'], description: 'n = 9, three Fizz', isHidden: true },
            { input: [10], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz'], description: 'n = 10, two Buzz', isHidden: true },
            { input: [11], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11'], description: 'n = 11', isHidden: true },
            { input: [12], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz'], description: 'n = 12, four Fizz', isHidden: true },
            { input: [13], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13'], description: 'n = 13', isHidden: true },
            { input: [14], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14'], description: 'n = 14', isHidden: true },
            { input: [16], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16'], description: 'n = 16, after first FizzBuzz', isHidden: true },
            { input: [17], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17'], description: 'n = 17', isHidden: true },
            { input: [18], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz'], description: 'n = 18, Fizz at end', isHidden: true },
            { input: [19], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19'], description: 'n = 19', isHidden: true },
            { input: [20], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz'], description: 'n = 20, Buzz at end', isHidden: true },
            { input: [21], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz', 'Fizz'], description: 'n = 21, Fizz at end', isHidden: true },
            { input: [25], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz', 'Fizz', '22', '23', 'Fizz', 'Buzz'], description: 'n = 25, Buzz at end', isHidden: true },
            { input: [30], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz', 'Fizz', '22', '23', 'Fizz', 'Buzz', '26', 'Fizz', '28', '29', 'FizzBuzz'], description: 'n = 30, second FizzBuzz', isHidden: true },
            { input: [45], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz', 'Fizz', '22', '23', 'Fizz', 'Buzz', '26', 'Fizz', '28', '29', 'FizzBuzz', '31', '32', 'Fizz', '34', 'Buzz', 'Fizz', '37', '38', 'Fizz', 'Buzz', '41', 'Fizz', '43', '44', 'FizzBuzz'], description: 'n = 45, third FizzBuzz', isHidden: true },
            { input: [50], expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz', 'Fizz', '22', '23', 'Fizz', 'Buzz', '26', 'Fizz', '28', '29', 'FizzBuzz', '31', '32', 'Fizz', '34', 'Buzz', 'Fizz', '37', '38', 'Fizz', 'Buzz', '41', 'Fizz', '43', '44', 'FizzBuzz', '46', '47', 'Fizz', '49', 'Buzz'], description: 'n = 50, Buzz at end', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 5. FIND MAXIMUM IN ARRAY  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Find Maximum in Array',
        slug: 'find-maximum-in-array',
        description: `Given an array of numbers \`nums\`, return the maximum value in the array.\n\nDo not use \`Math.max()\` — implement it manually.`,
        difficulty: 'Easy',
        order: 5,
        category: 'Arrays',
        functionName: 'findMax',
        starterCode: `function findMax(nums) {\n  // Write your solution here\n\n}`,
        solution: `function findMax(nums) {\n  let max = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] > max) max = nums[i];\n  }\n  return max;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Sort the array in ascending order and return the last element. This approach has O(n log n) time complexity due to sorting and O(1) extra space if sorting in-place (though it modifies the original array).',
                code: `function findMax(nums) {\n  const sorted = [...nums].sort((a, b) => a - b);\n  return sorted[sorted.length - 1];\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Initialize a variable with the first element, then iterate through the array. Update the variable whenever a larger element is found. This runs in O(n) time and O(1) space — a single pass through the array.',
                code: `function findMax(nums) {\n  let max = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] > max) max = nums[i];\n  }\n  return max;\n}`
            }
        ],
        examples: [
            { input: 'nums = [1, 3, 5, 2, 4]', output: '5', explanation: '' },
            { input: 'nums = [-1, -5, -2]', output: '-1', explanation: '' }
        ],
        constraints: ['1 <= nums.length <= 10^4', '-10^6 <= nums[i] <= 10^6'],
        hints: ['Initialize max with the first element, then iterate through the rest.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 3, 5, 2, 4]], expectedOutput: 5, description: 'Positive numbers, max in middle' },
            { input: [[-1, -5, -2]], expectedOutput: -1, description: 'All negative numbers' },
            { input: [[42]], expectedOutput: 42, description: 'Single element' },
            { input: [[7, 7, 7, 7]], expectedOutput: 7, description: 'All same elements' },
            { input: [[-100, 0, 100, 50, -50]], expectedOutput: 100, description: 'Mixed positive and negative' },
            // ── Hidden test cases (25) ──
            { input: [[10, 9, 8, 7, 6]], expectedOutput: 10, description: 'Max at beginning (descending)', isHidden: true },
            { input: [[1, 2, 3, 4, 5]], expectedOutput: 5, description: 'Max at end (ascending)', isHidden: true },
            { input: [[5, 1, 5, 1, 5]], expectedOutput: 5, description: 'Multiple maxes', isHidden: true },
            { input: [[0]], expectedOutput: 0, description: 'Single zero', isHidden: true },
            { input: [[0, 0, 0, 0]], expectedOutput: 0, description: 'All zeros', isHidden: true },
            { input: [[-1, -2, -3, -4, -5]], expectedOutput: -1, description: 'Descending negatives', isHidden: true },
            { input: [[-5, -4, -3, -2, -1]], expectedOutput: -1, description: 'Ascending negatives', isHidden: true },
            { input: [[1000000, -1000000]], expectedOutput: 1000000, description: 'Extreme values', isHidden: true },
            { input: [[-999999]], expectedOutput: -999999, description: 'Single large negative', isHidden: true },
            { input: [[999999]], expectedOutput: 999999, description: 'Single large positive', isHidden: true },
            { input: [[1, 100, 2, 99, 3]], expectedOutput: 100, description: 'Max early in array', isHidden: true },
            { input: [[50, 50, 50, 51]], expectedOutput: 51, description: 'Max at end, rest same', isHidden: true },
            { input: [[51, 50, 50, 50]], expectedOutput: 51, description: 'Max at start, rest same', isHidden: true },
            { input: [[-1, 0, 1]], expectedOutput: 1, description: 'Small range around zero', isHidden: true },
            { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expectedOutput: 9, description: 'Pi digits', isHidden: true },
            { input: [[100, 200, 300, 400, 500]], expectedOutput: 500, description: 'Hundreds ascending', isHidden: true },
            { input: [[500, 400, 300, 200, 100]], expectedOutput: 500, description: 'Hundreds descending', isHidden: true },
            { input: [[1, -1, 2, -2, 3, -3]], expectedOutput: 3, description: 'Alternating signs', isHidden: true },
            { input: [[-1000000, -999999, -999998]], expectedOutput: -999998, description: 'Large negatives ascending', isHidden: true },
            { input: [[5, 3]], expectedOutput: 5, description: 'Two elements, first bigger', isHidden: true },
            { input: [[3, 5]], expectedOutput: 5, description: 'Two elements, second bigger', isHidden: true },
            { input: [[10, 20, 30, 5, 25, 35, 15]], expectedOutput: 35, description: 'Random order, max near end', isHidden: true },
            { input: [[0, -1, -2, -3]], expectedOutput: 0, description: 'Zero is max among negatives', isHidden: true },
            { input: [[2, 2, 2, 2, 3, 2, 2]], expectedOutput: 3, description: 'Max hidden in duplicates', isHidden: true },
            { input: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 2]], expectedOutput: 2, description: 'Max at very end of repeated', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 6. REMOVE DUPLICATES FROM ARRAY  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Remove Duplicates from Array',
        slug: 'remove-duplicates-from-array',
        description: `Given an array \`arr\`, return a new array with all duplicate elements removed.\n\nThe order of elements in the result should match their first occurrence in the original array.`,
        difficulty: 'Easy',
        order: 6,
        category: 'Arrays',
        functionName: 'removeDuplicates',
        starterCode: `function removeDuplicates(arr) {\n  // Write your solution here\n\n}`,
        solution: `function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Create an empty result array. For each element in the input, check if it already exists in the result using includes(). If not, push it. This has O(n²) time complexity due to the inner search and O(n) space.',
                code: `function removeDuplicates(arr) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (!result.includes(arr[i])) {\n      result.push(arr[i]);\n    }\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use a Set to automatically handle duplicates. Convert the array to a Set (which keeps only unique values) and spread it back into an array. This runs in O(n) time and O(n) space.',
                code: `function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}`
            }
        ],
        examples: [
            { input: 'arr = [1, 2, 3, 2, 1]', output: '[1, 2, 3]', explanation: '2 and 1 appear twice, keep only first occurrence.' },
            { input: 'arr = [1, 1, 1, 1]', output: '[1]', explanation: 'All elements are the same.' }
        ],
        constraints: ['0 <= arr.length <= 10^4', 'Array elements are numbers.'],
        hints: ['A Set automatically removes duplicate values.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 2, 3, 2, 1]], expectedOutput: [1, 2, 3], description: 'Duplicates at start and end' },
            { input: [[1, 1, 1, 1]], expectedOutput: [1], description: 'All same elements' },
            { input: [[1, 2, 3, 4, 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'No duplicates' },
            { input: [[]], expectedOutput: [], description: 'Empty array' },
            { input: [[5]], expectedOutput: [5], description: 'Single element' },
            // ── Hidden test cases (25) ──
            { input: [[1, 2, 1, 2, 1, 2]], expectedOutput: [1, 2], description: 'Alternating duplicates', isHidden: true },
            { input: [[3, 3, 3, 3, 3]], expectedOutput: [3], description: 'All same value repeated', isHidden: true },
            { input: [[-1, -2, -1, -3]], expectedOutput: [-1, -2, -3], description: 'Negatives with duplicates', isHidden: true },
            { input: [[0, 0, 0]], expectedOutput: [0], description: 'All zeros', isHidden: true },
            { input: [[-1, 0, 1, -1, 0, 1]], expectedOutput: [-1, 0, 1], description: 'Mixed signs with duplicates', isHidden: true },
            { input: [[10, 20, 30, 10, 20, 30]], expectedOutput: [10, 20, 30], description: 'Repeated sequence', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'Double sequence', isHidden: true },
            { input: [[100]], expectedOutput: [100], description: 'Single large number', isHidden: true },
            { input: [[-100, -100]], expectedOutput: [-100], description: 'Two same negatives', isHidden: true },
            { input: [[1, 2]], expectedOutput: [1, 2], description: 'Two different elements', isHidden: true },
            { input: [[2, 1]], expectedOutput: [2, 1], description: 'Two different reversed', isHidden: true },
            { input: [[5, 4, 3, 2, 1, 5, 4, 3, 2, 1]], expectedOutput: [5, 4, 3, 2, 1], description: 'Reverse order duplicated', isHidden: true },
            { input: [[1, 1, 2, 2, 3, 3]], expectedOutput: [1, 2, 3], description: 'Consecutive pairs', isHidden: true },
            { input: [[7, 8, 9, 7, 8, 9, 7, 8, 9]], expectedOutput: [7, 8, 9], description: 'Triple repeated sequence', isHidden: true },
            { input: [[0, 1, 0, 1, 0]], expectedOutput: [0, 1], description: 'Binary-like array', isHidden: true },
            { input: [[-5, -5, 5, 5]], expectedOutput: [-5, 5], description: 'Negative and positive pairs', isHidden: true },
            { input: [[42, 42]], expectedOutput: [42], description: 'Two identical elements', isHidden: true },
            { input: [[1, 2, 3, 4, 4, 3, 2, 1]], expectedOutput: [1, 2, 3, 4], description: 'Palindromic array', isHidden: true },
            { input: [[10, 10, 20, 20, 30]], expectedOutput: [10, 20, 30], description: 'Consecutive dups then unique', isHidden: true },
            { input: [[1, 3, 5, 7, 9, 1, 3]], expectedOutput: [1, 3, 5, 7, 9], description: 'Odd numbers with dups', isHidden: true },
            { input: [[2, 4, 6, 8, 10]], expectedOutput: [2, 4, 6, 8, 10], description: 'Even numbers no dups', isHidden: true },
            { input: [[-3, -2, -1, 0, 1, 2, 3]], expectedOutput: [-3, -2, -1, 0, 1, 2, 3], description: 'Range with no dups', isHidden: true },
            { input: [[999, 998, 999, 997, 998]], expectedOutput: [999, 998, 997], description: 'Large values with dups', isHidden: true },
            { input: [[0]], expectedOutput: [0], description: 'Single zero', isHidden: true },
            { input: [[1, 2, 3, 1, 2, 3, 1, 2, 3, 1]], expectedOutput: [1, 2, 3], description: 'Many repetitions', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 7. COUNT VOWELS  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Count Vowels',
        slug: 'count-vowels',
        description: `Given a string \`s\`, return the total count of vowels (a, e, i, o, u) in the string.\n\nBoth uppercase and lowercase vowels should be counted.`,
        difficulty: 'Easy',
        order: 7,
        category: 'Strings',
        functionName: 'countVowels',
        starterCode: `function countVowels(s) {\n  // Write your solution here\n\n}`,
        solution: `function countVowels(s) {\n  const vowels = 'aeiouAEIOU';\n  let count = 0;\n  for (const char of s) {\n    if (vowels.includes(char)) count++;\n  }\n  return count;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate through each character. For each character, check if it matches any vowel (a, e, i, o, u) case-insensitively. Increment a counter on match. O(n) time, O(1) space.',
                code: `function countVowels(s) {\n  let count = 0;\n  for (let i = 0; i < s.length; i++) {\n    const c = s[i].toLowerCase();\n    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') {\n      count++;\n    }\n  }\n  return count;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use a regex to match all vowels globally and case-insensitively. Return the length of the match array, or 0 if no matches. O(n) time, O(k) space where k is vowel count.',
                code: `function countVowels(s) {\n  const matches = s.match(/[aeiou]/gi);\n  return matches ? matches.length : 0;\n}`
            }
        ],
        examples: [
            { input: 's = "hello"', output: '2', explanation: 'e and o are vowels.' },
            { input: 's = "AEIOU"', output: '5', explanation: 'All characters are uppercase vowels.' }
        ],
        constraints: ['0 <= s.length <= 10^5', 's consists of printable ASCII characters.'],
        hints: ['Check each character against the set of vowels: a, e, i, o, u (case-insensitive).'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: ['hello'], expectedOutput: 2, description: 'Simple word with 2 vowels' },
            { input: ['AEIOU'], expectedOutput: 5, description: 'All uppercase vowels' },
            { input: ['bcdfg'], expectedOutput: 0, description: 'No vowels' },
            { input: ['aeiou'], expectedOutput: 5, description: 'All lowercase vowels' },
            { input: [''], expectedOutput: 0, description: 'Empty string' },
            // ── Hidden test cases (25) ──
            { input: ['a'], expectedOutput: 1, description: 'Single vowel', isHidden: true },
            { input: ['b'], expectedOutput: 0, description: 'Single consonant', isHidden: true },
            { input: ['AeIoU'], expectedOutput: 5, description: 'Mixed case vowels', isHidden: true },
            { input: ['rhythm'], expectedOutput: 0, description: 'Word with no vowels', isHidden: true },
            { input: ['education'], expectedOutput: 5, description: 'Word with 5 vowels', isHidden: true },
            { input: ['JavaScript'], expectedOutput: 3, description: 'Language name: a, a, i', isHidden: true },
            { input: ['aaa'], expectedOutput: 3, description: 'Repeated single vowel', isHidden: true },
            { input: ['bbb'], expectedOutput: 0, description: 'Repeated consonant', isHidden: true },
            { input: ['The quick brown fox'], expectedOutput: 5, description: 'Sentence with spaces', isHidden: true },
            { input: ['HELLO WORLD'], expectedOutput: 3, description: 'Uppercase sentence: E, O, O', isHidden: true },
            { input: ['12345'], expectedOutput: 0, description: 'Numeric string', isHidden: true },
            { input: ['a1e2i3o4u5'], expectedOutput: 5, description: 'Vowels mixed with digits', isHidden: true },
            { input: ['!@#$%'], expectedOutput: 0, description: 'Special characters only', isHidden: true },
            { input: ['aEiOu'], expectedOutput: 5, description: 'Alternating case vowels', isHidden: true },
            { input: ['Programming'], expectedOutput: 3, description: 'Programming: o, a, i', isHidden: true },
            { input: ['aaeeiioouu'], expectedOutput: 10, description: 'Double each vowel', isHidden: true },
            { input: ['Queue'], expectedOutput: 4, description: 'Word with many vowels: u, e, u, e', isHidden: true },
            { input: ['Sequoia'], expectedOutput: 5, description: 'All 5 vowels in one word', isHidden: true },
            { input: ['strengths'], expectedOutput: 1, description: 'Long word with 1 vowel: e', isHidden: true },
            { input: ['zzzzz'], expectedOutput: 0, description: 'All z characters', isHidden: true },
            { input: ['United States of America'], expectedOutput: 10, description: 'Country name', isHidden: true },
            { input: [' '], expectedOutput: 0, description: 'Single space', isHidden: true },
            { input: ['OOO'], expectedOutput: 3, description: 'Three uppercase O', isHidden: true },
            { input: ['AbCdEfGhIjKlMnOpQrStUvWxYz'], expectedOutput: 5, description: 'Alphabet alternating case', isHidden: true },
            { input: ['uoiea'], expectedOutput: 5, description: 'Vowels in reverse order', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 8. CAPITALIZE FIRST LETTER  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Capitalize First Letter',
        slug: 'capitalize-first-letter',
        description: `Given a string \`s\`, capitalize the first letter of each word and return the modified string.\n\nA word is defined as a sequence of non-space characters separated by spaces. Preserve all spacing exactly as in the original.`,
        difficulty: 'Easy',
        order: 8,
        category: 'Strings',
        functionName: 'capitalizeWords',
        starterCode: `function capitalizeWords(s) {\n  // Write your solution here\n\n}`,
        solution: `function capitalizeWords(s) {\n  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate through the string character by character. Capitalize a character if it follows a space or is the first character. Build the result string. O(n) time, O(n) space.',
                code: `function capitalizeWords(s) {\n  let result = '';\n  let capitalizeNext = true;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === ' ') {\n      result += ' ';\n      capitalizeNext = true;\n    } else {\n      result += capitalizeNext ? s[i].toUpperCase() : s[i];\n      capitalizeNext = false;\n    }\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Split the string by spaces, capitalize the first character of each part using charAt(0).toUpperCase() + slice(1), and join back with spaces. O(n) time, O(n) space.',
                code: `function capitalizeWords(s) {\n  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');\n}`
            }
        ],
        examples: [
            { input: 's = "hello world"', output: '"Hello World"', explanation: 'First letter of each word capitalized.' },
            { input: 's = "javaScript is fun"', output: '"JavaScript Is Fun"', explanation: '' }
        ],
        constraints: ['0 <= s.length <= 10^5', 's consists of printable ASCII characters.'],
        hints: ['Split the string by spaces, capitalize the first character of each word, then join.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: ['hello world'], expectedOutput: 'Hello World', description: 'Two simple words' },
            { input: ['javaScript is fun'], expectedOutput: 'JavaScript Is Fun', description: 'Three words mixed case' },
            { input: ['a'], expectedOutput: 'A', description: 'Single character' },
            { input: ['hello'], expectedOutput: 'Hello', description: 'Single word' },
            { input: ['i love coding'], expectedOutput: 'I Love Coding', description: 'Three words' },
            // ── Hidden test cases (25) ──
            { input: [''], expectedOutput: '', description: 'Empty string', isHidden: true },
            { input: ['HELLO WORLD'], expectedOutput: 'HELLO WORLD', description: 'Already uppercase', isHidden: true },
            { input: ['a b c'], expectedOutput: 'A B C', description: 'Single character words', isHidden: true },
            { input: ['the quick brown fox'], expectedOutput: 'The Quick Brown Fox', description: 'Classic sentence', isHidden: true },
            { input: ['hello  world'], expectedOutput: 'Hello  World', description: 'Double space between words', isHidden: true },
            { input: [' hello'], expectedOutput: ' Hello', description: 'Leading space', isHidden: true },
            { input: ['hello '], expectedOutput: 'Hello ', description: 'Trailing space', isHidden: true },
            { input: ['x'], expectedOutput: 'X', description: 'Single lowercase letter', isHidden: true },
            { input: ['X'], expectedOutput: 'X', description: 'Single uppercase letter', isHidden: true },
            { input: ['this is a test'], expectedOutput: 'This Is A Test', description: 'Four words', isHidden: true },
            { input: ['ALREADY CAPITALIZED'], expectedOutput: 'ALREADY CAPITALIZED', description: 'All caps unchanged', isHidden: true },
            { input: ['mixed CASE words HERE'], expectedOutput: 'Mixed CASE Words HERE', description: 'Mixed case words', isHidden: true },
            { input: ['123 abc'], expectedOutput: '123 Abc', description: 'Number and word', isHidden: true },
            { input: ['one two three four five'], expectedOutput: 'One Two Three Four Five', description: 'Five words', isHidden: true },
            { input: ['hello world foo bar baz'], expectedOutput: 'Hello World Foo Bar Baz', description: 'Five common words', isHidden: true },
            { input: ['aBcDeF'], expectedOutput: 'ABcDeF', description: 'Alternating case single word', isHidden: true },
            { input: ['good morning everyone'], expectedOutput: 'Good Morning Everyone', description: 'Greeting', isHidden: true },
            { input: ['node js react vue'], expectedOutput: 'Node Js React Vue', description: 'Tech words', isHidden: true },
            { input: ['apple banana cherry'], expectedOutput: 'Apple Banana Cherry', description: 'Fruit names', isHidden: true },
            { input: ['  spaces  everywhere  '], expectedOutput: '  Spaces  Everywhere  ', description: 'Multiple spaces preserved', isHidden: true },
            { input: ['ab cd ef gh ij kl mn'], expectedOutput: 'Ab Cd Ef Gh Ij Kl Mn', description: 'Two-letter words', isHidden: true },
            { input: ['z'], expectedOutput: 'Z', description: 'Last letter of alphabet', isHidden: true },
            { input: ['hi there friend'], expectedOutput: 'Hi There Friend', description: 'Three word greeting', isHidden: true },
            { input: ['to be or not to be'], expectedOutput: 'To Be Or Not To Be', description: 'Shakespeare quote', isHidden: true },
            { input: ['cat dog bird fish'], expectedOutput: 'Cat Dog Bird Fish', description: 'Animal names', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 9. FLATTEN ONE-LEVEL ARRAY  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Flatten One-Level Array',
        slug: 'flatten-one-level-array',
        description: `Given an array \`arr\` that may contain nested arrays (one level deep), return a new flattened array.\n\nOnly flatten one level of nesting. For example, \`[1, [2, 3], 4]\` becomes \`[1, 2, 3, 4]\`.`,
        difficulty: 'Easy',
        order: 9,
        category: 'Arrays',
        functionName: 'flattenArray',
        starterCode: `function flattenArray(arr) {\n  // Write your solution here\n\n}`,
        solution: `function flattenArray(arr) {\n  return arr.flat();\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate through each element. If the element is an array (use Array.isArray), push all its items into the result. Otherwise push the element directly. O(n) time, O(n) space.',
                code: `function flattenArray(arr) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (Array.isArray(arr[i])) {\n      for (let j = 0; j < arr[i].length; j++) {\n        result.push(arr[i][j]);\n      }\n    } else {\n      result.push(arr[i]);\n    }\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use the built-in Array.prototype.flat() method with default depth of 1. Concise and efficient at O(n) time, O(n) space.',
                code: `function flattenArray(arr) {\n  return arr.flat();\n}`
            }
        ],
        examples: [
            { input: 'arr = [1, [2, 3], 4]', output: '[1, 2, 3, 4]', explanation: 'The nested array [2, 3] is flattened.' },
            { input: 'arr = [[1, 2], [3, 4]]', output: '[1, 2, 3, 4]', explanation: 'Both nested arrays are flattened.' }
        ],
        constraints: ['0 <= arr.length <= 10^4', 'Elements are numbers or arrays of numbers (one level deep).'],
        hints: ['You can use Array.prototype.flat() or iterate and check Array.isArray().'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, [2, 3], 4]], expectedOutput: [1, 2, 3, 4], description: 'Mixed flat and nested' },
            { input: [[[1, 2], [3, 4]]], expectedOutput: [1, 2, 3, 4], description: 'All nested arrays' },
            { input: [[1, 2, 3]], expectedOutput: [1, 2, 3], description: 'Already flat' },
            { input: [[]], expectedOutput: [], description: 'Empty array' },
            { input: [[[1], [2], [3]]], expectedOutput: [1, 2, 3], description: 'Single-element nested arrays' },
            // ── Hidden test cases (25) ──
            { input: [[1]], expectedOutput: [1], description: 'Single flat element', isHidden: true },
            { input: [[[1]]], expectedOutput: [1], description: 'Single nested element', isHidden: true },
            { input: [[[1, 2, 3, 4, 5]]], expectedOutput: [1, 2, 3, 4, 5], description: 'One big nested array', isHidden: true },
            { input: [[1, [2], 3, [4], 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'Alternating flat and nested', isHidden: true },
            { input: [[[], []]], expectedOutput: [], description: 'Two empty nested arrays', isHidden: true },
            { input: [[1, [], 2]], expectedOutput: [1, 2], description: 'Empty array between elements', isHidden: true },
            { input: [[[1, 2], 3, [4, 5]]], expectedOutput: [1, 2, 3, 4, 5], description: 'Nested-flat-nested pattern', isHidden: true },
            { input: [[-1, [-2, -3], -4]], expectedOutput: [-1, -2, -3, -4], description: 'Negative numbers', isHidden: true },
            { input: [[0, [0, 0], 0]], expectedOutput: [0, 0, 0, 0], description: 'All zeros mixed', isHidden: true },
            { input: [[10, [20, 30], [40, 50], 60]], expectedOutput: [10, 20, 30, 40, 50, 60], description: 'Multiple nested arrays', isHidden: true },
            { input: [[[100, 200]]], expectedOutput: [100, 200], description: 'Single nested pair', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], description: 'Ten flat elements', isHidden: true },
            { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9], description: 'Three triples nested', isHidden: true },
            { input: [[5, [10]]], expectedOutput: [5, 10], description: 'Flat then nested', isHidden: true },
            { input: [[[5], 10]], expectedOutput: [5, 10], description: 'Nested then flat', isHidden: true },
            { input: [[-10, [0], 10]], expectedOutput: [-10, 0, 10], description: 'Negative zero positive', isHidden: true },
            { input: [[1, [2, 3, 4, 5], 6]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'Large nested in middle', isHidden: true },
            { input: [[[1], 2, [3], 4, [5]]], expectedOutput: [1, 2, 3, 4, 5], description: 'Alternating single nested and flat', isHidden: true },
            { input: [[[], 1, [], 2, []]], expectedOutput: [1, 2], description: 'Empty arrays interspersed', isHidden: true },
            { input: [[[1, 1], [2, 2], [3, 3]]], expectedOutput: [1, 1, 2, 2, 3, 3], description: 'Duplicate pairs in nested', isHidden: true },
            { input: [[999, [1000]]], expectedOutput: [999, 1000], description: 'Large numbers', isHidden: true },
            { input: [[-5, [-4, -3], [-2, -1], 0]], expectedOutput: [-5, -4, -3, -2, -1, 0], description: 'Ascending negatives to zero', isHidden: true },
            { input: [[42]], expectedOutput: [42], description: 'Single number', isHidden: true },
            { input: [[[42]]], expectedOutput: [42], description: 'Single nested number', isHidden: true },
            { input: [[1, [2], [3], [4], 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'Many single-element nested', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 10. FIND FACTORIAL  (19 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Find Factorial',
        slug: 'find-factorial',
        description: `Given a non-negative integer \`n\`, return its factorial.\n\nThe factorial of \`n\` (written as \`n!\`) is the product of all positive integers less than or equal to \`n\`. By convention, \`0! = 1\`.`,
        difficulty: 'Easy',
        order: 10,
        category: 'Math',
        functionName: 'factorial',
        starterCode: `function factorial(n) {\n  // Write your solution here\n\n}`,
        solution: `function factorial(n) {\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}`,
        solutions: [
            {
                approach: 'Brute Force (Recursive)',
                explanation: 'Use recursion: factorial(n) = n * factorial(n-1) with base case factorial(0) = 1. O(n) time, O(n) space due to call stack.',
                code: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`
            },
            {
                approach: 'Optimal (Iterative)',
                explanation: 'Use a loop from 2 to n, multiplying a running product. O(n) time, O(1) space. Avoids stack overflow for large n.',
                code: `function factorial(n) {\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}`
            }
        ],
        examples: [
            { input: 'n = 5', output: '120', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120' },
            { input: 'n = 0', output: '1', explanation: '0! = 1 by convention' }
        ],
        constraints: ['0 <= n <= 18'],
        hints: ['Remember that 0! = 1 and 1! = 1.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [0], expectedOutput: 1, description: 'Zero factorial' },
            { input: [1], expectedOutput: 1, description: 'One factorial' },
            { input: [5], expectedOutput: 120, description: 'Five factorial' },
            { input: [10], expectedOutput: 3628800, description: 'Ten factorial' },
            { input: [3], expectedOutput: 6, description: 'Three factorial' },
            // ── Hidden test cases (14) ──
            { input: [2], expectedOutput: 2, description: 'Two factorial', isHidden: true },
            { input: [4], expectedOutput: 24, description: 'Four factorial', isHidden: true },
            { input: [6], expectedOutput: 720, description: 'Six factorial', isHidden: true },
            { input: [7], expectedOutput: 5040, description: 'Seven factorial', isHidden: true },
            { input: [8], expectedOutput: 40320, description: 'Eight factorial', isHidden: true },
            { input: [9], expectedOutput: 362880, description: 'Nine factorial', isHidden: true },
            { input: [11], expectedOutput: 39916800, description: 'Eleven factorial', isHidden: true },
            { input: [12], expectedOutput: 479001600, description: 'Twelve factorial', isHidden: true },
            { input: [13], expectedOutput: 6227020800, description: 'Thirteen factorial', isHidden: true },
            { input: [14], expectedOutput: 87178291200, description: 'Fourteen factorial', isHidden: true },
            { input: [15], expectedOutput: 1307674368000, description: 'Fifteen factorial', isHidden: true },
            { input: [16], expectedOutput: 20922789888000, description: 'Sixteen factorial', isHidden: true },
            { input: [17], expectedOutput: 355687428096000, description: 'Seventeen factorial', isHidden: true },
            { input: [18], expectedOutput: 6402373705728000, description: 'Eighteen factorial', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 11. FIBONACCI NUMBER  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Fibonacci Number',
        slug: 'fibonacci-number',
        description: `Given a non-negative integer \`n\`, return the \`n\`th Fibonacci number.\n\nThe Fibonacci sequence is defined as:\n- F(0) = 0\n- F(1) = 1\n- F(n) = F(n-1) + F(n-2) for n > 1`,
        difficulty: 'Easy',
        order: 11,
        category: 'Math',
        functionName: 'fibonacci',
        starterCode: `function fibonacci(n) {\n  // Write your solution here\n\n}`,
        solution: `function fibonacci(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}`,
        solutions: [
            {
                approach: 'Brute Force (Recursive)',
                explanation: 'Directly implement the definition: fib(n) = fib(n-1) + fib(n-2) with base cases fib(0)=0, fib(1)=1. O(2^n) time due to overlapping subproblems, O(n) stack space.',
                code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`
            },
            {
                approach: 'Optimal (Iterative)',
                explanation: 'Track the two previous values in variables and iterate from 2 to n. O(n) time, O(1) space. Avoids exponential overhead of naive recursion.',
                code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}`
            }
        ],
        examples: [
            { input: 'n = 6', output: '8', explanation: 'F(6) = F(5) + F(4) = 5 + 3 = 8' },
            { input: 'n = 0', output: '0', explanation: 'F(0) = 0 by definition' }
        ],
        constraints: ['0 <= n <= 30'],
        hints: ['Use an iterative approach with two variables to avoid exponential time.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [0], expectedOutput: 0, description: 'F(0) = 0' },
            { input: [1], expectedOutput: 1, description: 'F(1) = 1' },
            { input: [2], expectedOutput: 1, description: 'F(2) = 1' },
            { input: [6], expectedOutput: 8, description: 'F(6) = 8' },
            { input: [10], expectedOutput: 55, description: 'F(10) = 55' },
            // ── Hidden test cases (25) ──
            { input: [3], expectedOutput: 2, description: 'F(3) = 2', isHidden: true },
            { input: [4], expectedOutput: 3, description: 'F(4) = 3', isHidden: true },
            { input: [5], expectedOutput: 5, description: 'F(5) = 5', isHidden: true },
            { input: [7], expectedOutput: 13, description: 'F(7) = 13', isHidden: true },
            { input: [8], expectedOutput: 21, description: 'F(8) = 21', isHidden: true },
            { input: [9], expectedOutput: 34, description: 'F(9) = 34', isHidden: true },
            { input: [11], expectedOutput: 89, description: 'F(11) = 89', isHidden: true },
            { input: [12], expectedOutput: 144, description: 'F(12) = 144', isHidden: true },
            { input: [13], expectedOutput: 233, description: 'F(13) = 233', isHidden: true },
            { input: [14], expectedOutput: 377, description: 'F(14) = 377', isHidden: true },
            { input: [15], expectedOutput: 610, description: 'F(15) = 610', isHidden: true },
            { input: [16], expectedOutput: 987, description: 'F(16) = 987', isHidden: true },
            { input: [17], expectedOutput: 1597, description: 'F(17) = 1597', isHidden: true },
            { input: [18], expectedOutput: 2584, description: 'F(18) = 2584', isHidden: true },
            { input: [19], expectedOutput: 4181, description: 'F(19) = 4181', isHidden: true },
            { input: [20], expectedOutput: 6765, description: 'F(20) = 6765', isHidden: true },
            { input: [21], expectedOutput: 10946, description: 'F(21) = 10946', isHidden: true },
            { input: [22], expectedOutput: 17711, description: 'F(22) = 17711', isHidden: true },
            { input: [23], expectedOutput: 28657, description: 'F(23) = 28657', isHidden: true },
            { input: [24], expectedOutput: 46368, description: 'F(24) = 46368', isHidden: true },
            { input: [25], expectedOutput: 75025, description: 'F(25) = 75025', isHidden: true },
            { input: [26], expectedOutput: 121393, description: 'F(26) = 121393', isHidden: true },
            { input: [27], expectedOutput: 196418, description: 'F(27) = 196418', isHidden: true },
            { input: [28], expectedOutput: 317811, description: 'F(28) = 317811', isHidden: true },
            { input: [30], expectedOutput: 832040, description: 'F(30) = 832040', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 12. CHECK ANAGRAM  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Check Anagram',
        slug: 'check-anagram',
        description: `Given two strings \`s1\` and \`s2\`, return \`true\` if they are anagrams of each other, or \`false\` otherwise.\n\nTwo strings are anagrams if they contain the same characters with the same frequencies. The comparison should be case-insensitive.`,
        difficulty: 'Easy',
        order: 12,
        category: 'Strings',
        functionName: 'isAnagram',
        starterCode: `function isAnagram(s1, s2) {\n  // Write your solution here\n\n}`,
        solution: `function isAnagram(s1, s2) {\n  const normalize = s => s.toLowerCase().split('').sort().join('');\n  return normalize(s1) === normalize(s2);\n}`,
        solutions: [
            {
                approach: 'Brute Force (Sorting)',
                explanation: 'Convert both strings to lowercase, split into arrays, sort, and join back. Compare the sorted strings. O(n log n) time due to sorting, O(n) space.',
                code: `function isAnagram(s1, s2) {\n  const normalize = s => s.toLowerCase().split('').sort().join('');\n  return normalize(s1) === normalize(s2);\n}`
            },
            {
                approach: 'Optimal (Frequency Count)',
                explanation: 'If lengths differ, return false. Count character frequencies in a hash map for s1 (increment) and s2 (decrement). If any count is non-zero, not anagrams. O(n) time, O(k) space.',
                code: `function isAnagram(s1, s2) {\n  if (s1.length !== s2.length) return false;\n  const count = {};\n  const a = s1.toLowerCase(), b = s2.toLowerCase();\n  for (const c of a) count[c] = (count[c] || 0) + 1;\n  for (const c of b) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}`
            }
        ],
        examples: [
            { input: 's1 = "listen", s2 = "silent"', output: 'true', explanation: 'Both contain: e, i, l, n, s, t' },
            { input: 's1 = "hello", s2 = "world"', output: 'false', explanation: 'Different characters and frequencies.' }
        ],
        constraints: ['0 <= s1.length, s2.length <= 10^5', 'Strings consist of alphanumeric characters.'],
        hints: ['If lengths differ, they cannot be anagrams. Try counting character frequencies.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: ['listen', 'silent'], expectedOutput: true, description: 'Classic anagram pair' },
            { input: ['hello', 'world'], expectedOutput: false, description: 'Not anagrams' },
            { input: ['Anagram', 'Nagaram'], expectedOutput: true, description: 'Case-insensitive anagram' },
            { input: ['', ''], expectedOutput: true, description: 'Both empty strings' },
            { input: ['a', 'a'], expectedOutput: true, description: 'Single same character' },
            // ── Hidden test cases (25) ──
            { input: ['a', 'b'], expectedOutput: false, description: 'Single different characters', isHidden: true },
            { input: ['ab', 'ba'], expectedOutput: true, description: 'Two characters swapped', isHidden: true },
            { input: ['ab', 'a'], expectedOutput: false, description: 'Different lengths', isHidden: true },
            { input: ['abc', 'cba'], expectedOutput: true, description: 'Three characters reversed', isHidden: true },
            { input: ['abc', 'abd'], expectedOutput: false, description: 'One character different', isHidden: true },
            { input: ['aab', 'aba'], expectedOutput: true, description: 'Rearranged with duplicates', isHidden: true },
            { input: ['aab', 'bba'], expectedOutput: false, description: 'Different frequencies', isHidden: true },
            { input: ['Race', 'Care'], expectedOutput: true, description: 'Case-insensitive four letters', isHidden: true },
            { input: ['Triangle', 'Integral'], expectedOutput: true, description: 'Eight letter anagram', isHidden: true },
            { input: ['Apple', 'Papel'], expectedOutput: true, description: 'Five letter anagram', isHidden: true },
            { input: ['rat', 'car'], expectedOutput: false, description: 'Same length not anagram', isHidden: true },
            { input: ['aaaa', 'aaaa'], expectedOutput: true, description: 'All same characters', isHidden: true },
            { input: ['abcd', 'abce'], expectedOutput: false, description: 'Last char differs', isHidden: true },
            { input: ['xyz', 'zyx'], expectedOutput: true, description: 'Three chars reversed', isHidden: true },
            { input: ['Dormitory', 'DirtyRoom'], expectedOutput: true, description: 'Classic anagram phrase', isHidden: true },
            { input: ['aabb', 'bbaa'], expectedOutput: true, description: 'Double pairs swapped', isHidden: true },
            { input: ['12345', '54321'], expectedOutput: true, description: 'Numeric string anagram', isHidden: true },
            { input: ['123', '321'], expectedOutput: true, description: 'Three digit anagram', isHidden: true },
            { input: ['test', 'tset'], expectedOutput: true, description: 'Test word rearranged', isHidden: true },
            { input: ['Python', 'Java'], expectedOutput: false, description: 'Different language names', isHidden: true },
            { input: ['aA', 'Aa'], expectedOutput: true, description: 'Case swap pair', isHidden: true },
            { input: ['abcdef', 'fedcba'], expectedOutput: true, description: 'Six char reverse', isHidden: true },
            { input: ['', 'a'], expectedOutput: false, description: 'Empty vs non-empty', isHidden: true },
            { input: ['aabbcc', 'abcabc'], expectedOutput: true, description: 'Same frequencies different order', isHidden: true },
            { input: ['aaabbb', 'ababab'], expectedOutput: true, description: 'Interleaved pattern', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 13. SUM OF ARRAY  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Sum of Array',
        slug: 'sum-of-array',
        description: `Given an array of numbers \`nums\`, return the sum of all elements.\n\nIf the array is empty, return \`0\`.`,
        difficulty: 'Easy',
        order: 13,
        category: 'Arrays',
        functionName: 'sumArray',
        starterCode: `function sumArray(nums) {\n  // Write your solution here\n\n}`,
        solution: `function sumArray(nums) {\n  return nums.reduce((sum, num) => sum + num, 0);\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Initialize sum to 0. Loop through each element and add it to the sum. Return the final sum. O(n) time, O(1) space.',
                code: `function sumArray(nums) {\n  let sum = 0;\n  for (let i = 0; i < nums.length; i++) {\n    sum += nums[i];\n  }\n  return sum;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use Array.prototype.reduce() with initial value 0 to accumulate the sum. Concise, O(n) time, O(1) space.',
                code: `function sumArray(nums) {\n  return nums.reduce((sum, num) => sum + num, 0);\n}`
            }
        ],
        examples: [
            { input: 'nums = [1, 2, 3, 4, 5]', output: '15', explanation: '1 + 2 + 3 + 4 + 5 = 15' },
            { input: 'nums = [-1, -2, -3]', output: '-6', explanation: '-1 + (-2) + (-3) = -6' }
        ],
        constraints: ['0 <= nums.length <= 10^4', '-10^6 <= nums[i] <= 10^6'],
        hints: ['Use a loop or the reduce method to accumulate the sum.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 2, 3, 4, 5]], expectedOutput: 15, description: 'Sum of 1 to 5' },
            { input: [[-1, -2, -3]], expectedOutput: -6, description: 'All negative numbers' },
            { input: [[]], expectedOutput: 0, description: 'Empty array' },
            { input: [[42]], expectedOutput: 42, description: 'Single element' },
            { input: [[0, 0, 0, 0]], expectedOutput: 0, description: 'All zeros' },
            // ── Hidden test cases (25) ──
            { input: [[100]], expectedOutput: 100, description: 'Single large number', isHidden: true },
            { input: [[-100]], expectedOutput: -100, description: 'Single large negative', isHidden: true },
            { input: [[1, -1]], expectedOutput: 0, description: 'Cancel to zero', isHidden: true },
            { input: [[1, 1, 1, 1, 1]], expectedOutput: 5, description: 'All ones', isHidden: true },
            { input: [[-5, 5, -5, 5]], expectedOutput: 0, description: 'Alternating cancel', isHidden: true },
            { input: [[10, 20, 30]], expectedOutput: 60, description: 'Multiples of ten', isHidden: true },
            { input: [[1, 2, 3]], expectedOutput: 6, description: 'First three positives', isHidden: true },
            { input: [[100, 200, 300, 400]], expectedOutput: 1000, description: 'Hundreds sum to thousand', isHidden: true },
            { input: [[-10, -20, -30, -40]], expectedOutput: -100, description: 'Negative tens', isHidden: true },
            { input: [[0, 1]], expectedOutput: 1, description: 'Zero and one', isHidden: true },
            { input: [[999999, 1]], expectedOutput: 1000000, description: 'Large plus one', isHidden: true },
            { input: [[-999999, -1]], expectedOutput: -1000000, description: 'Large negative minus one', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expectedOutput: 55, description: 'Sum 1 to 10', isHidden: true },
            { input: [[50, -50, 100, -100]], expectedOutput: 0, description: 'Pairs cancel to zero', isHidden: true },
            { input: [[7, 7, 7]], expectedOutput: 21, description: 'Three sevens', isHidden: true },
            { input: [[1000, 2000, 3000, 4000, 5000]], expectedOutput: 15000, description: 'Thousands', isHidden: true },
            { input: [[0]], expectedOutput: 0, description: 'Single zero', isHidden: true },
            { input: [[5, -3, 8, -2, 1]], expectedOutput: 9, description: 'Mixed positive and negative', isHidden: true },
            { input: [[11, 22, 33, 44, 55]], expectedOutput: 165, description: 'Multiples of 11', isHidden: true },
            { input: [[-1, -1, -1, -1, -1]], expectedOutput: -5, description: 'All negative ones', isHidden: true },
            { input: [[2, 4, 6, 8]], expectedOutput: 20, description: 'Even numbers', isHidden: true },
            { input: [[1, 3, 5, 7, 9]], expectedOutput: 25, description: 'Odd numbers', isHidden: true },
            { input: [[100, -50, 25, -12, 6]], expectedOutput: 69, description: 'Decreasing magnitude', isHidden: true },
            { input: [[500000, 500000]], expectedOutput: 1000000, description: 'Two large halves', isHidden: true },
            { input: [[1, -2, 3, -4, 5, -6, 7]], expectedOutput: 4, description: 'Alternating with increasing', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 14. ROTATE ARRAY BY K  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Rotate Array by K',
        slug: 'rotate-array-by-k',
        description: `Given an array \`nums\` and a non-negative integer \`k\`, rotate the array to the right by \`k\` steps and return the result.\n\nFor example, \`[1,2,3,4,5]\` rotated right by 2 becomes \`[4,5,1,2,3]\`.`,
        difficulty: 'Easy',
        order: 14,
        category: 'Arrays',
        functionName: 'rotateArray',
        starterCode: `function rotateArray(nums, k) {\n  // Write your solution here\n\n}`,
        solution: `function rotateArray(nums, k) {\n  const n = nums.length;\n  if (n === 0) return [];\n  const shift = k % n;\n  return [...nums.slice(n - shift), ...nums.slice(0, n - shift)];\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Create a new array. Place each element at its rotated position (i + k) % n. O(n) time, O(n) space.',
                code: `function rotateArray(nums, k) {\n  const n = nums.length;\n  if (n === 0) return [];\n  const result = new Array(n);\n  for (let i = 0; i < n; i++) {\n    result[(i + k) % n] = nums[i];\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use slice to take the last k%n elements and prepend them before the first n-k elements. O(n) time, O(n) space.',
                code: `function rotateArray(nums, k) {\n  const n = nums.length;\n  if (n === 0) return [];\n  const shift = k % n;\n  return [...nums.slice(n - shift), ...nums.slice(0, n - shift)];\n}`
            }
        ],
        examples: [
            { input: 'nums = [1,2,3,4,5], k = 2', output: '[4,5,1,2,3]', explanation: 'Last 2 elements move to front.' },
            { input: 'nums = [1,2,3], k = 1', output: '[3,1,2]', explanation: 'Last element moves to front.' }
        ],
        constraints: ['0 <= nums.length <= 10^4', '0 <= k <= 10^5'],
        hints: ['Handle k greater than array length using k % n. Use slice to split and recombine.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [4, 5, 1, 2, 3], description: 'Rotate by 2' },
            { input: [[1, 2, 3], 1], expectedOutput: [3, 1, 2], description: 'Rotate by 1' },
            { input: [[1, 2, 3], 3], expectedOutput: [1, 2, 3], description: 'Rotate by array length' },
            { input: [[1], 5], expectedOutput: [1], description: 'Single element any k' },
            { input: [[1, 2, 3, 4, 5], 0], expectedOutput: [1, 2, 3, 4, 5], description: 'k = 0, no rotation' },
            // ── Hidden test cases (25) ──
            { input: [[], 3], expectedOutput: [], description: 'Empty array', isHidden: true },
            { input: [[1, 2], 1], expectedOutput: [2, 1], description: 'Two elements rotate by 1', isHidden: true },
            { input: [[1, 2], 2], expectedOutput: [1, 2], description: 'Two elements rotate by length', isHidden: true },
            { input: [[1, 2], 3], expectedOutput: [2, 1], description: 'k > length, wraps around', isHidden: true },
            { input: [[1, 2, 3, 4, 5], 5], expectedOutput: [1, 2, 3, 4, 5], description: 'k equals length', isHidden: true },
            { input: [[1, 2, 3, 4, 5], 7], expectedOutput: [4, 5, 1, 2, 3], description: 'k > length (7%5=2)', isHidden: true },
            { input: [[1, 2, 3, 4, 5], 10], expectedOutput: [1, 2, 3, 4, 5], description: 'k is double length', isHidden: true },
            { input: [[-1, -2, -3], 1], expectedOutput: [-3, -1, -2], description: 'Negative numbers', isHidden: true },
            { input: [[0, 0, 0], 2], expectedOutput: [0, 0, 0], description: 'All zeros', isHidden: true },
            { input: [[1, 2, 3, 4], 1], expectedOutput: [4, 1, 2, 3], description: 'Four elements by 1', isHidden: true },
            { input: [[1, 2, 3, 4], 2], expectedOutput: [3, 4, 1, 2], description: 'Four elements by 2', isHidden: true },
            { input: [[1, 2, 3, 4], 3], expectedOutput: [2, 3, 4, 1], description: 'Four elements by 3', isHidden: true },
            { input: [[10, 20, 30, 40, 50], 3], expectedOutput: [30, 40, 50, 10, 20], description: 'Tens rotated by 3', isHidden: true },
            { input: [[5, 5, 5, 5], 2], expectedOutput: [5, 5, 5, 5], description: 'All same values', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6], 3], expectedOutput: [4, 5, 6, 1, 2, 3], description: 'Even split rotation', isHidden: true },
            { input: [[100, 200], 0], expectedOutput: [100, 200], description: 'No rotation', isHidden: true },
            { input: [[7, 8, 9], 2], expectedOutput: [8, 9, 7], description: 'Three elements by 2', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7], 4], expectedOutput: [4, 5, 6, 7, 1, 2, 3], description: 'Seven elements by 4', isHidden: true },
            { input: [[-5, 10, -15, 20], 1], expectedOutput: [20, -5, 10, -15], description: 'Mixed signs rotate by 1', isHidden: true },
            { input: [[1, 2, 3, 4, 5], 4], expectedOutput: [2, 3, 4, 5, 1], description: 'Rotate by n-1', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], expectedOutput: [6, 7, 8, 9, 10, 1, 2, 3, 4, 5], description: 'Ten elements by half', isHidden: true },
            { input: [[3, 1, 4, 1, 5], 2], expectedOutput: [1, 5, 3, 1, 4], description: 'Pi digits rotated', isHidden: true },
            { input: [[99], 100], expectedOutput: [99], description: 'Single element large k', isHidden: true },
            { input: [[1, 2, 3], 6], expectedOutput: [1, 2, 3], description: 'k is double of length', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6], 1], expectedOutput: [6, 1, 2, 3, 4, 5], description: 'Six elements by 1', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 15. FIND MISSING NUMBER  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Find Missing Number',
        slug: 'find-missing-number',
        description: `Given an array containing \`n\` distinct numbers from the range \`[1, n+1]\`, find and return the one number that is missing.\n\nThe array has exactly \`n\` elements. Exactly one number from 1 to n+1 is absent.`,
        difficulty: 'Easy',
        order: 15,
        category: 'Arrays',
        functionName: 'findMissingNumber',
        starterCode: `function findMissingNumber(nums) {\n  // Write your solution here\n\n}`,
        solution: `function findMissingNumber(nums) {\n  const n = nums.length + 1;\n  const expectedSum = n * (n + 1) / 2;\n  const actualSum = nums.reduce((sum, num) => sum + num, 0);\n  return expectedSum - actualSum;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Sort the array and check each position from 1 to n+1. The first number missing from its expected position is the answer. O(n log n) time, O(1) extra space.',
                code: `function findMissingNumber(nums) {\n  nums.sort((a, b) => a - b);\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] !== i + 1) return i + 1;\n  }\n  return nums.length + 1;\n}`
            },
            {
                approach: 'Optimal (Math)',
                explanation: 'Calculate expected sum of 1 to n+1 using formula n*(n+1)/2, subtract actual sum. The difference is the missing number. O(n) time, O(1) space.',
                code: `function findMissingNumber(nums) {\n  const n = nums.length + 1;\n  const expectedSum = n * (n + 1) / 2;\n  const actualSum = nums.reduce((sum, num) => sum + num, 0);\n  return expectedSum - actualSum;\n}`
            }
        ],
        examples: [
            { input: 'nums = [1, 2, 4, 5]', output: '3', explanation: '3 is missing from [1, 2, 3, 4, 5].' },
            { input: 'nums = [2, 3, 4, 5]', output: '1', explanation: '1 is missing from [1, 2, 3, 4, 5].' }
        ],
        constraints: ['1 <= nums.length <= 10^4', 'All numbers are distinct.', 'Exactly one number from [1, n+1] is missing.'],
        hints: ['Sum of 1 to n is n*(n+1)/2. Compare expected sum with actual sum.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 2, 4, 5]], expectedOutput: 3, description: 'Missing from middle' },
            { input: [[2, 3, 4, 5]], expectedOutput: 1, description: 'Missing first number' },
            { input: [[1, 2, 3, 4]], expectedOutput: 5, description: 'Missing last number' },
            { input: [[1]], expectedOutput: 2, description: 'Range [1,2], missing 2' },
            { input: [[2]], expectedOutput: 1, description: 'Range [1,2], missing 1' },
            // ── Hidden test cases (25) ──
            { input: [[1, 3]], expectedOutput: 2, description: 'Range [1,3], missing 2', isHidden: true },
            { input: [[2, 3]], expectedOutput: 1, description: 'Range [1,3], missing 1', isHidden: true },
            { input: [[1, 2]], expectedOutput: 3, description: 'Range [1,3], missing 3', isHidden: true },
            { input: [[3, 1, 4, 5]], expectedOutput: 2, description: 'Unsorted, missing 2', isHidden: true },
            { input: [[5, 3, 1, 2]], expectedOutput: 4, description: 'Unsorted, missing 4', isHidden: true },
            { input: [[1, 2, 3, 5, 6]], expectedOutput: 4, description: 'Range [1,6], missing 4', isHidden: true },
            { input: [[2, 3, 4, 5, 6]], expectedOutput: 1, description: 'Range [1,6], missing 1', isHidden: true },
            { input: [[1, 2, 3, 4, 5]], expectedOutput: 6, description: 'Range [1,6], missing 6', isHidden: true },
            { input: [[1, 2, 3, 4, 6, 7]], expectedOutput: 5, description: 'Range [1,7], missing 5', isHidden: true },
            { input: [[7, 5, 3, 1, 2, 4]], expectedOutput: 6, description: 'Scrambled, missing 6', isHidden: true },
            { input: [[8, 6, 4, 2, 1, 3, 5]], expectedOutput: 7, description: 'Missing 7 of 8', isHidden: true },
            { input: [[1, 3, 4, 5, 6, 7, 8]], expectedOutput: 2, description: 'Missing 2 of 8', isHidden: true },
            { input: [[2, 4, 6, 1, 3, 5, 7, 8, 10]], expectedOutput: 9, description: 'Range [1,10], missing 9', isHidden: true },
            { input: [[10, 8, 6, 4, 2, 1, 3, 5, 7]], expectedOutput: 9, description: 'Reverse-ish, missing 9', isHidden: true },
            { input: [[2, 3, 4, 5, 6, 7, 8, 9, 10]], expectedOutput: 1, description: 'Range [1,10], missing 1', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9]], expectedOutput: 10, description: 'Range [1,10], missing 10', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 7, 8, 9, 10]], expectedOutput: 6, description: 'Missing 6 of 10', isHidden: true },
            { input: [[4, 2, 1, 3, 6, 7, 8]], expectedOutput: 5, description: 'Range [1,8], missing 5', isHidden: true },
            { input: [[3, 5, 1, 4]], expectedOutput: 2, description: 'Range [1,5], scrambled', isHidden: true },
            { input: [[1, 5, 3, 4]], expectedOutput: 2, description: 'Another scrambled missing 2', isHidden: true },
            { input: [[6, 4, 2, 1, 3]], expectedOutput: 5, description: 'Range [1,6], missing 5', isHidden: true },
            { input: [[1, 2, 4]], expectedOutput: 3, description: 'Range [1,4], missing 3', isHidden: true },
            { input: [[3, 2, 4]], expectedOutput: 1, description: 'Range [1,4], missing 1', isHidden: true },
            { input: [[1, 3, 4]], expectedOutput: 2, description: 'Range [1,4], missing 2', isHidden: true },
            { input: [[9, 7, 5, 3, 1, 2, 4, 6, 8, 10, 12, 11]], expectedOutput: 13, description: 'Range [1,13], missing last', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 16. MERGE TWO SORTED ARRAYS  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Merge Two Sorted Arrays',
        slug: 'merge-two-sorted-arrays',
        description: `Given two sorted arrays \`arr1\` and \`arr2\`, merge them into a single sorted array and return it.\n\nBoth input arrays are sorted in ascending order.`,
        difficulty: 'Easy',
        order: 16,
        category: 'Arrays',
        functionName: 'mergeSortedArrays',
        starterCode: `function mergeSortedArrays(arr1, arr2) {\n  // Write your solution here\n\n}`,
        solution: `function mergeSortedArrays(arr1, arr2) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < arr1.length && j < arr2.length) {\n    if (arr1[i] <= arr2[j]) result.push(arr1[i++]);\n    else result.push(arr2[j++]);\n  }\n  while (i < arr1.length) result.push(arr1[i++]);\n  while (j < arr2.length) result.push(arr2[j++]);\n  return result;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Concatenate both arrays and sort the result. O((n+m) log(n+m)) time, O(n+m) space.',
                code: `function mergeSortedArrays(arr1, arr2) {\n  return [...arr1, ...arr2].sort((a, b) => a - b);\n}`
            },
            {
                approach: 'Optimal (Two Pointers)',
                explanation: 'Use two pointers, one for each array. Compare elements at both pointers and push the smaller one. Continue until both arrays are exhausted. O(n+m) time, O(n+m) space.',
                code: `function mergeSortedArrays(arr1, arr2) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < arr1.length && j < arr2.length) {\n    if (arr1[i] <= arr2[j]) result.push(arr1[i++]);\n    else result.push(arr2[j++]);\n  }\n  while (i < arr1.length) result.push(arr1[i++]);\n  while (j < arr2.length) result.push(arr2[j++]);\n  return result;\n}`
            }
        ],
        examples: [
            { input: 'arr1 = [1,3,5], arr2 = [2,4,6]', output: '[1,2,3,4,5,6]', explanation: 'Elements interleave in sorted order.' },
            { input: 'arr1 = [1,2,3], arr2 = []', output: '[1,2,3]', explanation: 'One empty array returns the other.' }
        ],
        constraints: ['0 <= arr1.length, arr2.length <= 10^4', 'Both arrays are sorted in ascending order.'],
        hints: ['Use two pointers to compare front elements and build the merged array.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 3, 5], [2, 4, 6]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'Interleaving merge' },
            { input: [[1, 2, 3], []], expectedOutput: [1, 2, 3], description: 'Second array empty' },
            { input: [[], [1, 2, 3]], expectedOutput: [1, 2, 3], description: 'First array empty' },
            { input: [[], []], expectedOutput: [], description: 'Both empty' },
            { input: [[1], [2]], expectedOutput: [1, 2], description: 'Single elements' },
            // ── Hidden test cases (25) ──
            { input: [[2], [1]], expectedOutput: [1, 2], description: 'Single elements reversed', isHidden: true },
            { input: [[1, 1], [1, 1]], expectedOutput: [1, 1, 1, 1], description: 'All same elements', isHidden: true },
            { input: [[-3, -1], [-2, 0]], expectedOutput: [-3, -2, -1, 0], description: 'Negative numbers merge', isHidden: true },
            { input: [[1, 2, 3], [4, 5, 6]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'No interleaving needed', isHidden: true },
            { input: [[4, 5, 6], [1, 2, 3]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'Second array all smaller', isHidden: true },
            { input: [[1, 3, 5, 7], [2, 4, 6, 8]], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8], description: 'Perfect interleave', isHidden: true },
            { input: [[1, 5, 9], [2, 6, 10]], expectedOutput: [1, 2, 5, 6, 9, 10], description: 'Spaced interleave', isHidden: true },
            { input: [[-10, -5, 0], [5, 10]], expectedOutput: [-10, -5, 0, 5, 10], description: 'Negative and positive ranges', isHidden: true },
            { input: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]], expectedOutput: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], description: 'Identical arrays', isHidden: true },
            { input: [[0], [0]], expectedOutput: [0, 0], description: 'Both single zero', isHidden: true },
            { input: [[-100, 100], [0]], expectedOutput: [-100, 0, 100], description: 'Insert between extremes', isHidden: true },
            { input: [[1], [2, 3, 4, 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'One small, one large', isHidden: true },
            { input: [[1, 2, 3, 4], [5]], expectedOutput: [1, 2, 3, 4, 5], description: 'One large, one small', isHidden: true },
            { input: [[-5, -3, -1], [-4, -2, 0]], expectedOutput: [-5, -4, -3, -2, -1, 0], description: 'All negative interleave', isHidden: true },
            { input: [[10, 20, 30], [10, 20, 30]], expectedOutput: [10, 10, 20, 20, 30, 30], description: 'Duplicate values', isHidden: true },
            { input: [[1, 1, 1], [2, 2, 2]], expectedOutput: [1, 1, 1, 2, 2, 2], description: 'Repeated values no interleave', isHidden: true },
            { input: [[5], [5]], expectedOutput: [5, 5], description: 'Same single element', isHidden: true },
            { input: [[1, 100], [50]], expectedOutput: [1, 50, 100], description: 'Insert in gap', isHidden: true },
            { input: [[-1000, 0, 1000], [-500, 500]], expectedOutput: [-1000, -500, 0, 500, 1000], description: 'Wide range interleave', isHidden: true },
            { input: [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], description: 'Even and odd merge', isHidden: true },
            { input: [[1, 2, 3], [1]], expectedOutput: [1, 1, 2, 3], description: 'Duplicate at start', isHidden: true },
            { input: [[3], [1, 2, 3]], expectedOutput: [1, 2, 3, 3], description: 'Duplicate at end', isHidden: true },
            { input: [[-2, -1], [-2, -1]], expectedOutput: [-2, -2, -1, -1], description: 'Negative duplicates', isHidden: true },
            { input: [[0, 0, 0], [0, 0]], expectedOutput: [0, 0, 0, 0, 0], description: 'All zeros different lengths', isHidden: true },
            { input: [[1, 3, 5, 7, 9, 11], [2, 4]], expectedOutput: [1, 2, 3, 4, 5, 7, 9, 11], description: 'Uneven length interleave', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 17. FIND SECOND LARGEST  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Find Second Largest',
        slug: 'find-second-largest',
        description: `Given an array of numbers \`nums\` with at least two distinct values, return the second largest element.\n\nThe second largest is the largest value that is strictly less than the maximum.`,
        difficulty: 'Easy',
        order: 17,
        category: 'Arrays',
        functionName: 'findSecondLargest',
        starterCode: `function findSecondLargest(nums) {\n  // Write your solution here\n\n}`,
        solution: `function findSecondLargest(nums) {\n  let first = -Infinity, second = -Infinity;\n  for (const num of nums) {\n    if (num > first) {\n      second = first;\n      first = num;\n    } else if (num > second && num < first) {\n      second = num;\n    }\n  }\n  return second;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Sort the array in descending order. Find the first element that is strictly less than the maximum. O(n log n) time, O(n) space.',
                code: `function findSecondLargest(nums) {\n  const sorted = [...nums].sort((a, b) => b - a);\n  for (let i = 1; i < sorted.length; i++) {\n    if (sorted[i] < sorted[0]) return sorted[i];\n  }\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Track the two largest distinct values in a single pass. Update first and second as you find larger values. O(n) time, O(1) space.',
                code: `function findSecondLargest(nums) {\n  let first = -Infinity, second = -Infinity;\n  for (const num of nums) {\n    if (num > first) {\n      second = first;\n      first = num;\n    } else if (num > second && num < first) {\n      second = num;\n    }\n  }\n  return second;\n}`
            }
        ],
        examples: [
            { input: 'nums = [1, 2, 3, 4, 5]', output: '4', explanation: 'Max is 5, second largest is 4.' },
            { input: 'nums = [10, 10, 9, 8]', output: '9', explanation: 'Max is 10, second largest distinct value is 9.' }
        ],
        constraints: ['2 <= nums.length <= 10^4', 'At least two distinct values exist.'],
        hints: ['Track the largest and second largest values in a single pass.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 2, 3, 4, 5]], expectedOutput: 4, description: 'Ascending order' },
            { input: [[10, 10, 9, 8]], expectedOutput: 9, description: 'Duplicates of max' },
            { input: [[1, 2]], expectedOutput: 1, description: 'Minimum array size' },
            { input: [[-1, -2, -3]], expectedOutput: -2, description: 'All negative numbers' },
            { input: [[5, 1, 5, 2, 5]], expectedOutput: 2, description: 'Max repeated, second in middle' },
            // ── Hidden test cases (25) ──
            { input: [[5, 4, 3, 2, 1]], expectedOutput: 4, description: 'Descending order', isHidden: true },
            { input: [[2, 1]], expectedOutput: 1, description: 'Two elements ascending', isHidden: true },
            { input: [[1, 5]], expectedOutput: 1, description: 'Two elements, max at end', isHidden: true },
            { input: [[100, 99]], expectedOutput: 99, description: 'Large pair', isHidden: true },
            { input: [[99, 100]], expectedOutput: 99, description: 'Large pair reversed', isHidden: true },
            { input: [[3, 3, 3, 2]], expectedOutput: 2, description: 'Many dupes of max', isHidden: true },
            { input: [[-10, -20, -30]], expectedOutput: -20, description: 'Negative descending', isHidden: true },
            { input: [[-30, -20, -10]], expectedOutput: -20, description: 'Negative ascending', isHidden: true },
            { input: [[1, 1, 1, 1, 2]], expectedOutput: 1, description: 'Second largest is repeated', isHidden: true },
            { input: [[0, 1]], expectedOutput: 0, description: 'Zero and one', isHidden: true },
            { input: [[1, 0]], expectedOutput: 0, description: 'One and zero', isHidden: true },
            { input: [[-1, 0]], expectedOutput: -1, description: 'Negative and zero', isHidden: true },
            { input: [[1000000, 999999]], expectedOutput: 999999, description: 'Large numbers', isHidden: true },
            { input: [[5, 3, 1, 4, 2]], expectedOutput: 4, description: 'Random order', isHidden: true },
            { input: [[10, 20, 30, 40, 50]], expectedOutput: 40, description: 'Tens ascending', isHidden: true },
            { input: [[50, 40, 30, 20, 10]], expectedOutput: 40, description: 'Tens descending', isHidden: true },
            { input: [[7, 7, 8, 8]], expectedOutput: 7, description: 'Two pairs', isHidden: true },
            { input: [[1, 3, 5, 7, 9]], expectedOutput: 7, description: 'Odd numbers ascending', isHidden: true },
            { input: [[2, 4, 6, 8, 10]], expectedOutput: 8, description: 'Even numbers ascending', isHidden: true },
            { input: [[-5, -5, -4, -4, -3]], expectedOutput: -4, description: 'Negative with dupes', isHidden: true },
            { input: [[42, 17, 42, 35, 42]], expectedOutput: 35, description: 'Max appears multiple times', isHidden: true },
            { input: [[1, 2, 3, 3, 3]], expectedOutput: 2, description: 'Max at end repeated', isHidden: true },
            { input: [[100, 1, 2, 3, 4]], expectedOutput: 4, description: 'Max at start', isHidden: true },
            { input: [[1, 2, 3, 4, 100]], expectedOutput: 4, description: 'Max at end', isHidden: true },
            { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expectedOutput: 6, description: 'Pi digits', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 18. INTERSECTION OF TWO ARRAYS  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Intersection of Two Arrays',
        slug: 'intersection-of-two-arrays',
        description: `Given two arrays \`arr1\` and \`arr2\`, return an array of their unique common elements, sorted in ascending order.`,
        difficulty: 'Easy',
        order: 18,
        category: 'Arrays',
        functionName: 'arrayIntersection',
        starterCode: `function arrayIntersection(arr1, arr2) {\n  // Write your solution here\n\n}`,
        solution: `function arrayIntersection(arr1, arr2) {\n  const set2 = new Set(arr2);\n  return [...new Set(arr1)].filter(x => set2.has(x)).sort((a, b) => a - b);\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'For each unique element in arr1, check if it exists in arr2 using includes(). Collect matches into a result. Sort the result. O(n*m) time, O(min(n,m)) space.',
                code: `function arrayIntersection(arr1, arr2) {\n  const result = [];\n  const seen = new Set();\n  for (const val of arr1) {\n    if (!seen.has(val) && arr2.includes(val)) {\n      result.push(val);\n      seen.add(val);\n    }\n  }\n  return result.sort((a, b) => a - b);\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Convert arr2 to a Set. Filter unique elements of arr1 that exist in the Set. Sort the result. O(n + m) time for building sets + O(k log k) for sorting, O(n + m) space.',
                code: `function arrayIntersection(arr1, arr2) {\n  const set2 = new Set(arr2);\n  return [...new Set(arr1)].filter(x => set2.has(x)).sort((a, b) => a - b);\n}`
            }
        ],
        examples: [
            { input: 'arr1 = [1,2,2,3], arr2 = [2,3,4]', output: '[2, 3]', explanation: '2 and 3 are common to both.' },
            { input: 'arr1 = [1,2,3], arr2 = [4,5,6]', output: '[]', explanation: 'No common elements.' }
        ],
        constraints: ['0 <= arr1.length, arr2.length <= 10^4', 'Array elements are numbers.'],
        hints: ['Use a Set for O(1) lookups. Remember to return only unique common elements.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 2, 2, 3], [2, 3, 4]], expectedOutput: [2, 3], description: 'Overlapping with duplicates' },
            { input: [[1, 2, 3], [4, 5, 6]], expectedOutput: [], description: 'No intersection' },
            { input: [[], [1, 2, 3]], expectedOutput: [], description: 'First array empty' },
            { input: [[1, 2, 3], []], expectedOutput: [], description: 'Second array empty' },
            { input: [[1, 1, 1], [1, 1, 1]], expectedOutput: [1], description: 'All same elements' },
            // ── Hidden test cases (25) ──
            { input: [[], []], expectedOutput: [], description: 'Both empty', isHidden: true },
            { input: [[1], [1]], expectedOutput: [1], description: 'Single same element', isHidden: true },
            { input: [[1], [2]], expectedOutput: [], description: 'Single different elements', isHidden: true },
            { input: [[1, 2, 3], [1, 2, 3]], expectedOutput: [1, 2, 3], description: 'Identical arrays', isHidden: true },
            { input: [[3, 2, 1], [1, 2, 3]], expectedOutput: [1, 2, 3], description: 'Same elements different order', isHidden: true },
            { input: [[1, 2, 3, 4, 5], [3, 4, 5, 6, 7]], expectedOutput: [3, 4, 5], description: 'Partial overlap', isHidden: true },
            { input: [[-1, -2, -3], [-2, -3, -4]], expectedOutput: [-3, -2], description: 'Negative numbers', isHidden: true },
            { input: [[0, 1, 2], [0]], expectedOutput: [0], description: 'Zero is common', isHidden: true },
            { input: [[5, 5, 5, 5], [5]], expectedOutput: [5], description: 'Many dupes vs single', isHidden: true },
            { input: [[1, 3, 5, 7, 9], [2, 4, 6, 8, 10]], expectedOutput: [], description: 'Odds vs evens', isHidden: true },
            { input: [[10, 20, 30], [30, 20, 10]], expectedOutput: [10, 20, 30], description: 'Reversed order', isHidden: true },
            { input: [[1, 2, 3, 4], [2, 4]], expectedOutput: [2, 4], description: 'Subset intersection', isHidden: true },
            { input: [[100, 200, 300], [200]], expectedOutput: [200], description: 'Single common large value', isHidden: true },
            { input: [[-10, 0, 10], [-10, 10]], expectedOutput: [-10, 10], description: 'Extremes match', isHidden: true },
            { input: [[1, 2, 2, 3, 3, 3], [3, 3, 2, 2, 1, 1]], expectedOutput: [1, 2, 3], description: 'Heavy duplicates both sides', isHidden: true },
            { input: [[7], [7]], expectedOutput: [7], description: 'Both single same', isHidden: true },
            { input: [[1, 2], [2, 3]], expectedOutput: [2], description: 'One common element', isHidden: true },
            { input: [[5, 10, 15, 20], [10, 20, 30, 40]], expectedOutput: [10, 20], description: 'Two common elements', isHidden: true },
            { input: [[-5, -3, -1, 1, 3, 5], [-5, 0, 5]], expectedOutput: [-5, 5], description: 'Sparse overlap', isHidden: true },
            { input: [[1, 1, 2, 2], [2, 2, 3, 3]], expectedOutput: [2], description: 'Only one common value with dupes', isHidden: true },
            { input: [[99, 100], [1, 2, 3, 99, 100]], expectedOutput: [99, 100], description: 'Small arr1 in larger arr2', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [5]], expectedOutput: [5], description: 'Large vs single', isHidden: true },
            { input: [[-100, 0, 100], [-100, 0, 100]], expectedOutput: [-100, 0, 100], description: 'Wide range identical', isHidden: true },
            { input: [[2, 4, 6], [1, 3, 5, 7]], expectedOutput: [], description: 'Even vs odd no overlap', isHidden: true },
            { input: [[42, 17, 99, 5], [5, 42]], expectedOutput: [5, 42], description: 'Unordered with matches', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 19. CHUNK ARRAY  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Chunk Array',
        slug: 'chunk-array',
        description: `Given an array \`arr\` and a positive integer \`size\`, split the array into sub-arrays (chunks), each of length \`size\`. The last chunk may be smaller if there aren't enough elements.\n\nReturn an array of chunks.`,
        difficulty: 'Easy',
        order: 19,
        category: 'Arrays',
        functionName: 'chunkArray',
        starterCode: `function chunkArray(arr, size) {\n  // Write your solution here\n\n}`,
        solution: `function chunkArray(arr, size) {\n  const result = [];\n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate with an index and manually build each chunk by pushing elements one at a time. When a chunk reaches the desired size, start a new one. O(n) time, O(n) space.',
                code: `function chunkArray(arr, size) {\n  const result = [];\n  let chunk = [];\n  for (let i = 0; i < arr.length; i++) {\n    chunk.push(arr[i]);\n    if (chunk.length === size) {\n      result.push(chunk);\n      chunk = [];\n    }\n  }\n  if (chunk.length > 0) result.push(chunk);\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use a loop with step size equal to chunk size. Use slice(i, i+size) to extract each chunk. O(n) time, O(n) space.',
                code: `function chunkArray(arr, size) {\n  const result = [];\n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}`
            }
        ],
        examples: [
            { input: 'arr = [1, 2, 3, 4, 5], size = 2', output: '[[1,2],[3,4],[5]]', explanation: 'Last chunk has only 1 element.' },
            { input: 'arr = [1, 2, 3, 4], size = 2', output: '[[1,2],[3,4]]', explanation: 'Evenly divisible.' }
        ],
        constraints: ['0 <= arr.length <= 10^4', '1 <= size <= arr.length (or size >= 1 if arr is empty)'],
        hints: ['Loop with a step of size and use slice to extract each chunk.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [[1, 2], [3, 4], [5]], description: 'Uneven split' },
            { input: [[1, 2, 3, 4], 2], expectedOutput: [[1, 2], [3, 4]], description: 'Even split' },
            { input: [[1, 2, 3], 1], expectedOutput: [[1], [2], [3]], description: 'Chunk size 1' },
            { input: [[1, 2, 3], 5], expectedOutput: [[1, 2, 3]], description: 'Chunk size > array length' },
            { input: [[], 3], expectedOutput: [], description: 'Empty array' },
            // ── Hidden test cases (25) ──
            { input: [[1], 1], expectedOutput: [[1]], description: 'Single element, size 1', isHidden: true },
            { input: [[1, 2], 1], expectedOutput: [[1], [2]], description: 'Two elements, size 1', isHidden: true },
            { input: [[1, 2], 2], expectedOutput: [[1, 2]], description: 'Two elements, size 2', isHidden: true },
            { input: [[1, 2], 3], expectedOutput: [[1, 2]], description: 'Two elements, size 3', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6], 3], expectedOutput: [[1, 2, 3], [4, 5, 6]], description: 'Even split by 3', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7], 3], expectedOutput: [[1, 2, 3], [4, 5, 6], [7]], description: 'Uneven split by 3', isHidden: true },
            { input: [[1, 2, 3, 4, 5], 5], expectedOutput: [[1, 2, 3, 4, 5]], description: 'Chunk size equals length', isHidden: true },
            { input: [[1, 2, 3, 4, 5], 3], expectedOutput: [[1, 2, 3], [4, 5]], description: 'Two chunks, last smaller', isHidden: true },
            { input: [[10, 20, 30, 40, 50, 60], 2], expectedOutput: [[10, 20], [30, 40], [50, 60]], description: 'Tens in pairs', isHidden: true },
            { input: [[-1, -2, -3, -4], 2], expectedOutput: [[-1, -2], [-3, -4]], description: 'Negative numbers chunked', isHidden: true },
            { input: [[0, 0, 0, 0, 0], 2], expectedOutput: [[0, 0], [0, 0], [0]], description: 'Zeros chunked', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8], 4], expectedOutput: [[1, 2, 3, 4], [5, 6, 7, 8]], description: 'Two equal chunks of 4', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 4], expectedOutput: [[1, 2, 3, 4], [5, 6, 7, 8], [9]], description: 'Last chunk has 1 element', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3], expectedOutput: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]], description: 'Ten items by 3', isHidden: true },
            { input: [[5], 1], expectedOutput: [[5]], description: 'Single element size 1', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6], 6], expectedOutput: [[1, 2, 3, 4, 5, 6]], description: 'Size equals length', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6], 1], expectedOutput: [[1], [2], [3], [4], [5], [6]], description: 'Size 1 makes individual arrays', isHidden: true },
            { input: [[100, 200, 300], 2], expectedOutput: [[100, 200], [300]], description: 'Hundreds with remainder', isHidden: true },
            { input: [[-5, 0, 5, 10], 3], expectedOutput: [[-5, 0, 5], [10]], description: 'Mixed values chunked', isHidden: true },
            { input: [[1, 1, 1, 1, 1, 1], 2], expectedOutput: [[1, 1], [1, 1], [1, 1]], description: 'All same in pairs', isHidden: true },
            { input: [[7, 8, 9, 10, 11, 12, 13], 2], expectedOutput: [[7, 8], [9, 10], [11, 12], [13]], description: 'Seven odd items by 2', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8], 3], expectedOutput: [[1, 2, 3], [4, 5, 6], [7, 8]], description: 'Eight items by 3', isHidden: true },
            { input: [[42, 99], 1], expectedOutput: [[42], [99]], description: 'Two items by 1', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], expectedOutput: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], description: 'Ten items by 5', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10], expectedOutput: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], description: 'All in one chunk', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 20. COUNT OCCURRENCES  (30 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Count Occurrences',
        slug: 'count-occurrences',
        description: `Given a string \`s\`, return an object where each key is a character from the string and the value is the number of times it appears.\n\nIf the string is empty, return an empty object \`{}\`.`,
        difficulty: 'Easy',
        order: 20,
        category: 'Strings',
        functionName: 'countOccurrences',
        starterCode: `function countOccurrences(s) {\n  // Write your solution here\n\n}`,
        solution: `function countOccurrences(s) {\n  const count = {};\n  for (const char of s) {\n    count[char] = (count[char] || 0) + 1;\n  }\n  return count;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'For each unique character, count occurrences by iterating through the entire string. This has O(k*n) time where k is unique characters. O(k) space.',
                code: `function countOccurrences(s) {\n  const count = {};\n  for (let i = 0; i < s.length; i++) {\n    if (count[s[i]] === undefined) {\n      let c = 0;\n      for (let j = 0; j < s.length; j++) {\n        if (s[j] === s[i]) c++;\n      }\n      count[s[i]] = c;\n    }\n  }\n  return count;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Iterate once through the string. For each character, increment its count in a hash map. O(n) time, O(k) space where k is unique characters.',
                code: `function countOccurrences(s) {\n  const count = {};\n  for (const char of s) {\n    count[char] = (count[char] || 0) + 1;\n  }\n  return count;\n}`
            }
        ],
        examples: [
            { input: 's = "hello"', output: '{ h: 1, e: 1, l: 2, o: 1 }', explanation: 'l appears twice, all others once.' },
            { input: 's = "aaa"', output: '{ a: 3 }', explanation: 'Only one character repeated 3 times.' }
        ],
        constraints: ['0 <= s.length <= 10^5', 's consists of printable ASCII characters.'],
        hints: ['Use an object/map to track the count of each character as you iterate.'],
        testCases: [
            // ── Visible test cases (5) ──
            { input: ['hello'], expectedOutput: { h: 1, e: 1, l: 2, o: 1 }, description: 'Simple word' },
            { input: ['aaa'], expectedOutput: { a: 3 }, description: 'Single repeated char' },
            { input: [''], expectedOutput: {}, description: 'Empty string' },
            { input: ['abcabc'], expectedOutput: { a: 2, b: 2, c: 2 }, description: 'Repeated pattern' },
            { input: ['a'], expectedOutput: { a: 1 }, description: 'Single character' },
            // ── Hidden test cases (25) ──
            { input: ['ab'], expectedOutput: { a: 1, b: 1 }, description: 'Two different chars', isHidden: true },
            { input: ['aabb'], expectedOutput: { a: 2, b: 2 }, description: 'Consecutive pairs', isHidden: true },
            { input: ['abba'], expectedOutput: { a: 2, b: 2 }, description: 'Palindrome word', isHidden: true },
            { input: ['aaabbbccc'], expectedOutput: { a: 3, b: 3, c: 3 }, description: 'Three groups of three', isHidden: true },
            { input: ['abcdef'], expectedOutput: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 }, description: 'All unique chars', isHidden: true },
            { input: ['zzzzz'], expectedOutput: { z: 5 }, description: 'Five same chars', isHidden: true },
            { input: ['Hello'], expectedOutput: { H: 1, e: 1, l: 2, o: 1 }, description: 'Case-sensitive H vs h', isHidden: true },
            { input: ['aAbB'], expectedOutput: { a: 1, A: 1, b: 1, B: 1 }, description: 'Case-sensitive pairs', isHidden: true },
            { input: ['11223'], expectedOutput: { '1': 2, '2': 2, '3': 1 }, description: 'Numeric characters', isHidden: true },
            { input: ['hello world'], expectedOutput: { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }, description: 'With space', isHidden: true },
            { input: ['  '], expectedOutput: { ' ': 2 }, description: 'Two spaces', isHidden: true },
            { input: [' '], expectedOutput: { ' ': 1 }, description: 'Single space', isHidden: true },
            { input: ['!!!'], expectedOutput: { '!': 3 }, description: 'Repeated special char', isHidden: true },
            { input: ['AaAa'], expectedOutput: { A: 2, a: 2 }, description: 'Alternating case', isHidden: true },
            { input: ['abc123'], expectedOutput: { a: 1, b: 1, c: 1, '1': 1, '2': 1, '3': 1 }, description: 'Letters and digits', isHidden: true },
            { input: ['xxyyzzxyz'], expectedOutput: { x: 3, y: 3, z: 3 }, description: 'Mixed repeated chars', isHidden: true },
            { input: ['racecar'], expectedOutput: { r: 2, a: 2, c: 2, e: 1 }, description: 'Palindrome word racecar', isHidden: true },
            { input: ['Mississippi'], expectedOutput: { M: 1, i: 4, s: 4, p: 2 }, description: 'Mississippi', isHidden: true },
            { input: ['banana'], expectedOutput: { b: 1, a: 3, n: 2 }, description: 'Fruit name', isHidden: true },
            { input: ['JavaScript'], expectedOutput: { J: 1, a: 2, v: 1, S: 1, c: 1, r: 1, i: 1, p: 1, t: 1 }, description: 'Language name', isHidden: true },
            { input: ['aabbccdd'], expectedOutput: { a: 2, b: 2, c: 2, d: 2 }, description: 'Four pairs', isHidden: true },
            { input: ['xyzxyz'], expectedOutput: { x: 2, y: 2, z: 2 }, description: 'Double xyz', isHidden: true },
            { input: ['aeiou'], expectedOutput: { a: 1, e: 1, i: 1, o: 1, u: 1 }, description: 'All vowels', isHidden: true },
            { input: ['test case'], expectedOutput: { t: 2, e: 2, s: 2, ' ': 1, c: 1, a: 1 }, description: 'Two words', isHidden: true },
            { input: ['12321'], expectedOutput: { '1': 2, '2': 2, '3': 1 }, description: 'Numeric palindrome', isHidden: true },
        ]
    },
];

// ═══════════════════════════════════════════════════
// SEEDER FUNCTION
// ═══════════════════════════════════════════════════
async function seedCodingQuestions() {
    try {
        require('dotenv').config();

        await mongoose.connect(process.env.MONGO_URI);
        logger.info('Connected to MongoDB for seeding coding questions');

        // Clear existing coding questions
        await CodingQuestion.deleteMany({});
        logger.info('Cleared existing coding questions');

        // Clear related user progress and streaks (old data references deleted questions)
        await UserCodingProgress.deleteMany({});
        logger.info('Cleared existing user coding progress');

        await UserStreak.deleteMany({});
        logger.info('Cleared existing user streaks');

        // Insert all questions
        const result = await CodingQuestion.insertMany(codingQuestionsData);
        logger.info(`Successfully seeded ${result.length} coding questions`);

        // Log summary
        const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
        result.forEach(q => byDifficulty[q.difficulty]++);
        logger.info(`Breakdown — Easy: ${byDifficulty.Easy}, Medium: ${byDifficulty.Medium}, Hard: ${byDifficulty.Hard}`);

        // Log test case counts
        result.forEach(q => {
            const visible = q.testCases.filter(tc => !tc.isHidden).length;
            const hidden = q.testCases.filter(tc => tc.isHidden).length;
            logger.info(`  ${q.title}: ${q.testCases.length} test cases (${visible} visible, ${hidden} hidden)`);
        });

        await mongoose.disconnect();
        logger.info('Disconnected from MongoDB');

        process.exit(0);
    } catch (error) {
        logger.error('Error seeding coding questions:', error);
        process.exit(1);
    }
}

// Run seeder if called directly
if (require.main === module) {
    seedCodingQuestions();
}

module.exports = { codingQuestionsData, seedCodingQuestions };
