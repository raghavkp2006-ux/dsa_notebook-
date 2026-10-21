# Recursion Problems

---

title: Recursive Implementation of atoi()
topic: Recursion
difficulty: Hard
pattern: Recursive String Parsing
link: https://leetcode.com/problems/string-to-integer-atoi/

## Problem
Convert a string into a 32-bit signed integer using recursion while handling spaces, signs, invalid characters, and overflow.

## Core idea
Process the string one character at a time recursively and build the number digit by digit.

## Approach
1. Skip leading spaces
2. Read the optional sign
3. Recursively process each digit
4. Stop when a non-digit appears
5. Clamp the answer if it exceeds integer range

## Dry run
`s = "   -42"`

| step | value |
|---|---|
| skip spaces | `-42` |
| sign | `-1` |
| read 4 | `4` |
| read 2 | `42` |
| result | `-42` |

## Code
```java
class Solution {
    public int myAtoi(String s) {
        int i = 0;

        while (i < s.length() && s.charAt(i) == ' ') {
            i++;
        }

        int sign = 1;

        if (i < s.length() && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            if (s.charAt(i) == '-') sign = -1;
            i++;
        }

        return solve(s, i, sign, 0);
    }

    private int solve(String s, int i, int sign, long num) {
        if (i == s.length() || !Character.isDigit(s.charAt(i))) {
            return (int) (sign * num);
        }

        num = num * 10 + (s.charAt(i) - '0');

        if (sign * num >= Integer.MAX_VALUE) {
            return Integer.MAX_VALUE;
        }

        if (sign * num <= Integer.MIN_VALUE) {
            return Integer.MIN_VALUE;
        }

        return solve(s, i + 1, sign, num);
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Pow(x, n)
topic: Recursion
difficulty: Medium
pattern: Binary Exponentiation
link: https://leetcode.com/problems/powx-n/

## Problem
Calculate `x^n` efficiently.

## Core idea
Use the fact that `x^n = (x²)^(n/2)` to reduce the exponent by half on every recursive call.

## Approach
1. Convert `n` to long
2. If `n` is negative, invert `x`
3. Recursively calculate half power
4. Square the half result
5. Multiply by `x` once more when `n` is odd

## Dry run
`x = 2, n = 10`

| call | result |
|---|---|
| 2¹⁰ | 4⁵ |
| 4⁵ | 16² × 4 |
| 16² | 256 |
| final | 1024 |

## Code
```java
class Solution {
    public double myPow(double x, int n) {
        long power = n;

        if (power < 0) {
            x = 1 / x;
            power = -power;
        }

        return solve(x, power);
    }

    private double solve(double x, long n) {
        if (n == 0) return 1.0;

        double half = solve(x, n / 2);

        if (n % 2 == 0) {
            return half * half;
        }

        return half * half * x;
    }
}
```

**Time:** O(log n) **Space:** O(log n)

---

title: Count Good numbers
topic: Recursion
difficulty: Easy
pattern: Fast Power
link: https://leetcode.com/problems/count-good-numbers/

## Problem
Count digit strings of length `n` where even indices contain even digits and odd indices contain prime digits.

## Core idea
There are `5` choices for each even index and `4` choices for each odd index.

## Approach
1. Count even positions as `(n + 1) / 2`
2. Count odd positions as `n / 2`
3. Compute `5^evenPositions`
4. Compute `4^oddPositions`
5. Multiply both modulo `1e9+7`

## Dry run
`n = 4`

| positions | choices |
|---|---|
| even indices | 2 positions → `5²` |
| odd indices | 2 positions → `4²` |

Result: `25 × 16 = 400`

## Code
```java
class Solution {
    static final long MOD = 1_000_000_007L;

    public int countGoodNumbers(long n) {
        long even = (n + 1) / 2;
        long odd = n / 2;

        long a = power(5, even);
        long b = power(4, odd);

        return (int) ((a * b) % MOD);
    }

