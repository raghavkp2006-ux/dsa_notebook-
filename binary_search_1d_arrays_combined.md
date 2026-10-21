# Binary Search on 1D Arrays

---

title: Binary Search to find X in sorted array
topic: Binary Search
difficulty: Easy
pattern: Classic Binary Search
link: https://leetcode.com/problems/binary-search/

## Problem
Given a sorted array and a target `x`, return the index of `x`. If it does not exist, return `-1`.

## Core idea
Compare the target with the middle element and discard half of the search space after every step.

## Approach
1. Set `low = 0` and `high = n - 1`
2. Find `mid`
3. If `arr[mid] == x`, return `mid`
4. If `arr[mid] < x`, search the right half
5. Otherwise search the left half

## Dry run
`arr = [1,3,5,7,9], x = 7`

| low | mid | high | arr[mid] | action |
|---|---|---|---|---|
| 0 | 2 | 4 | 5 | move low to 3 |
| 3 | 3 | 4 | 7 | found → 3 |

## Code
```java
class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Implement Lower Bound
topic: Binary Search
difficulty: Easy
pattern: Lower Bound
link: https://takeuforward.org/arrays/implement-lower-bound-bs-2/

## Problem
Find the first index where the value is greater than or equal to `x`.

## Core idea
Whenever `arr[mid] >= x`, store `mid` as a possible answer and continue searching on the left.

## Approach
1. Set `low = 0`, `high = n - 1`, `ans = n`
2. Find `mid`
3. If `arr[mid] >= x`, store `mid` and move left
4. Otherwise move right
5. Return `ans`

## Dry run
`arr = [1,2,4,4,7], x = 4`

| low | mid | high | arr[mid] | action |
|---|---|---|---|---|
| 0 | 2 | 4 | 4 | ans = 2, move left |
| 0 | 0 | 1 | 1 | move right |
| 1 | 1 | 1 | 2 | move right |

Result: `2`

## Code
```java
class Solution {
    static int lowerBound(int[] arr, int x) {
        int low = 0;
        int high = arr.length - 1;
        int ans = arr.length;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] >= x) {
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

**Time:** O(log n) **Space:** O(1)

---

title: Implement Upper Bound
topic: Binary Search
difficulty: Easy
pattern: Upper Bound
link: https://takeuforward.org/arrays/implement-upper-bound/

## Problem
Find the first index where the value is strictly greater than `x`.

## Core idea
Whenever `arr[mid] > x`, store that index and continue searching on the left.

## Approach
1. Set `low = 0`, `high = n - 1`, `ans = n`
2. Find `mid`
3. If `arr[mid] > x`, store `mid`
4. Move left to find an earlier valid position
5. Otherwise move right

## Dry run
`arr = [1,2,4,4,7], x = 4`

| low | mid | high | arr[mid] | action |
|---|---|---|---|---|
| 0 | 2 | 4 | 4 | move right |
| 3 | 3 | 4 | 4 | move right |
| 4 | 4 | 4 | 7 | ans = 4 |

Result: `4`

## Code
```java
class Solution {
    static int upperBound(int[] arr, int x) {
        int low = 0;
        int high = arr.length - 1;
        int ans = arr.length;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] > x) {
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

**Time:** O(log n) **Space:** O(1)

---

title: Search Insert Position
topic: Binary Search
difficulty: Easy
pattern: Lower Bound
link: https://leetcode.com/problems/search-insert-position/

## Problem
Return the index of the target if found. Otherwise return the index where it should be inserted to keep the array sorted.

## Core idea
The answer is exactly the lower bound of the target.

## Approach
1. Search for the first element greater than or equal to target
2. Store its index as a possible answer
3. Move left when a valid position is found
4. Move right otherwise
5. Return the answer

## Dry run
`nums = [1,3,5,6], target = 2`

| low | mid | high | nums[mid] | action |
|---|---|---|---|---|
| 0 | 1 | 3 | 3 | ans = 1, move left |
| 0 | 0 | 0 | 1 | move right |

Result: `1`

## Code
```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        int ans = nums.length;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] >= target) {
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

**Time:** O(log n) **Space:** O(1)

---

title: Floor/Ceil in Sorted Array
topic: Binary Search
difficulty: Medium
pattern: Floor and Ceil
link: https://takeuforward.org/arrays/floor-and-ceil-in-sorted-array/

## Problem
Find the floor and ceil of `x` in a sorted array.

## Core idea
Floor is the greatest value `<= x`, while ceil is the smallest value `>= x`.

## Approach
1. Use binary search for floor
2. If `arr[mid] <= x`, store it and move right
3. Use binary search for ceil
4. If `arr[mid] >= x`, store it and move left
5. Return both values

## Dry run
`arr = [3,4,4,7,8,10], x = 5`

| value | result |
|---|---|
| floor | 4 |
| ceil | 7 |

## Code
```java
class Solution {
    static int[] getFloorAndCeil(int[] arr, int x) {
        int floor = -1;
        int ceil = -1;

        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] <= x) {
                floor = arr[mid];
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        low = 0;
        high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] >= x) {
                ceil = arr[mid];
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return new int[]{floor, ceil};
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Find the first or last occurrence of a given number in a sorted array
topic: Binary Search
difficulty: Easy
pattern: Modified Binary Search
link: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

## Problem
Find the first and last index of a target in a sorted array.

## Core idea
Run binary search twice: once biased to the left for the first occurrence and once biased to the right for the last occurrence.

## Approach
1. Search for the target
2. When found, store the index
3. For first occurrence, continue left
4. For last occurrence, continue right
5. Return both indices

## Dry run
`nums = [5,7,7,8,8,10], target = 8`

| search | result |
|---|---|
| first occurrence | 3 |
| last occurrence | 4 |

## Code
```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{
            firstOccurrence(nums, target),
            lastOccurrence(nums, target)
        };
    }

    private int firstOccurrence(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                ans = mid;
                high = mid - 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }

    private int lastOccurrence(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                ans = mid;
                low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Count occurrences of a number in a sorted array with duplicates
topic: Binary Search
difficulty: Easy
pattern: First and Last Occurrence
link: https://takeuforward.org/data-structure/count-occurrences-in-sorted-array/

## Problem
Count how many times a target appears in a sorted array.

## Core idea
Find the first and last occurrence, then use `last - first + 1`.

## Approach
1. Find the first occurrence of target
2. If not found, return 0
3. Find the last occurrence
4. Calculate `last - first + 1`
5. Return the count

## Dry run
`arr = [1,2,2,2,3,4], target = 2`

| value | result |
|---|---|
| first | 1 |
| last | 3 |
| count | 3 |

## Code
```java
class Solution {
    static int countOccurrences(int[] arr, int target) {
        int first = firstOccurrence(arr, target);

        if (first == -1) return 0;

        int last = lastOccurrence(arr, target);

        return last - first + 1;
    }

    static int firstOccurrence(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                ans = mid;
                high = mid - 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }

    static int lastOccurrence(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                ans = mid;
                low = mid + 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Search in Rotated Sorted Array I
topic: Binary Search
difficulty: Medium
pattern: Rotated Binary Search
link: https://leetcode.com/problems/search-in-rotated-sorted-array/

## Problem
Search for a target in a rotated sorted array containing unique elements.

## Core idea
At least one half of the array is always sorted. Identify that half and decide whether the target lies inside it.

## Approach
1. Find `mid`
2. Check whether the left half is sorted
3. If target lies in that half, move left
4. Otherwise move right
5. Repeat until target is found or search ends

## Dry run
`nums = [4,5,6,7,0,1,2], target = 0`

| low | mid | high | action |
|---|---|---|---|
| 0 | 3 | 6 | left sorted, target not inside → right |
| 4 | 5 | 6 | left sorted, target inside → left |
| 4 | 4 | 4 | found 0 |

## Code
```java
class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }

        return -1;
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Search in Rotated Sorted Array II
topic: Binary Search
difficulty: Medium
pattern: Rotated Binary Search with Duplicates
link: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/

