# Sliding Window and Two Pointer Problems

---

title: Longest Substring Without Repeating Characters
topic: Sliding Window
difficulty: Medium
pattern: Sliding Window + Hash Map
link: https://leetcode.com/problems/longest-substring-without-repeating-characters/

## Problem
Find the length of the longest substring without repeating characters.

## Core idea
Expand the right pointer and move the left pointer whenever a repeated character appears inside the current window.

## Approach
1. Keep the last seen index of every character
2. Move the right pointer through the string
3. If the current character was already inside the window, move `left`
4. Update the last seen position
5. Track the maximum window length

## Dry run
`s = "abcabcbb"`

| right | char | left | max length |
|---|---|---|---|
| 0 | a | 0 | 1 |
| 1 | b | 0 | 2 |
| 2 | c | 0 | 3 |
| 3 | a | 1 | 3 |
| 4 | b | 2 | 3 |

Result: `3`

## Code
```java
import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] last = new int[256];
        Arrays.fill(last, -1);

        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            if (last[ch] >= left) {
                left = last[ch] + 1;
            }

            last[ch] = right;

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Max Consecutive Ones III
topic: Sliding Window
difficulty: Medium
pattern: Sliding Window
link: https://leetcode.com/problems/max-consecutive-ones-iii/

## Problem
Given a binary array, find the longest subarray containing at most `k` zeros.

## Core idea
Expand the window and count zeros. If zeros exceed `k`, move the left pointer until the window becomes valid again.

## Approach
1. Set `left = 0`
2. Expand `right`
3. Count zeros inside the window
4. If zeros exceed `k`, shrink from the left
5. Track the maximum valid window length

## Dry run
`nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2`

The best valid window has length `6`.

Result: `6`

## Code
```java
class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int zeros = 0;
        int maxLen = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) {
                zeros++;
            }

            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Fruit Into Baskets
topic: Sliding Window
difficulty: Medium
pattern: At Most 2 Distinct
link: https://leetcode.com/problems/fruit-into-baskets/

## Problem
Find the longest contiguous subarray containing at most two distinct fruit types.

## Core idea
Maintain a sliding window containing at most two distinct values.

## Approach
1. Use a frequency map
2. Expand the right pointer
3. Add the current fruit to the map
4. If more than two types exist, shrink from the left
5. Track the largest valid window

## Dry run
`fruits = [1,2,1,2,3]`

| window | valid? |
|---|---|
| [1,2,1,2] | yes |
| [1,2,1,2,3] | no |

Result: `4`