    private long power(long base, long exp) {
        if (exp == 0) return 1;

        long half = power(base, exp / 2);
        long result = (half * half) % MOD;

        if (exp % 2 == 1) {
            result = (result * base) % MOD;
        }

        return result;
    }
}
```

**Time:** O(log n) **Space:** O(log n)

---

title: Sort a stack using recursion
topic: Recursion
difficulty: Medium
pattern: Recursive Insertion
link: https://takeuforward.org/recursion/sort-a-stack-using-recursion/

## Problem
Sort a stack using recursion without using another data structure.

## Core idea
Remove elements recursively, then insert each removed element back into its correct sorted position.

## Approach
1. Pop the top element
2. Recursively sort the remaining stack
3. Insert the popped element in sorted order
4. Keep moving larger elements when needed
5. Stop when stack becomes empty

## Dry run
`stack = [3,1,2]`

| step | stack |
|---|---|
| remove 2 | [3,1] |
| remove 1 | [3] |
| sort and insert | [1,2,3] |

## Code
```java
import java.util.*;

class Solution {
    static void sortStack(Stack<Integer> stack) {
        if (stack.isEmpty()) return;

        int top = stack.pop();

        sortStack(stack);

        insertSorted(stack, top);
    }

    private static void insertSorted(Stack<Integer> stack, int value) {
        if (stack.isEmpty() || stack.peek() <= value) {
            stack.push(value);
            return;
        }

        int top = stack.pop();

        insertSorted(stack, value);

        stack.push(top);
    }
}
```

**Time:** O(n²) **Space:** O(n)

---

title: Reverse a stack using recursion
topic: Recursion
difficulty: Easy
pattern: Recursive Bottom Insertion
link: https://takeuforward.org/recursion/reverse-a-stack-using-recursion/

## Problem
Reverse a stack using recursion without another stack.

## Core idea
Pop every element recursively and insert each removed element at the bottom.

## Approach
1. Pop the top element
2. Recursively reverse the remaining stack
3. Insert the removed element at the bottom
4. Repeat until all elements are restored

## Dry run
`stack = [1,2,3]`, top = `3`

| step | stack |
|---|---|
| remove all | [] |
| insert 1 bottom | [1] |
| insert 2 bottom | [2,1] |
| insert 3 bottom | [3,2,1] |

## Code
```java
import java.util.*;

class Solution {
    static void reverse(Stack<Integer> stack) {
        if (stack.isEmpty()) return;

        int top = stack.pop();

        reverse(stack);

        insertBottom(stack, top);
    }

    private static void insertBottom(Stack<Integer> stack, int value) {
        if (stack.isEmpty()) {
            stack.push(value);
            return;
        }

        int top = stack.pop();

        insertBottom(stack, value);

        stack.push(top);
    }
}
```

**Time:** O(n²) **Space:** O(n)

---

title: Generate all binary strings
topic: Recursion
difficulty: Medium
pattern: Backtracking
link: https://takeuforward.org/recursion/generate-all-binary-strings/

## Problem
Generate all binary strings of length `n` without consecutive `1`s.

## Core idea
At every position, `0` can always be placed, but `1` can only be placed if the previous character was not `1`.

## Approach
1. Start with an empty string
2. Always try adding `0`
3. Add `1` only if previous character is not `1`
4. Recurse until length becomes `n`
5. Store every valid string

## Dry run
`n = 3`

Valid strings:

`000, 001, 010, 100, 101`

## Code
```java
import java.util.*;

class Solution {
    static List<String> generateBinaryStrings(int n) {
        List<String> result = new ArrayList<>();

        backtrack(n, "", '0', result);

        return result;
    }

