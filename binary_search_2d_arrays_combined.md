# Binary Search on 2D Arrays

---

title: Find the row with maximum number of 1s
topic: Binary Search
difficulty: Easy
pattern: Lower Bound in Each Row
link: https://takeuforward.org/arrays/find-the-row-with-maximum-number-of-1s/

## Problem
Given a binary matrix where each row is sorted, find the index of the row containing the maximum number of `1`s.

## Core idea
For every row, find the first occurrence of `1` using binary search. The number of `1`s is `columns - firstOneIndex`.

## Approach
1. Traverse each row
2. Use binary search to find the first `1`
3. Calculate the number of `1`s in that row
4. Keep track of the maximum count
5. Return the row index with the maximum number of `1`s

## Dry run
`matrix = [[0,0,1,1],[0,1,1,1],[0,0,0,1]]`

| row | first 1 index | number of 1s | action |
|---|---|---|---|
| 0 | 2 | 2 | max = 2 |
| 1 | 1 | 3 | update answer to row 1 |
| 2 | 3 | 1 | no change |

Result: `1`

## Code
```java
class Solution {
    static int rowWithMax1s(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        int maxCount = 0;
        int ansRow = -1;

        for (int i = 0; i < rows; i++) {
            int firstOne = lowerBound(matrix[i], 1);
            int count = cols - firstOne;

            if (count > maxCount) {
                maxCount = count;
                ansRow = i;
            }
        }

        return ansRow;
    }

    static int lowerBound(int[] row, int target) {
        int low = 0;
        int high = row.length - 1;
        int ans = row.length;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (row[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}
```

**Time:** O(n log m) **Space:** O(1)

---

title: Search in a 2D matrix
topic: Binary Search
difficulty: Medium
pattern: Flattened Binary Search
link: https://leetcode.com/problems/search-a-2d-matrix/

## Problem
Search for a target in a matrix where every row is sorted and the first element of each row is greater than the last element of the previous row.

## Core idea
Treat the matrix like one sorted 1D array and convert a virtual index into row and column positions.

## Approach
1. Treat the matrix as an array of size `rows * cols`
2. Apply normal binary search
3. Convert `mid` into `row = mid / cols`
4. Convert `mid` into `col = mid % cols`
5. Compare the matrix value with the target

## Dry run
`matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 16`

| low | mid | high | value | action |
|---|---|---|---|---|
| 0 | 5 | 11 | 11 | move right |
| 6 | 8 | 11 | 23 | move left |
| 6 | 6 | 7 | 16 | found |

Result: `true`

## Code
```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        int low = 0;
        int high = rows * cols - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int row = mid / cols;
            int col = mid % cols;

            int value = matrix[row][col];

            if (value == target) {
                return true;
            } else if (value < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return false;
    }
}
```

**Time:** O(log(n × m)) **Space:** O(1)

---

title: Search in a row and column wise sorted matrix
topic: Binary Search
difficulty: Medium
pattern: Staircase Search
link: https://leetcode.com/problems/search-a-2d-matrix-ii/

## Problem
Search for a target in a matrix where every row and every column is sorted in increasing order.

## Core idea
Start from the top-right corner. If the current value is too large, move left. If it is too small, move down.

## Approach
1. Start at the top-right element
2. If the value equals target, return true
3. If the value is greater than target, move left
4. If the value is smaller than target, move down
5. Stop if the indices go outside the matrix

## Dry run
`matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 6`

| row | col | value | action |
|---|---|---|---|
| 0 | 2 | 7 | move left |
| 0 | 1 | 4 | move down |
| 1 | 1 | 5 | move down |
| 2 | 1 | 6 | found |

Result: `true`

## Code
```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        int row = 0;
        int col = cols - 1;

        while (row < rows && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                col--;
            } else {
                row++;
            }
        }

        return false;
    }
}
```

**Time:** O(n + m) **Space:** O(1)

---

title: Find Peak Element (2D Matrix)
topic: Binary Search
difficulty: Hard
pattern: Binary Search on Columns
link: https://leetcode.com/problems/find-a-peak-element-ii/

## Problem
Find a position in a 2D matrix whose value is greater than its left, right, top, and bottom neighbors.

## Core idea
Binary search the columns. In each middle column, find the row containing the maximum element and compare it with its left and right neighbors.

## Approach
1. Binary search over columns
2. Find the maximum element in the middle column
3. Compare it with left and right neighbors
4. If it is greater than both, return its position
5. If the left neighbor is larger, search left
6. Otherwise search right

## Dry run
`matrix = [[1,4],[3,2]]`

| mid column | max row | value | left | right | action |
|---|---|---|---|---|---|
| 0 | 1 | 3 | -∞ | 2 | peak found |

Result: `[1,0]`

## Code
```java
class Solution {
    public int[] findPeakGrid(int[][] mat) {
        int rows = mat.length;
        int cols = mat[0].length;

        int low = 0;
        int high = cols - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int maxRow = findMaxRow(mat, mid);

            int left = mid - 1 >= 0
                    ? mat[maxRow][mid - 1]
                    : Integer.MIN_VALUE;

            int right = mid + 1 < cols
                    ? mat[maxRow][mid + 1]
                    : Integer.MIN_VALUE;

            if (mat[maxRow][mid] > left &&
                mat[maxRow][mid] > right) {
                return new int[]{maxRow, mid};
            }

            if (left > mat[maxRow][mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return new int[]{-1, -1};
    }

    private int findMaxRow(int[][] mat, int col) {
        int maxRow = 0;

        for (int row = 1; row < mat.length; row++) {
            if (mat[row][col] > mat[maxRow][col]) {
                maxRow = row;
            }
        }

        return maxRow;
    }
}
```

**Time:** O(n log m) **Space:** O(1)

---

title: Matrix Median
topic: Binary Search
difficulty: Hard
pattern: Binary Search on Answer
link: https://takeuforward.org/arrays/median-of-row-wise-sorted-matrix/

## Problem
Find the median of a row-wise sorted matrix with an odd total number of elements.

## Core idea
Binary search the value range instead of the matrix indices. For each candidate value, count how many matrix elements are less than or equal to it.

## Approach
1. Set `low` to the smallest first element
2. Set `high` to the largest last element
3. Find `mid`
4. Count elements `<= mid` using upper bound in every row
5. If count is less than or equal to half the elements, move right
6. Otherwise move left
7. Return `low`

## Dry run
`matrix = [[1,3,5],[2,6,9],[3,6,9]]`

Sorted values:

`[1,2,3,3,5,6,6,9,9]`

Median = `5`

| candidate | count <= candidate | action |
|---|---|---|
| 5 | 5 | move left |
| 3 | 4 | move right |
| 4 | 4 | move right |

Result: `5`

## Code
```java
class Solution {
    static int median(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        int low = Integer.MAX_VALUE;
        int high = Integer.MIN_VALUE;

        for (int i = 0; i < rows; i++) {
            low = Math.min(low, matrix[i][0]);
            high = Math.max(high, matrix[i][cols - 1]);
        }

        int required = (rows * cols) / 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int count = 0;

            for (int i = 0; i < rows; i++) {
                count += upperBound(matrix[i], mid);
            }

            if (count <= required) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return low;
    }

    private static int upperBound(int[] row, int target) {
        int low = 0;
        int high = row.length;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (row[mid] <= target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

**Time:** O(n log m × log(value range)) **Space:** O(1)