## Code
```java
import java.util.*;

class Solution {
    public int totalFruit(int[] fruits) {
        HashMap<Integer, Integer> map = new HashMap<>();

        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < fruits.length; right++) {
            map.put(
                fruits[right],
                map.getOrDefault(fruits[right], 0) + 1
            );

            while (map.size() > 2) {
                int value = fruits[left];

                map.put(value, map.get(value) - 1);

                if (map.get(value) == 0) {
                    map.remove(value);
                }

                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Longest Repeating Character Replacement
topic: Sliding Window
difficulty: Medium
pattern: Sliding Window + Frequency
link: https://leetcode.com/problems/longest-repeating-character-replacement/

## Problem
Find the longest substring that can be made of one repeating character after replacing at most `k` characters.

## Core idea
A window is valid when `window length - maximum character frequency <= k`.

## Approach
1. Maintain character frequencies
2. Track the maximum frequency in the current window
3. Expand the right pointer
4. If replacements needed exceed `k`, move left
5. Track maximum window length

## Dry run
`s = "AABABBA", k = 1`

Best window can be `"AABA"` or `"ABBA"`.

Result: `4`

## Code
```java
class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];

        int left = 0;
        int maxFreq = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            int index = s.charAt(right) - 'A';

            freq[index]++;
            maxFreq = Math.max(maxFreq, freq[index]);

            while ((right - left + 1) - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Binary subarray with sum
topic: Sliding Window
difficulty: Medium
pattern: At Most K
link: https://leetcode.com/problems/binary-subarrays-with-sum/

## Problem
Count the number of subarrays in a binary array whose sum equals `goal`.

## Core idea
Use `countExactly(goal) = countAtMost(goal) - countAtMost(goal - 1)`.

## Approach
1. Create helper for subarrays with sum at most `k`
2. Expand right pointer
3. Shrink while sum exceeds `k`
4. Add current window length to count
5. Subtract atMost(goal - 1) from atMost(goal)

## Dry run
`nums = [1,0,1,0,1], goal = 2`

Valid subarrays count = `4`

## Code
```java
class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return atMost(nums, goal) - atMost(nums, goal - 1);
    }

    private int atMost(int[] nums, int goal) {
        if (goal < 0) return 0;

        int left = 0;
        int sum = 0;
        int count = 0;

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];

            while (sum > goal) {
                sum -= nums[left++];
            }

            count += right - left + 1;
        }

        return count;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Count number of nice subarrays
topic: Sliding Window
difficulty: Medium
pattern: At Most K Odd Numbers
link: https://leetcode.com/problems/count-number-of-nice-subarrays/

## Problem
Count subarrays containing exactly `k` odd numbers.

## Core idea
Convert the problem to counting subarrays with at most `k` odd numbers.

## Approach
1. Create helper for at most `k` odd numbers
2. Expand right pointer
3. Count odd values
4. Shrink if odd count exceeds `k`
5. Use `atMost(k) - atMost(k - 1)`

## Dry run
`nums = [1,1,2,1,1], k = 3`

Valid subarrays count = `2`

## Code
```java
class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private int atMost(int[] nums, int k) {
        int left = 0;
        int odd = 0;
        int count = 0;

        for (int right = 0; right < nums.length; right++) {
            if ((nums[right] & 1) == 1) {
                odd++;
            }

            while (odd > k) {
                if ((nums[left] & 1) == 1) {
                    odd--;
                }

                left++;
            }

            count += right - left + 1;
        }

        return count;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Number of substring containing all three characters
topic: Sliding Window
difficulty: Medium
pattern: Last Seen Index
link: https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/

## Problem
Count substrings containing at least one `a`, one `b`, and one `c`.

## Core idea
Track the latest index of all three characters. The minimum last-seen index tells how many valid substrings end at the current position.

## Approach
1. Keep last indices of `a`, `b`, and `c`
2. Update the current character's index
3. Find the minimum last index
4. If all characters were seen, add `minIndex + 1`
5. Continue through the string

## Dry run
`s = "abcabc"`

| i | char | last indices | added |
|---|---|---|---|
| 0 | a | [0,-1,-1] | 0 |
| 1 | b | [0,1,-1] | 0 |
| 2 | c | [0,1,2] | 1 |
| 3 | a | [3,1,2] | 2 |

Result: `10`

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

title: Maximum point you can obtain from cards
topic: Sliding Window
difficulty: Medium
pattern: Complement Window
link: https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/

## Problem
Pick exactly `k` cards from either end to maximize the total score.

## Core idea
Instead of choosing `k` cards, leave a contiguous window of size `n-k` with the minimum possible sum.

## Approach
1. Find total sum
2. Set window size to `n - k`
3. Find minimum sum window of that size
4. Subtract minimum window sum from total
5. Return the result

## Dry run
`cardPoints = [1,2,3,4,5,6,1], k = 3`

Best pick:

`1 + 6 + 5 = 12`

Result: `12`

## Code
```java
class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int total = 0;

        for (int x : cardPoints) {
            total += x;
        }

        int window = cardPoints.length - k;

        if (window == 0) return total;

        int current = 0;

        for (int i = 0; i < window; i++) {
            current += cardPoints[i];
        }

        int minWindow = current;

        for (int i = window; i < cardPoints.length; i++) {
            current += cardPoints[i];
            current -= cardPoints[i - window];

            minWindow = Math.min(minWindow, current);
        }

        return total - minWindow;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Longest Substring with At Most K Distinct Characters
topic: Sliding Window
difficulty: Hard
pattern: At Most K Distinct
link: https://takeuforward.org/data-structure/longest-substring-with-at-most-k-distinct-characters/

## Problem
Find the length of the longest substring containing at most `k` distinct characters.

## Core idea
Maintain a sliding window with a frequency map and shrink when distinct characters exceed `k`.

## Approach
1. Expand right pointer
2. Add current character to frequency map
3. If distinct count exceeds `k`, shrink from left
4. Remove characters whose frequency becomes zero
5. Track maximum window length

## Dry run
`s = "eceba", k = 2`

Longest valid substring = `"ece"`

Result: `3`

## Code
```java
import java.util.*;

class Solution {
    static int longestKDistinct(String s, int k) {
        HashMap<Character, Integer> map = new HashMap<>();

        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            map.put(ch, map.getOrDefault(ch, 0) + 1);

            while (map.size() > k) {
                char leftChar = s.charAt(left);

                map.put(leftChar, map.get(leftChar) - 1);

                if (map.get(leftChar) == 0) {
                    map.remove(leftChar);
                }

                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

**Time:** O(n) **Space:** O(k)

---

title: Subarray with k different integers
topic: Sliding Window
difficulty: Hard
pattern: Exactly K Distinct
link: https://leetcode.com/problems/subarrays-with-k-different-integers/

## Problem
Count subarrays containing exactly `k` distinct integers.

## Core idea
Use `exactly(k) = atMost(k) - atMost(k - 1)`.

## Approach
1. Create helper to count subarrays with at most `k` distinct values
2. Expand right pointer
3. Add values to frequency map
4. Shrink while map size exceeds `k`
5. Add current window length
6. Subtract atMost(k - 1)

## Dry run
`nums = [1,2,1,2,3], k = 2`

Valid subarrays count = `7`

## Code
```java
import java.util.*;

class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private int atMost(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();

        int left = 0;
        int count = 0;

        for (int right = 0; right < nums.length; right++) {
            map.put(
                nums[right],
                map.getOrDefault(nums[right], 0) + 1
            );

            while (map.size() > k) {
                int value = nums[left];

                map.put(value, map.get(value) - 1);

                if (map.get(value) == 0) {
                    map.remove(value);
                }

                left++;
            }

            count += right - left + 1;
        }

        return count;
    }
}
```

**Time:** O(n) **Space:** O(k)

---

title: Minimum Window Substring
topic: Sliding Window
difficulty: Hard
pattern: Minimum Valid Window
link: https://leetcode.com/problems/minimum-window-substring/

## Problem
Find the smallest substring of `s` containing all characters of `t` with correct frequencies.

## Core idea
Expand until all required characters are present, then shrink as much as possible.

## Approach
1. Store required frequencies from `t`
2. Expand right pointer
3. Decrease needed count when useful characters are found
4. When all required characters are present, shrink from left
5. Track the minimum valid window
6. Return the best substring

## Dry run
`s = "ADOBECODEBANC", t = "ABC"`

Smallest valid window:

`"BANC"`

## Code
```java
class Solution {
    public String minWindow(String s, String t) {
        if (t.length() > s.length()) return "";

        int[] freq = new int[128];

        for (char ch : t.toCharArray()) {
            freq[ch]++;
        }

        int left = 0;
        int need = t.length();

        int minLen = Integer.MAX_VALUE;
        int start = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            if (freq[ch] > 0) {
                need--;
            }

            freq[ch]--;

            while (need == 0) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    start = left;
                }

                char leftChar = s.charAt(left);

                freq[leftChar]++;

                if (freq[leftChar] > 0) {
                    need++;
                }

                left++;
            }
        }

        if (minLen == Integer.MAX_VALUE) {
            return "";
        }

        return s.substring(start, start + minLen);
    }
}
```

**Time:** O(n + m) **Space:** O(1)

---

title: Minimum Window Subsequence
topic: Sliding Window
difficulty: Hard
pattern: Forward Match + Backward Shrink
link: https://leetcode.com/problems/minimum-window-subsequence/

## Problem
Find the shortest substring of `s1` such that `s2` appears as a subsequence inside it.

## Core idea
Move forward until all characters of `s2` are matched, then move backward to shrink the window.

## Approach
1. Scan `s1` and try to match `s2`
2. When all of `s2` is matched, mark the window end
3. Move backward through `s1`
4. Match `s2` backward to find the smallest start
5. Save the best window
6. Continue searching after the found start

## Dry run
`s1 = "abcdebdde", s2 = "bde"`

Valid windows include:

`"bcde"`  
`"bdde"`

Minimum length = `4`

Result: `"bcde"`

## Code
```java
class Solution {
    public String minWindow(String s1, String s2) {
        int n = s1.length();
        int m = s2.length();

        int minLen = Integer.MAX_VALUE;
        int bestStart = -1;

        int i = 0;

        while (i < n) {
            int j = 0;

            while (i < n) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    j++;
                }

                if (j == m) break;

                i++;
            }

            if (j < m) break;

            int end = i;
            j = m - 1;

            while (j >= 0) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    j--;
                }

                i--;
            }

            i++;

            int len = end - i + 1;

            if (len < minLen) {
                minLen = len;
                bestStart = i;
            }

            i++;
        }

        if (bestStart == -1) return "";

        return s1.substring(bestStart, bestStart + minLen);
    }
}
```

**Time:** O(n × m) worst case **Space:** O(1)