    private static void backtrack(
        int n,
        String current,
        char previous,
        List<String> result
    ) {
        if (current.length() == n) {
            result.add(current);
            return;
        }

        backtrack(n, current + "0", '0', result);

        if (current.isEmpty() || previous != '1') {
            backtrack(n, current + "1", '1', result);
        }
    }
}
```

**Time:** O(2^n) **Space:** O(n)

---

title: Generate Parenthesis
topic: Recursion
difficulty: Medium
pattern: Backtracking
link: https://leetcode.com/problems/generate-parentheses/

## Problem
Generate all valid combinations of `n` pairs of parentheses.

## Core idea
Add `'('` while open brackets are available and add `')'` only when there are more open than closed brackets.

## Approach
1. Track count of open brackets
2. Track count of closed brackets
3. Add `'('` if open count is less than `n`
4. Add `')'` if closed count is less than open count
5. Store string when length becomes `2n`

## Dry run
`n = 3`

Examples:

`((()))`  
`(()())`  
`(())()`  
`()(())`  
`()()()`

## Code
```java
import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();

        solve(n, 0, 0, new StringBuilder(), result);

        return result;
    }

    private void solve(
        int n,
        int open,
        int close,
        StringBuilder current,
        List<String> result
    ) {
        if (current.length() == 2 * n) {
            result.add(current.toString());
            return;
        }

        if (open < n) {
            current.append('(');
            solve(n, open + 1, close, current, result);
            current.deleteCharAt(current.length() - 1);
        }

        if (close < open) {
            current.append(')');
            solve(n, open, close + 1, current, result);
            current.deleteCharAt(current.length() - 1);
        }
    }
}
```

**Time:** O(4^n / √n) **Space:** O(n)

---

title: Print all subsequences/Power Set
topic: Recursion
difficulty: Medium
pattern: Pick / Not Pick
link: https://leetcode.com/problems/subsets/

## Problem
Generate all subsequences or subsets of an array.

## Core idea
For every element, make two choices: include it or exclude it.

## Approach
1. Start at index `0`
2. Pick the current element and recurse
3. Remove it
4. Do not pick the current element and recurse
5. When index reaches `n`, store the current subset

## Dry run
`nums = [1,2]`

| choice | subset |
|---|---|
| pick 1, pick 2 | [1,2] |
| pick 1, skip 2 | [1] |
| skip 1, pick 2 | [2] |
| skip both | [] |

## Code
```java
import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();

        solve(0, nums, new ArrayList<>(), result);

        return result;
    }

    private void solve(
        int index,
        int[] nums,
        List<Integer> current,
        List<List<Integer>> result
    ) {
        if (index == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }

        current.add(nums[index]);
        solve(index + 1, nums, current, result);

        current.remove(current.size() - 1);
        solve(index + 1, nums, current, result);
    }
}
```

**Time:** O(2^n × n) **Space:** O(n)

---

title: Learn All Patterns of Subsequences (Theory)
topic: Recursion
difficulty: Medium
pattern: Pick / Not Pick
link: https://takeuforward.org/recursion/subsequence-patterns/

## Problem
Understand the common recursion patterns used for subsequence problems.

## Core idea
Most subsequence problems use the same decision tree: pick an element or do not pick it.

## Approach
1. Use an index to move through the array
2. Pick the current element
3. Recurse
4. Backtrack and remove it
5. Recurse without picking it
6. Change the base case depending on whether you need to print, count, or find one answer

## Dry run
For `[1,2]` the recursion tree is:

`[] → [1] → [1,2]`  
`[] → [1] → [1]`  
`[] → [2]`  
`[]`

## Code
```java
import java.util.*;

class Solution {
    static void subsequences(
        int index,
        int[] arr,
        List<Integer> current
    ) {
        if (index == arr.length) {
            System.out.println(current);
            return;
        }

        current.add(arr[index]);
        subsequences(index + 1, arr, current);

        current.remove(current.size() - 1);

        subsequences(index + 1, arr, current);
    }
}
```

**Time:** O(2^n) **Space:** O(n)

---

title: Count all subsequences with sum K
topic: Recursion
difficulty: Hard
pattern: Pick / Not Pick
link: https://takeuforward.org/recursion/count-subsequences-with-sum-k/

## Problem
Count how many subsequences have sum exactly equal to `k`.

## Core idea
For every element, count valid subsequences from both choices: pick and not pick.

## Approach
1. Pass index and current sum
2. Pick the element and recurse
3. Do not pick the element and recurse
4. At the end, return `1` if sum equals `k`
5. Add counts from both branches

## Dry run
`arr = [1,2,1], k = 2`

Valid subsequences:

`[1,1]`  
`[2]`

Result: `2`

## Code
```java
class Solution {
    static int countSubsequences(int[] arr, int k) {
        return solve(0, 0, arr, k);
    }