## Problem
Search for a target in a rotated sorted array that may contain duplicates.

## Core idea
Use rotated binary search, but when `low`, `mid`, and `high` are equal, shrink both ends because the sorted half cannot be identified.

## Approach
1. Find `mid`
2. If target is found, return true
3. If `arr[low] == arr[mid] == arr[high]`, shrink both sides
4. Otherwise identify the sorted half
5. Continue searching in the correct half

## Dry run
`nums = [2,5,6,0,0,1,2], target = 0`

| low | mid | high | nums[mid] | action |
|---|---|---|---|---|
| 0 | 3 | 6 | 0 | found |

## Code
```java
class Solution {
    public boolean search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return true;
            }

            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++;
                high--;
                continue;
            }

            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }

        return false;
    }
}
```

**Time:** Average O(log n), Worst O(n) **Space:** O(1)

---

title: Find minimum in Rotated Sorted Array
topic: Binary Search
difficulty: Medium
pattern: Rotated Array Minimum
link: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

## Problem
Find the minimum element in a rotated sorted array containing unique elements.

## Core idea
Compare `nums[mid]` with `nums[high]`. If `nums[mid] > nums[high]`, the minimum is on the right; otherwise it is at `mid` or on the left.

## Approach
1. Set `low = 0`, `high = n - 1`
2. Find `mid`
3. If `nums[mid] > nums[high]`, move `low` right
4. Otherwise move `high` to `mid`
5. Return `nums[low]`

