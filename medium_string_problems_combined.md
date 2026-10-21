# Medium String Problems

---

title: Sort Characters by frequency
topic: Strings
difficulty: Medium
pattern: Frequency Map + Sorting
link: https://leetcode.com/problems/sort-characters-by-frequency/

## Problem
Given a string, sort its characters in decreasing order of frequency.

## Core idea
Count the frequency of each character, then place characters with higher frequency first.

## Approach
1. Count the frequency of every character
2. Store characters in a priority queue ordered by frequency
3. Remove the most frequent character first
4. Append it to the answer as many times as it appears
5. Repeat until the queue becomes empty

## Dry run
`s = "tree"`

| character | frequency |
|---|---|
| t | 1 |
| r | 1 |
| e | 2 |

Possible result: `"eert"`

## Code
```java
import java.util.*;

class Solution {
    public String frequencySort(String s) {
        HashMap<Character, Integer> map = new HashMap<>();

        for (char ch : s.toCharArray()) {
            map.put(ch, map.getOrDefault(ch, 0) + 1);
        }

        PriorityQueue<Character> pq = new PriorityQueue<>(
            (a, b) -> map.get(b) - map.get(a)
        );

        pq.addAll(map.keySet());

        StringBuilder ans = new StringBuilder();

        while (!pq.isEmpty()) {
            char ch = pq.poll();
            int freq = map.get(ch);

            for (int i = 0; i < freq; i++) {
                ans.append(ch);
            }
        }

        return ans.toString();
    }
}
```

**Time:** O(n log k) **Space:** O(k)

---

title: Maximum Nesting Depth of Parenthesis
topic: Strings
difficulty: Medium
pattern: Depth Counter
link: https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/

## Problem
Find the maximum nesting depth of parentheses in a valid parentheses string.

## Core idea
Increase depth when `'('` appears and decrease it when `')'` appears. Track the maximum depth reached.

## Approach
1. Initialize `depth = 0`
2. Initialize `maxDepth = 0`
3. For `'('`, increment depth
4. Update maximum depth
5. For `')'`, decrement depth
6. Return `maxDepth`

## Dry run
`s = "(1+(2*3)+((8)/4))+1"`