    private static int solve(int index, int sum, int[] arr, int k) {
        if (index == arr.length) {
            return sum == k ? 1 : 0;
        }

        int pick = solve(index + 1, sum + arr[index], arr, k);

        int notPick = solve(index + 1, sum, arr, k);

        return pick + notPick;
    }
}
```

**Time:** O(2^n) **Space:** O(n)

---

title: Check if there exists a subsequence with sum K
topic: Recursion
difficulty: Medium
pattern: Pick / Not Pick
link: https://takeuforward.org/recursion/check-if-there-exists-a-subsequence-with-sum-k/

## Problem
Check whether at least one subsequence has sum exactly equal to `k`.

## Core idea
Return true as soon as either the pick branch or not-pick branch produces the target sum.

## Approach
1. Pass index and current sum
2. Try picking current element
3. If it succeeds, return true
4. Otherwise try not picking it
5. At the end, check whether sum equals `k`

## Dry run
`arr = [1,2,3], k = 5`

Subsequence `[2,3]` gives sum `5`.

Result: `true`

## Code
```java
class Solution {
    static boolean exists(int[] arr, int k) {
        return solve(0, 0, arr, k);
    }

    private static boolean solve(int index, int sum, int[] arr, int k) {
        if (index == arr.length) {
            return sum == k;
        }

        if (solve(index + 1, sum + arr[index], arr, k)) {
            return true;
        }

        return solve(index + 1, sum, arr, k);
    }
}
```

**Time:** O(2^n) **Space:** O(n)

---

title: Combination Sum
topic: Recursion
difficulty: Medium
pattern: Backtracking with Reuse
link: https://leetcode.com/problems/combination-sum/

## Problem
Find all unique combinations whose sum equals target. Each number may be used unlimited times.

## Core idea
When an element is picked, stay at the same index so it can be chosen again.

## Approach
1. Start from index `0`
2. If current value is not greater than target, pick it
3. Recurse using the same index
4. Backtrack
5. Skip the current value and move to next index
6. Store combination when target becomes `0`

## Dry run
`candidates = [2,3,6,7], target = 7`

Valid combinations:

`[2,2,3]`  
`[7]`

## Code
```java
import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();

        solve(0, target, candidates, new ArrayList<>(), result);

        return result;
    }

    private void solve(
        int index,
        int target,
        int[] candidates,
        List<Integer> current,
        List<List<Integer>> result
    ) {
        if (target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        if (index == candidates.length) return;

        if (candidates[index] <= target) {
            current.add(candidates[index]);

            solve(index, target - candidates[index],
                  candidates, current, result);

            current.remove(current.size() - 1);
        }

        solve(index + 1, target, candidates, current, result);
    }
}
```

**Time:** Exponential **Space:** O(target/minValue)

---

title: Combination Sum-II
topic: Recursion
difficulty: Medium
pattern: Backtracking + Duplicate Skipping
link: https://leetcode.com/problems/combination-sum-ii/

## Problem
Find unique combinations that sum to target when every array element can be used only once.

## Core idea
Sort the array and skip duplicate values at the same recursion level.

## Approach
1. Sort the candidates
2. Loop from the current index
3. Skip duplicates at the same level
4. Stop if value exceeds target
5. Pick current value and recurse from `i + 1`
6. Backtrack after every call

## Dry run
`[10,1,2,7,6,1,5], target = 8`

Valid combinations include:

`[1,1,6]`  
`[1,2,5]`  
`[1,7]`  
`[2,6]`

## Code
```java
import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);

        List<List<Integer>> result = new ArrayList<>();

        solve(0, target, candidates, new ArrayList<>(), result);

        return result;
    }

    private void solve(
        int start,
        int target,
        int[] arr,
        List<Integer> current,
        List<List<Integer>> result
    ) {
        if (target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i < arr.length; i++) {
            if (i > start && arr[i] == arr[i - 1]) continue;
            if (arr[i] > target) break;

            current.add(arr[i]);

            solve(i + 1, target - arr[i], arr, current, result);

            current.remove(current.size() - 1);
        }
    }
}
```

**Time:** O(2^n) **Space:** O(n)

---

title: Subset Sum-I
topic: Recursion
difficulty: Medium
pattern: Pick / Not Pick
link: https://takeuforward.org/data-structure/subset-sum-sum-of-all-subsets/

## Problem
Generate the sum of every possible subset.

## Core idea
For every element, either add it to the current sum or skip it.

## Approach
1. Start from index `0` and sum `0`
2. Pick the current element
3. Recurse with updated sum
4. Do not pick the element
5. Recurse with unchanged sum
6. Store sum when index reaches the end

## Dry run
`arr = [1,2]`

Subset sums:

`0, 1, 2, 3`

## Code
```java
import java.util.*;

