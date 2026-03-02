const mongoose = require('mongoose');
const CodingQuestion = require('../models/CodingQuestion');
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
