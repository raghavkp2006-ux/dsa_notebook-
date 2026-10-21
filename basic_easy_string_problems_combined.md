# Basic and Easy String Problems

---

title: Remove outermost Parenthesis
topic: Strings
difficulty: Easy
pattern: Depth Counter
link: https://leetcode.com/problems/remove-outermost-parentheses/

## Problem
Given a valid parentheses string, remove the outermost parentheses from every primitive part.

## Core idea
Track the current parentheses depth. Add a bracket only when it is not part of the outermost layer.

## Approach
1. Set `depth = 0`
2. For `'('`, add it only if `depth > 0`, then increment depth
3. For `')'`, decrement depth first
4. Add `')'` only if `depth > 0`
5. Return the built string

## Dry run
`s = "(()())(())"`

| char | depth | action | result |
|---|---|---|---|
| ( | 0→1 | skip outer | "" |
| ( | 1→2 | add | "(" |
| ) | 2→1 | add | "()" |
| ( | 1→2 | add | "()(" |
| ) | 2→1 | add | "()()" |
| ) | 1→0 | skip outer | "()()" |

Final result: `"()()()"`

## Code
```java
class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder ans = new StringBuilder();
        int depth = 0;

        for (char ch : s.toCharArray()) {
            if (ch == '(') {
                if (depth > 0) {
                    ans.append(ch);
                }
                depth++;
            } else {
                depth--;

                if (depth > 0) {
                    ans.append(ch);
                }
            }
        }

        return ans.toString();
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Reverse words in a given string / Palindrome Check
topic: Strings
difficulty: Easy
pattern: String Traversal
link: https://leetcode.com/problems/reverse-words-in-a-string/

## Problem
Reverse the order of words in a string and also know how to check whether a string is a palindrome.

## Core idea
For reverse words, split the string into words and traverse from right to left. For palindrome, compare characters from both ends.

## Approach
1. Trim extra spaces
2. Split the string into words
3. Traverse the words from end to start
4. Join them with one space
5. For palindrome, use two pointers from both ends
6. If any pair differs, return false

## Dry run
`s = "  hello world  "`

| step | result |
|---|---|
| trim | `"hello world"` |
| words | `[hello, world]` |
| reverse | `"world hello"` |

Palindrome example: `"madam"` → `true`

## Code
```java
class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\s+");
        StringBuilder ans = new StringBuilder();

        for (int i = words.length - 1; i >= 0; i--) {
            ans.append(words[i]);

            if (i != 0) {
                ans.append(" ");
            }
        }

        return ans.toString();
    }

    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Largest odd number in a string
topic: Strings
difficulty: Easy
pattern: Right-to-Left Scan
link: https://leetcode.com/problems/largest-odd-number-in-string/

## Problem
Given a string representing a non-negative integer, return the largest-valued odd-number substring.

## Core idea
The largest odd substring is the longest prefix ending at the rightmost odd digit.

## Approach
1. Start from the last character
2. Check whether the digit is odd
3. If it is odd, return the substring from index `0` to that position
4. Otherwise continue moving left
5. If no odd digit exists, return an empty string

## Dry run
`num = "35420"`

| index | digit | odd? | action |
|---|---|---|---|
| 4 | 0 | no | move left |
| 3 | 2 | no | move left |
| 2 | 4 | no | move left |
| 1 | 5 | yes | return `"35"` |

## Code
```java
class Solution {
    public String largestOddNumber(String num) {
        for (int i = num.length() - 1; i >= 0; i--) {
            int digit = num.charAt(i) - '0';

            if (digit % 2 == 1) {
                return num.substring(0, i + 1);
            }
        }

        return "";
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Longest Common Prefix
topic: Strings
difficulty: Easy
pattern: Prefix Comparison
link: https://leetcode.com/problems/longest-common-prefix/

## Problem
Find the longest prefix common to all strings in an array.

## Core idea
Start with the first string as the prefix and keep shortening it until every other string starts with it.

## Approach
1. Take the first string as `prefix`
2. Compare it with every other string
3. While a string does not start with `prefix`, remove the last character
4. Stop if the prefix becomes empty
5. Return the remaining prefix

## Dry run
`strs = ["flower","flow","flight"]`

| string | prefix before | prefix after |
|---|---|---|
| flower | flower | flower |
| flow | flower | flow |
| flight | flow | fl |

Result: `"fl"`

## Code
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";

        String prefix = strs[0];

        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);

                if (prefix.isEmpty()) {
                    return "";
                }
            }
        }

        return prefix;
    }
}
```

**Time:** O(n × m) **Space:** O(1)

---

title: Isomorphic String
topic: Strings
difficulty: Easy
pattern: Character Mapping
link: https://leetcode.com/problems/isomorphic-strings/

## Problem
Check whether characters in one string can be replaced to form another string while preserving character order.

## Core idea
Each character in the first string must always map to the same character in the second string, and two different characters cannot map to the same character.

## Approach
1. Create two mapping arrays
2. Traverse both strings together
3. If neither character has been seen, create the mapping
4. If an existing mapping does not match, return false
5. If the loop finishes, return true

## Dry run
`s = "egg", t = "add"`

| s char | t char | mapping | action |
|---|---|---|---|
| e | a | e→a | store |
| g | d | g→d | store |
| g | d | g→d | valid |

Result: `true`

## Code
```java
class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] mapS = new int[256];
        int[] mapT = new int[256];

        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i);
            char b = t.charAt(i);

            if (mapS[a] != mapT[b]) {
                return false;
            }

            mapS[a] = i + 1;
            mapT[b] = i + 1;
        }

        return true;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Check whether one string is a rotation of another
topic: Strings
difficulty: Easy
pattern: Concatenation
link: https://leetcode.com/problems/rotate-string/

## Problem
Check whether string `goal` can be obtained by rotating string `s`.

## Core idea
Every possible rotation of `s` appears as a substring of `s + s`.

## Approach
1. Check whether both strings have the same length
2. Concatenate `s + s`
3. Check whether `goal` is a substring
4. If yes, return true
5. Otherwise return false

## Dry run
`s = "abcde", goal = "cdeab"`

| step | value |
|---|---|
| s + s | `"abcdeabcde"` |
| contains goal? | yes |
| result | true |

## Code
```java
class Solution {
    public boolean rotateString(String s, String goal) {
        if (s.length() != goal.length()) {
            return false;
        }

        return (s + s).contains(goal);
    }
}
```

**Time:** O(n) average **Space:** O(n)

---

title: Check if two strings are anagram of each other
topic: Strings
difficulty: Easy
pattern: Frequency Count
link: https://leetcode.com/problems/valid-anagram/

## Problem
Check whether two strings contain exactly the same characters with the same frequencies.

## Core idea
Count characters from the first string and subtract counts using the second string. All counts must become zero.

## Approach
1. If lengths are different, return false
2. Create a frequency array
3. Increment frequency for characters in the first string
4. Decrement frequency for characters in the second string
5. If every frequency is zero, return true

## Dry run
`s = "anagram", t = "nagaram"`

| character | final frequency |
|---|---|
| a | 0 |
| n | 0 |
| g | 0 |
| r | 0 |
| m | 0 |

Result: `true`

## Code
```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        int[] freq = new int[26];

        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        for (int count : freq) {
            if (count != 0) {
                return false;
            }
        }

        return true;
    }
}
```

**Time:** O(n) **Space:** O(1)