class Solution {
    static List<Integer> subsetSums(int[] arr) {
        List<Integer> result = new ArrayList<>();

        solve(0, 0, arr, result);

        return result;
    }

    private static void solve(
        int index,
        int sum,
        int[] arr,
        List<Integer> result
    ) {
        if (index == arr.length) {
            result.add(sum);
            return;
        }

        solve(index + 1, sum + arr[index], arr, result);
        solve(index + 1, sum, arr, result);
    }
}
```

**Time:** O(2^n) **Space:** O(n)

---

title: Subset Sum-II
topic: Recursion
difficulty: Medium
pattern: Backtracking + Duplicate Skipping
link: https://leetcode.com/problems/subsets-ii/

## Problem
Generate all unique subsets from an array that may contain duplicates.

## Core idea
Sort the array and skip equal values when they appear at the same recursion level.

## Approach
1. Sort the array
2. Add current subset to the answer
3. Loop from the current index
4. Skip duplicates at the same level
5. Pick an element and recurse
6. Backtrack after the recursive call

## Dry run
`nums = [1,2,2]`

Unique subsets:

`[]`  
`[1]`  
`[2]`  
`[1,2]`  
`[2,2]`  
`[1,2,2]`

## Code
```java
import java.util.*;

class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);

        List<List<Integer>> result = new ArrayList<>();

        solve(0, nums, new ArrayList<>(), result);

        return result;
    }

    private void solve(
        int start,
        int[] nums,
        List<Integer> current,
        List<List<Integer>> result
    ) {
        result.add(new ArrayList<>(current));

        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;

            current.add(nums[i]);

            solve(i + 1, nums, current, result);

            current.remove(current.size() - 1);
        }
    }
}
```

**Time:** O(2^n × n) **Space:** O(n)

---

title: Combination Sum - III
topic: Recursion
difficulty: Hard
pattern: Backtracking
link: https://leetcode.com/problems/combination-sum-iii/

## Problem
Find combinations of exactly `k` distinct numbers from `1` to `9` whose sum equals `n`.

## Core idea
Try numbers in increasing order so each number is used at most once.

## Approach
1. Start with number `1`
2. Try each number from current start to `9`
3. Add it to the combination
4. Recurse with smaller target
5. Store when target becomes `0` and size is `k`
6. Backtrack

## Dry run
`k = 3, n = 7`

Valid combination:

`[1,2,4]`

## Code
```java
import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> result = new ArrayList<>();

        solve(1, k, n, new ArrayList<>(), result);

        return result;
    }

    private void solve(
        int start,
        int k,
        int target,
        List<Integer> current,
        List<List<Integer>> result
    ) {
        if (target == 0 && current.size() == k) {
            result.add(new ArrayList<>(current));
            return;
        }

        if (current.size() >= k || target < 0) return;

        for (int i = start; i <= 9; i++) {
            current.add(i);

            solve(i + 1, k, target - i, current, result);

            current.remove(current.size() - 1);
        }
    }
}
```

**Time:** O(C(9,k)) **Space:** O(k)

---

title: Letter Combinations of a Phone number
topic: Recursion
difficulty: Medium
pattern: Backtracking
link: https://leetcode.com/problems/letter-combinations-of-a-phone-number/

## Problem
Return all possible letter combinations represented by a string of phone digits.

## Core idea
Each digit gives a set of possible letters. Pick one letter for the current digit and recurse to the next digit.

## Approach
1. Map each digit to its letters
2. Start from the first digit
3. Try every possible letter
4. Add the letter and recurse
5. Remove it during backtracking
6. Store string after processing all digits

## Dry run
`digits = "23"`

`2 → abc`  
`3 → def`

Results:

`ad, ae, af, bd, be, bf, cd, ce, cf`

## Code
```java
import java.util.*;

class Solution {
    private final String[] map = {
        "", "", "abc", "def", "ghi",
        "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();

        if (digits.isEmpty()) return result;

        solve(0, digits, new StringBuilder(), result);

        return result;
    }