## Dry run
`nums = [4,5,6,7,0,1,2]`

| low | mid | high | comparison | action |
|---|---|---|---|---|
| 0 | 3 | 6 | 7 > 2 | low = 4 |
| 4 | 5 | 6 | 1 <= 2 | high = 5 |
| 4 | 4 | 5 | 0 <= 1 | high = 4 |

Result: `0`

## Code
```java
class Solution {
    public int findMin(int[] nums) {
        int low = 0;
        int high = nums.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return nums[low];
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Find out how many times has an array been rotated
topic: Binary Search
difficulty: Easy
pattern: Index of Minimum
link: https://takeuforward.org/arrays/find-out-how-many-times-the-array-has-been-rotated/

## Problem
Find how many times a sorted array has been rotated.

## Core idea
The number of rotations equals the index of the minimum element.

## Approach
1. Use binary search to find the minimum element
2. Compare `arr[mid]` with `arr[high]`
3. Move toward the unsorted half
4. Stop when `low == high`
5. Return `low`

## Dry run
`arr = [4,5,6,1,2,3]`

| step | low | mid | high | action |
|---|---|---|---|---|
| 1 | 0 | 2 | 5 | 6 > 3 → move right |
| 2 | 3 | 4 | 5 | 2 <= 3 → move left |
| 3 | 3 | 3 | 4 | 1 <= 2 → high = 3 |

Result: `3 rotations`

## Code
```java
class Solution {
    static int findRotationCount(int[] arr) {
        int low = 0;
        int high = arr.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] > arr[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Single element in a Sorted Array
topic: Binary Search
difficulty: Easy
pattern: Index Parity
link: https://leetcode.com/problems/single-element-in-a-sorted-array/

## Problem
Every element appears exactly twice except one element. Find that single element.

## Core idea
Before the single element, pairs start at even indices. After it, this pattern breaks.

## Approach
1. Use binary search
2. Make `mid` even
3. Compare `nums[mid]` with `nums[mid + 1]`
4. If they match, single element is on the right
5. Otherwise it is on the left including `mid`

## Dry run
`nums = [1,1,2,3,3,4,4,8,8]`

| low | mid | pair | action |
|---|---|---|---|
| 0 | 4 | 3 and 4 | mismatch → left |
| 0 | 2 | 2 and 3 | mismatch → left |
| 0 | 0 | 1 and 1 | match → right |

Result: `2`

## Code
```java
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int low = 0;
        int high = nums.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (mid % 2 == 1) {
                mid--;
            }

            if (nums[mid] == nums[mid + 1]) {
                low = mid + 2;
            } else {
                high = mid;
            }
        }

        return nums[low];
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Find peak element
topic: Binary Search
difficulty: Hard
pattern: Binary Search on Slope
link: https://leetcode.com/problems/find-peak-element/

## Problem
Find an index of a peak element, where the element is greater than its neighbors.

## Core idea
If the middle element is smaller than the next element, a peak must exist on the right. Otherwise, a peak exists at `mid` or on the left.

## Approach
1. Set `low = 0`, `high = n - 1`
2. Find `mid`
3. If `nums[mid] < nums[mid + 1]`, move right
4. Otherwise move `high` to `mid`
5. When `low == high`, that index is a peak

## Dry run
`nums = [1,2,3,1]`

| low | mid | high | comparison | action |
|---|---|---|---|---|
| 0 | 1 | 3 | 2 < 3 | move right |
| 2 | 2 | 3 | 3 > 1 | high = 2 |

Result: index `2`

## Code
```java
class Solution {
    public int findPeakElement(int[] nums) {
        int low = 0;
        int high = nums.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] < nums[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

**Time:** O(log n) **Space:** O(1)
