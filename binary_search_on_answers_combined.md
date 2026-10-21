# Binary Search on Answers

---

title: Find square root of a number in log n
topic: Binary Search
difficulty: Medium
pattern: Binary Search on Answer
link: https://leetcode.com/problems/sqrtx/

## Problem
Given a non-negative integer `x`, return the integer part of its square root.

## Core idea
Binary search the possible answer from `0` to `x`. If `mid * mid <= x`, `mid` can be an answer, so try a larger value.

## Approach
1. Set `low = 0` and `high = x`
2. Find `mid`
3. If `mid * mid <= x`, store `mid` and move right
4. Otherwise move left
5. Return the last valid answer

## Dry run
`x = 28`

| low | mid | high | mid² | action |
|---|---|---|---|---|
| 0 | 14 | 28 | 196 | move left |
| 0 | 6 | 13 | 36 | move left |
| 0 | 2 | 5 | 4 | ans = 2, move right |
| 3 | 4 | 5 | 16 | ans = 4, move right |
| 5 | 5 | 5 | 25 | ans = 5 |

## Code
```java
class Solution {
    public int mySqrt(int x) {
        long low = 0;
        long high = x;
        long ans = 0;

        while (low <= high) {
            long mid = low + (high - low) / 2;

            if (mid * mid <= x) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return (int) ans;
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Find the Nth root of a number using binary search
topic: Binary Search
difficulty: Medium
pattern: Binary Search on Answer
link: https://takeuforward.org/data-structure/nth-root-of-a-number-using-binary-search/

## Problem
Given `n` and `m`, find an integer `x` such that `x^n = m`. Return `-1` if no integer root exists.

## Core idea
Binary search possible roots from `1` to `m` and compare `mid^n` with `m`.

## Approach
1. Set `low = 1` and `high = m`
2. Find `mid`
3. Compute `mid^n`
4. If equal to `m`, return `mid`
5. If smaller, move right
6. Otherwise move left

## Dry run
`n = 3, m = 27`

| mid | mid³ | action |
|---|---|---|
| 14 | >27 | move left |
| 7 | >27 | move left |
| 3 | 27 | found |

## Code
```java
class Solution {
    static int nthRoot(int n, int m) {
        int low = 1;
        int high = m;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            long value = power(mid, n, m);

            if (value == m) {
                return mid;
            } else if (value < m) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }

    static long power(int base, int exp, int limit) {
        long result = 1;

        for (int i = 0; i < exp; i++) {
            result *= base;

            if (result > limit) {
                return limit + 1L;
            }
        }

        return result;
    }
}
```

**Time:** O(n log m) **Space:** O(1)

---

title: Koko Eating Bananas
topic: Binary Search
difficulty: Hard
pattern: Minimum Valid Answer
link: https://leetcode.com/problems/koko-eating-bananas/

## Problem
Koko has piles of bananas and `h` hours. Find the minimum eating speed so she can finish all bananas within `h` hours.

## Core idea
Binary search the eating speed. If a speed can finish all piles within `h` hours, try a smaller speed.

## Approach
1. Search speed from `1` to the largest pile
2. Calculate hours needed for `mid` bananas per hour
3. If hours `<= h`, store `mid` and search left
4. Otherwise increase the speed
5. Return the minimum valid speed

## Dry run
`piles = [3,6,7,11], h = 8`

| speed | hours needed | action |
|---|---|---|
| 6 | 6 | valid → try smaller |
| 3 | 10 | too slow |
| 4 | 8 | valid |

Result: `4`

## Code
```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1;
        int high = 0;

        for (int pile : piles) {
            high = Math.max(high, pile);
        }

        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            long hours = requiredHours(piles, mid);

            if (hours <= h) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private long requiredHours(int[] piles, int speed) {
        long hours = 0;

        for (int pile : piles) {
            hours += (pile + speed - 1L) / speed;
        }

        return hours;
    }
}
```

**Time:** O(n log maxPile) **Space:** O(1)

---

title: Minimum days to make M bouquets
topic: Binary Search
difficulty: Hard
pattern: Minimum Valid Day
link: https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/

## Problem
Given bloom days, make `m` bouquets using `k` adjacent flowers each. Find the minimum day required.

## Core idea
Binary search the day. For a chosen day, count how many bouquets can be formed using flowers that have already bloomed.

## Approach
1. If `m * k > n`, return `-1`
2. Search between minimum and maximum bloom day
3. Check how many bouquets can be made by day `mid`
4. If enough bouquets are possible, try an earlier day
5. Otherwise try a later day

## Dry run
`bloomDay = [1,10,3,10,2], m = 3, k = 1`

| day | bouquets | action |
|---|---|---|
| 5 | 3 | valid → move left |
| 2 | 2 | not enough |
| 3 | 3 | valid |

Result: `3`

## Code
```java
class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) {
            return -1;
        }

        int low = Integer.MAX_VALUE;
        int high = Integer.MIN_VALUE;

        for (int day : bloomDay) {
            low = Math.min(low, day);
            high = Math.max(high, day);
        }

        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (canMake(bloomDay, m, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private boolean canMake(int[] bloomDay, int m, int k, int day) {
        int flowers = 0;
        int bouquets = 0;

        for (int bloom : bloomDay) {
            if (bloom <= day) {
                flowers++;

                if (flowers == k) {
                    bouquets++;
                    flowers = 0;
                }
            } else {
                flowers = 0;
            }
        }

        return bouquets >= m;
    }
}
```

**Time:** O(n log range) **Space:** O(1)

---

title: Find the smallest Divisor
topic: Binary Search
difficulty: Easy
pattern: Minimum Valid Divisor
link: https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/

## Problem
Find the smallest positive divisor such that the sum of `ceil(nums[i] / divisor)` is at most `threshold`.

## Core idea
Larger divisors produce smaller sums. Binary search the smallest divisor that satisfies the threshold.

## Approach
1. Search divisor from `1` to the maximum array value
2. Calculate the rounded-up division sum
3. If the sum is within threshold, store divisor and move left
4. Otherwise move right
5. Return the smallest valid divisor

## Dry run
`nums = [1,2,5,9], threshold = 6`

| divisor | sum | action |
|---|---|---|
| 5 | 5 | valid |
| 2 | 10 | too small divisor |
| 3 | 7 | too small divisor |
| 4 | 7 | too small divisor |
| 5 | 5 | answer |

## Code
```java
class Solution {
    public int smallestDivisor(int[] nums, int threshold) {
        int low = 1;
        int high = 0;

        for (int x : nums) {
            high = Math.max(high, x);
        }

        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            long sum = 0;

            for (int x : nums) {
                sum += (x + mid - 1L) / mid;
            }

            if (sum <= threshold) {
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

**Time:** O(n log maxValue) **Space:** O(1)

---

title: Capacity to Ship Packages within D Days
topic: Binary Search
difficulty: Hard
pattern: Minimum Capacity
link: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

## Problem
Find the minimum ship capacity required to deliver all packages within `days`.

## Core idea
Binary search the capacity. A larger capacity requires fewer or equal days.

## Approach
1. Minimum capacity is the largest package
2. Maximum capacity is the sum of all packages
3. Check how many days are needed for `mid` capacity
4. If days needed `<= days`, try smaller capacity
5. Otherwise increase capacity

## Dry run
`weights = [1,2,3,4,5,6,7,8,9,10], days = 5`

| capacity | days needed | action |
|---|---|---|
| 32 | 2 | valid |
| 20 | 4 | valid |
| 14 | 6 | too small |
| 17 | 5 | valid |
| 15 | 5 | valid |

Result: `15`

## Code
```java
class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int low = 0;
        int high = 0;

        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }

        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int neededDays = countDays(weights, mid);

            if (neededDays <= days) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private int countDays(int[] weights, int capacity) {
        int days = 1;
        int load = 0;

        for (int w : weights) {
            if (load + w > capacity) {
                days++;
                load = w;
            } else {
                load += w;
            }
        }

        return days;
    }
}
```

**Time:** O(n log sum) **Space:** O(1)

---

title: Kth Missing Positive Number
topic: Binary Search
difficulty: Easy
pattern: Missing Count
link: https://leetcode.com/problems/kth-missing-positive-number/

## Problem
Given a strictly increasing positive array, find the `k`th missing positive number.

## Core idea
At index `i`, the number of missing values before `arr[i]` is `arr[i] - (i + 1)`.

## Approach
1. Binary search the first index where missing count is at least `k`
2. Compute missing count as `arr[mid] - (mid + 1)`
3. If missing count `< k`, move right
4. Otherwise move left
5. Return `low + k`

## Dry run
`arr = [2,3,4,7,11], k = 5`

| mid | arr[mid] | missing before | action |
|---|---|---|---|
| 2 | 4 | 1 | move right |
| 3 | 7 | 3 | move right |
| 4 | 11 | 6 | move left |

Result: `low + k = 4 + 5 = 9`

## Code
```java
class Solution {
    public int findKthPositive(int[] arr, int k) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int missing = arr[mid] - (mid + 1);

            if (missing < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return low + k;
    }
}
```

**Time:** O(log n) **Space:** O(1)

---

title: Aggressive Cows
topic: Binary Search
difficulty: Hard
pattern: Maximize Minimum Distance
link: https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/

## Problem
Place `k` cows in stalls so that the minimum distance between any two cows is as large as possible.

## Core idea
Binary search the minimum distance. If cows can be placed with distance `mid`, try a larger distance.

## Approach
1. Sort stall positions
2. Search distance from `1` to `max - min`
3. Greedily place cows at least `mid` apart
4. If all cows fit, store `mid` and move right
5. Otherwise move left

## Dry run
`stalls = [1,2,4,8,9], k = 3`

| distance | possible? | action |
|---|---|---|
| 4 | no | move left |
| 2 | yes | ans = 2 |
| 3 | yes | ans = 3 |

Result: `3`

## Code
```java
import java.util.*;

class Solution {
    static int aggressiveCows(int[] stalls, int k) {
        Arrays.sort(stalls);

        int low = 1;
        int high = stalls[stalls.length - 1] - stalls[0];
        int ans = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (canPlace(stalls, k, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }

    private static boolean canPlace(int[] stalls, int k, int distance) {
        int cows = 1;
        int last = stalls[0];

        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - last >= distance) {
                cows++;
                last = stalls[i];

                if (cows >= k) {
                    return true;
                }
            }
        }

        return false;
    }
}
```

**Time:** O(n log n + n log range) **Space:** O(1)

---

title: Book Allocation Problem
topic: Binary Search
difficulty: Hard
pattern: Minimize Maximum Allocation
link: https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/

## Problem
Allocate books in contiguous order among `m` students so that the maximum pages assigned to any student is minimum.

## Core idea
Binary search the maximum pages allowed for one student. Greedily count how many students are needed.

## Approach
1. If students are more than books, return `-1`
2. Minimum answer is the largest book
3. Maximum answer is the total pages
4. Count students required for `mid`
5. If students needed `<= m`, try smaller maximum
6. Otherwise increase the limit

## Dry run
`books = [12,34,67,90], m = 2`

| max pages | students needed | action |
|---|---|---|
| 146 | 2 | valid |
| 117 | 2 | valid |
| 103 | 3 | invalid |
| 113 | 2 | valid |

Result: `113`

## Code
```java
class Solution {
    static int findPages(int[] books, int m) {
        if (m > books.length) {
            return -1;
        }

        int low = 0;
        int high = 0;

        for (int pages : books) {
            low = Math.max(low, pages);
            high += pages;
        }

        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int students = countStudents(books, mid);

            if (students <= m) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private static int countStudents(int[] books, int maxPages) {
        int students = 1;
        int pages = 0;

        for (int book : books) {
            if (pages + book > maxPages) {
                students++;
                pages = book;
            } else {
                pages += book;
            }
        }

        return students;
    }
}
```

**Time:** O(n log sum) **Space:** O(1)

---

title: Split array - Largest Sum
topic: Binary Search
difficulty: Hard
pattern: Minimize Maximum Subarray Sum
link: https://leetcode.com/problems/split-array-largest-sum/

## Problem
Split an array into `k` non-empty contiguous subarrays so that the largest subarray sum is minimized.

## Core idea
Binary search the allowed maximum subarray sum and greedily count how many parts are required.

## Approach
1. Set low to the maximum element
2. Set high to the total sum
3. Count subarrays required for `mid`
4. If required parts `<= k`, try a smaller maximum
5. Otherwise increase the maximum
6. Return the smallest valid answer

## Dry run
`nums = [7,2,5,10,8], k = 2`

| max sum | parts needed | action |
|---|---|---|
| 21 | 2 | valid |
| 15 | 3 | too small |
| 18 | 2 | valid |

Result: `18`

## Code
```java
class Solution {
    public int splitArray(int[] nums, int k) {
        int low = 0;
        int high = 0;

        for (int x : nums) {
            low = Math.max(low, x);
            high += x;
        }

        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int parts = countParts(nums, mid);

            if (parts <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private int countParts(int[] nums, int maxSum) {
        int parts = 1;
        int sum = 0;

        for (int x : nums) {
            if (sum + x > maxSum) {
                parts++;
                sum = x;
            } else {
                sum += x;
            }
        }

        return parts;
    }
}
```

**Time:** O(n log sum) **Space:** O(1)

---

title: Painter's partition
topic: Binary Search
difficulty: Hard
pattern: Minimize Maximum Work
link: https://takeuforward.org/arrays/painters-partition-problem/

## Problem
Given board lengths and `k` painters, minimize the maximum length painted by any painter. Each painter must paint contiguous boards.

## Core idea
This is the same binary-search pattern as Book Allocation. Search the maximum work allowed for one painter.

## Approach
1. Minimum possible answer is the longest board
2. Maximum is the sum of all boards
3. For each `mid`, count painters required
4. If painters needed `<= k`, try a smaller limit
5. Otherwise increase the limit

## Dry run
`boards = [10,20,30,40], k = 2`

| max work | painters needed | action |
|---|---|---|
| 70 | 2 | valid |
| 54 | 3 | invalid |
| 60 | 2 | valid |

Result: `60`

## Code
```java
class Solution {
    static int paintersPartition(int[] boards, int k) {
        int low = 0;
        int high = 0;

        for (int board : boards) {
            low = Math.max(low, board);
            high += board;
        }

        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            int painters = countPainters(boards, mid);

            if (painters <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private static int countPainters(int[] boards, int maxWork) {
        int painters = 1;
        int work = 0;

        for (int board : boards) {
            if (work + board > maxWork) {
                painters++;
                work = board;
            } else {
                work += board;
            }
        }

        return painters;
    }
}
```

**Time:** O(n log sum) **Space:** O(1)

---

title: Minimize Max Distance to Gas Station
topic: Binary Search
difficulty: Hard
pattern: Binary Search on Decimal Answer
link: https://takeuforward.org/arrays/minimise-maximum-distance-between-gas-stations/

## Problem
Add `k` new gas stations so that the maximum distance between adjacent stations becomes as small as possible.

## Core idea
Binary search the answer as a decimal distance. For a candidate distance, calculate how many new stations are required.

## Approach
1. Set `low = 0`
2. Set `high` to the largest existing gap
3. Find `mid = (low + high) / 2`
4. Count stations required to keep every gap `<= mid`
5. If more than `k` stations are needed, increase distance
6. Otherwise decrease distance until precision is reached

## Dry run
`stations = [1,2,3,4,5], k = 4`

Initially every gap is `1`.

Adding one station in each gap reduces the maximum distance to `0.5`.

Result: `0.5`

## Code
```java
class Solution {
    static double minimiseMaxDistance(int[] stations, int k) {
        double low = 0.0;
        double high = 0.0;

        for (int i = 1; i < stations.length; i++) {
            high = Math.max(high, stations[i] - stations[i - 1]);
        }

        double epsilon = 1e-6;

        while (high - low > epsilon) {
            double mid = (low + high) / 2.0;

            int required = stationsRequired(stations, mid);

            if (required > k) {
                low = mid;
            } else {
                high = mid;
            }
        }

        return high;
    }

    private static int stationsRequired(int[] stations, double distance) {
        int count = 0;

        for (int i = 1; i < stations.length; i++) {
            double gap = stations[i] - stations[i - 1];

            int needed = (int) Math.ceil(gap / distance) - 1;
            count += needed;
        }

        return count;
    }
}
```

**Time:** O(n log(range / precision)) **Space:** O(1)

---

title: Median of 2 sorted arrays
topic: Binary Search
difficulty: Hard
pattern: Binary Search Partition
link: https://leetcode.com/problems/median-of-two-sorted-arrays/

## Problem
Find the median of two sorted arrays in `O(log(min(n,m)))` time.

## Core idea
Partition both arrays so the left half contains exactly half the elements and every left value is less than or equal to every right value.

## Approach
1. Binary search on the smaller array
2. Choose partition `cut1`
3. Calculate `cut2` so the total left half has the correct size
4. Check whether `left1 <= right2` and `left2 <= right1`
5. If valid, calculate the median
6. Otherwise move the partition left or right

## Dry run
`a = [1,3], b = [2]`

Partitions:

Left side: `[1,2]`  
Right side: `[3]`

Median = `2`

## Code
```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int n1 = nums1.length;
        int n2 = nums2.length;

        int low = 0;
        int high = n1;

        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = (n1 + n2 + 1) / 2 - cut1;

            int left1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];
            int left2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];

            int right1 = cut1 == n1 ? Integer.MAX_VALUE : nums1[cut1];
            int right2 = cut2 == n2 ? Integer.MAX_VALUE : nums2[cut2];

            if (left1 <= right2 && left2 <= right1) {
                if ((n1 + n2) % 2 == 0) {
                    return (
                        Math.max(left1, left2) +
                        Math.min(right1, right2)
                    ) / 2.0;
                }

                return Math.max(left1, left2);
            } else if (left1 > right2) {
                high = cut1 - 1;
            } else {
                low = cut1 + 1;
            }
        }

        return 0.0;
    }
}
```

**Time:** O(log(min(n,m))) **Space:** O(1)

---

title: Kth element of 2 sorted arrays
topic: Binary Search
difficulty: Medium
pattern: Binary Search Partition
link: https://takeuforward.org/arrays/k-th-element-of-two-sorted-arrays/

## Problem
Given two sorted arrays, find the `k`th element in their combined sorted order without fully merging them.

## Core idea
Partition both arrays so that exactly `k` elements are on the left. The answer is the largest element on the left side.

## Approach
1. Binary search on the smaller array
2. Choose `cut1` elements from the first array
3. Choose `cut2 = k - cut1` from the second
4. Check if both partitions are valid
5. Return `max(left1, left2)` when valid
6. Otherwise shift the partition

## Dry run
`a = [2,3,6,7,9], b = [1,4,8,10], k = 5`

Combined order:

`[1,2,3,4,6,7,8,9,10]`

Result: `6`

## Code
```java
class Solution {
    static int kthElement(int[] a, int[] b, int k) {
        if (a.length > b.length) {
            return kthElement(b, a, k);
        }

        int n1 = a.length;
        int n2 = b.length;

        int low = Math.max(0, k - n2);
        int high = Math.min(k, n1);

        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = k - cut1;

            int left1 = cut1 == 0 ? Integer.MIN_VALUE : a[cut1 - 1];
            int left2 = cut2 == 0 ? Integer.MIN_VALUE : b[cut2 - 1];

            int right1 = cut1 == n1 ? Integer.MAX_VALUE : a[cut1];
            int right2 = cut2 == n2 ? Integer.MAX_VALUE : b[cut2];

            if (left1 <= right2 && left2 <= right1) {
                return Math.max(left1, left2);
            } else if (left1 > right2) {
                high = cut1 - 1;
            } else {
                low = cut1 + 1;
            }
        }

        return -1;
    }
}
```

**Time:** O(log(min(n,m))) **Space:** O(1)