    private void solve(
        int index,
        String digits,
        StringBuilder current,
        List<String> result
    ) {
        if (index == digits.length()) {
            result.add(current.toString());
            return;
        }

        String letters = map[digits.charAt(index) - '0'];

        for (char ch : letters.toCharArray()) {
            current.append(ch);

            solve(index + 1, digits, current, result);

            current.deleteCharAt(current.length() - 1);
        }
    }
}
```

**Time:** O(4^n) **Space:** O(n)

---

title: Palindrome Partitioning
topic: Recursion
difficulty: Medium
pattern: Backtracking
link: https://leetcode.com/problems/palindrome-partitioning/

## Problem
Partition a string so every substring in the partition is a palindrome.

## Core idea
Try every possible substring starting from the current index and recurse only when it is a palindrome.

## Approach
1. Start from index `0`
2. Try every ending index
3. Check whether the substring is palindrome
4. Add it to current partition
5. Recurse from the next index
6. Backtrack after each call

## Dry run
`s = "aab"`

Valid partitions:

`["a","a","b"]`  
`["aa","b"]`

## Code
```java
import java.util.*;

class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();

        solve(0, s, new ArrayList<>(), result);

        return result;
    }

    private void solve(
        int index,
        String s,
        List<String> current,
        List<List<String>> result
    ) {
        if (index == s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int end = index; end < s.length(); end++) {
            if (isPalindrome(s, index, end)) {
                current.add(s.substring(index, end + 1));

                solve(end + 1, s, current, result);

                current.remove(current.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) {
                return false;
            }
        }

        return true;
    }
}
```

**Time:** O(2^n × n) **Space:** O(n)

---

title: Word Search
topic: Recursion
difficulty: Medium
pattern: Grid Backtracking
link: https://leetcode.com/problems/word-search/

## Problem
Check whether a word exists in a character grid using adjacent cells.

## Core idea
From every possible starting cell, recursively explore four directions while marking visited cells.

## Approach
1. Try every grid cell as a starting point
2. Check whether current character matches
3. Mark the cell temporarily visited
4. Explore up, down, left, and right
5. Restore the cell during backtracking
6. Return true if the complete word is matched

## Dry run
Board:

`A B C E`  
`S F C S`  
`A D E E`

Word = `"ABCCED"`

Path exists → `true`

## Code
```java
class Solution {
    public boolean exist(char[][] board, String word) {
        for (int r = 0; r < board.length; r++) {
            for (int c = 0; c < board[0].length; c++) {
                if (solve(board, word, r, c, 0)) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean solve(
        char[][] board,
        String word,
        int r,
        int c,
        int index
    ) {
        if (index == word.length()) return true;

        if (r < 0 || c < 0 ||
            r >= board.length || c >= board[0].length ||
            board[r][c] != word.charAt(index)) {
            return false;
        }

        char temp = board[r][c];
        board[r][c] = '#';

        boolean found =
            solve(board, word, r + 1, c, index + 1) ||
            solve(board, word, r - 1, c, index + 1) ||
            solve(board, word, r, c + 1, index + 1) ||
            solve(board, word, r, c - 1, index + 1);

        board[r][c] = temp;

        return found;
    }
}
```

**Time:** O(m × n × 4^L) **Space:** O(L)

---

title: N Queen
topic: Recursion
difficulty: Hard
pattern: Backtracking
link: https://leetcode.com/problems/n-queens/

## Problem
Place `n` queens on an `n × n` chessboard so no two queens attack each other.

## Core idea
Place one queen per row and track which columns and diagonals are already occupied.

## Approach
1. Start from row `0`
2. Try every column
3. Check column and both diagonals
4. Place queen if safe
5. Recurse to next row
6. Remove queen during backtracking

## Dry run
`n = 4`

One valid board:

`.Q..`  
`...Q`  
`Q...`  
`..Q.`

## Code
```java
import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();

        char[][] board = new char[n][n];

        for (char[] row : board) {
            Arrays.fill(row, '.');
        }

        boolean[] col = new boolean[n];
        boolean[] diag1 = new boolean[2 * n - 1];
        boolean[] diag2 = new boolean[2 * n - 1];

        solve(0, n, board, col, diag1, diag2, result);

        return result;
    }

    private void solve(
        int row,
        int n,
        char[][] board,
        boolean[] col,
        boolean[] diag1,
        boolean[] diag2,
        List<List<String>> result
    ) {
        if (row == n) {
            List<String> current = new ArrayList<>();

            for (char[] r : board) {
                current.add(new String(r));
            }

            result.add(current);
            return;
        }

        for (int c = 0; c < n; c++) {
            int d1 = row - c + n - 1;
            int d2 = row + c;

            if (col[c] || diag1[d1] || diag2[d2]) continue;

            board[row][c] = 'Q';
            col[c] = diag1[d1] = diag2[d2] = true;

            solve(row + 1, n, board, col, diag1, diag2, result);

            board[row][c] = '.';
            col[c] = diag1[d1] = diag2[d2] = false;
        }
    }
}
```

**Time:** O(n!) **Space:** O(n²)

---

title: Rat in a Maze
topic: Recursion
difficulty: Hard
pattern: Grid Backtracking
link: https://takeuforward.org/data-structure/rat-in-a-maze/

## Problem
Find all paths from the top-left cell to the bottom-right cell in a binary maze.

## Core idea
Explore every valid direction while marking cells visited so the same cell is not reused in one path.

## Approach
1. Start from `(0,0)`
2. Mark current cell visited
3. Try directions D, L, R, U
4. Move only to valid unvisited cells containing `1`
5. Add path when destination is reached
6. Unmark the cell during backtracking

## Dry run
For a valid maze, possible paths may be:

`DDRDRR`  
`DRDDRR`

## Code
```java
import java.util.*;

class Solution {
    static List<String> findPath(int[][] maze) {
        List<String> result = new ArrayList<>();

        int n = maze.length;

        if (maze[0][0] == 0) return result;

        boolean[][] visited = new boolean[n][n];

        solve(0, 0, maze, visited, "", result);

        return result;
    }