| char | depth | maxDepth |
|---|---|---|
| ( | 1 | 1 |
| ( | 2 | 2 |
| ) | 1 | 2 |
| ( | 2 | 2 |
| ( | 3 | 3 |

Result: `3`

## Code
```java
class Solution {
    public int maxDepth(String s) {
        int depth = 0;
        int maxDepth = 0;

        for (char ch : s.toCharArray()) {
            if (ch == '(') {
                depth++;
                maxDepth = Math.max(maxDepth, depth);
            } else if (ch == ')') {
                depth--;
            }
        }

        return maxDepth;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Roman Number to Integer and vice versa
topic: Strings
difficulty: Medium
pattern: Mapping
link: https://leetcode.com/problems/roman-to-integer/

## Problem
Convert a Roman numeral to an integer and convert an integer to a Roman numeral.

## Core idea
For Roman to Integer, subtract a value if it is smaller than the next value. For Integer to Roman, greedily subtract the largest possible Roman value.

## Approach
1. Store Roman symbol values
2. For Roman to Integer, compare each symbol with the next one
3. Subtract when the current value is smaller
4. Otherwise add the value
5. For Integer to Roman, store Roman values from largest to smallest
6. Repeatedly subtract and append symbols

## Dry run
`Roman = "MCMIV"`

| symbols | value |
|---|---|
| M | 1000 |
| CM | 900 |
| IV | 4 |

Result: `1904`

`Integer = 58`

Result: `"LVIII"`

## Code
```java
import java.util.*;

class Solution {
    public int romanToInt(String s) {
        HashMap<Character, Integer> map = new HashMap<>();

        map.put('I', 1);
        map.put('V', 5);
        map.put('X', 10);
        map.put('L', 50);
        map.put('C', 100);
        map.put('D', 500);
        map.put('M', 1000);

        int result = 0;

        for (int i = 0; i < s.length(); i++) {
            int current = map.get(s.charAt(i));

            if (i + 1 < s.length() &&
                current < map.get(s.charAt(i + 1))) {
                result -= current;
            } else {
                result += current;
            }
        }

        return result;
    }

    public String intToRoman(int num) {
        int[] values = {
            1000, 900, 500, 400, 100, 90,
            50, 40, 10, 9, 5, 4, 1
        };

        String[] symbols = {
            "M", "CM", "D", "CD", "C", "XC",
            "L", "XL", "X", "IX", "V", "IV", "I"
        };

        StringBuilder ans = new StringBuilder();

        for (int i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                num -= values[i];
                ans.append(symbols[i]);
            }
        }

        return ans.toString();
    }
}
```

**Time:** O(n) for Roman to Integer, O(1) for Integer to Roman **Space:** O(1)

---

title: Implement Atoi
topic: Strings
difficulty: Medium
pattern: String Parsing
link: https://leetcode.com/problems/string-to-integer-atoi/

## Problem
Convert a string into a 32-bit signed integer while handling spaces, signs, invalid characters, and overflow.

## Core idea
Skip spaces, read the sign, then build the number digit by digit while checking for overflow.

## Approach
1. Skip leading spaces
2. Read optional `+` or `-`
3. Read digits one by one
4. Build the number
5. Stop when a non-digit appears
6. Clamp the result if overflow occurs

## Dry run
`s = "   -42abc"`

| step | result |
|---|---|
| skip spaces | `-42abc` |
| sign | `-` |
| digits | `42` |
| stop at | `a` |
| result | `-42` |

## Code
```java
class Solution {
    public int myAtoi(String s) {
        int i = 0;
        int n = s.length();

        while (i < n && s.charAt(i) == ' ') {
            i++;
        }

        int sign = 1;

        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            if (s.charAt(i) == '-') {
                sign = -1;
            }
            i++;
        }

        long result = 0;

        while (i < n && Character.isDigit(s.charAt(i))) {
            result = result * 10 + (s.charAt(i) - '0');

            if (sign * result > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }

            if (sign * result < Integer.MIN_VALUE) {
                return Integer.MIN_VALUE;
            }

            i++;
        }

        return (int) (sign * result);
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Count Number of Substrings
topic: Strings
difficulty: Medium
pattern: Sliding Window
link: https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/

## Problem
Count the number of substrings containing at least one occurrence of `'a'`, `'b'`, and `'c'`.

## Core idea
Track the latest index of `a`, `b`, and `c`. At every position, the minimum of these three indices tells how many valid substrings end there.

## Approach
1. Store last seen positions of `a`, `b`, and `c`
2. Traverse the string
3. Update the last seen position of the current character
4. Find the minimum of the three last seen positions
5. Add `minIndex + 1` to the answer when all three exist

## Dry run
`s = "abcabc"`

| i | char | last a,b,c | added |
|---|---|---|---|
| 0 | a | [0,-1,-1] | 0 |
| 1 | b | [0,1,-1] | 0 |
| 2 | c | [0,1,2] | 1 |
| 3 | a | [3,1,2] | 2 |
| 4 | b | [3,4,2] | 3 |
| 5 | c | [3,4,5] | 4 |

Total: `10`

## Code
```java
class Solution {
    public int numberOfSubstrings(String s) {
        int[] last = {-1, -1, -1};
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;

            int minIndex = Math.min(
                last[0],
                Math.min(last[1], last[2])
            );

            if (minIndex != -1) {
                count += minIndex + 1;
            }
        }

        return count;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Longest Palindromic Substring
topic: Strings
difficulty: Hard
pattern: Expand Around Center
link: https://leetcode.com/problems/longest-palindromic-substring/

## Problem
Find the longest substring that is a palindrome without using dynamic programming.

## Core idea
Every palindrome has a center. Expand from each index for odd-length palindromes and between indices for even-length palindromes.

## Approach
1. Treat each index as the center of an odd palindrome
2. Expand outward while characters match
3. Treat every pair of adjacent indices as an even center
4. Expand outward again
5. Track the longest palindrome found

## Dry run
`s = "babad"`

| center | palindrome |
|---|---|
| b | b |
| a | bab |
| b | aba |
| a | a |
| d | d |

Possible result: `"bab"` or `"aba"`

## Code
```java
class Solution {
    public String longestPalindrome(String s) {
        int start = 0;
        int end = 0;

        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);

            int len = Math.max(len1, len2);

            if (len > end - start + 1) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }

        return s.substring(start, end + 1);
    }

    private int expand(String s, int left, int right) {
        while (left >= 0 &&
               right < s.length() &&
               s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }

        return right - left - 1;
    }
}
```

**Time:** O(n²) **Space:** O(1)

---

title: Sum of Beauty of all substring
topic: Strings
difficulty: Medium
pattern: Frequency Counting
link: https://leetcode.com/problems/sum-of-beauty-of-all-substrings/

## Problem
For every substring, beauty is `maximum frequency - minimum non-zero frequency`. Return the sum of beauty of all substrings.

## Core idea
Fix the starting position and extend the substring one character at a time while maintaining frequencies.

## Approach
1. Fix a starting index
2. Create a frequency array
3. Extend the ending index
4. Update the frequency of the new character
5. Find maximum and minimum non-zero frequencies
6. Add their difference to the answer

## Dry run
`s = "aabcb"`

Example substring: `"aabc"`

Frequencies:

| character | frequency |
|---|---|
| a | 2 |
| b | 1 |
| c | 1 |

Beauty = `2 - 1 = 1`

## Code
```java
class Solution {
    public int beautySum(String s) {
        int total = 0;

        for (int i = 0; i < s.length(); i++) {
            int[] freq = new int[26];

            for (int j = i; j < s.length(); j++) {
                freq[s.charAt(j) - 'a']++;

                int maxFreq = 0;
                int minFreq = Integer.MAX_VALUE;

                for (int count : freq) {
                    if (count > 0) {
                        maxFreq = Math.max(maxFreq, count);
                        minFreq = Math.min(minFreq, count);
                    }
                }

                total += maxFreq - minFreq;
            }
        }

        return total;
    }
}
```

**Time:** O(26 × n²) = O(n²) **Space:** O(1)

---

title: Reverse Every Word in A String
topic: Strings
difficulty: Medium
pattern: Two Pointers
link: https://leetcode.com/problems/reverse-words-in-a-string-iii/

## Problem
Reverse every word in a string while keeping the order of the words unchanged.

## Core idea
Find each word boundary and reverse the characters inside that word.

## Approach
1. Convert the string to a character array
2. Mark the start of each word
3. Move until a space or the end is found
4. Reverse the characters in that word
5. Continue for every word

## Dry run
`s = "Let's code"`

| word | reversed |
|---|---|
| Let's | s'teL |
| code | edoc |

Result: `"s'teL edoc"`

## Code
```java
class Solution {
    public String reverseWords(String s) {
        char[] arr = s.toCharArray();

        int start = 0;

        for (int i = 0; i <= arr.length; i++) {
            if (i == arr.length || arr[i] == ' ') {
                reverse(arr, start, i - 1);
                start = i + 1;
            }
        }

        return new String(arr);
    }

    private void reverse(char[] arr, int left, int right) {
        while (left < right) {
            char temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }
    }
}
```

**Time:** O(n) **Space:** O(n)
