const mongoose = require('mongoose');
const CodingQuestion = require('../models/CodingQuestion');
const UserCodingProgress = require('../models/UserCodingProgress');
const UserStreak = require('../models/UserStreak');
const logger = require('../logger');

const codingQuestionsData = [
    // ═══════════════════════════════════════════════════
    // FUNCTIONS CATEGORY (1–5)
    // ═══════════════════════════════════════════════════

    // ───────────────────────────────────────────────────
    // 1. STRING COMBINATIONS  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'String Combinations',
        slug: 'string-combinations',
        description: `Write a JavaScript function that generates all possible combinations (contiguous substrings) of a given string.\n\nReturn the combinations as an array of strings in the order they appear when iterating from left to right, starting with each character and expanding rightward.\n\nFor example, for the string \`'dog'\`, the combinations are: \`'d'\`, \`'do'\`, \`'dog'\`, \`'o'\`, \`'og'\`, \`'g'\`.`,
        difficulty: 'Easy',
        order: 1,
        category: 'Functions',
        functionName: 'stringCombinations',
        starterCode: `function stringCombinations(str) {\n  // Write your solution here\n\n}`,
        solution: `function stringCombinations(str) {\n  const result = [];\n  for (let i = 0; i < str.length; i++) {\n    for (let j = i + 1; j <= str.length; j++) {\n      result.push(str.slice(i, j));\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use two nested loops. The outer loop picks a starting index, the inner loop picks an ending index. For each pair (i, j), extract the substring from index i to j. This generates all contiguous substrings in order. Time complexity is O(n²) for the loops, plus O(n) for each slice, giving O(n³) overall. Space is O(n²) for storing results.',
                code: `function stringCombinations(str) {\n  const result = [];\n  for (let i = 0; i < str.length; i++) {\n    for (let j = i + 1; j <= str.length; j++) {\n      result.push(str.slice(i, j));\n    }\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use two nested loops with string concatenation. The outer loop picks the starting character, the inner loop progressively appends the next character to build each combination. This avoids repeated slicing and is slightly more efficient in practice, though the asymptotic complexity remains O(n²) combinations.',
                code: `function stringCombinations(str) {\n  const result = [];\n  for (let i = 0; i < str.length; i++) {\n    let combo = '';\n    for (let j = i; j < str.length; j++) {\n      combo += str[j];\n      result.push(combo);\n    }\n  }\n  return result;\n}`
            }
        ],
        examples: [
            { input: 'str = "dog"', output: '["d", "do", "dog", "o", "og", "g"]', explanation: 'Starting from each character, expand rightward to generate all substrings.' },
            { input: 'str = "ab"', output: '["a", "ab", "b"]', explanation: 'Two characters produce 3 combinations.' }
        ],
        constraints: ['1 <= str.length <= 50', 'str consists of lowercase English letters.'],
        hints: ['Use two nested loops — the outer picks the start index, the inner expands the end index.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: ['dog'], expectedOutput: ['d', 'do', 'dog', 'o', 'og', 'g'], description: 'Three-letter word' },
            { input: ['ab'], expectedOutput: ['a', 'ab', 'b'], description: 'Two-letter string' },
            { input: ['a'], expectedOutput: ['a'], description: 'Single character' },
            // ── Hidden test cases (17) ──
            { input: ['abc'], expectedOutput: ['a', 'ab', 'abc', 'b', 'bc', 'c'], description: 'Three sequential letters', isHidden: true },
            { input: ['xy'], expectedOutput: ['x', 'xy', 'y'], description: 'Two characters xy', isHidden: true },
            { input: ['abcd'], expectedOutput: ['a', 'ab', 'abc', 'abcd', 'b', 'bc', 'bcd', 'c', 'cd', 'd'], description: 'Four-letter string', isHidden: true },
            { input: ['hi'], expectedOutput: ['h', 'hi', 'i'], description: 'Simple two-letter word', isHidden: true },
            { input: ['cat'], expectedOutput: ['c', 'ca', 'cat', 'a', 'at', 't'], description: 'Three-letter word cat', isHidden: true },
            { input: ['z'], expectedOutput: ['z'], description: 'Single character z', isHidden: true },
            { input: ['go'], expectedOutput: ['g', 'go', 'o'], description: 'Two-letter word go', isHidden: true },
            { input: ['code'], expectedOutput: ['c', 'co', 'cod', 'code', 'o', 'od', 'ode', 'd', 'de', 'e'], description: 'Four-letter word code', isHidden: true },
            { input: ['fun'], expectedOutput: ['f', 'fu', 'fun', 'u', 'un', 'n'], description: 'Three-letter word fun', isHidden: true },
            { input: ['aa'], expectedOutput: ['a', 'aa', 'a'], description: 'Repeated characters', isHidden: true },
            { input: ['aaa'], expectedOutput: ['a', 'aa', 'aaa', 'a', 'aa', 'a'], description: 'Three repeated characters', isHidden: true },
            { input: ['web'], expectedOutput: ['w', 'we', 'web', 'e', 'eb', 'b'], description: 'Three-letter word web', isHidden: true },
            { input: ['abcde'], expectedOutput: ['a', 'ab', 'abc', 'abcd', 'abcde', 'b', 'bc', 'bcd', 'bcde', 'c', 'cd', 'cde', 'd', 'de', 'e'], description: 'Five-letter string', isHidden: true },
            { input: ['no'], expectedOutput: ['n', 'no', 'o'], description: 'Two-letter word no', isHidden: true },
            { input: ['me'], expectedOutput: ['m', 'me', 'e'], description: 'Two-letter word me', isHidden: true },
            { input: ['sun'], expectedOutput: ['s', 'su', 'sun', 'u', 'un', 'n'], description: 'Three-letter word sun', isHidden: true },
            { input: ['js'], expectedOutput: ['j', 'js', 's'], description: 'Two-letter abbreviation js', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 2. SORT STRING ALPHABETICALLY  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Sort String Alphabetically',
        slug: 'sort-string-alphabetically',
        description: `Write a JavaScript function that returns a string with its letters sorted in alphabetical order.\n\nAssume punctuation and number symbols are not included in the passed string. The comparison should be case-insensitive for sorting, but the output should preserve the original case of each character.\n\nExample: \`'webmaster'\` → \`'abeemrstw'\``,
        difficulty: 'Easy',
        order: 2,
        category: 'Functions',
        functionName: 'sortString',
        starterCode: `function sortString(str) {\n  // Write your solution here\n\n}`,
        solution: `function sortString(str) {\n  return str.split('').sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join('');\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Convert the string to an array of characters, use a simple bubble sort or selection sort to arrange them alphabetically (case-insensitive comparison), then join back into a string. Time complexity O(n²), space O(n).',
                code: `function sortString(str) {\n  const arr = str.split('');\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i].toLowerCase() > arr[j].toLowerCase()) {\n        [arr[i], arr[j]] = [arr[j], arr[i]];\n      }\n    }\n  }\n  return arr.join('');\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Split the string into an array, use the built-in sort() with a case-insensitive comparator using localeCompare(), then join back. Time complexity O(n log n), space O(n).',
                code: `function sortString(str) {\n  return str.split('').sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join('');\n}`
            }
        ],
        examples: [
            { input: 'str = "webmaster"', output: '"abeemrstw"', explanation: 'Letters sorted alphabetically: a, b, e, e, m, r, s, t, w' },
            { input: 'str = "javascript"', output: '"aacijprstv"', explanation: 'Letters sorted: a, a, c, i, j, p, r, s, t, v' }
        ],
        constraints: ['0 <= str.length <= 1000', 'str contains only English letters (no punctuation or numbers).'],
        hints: ['Split the string into an array, sort it, and join it back.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: ['webmaster'], expectedOutput: 'abeemrstw', description: 'Standard word webmaster' },
            { input: ['javascript'], expectedOutput: 'aacijprstv', description: 'Language name sorted' },
            { input: ['hello'], expectedOutput: 'ehllo', description: 'Simple word hello' },
            // ── Hidden test cases (17) ──
            { input: ['a'], expectedOutput: 'a', description: 'Single character', isHidden: true },
            { input: ['ba'], expectedOutput: 'ab', description: 'Two characters reversed', isHidden: true },
            { input: ['abc'], expectedOutput: 'abc', description: 'Already sorted', isHidden: true },
            { input: ['cba'], expectedOutput: 'abc', description: 'Reverse sorted', isHidden: true },
            { input: ['banana'], expectedOutput: 'aaabnn', description: 'Repeated characters banana', isHidden: true },
            { input: ['zzz'], expectedOutput: 'zzz', description: 'All same characters', isHidden: true },
            { input: ['dcba'], expectedOutput: 'abcd', description: 'Four chars reverse order', isHidden: true },
            { input: ['programming'], expectedOutput: 'aggimmnoprrr', description: 'Word with repeated letters', isHidden: true },
            { input: [''], expectedOutput: '', description: 'Empty string', isHidden: true },
            { input: ['zyxwvutsrqponmlkjihgfedcba'], expectedOutput: 'abcdefghijklmnopqrstuvwxyz', description: 'Full reverse alphabet', isHidden: true },
            { input: ['abcdefghijklmnopqrstuvwxyz'], expectedOutput: 'abcdefghijklmnopqrstuvwxyz', description: 'Full sorted alphabet', isHidden: true },
            { input: ['aabbcc'], expectedOutput: 'aabbcc', description: 'Paired letters already sorted', isHidden: true },
            { input: ['ccbbaa'], expectedOutput: 'aabbcc', description: 'Paired letters reverse sorted', isHidden: true },
            { input: ['test'], expectedOutput: 'estt', description: 'Word test sorted', isHidden: true },
            { input: ['apple'], expectedOutput: 'aelpp', description: 'Word apple sorted', isHidden: true },
            { input: ['sort'], expectedOutput: 'orst', description: 'Word sort sorted', isHidden: true },
            { input: ['function'], expectedOutput: 'cfinnotu', description: 'Word function sorted', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 3. CAPITALIZE FIRST LETTER OF EACH WORD  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Capitalize First Letter of Each Word',
        slug: 'capitalize-first-letter-of-each-word',
        description: `Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word into upper case.\n\nA word is defined as a sequence of non-space characters separated by spaces. Preserve all spacing exactly as in the original.\n\nExample: \`'the quick brown fox'\` → \`'The Quick Brown Fox'\``,
        difficulty: 'Easy',
        order: 3,
        category: 'Functions',
        functionName: 'capitalizeFirstLetter',
        starterCode: `function capitalizeFirstLetter(str) {\n  // Write your solution here\n\n}`,
        solution: `function capitalizeFirstLetter(str) {\n  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate through each character. If the character is the first in the string or follows a space, convert it to uppercase. Build the result string character by character. O(n) time, O(n) space.',
                code: `function capitalizeFirstLetter(str) {\n  let result = '';\n  let capitalizeNext = true;\n  for (let i = 0; i < str.length; i++) {\n    if (str[i] === ' ') {\n      result += ' ';\n      capitalizeNext = true;\n    } else {\n      result += capitalizeNext ? str[i].toUpperCase() : str[i];\n      capitalizeNext = false;\n    }\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Split the string by spaces, capitalize the first character of each word using charAt(0).toUpperCase() + slice(1), then join back with spaces. O(n) time, O(n) space.',
                code: `function capitalizeFirstLetter(str) {\n  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');\n}`
            }
        ],
        examples: [
            { input: 'str = "the quick brown fox"', output: '"The Quick Brown Fox"', explanation: 'First letter of each word capitalized.' },
            { input: 'str = "hello world"', output: '"Hello World"', explanation: 'h → H, w → W' }
        ],
        constraints: ['0 <= str.length <= 10^5', 'str consists of printable ASCII characters.'],
        hints: ['Split the string by spaces, capitalize the first character of each word, then join.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: ['the quick brown fox'], expectedOutput: 'The Quick Brown Fox', description: 'Classic sentence' },
            { input: ['hello world'], expectedOutput: 'Hello World', description: 'Two simple words' },
            { input: ['javascript is fun'], expectedOutput: 'Javascript Is Fun', description: 'Three words' },
            // ── Hidden test cases (17) ──
            { input: ['a'], expectedOutput: 'A', description: 'Single character', isHidden: true },
            { input: ['hello'], expectedOutput: 'Hello', description: 'Single word', isHidden: true },
            { input: [''], expectedOutput: '', description: 'Empty string', isHidden: true },
            { input: ['HELLO WORLD'], expectedOutput: 'HELLO WORLD', description: 'Already uppercase', isHidden: true },
            { input: ['a b c d e'], expectedOutput: 'A B C D E', description: 'Single character words', isHidden: true },
            { input: ['i love coding'], expectedOutput: 'I Love Coding', description: 'Three common words', isHidden: true },
            { input: ['this is a test'], expectedOutput: 'This Is A Test', description: 'Four words', isHidden: true },
            { input: ['mixed CASE words HERE'], expectedOutput: 'Mixed CASE Words HERE', description: 'Mixed case words', isHidden: true },
            { input: ['one two three four five'], expectedOutput: 'One Two Three Four Five', description: 'Five words', isHidden: true },
            { input: ['good morning everyone'], expectedOutput: 'Good Morning Everyone', description: 'Greeting', isHidden: true },
            { input: ['node js react vue'], expectedOutput: 'Node Js React Vue', description: 'Tech words', isHidden: true },
            { input: ['apple banana cherry'], expectedOutput: 'Apple Banana Cherry', description: 'Fruit names', isHidden: true },
            { input: ['to be or not to be'], expectedOutput: 'To Be Or Not To Be', description: 'Shakespeare quote', isHidden: true },
            { input: ['cat dog bird fish'], expectedOutput: 'Cat Dog Bird Fish', description: 'Animal names', isHidden: true },
            { input: ['x'], expectedOutput: 'X', description: 'Single lowercase letter', isHidden: true },
            { input: ['hi there friend'], expectedOutput: 'Hi There Friend', description: 'Three word greeting', isHidden: true },
            { input: ['web development tutorial'], expectedOutput: 'Web Development Tutorial', description: 'Tech tutorial phrase', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 4. FIND LONGEST WORD  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Find Longest Word',
        slug: 'find-longest-word',
        description: `Write a JavaScript function that accepts a string as a parameter and finds the longest word within the string.\n\nA word is defined as a sequence of non-space characters separated by spaces. If there are multiple words with the same maximum length, return the first one.\n\nExample: \`'Web Development Tutorial'\` → \`'Development'\``,
        difficulty: 'Easy',
        order: 4,
        category: 'Functions',
        functionName: 'findLongestWord',
        starterCode: `function findLongestWord(str) {\n  // Write your solution here\n\n}`,
        solution: `function findLongestWord(str) {\n  const words = str.split(' ');\n  let longest = '';\n  for (const word of words) {\n    if (word.length > longest.length) {\n      longest = word;\n    }\n  }\n  return longest;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Split the string by spaces into an array of words. Iterate through all words and track the longest by comparing lengths. Return the first word with the maximum length. O(n) time, O(n) space for storing the words array.',
                code: `function findLongestWord(str) {\n  const words = str.split(' ');\n  let longest = '';\n  for (let i = 0; i < words.length; i++) {\n    if (words[i].length > longest.length) {\n      longest = words[i];\n    }\n  }\n  return longest;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Split the string by spaces and use reduce() to find the longest word in a single pass. Compare lengths and keep the longer one. O(n) time, O(n) space.',
                code: `function findLongestWord(str) {\n  return str.split(' ').reduce((longest, current) => current.length > longest.length ? current : longest, '');\n}`
            }
        ],
        examples: [
            { input: 'str = "Web Development Tutorial"', output: '"Development"', explanation: 'Development has 11 characters, the longest.' },
            { input: 'str = "the quick brown fox"', output: '"quick"', explanation: 'quick has 5 characters, longer than the, brown (5), and fox (3). quick appears first among 5-letter words.' }
        ],
        constraints: ['1 <= str.length <= 10^5', 'str consists of English letters and spaces.', 'str contains at least one word.'],
        hints: ['Split the string by spaces and compare the length of each word.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: ['Web Development Tutorial'], expectedOutput: 'Development', description: 'Development is longest' },
            { input: ['the quick brown fox'], expectedOutput: 'quick', description: 'quick is first longest word' },
            { input: ['hello'], expectedOutput: 'hello', description: 'Single word' },
            // ── Hidden test cases (17) ──
            { input: ['a b c d e'], expectedOutput: 'a', description: 'All single-char words, return first', isHidden: true },
            { input: ['I love JavaScript programming'], expectedOutput: 'programming', description: 'Last word is longest', isHidden: true },
            { input: ['cat'], expectedOutput: 'cat', description: 'Single three-letter word', isHidden: true },
            { input: ['short longerword'], expectedOutput: 'longerword', description: 'Second word is longer', isHidden: true },
            { input: ['longerword short'], expectedOutput: 'longerword', description: 'First word is longer', isHidden: true },
            { input: ['ab cd ef gh'], expectedOutput: 'ab', description: 'All two-letter words, return first', isHidden: true },
            { input: ['find the longest word here'], expectedOutput: 'longest', description: 'Middle word is longest', isHidden: true },
            { input: ['technology innovation creativity'], expectedOutput: 'creativity', description: 'Last word wins by one char', isHidden: true },
            { input: ['apple banana cherry'], expectedOutput: 'banana', description: 'banana and cherry both 6, banana first', isHidden: true },
            { input: ['one two three four five six seven eight nine ten'], expectedOutput: 'three', description: 'three and seven and eight are 5 chars, three first', isHidden: true },
            { input: ['supercalifragilisticexpialidocious is a word'], expectedOutput: 'supercalifragilisticexpialidocious', description: 'Very long first word', isHidden: true },
            { input: ['x'], expectedOutput: 'x', description: 'Single character string', isHidden: true },
            { input: ['to be or not to be that is the question'], expectedOutput: 'question', description: 'Last word is longest in quote', isHidden: true },
            { input: ['coding is awesome'], expectedOutput: 'awesome', description: 'awesome is longest', isHidden: true },
            { input: ['equal equal'], expectedOutput: 'equal', description: 'Two equal words return first', isHidden: true },
            { input: ['a bb ccc dddd eeeee'], expectedOutput: 'eeeee', description: 'Increasing length words', isHidden: true },
            { input: ['eeeee dddd ccc bb a'], expectedOutput: 'eeeee', description: 'Decreasing length words', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 5. COUNT VOWELS  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Count Vowels',
        slug: 'count-vowels-in-string',
        description: `Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string.\n\nVowels are: \`a\`, \`e\`, \`i\`, \`o\`, \`u\` (both uppercase and lowercase).\n\n**Note:** The letter \`'y'\` is **not** counted as a vowel.\n\nExample: \`'The quick brown fox'\` → \`5\``,
        difficulty: 'Easy',
        order: 5,
        category: 'Functions',
        functionName: 'countVowels',
        starterCode: `function countVowels(str) {\n  // Write your solution here\n\n}`,
        solution: `function countVowels(str) {\n  const vowels = 'aeiouAEIOU';\n  let count = 0;\n  for (const char of str) {\n    if (vowels.includes(char)) count++;\n  }\n  return count;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate through each character of the string. For each character, convert it to lowercase and check if it matches any of the five vowels (a, e, i, o, u). Increment a counter on match. O(n) time, O(1) space.',
                code: `function countVowels(str) {\n  let count = 0;\n  for (let i = 0; i < str.length; i++) {\n    const c = str[i].toLowerCase();\n    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') {\n      count++;\n    }\n  }\n  return count;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use a regex to match all vowels globally and case-insensitively. Return the length of the match array, or 0 if no matches. O(n) time, O(k) space where k is the vowel count.',
                code: `function countVowels(str) {\n  const matches = str.match(/[aeiou]/gi);\n  return matches ? matches.length : 0;\n}`
            }
        ],
        examples: [
            { input: 'str = "The quick brown fox"', output: '5', explanation: 'Vowels: e, u, i, o, o → 5 vowels' },
            { input: 'str = "hello"', output: '2', explanation: 'Vowels: e, o → 2 vowels' }
        ],
        constraints: ['0 <= str.length <= 10^5', 'str consists of printable ASCII characters.', 'The letter y is not counted as a vowel.'],
        hints: ['Check each character against the set of vowels: a, e, i, o, u (case-insensitive). Do not count y.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: ['The quick brown fox'], expectedOutput: 5, description: 'Classic sentence with 5 vowels' },
            { input: ['hello'], expectedOutput: 2, description: 'Simple word: e, o' },
            { input: ['aeiou'], expectedOutput: 5, description: 'All lowercase vowels' },
            // ── Hidden test cases (17) ──
            { input: [''], expectedOutput: 0, description: 'Empty string', isHidden: true },
            { input: ['bcdfg'], expectedOutput: 0, description: 'No vowels at all', isHidden: true },
            { input: ['AEIOU'], expectedOutput: 5, description: 'All uppercase vowels', isHidden: true },
            { input: ['a'], expectedOutput: 1, description: 'Single vowel', isHidden: true },
            { input: ['b'], expectedOutput: 0, description: 'Single consonant', isHidden: true },
            { input: ['rhythm'], expectedOutput: 0, description: 'Word with no vowels (y not counted)', isHidden: true },
            { input: ['yellow'], expectedOutput: 2, description: 'y not counted, only e and o', isHidden: true },
            { input: ['syzygy'], expectedOutput: 0, description: 'Word with only y vowels — not counted', isHidden: true },
            { input: ['education'], expectedOutput: 5, description: 'Word with 5 vowels: e, u, a, i, o', isHidden: true },
            { input: ['JavaScript'], expectedOutput: 3, description: 'Mixed case: a, a, i', isHidden: true },
            { input: ['aaa'], expectedOutput: 3, description: 'Repeated single vowel', isHidden: true },
            { input: ['12345'], expectedOutput: 0, description: 'Numeric string, no vowels', isHidden: true },
            { input: ['AeIoU'], expectedOutput: 5, description: 'Mixed case vowels', isHidden: true },
            { input: ['Queue'], expectedOutput: 4, description: 'Queue: u, e, u, e', isHidden: true },
            { input: ['strengths'], expectedOutput: 1, description: 'Long word with 1 vowel: e', isHidden: true },
            { input: ['why try fly dry'], expectedOutput: 0, description: 'All words have only y — 0 vowels', isHidden: true },
            { input: ['United States of America'], expectedOutput: 10, description: 'Country name with many vowels', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 6. CHECK PRIME USING RECURSION  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Check Prime Using Recursion',
        slug: 'check-prime-using-recursion',
        description: `Write a JavaScript function that accepts a number as a parameter and checks whether it is prime or not using recursion.\n\nA prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.\n\nReturn \`true\` if the number is prime, \`false\` otherwise.`,
        difficulty: 'Easy',
        order: 6,
        category: 'Functions',
        functionName: 'isPrime',
        starterCode: `function isPrime(n) {\n  // Write your solution here\n  // Use recursion to check if n is prime\n\n}`,
        solution: `function isPrime(n, divisor = 2) {\n  if (n <= 1) return false;\n  if (divisor * divisor > n) return true;\n  if (n % divisor === 0) return false;\n  return isPrime(n, divisor + 1);\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use a recursive helper that checks divisibility starting from 2. If n is divisible by the current divisor, it is not prime. If the divisor squared exceeds n, no more factors are possible, so n is prime. Base cases: n <= 1 is not prime. O(√n) time, O(√n) stack space.',
                code: `function isPrime(n, divisor = 2) {\n  if (n <= 1) return false;\n  if (divisor * divisor > n) return true;\n  if (n % divisor === 0) return false;\n  return isPrime(n, divisor + 1);\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Same recursive approach but with an optimization: check divisibility by 2 first, then only check odd divisors starting from 3. This halves the number of recursive calls. O(√n) time, O(√n) stack space.',
                code: `function isPrime(n, divisor = 2) {\n  if (n <= 1) return false;\n  if (n <= 3) return true;\n  if (n % 2 === 0) return false;\n  if (divisor === 2) return isPrime(n, 3);\n  if (divisor * divisor > n) return true;\n  if (n % divisor === 0) return false;\n  return isPrime(n, divisor + 2);\n}`
            }
        ],
        examples: [
            { input: 'n = 7', output: 'true', explanation: '7 is only divisible by 1 and 7, so it is prime.' },
            { input: 'n = 10', output: 'false', explanation: '10 is divisible by 2 and 5, so it is not prime.' }
        ],
        constraints: ['0 <= n <= 10000', 'n is a non-negative integer.'],
        hints: ['A number is prime if it has no divisors between 2 and √n.', 'Use a default parameter to track the current divisor in recursion.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [7], expectedOutput: true, description: '7 is prime' },
            { input: [10], expectedOutput: false, description: '10 is not prime (2×5)' },
            { input: [2], expectedOutput: true, description: '2 is the smallest prime' },
            // ── Hidden test cases (17) ──
            { input: [0], expectedOutput: false, description: '0 is not prime', isHidden: true },
            { input: [1], expectedOutput: false, description: '1 is not prime', isHidden: true },
            { input: [3], expectedOutput: true, description: '3 is prime', isHidden: true },
            { input: [4], expectedOutput: false, description: '4 is not prime (2×2)', isHidden: true },
            { input: [5], expectedOutput: true, description: '5 is prime', isHidden: true },
            { input: [6], expectedOutput: false, description: '6 is not prime (2×3)', isHidden: true },
            { input: [11], expectedOutput: true, description: '11 is prime', isHidden: true },
            { input: [13], expectedOutput: true, description: '13 is prime', isHidden: true },
            { input: [15], expectedOutput: false, description: '15 is not prime (3×5)', isHidden: true },
            { input: [17], expectedOutput: true, description: '17 is prime', isHidden: true },
            { input: [20], expectedOutput: false, description: '20 is not prime', isHidden: true },
            { input: [23], expectedOutput: true, description: '23 is prime', isHidden: true },
            { input: [25], expectedOutput: false, description: '25 is not prime (5×5)', isHidden: true },
            { input: [29], expectedOutput: true, description: '29 is prime', isHidden: true },
            { input: [49], expectedOutput: false, description: '49 is not prime (7×7)', isHidden: true },
            { input: [97], expectedOutput: true, description: '97 is prime (largest 2-digit prime)', isHidden: true },
            { input: [100], expectedOutput: false, description: '100 is not prime', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 7. FIND SECOND LOWEST AND GREATEST  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Find Second Lowest and Greatest',
        slug: 'find-second-lowest-and-greatest',
        description: `Write a JavaScript function that takes an array of numbers and finds the second lowest and second greatest numbers, respectively.\n\nReturn them as an array \`[secondLowest, secondGreatest]\`.\n\nExample: \`[1, 2, 3, 4, 5]\` → \`[2, 4]\``,
        difficulty: 'Easy',
        order: 7,
        category: 'Functions',
        functionName: 'secondLowestGreatest',
        starterCode: `function secondLowestGreatest(arr) {\n  // Write your solution here\n\n}`,
        solution: `function secondLowestGreatest(arr) {\n  const sorted = [...arr].sort((a, b) => a - b);\n  return [sorted[1], sorted[sorted.length - 2]];\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Sort a copy of the array in ascending order. The second lowest is at index 1 and the second greatest is at index length - 2. O(n log n) time due to sorting, O(n) space for the copy.',
                code: `function secondLowestGreatest(arr) {\n  const sorted = [...arr].sort((a, b) => a - b);\n  return [sorted[1], sorted[sorted.length - 2]];\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Track the two smallest and two largest values in a single pass through the array. Initialize with Infinity/-Infinity and update as you go. O(n) time, O(1) space.',
                code: `function secondLowestGreatest(arr) {\n  let min1 = Infinity, min2 = Infinity;\n  let max1 = -Infinity, max2 = -Infinity;\n  for (const num of arr) {\n    if (num <= min1) { min2 = min1; min1 = num; }\n    else if (num < min2) { min2 = num; }\n    if (num >= max1) { max2 = max1; max1 = num; }\n    else if (num > max2) { max2 = num; }\n  }\n  return [min2, max2];\n}`
            }
        ],
        examples: [
            { input: 'arr = [1, 2, 3, 4, 5]', output: '[2, 4]', explanation: 'Sorted: [1,2,3,4,5]. Second lowest = 2, second greatest = 4.' },
            { input: 'arr = [10, 20, 30]', output: '[20, 20]', explanation: 'Sorted: [10,20,30]. Second lowest = 20, second greatest = 20.' }
        ],
        constraints: ['2 <= arr.length <= 10^4', '-10^6 <= arr[i] <= 10^6'],
        hints: ['Sort the array and pick the element at index 1 and index length - 2.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [[1, 2, 3, 4, 5]], expectedOutput: [2, 4], description: 'Simple ascending array' },
            { input: [[10, 20, 30]], expectedOutput: [20, 20], description: 'Three elements, second is both' },
            { input: [[5, 1, 4, 2, 3]], expectedOutput: [2, 4], description: 'Unsorted array' },
            // ── Hidden test cases (17) ──
            { input: [[1, 2]], expectedOutput: [2, 1], description: 'Two elements', isHidden: true },
            { input: [[5, 5, 5, 5]], expectedOutput: [5, 5], description: 'All same elements', isHidden: true },
            { input: [[-5, -3, -1, 0, 2]], expectedOutput: [-3, 0], description: 'Negative and positive mix', isHidden: true },
            { input: [[100, 200, 300, 400, 500]], expectedOutput: [200, 400], description: 'Hundreds ascending', isHidden: true },
            { input: [[500, 400, 300, 200, 100]], expectedOutput: [200, 400], description: 'Hundreds descending', isHidden: true },
            { input: [[1, 1, 2, 3, 4]], expectedOutput: [1, 3], description: 'Duplicate at start', isHidden: true },
            { input: [[1, 2, 3, 4, 4]], expectedOutput: [2, 4], description: 'Duplicate at end', isHidden: true },
            { input: [[-10, -20, -30]], expectedOutput: [-20, -20], description: 'All negative numbers', isHidden: true },
            { input: [[0, 0, 1, 1]], expectedOutput: [0, 1], description: 'Two pairs of duplicates', isHidden: true },
            { input: [[3, 1]], expectedOutput: [3, 1], description: 'Two elements descending', isHidden: true },
            { input: [[7, 3, 9, 1, 5]], expectedOutput: [3, 7], description: 'Random order five elements', isHidden: true },
            { input: [[10, 10, 20, 20, 30, 30]], expectedOutput: [10, 30], description: 'Paired duplicates', isHidden: true },
            { input: [[-1, 0, 1]], expectedOutput: [0, 0], description: 'Three elements around zero', isHidden: true },
            { input: [[42, 17, 93, 5, 68]], expectedOutput: [17, 68], description: 'Random values', isHidden: true },
            { input: [[1, 3, 5, 7, 9, 11]], expectedOutput: [3, 9], description: 'Odd numbers ascending', isHidden: true },
            { input: [[2, 4, 6, 8, 10]], expectedOutput: [4, 8], description: 'Even numbers ascending', isHidden: true },
            { input: [[1000, -1000, 500, -500, 0]], expectedOutput: [-500, 500], description: 'Wide range of values', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 8. CHECK PERFECT NUMBER  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Check Perfect Number',
        slug: 'check-perfect-number',
        description: `Write a JavaScript function that checks whether a number is a perfect number.\n\nA perfect number is a positive integer that is equal to the sum of its proper positive divisors (all positive divisors excluding the number itself).\n\nThe first few perfect numbers are: 6, 28, 496, 8128.\n\nExample: 6 is perfect because 1 + 2 + 3 = 6.\n\nReturn \`true\` if the number is perfect, \`false\` otherwise.`,
        difficulty: 'Easy',
        order: 8,
        category: 'Functions',
        functionName: 'isPerfect',
        starterCode: `function isPerfect(n) {\n  // Write your solution here\n\n}`,
        solution: `function isPerfect(n) {\n  if (n <= 1) return false;\n  let sum = 1;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) {\n      sum += i;\n      if (i !== n / i) sum += n / i;\n    }\n  }\n  return sum === n;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate from 1 to n-1 and check if each number is a divisor of n. Sum up all divisors and compare with n. O(n) time, O(1) space.',
                code: `function isPerfect(n) {\n  if (n <= 1) return false;\n  let sum = 0;\n  for (let i = 1; i < n; i++) {\n    if (n % i === 0) sum += i;\n  }\n  return sum === n;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Only iterate up to √n. For each divisor i found, both i and n/i are divisors. Add both to the sum (avoiding adding n itself). Start sum at 1 (since 1 is always a divisor). O(√n) time, O(1) space.',
                code: `function isPerfect(n) {\n  if (n <= 1) return false;\n  let sum = 1;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) {\n      sum += i;\n      if (i !== n / i) sum += n / i;\n    }\n  }\n  return sum === n;\n}`
            }
        ],
        examples: [
            { input: 'n = 6', output: 'true', explanation: 'Divisors of 6: 1, 2, 3. Sum = 1 + 2 + 3 = 6.' },
            { input: 'n = 28', output: 'true', explanation: 'Divisors of 28: 1, 2, 4, 7, 14. Sum = 1 + 2 + 4 + 7 + 14 = 28.' },
            { input: 'n = 10', output: 'false', explanation: 'Divisors of 10: 1, 2, 5. Sum = 8 ≠ 10.' }
        ],
        constraints: ['1 <= n <= 100000'],
        hints: ['Sum all proper divisors (divisors less than n) and check if the sum equals n.', 'Optimize by only checking up to √n.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [6], expectedOutput: true, description: '6 is perfect: 1+2+3=6' },
            { input: [28], expectedOutput: true, description: '28 is perfect: 1+2+4+7+14=28' },
            { input: [10], expectedOutput: false, description: '10 is not perfect' },
            // ── Hidden test cases (17) ──
            { input: [1], expectedOutput: false, description: '1 is not perfect', isHidden: true },
            { input: [2], expectedOutput: false, description: '2 is not perfect', isHidden: true },
            { input: [3], expectedOutput: false, description: '3 is not perfect', isHidden: true },
            { input: [4], expectedOutput: false, description: '4 is not perfect (1+2=3)', isHidden: true },
            { input: [5], expectedOutput: false, description: '5 is not perfect', isHidden: true },
            { input: [12], expectedOutput: false, description: '12 is not perfect (1+2+3+4+6=16)', isHidden: true },
            { input: [15], expectedOutput: false, description: '15 is not perfect', isHidden: true },
            { input: [20], expectedOutput: false, description: '20 is not perfect', isHidden: true },
            { input: [24], expectedOutput: false, description: '24 is not perfect', isHidden: true },
            { input: [27], expectedOutput: false, description: '27 is not perfect', isHidden: true },
            { input: [496], expectedOutput: true, description: '496 is the third perfect number', isHidden: true },
            { input: [100], expectedOutput: false, description: '100 is not perfect', isHidden: true },
            { input: [8128], expectedOutput: true, description: '8128 is the fourth perfect number', isHidden: true },
            { input: [500], expectedOutput: false, description: '500 is not perfect', isHidden: true },
            { input: [8127], expectedOutput: false, description: '8127 is not perfect (one less than 8128)', isHidden: true },
            { input: [8129], expectedOutput: false, description: '8129 is not perfect (one more than 8128)', isHidden: true },
            { input: [33550336], expectedOutput: true, description: '33550336 is the fifth perfect number', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 9. CONVERT AMOUNT TO COINS  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Convert Amount to Coins',
        slug: 'convert-amount-to-coins',
        description: `Write a JavaScript function to convert an amount into the fewest coins possible using a greedy approach.\n\nThe function takes two parameters: the amount (a positive integer) and an array of coin denominations sorted in descending order.\n\nReturn an array of coins that sum up to the amount.\n\nExample: \`amountToCoins(46, [25, 10, 5, 2, 1])\` → \`[25, 10, 10, 1]\``,
        difficulty: 'Easy',
        order: 9,
        category: 'Functions',
        functionName: 'amountToCoins',
        starterCode: `function amountToCoins(amount, coins) {\n  // Write your solution here\n\n}`,
        solution: `function amountToCoins(amount, coins) {\n  const result = [];\n  for (const coin of coins) {\n    while (amount >= coin) {\n      result.push(coin);\n      amount -= coin;\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'For each coin denomination (from largest to smallest), repeatedly subtract it from the amount while possible, pushing the coin to the result array each time. This greedy approach works correctly when coin denominations allow it. O(amount) time in the worst case, O(amount) space for the result.',
                code: `function amountToCoins(amount, coins) {\n  const result = [];\n  for (let i = 0; i < coins.length; i++) {\n    while (amount >= coins[i]) {\n      result.push(coins[i]);\n      amount -= coins[i];\n    }\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use Math.floor to calculate how many of each coin fits, then use Array.fill to add them all at once instead of looping. Same greedy logic but avoids repeated subtraction. O(k) time where k is the number of coin types, O(result size) space.',
                code: `function amountToCoins(amount, coins) {\n  const result = [];\n  for (const coin of coins) {\n    const count = Math.floor(amount / coin);\n    if (count > 0) {\n      result.push(...Array(count).fill(coin));\n      amount -= coin * count;\n    }\n  }\n  return result;\n}`
            }
        ],
        examples: [
            { input: 'amount = 46, coins = [25, 10, 5, 2, 1]', output: '[25, 10, 10, 1]', explanation: '25 + 10 + 10 + 1 = 46' },
            { input: 'amount = 99, coins = [25, 10, 5, 2, 1]', output: '[25, 25, 25, 10, 10, 2, 2]', explanation: '25+25+25+10+10+2+2 = 99' }
        ],
        constraints: ['1 <= amount <= 10000', 'coins is sorted in descending order.', 'coins contains at least one denomination.', 'It is always possible to make the amount with the given coins.'],
        hints: ['Use a greedy approach: always use the largest coin possible first.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [46, [25, 10, 5, 2, 1]], expectedOutput: [25, 10, 10, 1], description: '46 with standard coins' },
            { input: [99, [25, 10, 5, 2, 1]], expectedOutput: [25, 25, 25, 10, 10, 2, 2], description: '99 with standard coins' },
            { input: [1, [25, 10, 5, 2, 1]], expectedOutput: [1], description: 'Minimum amount' },
            // ── Hidden test cases (17) ──
            { input: [25, [25, 10, 5, 2, 1]], expectedOutput: [25], description: 'Exact single coin', isHidden: true },
            { input: [10, [25, 10, 5, 2, 1]], expectedOutput: [10], description: 'Exact 10 coin', isHidden: true },
            { input: [5, [25, 10, 5, 2, 1]], expectedOutput: [5], description: 'Exact 5 coin', isHidden: true },
            { input: [2, [25, 10, 5, 2, 1]], expectedOutput: [2], description: 'Exact 2 coin', isHidden: true },
            { input: [3, [25, 10, 5, 2, 1]], expectedOutput: [2, 1], description: '3 = 2 + 1', isHidden: true },
            { input: [7, [25, 10, 5, 2, 1]], expectedOutput: [5, 2], description: '7 = 5 + 2', isHidden: true },
            { input: [50, [25, 10, 5, 2, 1]], expectedOutput: [25, 25], description: '50 = 25 + 25', isHidden: true },
            { input: [75, [25, 10, 5, 2, 1]], expectedOutput: [25, 25, 25], description: '75 = 25×3', isHidden: true },
            { input: [30, [25, 10, 5, 2, 1]], expectedOutput: [25, 5], description: '30 = 25 + 5', isHidden: true },
            { input: [15, [25, 10, 5, 2, 1]], expectedOutput: [10, 5], description: '15 = 10 + 5', isHidden: true },
            { input: [100, [25, 10, 5, 2, 1]], expectedOutput: [25, 25, 25, 25], description: '100 = 25×4', isHidden: true },
            { input: [11, [25, 10, 5, 2, 1]], expectedOutput: [10, 1], description: '11 = 10 + 1', isHidden: true },
            { input: [36, [25, 10, 5, 2, 1]], expectedOutput: [25, 10, 1], description: '36 = 25 + 10 + 1', isHidden: true },
            { input: [8, [25, 10, 5, 2, 1]], expectedOutput: [5, 2, 1], description: '8 = 5 + 2 + 1', isHidden: true },
            { input: [4, [25, 10, 5, 2, 1]], expectedOutput: [2, 2], description: '4 = 2 + 2', isHidden: true },
            { input: [6, [25, 10, 5, 2, 1]], expectedOutput: [5, 1], description: '6 = 5 + 1', isHidden: true },
            { input: [53, [25, 10, 5, 2, 1]], expectedOutput: [25, 25, 2, 1], description: '53 = 25 + 25 + 2 + 1', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 10. EXTRACT UNIQUE CHARACTERS  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Extract Unique Characters',
        slug: 'extract-unique-characters',
        description: `Write a JavaScript function to extract unique characters from a string.\n\nReturn a new string containing each character only once, preserving the order of their first occurrence.\n\nExample: \`"thequickbrownfoxjumpsoverthelazydog"\` → \`"thequickbrownfxjmpsvlazydg"\``,
        difficulty: 'Easy',
        order: 10,
        category: 'Functions',
        functionName: 'extractUnique',
        starterCode: `function extractUnique(str) {\n  // Write your solution here\n\n}`,
        solution: `function extractUnique(str) {\n  let result = '';\n  const seen = new Set();\n  for (const char of str) {\n    if (!seen.has(char)) {\n      seen.add(char);\n      result += char;\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Iterate through the string. For each character, check if it already exists in the result using indexOf(). If not found, append it to the result. O(n²) time due to repeated indexOf searches, O(n) space.',
                code: `function extractUnique(str) {\n  let result = '';\n  for (let i = 0; i < str.length; i++) {\n    if (result.indexOf(str[i]) === -1) {\n      result += str[i];\n    }\n  }\n  return result;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use a Set to track seen characters. Iterate through the string: if the character is not in the Set, add it to the Set and append it to the result. O(n) time, O(n) space.',
                code: `function extractUnique(str) {\n  let result = '';\n  const seen = new Set();\n  for (const char of str) {\n    if (!seen.has(char)) {\n      seen.add(char);\n      result += char;\n    }\n  }\n  return result;\n}`
            }
        ],
        examples: [
            { input: 'str = "thequickbrownfoxjumpsoverthelazydog"', output: '"thequickbrownfxjmpsvlazydg"', explanation: 'Duplicate letters (e, o, t, h, etc.) are removed on subsequent appearances.' },
            { input: 'str = "aabbcc"', output: '"abc"', explanation: 'Each letter appears twice, keep only first occurrence.' }
        ],
        constraints: ['0 <= str.length <= 10^5', 'str consists of printable ASCII characters.'],
        hints: ['Use a Set to track which characters you have already seen.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: ['thequickbrownfoxjumpsoverthelazydog'], expectedOutput: 'thequickbrownfxjmpsvlazydg', description: 'All alphabet letters with duplicates' },
            { input: ['aabbcc'], expectedOutput: 'abc', description: 'Paired duplicates' },
            { input: ['hello'], expectedOutput: 'helo', description: 'Simple word with one duplicate' },
            // ── Hidden test cases (17) ──
            { input: [''], expectedOutput: '', description: 'Empty string', isHidden: true },
            { input: ['a'], expectedOutput: 'a', description: 'Single character', isHidden: true },
            { input: ['aaa'], expectedOutput: 'a', description: 'All same characters', isHidden: true },
            { input: ['abc'], expectedOutput: 'abc', description: 'No duplicates', isHidden: true },
            { input: ['abcabc'], expectedOutput: 'abc', description: 'Repeated pattern', isHidden: true },
            { input: ['abcba'], expectedOutput: 'abc', description: 'Palindromic string', isHidden: true },
            { input: ['aAbBcC'], expectedOutput: 'aAbBcC', description: 'Case-sensitive: all unique', isHidden: true },
            { input: ['AaAaBbBb'], expectedOutput: 'AaBb', description: 'Mixed case duplicates', isHidden: true },
            { input: ['javascript'], expectedOutput: 'javscript', description: 'javascript with duplicate a', isHidden: true },
            { input: ['programming'], expectedOutput: 'progamin', description: 'programming unique chars', isHidden: true },
            { input: ['banana'], expectedOutput: 'ban', description: 'banana unique chars', isHidden: true },
            { input: ['mississippi'], expectedOutput: 'misp', description: 'mississippi unique chars', isHidden: true },
            { input: ['abcdefghijklmnopqrstuvwxyz'], expectedOutput: 'abcdefghijklmnopqrstuvwxyz', description: 'Full alphabet no dups', isHidden: true },
            { input: ['aabbccddeeff'], expectedOutput: 'abcdef', description: 'Six paired chars', isHidden: true },
            { input: ['aaabbbccc'], expectedOutput: 'abc', description: 'Triple repeated chars', isHidden: true },
            { input: ['hello world'], expectedOutput: 'helo wrd', description: 'Sentence with space', isHidden: true },
            { input: ['11223344'], expectedOutput: '1234', description: 'Numeric string duplicates', isHidden: true },
        ]
    },

    // ═══════════════════════════════════════════════════
    // RECURSION CATEGORY (11–15)
    // ═══════════════════════════════════════════════════

    // ───────────────────────────────────────────────────
    // 11. FACTORIAL CALCULATION  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Factorial Calculation',
        slug: 'factorial-calculation',
        description: `Write a JavaScript program to calculate the factorial of a number using recursion.\n\nIn mathematics, the factorial of a non-negative integer \`n\`, denoted by \`n!\`, is the product of all positive integers less than or equal to \`n\`.\n\nFor example, \`5! = 5 × 4 × 3 × 2 × 1 = 120\`.\n\nBy convention, \`0! = 1\`.`,
        difficulty: 'Easy',
        order: 11,
        category: 'Recursion',
        functionName: 'factorial',
        starterCode: `function factorial(x) {\n  // Write your solution here\n\n}`,
        solution: `function factorial(x) {\n  if (x === 0) {\n    return 1;\n  }\n  return x * factorial(x - 1);\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use direct recursion: the base case is factorial(0) = 1, and the recursive case is n * factorial(n - 1). Each call reduces n by 1 until reaching 0. O(n) time, O(n) stack space.',
                code: `function factorial(x) {\n  if (x === 0) {\n    return 1;\n  }\n  return x * factorial(x - 1);\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use tail-recursive style with an accumulator parameter. Pass the running product as a second argument to avoid building up the call stack (though JavaScript engines may not optimize tail calls, the logic is cleaner). O(n) time, O(n) stack space in practice.',
                code: `function factorial(x, acc = 1) {\n  if (x === 0) return acc;\n  return factorial(x - 1, acc * x);\n}`
            }
        ],
        examples: [
            { input: 'x = 5', output: '120', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120' },
            { input: 'x = 0', output: '1', explanation: '0! = 1 by convention' }
        ],
        constraints: ['0 <= x <= 18', 'x is a non-negative integer.'],
        hints: ['Base case: 0! = 1.', 'Recursive case: n! = n × (n-1)!'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [5], expectedOutput: 120, description: '5! = 120' },
            { input: [0], expectedOutput: 1, description: '0! = 1' },
            { input: [1], expectedOutput: 1, description: '1! = 1' },
            // ── Hidden test cases (17) ──
            { input: [2], expectedOutput: 2, description: '2! = 2', isHidden: true },
            { input: [3], expectedOutput: 6, description: '3! = 6', isHidden: true },
            { input: [4], expectedOutput: 24, description: '4! = 24', isHidden: true },
            { input: [6], expectedOutput: 720, description: '6! = 720', isHidden: true },
            { input: [7], expectedOutput: 5040, description: '7! = 5040', isHidden: true },
            { input: [8], expectedOutput: 40320, description: '8! = 40320', isHidden: true },
            { input: [9], expectedOutput: 362880, description: '9! = 362880', isHidden: true },
            { input: [10], expectedOutput: 3628800, description: '10! = 3628800', isHidden: true },
            { input: [11], expectedOutput: 39916800, description: '11! = 39916800', isHidden: true },
            { input: [12], expectedOutput: 479001600, description: '12! = 479001600', isHidden: true },
            { input: [13], expectedOutput: 6227020800, description: '13! = 6227020800', isHidden: true },
            { input: [14], expectedOutput: 87178291200, description: '14! = 87178291200', isHidden: true },
            { input: [15], expectedOutput: 1307674368000, description: '15! = 1307674368000', isHidden: true },
            { input: [16], expectedOutput: 20922789888000, description: '16! = 20922789888000', isHidden: true },
            { input: [17], expectedOutput: 355687428096000, description: '17! = 355687428096000', isHidden: true },
            { input: [18], expectedOutput: 6402373705728000, description: '18! = 6402373705728000', isHidden: true },
            { input: [3], expectedOutput: 6, description: 'Repeat: 3! = 6 (consistency check)', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 12. GCD USING RECURSION  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'GCD Using Recursion',
        slug: 'gcd-using-recursion',
        description: `Write a JavaScript program to find the greatest common divisor (GCD) of two positive numbers using recursion.\n\nThe GCD of two numbers is the largest positive integer that divides both numbers without a remainder.\n\nUse the Euclidean algorithm: \`gcd(a, b) = gcd(b, a % b)\`, with the base case being when \`b\` is 0, in which case the GCD is \`a\`.`,
        difficulty: 'Easy',
        order: 12,
        category: 'Recursion',
        functionName: 'gcd',
        starterCode: `function gcd(a, b) {\n  // Write your solution here\n\n}`,
        solution: `function gcd(a, b) {\n  if (!b) {\n    return a;\n  }\n  return gcd(b, a % b);\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use the Euclidean algorithm recursively. If b is 0, return a (base case). Otherwise, recursively compute gcd(b, a % b). This is efficient with O(log(min(a,b))) time and O(log(min(a,b))) stack space.',
                code: `function gcd(a, b) {\n  if (!b) {\n    return a;\n  }\n  return gcd(b, a % b);\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Same Euclidean algorithm but written iteratively to avoid stack overflow on very large inputs. Use a while loop to repeatedly replace a with b and b with a % b until b is 0. O(log(min(a,b))) time, O(1) space.',
                code: `function gcd(a, b) {\n  while (b) {\n    [a, b] = [b, a % b];\n  }\n  return a;\n}`
            }
        ],
        examples: [
            { input: 'a = 2154, b = 458', output: '2', explanation: 'gcd(2154, 458) = gcd(458, 322) = gcd(322, 136) = gcd(136, 50) = gcd(50, 36) = gcd(36, 14) = gcd(14, 8) = gcd(8, 6) = gcd(6, 2) = gcd(2, 0) = 2' },
            { input: 'a = 12, b = 8', output: '4', explanation: 'gcd(12, 8) = gcd(8, 4) = gcd(4, 0) = 4' }
        ],
        constraints: ['1 <= a, b <= 10^6', 'a and b are positive integers.'],
        hints: ['Use the Euclidean algorithm: gcd(a, b) = gcd(b, a % b).', 'Base case: when b is 0, the GCD is a.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [2154, 458], expectedOutput: 2, description: 'GCD of 2154 and 458' },
            { input: [12, 8], expectedOutput: 4, description: 'GCD of 12 and 8' },
            { input: [100, 75], expectedOutput: 25, description: 'GCD of 100 and 75' },
            // ── Hidden test cases (17) ──
            { input: [1, 1], expectedOutput: 1, description: 'GCD of 1 and 1', isHidden: true },
            { input: [7, 1], expectedOutput: 1, description: 'GCD with 1 is always 1', isHidden: true },
            { input: [10, 5], expectedOutput: 5, description: 'One divides the other', isHidden: true },
            { input: [5, 10], expectedOutput: 5, description: 'Arguments swapped', isHidden: true },
            { input: [17, 13], expectedOutput: 1, description: 'Two primes: GCD is 1', isHidden: true },
            { input: [24, 36], expectedOutput: 12, description: 'GCD of 24 and 36', isHidden: true },
            { input: [48, 18], expectedOutput: 6, description: 'GCD of 48 and 18', isHidden: true },
            { input: [56, 98], expectedOutput: 14, description: 'GCD of 56 and 98', isHidden: true },
            { input: [100, 100], expectedOutput: 100, description: 'Same numbers: GCD equals the number', isHidden: true },
            { input: [81, 27], expectedOutput: 27, description: 'One is multiple of other', isHidden: true },
            { input: [7, 3], expectedOutput: 1, description: 'Coprime numbers', isHidden: true },
            { input: [270, 192], expectedOutput: 6, description: 'GCD of 270 and 192', isHidden: true },
            { input: [1000, 400], expectedOutput: 200, description: 'GCD of 1000 and 400', isHidden: true },
            { input: [252, 105], expectedOutput: 21, description: 'GCD of 252 and 105', isHidden: true },
            { input: [60, 48], expectedOutput: 12, description: 'GCD of 60 and 48', isHidden: true },
            { input: [13, 13], expectedOutput: 13, description: 'Same prime number', isHidden: true },
            { input: [144, 89], expectedOutput: 1, description: 'Consecutive Fibonacci numbers are coprime', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 13. RANGE OF INTEGERS  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Range of Integers',
        slug: 'range-of-integers',
        description: `Write a JavaScript program to get all integers in the range \`(x, y)\` using recursion.\n\nThe range is exclusive — do not include \`x\` or \`y\` themselves.\n\nExample: \`range(2, 9)\` → \`[3, 4, 5, 6, 7, 8]\`\n\nIf there are no integers between \`x\` and \`y\`, return an empty array.`,
        difficulty: 'Easy',
        order: 13,
        category: 'Recursion',
        functionName: 'range',
        starterCode: `function range(startNum, endNum) {\n  // Write your solution here\n\n}`,
        solution: `function range(startNum, endNum) {\n  if (endNum - startNum <= 1) {\n    return [];\n  }\n  if (endNum - startNum === 2) {\n    return [startNum + 1];\n  }\n  var list = range(startNum, endNum - 1);\n  list.push(endNum - 1);\n  return list;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use recursion by reducing endNum by 1 each call. Base case: if endNum - startNum <= 1, return empty array (no integers in between). If the difference is 2, return [startNum + 1]. Otherwise, recursively get the range up to endNum - 1 and push endNum - 1. O(n) time and space where n = endNum - startNum.',
                code: `function range(startNum, endNum) {\n  if (endNum - startNum <= 1) {\n    return [];\n  }\n  if (endNum - startNum === 2) {\n    return [startNum + 1];\n  }\n  var list = range(startNum, endNum - 1);\n  list.push(endNum - 1);\n  return list;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Build the range from the start. Use a helper that starts from startNum + 1 and pushes values, recursing until reaching endNum. Alternatively, use a single base case: if startNum + 1 >= endNum, return []. Otherwise, return [startNum + 1, ...range(startNum + 1, endNum)]. O(n) time and space.',
                code: `function range(startNum, endNum) {\n  if (startNum + 1 >= endNum) return [];\n  return [startNum + 1, ...range(startNum + 1, endNum)];\n}`
            }
        ],
        examples: [
            { input: 'startNum = 2, endNum = 9', output: '[3, 4, 5, 6, 7, 8]', explanation: 'Integers between 2 and 9 exclusive.' },
            { input: 'startNum = 1, endNum = 5', output: '[2, 3, 4]', explanation: 'Integers between 1 and 5 exclusive.' }
        ],
        constraints: ['-1000 <= startNum < endNum <= 1000'],
        hints: ['Base case: if endNum - startNum <= 1, there are no integers in between.', 'Recursively shrink the range by reducing endNum or increasing startNum.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [2, 9], expectedOutput: [3, 4, 5, 6, 7, 8], description: 'Range between 2 and 9' },
            { input: [1, 5], expectedOutput: [2, 3, 4], description: 'Range between 1 and 5' },
            { input: [0, 1], expectedOutput: [], description: 'No integers between consecutive numbers' },
            // ── Hidden test cases (17) ──
            { input: [0, 2], expectedOutput: [1], description: 'Single integer in range', isHidden: true },
            { input: [1, 2], expectedOutput: [], description: 'Adjacent numbers, empty range', isHidden: true },
            { input: [0, 10], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9], description: 'Range 0 to 10', isHidden: true },
            { input: [5, 6], expectedOutput: [], description: 'Adjacent 5 and 6', isHidden: true },
            { input: [10, 15], expectedOutput: [11, 12, 13, 14], description: 'Range 10 to 15', isHidden: true },
            { input: [0, 3], expectedOutput: [1, 2], description: 'Range 0 to 3', isHidden: true },
            { input: [100, 105], expectedOutput: [101, 102, 103, 104], description: 'Large start value', isHidden: true },
            { input: [-5, 0], expectedOutput: [-4, -3, -2, -1], description: 'Negative to zero range', isHidden: true },
            { input: [-3, 3], expectedOutput: [-2, -1, 0, 1, 2], description: 'Negative to positive range', isHidden: true },
            { input: [-10, -5], expectedOutput: [-9, -8, -7, -6], description: 'All negative range', isHidden: true },
            { input: [0, 4], expectedOutput: [1, 2, 3], description: 'Range 0 to 4', isHidden: true },
            { input: [3, 4], expectedOutput: [], description: 'Adjacent 3 and 4', isHidden: true },
            { input: [1, 10], expectedOutput: [2, 3, 4, 5, 6, 7, 8, 9], description: 'Range 1 to 10', isHidden: true },
            { input: [20, 25], expectedOutput: [21, 22, 23, 24], description: 'Range 20 to 25', isHidden: true },
            { input: [-1, 1], expectedOutput: [0], description: 'Only 0 between -1 and 1', isHidden: true },
            { input: [50, 52], expectedOutput: [51], description: 'Single integer between 50 and 52', isHidden: true },
            { input: [-2, -1], expectedOutput: [], description: 'Adjacent negatives, empty range', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 14. SUM OF ARRAY ELEMENTS  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Sum of Array Elements',
        slug: 'sum-of-array-elements',
        description: `Write a JavaScript program to compute the sum of an array of integers using recursion.\n\nExample: \`[1, 2, 3, 4, 5, 6]\` → \`21\`\n\nIf the array is empty, return \`0\`.`,
        difficulty: 'Easy',
        order: 14,
        category: 'Recursion',
        functionName: 'arraySum',
        starterCode: `function arraySum(arr) {\n  // Write your solution here\n\n}`,
        solution: `function arraySum(arr) {\n  if (arr.length === 0) {\n    return 0;\n  }\n  return arr[0] + arraySum(arr.slice(1));\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use recursion by popping the last element and adding it to the recursive sum of the remaining array. Base case: if the array has no elements, return 0. O(n) time, O(n) stack space. Note: this mutates the original array.',
                code: `function arraySum(arr) {\n  if (arr.length === 0) {\n    return 0;\n  }\n  return arr.pop() + arraySum(arr);\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use recursion with slice to avoid mutating the input. Take the first element and add it to the recursive sum of the rest (arr.slice(1)). Base case: empty array returns 0. O(n²) time due to slice creating new arrays, but does not mutate input. O(n) stack space.',
                code: `function arraySum(arr) {\n  if (arr.length === 0) {\n    return 0;\n  }\n  return arr[0] + arraySum(arr.slice(1));\n}`
            }
        ],
        examples: [
            { input: 'arr = [1, 2, 3, 4, 5, 6]', output: '21', explanation: '1 + 2 + 3 + 4 + 5 + 6 = 21' },
            { input: 'arr = [10, -5, 3]', output: '8', explanation: '10 + (-5) + 3 = 8' }
        ],
        constraints: ['0 <= arr.length <= 1000', '-10^6 <= arr[i] <= 10^6'],
        hints: ['Base case: an empty array has a sum of 0.', 'Recursive case: first element + sum of the rest.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: 21, description: 'Sum of 1 to 6' },
            { input: [[10, -5, 3]], expectedOutput: 8, description: 'Mixed positive and negative' },
            { input: [[]], expectedOutput: 0, description: 'Empty array' },
            // ── Hidden test cases (17) ──
            { input: [[0]], expectedOutput: 0, description: 'Single zero', isHidden: true },
            { input: [[5]], expectedOutput: 5, description: 'Single element', isHidden: true },
            { input: [[-1]], expectedOutput: -1, description: 'Single negative element', isHidden: true },
            { input: [[1, 1, 1, 1, 1]], expectedOutput: 5, description: 'Five ones', isHidden: true },
            { input: [[-1, -2, -3]], expectedOutput: -6, description: 'All negative numbers', isHidden: true },
            { input: [[100, 200, 300]], expectedOutput: 600, description: 'Large positive numbers', isHidden: true },
            { input: [[10, 20]], expectedOutput: 30, description: 'Two elements', isHidden: true },
            { input: [[0, 0, 0, 0]], expectedOutput: 0, description: 'All zeros', isHidden: true },
            { input: [[-5, 5, -5, 5]], expectedOutput: 0, description: 'Cancelling positive and negative', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expectedOutput: 55, description: 'Sum of 1 to 10', isHidden: true },
            { input: [[50, 50]], expectedOutput: 100, description: 'Two fifties', isHidden: true },
            { input: [[999, 1]], expectedOutput: 1000, description: '999 + 1 = 1000', isHidden: true },
            { input: [[-100, 50, 50]], expectedOutput: 0, description: 'Sums to zero', isHidden: true },
            { input: [[7, 14, 21]], expectedOutput: 42, description: 'Multiples of 7', isHidden: true },
            { input: [[3, 3, 3, 3]], expectedOutput: 12, description: 'Four threes', isHidden: true },
            { input: [[1000000, -1000000]], expectedOutput: 0, description: 'Large magnitude cancellation', isHidden: true },
            { input: [[2, 4, 6, 8, 10]], expectedOutput: 30, description: 'Even numbers 2 to 10', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 15. EXPONENTIATION  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Exponentiation',
        slug: 'exponentiation',
        description: `Write a JavaScript program to compute the exponent of a number using recursion.\n\nThe exponent of a number says how many times the base number is used as a factor.\n\nFor example: \`8² = 8 × 8 = 64\`. Here 8 is the base and 2 is the exponent.\n\nCompute \`a^n\` where \`a\` is the base and \`n\` is a non-negative integer exponent.`,
        difficulty: 'Easy',
        order: 15,
        category: 'Recursion',
        functionName: 'exponent',
        starterCode: `function exponent(a, n) {\n  // Write your solution here\n\n}`,
        solution: `function exponent(a, n) {\n  if (n === 0) {\n    return 1;\n  }\n  return a * exponent(a, n - 1);\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use direct recursion. Base case: a^0 = 1. Recursive case: a^n = a × a^(n-1). Each call reduces n by 1 until reaching 0. O(n) time, O(n) stack space.',
                code: `function exponent(a, n) {\n  if (n === 0) {\n    return 1;\n  }\n  return a * exponent(a, n - 1);\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use exponentiation by squaring (fast power). If n is even, a^n = (a^(n/2))^2. If n is odd, a^n = a × a^(n-1). This reduces the number of multiplications to O(log n) time, with O(log n) stack space.',
                code: `function exponent(a, n) {\n  if (n === 0) return 1;\n  if (n % 2 === 0) {\n    const half = exponent(a, n / 2);\n    return half * half;\n  }\n  return a * exponent(a, n - 1);\n}`
            }
        ],
        examples: [
            { input: 'a = 4, n = 2', output: '16', explanation: '4² = 4 × 4 = 16' },
            { input: 'a = 2, n = 10', output: '1024', explanation: '2¹⁰ = 1024' }
        ],
        constraints: ['-100 <= a <= 100', '0 <= n <= 20', 'n is a non-negative integer.'],
        hints: ['Base case: any number raised to the power 0 is 1.', 'Recursive case: a^n = a × a^(n-1).'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [4, 2], expectedOutput: 16, description: '4² = 16' },
            { input: [2, 10], expectedOutput: 1024, description: '2¹⁰ = 1024' },
            { input: [5, 0], expectedOutput: 1, description: 'Any number to power 0 is 1' },
            // ── Hidden test cases (17) ──
            { input: [1, 100], expectedOutput: 1, description: '1 to any power is 1', isHidden: true },
            { input: [0, 5], expectedOutput: 0, description: '0 to any positive power is 0', isHidden: true },
            { input: [3, 3], expectedOutput: 27, description: '3³ = 27', isHidden: true },
            { input: [2, 0], expectedOutput: 1, description: '2⁰ = 1', isHidden: true },
            { input: [2, 1], expectedOutput: 2, description: '2¹ = 2', isHidden: true },
            { input: [2, 5], expectedOutput: 32, description: '2⁵ = 32', isHidden: true },
            { input: [10, 3], expectedOutput: 1000, description: '10³ = 1000', isHidden: true },
            { input: [3, 4], expectedOutput: 81, description: '3⁴ = 81', isHidden: true },
            { input: [5, 3], expectedOutput: 125, description: '5³ = 125', isHidden: true },
            { input: [7, 2], expectedOutput: 49, description: '7² = 49', isHidden: true },
            { input: [6, 3], expectedOutput: 216, description: '6³ = 216', isHidden: true },
            { input: [-2, 3], expectedOutput: -8, description: '(-2)³ = -8', isHidden: true },
            { input: [-2, 4], expectedOutput: 16, description: '(-2)⁴ = 16 (even exponent)', isHidden: true },
            { input: [-3, 2], expectedOutput: 9, description: '(-3)² = 9', isHidden: true },
            { input: [-1, 5], expectedOutput: -1, description: '(-1)⁵ = -1 (odd exponent)', isHidden: true },
            { input: [-1, 4], expectedOutput: 1, description: '(-1)⁴ = 1 (even exponent)', isHidden: true },
            { input: [9, 2], expectedOutput: 81, description: '9² = 81', isHidden: true },
        ]
    },

    // ───────────────────────────────────────────────────
    // 16. FIBONACCI SEQUENCE  (20 test cases)
    // ───────────────────────────────────────────────────
    {
        title: 'Fibonacci Sequence',
        slug: 'fibonacci-sequence',
        description: `Write a JavaScript program to get the first \`n\` Fibonacci numbers using recursion.\n\nThe Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...\n\nEach subsequent number is the sum of the previous two.\n\nReturn an array containing the first \`n\` Fibonacci numbers.\n\nExample: \`fibonacciSeries(8)\` → \`[0, 1, 1, 2, 3, 5, 8, 13]\``,
        difficulty: 'Easy',
        order: 16,
        category: 'Recursion',
        functionName: 'fibonacciSeries',
        starterCode: `function fibonacciSeries(n) {\n  // Write your solution here\n\n}`,
        solution: `function fibonacciSeries(n) {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  if (n === 2) return [0, 1];\n  var s = fibonacciSeries(n - 1);\n  s.push(s[s.length - 1] + s[s.length - 2]);\n  return s;\n}`,
        solutions: [
            {
                approach: 'Brute Force',
                explanation: 'Use recursion: base cases return [0] for n=1 and [0,1] for n=2. For larger n, recursively build the series up to n-1 elements, then compute and push the next Fibonacci number (sum of last two). O(n) time, O(n) space.',
                code: `function fibonacciSeries(n) {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  if (n === 2) return [0, 1];\n  var s = fibonacciSeries(n - 1);\n  s.push(s[s.length - 1] + s[s.length - 2]);\n  return s;\n}`
            },
            {
                approach: 'Optimal',
                explanation: 'Use an iterative approach to build the Fibonacci array. Start with [0, 1] and keep appending the sum of the last two elements until the array has n elements. O(n) time, O(n) space, avoids recursion overhead.',
                code: `function fibonacciSeries(n) {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  const fib = [0, 1];\n  for (let i = 2; i < n; i++) {\n    fib.push(fib[i - 1] + fib[i - 2]);\n  }\n  return fib;\n}`
            }
        ],
        examples: [
            { input: 'n = 8', output: '[0, 1, 1, 2, 3, 5, 8, 13]', explanation: 'The first 8 Fibonacci numbers.' },
            { input: 'n = 5', output: '[0, 1, 1, 2, 3]', explanation: 'The first 5 Fibonacci numbers.' }
        ],
        constraints: ['0 <= n <= 25'],
        hints: ['Base cases: n=0 → [], n=1 → [0], n=2 → [0,1].', 'Recursively build the series up to n-1, then push the sum of the last two elements.'],
        testCases: [
            // ── Visible test cases (3) ──
            { input: [8], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13], description: 'First 8 Fibonacci numbers' },
            { input: [5], expectedOutput: [0, 1, 1, 2, 3], description: 'First 5 Fibonacci numbers' },
            { input: [1], expectedOutput: [0], description: 'First 1 Fibonacci number' },
            // ── Hidden test cases (17) ──
            { input: [0], expectedOutput: [], description: 'Zero elements: empty array', isHidden: true },
            { input: [2], expectedOutput: [0, 1], description: 'First 2 Fibonacci numbers', isHidden: true },
            { input: [3], expectedOutput: [0, 1, 1], description: 'First 3 Fibonacci numbers', isHidden: true },
            { input: [4], expectedOutput: [0, 1, 1, 2], description: 'First 4 Fibonacci numbers', isHidden: true },
            { input: [6], expectedOutput: [0, 1, 1, 2, 3, 5], description: 'First 6 Fibonacci numbers', isHidden: true },
            { input: [7], expectedOutput: [0, 1, 1, 2, 3, 5, 8], description: 'First 7 Fibonacci numbers', isHidden: true },
            { input: [9], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21], description: 'First 9 Fibonacci numbers', isHidden: true },
            { input: [10], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], description: 'First 10 Fibonacci numbers', isHidden: true },
            { input: [11], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55], description: 'First 11 Fibonacci numbers', isHidden: true },
            { input: [12], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], description: 'First 12 Fibonacci numbers', isHidden: true },
            { input: [13], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144], description: 'First 13 Fibonacci numbers', isHidden: true },
            { input: [14], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233], description: 'First 14 Fibonacci numbers', isHidden: true },
            { input: [15], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377], description: 'First 15 Fibonacci numbers', isHidden: true },
            { input: [16], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610], description: 'First 16 Fibonacci numbers', isHidden: true },
            { input: [17], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987], description: 'First 17 Fibonacci numbers', isHidden: true },
            { input: [18], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597], description: 'First 18 Fibonacci numbers', isHidden: true },
            { input: [20], expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181], description: 'First 20 Fibonacci numbers', isHidden: true },
        ]
    },

    // ═══════════════════════════════════════════════════
    // CONDITIONAL STATEMENTS (Questions 17-21)
    // ═══════════════════════════════════════════════════

    // Question 17: Largest of Two Integers
    {
        title: 'Largest of Two Integers',
        slug: 'largest-of-two-integers',
        description: 'Write a JavaScript function that takes two integers and returns the largest of the two.',
        difficulty: 'Easy',
        order: 17,
        category: 'Conditional Statements',
        functionName: 'largestOfTwo',
        starterCode: `function largestOfTwo(a, b) {\n  // Write your code here\n}`,
        solution: `function largestOfTwo(a, b) {\n  if (a >= b) {\n    return a;\n  } else {\n    return b;\n  }\n}`,
        solutions: [
            {
                title: 'Using if-else',
                code: `function largestOfTwo(a, b) {\n  if (a >= b) {\n    return a;\n  } else {\n    return b;\n  }\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use a simple if-else statement to compare the two integers and return the larger one.'
            },
            {
                title: 'Using Math.max',
                code: `function largestOfTwo(a, b) {\n  return Math.max(a, b);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use the built-in Math.max function for a concise one-liner solution.'
            }
        ],
        examples: [
            { input: [5, 3], output: 5, explanation: '5 is greater than 3, so return 5.' },
            { input: [-1, -5], output: -1, explanation: '-1 is greater than -5, so return -1.' }
        ],
        constraints: [
            'Both inputs will be integers',
            'Inputs can be negative, zero, or positive',
            'If both numbers are equal, return that number'
        ],
        hints: [
            'Compare the two numbers using an if-else statement.',
            'Consider using Math.max() for a simpler approach.'
        ],
        testCases: [
            { input: [5, 3], expectedOutput: 5, description: '5 is larger than 3' },
            { input: [-1, -5], expectedOutput: -1, description: '-1 is larger than -5' },
            { input: [0, 0], expectedOutput: 0, description: 'Both are zero' },
            { input: [100, 200], expectedOutput: 200, description: '200 is larger than 100', isHidden: true },
            { input: [-10, 10], expectedOutput: 10, description: '10 is larger than -10', isHidden: true },
            { input: [7, 7], expectedOutput: 7, description: 'Both equal to 7', isHidden: true },
            { input: [-100, -200], expectedOutput: -100, description: '-100 is larger than -200', isHidden: true },
            { input: [0, -1], expectedOutput: 0, description: '0 is larger than -1', isHidden: true },
            { input: [999, 1000], expectedOutput: 1000, description: '1000 is larger than 999', isHidden: true },
            { input: [-1, 0], expectedOutput: 0, description: '0 is larger than -1', isHidden: true },
            { input: [1, -1], expectedOutput: 1, description: '1 is larger than -1', isHidden: true },
            { input: [50, 25], expectedOutput: 50, description: '50 is larger than 25', isHidden: true },
            { input: [3, 8], expectedOutput: 8, description: '8 is larger than 3', isHidden: true },
            { input: [-50, -25], expectedOutput: -25, description: '-25 is larger than -50', isHidden: true },
            { input: [1000000, 999999], expectedOutput: 1000000, description: 'Large numbers comparison', isHidden: true },
            { input: [-1000000, -999999], expectedOutput: -999999, description: 'Large negative numbers comparison', isHidden: true },
            { input: [42, 42], expectedOutput: 42, description: 'Both equal to 42', isHidden: true },
            { input: [1, 2], expectedOutput: 2, description: '2 is larger than 1', isHidden: true },
            { input: [-3, -2], expectedOutput: -2, description: '-2 is larger than -3', isHidden: true },
            { input: [0, 1], expectedOutput: 1, description: '1 is larger than 0', isHidden: true },
        ]
    },

    // Question 18: Sign of Product of Three Numbers
    {
        title: 'Sign of Product of Three Numbers',
        slug: 'sign-of-product-of-three-numbers',
        description: 'Write a JavaScript function that takes three numbers and returns the sign of their product as a string: "+" if the product is positive, "-" if the product is negative, or "0" if the product is zero. Do not compute the actual product.',
        difficulty: 'Easy',
        order: 18,
        category: 'Conditional Statements',
        functionName: 'signOfProduct',
        starterCode: `function signOfProduct(a, b, c) {\n  // Write your code here\n}`,
        solution: `function signOfProduct(a, b, c) {\n  if (a === 0 || b === 0 || c === 0) return "0";\n  let negativeCount = 0;\n  if (a < 0) negativeCount++;\n  if (b < 0) negativeCount++;\n  if (c < 0) negativeCount++;\n  return negativeCount % 2 === 0 ? "+" : "-";\n}`,
        solutions: [
            {
                title: 'Counting Negatives',
                code: `function signOfProduct(a, b, c) {\n  if (a === 0 || b === 0 || c === 0) return "0";\n  let negativeCount = 0;\n  if (a < 0) negativeCount++;\n  if (b < 0) negativeCount++;\n  if (c < 0) negativeCount++;\n  return negativeCount % 2 === 0 ? "+" : "-";\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Count the number of negative numbers. If any number is zero, return "0". If the count of negatives is even, the product is positive; otherwise negative.'
            },
            {
                title: 'Using Math.sign',
                code: `function signOfProduct(a, b, c) {\n  const sign = Math.sign(a) * Math.sign(b) * Math.sign(c);\n  if (sign > 0) return "+";\n  if (sign < 0) return "-";\n  return "0";\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use Math.sign to get the sign of each number (-1, 0, or 1), multiply them together, and determine the result.'
            }
        ],
        examples: [
            { input: [3, -7, 2], output: '-', explanation: 'Product is 3 × (-7) × 2 = -42, which is negative, so return "-".' },
            { input: [-4, -2, 5], output: '+', explanation: 'Product is (-4) × (-2) × 5 = 40, which is positive, so return "+".' }
        ],
        constraints: [
            'All inputs will be integers',
            'Inputs can be negative, zero, or positive',
            'Do not compute the actual product; determine the sign logically'
        ],
        hints: [
            'If any number is zero, the product is zero.',
            'Count the number of negative numbers — an even count means positive, odd means negative.'
        ],
        testCases: [
            { input: [3, -7, 2], expectedOutput: '-', description: 'One negative: product is negative' },
            { input: [-4, -2, 5], expectedOutput: '+', description: 'Two negatives: product is positive' },
            { input: [0, 5, -3], expectedOutput: '0', description: 'One zero: product is zero' },
            { input: [1, 1, 1], expectedOutput: '+', description: 'All positive ones', isHidden: true },
            { input: [-1, -1, -1], expectedOutput: '-', description: 'All negative ones', isHidden: true },
            { input: [-1, -1, 1], expectedOutput: '+', description: 'Two negatives, one positive', isHidden: true },
            { input: [0, 0, 0], expectedOutput: '0', description: 'All zeros', isHidden: true },
            { input: [10, 20, 30], expectedOutput: '+', description: 'All positive numbers', isHidden: true },
            { input: [-10, -20, -30], expectedOutput: '-', description: 'All negative numbers', isHidden: true },
            { input: [-5, 0, 3], expectedOutput: '0', description: 'Zero in middle', isHidden: true },
            { input: [5, 3, 0], expectedOutput: '0', description: 'Zero at end', isHidden: true },
            { input: [-1, 2, 3], expectedOutput: '-', description: 'One negative at start', isHidden: true },
            { input: [2, -3, 4], expectedOutput: '-', description: 'One negative in middle', isHidden: true },
            { input: [2, 3, -4], expectedOutput: '-', description: 'One negative at end', isHidden: true },
            { input: [-2, -3, -4], expectedOutput: '-', description: 'Three negatives', isHidden: true },
            { input: [-100, 200, -300], expectedOutput: '+', description: 'Two negatives with large numbers', isHidden: true },
            { input: [1000, -1, 1000], expectedOutput: '-', description: 'Large positive with one negative', isHidden: true },
            { input: [-1, 1, -1], expectedOutput: '+', description: 'Alternating signs small', isHidden: true },
            { input: [0, -1, 1], expectedOutput: '0', description: 'Zero at start with mixed signs', isHidden: true },
            { input: [7, 8, 9], expectedOutput: '+', description: 'All single-digit positives', isHidden: true },
        ]
    },

    // Question 19: Sort Three Numbers
    {
        title: 'Sort Three Numbers',
        slug: 'sort-three-numbers',
        description: 'Write a JavaScript function that takes three numbers and returns a string with the numbers sorted in descending order, separated by ", ". For example, given 0, -1, 4 the function should return "4, 0, -1".',
        difficulty: 'Easy',
        order: 19,
        category: 'Conditional Statements',
        functionName: 'sortThreeNumbers',
        starterCode: `function sortThreeNumbers(a, b, c) {\n  // Write your code here\n}`,
        solution: `function sortThreeNumbers(a, b, c) {\n  const sorted = [a, b, c].sort((x, y) => y - x);\n  return sorted.join(", ");\n}`,
        solutions: [
            {
                title: 'Using if-else swaps',
                code: `function sortThreeNumbers(a, b, c) {\n  if (a < b) [a, b] = [b, a];\n  if (a < c) [a, c] = [c, a];\n  if (b < c) [b, c] = [c, b];\n  return a + ", " + b + ", " + c;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use conditional swaps to sort the three values in descending order, then concatenate them into a string.'
            },
            {
                title: 'Using Array.sort',
                code: `function sortThreeNumbers(a, b, c) {\n  return [a, b, c].sort((x, y) => y - x).join(", ");\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Place the three numbers in an array, sort in descending order using a comparator, and join with ", ".'
            }
        ],
        examples: [
            { input: [0, -1, 4], output: '4, 0, -1', explanation: 'Sorted descending: 4 > 0 > -1.' },
            { input: [5, 3, 8], output: '8, 5, 3', explanation: 'Sorted descending: 8 > 5 > 3.' }
        ],
        constraints: [
            'All inputs will be integers',
            'Inputs can be negative, zero, or positive',
            'The output string must use ", " (comma followed by space) as separator',
            'Numbers should be sorted in descending order'
        ],
        hints: [
            'You can put the numbers in an array and sort it.',
            'Remember to sort in descending order, not ascending.',
            'Use .join(", ") to format the output string.'
        ],
        testCases: [
            { input: [0, -1, 4], expectedOutput: '4, 0, -1', description: 'Mixed positive, negative, and zero' },
            { input: [5, 3, 8], expectedOutput: '8, 5, 3', description: 'All positive numbers' },
            { input: [1, 1, 1], expectedOutput: '1, 1, 1', description: 'All same numbers' },
            { input: [-5, -2, -8], expectedOutput: '-2, -5, -8', description: 'All negative numbers', isHidden: true },
            { input: [10, 20, 30], expectedOutput: '30, 20, 10', description: 'Already ascending order', isHidden: true },
            { input: [30, 20, 10], expectedOutput: '30, 20, 10', description: 'Already descending order', isHidden: true },
            { input: [0, 0, 0], expectedOutput: '0, 0, 0', description: 'All zeros', isHidden: true },
            { input: [-1, 0, 1], expectedOutput: '1, 0, -1', description: 'Consecutive with negatives', isHidden: true },
            { input: [100, -100, 0], expectedOutput: '100, 0, -100', description: 'Symmetric around zero', isHidden: true },
            { input: [7, 7, 3], expectedOutput: '7, 7, 3', description: 'Two equal, one different', isHidden: true },
            { input: [3, 7, 7], expectedOutput: '7, 7, 3', description: 'Two equal at end', isHidden: true },
            { input: [9, 1, 5], expectedOutput: '9, 5, 1', description: 'Random order', isHidden: true },
            { input: [-3, -1, -2], expectedOutput: '-1, -2, -3', description: 'Negative numbers random order', isHidden: true },
            { input: [1000, 500, 750], expectedOutput: '1000, 750, 500', description: 'Larger numbers', isHidden: true },
            { input: [-1000, -500, -750], expectedOutput: '-500, -750, -1000', description: 'Larger negative numbers', isHidden: true },
            { input: [2, 1, 3], expectedOutput: '3, 2, 1', description: 'Simple ascending input', isHidden: true },
            { input: [0, 5, -5], expectedOutput: '5, 0, -5', description: 'Zero in the middle after sort', isHidden: true },
            { input: [42, 42, 0], expectedOutput: '42, 42, 0', description: 'Two equal with zero', isHidden: true },
            { input: [-7, 3, -7], expectedOutput: '3, -7, -7', description: 'Two equal negatives', isHidden: true },
            { input: [15, -15, 0], expectedOutput: '15, 0, -15', description: 'Positive, negative, and zero symmetric', isHidden: true },
        ]
    },

    // Question 20: Largest of Five Numbers
    {
        title: 'Largest of Five Numbers',
        slug: 'largest-of-five-numbers',
        description: 'Write a JavaScript function that takes five numbers and returns the largest among them. For example, given -5, -2, -6, 0, -1 the function should return 0.',
        difficulty: 'Easy',
        order: 20,
        category: 'Conditional Statements',
        functionName: 'largestOfFive',
        starterCode: `function largestOfFive(a, b, c, d, e) {\n  // Write your code here\n}`,
        solution: `function largestOfFive(a, b, c, d, e) {\n  let max = a;\n  if (b > max) max = b;\n  if (c > max) max = c;\n  if (d > max) max = d;\n  if (e > max) max = e;\n  return max;\n}`,
        solutions: [
            {
                title: 'Using if comparisons',
                code: `function largestOfFive(a, b, c, d, e) {\n  let max = a;\n  if (b > max) max = b;\n  if (c > max) max = c;\n  if (d > max) max = d;\n  if (e > max) max = e;\n  return max;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Initialize max with the first number, then compare each subsequent number and update max if larger.'
            },
            {
                title: 'Using Math.max',
                code: `function largestOfFive(a, b, c, d, e) {\n  return Math.max(a, b, c, d, e);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use the built-in Math.max function which accepts multiple arguments and returns the largest.'
            }
        ],
        examples: [
            { input: [-5, -2, -6, 0, -1], output: 0, explanation: '0 is the largest among -5, -2, -6, 0, -1.' },
            { input: [10, 20, 30, 40, 50], output: 50, explanation: '50 is the largest among the five numbers.' }
        ],
        constraints: [
            'All inputs will be integers',
            'Inputs can be negative, zero, or positive',
            'There will always be exactly five inputs'
        ],
        hints: [
            'Start by assuming the first number is the largest.',
            'Compare each subsequent number and update if it is larger.',
            'Consider using Math.max() for a simpler approach.'
        ],
        testCases: [
            { input: [-5, -2, -6, 0, -1], expectedOutput: 0, description: '0 is the largest among negatives and zero' },
            { input: [10, 20, 30, 40, 50], expectedOutput: 50, description: '50 is the largest' },
            { input: [5, 5, 5, 5, 5], expectedOutput: 5, description: 'All numbers are equal' },
            { input: [1, 2, 3, 4, 5], expectedOutput: 5, description: 'Ascending order', isHidden: true },
            { input: [5, 4, 3, 2, 1], expectedOutput: 5, description: 'Descending order', isHidden: true },
            { input: [-1, -2, -3, -4, -5], expectedOutput: -1, description: 'All negative, -1 is largest', isHidden: true },
            { input: [100, 0, 0, 0, 0], expectedOutput: 100, description: 'Largest at first position', isHidden: true },
            { input: [0, 0, 0, 0, 100], expectedOutput: 100, description: 'Largest at last position', isHidden: true },
            { input: [0, 0, 100, 0, 0], expectedOutput: 100, description: 'Largest in the middle', isHidden: true },
            { input: [-100, -200, -50, -300, -150], expectedOutput: -50, description: 'Large negative numbers', isHidden: true },
            { input: [0, 0, 0, 0, 0], expectedOutput: 0, description: 'All zeros', isHidden: true },
            { input: [99, 100, 99, 99, 99], expectedOutput: 100, description: 'One number slightly larger', isHidden: true },
            { input: [-1, 0, 1, 0, -1], expectedOutput: 1, description: 'Symmetric around zero', isHidden: true },
            { input: [1000, 2000, 3000, 4000, 5000], expectedOutput: 5000, description: 'Large numbers ascending', isHidden: true },
            { input: [5000, 4000, 3000, 2000, 1000], expectedOutput: 5000, description: 'Large numbers descending', isHidden: true },
            { input: [7, 3, 9, 1, 5], expectedOutput: 9, description: 'Random order', isHidden: true },
            { input: [-10, 10, -20, 20, 0], expectedOutput: 20, description: 'Mixed positives and negatives', isHidden: true },
            { input: [42, 42, 42, 43, 42], expectedOutput: 43, description: 'Four same, one different', isHidden: true },
            { input: [-999, -998, -1000, -997, -996], expectedOutput: -996, description: 'Close negative numbers', isHidden: true },
            { input: [1, 1, 2, 1, 1], expectedOutput: 2, description: 'Largest in third position', isHidden: true },
        ]
    },

    // Question 21: Odd or Even Loop
    {
        title: 'Odd or Even Loop',
        slug: 'odd-or-even-loop',
        description: 'Write a JavaScript function that iterates through numbers from 0 to 15 and returns an array of strings. For each number, if the number is even, add "N is even" to the array; if the number is odd, add "N is odd" to the array (where N is the actual number).',
        difficulty: 'Easy',
        order: 21,
        category: 'Conditional Statements',
        functionName: 'oddOrEvenLoop',
        starterCode: `function oddOrEvenLoop() {\n  // Write your code here\n}`,
        solution: `function oddOrEvenLoop() {\n  const result = [];\n  for (let i = 0; i <= 15; i++) {\n    if (i % 2 === 0) {\n      result.push(i + " is even");\n    } else {\n      result.push(i + " is odd");\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using for loop with if-else',
                code: `function oddOrEvenLoop() {\n  const result = [];\n  for (let i = 0; i <= 15; i++) {\n    if (i % 2 === 0) {\n      result.push(i + " is even");\n    } else {\n      result.push(i + " is odd");\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Loop from 0 to 15 and use the modulo operator to check if each number is even or odd, pushing the appropriate string into the result array.'
            },
            {
                title: 'Using Array.from with ternary',
                code: `function oddOrEvenLoop() {\n  return Array.from({ length: 16 }, (_, i) => i % 2 === 0 ? i + " is even" : i + " is odd");\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use Array.from to generate 16 elements (0–15), using a mapping function with a ternary to determine even or odd.'
            }
        ],
        examples: [
            { input: [], output: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], explanation: 'Numbers 0-15 classified as even or odd.' }
        ],
        constraints: [
            'The function takes no arguments',
            'Iterate from 0 to 15 inclusive',
            'Return an array of strings in the format "N is even" or "N is odd"'
        ],
        hints: [
            'Use a for loop from 0 to 15.',
            'Use the modulo operator (%) to check if a number is even or odd.',
            'Push formatted strings into an array and return it.'
        ],
        testCases: [
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Full output for 0-15' },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify array length is 16' },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify correct even/odd classification' },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Check first element is "0 is even"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Check last element is "15 is odd"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify string format with spaces', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify "10 is even" has two-digit number', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify alternating even/odd pattern', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify element at index 5 is "5 is odd"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify element at index 10 is "10 is even"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify 8 even numbers in output', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify 8 odd numbers in output', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify element at index 7 is "7 is odd"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify element at index 14 is "14 is even"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify output is an array', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify all elements are strings', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify starts from 0 not 1', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify ends at 15 not 16', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify element at index 3 is "3 is odd"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Verify element at index 12 is "12 is even"', isHidden: true },
            { input: [], expectedOutput: ['0 is even', '1 is odd', '2 is even', '3 is odd', '4 is even', '5 is odd', '6 is even', '7 is odd', '8 is even', '9 is odd', '10 is even', '11 is odd', '12 is even', '13 is odd', '14 is even', '15 is odd'], description: 'Full deterministic output check', isHidden: true },
        ]
    },

    // ═══════════════════════════════════════════════════
    // LOOPS & PATTERNS (Questions 22-26)
    // ═══════════════════════════════════════════════════

    // Question 22: FizzBuzz
    {
        title: 'FizzBuzz',
        slug: 'fizzbuzz',
        description: 'Write a JavaScript function that iterates integers from 1 to 100. For multiples of three, use "Fizz" instead of the number. For multiples of five, use "Buzz". For numbers that are multiples of both three and five, use "FizzBuzz". Return the results as an array.',
        difficulty: 'Easy',
        order: 22,
        category: 'Loops & Patterns',
        functionName: 'fizzBuzz',
        starterCode: `function fizzBuzz() {\n  // Write your code here\n}`,
        solution: `function fizzBuzz() {\n  const result = [];\n  for (let i = 1; i <= 100; i++) {\n    if (i % 3 === 0 && i % 5 === 0) {\n      result.push("FizzBuzz");\n    } else if (i % 3 === 0) {\n      result.push("Fizz");\n    } else if (i % 5 === 0) {\n      result.push("Buzz");\n    } else {\n      result.push(i);\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using if-else chain',
                code: `function fizzBuzz() {\n  const result = [];\n  for (let i = 1; i <= 100; i++) {\n    if (i % 3 === 0 && i % 5 === 0) {\n      result.push("FizzBuzz");\n    } else if (i % 3 === 0) {\n      result.push("Fizz");\n    } else if (i % 5 === 0) {\n      result.push("Buzz");\n    } else {\n      result.push(i);\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Iterate from 1 to 100. Check divisibility by both 3 and 5 first (FizzBuzz), then by 3 (Fizz), then by 5 (Buzz), otherwise push the number itself.'
            },
            {
                title: 'Using string concatenation',
                code: `function fizzBuzz() {\n  const result = [];\n  for (let i = 1; i <= 100; i++) {\n    let str = "";\n    if (i % 3 === 0) str += "Fizz";\n    if (i % 5 === 0) str += "Buzz";\n    result.push(str || i);\n  }\n  return result;\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Build the string by concatenating "Fizz" and/or "Buzz" as needed. If the string is empty, push the number. This avoids checking the combined case separately.'
            }
        ],
        examples: [
            { input: [], output: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'], explanation: 'First 15 elements: numbers replaced by Fizz, Buzz, or FizzBuzz as appropriate.' }
        ],
        constraints: [
            'The function takes no arguments',
            'Iterate from 1 to 100 inclusive',
            'Return an array containing numbers and/or strings',
            'Multiples of 3 → "Fizz", multiples of 5 → "Buzz", multiples of both → "FizzBuzz"'
        ],
        hints: [
            'Check for multiples of both 3 and 5 first before checking individually.',
            'Use the modulo operator (%) to check divisibility.',
            'An alternative approach: build a string by concatenating "Fizz" and "Buzz" separately.'
        ],
        testCases: [
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Full FizzBuzz output for 1-100' },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify array has 100 elements' },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 0 is 1' },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 2 is "Fizz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 4 is "Buzz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 14 is "FizzBuzz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 29 is "FizzBuzz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 99 is "Buzz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 5 is "Fizz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 9 is "Buzz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 44 is "FizzBuzz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify numbers are integers not strings', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify starts at 1 not 0', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify ends at 100', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 59 is "FizzBuzz"', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 6 is 7', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify element at index 97 is 98', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify 27 Fizz-only entries', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify 14 Buzz-only entries', isHidden: true },
            { input: [], expectedOutput: (function() { const r = []; for (let i = 1; i <= 100; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; r.push(s || i); } return r; })(), description: 'Verify 6 FizzBuzz entries', isHidden: true },
        ]
    },

    // Question 23: Happy Numbers (First 5)
    {
        title: 'Happy Numbers (First 5)',
        slug: 'happy-numbers-first-5',
        description: 'Write a JavaScript function to find and return the first 5 happy numbers as an array. A happy number is defined by the following process: starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (happy) or it loops endlessly in a cycle (unhappy).',
        difficulty: 'Medium',
        order: 23,
        category: 'Loops & Patterns',
        functionName: 'happyNumbers',
        starterCode: `function happyNumbers() {\n  // Write your code here\n}`,
        solution: `function happyNumbers() {\n  function isHappy(n) {\n    const seen = new Set();\n    while (n !== 1) {\n      n = String(n).split('').reduce((sum, d) => sum + d * d, 0);\n      if (seen.has(n)) return false;\n      seen.add(n);\n    }\n    return true;\n  }\n  const result = [];\n  let num = 1;\n  while (result.length < 5) {\n    if (isHappy(num)) result.push(num);\n    num++;\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using Set for cycle detection',
                code: `function happyNumbers() {\n  function isHappy(n) {\n    const seen = new Set();\n    while (n !== 1) {\n      n = String(n).split('').reduce((sum, d) => sum + d * d, 0);\n      if (seen.has(n)) return false;\n      seen.add(n);\n    }\n    return true;\n  }\n  const result = [];\n  let num = 1;\n  while (result.length < 5) {\n    if (isHappy(num)) result.push(num);\n    num++;\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(k × m)',
                spaceComplexity: 'O(m)',
                explanation: 'For each number starting from 1, check if it is happy by repeatedly summing the squares of its digits. Use a Set to detect cycles. Collect the first 5 happy numbers.'
            },
            {
                title: 'Using Floyd cycle detection',
                code: `function happyNumbers() {\n  function getNext(n) {\n    let sum = 0;\n    while (n > 0) {\n      const d = n % 10;\n      sum += d * d;\n      n = Math.floor(n / 10);\n    }\n    return sum;\n  }\n  function isHappy(n) {\n    let slow = n, fast = getNext(n);\n    while (fast !== 1 && slow !== fast) {\n      slow = getNext(slow);\n      fast = getNext(getNext(fast));\n    }\n    return fast === 1;\n  }\n  const result = [];\n  let num = 1;\n  while (result.length < 5) {\n    if (isHappy(num)) result.push(num);\n    num++;\n  }\n  return result;\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(k × m)',
                spaceComplexity: 'O(1)',
                explanation: 'Use Floyd\'s tortoise and hare algorithm to detect cycles without extra memory. A slow pointer moves one step and a fast pointer moves two steps — if they meet and it\'s not 1, the number is unhappy.'
            }
        ],
        examples: [
            { input: [], output: [1, 7, 10, 13, 19], explanation: 'The first 5 happy numbers are 1, 7, 10, 13, and 19.' }
        ],
        constraints: [
            'The function takes no arguments',
            'Return exactly 5 happy numbers',
            'Happy numbers start from 1',
            'A happy number eventually reaches 1 when replacing with sum of squares of digits'
        ],
        hints: [
            'A number is happy if repeatedly summing the squares of its digits eventually reaches 1.',
            'Use a Set to track numbers you\'ve already seen to detect infinite loops.',
            'Start checking from 1 and collect happy numbers until you have 5.'
        ],
        testCases: [
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'First 5 happy numbers' },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify array has 5 elements' },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify first happy number is 1' },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify second happy number is 7', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify third happy number is 10', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify fourth happy number is 13', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify fifth happy number is 19', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify result is an array', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify all elements are integers', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify numbers are in ascending order', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 1 is happy: 1² = 1', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 7 is happy: 49→97→130→10→1', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 10 is happy: 1+0=1', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 13 is happy: 1+9=10→1', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 19 is happy: 82→68→100→1', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 2 is not included (unhappy)', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 3 is not included (unhappy)', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify 4 is not included (unhappy)', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Verify no duplicates in result', isHidden: true },
            { input: [], expectedOutput: [1, 7, 10, 13, 19], description: 'Full deterministic output check', isHidden: true },
        ]
    },

    // Question 24: 3-Digit Armstrong Numbers
    {
        title: '3-Digit Armstrong Numbers',
        slug: '3-digit-armstrong-numbers',
        description: 'Write a JavaScript function to find all Armstrong numbers of 3 digits and return them as an array. An Armstrong number of three digits is an integer such that the sum of the cubes of its digits is equal to the number itself. For example, 371 is an Armstrong number since 3³ + 7³ + 1³ = 371.',
        difficulty: 'Easy',
        order: 24,
        category: 'Loops & Patterns',
        functionName: 'armstrongNumbers',
        starterCode: `function armstrongNumbers() {\n  // Write your code here\n}`,
        solution: `function armstrongNumbers() {\n  const result = [];\n  for (let i = 100; i <= 999; i++) {\n    const digits = String(i).split('').map(Number);\n    const sum = digits.reduce((acc, d) => acc + d ** 3, 0);\n    if (sum === i) result.push(i);\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using string splitting',
                code: `function armstrongNumbers() {\n  const result = [];\n  for (let i = 100; i <= 999; i++) {\n    const digits = String(i).split('').map(Number);\n    const sum = digits.reduce((acc, d) => acc + d ** 3, 0);\n    if (sum === i) result.push(i);\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                explanation: 'Iterate from 100 to 999. For each number, convert to string, extract digits, compute the sum of cubes, and check if it equals the original number.'
            },
            {
                title: 'Using arithmetic extraction',
                code: `function armstrongNumbers() {\n  const result = [];\n  for (let i = 100; i <= 999; i++) {\n    const h = Math.floor(i / 100);\n    const t = Math.floor((i % 100) / 10);\n    const u = i % 10;\n    if (h ** 3 + t ** 3 + u ** 3 === i) result.push(i);\n  }\n  return result;\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                explanation: 'Extract hundreds, tens, and units digits using arithmetic (division and modulo). Compute the sum of cubes directly without string conversion for better performance.'
            }
        ],
        examples: [
            { input: [], output: [153, 370, 371, 407], explanation: '153 = 1³+5³+3³, 370 = 3³+7³+0³, 371 = 3³+7³+1³, 407 = 4³+0³+7³.' }
        ],
        constraints: [
            'The function takes no arguments',
            'Check all 3-digit numbers (100-999)',
            'An Armstrong number: sum of cubes of digits equals the number',
            'Return all matching numbers as an array in ascending order'
        ],
        hints: [
            'Loop through all 3-digit numbers (100 to 999).',
            'For each number, extract the individual digits.',
            'Cube each digit, sum them, and compare with the original number.'
        ],
        testCases: [
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'All 3-digit Armstrong numbers' },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify array has 4 elements' },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 153 is Armstrong: 1+125+27=153' },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 370 is Armstrong: 27+343+0=370', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 371 is Armstrong: 27+343+1=371', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 407 is Armstrong: 64+0+343=407', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify first element is 153', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify last element is 407', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify result is an array', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify all elements are integers', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify numbers are in ascending order', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 100 is not Armstrong', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 999 is not Armstrong', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 200 is not Armstrong', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 500 is not Armstrong', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify no duplicates in result', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify all are 3-digit numbers', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify exactly 4 Armstrong numbers exist', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Verify 152 is not Armstrong', isHidden: true },
            { input: [], expectedOutput: [153, 370, 371, 407], description: 'Full deterministic output check', isHidden: true },
        ]
    },

    // Question 25: Pyramid Pattern with Nested Loop
    {
        title: 'Pyramid Pattern with Nested Loop',
        slug: 'pyramid-pattern-with-nested-loop',
        description: 'Write a JavaScript function that constructs a pyramid pattern using nested loops and returns it as an array of strings. Each row i (starting from 1) should contain i asterisks separated by spaces. For example, row 1 is "*", row 2 is "* *", row 3 is "* * *", etc. Build the pattern for 5 rows.',
        difficulty: 'Easy',
        order: 25,
        category: 'Loops & Patterns',
        functionName: 'pyramidPattern',
        starterCode: `function pyramidPattern() {\n  // Write your code here\n}`,
        solution: `function pyramidPattern() {\n  const result = [];\n  for (let i = 1; i <= 5; i++) {\n    let row = '';\n    for (let j = 1; j <= i; j++) {\n      row += j === 1 ? '*' : ' *';\n    }\n    result.push(row);\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using nested for loops',
                code: `function pyramidPattern() {\n  const result = [];\n  for (let i = 1; i <= 5; i++) {\n    let row = '';\n    for (let j = 1; j <= i; j++) {\n      row += j === 1 ? '*' : ' *';\n    }\n    result.push(row);\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                explanation: 'Use an outer loop for rows (1 to 5) and an inner loop to build each row by appending asterisks separated by spaces.'
            },
            {
                title: 'Using Array.from and repeat/join',
                code: `function pyramidPattern() {\n  return Array.from({ length: 5 }, (_, i) => Array(i + 1).fill('*').join(' '));\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                explanation: 'Use Array.from to generate 5 rows. For each row, create an array of (i+1) asterisks and join them with spaces.'
            }
        ],
        examples: [
            { input: [], output: ['*', '* *', '* * *', '* * * *', '* * * * *'], explanation: 'A 5-row pyramid where each row has an increasing number of asterisks.' }
        ],
        constraints: [
            'The function takes no arguments',
            'Build exactly 5 rows',
            'Each row contains asterisks separated by single spaces',
            'Row i contains i asterisks',
            'Return an array of strings'
        ],
        hints: [
            'Use a nested loop: outer loop for rows, inner loop for asterisks.',
            'Separate asterisks with a space, but don\'t add a trailing space.',
            'You can also use Array.fill("*").join(" ") to build each row.'
        ],
        testCases: [
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Full 5-row pyramid pattern' },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify array has 5 elements' },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify first row is single asterisk' },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify second row is "* *"', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify third row is "* * *"', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify fourth row is "* * * *"', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify fifth row is "* * * * *"', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify result is an array', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify all elements are strings', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify no trailing spaces in row 1', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify no trailing spaces in row 5', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify row 1 length is 1', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify row 2 length is 3', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify row 3 length is 5', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify row 4 length is 7', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify row 5 length is 9', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify spaces separate asterisks', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify no leading spaces', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Verify only * and space characters used', isHidden: true },
            { input: [], expectedOutput: ['*', '* *', '* * *', '* * * *', '* * * * *'], description: 'Full deterministic output check', isHidden: true },
        ]
    },

    // Question 26: Sum of Multiples of 3 and 5 under 1000
    {
        title: 'Sum of Multiples of 3 and 5 under 1000',
        slug: 'sum-of-multiples-of-3-and-5-under-1000',
        description: 'Write a JavaScript function that computes the sum of all multiples of 3 or 5 below 1000 and returns the result.',
        difficulty: 'Easy',
        order: 26,
        category: 'Loops & Patterns',
        functionName: 'sumMultiples',
        starterCode: `function sumMultiples() {\n  // Write your code here\n}`,
        solution: `function sumMultiples() {\n  let sum = 0;\n  for (let i = 1; i < 1000; i++) {\n    if (i % 3 === 0 || i % 5 === 0) {\n      sum += i;\n    }\n  }\n  return sum;\n}`,
        solutions: [
            {
                title: 'Using a loop with modulo',
                code: `function sumMultiples() {\n  let sum = 0;\n  for (let i = 1; i < 1000; i++) {\n    if (i % 3 === 0 || i % 5 === 0) {\n      sum += i;\n    }\n  }\n  return sum;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                explanation: 'Iterate from 1 to 999 and add numbers that are divisible by 3 or 5 to a running sum.'
            },
            {
                title: 'Using inclusion-exclusion formula',
                code: `function sumMultiples() {\n  function sumDiv(k, n) {\n    const m = Math.floor((n - 1) / k);\n    return k * m * (m + 1) / 2;\n  }\n  return sumDiv(3, 1000) + sumDiv(5, 1000) - sumDiv(15, 1000);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use the arithmetic series formula: sum of multiples of k below n is k × m × (m+1)/2 where m = floor((n-1)/k). Apply inclusion-exclusion: sum(3) + sum(5) − sum(15) to avoid double-counting.'
            }
        ],
        examples: [
            { input: [], output: 233168, explanation: 'The sum of all multiples of 3 or 5 below 1000 is 233168.' }
        ],
        constraints: [
            'The function takes no arguments',
            'Sum multiples of 3 OR 5 (not just both)',
            'Only include numbers below 1000 (not 1000 itself)',
            'Return a single integer'
        ],
        hints: [
            'Loop from 1 to 999 and check if each number is divisible by 3 or 5.',
            'Use the modulo operator (%) to check divisibility.',
            'Be careful not to double-count numbers divisible by both 3 and 5 (like 15, 30, etc.) — the OR condition handles this automatically.'
        ],
        testCases: [
            { input: [], expectedOutput: 233168, description: 'Sum of multiples of 3 or 5 below 1000' },
            { input: [], expectedOutput: 233168, description: 'Verify result is an integer' },
            { input: [], expectedOutput: 233168, description: 'Verify result is 233168' },
            { input: [], expectedOutput: 233168, description: 'Verify 3 is included in sum', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 5 is included in sum', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 15 is not double-counted', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 999 is included (divisible by 3)', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 995 is included (divisible by 5)', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 1000 is not included', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify result is positive', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify sum includes 6 (multiple of 3)', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify sum includes 10 (multiple of 5)', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify sum includes 30 (multiple of both)', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 1 is not included', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 2 is not included', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 4 is not included', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify 7 is not included', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify result type is number', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Verify result is not negative', isHidden: true },
            { input: [], expectedOutput: 233168, description: 'Full deterministic output check', isHidden: true },
        ]
    },

    // ═══════════════════════════════════════════════════
    // ARRAY (Questions 27-37)
    // ═══════════════════════════════════════════════════

    // Question 27: Check Array Input
    {
        title: 'Check Array Input',
        slug: 'check-array-input',
        description: 'Write a JavaScript function to check whether an input is an array or not. Return true if the input is an array, false otherwise.',
        difficulty: 'Easy',
        order: 27,
        category: 'Array',
        functionName: 'isArray',
        starterCode: `function isArray(input) {\n  // Write your code here\n}`,
        solution: `function isArray(input) {\n  return Array.isArray(input);\n}`,
        solutions: [
            {
                title: 'Using instanceof',
                code: `function isArray(input) {\n  return input instanceof Array;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use the instanceof operator to check if the input is an instance of Array. This works in most cases but can fail across different frames/contexts.'
            },
            {
                title: 'Using Array.isArray',
                code: `function isArray(input) {\n  return Array.isArray(input);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                explanation: 'Use the built-in Array.isArray() method which reliably determines whether the passed value is an Array, regardless of the context.'
            }
        ],
        examples: [
            { input: ['w3resource'], output: false, explanation: '"w3resource" is a string, not an array.' },
            { input: [[1, 2, 4, 0]], output: true, explanation: '[1, 2, 4, 0] is an array.' }
        ],
        constraints: [
            'The input can be any JavaScript value',
            'Return a boolean: true if array, false otherwise',
            'Nested arrays should still return true'
        ],
        hints: [
            'JavaScript has a built-in method Array.isArray() to check if a value is an array.',
            'You can also use instanceof Array, but Array.isArray is more reliable.'
        ],
        testCases: [
            { input: ['w3resource'], expectedOutput: false, description: 'String is not an array' },
            { input: [[1, 2, 4, 0]], expectedOutput: true, description: 'Number array returns true' },
            { input: [123], expectedOutput: false, description: 'Number is not an array' },
            { input: [true], expectedOutput: false, description: 'Boolean is not an array', isHidden: true },
            { input: [null], expectedOutput: false, description: 'Null is not an array', isHidden: true },
            { input: [undefined], expectedOutput: false, description: 'Undefined is not an array', isHidden: true },
            { input: [[]], expectedOutput: true, description: 'Empty array is an array', isHidden: true },
            { input: [['a', 'b', 'c']], expectedOutput: true, description: 'String array is an array', isHidden: true },
            { input: [[1, 2, [3, 4]]], expectedOutput: true, description: 'Nested array is an array', isHidden: true },
            { input: [{}], expectedOutput: false, description: 'Object is not an array', isHidden: true },
            { input: [0], expectedOutput: false, description: 'Zero is not an array', isHidden: true },
            { input: [''], expectedOutput: false, description: 'Empty string is not an array', isHidden: true },
            { input: [[null]], expectedOutput: true, description: 'Array with null is an array', isHidden: true },
            { input: [[undefined]], expectedOutput: true, description: 'Array with undefined is an array', isHidden: true },
            { input: [[1]], expectedOutput: true, description: 'Single element array is an array', isHidden: true },
            { input: [' '], expectedOutput: false, description: 'Space string is not an array', isHidden: true },
            { input: [NaN], expectedOutput: false, description: 'NaN is not an array', isHidden: true },
            { input: [[true, false]], expectedOutput: true, description: 'Boolean array is an array', isHidden: true },
            { input: [[[]]], expectedOutput: true, description: 'Array of empty array is an array', isHidden: true },
            { input: [42.5], expectedOutput: false, description: 'Float is not an array', isHidden: true },
        ]
    },

    // Question 28: Clone Array
    {
        title: 'Clone Array',
        slug: 'clone-array',
        description: 'Write a JavaScript function to clone an array. The function should return a new array with the same elements as the original (shallow copy).',
        difficulty: 'Easy',
        order: 28,
        category: 'Array',
        functionName: 'arrayClone',
        starterCode: `function arrayClone(arr) {\n  // Write your code here\n}`,
        solution: `function arrayClone(arr) {\n  return arr.slice(0);\n}`,
        solutions: [
            {
                title: 'Using slice',
                code: `function arrayClone(arr) {\n  return arr.slice(0);\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use Array.slice(0) to create a shallow copy of the array. This copies all elements into a new array.'
            },
            {
                title: 'Using spread operator',
                code: `function arrayClone(arr) {\n  return [...arr];\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use the spread operator to create a shallow copy. This is the most concise and modern approach.'
            }
        ],
        examples: [
            { input: [[1, 2, 4, 0]], output: [1, 2, 4, 0], explanation: 'Returns a new array with the same elements.' },
            { input: [[1, 2, [4, 0]]], output: [1, 2, [4, 0]], explanation: 'Nested arrays are copied by reference (shallow copy).' }
        ],
        constraints: [
            'The input will always be an array',
            'Return a new array (shallow copy)',
            'The original array should not be modified',
            'Nested arrays/objects are copied by reference'
        ],
        hints: [
            'Array.slice() without arguments or with 0 creates a shallow copy.',
            'The spread operator [...arr] also creates a shallow copy.',
            'Array.from(arr) is another alternative.'
        ],
        testCases: [
            { input: [[1, 2, 4, 0]], expectedOutput: [1, 2, 4, 0], description: 'Clone number array' },
            { input: [[1, 2, [4, 0]]], expectedOutput: [1, 2, [4, 0]], description: 'Clone nested array' },
            { input: [[]], expectedOutput: [], description: 'Clone empty array' },
            { input: [['a', 'b', 'c']], expectedOutput: ['a', 'b', 'c'], description: 'Clone string array', isHidden: true },
            { input: [[true, false, true]], expectedOutput: [true, false, true], description: 'Clone boolean array', isHidden: true },
            { input: [[1]], expectedOutput: [1], description: 'Clone single element array', isHidden: true },
            { input: [[null, undefined]], expectedOutput: [null, undefined], description: 'Clone array with null and undefined', isHidden: true },
            { input: [[1, 'two', 3, 'four']], expectedOutput: [1, 'two', 3, 'four'], description: 'Clone mixed type array', isHidden: true },
            { input: [[0, 0, 0]], expectedOutput: [0, 0, 0], description: 'Clone array of zeros', isHidden: true },
            { input: [[-1, -2, -3]], expectedOutput: [-1, -2, -3], description: 'Clone negative number array', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], description: 'Clone larger array', isHidden: true },
            { input: [[[1, 2], [3, 4]]], expectedOutput: [[1, 2], [3, 4]], description: 'Clone 2D array', isHidden: true },
            { input: [['hello']], expectedOutput: ['hello'], description: 'Clone single string array', isHidden: true },
            { input: [[100, 200, 300]], expectedOutput: [100, 200, 300], description: 'Clone triple digit array', isHidden: true },
            { input: [[1, null, 3, null, 5]], expectedOutput: [1, null, 3, null, 5], description: 'Clone array with nulls scattered', isHidden: true },
            { input: [['x', 'y', 'z']], expectedOutput: ['x', 'y', 'z'], description: 'Clone character array', isHidden: true },
            { input: [[10, 20]], expectedOutput: [10, 20], description: 'Clone two element array', isHidden: true },
            { input: [[false]], expectedOutput: [false], description: 'Clone single false array', isHidden: true },
            { input: [[[[], []]]], expectedOutput: [[[],[]]], description: 'Clone deeply nested empty arrays', isHidden: true },
            { input: [[1, 2, 3, 4, 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'Clone simple sequential array', isHidden: true },
        ]
    },

    // Question 29: First Elements of Array
    {
        title: 'First Elements of Array',
        slug: 'first-elements-of-array',
        description: 'Write a JavaScript function to get the first element of an array. Passing the parameter n will return the first n elements of the array. If n is not provided, return just the first element. If the array is empty or n is negative, return an empty array. If n exceeds array length, return the whole array.',
        difficulty: 'Easy',
        order: 29,
        category: 'Array',
        functionName: 'first',
        starterCode: `function first(arr, n) {\n  // Write your code here\n}`,
        solution: `function first(arr, n) {\n  if (arr.length === 0) return [];\n  if (n === undefined) return arr[0];\n  if (n <= 0) return [];\n  return arr.slice(0, n);\n}`,
        solutions: [
            {
                title: 'Using conditional checks and slice',
                code: `function first(arr, n) {\n  if (arr.length === 0) return [];\n  if (n === undefined) return arr[0];\n  if (n <= 0) return [];\n  return arr.slice(0, n);\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Handle edge cases first: empty array returns [], no n returns first element, negative n returns []. Otherwise use slice to get the first n elements.'
            },
            {
                title: 'Concise version',
                code: `function first(arr, n) {\n  if (arr.length === 0) return [];\n  if (n === undefined) return arr[0];\n  return n <= 0 ? [] : arr.slice(0, n);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Same logic condensed with a ternary operator for the negative/zero case combined with slice.'
            }
        ],
        examples: [
            { input: [[7, 9, 0, -2]], output: 7, explanation: 'No n provided, return just the first element.' },
            { input: [[], 3], output: [], explanation: 'Empty array returns empty array regardless of n.' },
            { input: [[7, 9, 0, -2], 3], output: [7, 9, 0], explanation: 'Return the first 3 elements.' },
            { input: [[7, 9, 0, -2], 6], output: [7, 9, 0, -2], explanation: 'n exceeds length, return whole array.' },
            { input: [[7, 9, 0, -2], -3], output: [], explanation: 'Negative n returns empty array.' }
        ],
        constraints: [
            'If n is not provided, return just the first element (not in an array)',
            'If the array is empty, return an empty array',
            'If n is negative or zero, return an empty array',
            'If n exceeds the array length, return the entire array'
        ],
        hints: [
            'Check if n is undefined to decide whether to return a single element or an array.',
            'Use Array.slice(0, n) to get the first n elements.',
            'Handle edge cases: empty array, negative n, n larger than array length.'
        ],
        testCases: [
            { input: [[7, 9, 0, -2]], expectedOutput: 7, description: 'No n: return first element' },
            { input: [[], 3], expectedOutput: [], description: 'Empty array with n returns []' },
            { input: [[7, 9, 0, -2], 3], expectedOutput: [7, 9, 0], description: 'First 3 elements' },
            { input: [[7, 9, 0, -2], 6], expectedOutput: [7, 9, 0, -2], description: 'n exceeds length: return all', isHidden: true },
            { input: [[7, 9, 0, -2], -3], expectedOutput: [], description: 'Negative n returns []', isHidden: true },
            { input: [[1, 2, 3], 1], expectedOutput: [1], description: 'First 1 element as array', isHidden: true },
            { input: [[1, 2, 3], 0], expectedOutput: [], description: 'n=0 returns []', isHidden: true },
            { input: [['a', 'b', 'c']], expectedOutput: 'a', description: 'First string element', isHidden: true },
            { input: [['a', 'b', 'c'], 2], expectedOutput: ['a', 'b'], description: 'First 2 string elements', isHidden: true },
            { input: [[100]], expectedOutput: 100, description: 'Single element array, no n', isHidden: true },
            { input: [[100], 1], expectedOutput: [100], description: 'Single element with n=1', isHidden: true },
            { input: [[100], 5], expectedOutput: [100], description: 'Single element with n>length', isHidden: true },
            { input: [[5, 10, 15, 20, 25], 4], expectedOutput: [5, 10, 15, 20], description: 'First 4 of 5 elements', isHidden: true },
            { input: [[5, 10, 15, 20, 25], 5], expectedOutput: [5, 10, 15, 20, 25], description: 'n equals length', isHidden: true },
            { input: [[-1, -2, -3], 2], expectedOutput: [-1, -2], description: 'First 2 negative elements', isHidden: true },
            { input: [[true, false, true], 2], expectedOutput: [true, false], description: 'First 2 booleans', isHidden: true },
            { input: [[null, 1, 2]], expectedOutput: null, description: 'First element is null', isHidden: true },
            { input: [[], -1], expectedOutput: [], description: 'Empty array with negative n', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7], expectedOutput: [1, 2, 3, 4, 5, 6, 7], description: 'First 7 of 10 elements', isHidden: true },
            { input: [[0, 0, 0], 2], expectedOutput: [0, 0], description: 'First 2 zeros', isHidden: true },
        ]
    },

    // Question 30: Last Elements of Array
    {
        title: 'Last Elements of Array',
        slug: 'last-elements-of-array',
        description: 'Write a JavaScript function to get the last element of an array. Passing the parameter n will return the last n elements of the array. If n is not provided, return just the last element. If n exceeds the array length, return the entire array.',
        difficulty: 'Easy',
        order: 30,
        category: 'Array',
        functionName: 'last',
        starterCode: `function last(arr, n) {\n  // Write your code here\n}`,
        solution: `function last(arr, n) {\n  if (arr.length === 0) return [];\n  if (n === undefined) return arr[arr.length - 1];\n  if (n <= 0) return [];\n  return arr.slice(-n);\n}`,
        solutions: [
            {
                title: 'Using conditional checks and slice',
                code: `function last(arr, n) {\n  if (arr.length === 0) return [];\n  if (n === undefined) return arr[arr.length - 1];\n  if (n <= 0) return [];\n  return arr.slice(-n);\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Handle edge cases: empty array returns [], no n returns last element, negative n returns []. Use slice with negative index to get last n elements.'
            },
            {
                title: 'Using Math.max for safety',
                code: `function last(arr, n) {\n  if (arr.length === 0) return [];\n  if (n === undefined) return arr[arr.length - 1];\n  if (n <= 0) return [];\n  return arr.slice(Math.max(arr.length - n, 0));\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Same approach but uses Math.max to ensure slice start index is never negative, making the intent clearer.'
            }
        ],
        examples: [
            { input: [[7, 9, 0, -2]], output: -2, explanation: 'No n provided, return just the last element.' },
            { input: [[7, 9, 0, -2], 3], output: [9, 0, -2], explanation: 'Return the last 3 elements.' },
            { input: [[7, 9, 0, -2], 6], output: [7, 9, 0, -2], explanation: 'n exceeds length, return whole array.' }
        ],
        constraints: [
            'If n is not provided, return just the last element (not in an array)',
            'If the array is empty, return an empty array',
            'If n is negative or zero, return an empty array',
            'If n exceeds the array length, return the entire array'
        ],
        hints: [
            'Use arr[arr.length - 1] to get the last element.',
            'Use Array.slice(-n) to get the last n elements.',
            'Handle edge cases for empty arrays and when n is not provided.'
        ],
        testCases: [
            { input: [[7, 9, 0, -2]], expectedOutput: -2, description: 'No n: return last element' },
            { input: [[7, 9, 0, -2], 3], expectedOutput: [9, 0, -2], description: 'Last 3 elements' },
            { input: [[7, 9, 0, -2], 6], expectedOutput: [7, 9, 0, -2], description: 'n exceeds length: return all' },
            { input: [[1, 2, 3], 1], expectedOutput: [3], description: 'Last 1 element as array', isHidden: true },
            { input: [[1, 2, 3], 0], expectedOutput: [], description: 'n=0 returns []', isHidden: true },
            { input: [[], 3], expectedOutput: [], description: 'Empty array returns []', isHidden: true },
            { input: [['a', 'b', 'c']], expectedOutput: 'c', description: 'Last string element', isHidden: true },
            { input: [['a', 'b', 'c'], 2], expectedOutput: ['b', 'c'], description: 'Last 2 string elements', isHidden: true },
            { input: [[100]], expectedOutput: 100, description: 'Single element array, no n', isHidden: true },
            { input: [[100], 1], expectedOutput: [100], description: 'Single element with n=1', isHidden: true },
            { input: [[100], 5], expectedOutput: [100], description: 'Single element with n>length', isHidden: true },
            { input: [[5, 10, 15, 20, 25], 4], expectedOutput: [10, 15, 20, 25], description: 'Last 4 of 5 elements', isHidden: true },
            { input: [[5, 10, 15, 20, 25], 5], expectedOutput: [5, 10, 15, 20, 25], description: 'n equals length', isHidden: true },
            { input: [[-1, -2, -3], 2], expectedOutput: [-2, -3], description: 'Last 2 negative elements', isHidden: true },
            { input: [[true, false, true], 2], expectedOutput: [false, true], description: 'Last 2 booleans', isHidden: true },
            { input: [[1, 2, null]], expectedOutput: null, description: 'Last element is null', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7], expectedOutput: [4, 5, 6, 7, 8, 9, 10], description: 'Last 7 of 10 elements', isHidden: true },
            { input: [[0, 0, 0], 2], expectedOutput: [0, 0], description: 'Last 2 zeros', isHidden: true },
            { input: [[], -1], expectedOutput: [], description: 'Empty array with negative n', isHidden: true },
            { input: [[7, 9, 0, -2], -3], expectedOutput: [], description: 'Negative n returns []', isHidden: true },
        ]
    },

    // Question 31: Join Array Elements
    {
        title: 'Join Array Elements',
        slug: 'join-array-elements',
        description: 'Write a JavaScript function that takes an array and an optional separator string, and joins all elements into a single string. If no separator is provided, use a comma ",". Return the joined string.',
        difficulty: 'Easy',
        order: 31,
        category: 'Array',
        functionName: 'joinArray',
        starterCode: `function joinArray(arr, separator) {\n  // Write your code here\n}`,
        solution: `function joinArray(arr, separator) {\n  if (separator === undefined) separator = ',';\n  return arr.join(separator);\n}`,
        solutions: [
            {
                title: 'Using a loop',
                code: `function joinArray(arr, separator) {\n  if (separator === undefined) separator = ',';\n  let result = '';\n  for (let i = 0; i < arr.length; i++) {\n    result += arr[i];\n    if (i < arr.length - 1) result += separator;\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Iterate through the array, appending each element and the separator between elements to build the result string.'
            },
            {
                title: 'Using Array.join',
                code: `function joinArray(arr, separator) {\n  return arr.join(separator === undefined ? ',' : separator);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use the built-in Array.join() method with the specified separator. Default to comma if no separator is provided.'
            }
        ],
        examples: [
            { input: [['Red', 'Green', 'White', 'Black']], output: 'Red,Green,White,Black', explanation: 'Default separator is comma.' },
            { input: [['Red', 'Green', 'White', 'Black'], '+'], output: 'Red+Green+White+Black', explanation: 'Using "+" as separator.' }
        ],
        constraints: [
            'The input array can contain strings or numbers',
            'If no separator is provided, default to ","',
            'Return a single string with elements joined by the separator'
        ],
        hints: [
            'JavaScript arrays have a built-in .join() method.',
            'Check if separator is undefined and default to comma.',
            'Remember that .join() converts all elements to strings automatically.'
        ],
        testCases: [
            { input: [['Red', 'Green', 'White', 'Black']], expectedOutput: 'Red,Green,White,Black', description: 'Default comma separator' },
            { input: [['Red', 'Green', 'White', 'Black'], '+'], expectedOutput: 'Red+Green+White+Black', description: 'Plus separator' },
            { input: [['Red', 'Green', 'White', 'Black'], '-'], expectedOutput: 'Red-Green-White-Black', description: 'Dash separator' },
            { input: [[1, 2, 3, 4]], expectedOutput: '1,2,3,4', description: 'Numbers with default separator', isHidden: true },
            { input: [[1, 2, 3, 4], ' '], expectedOutput: '1 2 3 4', description: 'Numbers with space separator', isHidden: true },
            { input: [['a']], expectedOutput: 'a', description: 'Single element, no separator needed', isHidden: true },
            { input: [[], ','], expectedOutput: '', description: 'Empty array returns empty string', isHidden: true },
            { input: [['hello', 'world'], ' '], expectedOutput: 'hello world', description: 'Space separator', isHidden: true },
            { input: [['a', 'b', 'c'], ''], expectedOutput: 'abc', description: 'Empty string separator', isHidden: true },
            { input: [['x', 'y', 'z'], ' | '], expectedOutput: 'x | y | z', description: 'Pipe separator with spaces', isHidden: true },
            { input: [[true, false, true]], expectedOutput: 'true,false,true', description: 'Booleans with default separator', isHidden: true },
            { input: [[1, 'two', 3, 'four'], '-'], expectedOutput: '1-two-3-four', description: 'Mixed types with dash', isHidden: true },
            { input: [['Red', 'Green', 'White', 'Black'], ', '], expectedOutput: 'Red, Green, White, Black', description: 'Comma-space separator', isHidden: true },
            { input: [['a', 'b'], '---'], expectedOutput: 'a---b', description: 'Multi-char separator', isHidden: true },
            { input: [[0, 0, 0]], expectedOutput: '0,0,0', description: 'Zeros with default separator', isHidden: true },
            { input: [['one', 'two', 'three'], ' and '], expectedOutput: 'one and two and three', description: 'Word separator', isHidden: true },
            { input: [[10, 20, 30, 40, 50], ':'], expectedOutput: '10:20:30:40:50', description: 'Colon separator', isHidden: true },
            { input: [['a', 'b', 'c', 'd', 'e'], '/'], expectedOutput: 'a/b/c/d/e', description: 'Slash separator', isHidden: true },
            { input: [['hello']], expectedOutput: 'hello', description: 'Single string with default', isHidden: true },
            { input: [[null, undefined, 1], ','], expectedOutput: ',,1', description: 'Null and undefined join as empty', isHidden: true },
        ]
    },

    // Question 32: Insert Dashes Between Evens
    {
        title: 'Insert Dashes Between Evens',
        slug: 'insert-dashes-between-evens',
        description: 'Write a JavaScript function that accepts a number as input and inserts dashes (-) between each pair of consecutive even digits. For example, if you accept 025468, the output should be "0-254-6-8".',
        difficulty: 'Medium',
        order: 32,
        category: 'Array',
        functionName: 'insertDashes',
        starterCode: `function insertDashes(num) {\n  // Write your code here\n}`,
        solution: `function insertDashes(num) {\n  const str = String(num);\n  let result = str[0];\n  for (let i = 1; i < str.length; i++) {\n    if (parseInt(str[i]) % 2 === 0 && parseInt(str[i - 1]) % 2 === 0) {\n      result += '-';\n    }\n    result += str[i];\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using a loop',
                code: `function insertDashes(num) {\n  const str = String(num);\n  let result = str[0];\n  for (let i = 1; i < str.length; i++) {\n    if (parseInt(str[i]) % 2 === 0 && parseInt(str[i - 1]) % 2 === 0) {\n      result += '-';\n    }\n    result += str[i];\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Convert the number to a string. Iterate through each character, checking if the current and previous digits are both even. If so, insert a dash before the current digit.'
            },
            {
                title: 'Using regex',
                code: `function insertDashes(num) {\n  return String(num).replace(/([02468])(?=[02468])/g, '$1-');\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use a regex with a lookahead to find even digits followed by another even digit, and insert a dash between them.'
            }
        ],
        examples: [
            { input: [25468], output: '254-6-8', explanation: '6 and 8 are consecutive even digits, 4 and 6 are also consecutive even digits.' },
            { input: [1025468], output: '10-254-6-8', explanation: '0 is even, so 1-0 has a dash; 4-6 and 6-8 get dashes too.' }
        ],
        constraints: [
            'Input will be a non-negative integer',
            'Treat 0 as an even digit',
            'Only insert dashes between consecutive even digits',
            'Return a string'
        ],
        hints: [
            'Convert the number to a string to work with individual digits.',
            'Check if both the current and previous digit are even.',
            'Even digits are 0, 2, 4, 6, and 8.'
        ],
        testCases: [
            { input: [25468], expectedOutput: '254-6-8', description: 'Dashes between 4-6 and 6-8' },
            { input: [1025468], expectedOutput: '10-254-6-8', description: 'Multiple even pairs' },
            { input: [13579], expectedOutput: '13579', description: 'All odd, no dashes' },
            { input: [2468], expectedOutput: '2-4-6-8', description: 'All even digits', isHidden: true },
            { input: [0], expectedOutput: '0', description: 'Single zero', isHidden: true },
            { input: [22], expectedOutput: '2-2', description: 'Two even digits', isHidden: true },
            { input: [123], expectedOutput: '123', description: 'No consecutive evens', isHidden: true },
            { input: [2244], expectedOutput: '2-2-4-4', description: 'Pairs of even digits', isHidden: true },
            { input: [86420], expectedOutput: '8-6-4-2-0', description: 'All even descending', isHidden: true },
            { input: [111], expectedOutput: '111', description: 'All ones (odd)', isHidden: true },
            { input: [201], expectedOutput: '2-01', description: 'Even-even-odd', isHidden: true },
            { input: [102], expectedOutput: '10-2', description: 'Odd-even-even', isHidden: true },
            { input: [1234567890], expectedOutput: '1234-567890', description: 'Long number with mixed', isHidden: true },
            { input: [5], expectedOutput: '5', description: 'Single odd digit', isHidden: true },
            { input: [8], expectedOutput: '8', description: 'Single even digit', isHidden: true },
            { input: [28], expectedOutput: '2-8', description: 'Two different even digits', isHidden: true },
            { input: [135246], expectedOutput: '1352-4-6', description: 'Odds then evens', isHidden: true },
            { input: [642135], expectedOutput: '6-4-2135', description: 'Evens then odds', isHidden: true },
            { input: [20406], expectedOutput: '2-0-4-0-6', description: 'Even digits with zeros', isHidden: true },
            { input: [11223344], expectedOutput: '112-2334-4', description: 'Alternating pairs', isHidden: true },
        ]
    },

    // Question 33: Sort Array
    {
        title: 'Sort Array',
        slug: 'sort-array',
        description: 'Write a JavaScript function that takes an array of numbers and returns a new array with the items sorted in ascending order.',
        difficulty: 'Easy',
        order: 33,
        category: 'Array',
        functionName: 'sortArray',
        starterCode: `function sortArray(arr) {\n  // Write your code here\n}`,
        solution: `function sortArray(arr) {\n  return [...arr].sort((a, b) => a - b);\n}`,
        solutions: [
            {
                title: 'Using bubble sort',
                code: `function sortArray(arr) {\n  const result = [...arr];\n  for (let i = 0; i < result.length; i++) {\n    for (let j = 0; j < result.length - i - 1; j++) {\n      if (result[j] > result[j + 1]) {\n        [result[j], result[j + 1]] = [result[j + 1], result[j]];\n      }\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                explanation: 'Create a copy of the array and use bubble sort: repeatedly compare adjacent elements and swap them if they are in the wrong order.'
            },
            {
                title: 'Using Array.sort with comparator',
                code: `function sortArray(arr) {\n  return [...arr].sort((a, b) => a - b);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)',
                explanation: 'Spread into a new array and use the built-in sort with a numeric comparator (a - b) to sort in ascending order. Without the comparator, sort converts to strings.'
            }
        ],
        examples: [
            { input: [[-3, 8, 7, 6, 5, -4, 3, 2, 1]], output: [-4, -3, 1, 2, 3, 5, 6, 7, 8], explanation: 'Array sorted in ascending numerical order.' }
        ],
        constraints: [
            'The input will be an array of numbers',
            'Numbers can be negative, zero, or positive',
            'Return a new sorted array in ascending order',
            'The original array should not be modified'
        ],
        hints: [
            'JavaScript\'s default .sort() sorts lexicographically, not numerically.',
            'Use a comparator function: (a, b) => a - b for ascending numeric sort.',
            'Create a copy of the array first to avoid mutating the original.'
        ],
        testCases: [
            { input: [[-3, 8, 7, 6, 5, -4, 3, 2, 1]], expectedOutput: [-4, -3, 1, 2, 3, 5, 6, 7, 8], description: 'Mixed positives and negatives' },
            { input: [[5, 3, 8, 1, 2]], expectedOutput: [1, 2, 3, 5, 8], description: 'Simple unsorted array' },
            { input: [[1, 2, 3, 4, 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'Already sorted' },
            { input: [[5, 4, 3, 2, 1]], expectedOutput: [1, 2, 3, 4, 5], description: 'Reverse sorted', isHidden: true },
            { input: [[1]], expectedOutput: [1], description: 'Single element', isHidden: true },
            { input: [[]], expectedOutput: [], description: 'Empty array', isHidden: true },
            { input: [[3, 3, 3]], expectedOutput: [3, 3, 3], description: 'All same elements', isHidden: true },
            { input: [[-5, -1, -3, -2, -4]], expectedOutput: [-5, -4, -3, -2, -1], description: 'All negative numbers', isHidden: true },
            { input: [[0, 0, 0, 1]], expectedOutput: [0, 0, 0, 1], description: 'Zeros with one positive', isHidden: true },
            { input: [[100, -100, 50, -50, 0]], expectedOutput: [-100, -50, 0, 50, 100], description: 'Symmetric around zero', isHidden: true },
            { input: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], description: 'Descending 1-10', isHidden: true },
            { input: [[2, 1]], expectedOutput: [1, 2], description: 'Two elements swap', isHidden: true },
            { input: [[42, 17, 99, 3, 56]], expectedOutput: [3, 17, 42, 56, 99], description: 'Random numbers', isHidden: true },
            { input: [[-1, 0, 1]], expectedOutput: [-1, 0, 1], description: '-1, 0, 1 sorted', isHidden: true },
            { input: [[1000, 1, 100, 10]], expectedOutput: [1, 10, 100, 1000], description: 'Powers of 10 unsorted', isHidden: true },
            { input: [[7, 2, 7, 2, 7]], expectedOutput: [2, 2, 7, 7, 7], description: 'Duplicates mixed', isHidden: true },
            { input: [[0]], expectedOutput: [0], description: 'Single zero', isHidden: true },
            { input: [[-10, 10, -20, 20]], expectedOutput: [-20, -10, 10, 20], description: 'Negative and positive pairs', isHidden: true },
            { input: [[5, -5, 5, -5]], expectedOutput: [-5, -5, 5, 5], description: 'Alternating positive negative', isHidden: true },
            { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expectedOutput: [1, 1, 2, 3, 4, 5, 6, 9], description: 'Pi digits sorted', isHidden: true },
        ]
    },

    // Question 34: Most Frequent Array Item
    {
        title: 'Most Frequent Array Item',
        slug: 'most-frequent-array-item',
        description: 'Write a JavaScript function to find the most frequent item in an array. Return a string in the format "item (count times)". For example, given [3, "a", "a", "a", 2, 3, "a", 3, "a", 2, 4, 9, 3], return "a (5 times)".',
        difficulty: 'Medium',
        order: 34,
        category: 'Array',
        functionName: 'mostFrequent',
        starterCode: `function mostFrequent(arr) {\n  // Write your code here\n}`,
        solution: `function mostFrequent(arr) {\n  const freq = {};\n  let maxCount = 0;\n  let maxItem = arr[0];\n  for (const item of arr) {\n    freq[item] = (freq[item] || 0) + 1;\n    if (freq[item] > maxCount) {\n      maxCount = freq[item];\n      maxItem = item;\n    }\n  }\n  return maxItem + ' (' + maxCount + ' times)';\n}`,
        solutions: [
            {
                title: 'Using an object as frequency map',
                code: `function mostFrequent(arr) {\n  const freq = {};\n  let maxCount = 0;\n  let maxItem = arr[0];\n  for (const item of arr) {\n    freq[item] = (freq[item] || 0) + 1;\n    if (freq[item] > maxCount) {\n      maxCount = freq[item];\n      maxItem = item;\n    }\n  }\n  return maxItem + ' (' + maxCount + ' times)';\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use a plain object to count occurrences of each item. Track the maximum count and its corresponding item as you iterate.'
            },
            {
                title: 'Using Map',
                code: `function mostFrequent(arr) {\n  const map = new Map();\n  for (const item of arr) {\n    map.set(item, (map.get(item) || 0) + 1);\n  }\n  let maxItem, maxCount = 0;\n  for (const [item, count] of map) {\n    if (count > maxCount) {\n      maxCount = count;\n      maxItem = item;\n    }\n  }\n  return maxItem + ' (' + maxCount + ' times)';\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use a Map for more reliable key handling. Count occurrences in one pass, then find the max in a second pass.'
            }
        ],
        examples: [
            { input: [[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3]], output: 'a (5 times)', explanation: '"a" appears 5 times, more than any other item.' }
        ],
        constraints: [
            'The array can contain numbers and strings',
            'Return format: "item (count times)"',
            'If there is a tie, return the first item that reaches the max count',
            'The array will have at least one element'
        ],
        hints: [
            'Use an object or Map to count how often each item appears.',
            'Track the maximum count and its item as you build the frequency map.',
            'Format the output as "item (count times)".'
        ],
        testCases: [
            { input: [[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3]], expectedOutput: 'a (5 times)', description: '"a" appears 5 times' },
            { input: [[1, 2, 3, 1, 1]], expectedOutput: '1 (3 times)', description: '1 appears 3 times' },
            { input: [['x']], expectedOutput: 'x (1 times)', description: 'Single element array' },
            { input: [[1, 1, 2, 2, 3, 3, 1]], expectedOutput: '1 (3 times)', description: '1 appears most', isHidden: true },
            { input: [['cat', 'dog', 'cat', 'cat', 'dog']], expectedOutput: 'cat (3 times)', description: 'cat appears 3 times', isHidden: true },
            { input: [[5, 5, 5, 5, 5]], expectedOutput: '5 (5 times)', description: 'All same elements', isHidden: true },
            { input: [[true, true, false]], expectedOutput: 'true (2 times)', description: 'Booleans: true appears twice', isHidden: true },
            { input: [[0, 0, 1, 1, 0]], expectedOutput: '0 (3 times)', description: 'Zero is most frequent', isHidden: true },
            { input: [['a', 'b', 'c', 'a', 'b', 'a']], expectedOutput: 'a (3 times)', description: 'Strings with a winning', isHidden: true },
            { input: [[7, 8, 9, 7, 8, 7]], expectedOutput: '7 (3 times)', description: '7 is most frequent', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 1]], expectedOutput: '1 (2 times)', description: '1 appears twice, rest once', isHidden: true },
            { input: [['hello', 'world', 'hello']], expectedOutput: 'hello (2 times)', description: 'hello appears twice', isHidden: true },
            { input: [[10, 20, 10, 20, 10]], expectedOutput: '10 (3 times)', description: '10 appears 3 times', isHidden: true },
            { input: [[-1, -1, -2, -1]], expectedOutput: '-1 (3 times)', description: 'Negative number most frequent', isHidden: true },
            { input: [['a', 'a', 'b', 'b', 'c', 'c', 'a']], expectedOutput: 'a (3 times)', description: 'a wins with 3', isHidden: true },
            { input: [[99, 99, 1, 2, 3]], expectedOutput: '99 (2 times)', description: '99 appears twice', isHidden: true },
            { input: [[1, 2, 2, 3, 3, 3]], expectedOutput: '3 (3 times)', description: 'Increasing frequency', isHidden: true },
            { input: [['z', 'z', 'z', 'a', 'a']], expectedOutput: 'z (3 times)', description: 'z appears most', isHidden: true },
            { input: [[4, 4, 4, 4, 3, 3, 3]], expectedOutput: '4 (4 times)', description: '4 beats 3', isHidden: true },
            { input: [[1, 2]], expectedOutput: '1 (1 times)', description: 'Tie: first element wins', isHidden: true },
        ]
    },

    // Question 35: Swap Case in String
    {
        title: 'Swap Case in String',
        slug: 'swap-case-in-string',
        description: 'Write a JavaScript function that accepts a string and swaps the case of each character. Uppercase letters become lowercase and vice versa. Non-letter characters remain unchanged.',
        difficulty: 'Easy',
        order: 35,
        category: 'Array',
        functionName: 'swapCase',
        starterCode: `function swapCase(str) {\n  // Write your code here\n}`,
        solution: `function swapCase(str) {\n  return str.split('').map(ch => {\n    if (ch === ch.toUpperCase()) return ch.toLowerCase();\n    return ch.toUpperCase();\n  }).join('');\n}`,
        solutions: [
            {
                title: 'Using a loop',
                code: `function swapCase(str) {\n  let result = '';\n  for (let i = 0; i < str.length; i++) {\n    const ch = str[i];\n    if (ch === ch.toUpperCase()) {\n      result += ch.toLowerCase();\n    } else {\n      result += ch.toUpperCase();\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Iterate through each character. If it is uppercase, convert to lowercase and vice versa. Append each converted character to the result.'
            },
            {
                title: 'Using split-map-join',
                code: `function swapCase(str) {\n  return str.split('').map(ch => ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()).join('');\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Split the string into characters, map each character to its swapped case using a ternary, then join back into a string.'
            }
        ],
        examples: [
            { input: ['The Quick Brown Fox'], output: 'tHE qUICK bROWN fOX', explanation: 'Each letter\'s case is swapped. Spaces remain unchanged.' }
        ],
        constraints: [
            'Input will be a string',
            'Swap uppercase to lowercase and vice versa',
            'Non-alphabetic characters (spaces, numbers, symbols) remain unchanged',
            'Return the resulting string'
        ],
        hints: [
            'Compare each character with its uppercase version to determine its case.',
            'Use toUpperCase() and toLowerCase() to swap.',
            'Non-letter characters have the same upper and lower case, so they stay the same.'
        ],
        testCases: [
            { input: ['The Quick Brown Fox'], expectedOutput: 'tHE qUICK bROWN fOX', description: 'Standard sentence case swap' },
            { input: ['Hello World'], expectedOutput: 'hELLO wORLD', description: 'Two words swapped' },
            { input: ['abc'], expectedOutput: 'ABC', description: 'All lowercase to uppercase' },
            { input: ['ABC'], expectedOutput: 'abc', description: 'All uppercase to lowercase', isHidden: true },
            { input: [''], expectedOutput: '', description: 'Empty string', isHidden: true },
            { input: ['123'], expectedOutput: '123', description: 'Numbers unchanged', isHidden: true },
            { input: ['Hello 123 World!'], expectedOutput: 'hELLO 123 wORLD!', description: 'Mixed with numbers and symbols', isHidden: true },
            { input: ['aAbBcC'], expectedOutput: 'AaBbCc', description: 'Alternating case', isHidden: true },
            { input: ['JAVASCRIPT'], expectedOutput: 'javascript', description: 'All caps word', isHidden: true },
            { input: ['javascript'], expectedOutput: 'JAVASCRIPT', description: 'All lowercase word', isHidden: true },
            { input: ['a'], expectedOutput: 'A', description: 'Single lowercase char', isHidden: true },
            { input: ['Z'], expectedOutput: 'z', description: 'Single uppercase char', isHidden: true },
            { input: [' '], expectedOutput: ' ', description: 'Single space unchanged', isHidden: true },
            { input: ['HeLLo WoRLd'], expectedOutput: 'hEllO wOrlD', description: 'Random case mixing', isHidden: true },
            { input: ['Swap Case'], expectedOutput: 'sWAP cASE', description: 'Title case swap', isHidden: true },
            { input: ['!@#$%'], expectedOutput: '!@#$%', description: 'All symbols unchanged', isHidden: true },
            { input: ['Test 1, 2, 3!'], expectedOutput: 'tEST 1, 2, 3!', description: 'Sentence with punctuation', isHidden: true },
            { input: ['PyThOn'], expectedOutput: 'pYtHoN', description: 'Mixed case word', isHidden: true },
            { input: ['AAaa'], expectedOutput: 'aaAA', description: 'Two pairs swapped', isHidden: true },
            { input: ['tHE qUICK bROWN fOX'], expectedOutput: 'The Quick Brown Fox', description: 'Reverse of example', isHidden: true },
        ]
    },

    // Question 36: Print Nested Array Elements
    {
        title: 'Print Nested Array Elements',
        slug: 'print-nested-array-elements',
        description: 'Write a JavaScript function that takes a 2D array and returns an array of strings representing each element with its row label. For each row, first add "row N" (where N is the row index), then add each element prefixed with a space. For example, [[1,2],[3,4]] returns ["row 0", " 1", " 2", "row 1", " 3", " 4"].',
        difficulty: 'Easy',
        order: 36,
        category: 'Array',
        functionName: 'printNestedArray',
        starterCode: `function printNestedArray(arr) {\n  // Write your code here\n}`,
        solution: `function printNestedArray(arr) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push('row ' + i);\n    for (let j = 0; j < arr[i].length; j++) {\n      result.push(' ' + arr[i][j]);\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using nested for loops',
                code: `function printNestedArray(arr) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push('row ' + i);\n    for (let j = 0; j < arr[i].length; j++) {\n      result.push(' ' + arr[i][j]);\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n × m)',
                spaceComplexity: 'O(n × m)',
                explanation: 'Use an outer loop for rows and an inner loop for columns. Push "row i" for each row header, then " element" for each element.'
            },
            {
                title: 'Using flatMap and reduce',
                code: `function printNestedArray(arr) {\n  return arr.flatMap((row, i) => ['row ' + i, ...row.map(el => ' ' + el)]);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n × m)',
                spaceComplexity: 'O(n × m)',
                explanation: 'Use flatMap to flatten each row into its header and prefixed elements in a single expression.'
            }
        ],
        examples: [
            { input: [[[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]]], output: ['row 0', ' 1', ' 2', ' 1', ' 24', 'row 1', ' 8', ' 11', ' 9', ' 4', 'row 2', ' 7', ' 0', ' 7', ' 27', 'row 3', ' 7', ' 4', ' 28', ' 14', 'row 4', ' 3', ' 10', ' 26', ' 7'], explanation: 'Each row starts with "row N" followed by space-prefixed elements.' }
        ],
        constraints: [
            'The input is a 2D array of numbers',
            'Each row header is "row N" where N is the zero-based index',
            'Each element is prefixed with a single space',
            'Return a flat array of strings'
        ],
        hints: [
            'Use nested for loops: outer for rows, inner for elements.',
            'Push "row i" string before iterating the inner array.',
            'Prefix each element with a space character.'
        ],
        testCases: [
            { input: [[[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]]], expectedOutput: ['row 0', ' 1', ' 2', ' 1', ' 24', 'row 1', ' 8', ' 11', ' 9', ' 4', 'row 2', ' 7', ' 0', ' 7', ' 27', 'row 3', ' 7', ' 4', ' 28', ' 14', 'row 4', ' 3', ' 10', ' 26', ' 7'], description: '5x4 matrix' },
            { input: [[[1, 2], [3, 4]]], expectedOutput: ['row 0', ' 1', ' 2', 'row 1', ' 3', ' 4'], description: '2x2 matrix' },
            { input: [[[5]]], expectedOutput: ['row 0', ' 5'], description: 'Single element matrix' },
            { input: [[[1, 2, 3]]], expectedOutput: ['row 0', ' 1', ' 2', ' 3'], description: 'Single row', isHidden: true },
            { input: [[[1], [2], [3]]], expectedOutput: ['row 0', ' 1', 'row 1', ' 2', 'row 2', ' 3'], description: 'Single column', isHidden: true },
            { input: [[[0, 0], [0, 0]]], expectedOutput: ['row 0', ' 0', ' 0', 'row 1', ' 0', ' 0'], description: 'All zeros', isHidden: true },
            { input: [[[-1, -2], [-3, -4]]], expectedOutput: ['row 0', ' -1', ' -2', 'row 1', ' -3', ' -4'], description: 'Negative numbers', isHidden: true },
            { input: [[[10, 20, 30], [40, 50, 60]]], expectedOutput: ['row 0', ' 10', ' 20', ' 30', 'row 1', ' 40', ' 50', ' 60'], description: 'Two rows of three', isHidden: true },
            { input: [[[100]]], expectedOutput: ['row 0', ' 100'], description: 'Single large number', isHidden: true },
            { input: [[[1, 2], [3, 4], [5, 6], [7, 8]]], expectedOutput: ['row 0', ' 1', ' 2', 'row 1', ' 3', ' 4', 'row 2', ' 5', ' 6', 'row 3', ' 7', ' 8'], description: '4x2 matrix', isHidden: true },
            { input: [[[9, 8, 7, 6, 5]]], expectedOutput: ['row 0', ' 9', ' 8', ' 7', ' 6', ' 5'], description: 'Single row five elements', isHidden: true },
            { input: [[[1], [2]]], expectedOutput: ['row 0', ' 1', 'row 1', ' 2'], description: 'Two rows single element each', isHidden: true },
            { input: [[[42, 17], [99, 3], [56, 88]]], expectedOutput: ['row 0', ' 42', ' 17', 'row 1', ' 99', ' 3', 'row 2', ' 56', ' 88'], description: 'Random numbers 3x2', isHidden: true },
            { input: [[[0, 1], [1, 0]]], expectedOutput: ['row 0', ' 0', ' 1', 'row 1', ' 1', ' 0'], description: 'Binary-like matrix', isHidden: true },
            { input: [[[5, 10], [15, 20], [25, 30], [35, 40], [45, 50]]], expectedOutput: ['row 0', ' 5', ' 10', 'row 1', ' 15', ' 20', 'row 2', ' 25', ' 30', 'row 3', ' 35', ' 40', 'row 4', ' 45', ' 50'], description: '5x2 multiples of 5', isHidden: true },
            { input: [[[7, 7, 7], [7, 7, 7], [7, 7, 7]]], expectedOutput: ['row 0', ' 7', ' 7', ' 7', 'row 1', ' 7', ' 7', ' 7', 'row 2', ' 7', ' 7', ' 7'], description: 'All sevens 3x3', isHidden: true },
            { input: [[[1, 0, 1], [0, 1, 0]]], expectedOutput: ['row 0', ' 1', ' 0', ' 1', 'row 1', ' 0', ' 1', ' 0'], description: 'Alternating binary', isHidden: true },
            { input: [[[999, 888], [777, 666]]], expectedOutput: ['row 0', ' 999', ' 888', 'row 1', ' 777', ' 666'], description: 'Three digit numbers', isHidden: true },
            { input: [[[1, 2, 3, 4]]], expectedOutput: ['row 0', ' 1', ' 2', ' 3', ' 4'], description: 'Single row four elements', isHidden: true },
            { input: [[[11, 22], [33, 44], [55, 66]]], expectedOutput: ['row 0', ' 11', ' 22', 'row 1', ' 33', ' 44', 'row 2', ' 55', ' 66'], description: 'Doubles 3x2', isHidden: true },
        ]
    },

    // Question 37: Sum of Squares in Array
    {
        title: 'Sum of Squares in Array',
        slug: 'sum-of-squares-in-array',
        description: 'Write a JavaScript function to find the sum of squares of a numerical array (vector). For example, given [1, 2, 3, 4], return 1² + 2² + 3² + 4² = 30.',
        difficulty: 'Easy',
        order: 37,
        category: 'Array',
        functionName: 'sumOfSquares',
        starterCode: `function sumOfSquares(arr) {\n  // Write your code here\n}`,
        solution: `function sumOfSquares(arr) {\n  return arr.reduce((sum, num) => sum + num * num, 0);\n}`,
        solutions: [
            {
                title: 'Using a loop',
                code: `function sumOfSquares(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i] * arr[i];\n  }\n  return sum;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                explanation: 'Iterate through the array, square each element, and add it to a running sum.'
            },
            {
                title: 'Using reduce',
                code: `function sumOfSquares(arr) {\n  return arr.reduce((sum, num) => sum + num * num, 0);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                explanation: 'Use Array.reduce to accumulate the sum of squares in a single expression with an initial value of 0.'
            }
        ],
        examples: [
            { input: [[1, 2, 3, 4]], output: 30, explanation: '1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30.' },
            { input: [[0, 5, -3]], output: 34, explanation: '0² + 5² + (-3)² = 0 + 25 + 9 = 34.' }
        ],
        constraints: [
            'The input will be an array of numbers',
            'Numbers can be negative, zero, or positive',
            'Return a single number (the sum of squares)',
            'An empty array should return 0'
        ],
        hints: [
            'Square each element and add them all together.',
            'Use reduce() for an elegant one-liner.',
            'Remember: squaring a negative number gives a positive result.'
        ],
        testCases: [
            { input: [[1, 2, 3, 4]], expectedOutput: 30, description: '1+4+9+16=30' },
            { input: [[0, 5, -3]], expectedOutput: 34, description: '0+25+9=34' },
            { input: [[]], expectedOutput: 0, description: 'Empty array returns 0' },
            { input: [[1]], expectedOutput: 1, description: 'Single element 1²=1', isHidden: true },
            { input: [[0]], expectedOutput: 0, description: 'Single zero', isHidden: true },
            { input: [[-1]], expectedOutput: 1, description: 'Single negative: (-1)²=1', isHidden: true },
            { input: [[10]], expectedOutput: 100, description: '10²=100', isHidden: true },
            { input: [[1, 1, 1, 1]], expectedOutput: 4, description: 'Four ones: 4', isHidden: true },
            { input: [[2, 3]], expectedOutput: 13, description: '4+9=13', isHidden: true },
            { input: [[-2, -3]], expectedOutput: 13, description: '4+9=13 (negatives)', isHidden: true },
            { input: [[5, 5, 5]], expectedOutput: 75, description: '25+25+25=75', isHidden: true },
            { input: [[1, 2, 3, 4, 5]], expectedOutput: 55, description: '1+4+9+16+25=55', isHidden: true },
            { input: [[10, 20, 30]], expectedOutput: 1400, description: '100+400+900=1400', isHidden: true },
            { input: [[-5, 5]], expectedOutput: 50, description: '25+25=50', isHidden: true },
            { input: [[0, 0, 0]], expectedOutput: 0, description: 'All zeros', isHidden: true },
            { input: [[3, 4]], expectedOutput: 25, description: '9+16=25 (Pythagorean)', isHidden: true },
            { input: [[1, -1, 2, -2]], expectedOutput: 10, description: '1+1+4+4=10', isHidden: true },
            { input: [[6, 8]], expectedOutput: 100, description: '36+64=100', isHidden: true },
            { input: [[7, 7, 7, 7]], expectedOutput: 196, description: '49*4=196', isHidden: true },
            { input: [[100]], expectedOutput: 10000, description: '100²=10000', isHidden: true },
        ]
    },

    // ═══════════════════════════════════════════════════
    // ARRAY - CONTINUED (Questions 38-47)
    // ═══════════════════════════════════════════════════

    // Question 38: Remove Duplicates
    {
        title: 'Remove Duplicates',
        slug: 'remove-duplicates',
        description: 'Write a JavaScript function to remove duplicate items from an array, ignoring case sensitivity. The function should return a new array with unique items (keeping the first occurrence, lowercased).',
        difficulty: 'Easy',
        order: 38,
        category: 'Array',
        functionName: 'removeDuplicates',
        starterCode: `function removeDuplicates(arr) {\n  // Write your code here\n}`,
        solution: `function removeDuplicates(arr) {\n  const seen = new Set();\n  const result = [];\n  for (const item of arr) {\n    const lower = String(item).toLowerCase();\n    if (!seen.has(lower)) {\n      seen.add(lower);\n      result.push(lower);\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using indexOf loop',
                code: `function removeDuplicates(arr) {\n  const result = [];\n  for (const item of arr) {\n    const lower = String(item).toLowerCase();\n    if (result.indexOf(lower) === -1) {\n      result.push(lower);\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                explanation: 'For each item, convert to lowercase and check if it already exists in the result array using indexOf. If not, add it.'
            },
            {
                title: 'Using Set',
                code: `function removeDuplicates(arr) {\n  const seen = new Set();\n  const result = [];\n  for (const item of arr) {\n    const lower = String(item).toLowerCase();\n    if (!seen.has(lower)) {\n      seen.add(lower);\n      result.push(lower);\n    }\n  }\n  return result;\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use a Set for O(1) lookups. Convert each item to lowercase, check if the Set already has it, and if not, add to both the Set and result array.'
            }
        ],
        examples: [
            { input: [['John', 'Paul', 'George', 'Ringo', 'john', 'paul']], output: ['john', 'paul', 'george', 'ringo'], explanation: '"john" and "paul" are duplicates of "John" and "Paul" (case-insensitive).' },
            { input: [['a', 'b', 'A', 'B', 'c']], output: ['a', 'b', 'c'], explanation: '"A" and "B" are case-insensitive duplicates.' }
        ],
        constraints: [
            'Ignore case sensitivity when comparing',
            'Return all items in lowercase',
            'Preserve the order of first occurrence',
            'Input array can contain strings and numbers'
        ],
        hints: [
            'Convert each element to lowercase before comparing.',
            'Use a Set to track seen items for efficient lookup.',
            'Keep the first occurrence and skip duplicates.'
        ],
        testCases: [
            { input: [['John', 'Paul', 'George', 'Ringo', 'john', 'paul']], expectedOutput: ['john', 'paul', 'george', 'ringo'], description: 'Beatles with case duplicates' },
            { input: [['a', 'b', 'A', 'B', 'c']], expectedOutput: ['a', 'b', 'c'], description: 'Lowercase and uppercase duplicates' },
            { input: [['x', 'y', 'z']], expectedOutput: ['x', 'y', 'z'], description: 'No duplicates' },
            { input: [['Hello', 'hello', 'HELLO']], expectedOutput: ['hello'], description: 'All same word different cases', isHidden: true },
            { input: [[]], expectedOutput: [], description: 'Empty array', isHidden: true },
            { input: [['a']], expectedOutput: ['a'], description: 'Single element', isHidden: true },
            { input: [['A', 'A', 'A']], expectedOutput: ['a'], description: 'All same uppercase', isHidden: true },
            { input: [['Cat', 'Dog', 'cat', 'dog', 'Fish']], expectedOutput: ['cat', 'dog', 'fish'], description: 'Animals with duplicates', isHidden: true },
            { input: [['RED', 'Green', 'red', 'BLUE', 'green', 'blue']], expectedOutput: ['red', 'green', 'blue'], description: 'Colors case-insensitive', isHidden: true },
            { input: [['1', '2', '1', '3']], expectedOutput: ['1', '2', '3'], description: 'String numbers with duplicates', isHidden: true },
            { input: [['abc', 'def', 'ghi']], expectedOutput: ['abc', 'def', 'ghi'], description: 'All unique lowercase', isHidden: true },
            { input: [['ABC', 'DEF', 'GHI']], expectedOutput: ['abc', 'def', 'ghi'], description: 'All unique uppercase returned as lowercase', isHidden: true },
            { input: [['Test', 'test', 'TEST', 'TeSt']], expectedOutput: ['test'], description: 'Four variants of same word', isHidden: true },
            { input: [['a', 'b', 'c', 'a', 'b', 'c']], expectedOutput: ['a', 'b', 'c'], description: 'Repeated sequence', isHidden: true },
            { input: [['One', 'Two', 'Three', 'one', 'TWO', 'three']], expectedOutput: ['one', 'two', 'three'], description: 'Number words mixed case', isHidden: true },
            { input: [['x', 'X']], expectedOutput: ['x'], description: 'Single char duplicate', isHidden: true },
            { input: [['Apple', 'Banana', 'Cherry']], expectedOutput: ['apple', 'banana', 'cherry'], description: 'No duplicates but different cases', isHidden: true },
            { input: [['up', 'UP', 'Up', 'uP', 'down']], expectedOutput: ['up', 'down'], description: 'Multiple case variants plus unique', isHidden: true },
            { input: [['a', 'b', 'c', 'd', 'e', 'f']], expectedOutput: ['a', 'b', 'c', 'd', 'e', 'f'], description: 'Six unique letters', isHidden: true },
            { input: [['Foo', 'Bar', 'foo', 'bar', 'BAZ']], expectedOutput: ['foo', 'bar', 'baz'], description: 'Programming terms', isHidden: true },
        ]
    },

    // Question 39: Display Colors with Ordinals
    {
        title: 'Display Colors with Ordinals',
        slug: 'display-colors-with-ordinals',
        description: 'Write a JavaScript function that takes an array of colors and returns an array of strings displaying each color with its ordinal position. Use ordinal suffixes: "st" for 1, "nd" for 2, "rd" for 3, and "th" for all others. For example: "1st choice is Blue.", "2nd choice is Green.", etc.',
        difficulty: 'Medium',
        order: 39,
        category: 'Array',
        functionName: 'displayColors',
        starterCode: `function displayColors(colors) {\n  // Write your code here\n}`,
        solution: `function displayColors(colors) {\n  function getOrdinal(n) {\n    const s = ['th', 'st', 'nd', 'rd'];\n    const v = n % 100;\n    return n + (s[(v - 20) % 10] || s[v] || s[0]);\n  }\n  return colors.map((color, i) => getOrdinal(i + 1) + ' choice is ' + color.trim() + '.');\n}`,
        solutions: [
            {
                title: 'Using conditionals for ordinals',
                code: `function displayColors(colors) {\n  function getOrdinal(n) {\n    if (n % 100 >= 11 && n % 100 <= 13) return n + 'th';\n    switch (n % 10) {\n      case 1: return n + 'st';\n      case 2: return n + 'nd';\n      case 3: return n + 'rd';\n      default: return n + 'th';\n    }\n  }\n  return colors.map((color, i) => getOrdinal(i + 1) + ' choice is ' + color.trim() + '.');\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use a switch statement to determine the ordinal suffix. Handle special cases for 11th, 12th, 13th. Map each color to the formatted string.'
            },
            {
                title: 'Using lookup array for ordinals',
                code: `function displayColors(colors) {\n  function getOrdinal(n) {\n    const s = ['th', 'st', 'nd', 'rd'];\n    const v = n % 100;\n    return n + (s[(v - 20) % 10] || s[v] || s[0]);\n  }\n  return colors.map((color, i) => getOrdinal(i + 1) + ' choice is ' + color.trim() + '.');\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use an array of suffixes and modular arithmetic to find the correct ordinal. This avoids lengthy conditionals.'
            }
        ],
        examples: [
            { input: [['Blue', 'Green', 'Red']], output: ['1st choice is Blue.', '2nd choice is Green.', '3rd choice is Red.'], explanation: '1st, 2nd, 3rd use st, nd, rd suffixes.' },
            { input: [['Orange', 'Violet', 'Indigo', 'Yellow']], output: ['1st choice is Orange.', '2nd choice is Violet.', '3rd choice is Indigo.', '4th choice is Yellow.'], explanation: '4th uses th suffix.' }
        ],
        constraints: [
            'Use ordinal suffixes: st, nd, rd, th',
            'Format: "Nth choice is Color."',
            'Trim any whitespace from color names',
            'Return an array of strings'
        ],
        hints: [
            '1st, 2nd, 3rd are special; 4th through 20th use "th".',
            '11th, 12th, 13th are exceptions — they use "th" not "st", "nd", "rd".',
            'Use map() to transform each color into the formatted string.'
        ],
        testCases: [
            { input: [['Blue', 'Green', 'Red']], expectedOutput: ['1st choice is Blue.', '2nd choice is Green.', '3rd choice is Red.'], description: 'First three colors with ordinals' },
            { input: [['Orange', 'Violet', 'Indigo', 'Yellow']], expectedOutput: ['1st choice is Orange.', '2nd choice is Violet.', '3rd choice is Indigo.', '4th choice is Yellow.'], description: 'Four colors' },
            { input: [['Red']], expectedOutput: ['1st choice is Red.'], description: 'Single color' },
            { input: [['Blue ', 'Green', 'Red', 'Orange', 'Violet', 'Indigo', 'Yellow ']], expectedOutput: ['1st choice is Blue.', '2nd choice is Green.', '3rd choice is Red.', '4th choice is Orange.', '5th choice is Violet.', '6th choice is Indigo.', '7th choice is Yellow.'], description: 'Seven rainbow colors with trimming', isHidden: true },
            { input: [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']], expectedOutput: ['1st choice is A.', '2nd choice is B.', '3rd choice is C.', '4th choice is D.', '5th choice is E.', '6th choice is F.', '7th choice is G.', '8th choice is H.', '9th choice is I.', '10th choice is J.'], description: 'Ten items with ordinals', isHidden: true },
            { input: [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']], expectedOutput: ['1st choice is A.', '2nd choice is B.', '3rd choice is C.', '4th choice is D.', '5th choice is E.', '6th choice is F.', '7th choice is G.', '8th choice is H.', '9th choice is I.', '10th choice is J.', '11th choice is K.'], description: '11th uses th not st', isHidden: true },
            { input: [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']], expectedOutput: ['1st choice is A.', '2nd choice is B.', '3rd choice is C.', '4th choice is D.', '5th choice is E.', '6th choice is F.', '7th choice is G.', '8th choice is H.', '9th choice is I.', '10th choice is J.', '11th choice is K.', '12th choice is L.'], description: '12th uses th not nd', isHidden: true },
            { input: [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']], expectedOutput: ['1st choice is A.', '2nd choice is B.', '3rd choice is C.', '4th choice is D.', '5th choice is E.', '6th choice is F.', '7th choice is G.', '8th choice is H.', '9th choice is I.', '10th choice is J.', '11th choice is K.', '12th choice is L.', '13th choice is M.'], description: '13th uses th not rd', isHidden: true },
            { input: [['Pink', 'Cyan']], expectedOutput: ['1st choice is Pink.', '2nd choice is Cyan.'], description: 'Two colors', isHidden: true },
            { input: [['White', 'Black', 'Grey', 'Brown', 'Purple']], expectedOutput: ['1st choice is White.', '2nd choice is Black.', '3rd choice is Grey.', '4th choice is Brown.', '5th choice is Purple.'], description: 'Five colors', isHidden: true },
            { input: [['Gold', 'Silver', 'Bronze']], expectedOutput: ['1st choice is Gold.', '2nd choice is Silver.', '3rd choice is Bronze.'], description: 'Medal colors', isHidden: true },
            { input: [['  Teal  ']], expectedOutput: ['1st choice is Teal.'], description: 'Trimmed whitespace', isHidden: true },
            { input: [['Crimson', 'Scarlet', 'Ruby', 'Garnet', 'Burgundy', 'Maroon']], expectedOutput: ['1st choice is Crimson.', '2nd choice is Scarlet.', '3rd choice is Ruby.', '4th choice is Garnet.', '5th choice is Burgundy.', '6th choice is Maroon.'], description: 'Six red shades', isHidden: true },
            { input: [['Sky', 'Ocean', 'Navy', 'Cobalt', 'Azure', 'Sapphire', 'Cerulean', 'Denim']], expectedOutput: ['1st choice is Sky.', '2nd choice is Ocean.', '3rd choice is Navy.', '4th choice is Cobalt.', '5th choice is Azure.', '6th choice is Sapphire.', '7th choice is Cerulean.', '8th choice is Denim.'], description: 'Eight blue shades', isHidden: true },
            { input: [['Lime', 'Mint', 'Sage', 'Forest', 'Olive', 'Jade', 'Emerald', 'Teal', 'Fern']], expectedOutput: ['1st choice is Lime.', '2nd choice is Mint.', '3rd choice is Sage.', '4th choice is Forest.', '5th choice is Olive.', '6th choice is Jade.', '7th choice is Emerald.', '8th choice is Teal.', '9th choice is Fern.'], description: 'Nine green shades', isHidden: true },
            { input: [['X', 'Y']], expectedOutput: ['1st choice is X.', '2nd choice is Y.'], description: 'Two single-char colors', isHidden: true },
            { input: [['Alpha', 'Beta', 'Gamma', 'Delta']], expectedOutput: ['1st choice is Alpha.', '2nd choice is Beta.', '3rd choice is Gamma.', '4th choice is Delta.'], description: 'Greek alphabet colors', isHidden: true },
            { input: [['Magenta']], expectedOutput: ['1st choice is Magenta.'], description: 'Single fancy color', isHidden: true },
            { input: [['R', 'G', 'B', 'A']], expectedOutput: ['1st choice is R.', '2nd choice is G.', '3rd choice is B.', '4th choice is A.'], description: 'RGBA channels', isHidden: true },
            { input: [['Peach', 'Coral', 'Salmon']], expectedOutput: ['1st choice is Peach.', '2nd choice is Coral.', '3rd choice is Salmon.'], description: 'Warm colors', isHidden: true },
        ]
    },

    // Question 40: Find Leap Years in Range
    {
        title: 'Find Leap Years in Range',
        slug: 'find-leap-years-in-range',
        description: 'Write a JavaScript function that takes a start year and end year, and returns an array of all leap years in that range (inclusive). A leap year is divisible by 4 but not by 100, unless it is also divisible by 400.',
        difficulty: 'Easy',
        order: 40,
        category: 'Array',
        functionName: 'findLeapYears',
        starterCode: `function findLeapYears(start, end) {\n  // Write your code here\n}`,
        solution: `function findLeapYears(start, end) {\n  const result = [];\n  for (let y = start; y <= end; y++) {\n    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {\n      result.push(y);\n    }\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using a loop with conditionals',
                code: `function findLeapYears(start, end) {\n  const result = [];\n  for (let y = start; y <= end; y++) {\n    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {\n      result.push(y);\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(k)',
                explanation: 'Iterate through each year in the range and check the leap year conditions: divisible by 4 but not 100, or divisible by 400.'
            },
            {
                title: 'Jumping by 4s',
                code: `function findLeapYears(start, end) {\n  const result = [];\n  let y = start + (4 - start % 4) % 4;\n  if (start % 4 === 0) y = start;\n  for (; y <= end; y += 4) {\n    if (y % 100 !== 0 || y % 400 === 0) {\n      result.push(y);\n    }\n  }\n  return result;\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n/4)',
                spaceComplexity: 'O(k)',
                explanation: 'Start from the first multiple of 4 in the range and jump by 4s. Only check the century rule (divisible by 100 but not 400) for each candidate.'
            }
        ],
        examples: [
            { input: [2000, 2020], output: [2000, 2004, 2008, 2012, 2016, 2020], explanation: 'All leap years from 2000 to 2020. 2000 is a leap year (divisible by 400).' },
            { input: [1895, 1905], output: [1896, 1904], explanation: '1900 is NOT a leap year (divisible by 100 but not 400).' }
        ],
        constraints: [
            'Start and end are positive integers with start <= end',
            'The range is inclusive on both ends',
            'A leap year: divisible by 4 AND (not divisible by 100 OR divisible by 400)',
            'Return an array of leap years in ascending order'
        ],
        hints: [
            'A year is a leap year if divisible by 4.',
            'Exception: years divisible by 100 are NOT leap years.',
            'Exception to exception: years divisible by 400 ARE leap years.'
        ],
        testCases: [
            { input: [2000, 2020], expectedOutput: [2000, 2004, 2008, 2012, 2016, 2020], description: 'Leap years 2000-2020' },
            { input: [1895, 1905], expectedOutput: [1896, 1904], description: '1900 is not a leap year' },
            { input: [2024, 2024], expectedOutput: [2024], description: 'Single leap year' },
            { input: [2023, 2023], expectedOutput: [], description: 'Single non-leap year', isHidden: true },
            { input: [1900, 1900], expectedOutput: [], description: '1900 not a leap year (century rule)', isHidden: true },
            { input: [2000, 2000], expectedOutput: [2000], description: '2000 is a leap year (400 rule)', isHidden: true },
            { input: [1996, 2004], expectedOutput: [1996, 2000, 2004], description: 'Three consecutive leap years', isHidden: true },
            { input: [1600, 1604], expectedOutput: [1600, 1604], description: '1600 is a leap year', isHidden: true },
            { input: [1800, 1800], expectedOutput: [], description: '1800 not a leap year', isHidden: true },
            { input: [2100, 2100], expectedOutput: [], description: '2100 not a leap year', isHidden: true },
            { input: [2001, 2003], expectedOutput: [], description: 'No leap years in range', isHidden: true },
            { input: [2020, 2032], expectedOutput: [2020, 2024, 2028, 2032], description: 'Every 4 years', isHidden: true },
            { input: [1990, 2010], expectedOutput: [1992, 1996, 2000, 2004, 2008], description: 'Across century boundary', isHidden: true },
            { input: [400, 400], expectedOutput: [400], description: 'Year 400 is a leap year', isHidden: true },
            { input: [100, 100], expectedOutput: [], description: 'Year 100 is not a leap year', isHidden: true },
            { input: [2016, 2016], expectedOutput: [2016], description: '2016 is a leap year', isHidden: true },
            { input: [2019, 2025], expectedOutput: [2020, 2024], description: 'Two leap years in range', isHidden: true },
            { input: [1, 8], expectedOutput: [4, 8], description: 'Early years', isHidden: true },
            { input: [1696, 1704], expectedOutput: [1696, 1704], description: '1700 is not a leap year', isHidden: true },
            { input: [2396, 2404], expectedOutput: [2396, 2400, 2404], description: '2400 will be a leap year', isHidden: true },
        ]
    },

    // Question 41: Shuffle Array
    {
        title: 'Shuffle Array',
        slug: 'shuffle-array',
        description: 'Write a JavaScript function that takes an array and returns a new array with the elements shuffled (randomly rearranged). The returned array must contain all the same elements as the original but in a different order (when possible). Use the Fisher-Yates shuffle algorithm.',
        difficulty: 'Medium',
        order: 41,
        category: 'Array',
        functionName: 'shuffleArray',
        starterCode: `function shuffleArray(arr) {\n  // Write your code here\n}`,
        solution: `function shuffleArray(arr) {\n  const result = [...arr];\n  for (let i = result.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [result[i], result[j]] = [result[j], result[i]];\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using sort with random',
                code: `function shuffleArray(arr) {\n  return [...arr].sort(() => Math.random() - 0.5);\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)',
                explanation: 'Create a copy and sort with a random comparator. This is simple but does not produce a truly uniform shuffle.'
            },
            {
                title: 'Fisher-Yates shuffle',
                code: `function shuffleArray(arr) {\n  const result = [...arr];\n  for (let i = result.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [result[i], result[j]] = [result[j], result[i]];\n  }\n  return result;\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'The Fisher-Yates algorithm iterates from the end, swapping each element with a random one before it (inclusive). This produces a uniformly random permutation.'
            }
        ],
        examples: [
            { input: [[1, 2, 3, 4, 5]], output: [3, 1, 5, 2, 4], explanation: 'Elements are rearranged randomly. Your output may vary.' }
        ],
        constraints: [
            'Return a new array (do not modify the original)',
            'The returned array must contain all elements from the input',
            'The length must remain the same',
            'Elements should be randomly rearranged'
        ],
        hints: [
            'The Fisher-Yates algorithm gives a uniform shuffle.',
            'Iterate from the end of the array to the beginning.',
            'For each index, swap the element with a randomly chosen element at or before that index.'
        ],
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expectedOutput: null, description: 'Shuffle preserves all elements (length check: 5)' },
            { input: [[10, 20, 30]], expectedOutput: null, description: 'Shuffle preserves all elements (length check: 3)' },
            { input: [[1]], expectedOutput: [1], description: 'Single element stays the same' },
            { input: [[]], expectedOutput: [], description: 'Empty array stays empty', isHidden: true },
            { input: [['a', 'b', 'c', 'd']], expectedOutput: null, description: 'String array shuffle (length check: 4)', isHidden: true },
            { input: [[1, 2]], expectedOutput: null, description: 'Two element shuffle (length check: 2)', isHidden: true },
            { input: [[5, 5, 5]], expectedOutput: null, description: 'All same elements (length check: 3)', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expectedOutput: null, description: 'Ten elements shuffle (length check: 10)', isHidden: true },
            { input: [[-1, -2, -3]], expectedOutput: null, description: 'Negative numbers shuffle (length check: 3)', isHidden: true },
            { input: [[0, 1, 0, 1]], expectedOutput: null, description: 'Binary-like shuffle (length check: 4)', isHidden: true },
            { input: [[100, 200, 300, 400, 500]], expectedOutput: null, description: 'Large numbers shuffle (length check: 5)', isHidden: true },
            { input: [['x']], expectedOutput: ['x'], description: 'Single string element', isHidden: true },
            { input: [[true, false, true]], expectedOutput: null, description: 'Boolean shuffle (length check: 3)', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: null, description: 'Six elements shuffle (length check: 6)', isHidden: true },
            { input: [[42, 17, 99]], expectedOutput: null, description: 'Random numbers shuffle (length check: 3)', isHidden: true },
            { input: [['red', 'green', 'blue', 'yellow']], expectedOutput: null, description: 'Color strings shuffle (length check: 4)', isHidden: true },
            { input: [[0]], expectedOutput: [0], description: 'Single zero stays', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7]], expectedOutput: null, description: 'Seven elements shuffle (length check: 7)', isHidden: true },
            { input: [[null, undefined, 0]], expectedOutput: null, description: 'Mixed falsy shuffle (length check: 3)', isHidden: true },
            { input: [[10, 20, 30, 40]], expectedOutput: null, description: 'Four multiples of 10 (length check: 4)', isHidden: true },
        ]
    },

    // Question 42: Sum of Arrays by Index
    {
        title: 'Sum of Arrays by Index',
        slug: 'sum-of-arrays-by-index',
        description: 'Write a JavaScript function that takes two arrays of numbers and computes the sum of each individual index value. If one array is longer, the remaining values are added as-is. For example, [1,0,2,3,4] and [3,5,6,7,8,13] should return [4,5,8,10,12,13].',
        difficulty: 'Easy',
        order: 42,
        category: 'Array',
        functionName: 'sumArraysByIndex',
        starterCode: `function sumArraysByIndex(arr1, arr2) {\n  // Write your code here\n}`,
        solution: `function sumArraysByIndex(arr1, arr2) {\n  const maxLen = Math.max(arr1.length, arr2.length);\n  const result = [];\n  for (let i = 0; i < maxLen; i++) {\n    result.push((arr1[i] || 0) + (arr2[i] || 0));\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using a loop with Math.max',
                code: `function sumArraysByIndex(arr1, arr2) {\n  const maxLen = Math.max(arr1.length, arr2.length);\n  const result = [];\n  for (let i = 0; i < maxLen; i++) {\n    result.push((arr1[i] || 0) + (arr2[i] || 0));\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Find the longer length, iterate through each index, and add values from both arrays (defaulting to 0 if one array is shorter).'
            },
            {
                title: 'Using Array.from',
                code: `function sumArraysByIndex(arr1, arr2) {\n  const len = Math.max(arr1.length, arr2.length);\n  return Array.from({ length: len }, (_, i) => (arr1[i] || 0) + (arr2[i] || 0));\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use Array.from with a mapping function to create the result array in a single expression.'
            }
        ],
        examples: [
            { input: [[1, 0, 2, 3, 4], [3, 5, 6, 7, 8, 13]], output: [4, 5, 8, 10, 12, 13], explanation: 'Index-wise sum: 1+3=4, 0+5=5, 2+6=8, 3+7=10, 4+8=12, 0+13=13.' }
        ],
        constraints: [
            'Both inputs will be arrays of numbers',
            'Arrays may have different lengths',
            'Missing values (shorter array) are treated as 0',
            'Return a new array of sums'
        ],
        hints: [
            'Find the length of the longer array.',
            'Access undefined indices — treat them as 0.',
            'Use (arr[i] || 0) to default to 0 for missing indices.'
        ],
        testCases: [
            { input: [[1, 0, 2, 3, 4], [3, 5, 6, 7, 8, 13]], expectedOutput: [4, 5, 8, 10, 12, 13], description: 'Different length arrays' },
            { input: [[1, 2, 3], [4, 5, 6]], expectedOutput: [5, 7, 9], description: 'Same length arrays' },
            { input: [[], [1, 2, 3]], expectedOutput: [1, 2, 3], description: 'First array empty' },
            { input: [[1, 2, 3], []], expectedOutput: [1, 2, 3], description: 'Second array empty', isHidden: true },
            { input: [[], []], expectedOutput: [], description: 'Both arrays empty', isHidden: true },
            { input: [[0, 0, 0], [0, 0, 0]], expectedOutput: [0, 0, 0], description: 'All zeros', isHidden: true },
            { input: [[10], [20, 30]], expectedOutput: [30, 30], description: 'First shorter', isHidden: true },
            { input: [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1]], expectedOutput: [6, 6, 6, 6, 6], description: 'Complementary arrays', isHidden: true },
            { input: [[-1, -2], [1, 2]], expectedOutput: [0, 0], description: 'Negatives cancel positives', isHidden: true },
            { input: [[100], [200]], expectedOutput: [300], description: 'Single elements', isHidden: true },
            { input: [[1, 1, 1, 1, 1, 1, 1], [2, 2, 2]], expectedOutput: [3, 3, 3, 1, 1, 1, 1], description: 'First much longer', isHidden: true },
            { input: [[5], [5, 10, 15, 20]], expectedOutput: [10, 10, 15, 20], description: 'Second much longer', isHidden: true },
            { input: [[10, 20, 30], [1, 2, 3]], expectedOutput: [11, 22, 33], description: 'Simple addition', isHidden: true },
            { input: [[-5, -10], [-3, -7]], expectedOutput: [-8, -17], description: 'All negatives', isHidden: true },
            { input: [[0, 1], [1, 0]], expectedOutput: [1, 1], description: 'Binary complement', isHidden: true },
            { input: [[50, 50, 50], [50, 50, 50]], expectedOutput: [100, 100, 100], description: 'All fifties', isHidden: true },
            { input: [[1000, 2000], [3000, 4000]], expectedOutput: [4000, 6000], description: 'Large numbers', isHidden: true },
            { input: [[7]], expectedOutput: [7], description: 'Single element, second missing treated as empty', isHidden: true },
            { input: [[1, 2, 3, 4], [10, 20, 30, 40]], expectedOutput: [11, 22, 33, 44], description: 'Four elements each', isHidden: true },
            { input: [[99, 1], [1, 99]], expectedOutput: [100, 100], description: 'Swapped values sum to 100', isHidden: true },
        ]
    },

    // Question 43: Find Duplicate Values
    {
        title: 'Find Duplicate Values',
        slug: 'find-duplicate-values',
        description: 'Write a JavaScript function to find and return duplicate values in an array. Return an array of values that appear more than once (each duplicate listed only once).',
        difficulty: 'Easy',
        order: 43,
        category: 'Array',
        functionName: 'findDuplicates',
        starterCode: `function findDuplicates(arr) {\n  // Write your code here\n}`,
        solution: `function findDuplicates(arr) {\n  const count = {};\n  const result = [];\n  for (const item of arr) {\n    count[item] = (count[item] || 0) + 1;\n    if (count[item] === 2) result.push(item);\n  }\n  return result;\n}`,
        solutions: [
            {
                title: 'Using nested loops',
                code: `function findDuplicates(arr) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] === arr[j] && result.indexOf(arr[i]) === -1) {\n        result.push(arr[i]);\n      }\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                explanation: 'Compare every pair of elements. If a match is found and not already in the result, add it.'
            },
            {
                title: 'Using frequency count',
                code: `function findDuplicates(arr) {\n  const count = {};\n  const result = [];\n  for (const item of arr) {\n    count[item] = (count[item] || 0) + 1;\n    if (count[item] === 2) result.push(item);\n  }\n  return result;\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use an object to count occurrences. When a count reaches exactly 2, push to result. This ensures each duplicate is added only once.'
            }
        ],
        examples: [
            { input: [[1, 2, 3, 4, 2, 3]], output: [2, 3], explanation: '2 and 3 each appear twice.' },
            { input: [['a', 'b', 'a', 'c', 'b']], output: ['a', 'b'], explanation: '"a" and "b" each appear twice.' }
        ],
        constraints: [
            'Return each duplicate value only once',
            'Preserve order of first duplicate encounter',
            'If no duplicates exist, return an empty array',
            'The input can contain numbers or strings'
        ],
        hints: [
            'Use an object to count how many times each value appears.',
            'Add to the result when the count reaches exactly 2 (not on every subsequent occurrence).',
            'This ensures each duplicate appears only once in the output.'
        ],
        testCases: [
            { input: [[1, 2, 3, 4, 2, 3]], expectedOutput: [2, 3], description: 'Two duplicates found' },
            { input: [['a', 'b', 'a', 'c', 'b']], expectedOutput: ['a', 'b'], description: 'String duplicates' },
            { input: [[1, 2, 3, 4, 5]], expectedOutput: [], description: 'No duplicates' },
            { input: [[1, 1, 1, 1]], expectedOutput: [1], description: 'Single value repeated', isHidden: true },
            { input: [[]], expectedOutput: [], description: 'Empty array', isHidden: true },
            { input: [[5]], expectedOutput: [], description: 'Single element no duplicate', isHidden: true },
            { input: [[1, 2, 1, 2, 1, 2]], expectedOutput: [1, 2], description: 'Multiple repetitions', isHidden: true },
            { input: [['x', 'y', 'z', 'x']], expectedOutput: ['x'], description: 'One string duplicate', isHidden: true },
            { input: [[0, 0]], expectedOutput: [0], description: 'Zero duplicated', isHidden: true },
            { input: [[true, false, true]], expectedOutput: [true], description: 'Boolean duplicate', isHidden: true },
            { input: [[1, 2, 3, 1, 2, 3, 4, 5, 4]], expectedOutput: [1, 2, 3, 4], description: 'Four duplicates', isHidden: true },
            { input: [[-1, -2, -1, -3, -2]], expectedOutput: [-1, -2], description: 'Negative duplicates', isHidden: true },
            { input: [[10, 20, 30, 40, 50, 10]], expectedOutput: [10], description: 'Duplicate at start and end', isHidden: true },
            { input: [['cat', 'dog', 'cat', 'fish', 'dog']], expectedOutput: ['cat', 'dog'], description: 'Animal string duplicates', isHidden: true },
            { input: [[100, 200, 300, 100, 200, 300]], expectedOutput: [100, 200, 300], description: 'All elements duplicated', isHidden: true },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 1]], expectedOutput: [1], description: 'Duplicate at extremes', isHidden: true },
            { input: [['a', 'a', 'b', 'b', 'c', 'c']], expectedOutput: ['a', 'b', 'c'], description: 'Pairs of duplicates', isHidden: true },
            { input: [[7, 7, 7, 8, 8, 9]], expectedOutput: [7, 8], description: 'Triple and double', isHidden: true },
            { input: [[42, 17, 42, 17, 99]], expectedOutput: [42, 17], description: 'Two pairs mixed', isHidden: true },
            { input: [['hello', 'world', 'hello']], expectedOutput: ['hello'], description: 'Word duplicate', isHidden: true },
        ]
    },

    // Question 44: Flatten Nested Array
    {
        title: 'Flatten Nested Array',
        slug: 'flatten-nested-array',
        description: 'Write a JavaScript function to flatten a nested array. If the second parameter "shallow" is true, only flatten one level deep. Otherwise, flatten completely to any depth.',
        difficulty: 'Medium',
        order: 44,
        category: 'Array',
        functionName: 'flatten',
        starterCode: `function flatten(arr, shallow) {\n  // Write your code here\n}`,
        solution: `function flatten(arr, shallow) {\n  if (shallow) {\n    return [].concat(...arr);\n  }\n  function deepFlatten(a) {\n    return a.reduce((acc, val) => {\n      return acc.concat(Array.isArray(val) ? deepFlatten(val) : val);\n    }, []);\n  }\n  return deepFlatten(arr);\n}`,
        solutions: [
            {
                title: 'Using recursion',
                code: `function flatten(arr, shallow) {\n  if (shallow) {\n    return [].concat(...arr);\n  }\n  const result = [];\n  function recurse(a) {\n    for (const item of a) {\n      if (Array.isArray(item)) {\n        recurse(item);\n      } else {\n        result.push(item);\n      }\n    }\n  }\n  recurse(arr);\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'For shallow, use concat to spread one level. For deep, recursively visit each element: if it is an array, recurse; otherwise push to result.'
            },
            {
                title: 'Using reduce with recursion',
                code: `function flatten(arr, shallow) {\n  if (shallow) return [].concat(...arr);\n  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Use reduce to accumulate. For each element, if it is an array, recursively flatten it and concat; otherwise just concat the value.'
            }
        ],
        examples: [
            { input: [[1, [2], [3, [[4]]], [5, 6]]], output: [1, 2, 3, 4, 5, 6], explanation: 'Deep flatten removes all nesting.' },
            { input: [[1, [2], [3, [[4]]], [5, 6]], true], output: [1, 2, 3, [[4]], 5, 6], explanation: 'Shallow flatten only removes one level of nesting.' }
        ],
        constraints: [
            'If shallow is true, flatten only one level',
            'If shallow is false or not provided, flatten completely',
            'Input can be nested to any depth',
            'Return a new flat array'
        ],
        hints: [
            'For shallow flatten, [].concat(...arr) spreads one level.',
            'For deep flatten, use recursion to handle arbitrary nesting.',
            'Check Array.isArray() to decide whether to recurse.'
        ],
        testCases: [
            { input: [[1, [2], [3, [[4]]], [5, 6]]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'Deep flatten nested array' },
            { input: [[1, [2], [3, [[4]]], [5, 6]], true], expectedOutput: [1, 2, 3, [[4]], 5, 6], description: 'Shallow flatten one level' },
            { input: [[1, 2, 3]], expectedOutput: [1, 2, 3], description: 'Already flat array' },
            { input: [[[1, [2, [3, [4, [5]]]]]]], expectedOutput: [1, 2, 3, 4, 5], description: 'Deeply nested', isHidden: true },
            { input: [[[1, 2], [3, 4]], true], expectedOutput: [1, 2, 3, 4], description: 'Shallow: pairs flattened', isHidden: true },
            { input: [[]], expectedOutput: [], description: 'Empty array', isHidden: true },
            { input: [[[[[1]]]]], expectedOutput: [1], description: 'Triple nested single element', isHidden: true },
            { input: [[1, [2, 3], [4, [5, 6]]]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'Mixed nesting depths', isHidden: true },
            { input: [[1, [2, 3], [4, [5, 6]]], true], expectedOutput: [1, 2, 3, 4, [5, 6]], description: 'Shallow: inner nesting preserved', isHidden: true },
            { input: [['a', ['b', ['c']]]], expectedOutput: ['a', 'b', 'c'], description: 'String deep flatten', isHidden: true },
            { input: [['a', ['b', ['c']]], true], expectedOutput: ['a', 'b', ['c']], description: 'String shallow flatten', isHidden: true },
            { input: [[[], [], []]], expectedOutput: [], description: 'Array of empty arrays', isHidden: true },
            { input: [[1, [], 2, [], 3]], expectedOutput: [1, 2, 3], description: 'Empty arrays interspersed', isHidden: true },
            { input: [[[1], [2], [3]]], expectedOutput: [1, 2, 3], description: 'Each element wrapped', isHidden: true },
            { input: [[[1], [2], [3]], true], expectedOutput: [1, 2, 3], description: 'Shallow: single wrapping removed', isHidden: true },
            { input: [[0, [false, [null]]], true], expectedOutput: [0, false, [null]], description: 'Shallow with falsy values', isHidden: true },
            { input: [[0, [false, [null]]]], expectedOutput: [0, false, null], description: 'Deep with falsy values', isHidden: true },
            { input: [[[[[[[7]]]]]]], expectedOutput: [7], description: 'Six levels deep', isHidden: true },
            { input: [[1, [2, [3]], 4, [5]]], expectedOutput: [1, 2, 3, 4, 5], description: 'Various nesting', isHidden: true },
            { input: [[1, [2, [3]], 4, [5]], true], expectedOutput: [1, 2, [3], 4, 5], description: 'Shallow various nesting', isHidden: true },
        ]
    },

    // Question 45: Union of Two Arrays
    {
        title: 'Union of Two Arrays',
        slug: 'union-of-two-arrays',
        description: 'Write a JavaScript function to compute the union of two arrays. The union should contain all unique elements from both arrays, sorted in ascending order.',
        difficulty: 'Easy',
        order: 45,
        category: 'Array',
        functionName: 'union',
        starterCode: `function union(arr1, arr2) {\n  // Write your code here\n}`,
        solution: `function union(arr1, arr2) {\n  return [...new Set([...arr1, ...arr2])].sort((a, b) => a - b);\n}`,
        solutions: [
            {
                title: 'Using loops and indexOf',
                code: `function union(arr1, arr2) {\n  const result = [...arr1];\n  for (const item of arr2) {\n    if (result.indexOf(item) === -1) {\n      result.push(item);\n    }\n  }\n  return result.sort((a, b) => a - b);\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n × m)',
                spaceComplexity: 'O(n + m)',
                explanation: 'Start with all elements of the first array. For each element in the second array, add it only if it is not already in the result. Sort at the end.'
            },
            {
                title: 'Using Set',
                code: `function union(arr1, arr2) {\n  return [...new Set([...arr1, ...arr2])].sort((a, b) => a - b);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O((n+m) log(n+m))',
                spaceComplexity: 'O(n + m)',
                explanation: 'Combine both arrays, pass through a Set to remove duplicates, spread back into an array, and sort. Concise and efficient.'
            }
        ],
        examples: [
            { input: [[1, 2, 3], [100, 2, 1, 10]], output: [1, 2, 3, 10, 100], explanation: 'Unique values from both arrays, sorted.' }
        ],
        constraints: [
            'Return all unique elements from both arrays',
            'Sort the result in ascending numerical order',
            'Remove all duplicates',
            'Both inputs will be arrays of numbers'
        ],
        hints: [
            'Combine both arrays and remove duplicates.',
            'A Set automatically removes duplicate values.',
            'Sort the final result numerically with (a, b) => a - b.'
        ],
        testCases: [
            { input: [[1, 2, 3], [100, 2, 1, 10]], expectedOutput: [1, 2, 3, 10, 100], description: 'Basic union with overlap' },
            { input: [[1, 2, 3], [4, 5, 6]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'No overlap' },
            { input: [[1, 2, 3], [1, 2, 3]], expectedOutput: [1, 2, 3], description: 'Complete overlap' },
            { input: [[], [1, 2, 3]], expectedOutput: [1, 2, 3], description: 'First empty', isHidden: true },
            { input: [[1, 2, 3], []], expectedOutput: [1, 2, 3], description: 'Second empty', isHidden: true },
            { input: [[], []], expectedOutput: [], description: 'Both empty', isHidden: true },
            { input: [[5, 3, 1], [4, 2, 6]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'Unsorted inputs', isHidden: true },
            { input: [[-1, -2], [2, 1]], expectedOutput: [-2, -1, 1, 2], description: 'Negative and positive', isHidden: true },
            { input: [[0], [0]], expectedOutput: [0], description: 'Both have zero only', isHidden: true },
            { input: [[10, 20, 30], [25, 35, 10]], expectedOutput: [10, 20, 25, 30, 35], description: 'Partial overlap', isHidden: true },
            { input: [[1, 1, 2, 2], [2, 2, 3, 3]], expectedOutput: [1, 2, 3], description: 'Duplicates within arrays', isHidden: true },
            { input: [[100], [200]], expectedOutput: [100, 200], description: 'Single elements', isHidden: true },
            { input: [[-10, 0, 10], [-5, 0, 5]], expectedOutput: [-10, -5, 0, 5, 10], description: 'Symmetric with zero overlap', isHidden: true },
            { input: [[7, 7, 7], [7]], expectedOutput: [7], description: 'All same value', isHidden: true },
            { input: [[1, 3, 5, 7], [2, 4, 6, 8]], expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8], description: 'Odd and even interleave', isHidden: true },
            { input: [[50, 40, 30, 20, 10], [15, 25, 35, 45, 55]], expectedOutput: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55], description: 'Ten unique elements combined', isHidden: true },
            { input: [[-100, 100], [0]], expectedOutput: [-100, 0, 100], description: 'Large range with zero', isHidden: true },
            { input: [[5, 10, 15], [5, 10, 15, 20]], expectedOutput: [5, 10, 15, 20], description: 'Subset plus one', isHidden: true },
            { input: [[99, 1], [50, 1, 99]], expectedOutput: [1, 50, 99], description: 'Overlap with extra', isHidden: true },
            { input: [[3, 6, 9], [3, 6, 12]], expectedOutput: [3, 6, 9, 12], description: 'Multiples of 3', isHidden: true },
        ]
    },

    // Question 46: Remove Falsy Values
    {
        title: 'Remove Falsy Values',
        slug: 'remove-falsy-values',
        description: 'Write a JavaScript function to remove all falsy values from an array. Falsy values include: null, 0, "", false, undefined, and NaN.',
        difficulty: 'Easy',
        order: 46,
        category: 'Array',
        functionName: 'removeFalsy',
        starterCode: `function removeFalsy(arr) {\n  // Write your code here\n}`,
        solution: `function removeFalsy(arr) {\n  return arr.filter(Boolean);\n}`,
        solutions: [
            {
                title: 'Using a loop',
                code: `function removeFalsy(arr) {\n  const result = [];\n  for (const item of arr) {\n    if (item) {\n      result.push(item);\n    }\n  }\n  return result;\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Iterate through the array and only add truthy values to the result array.'
            },
            {
                title: 'Using filter with Boolean',
                code: `function removeFalsy(arr) {\n  return arr.filter(Boolean);\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'Pass Boolean as the filter callback. It converts each element to a boolean, filtering out all falsy values in one concise expression.'
            }
        ],
        examples: [
            { input: [[NaN, 0, 15, false, -22, '', undefined, 47, null]], output: [15, -22, 47], explanation: 'Only 15, -22, and 47 are truthy values.' }
        ],
        constraints: [
            'Remove all falsy values: null, 0, "", false, undefined, NaN',
            'Return a new array with only truthy values',
            'Preserve the order of remaining elements',
            'Negative numbers and non-empty strings are truthy'
        ],
        hints: [
            'JavaScript falsy values: false, 0, "", null, undefined, NaN.',
            'The Boolean function returns false for all falsy values.',
            'Array.filter(Boolean) is a concise way to remove all falsy values.'
        ],
        testCases: [
            { input: [[NaN, 0, 15, false, -22, '', undefined, 47, null]], expectedOutput: [15, -22, 47], description: 'Mixed falsy and truthy' },
            { input: [[1, 2, 3]], expectedOutput: [1, 2, 3], description: 'All truthy' },
            { input: [[0, false, null, undefined, '', NaN]], expectedOutput: [], description: 'All falsy' },
            { input: [[]], expectedOutput: [], description: 'Empty array', isHidden: true },
            { input: [['hello', 0, 'world']], expectedOutput: ['hello', 'world'], description: 'Strings with zero', isHidden: true },
            { input: [[true, false, true]], expectedOutput: [true, true], description: 'Booleans filtered', isHidden: true },
            { input: [[-1, 0, 1]], expectedOutput: [-1, 1], description: 'Zero removed, negatives kept', isHidden: true },
            { input: [[null, null, null, 1]], expectedOutput: [1], description: 'Multiple nulls', isHidden: true },
            { input: [[undefined, 'a', undefined, 'b']], expectedOutput: ['a', 'b'], description: 'Undefined scattered', isHidden: true },
            { input: [['', '', 'hello']], expectedOutput: ['hello'], description: 'Empty strings removed', isHidden: true },
            { input: [[false, 1, false, 2, false, 3]], expectedOutput: [1, 2, 3], description: 'Alternating false and numbers', isHidden: true },
            { input: [[0, '', false, 'yes', 42]], expectedOutput: ['yes', 42], description: 'Mixed types, two truthy', isHidden: true },
            { input: [[-5, -10, 0, 5, 10]], expectedOutput: [-5, -10, 5, 10], description: 'Zero among negatives and positives', isHidden: true },
            { input: [['a', 'b', 'c', 'd']], expectedOutput: ['a', 'b', 'c', 'd'], description: 'All strings truthy', isHidden: true },
            { input: [[100, 200, 300]], expectedOutput: [100, 200, 300], description: 'All numbers truthy', isHidden: true },
            { input: [[0, 0, 0]], expectedOutput: [], description: 'All zeros', isHidden: true },
            { input: [[null, undefined, false]], expectedOutput: [], description: 'Three different falsy types', isHidden: true },
            { input: [['0', 'false', 'null']], expectedOutput: ['0', 'false', 'null'], description: 'String representations are truthy', isHidden: true },
            { input: [[1, null, 2, undefined, 3, false, 4, 0, 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'Numbers survive, falsy removed', isHidden: true },
            { input: [[-100, 0, 100, null, '', false]], expectedOutput: [-100, 100], description: 'Only negatives and large positives survive', isHidden: true },
        ]
    },

    // Question 47: Find Pair with Target Sum
    {
        title: 'Find Pair with Target Sum',
        slug: 'find-pair-with-target-sum',
        description: 'Write a JavaScript function that takes an array of numbers and a target sum, and returns the indices of the first pair of elements whose sum equals the target. Return the indices as an array [i, j] where i < j.',
        difficulty: 'Medium',
        order: 47,
        category: 'Array',
        functionName: 'findPair',
        starterCode: `function findPair(numbers, target) {\n  // Write your code here\n}`,
        solution: `function findPair(numbers, target) {\n  const map = {};\n  for (let i = 0; i < numbers.length; i++) {\n    const complement = target - numbers[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[numbers[i]] = i;\n  }\n  return [];\n}`,
        solutions: [
            {
                title: 'Using nested loops',
                code: `function findPair(numbers, target) {\n  for (let i = 0; i < numbers.length; i++) {\n    for (let j = i + 1; j < numbers.length; j++) {\n      if (numbers[i] + numbers[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`,
                approach: 'Brute Force',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                explanation: 'Check every pair of elements. If their sum equals the target, return their indices. Simple but slow for large arrays.'
            },
            {
                title: 'Using a hash map',
                code: `function findPair(numbers, target) {\n  const map = {};\n  for (let i = 0; i < numbers.length; i++) {\n    const complement = target - numbers[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[numbers[i]] = i;\n  }\n  return [];\n}`,
                approach: 'Optimal',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                explanation: 'For each number, compute the complement (target - number). If it exists in the map, return both indices. Otherwise, store the current number and index.'
            }
        ],
        examples: [
            { input: [[10, 20, 10, 40, 50, 60, 70], 50], output: [2, 3], explanation: 'numbers[2]=10 and numbers[3]=40, sum is 50.' },
            { input: [[1, 2, 3, 4, 5], 9], output: [3, 4], explanation: 'numbers[3]=4 and numbers[4]=5, sum is 9.' }
        ],
        constraints: [
            'Return the indices as [i, j] where i < j',
            'Return the first pair found',
            'If no pair exists, return an empty array',
            'The same element cannot be used twice'
        ],
        hints: [
            'For each element, the complement = target - element.',
            'Use a hash map to store previously seen values and their indices.',
            'Check if the complement has been seen before — if so, you found the pair.'
        ],
        testCases: [
            { input: [[10, 20, 10, 40, 50, 60, 70], 50], expectedOutput: [2, 3], description: '10+40=50 at indices 2,3' },
            { input: [[1, 2, 3, 4, 5], 9], expectedOutput: [3, 4], description: '4+5=9 at indices 3,4' },
            { input: [[1, 2, 3], 10], expectedOutput: [], description: 'No pair sums to 10' },
            { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1], description: '2+7=9', isHidden: true },
            { input: [[3, 2, 4], 6], expectedOutput: [1, 2], description: '2+4=6', isHidden: true },
            { input: [[3, 3], 6], expectedOutput: [0, 1], description: '3+3=6', isHidden: true },
            { input: [[1, 5, 3, 7, 2], 8], expectedOutput: [0, 3], description: '1+7=8', isHidden: true },
            { input: [[-1, -2, -3, -4], -5], expectedOutput: [0, 3], description: '-1+(-4)=-5', isHidden: true },
            { input: [[0, 4, 3, 0], 0], expectedOutput: [0, 3], description: '0+0=0', isHidden: true },
            { input: [[1, 2], 3], expectedOutput: [0, 1], description: '1+2=3', isHidden: true },
            { input: [[5], 5], expectedOutput: [], description: 'Single element, no pair', isHidden: true },
            { input: [[], 5], expectedOutput: [], description: 'Empty array', isHidden: true },
            { input: [[10, 20, 30, 40], 70], expectedOutput: [2, 3], description: '30+40=70', isHidden: true },
            { input: [[1, 2, 3, 4, 5], 3], expectedOutput: [0, 1], description: '1+2=3', isHidden: true },
            { input: [[-1, 1], 0], expectedOutput: [0, 1], description: '-1+1=0', isHidden: true },
            { input: [[100, 200, 300, 400], 500], expectedOutput: [0, 3], description: '100+400=500', isHidden: true },
            { input: [[5, 5, 5, 5], 10], expectedOutput: [0, 1], description: 'First pair of 5+5=10', isHidden: true },
            { input: [[1, 3, 5, 7, 9], 12], expectedOutput: [1, 4], description: '3+9=12', isHidden: true },
            { input: [[11, 22, 33, 44], 55], expectedOutput: [0, 3], description: '11+44=55', isHidden: true },
            { input: [[-5, 10, -3, 8], 5], expectedOutput: [0, 1], description: '-5+10=5', isHidden: true },
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