    private static void solve(
        int r,
        int c,
        int[][] maze,
        boolean[][] visited,
        String path,
        List<String> result
    ) {
        int n = maze.length;

        if (r == n - 1 && c == n - 1) {
            result.add(path);
            return;
        }

        visited[r][c] = true;

        int[] dr = {1, 0, 0, -1};
        int[] dc = {0, -1, 1, 0};
        char[] move = {'D', 'L', 'R', 'U'};

        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];

            if (nr >= 0 && nc >= 0 &&
                nr < n && nc < n &&
                maze[nr][nc] == 1 &&
                !visited[nr][nc]) {

                solve(nr, nc, maze, visited,
                      path + move[i], result);
            }
        }

        visited[r][c] = false;
    }
}
```

**Time:** O(4^(n²)) worst case **Space:** O(n²)

---

title: Word Break
topic: Recursion
difficulty: Easy
pattern: Recursion + Memoization
link: https://leetcode.com/problems/word-break/

## Problem
Check whether a string can be segmented into words from a dictionary.

## Core idea
Try every possible prefix. If a prefix is present in the dictionary, recursively solve the remaining suffix.

## Approach
1. Start from index `0`
2. Try every possible ending index
3. Check whether the prefix is in dictionary
4. Recurse from next index
5. Use memoization to avoid solving the same index repeatedly

## Dry run
`s = "leetcode"`

Dictionary:

`["leet","code"]`

Split:

`"leet" + "code"`

Result: `true`

## Code
```java
import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        HashSet<String> set = new HashSet<>(wordDict);
        Boolean[] memo = new Boolean[s.length()];

        return solve(0, s, set, memo);
    }

    private boolean solve(
        int start,
        String s,
        HashSet<String> set,
        Boolean[] memo
    ) {
        if (start == s.length()) return true;

        if (memo[start] != null) return memo[start];

        for (int end = start + 1; end <= s.length(); end++) {
            String word = s.substring(start, end);

            if (set.contains(word) &&
                solve(end, s, set, memo)) {
                return memo[start] = true;
            }
        }

        return memo[start] = false;
    }
}
```

**Time:** O(n³) **Space:** O(n)

---

title: M Coloring Problem
topic: Recursion
difficulty: Hard
pattern: Graph Backtracking
link: https://takeuforward.org/data-structure/m-coloring-problem/

## Problem
Check whether a graph can be colored using at most `m` colors so adjacent vertices have different colors.

## Core idea
Assign colors one node at a time and backtrack whenever a color conflicts with a neighbor.

## Approach
1. Start with node `0`
2. Try every color from `1` to `m`
3. Check whether the color is safe
4. Assign it and recurse to next node
5. Remove color if it fails
6. Return true if all nodes are colored

## Dry run
For a triangle graph and `m = 3`:

Node 0 → color 1  
Node 1 → color 2  
Node 2 → color 3

Result: `true`

## Code
```java
class Solution {
    static boolean graphColoring(int[][] graph, int m) {
        int[] color = new int[graph.length];

        return solve(0, graph, m, color);
    }

    private static boolean solve(
        int node,
        int[][] graph,
        int m,
        int[] color
    ) {
        if (node == graph.length) return true;

        for (int c = 1; c <= m; c++) {
            if (isSafe(node, c, graph, color)) {
                color[node] = c;

                if (solve(node + 1, graph, m, color)) {
                    return true;
                }

                color[node] = 0;
            }
        }

        return false;
    }

    private static boolean isSafe(
        int node,
        int c,
        int[][] graph,
        int[] color
    ) {
        for (int i = 0; i < graph.length; i++) {
            if (graph[node][i] == 1 && color[i] == c) {
                return false;
            }
        }

        return true;
    }
}
```

**Time:** O(m^n) **Space:** O(n)

---

title: Sudoku Solver
topic: Recursion
difficulty: Hard
pattern: Backtracking
link: https://leetcode.com/problems/sudoku-solver/

## Problem
Fill a `9 × 9` Sudoku board so every row, column, and `3 × 3` box contains digits `1` to `9` exactly once.

## Core idea
Find an empty cell, try every valid digit, and backtrack if the choice leads to no solution.

## Approach
1. Find the next empty cell
2. Try digits `1` to `9`
3. Check row, column, and box validity
4. Place a valid digit
5. Recurse
6. Reset the cell if the choice fails

## Dry run
For an empty cell:

Try `1` → invalid  
Try `2` → valid  
Place `2` and continue recursively.

## Code
```java
class Solution {
    public void solveSudoku(char[][] board) {
        solve(board);
    }

    private boolean solve(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char ch = '1'; ch <= '9'; ch++) {
                        if (isValid(board, r, c, ch)) {
                            board[r][c] = ch;

                            if (solve(board)) return true;

                            board[r][c] = '.';
                        }
                    }

                    return false;
                }
            }
        }

        return true;
    }

    private boolean isValid(
        char[][] board,
        int row,
        int col,
        char ch
    ) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == ch) return false;
            if (board[i][col] == ch) return false;

            int r = 3 * (row / 3) + i / 3;
            int c = 3 * (col / 3) + i % 3;

            if (board[r][c] == ch) return false;
        }

        return true;
    }
}
```

**Time:** O(9^E) worst case **Space:** O(E)

---

title: Expression Add Operators
topic: Recursion
difficulty: Hard
pattern: Backtracking
link: https://leetcode.com/problems/expression-add-operators/

## Problem
Insert `+`, `-`, and `*` between digits so the expression evaluates to a target.

## Core idea
Build the expression recursively while tracking the current value and the previous operand to correctly handle multiplication precedence.

## Approach
1. Try every possible numeric substring
2. Use the first number without an operator
3. Recurse with `+`
4. Recurse with `-`
5. Recurse with `*`
6. For multiplication, undo the previous operand and replace it with multiplied value
7. Store expression when the complete string reaches target

## Dry run
`num = "123", target = 6`

Valid expressions:

`"1+2+3"`  
`"1*2*3"`

## Code
```java
import java.util.*;

class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> result = new ArrayList<>();

        solve(num, target, 0, 0, 0, "", result);

        return result;
    }

    private void solve(
        String num,
        long target,
        int index,
        long value,
        long previous,
        String expression,
        List<String> result
    ) {
        if (index == num.length()) {
            if (value == target) {
                result.add(expression);
            }
            return;
        }

        for (int i = index; i < num.length(); i++) {
            if (i > index && num.charAt(index) == '0') break;

            long current = Long.parseLong(
                num.substring(index, i + 1)
            );

            if (index == 0) {
                solve(num, target, i + 1,
                      current, current,
                      String.valueOf(current), result);
            } else {
                solve(num, target, i + 1,
                      value + current, current,
                      expression + "+" + current, result);

                solve(num, target, i + 1,
                      value - current, -current,
                      expression + "-" + current, result);

                solve(num, target, i + 1,
                      value - previous + previous * current,
                      previous * current,
                      expression + "*" + current, result);
            }
        }
    }
}
```

**Time:** O(4^n) **Space:** O(n)
