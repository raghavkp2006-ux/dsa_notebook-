# Bit Manipulation and Advanced Maths Problems

---

title: Introduction to Bit Manipulation [Theory]
topic: Bit Manipulation
difficulty: Easy
pattern: Bitwise Operators
link: https://takeuforward.org/bit-manipulation/introduction-to-bit-manipulation/

## Problem
Understand the basic bitwise operators used in bit manipulation.

## Core idea
Bit manipulation works directly on the binary representation of numbers using operators like `&`, `|`, `^`, `~`, `<<`, and `>>`.

## Approach
1. Convert numbers mentally into binary when needed
2. Use `&` to keep common set bits
3. Use `|` to set bits present in either number
4. Use `^` to keep bits that differ
5. Use `<<` to shift bits left
6. Use `>>` to shift bits right

## Dry run
`a = 5 (0101), b = 3 (0011)`

| operation | result |
|---|---|
| `a & b` | `0001 = 1` |
| `a \| b` | `0111 = 7` |
| `a ^ b` | `0110 = 6` |
| `a << 1` | `1010 = 10` |
| `a >> 1` | `0010 = 2` |

## Code
```java
class Solution {
    static void bitOperations(int a, int b) {
        System.out.println(a & b);
        System.out.println(a | b);
        System.out.println(a ^ b);
        System.out.println(~a);
        System.out.println(a << 1);
        System.out.println(a >> 1);
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Check if the i-th bit is set or not
topic: Bit Manipulation
difficulty: Easy
pattern: Bit Mask
link: https://takeuforward.org/bit-manipulation/check-if-the-i-th-bit-is-set-or-not/

## Problem
Check whether the `i`th bit of a number is `1`.

## Core idea
Create a mask with only the `i`th bit set and perform bitwise AND.

## Approach
1. Create mask `1 << i`
2. Perform `n & mask`
3. If result is non-zero, the bit is set
4. Otherwise it is not set

## Dry run
`n = 13 (1101), i = 2`

Mask = `0100`

`1101 & 0100 = 0100`

Result: `true`

## Code
```java
class Solution {
    static boolean isBitSet(int n, int i) {
        return (n & (1 << i)) != 0;
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Check if a number is odd or not
topic: Bit Manipulation
difficulty: Easy
pattern: Least Significant Bit
link: https://takeuforward.org/bit-manipulation/check-if-a-number-is-odd-or-even/

## Problem
Check whether a number is odd using bit manipulation.

## Core idea
Odd numbers always have their least significant bit set to `1`.

## Approach
1. Perform `n & 1`
2. If result is `1`, number is odd
3. Otherwise number is even

## Dry run
`n = 7`

Binary: `0111`

`7 & 1 = 1`

Result: `odd`

## Code
```java
class Solution {
    static boolean isOdd(int n) {
        return (n & 1) == 1;
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Check if a number is power of 2 or not
topic: Bit Manipulation
difficulty: Easy
pattern: Clear Lowest Set Bit
link: https://leetcode.com/problems/power-of-two/

## Problem
Check whether a positive integer is a power of `2`.

## Core idea
A power of two has exactly one set bit. `n & (n - 1)` removes the rightmost set bit.

## Approach
1. Ensure `n > 0`
2. Compute `n & (n - 1)`
3. If result is `0`, `n` is a power of two
4. Otherwise it is not

## Dry run
`n = 8`

`8 = 1000`  
`7 = 0111`

`1000 & 0111 = 0000`

Result: `true`

## Code
```java
class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Count the number of set bits
topic: Bit Manipulation
difficulty: Easy
pattern: Brian Kernighan Algorithm
link: https://leetcode.com/problems/number-of-1-bits/

## Problem
Count how many `1` bits are present in the binary representation of a number.

## Core idea
`n & (n - 1)` removes the rightmost set bit. Repeat until the number becomes `0`.

## Approach
1. Initialize count to `0`
2. While `n != 0`
3. Replace `n` with `n & (n - 1)`
4. Increment count
5. Return count

## Dry run
`n = 13 (1101)`

| step | n |
|---|---|
| start | 1101 |
| remove one bit | 1100 |
| remove one bit | 1000 |
| remove one bit | 0000 |

Result: `3`

## Code
```java
class Solution {
    static int countSetBits(int n) {
        int count = 0;

        while (n != 0) {
            n = n & (n - 1);
            count++;
        }

        return count;
    }
}
```

**Time:** O(number of set bits) **Space:** O(1)

---

title: Set/Unset the rightmost unset bit
topic: Bit Manipulation
difficulty: Easy
pattern: Bit Trick
link: https://takeuforward.org/bit-manipulation/set-the-rightmost-unset-bit/

## Problem
Set the rightmost `0` bit of a number to `1`.

## Core idea
`n | (n + 1)` sets the rightmost unset bit.

## Approach
1. Take number `n`
2. Compute `n + 1`
3. Perform `n | (n + 1)`
4. Return the result

## Dry run
`n = 10`

`10 = 1010`  
`11 = 1011`

`1010 | 1011 = 1011`

Result: `11`

## Code
```java
class Solution {
    static int setRightmostUnsetBit(int n) {
        return n | (n + 1);
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Swap two numbers
topic: Bit Manipulation
difficulty: Easy
pattern: XOR
link: https://takeuforward.org/bit-manipulation/swap-two-numbers/

## Problem
Swap two integers without using a third variable.

## Core idea
XOR can temporarily store combined information without extra space.

## Approach
1. Set `a = a ^ b`
2. Set `b = a ^ b`
3. Set `a = a ^ b`
4. Values are now swapped

## Dry run
`a = 5, b = 7`

| step | a | b |
|---|---|---|
| start | 5 | 7 |
| `a ^= b` | 2 | 7 |
| `b ^= a` | 2 | 5 |
| `a ^= b` | 7 | 5 |

## Code
```java
class Solution {
    static void swap(int a, int b) {
        a = a ^ b;
        b = a ^ b;
        a = a ^ b;

        System.out.println(a + " " + b);
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Divide two integers without using multiplication, division and mod operator
topic: Bit Manipulation
difficulty: Medium
pattern: Bit Shifting
link: https://leetcode.com/problems/divide-two-integers/

## Problem
Divide two integers without using `*`, `/`, or `%`.

## Core idea
Use left shifts to subtract the largest doubled divisor possible at each step.

## Approach
1. Handle overflow case
2. Work with absolute values using `long`
3. Find the largest shift where `(divisor << shift) <= dividend`
4. Subtract it from dividend
5. Add `1 << shift` to quotient
6. Apply the correct sign

## Dry run
`dividend = 10, divisor = 3`

| step | subtraction | quotient |
|---|---|---|
| 10 - 6 | 4 | 2 |
| 4 - 3 | 1 | 3 |

Result: `3`

## Code
```java
class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MAX_VALUE;
        }

        boolean negative = (dividend < 0) ^ (divisor < 0);

        long a = Math.abs((long) dividend);
        long b = Math.abs((long) divisor);

        long quotient = 0;

        while (a >= b) {
            long temp = b;
            long multiple = 1;

            while ((temp << 1) <= a) {
                temp <<= 1;
                multiple <<= 1;
            }

            a -= temp;
            quotient += multiple;
        }

        if (negative) quotient = -quotient;

        return (int) quotient;
    }
}
```

**Time:** O(log² n) **Space:** O(1)

---

title: Count number of bits to be flipped to convert A to B
topic: Bit Manipulation
difficulty: Medium
pattern: XOR + Set Bit Count
link: https://leetcode.com/problems/minimum-bit-flips-to-convert-number/

## Problem
Find how many bit positions must be flipped to convert number `A` into number `B`.

## Core idea
`A ^ B` has `1` exactly at positions where the two numbers differ.

## Approach
1. Compute `xor = A ^ B`
2. Count set bits in `xor`
3. Return the count

## Dry run
`A = 10 (1010), B = 7 (0111)`

`1010 ^ 0111 = 1101`

Set bits = `3`

Result: `3`

## Code
```java
class Solution {
    public int minBitFlips(int start, int goal) {
        int xor = start ^ goal;
        int count = 0;

        while (xor != 0) {
            xor &= xor - 1;
            count++;
        }

        return count;
    }
}
```

**Time:** O(number of differing bits) **Space:** O(1)

---

title: Find the number that appears odd number of times
topic: Bit Manipulation
difficulty: Easy
pattern: XOR
link: https://takeuforward.org/bit-manipulation/find-the-number-that-appears-odd-number-of-times/

## Problem
Every number appears an even number of times except one. Find that number.

## Core idea
XOR of equal numbers is `0`, so all even-frequency values cancel out.

## Approach
1. Initialize `xor = 0`
2. XOR every array element
3. Equal values cancel
4. Return the remaining value

## Dry run
`arr = [2,3,2,3,3]`

`2 ^ 3 ^ 2 ^ 3 ^ 3 = 3`

Result: `3`

## Code
```java
class Solution {
    static int oddOccurrence(int[] arr) {
        int xor = 0;

        for (int x : arr) {
            xor ^= x;
        }

        return xor;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Power Set
topic: Bit Manipulation
difficulty: Medium
pattern: Bitmask Enumeration
link: https://leetcode.com/problems/subsets/

## Problem
Generate all subsets of an array using bit manipulation.

## Core idea
For `n` elements, every number from `0` to `2^n - 1` represents one subset.

## Approach
1. Loop mask from `0` to `(1 << n) - 1`
2. For each index `i`, check bit `i`
3. If bit is set, include `nums[i]`
4. Store the created subset

## Dry run
`nums = [1,2]`

| mask | binary | subset |
|---|---|---|
| 0 | 00 | [] |
| 1 | 01 | [1] |
| 2 | 10 | [2] |
| 3 | 11 | [1,2] |

## Code
```java
import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        int n = nums.length;

        for (int mask = 0; mask < (1 << n); mask++) {
            List<Integer> current = new ArrayList<>();

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    current.add(nums[i]);
                }
            }

            result.add(current);
        }

        return result;
    }
}
```

**Time:** O(n × 2^n) **Space:** O(n × 2^n) for output

---

title: Find xor of numbers from L to R
topic: Bit Manipulation
difficulty: Easy
pattern: XOR Pattern
link: https://takeuforward.org/bit-manipulation/find-xor-of-numbers-from-l-to-r/

## Problem
Find the XOR of every integer from `L` to `R`.

## Core idea
Use the repeating pattern of XOR from `1` to `n`, then calculate `xor(1..R) ^ xor(1..L-1)`.

## Approach
1. Define a function to calculate XOR from `1` to `n`
2. Use `n % 4`
3. Compute prefix XOR for `R`
4. Compute prefix XOR for `L - 1`
5. XOR both results

## Dry run
`L = 4, R = 7`

`xor(1..7) = 0`  
`xor(1..3) = 0`

Result: `0`

## Code
```java
class Solution {
    static int xorRange(int l, int r) {
        return xorTill(r) ^ xorTill(l - 1);
    }

    private static int xorTill(int n) {
        if (n < 0) return 0;

        switch (n % 4) {
            case 0: return n;
            case 1: return 1;
            case 2: return n + 1;
            default: return 0;
        }
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Find the two numbers appearing odd number of times
topic: Bit Manipulation
difficulty: Easy
pattern: XOR Partition
link: https://takeuforward.org/bit-manipulation/find-the-two-numbers-appearing-odd-number-of-times/

## Problem
Two numbers appear an odd number of times while all others appear an even number of times. Find both.

## Core idea
XOR everything, find one differing bit between the two answers, and split numbers into two groups.

## Approach
1. XOR all values
2. Find the rightmost set bit
3. Divide numbers into two groups using that bit
4. XOR each group separately
5. Return the two results

## Dry run
`arr = [4,2,4,5,2,3,3,1]`

Overall XOR = `5 ^ 1`

Using the rightmost different bit separates them.

Result: `5, 1`

## Code
```java
class Solution {
    static int[] twoOddNumbers(int[] arr) {
        int xor = 0;

        for (int x : arr) {
            xor ^= x;
        }

        int rightmostSetBit = xor & -xor;

        int a = 0;
        int b = 0;

        for (int x : arr) {
            if ((x & rightmostSetBit) != 0) {
                a ^= x;
            } else {
                b ^= x;
            }
        }

        return new int[]{a, b};
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Print Prime Factors of a Number
topic: Advanced Maths
difficulty: Easy
pattern: Trial Division
link: https://takeuforward.org/maths/print-all-prime-factors-of-a-number/

## Problem
Print all prime factors of a number.

## Core idea
Try dividing from `2` to `sqrt(n)`. Whenever a divisor is found, keep dividing by it.

## Approach
1. Start divisor from `2`
2. While `i * i <= n`
3. Repeatedly divide while `n % i == 0`
4. Store `i`
5. If remaining `n > 1`, it is also a prime factor

## Dry run
`n = 84`

`84 = 2 × 2 × 3 × 7`

Prime factors: `2, 3, 7`

## Code
```java
import java.util.*;

class Solution {
    static List<Integer> primeFactors(int n) {
        List<Integer> result = new ArrayList<>();

        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                result.add(i);

                while (n % i == 0) {
                    n /= i;
                }
            }
        }

        if (n > 1) {
            result.add(n);
        }

        return result;
    }
}
```

**Time:** O(√n) **Space:** O(1) excluding output

---

title: All Divisors of a Number
topic: Advanced Maths
difficulty: Easy
pattern: Square Root Traversal
link: https://takeuforward.org/maths/print-all-divisors-of-a-number/

## Problem
Find all divisors of a positive integer.

## Core idea
Divisors come in pairs: if `i` divides `n`, then `n / i` also divides `n`.

## Approach
1. Loop `i` from `1` to `sqrt(n)`
2. If `n % i == 0`, store `i`
3. Also store `n / i` if different
4. Sort the result if required

## Dry run
`n = 36`

Pairs:

`1 × 36`  
`2 × 18`  
`3 × 12`  
`4 × 9`  
`6 × 6`

Divisors: `1,2,3,4,6,9,12,18,36`

## Code
```java
import java.util.*;

class Solution {
    static List<Integer> divisors(int n) {
        List<Integer> result = new ArrayList<>();

        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                result.add(i);

                if (i != n / i) {
                    result.add(n / i);
                }
            }
        }

        Collections.sort(result);

        return result;
    }
}
```

**Time:** O(√n + d log d) **Space:** O(d)

---

title: Sieve of Eratosthenes
topic: Advanced Maths
difficulty: Medium
pattern: Prime Preprocessing
link: https://leetcode.com/problems/count-primes/

## Problem
Find all prime numbers up to `n`.

## Core idea
Assume every number is prime, then mark multiples of each prime as composite.

## Approach
1. Create a boolean prime array
2. Initially mark all values from `2` onward as prime
3. For each `i` up to `sqrt(n)`
4. If `i` is prime, mark multiples from `i*i` as false
5. Collect remaining prime numbers

## Dry run
`n = 10`

Start: `2,3,4,5,6,7,8,9,10`

Remove multiples of `2`: `4,6,8,10`  
Remove multiple of `3`: `9`

Primes: `2,3,5,7`

## Code
```java
import java.util.*;

class Solution {
    static List<Integer> sieve(int n) {
        boolean[] prime = new boolean[n + 1];
        Arrays.fill(prime, true);

        if (n >= 0) prime[0] = false;
        if (n >= 1) prime[1] = false;

        for (int i = 2; i * i <= n; i++) {
            if (prime[i]) {
                for (int j = i * i; j <= n; j += i) {
                    prime[j] = false;
                }
            }
        }

        List<Integer> result = new ArrayList<>();

        for (int i = 2; i <= n; i++) {
            if (prime[i]) {
                result.add(i);
            }
        }

        return result;
    }
}
```

**Time:** O(n log log n) **Space:** O(n)

---

title: Find Prime Factorisation of a Number using Sieve
topic: Advanced Maths
difficulty: Medium
pattern: Smallest Prime Factor
link: https://takeuforward.org/maths/prime-factorisation-using-sieve/

## Problem
Find prime factorization efficiently using a precomputed smallest prime factor array.

## Core idea
For each number, store its smallest prime factor. Then repeatedly divide by that factor.

## Approach
1. Build `spf[i] = i`
2. For every prime `i`, update multiples with their smallest factor
3. For a query number `n`, repeatedly use `spf[n]`
4. Divide `n` by `spf[n]`
5. Continue until `n = 1`

## Dry run
`n = 84`

`spf[84] = 2`  
`spf[42] = 2`  
`spf[21] = 3`  
`spf[7] = 7`

Factors: `2,2,3,7`

## Code
```java
import java.util.*;

class Solution {
    static int[] buildSPF(int n) {
        int[] spf = new int[n + 1];

        for (int i = 0; i <= n; i++) {
            spf[i] = i;
        }

        for (int i = 2; i * i <= n; i++) {
            if (spf[i] == i) {
                for (int j = i * i; j <= n; j += i) {
                    if (spf[j] == j) {
                        spf[j] = i;
                    }
                }
            }
        }

        return spf;
    }

    static List<Integer> factorize(int n, int[] spf) {
        List<Integer> result = new ArrayList<>();

        while (n > 1) {
            result.add(spf[n]);
            n /= spf[n];
        }

        return result;
    }
}
```

**Time:** Preprocessing O(n log log n), Query O(log n) **Space:** O(n)

---

title: Power(n, x)
topic: Advanced Maths
difficulty: Medium
pattern: Binary Exponentiation
link: https://leetcode.com/problems/powx-n/

## Problem
Calculate `n^x` efficiently.

## Core idea
Reduce the exponent by half on each step using binary exponentiation.

## Approach
1. Set result to `1`
2. While exponent is positive
3. If exponent is odd, multiply result by base
4. Square the base
5. Divide exponent by `2`
6. Return result

## Dry run
`n = 2, x = 10`

| exponent | base | result |
|---|---|---|
| 10 | 2 | 1 |
| 5 | 4 | 1 |
| 2 | 16 | 4 |
| 1 | 256 | 4 |
| 0 | - | 1024 |

## Code
```java
class Solution {
    static long power(long n, long x) {
        long result = 1;

        while (x > 0) {
            if ((x & 1) == 1) {
                result *= n;
            }

            n *= n;
            x >>= 1;
        }

        return result;
    }
}
```

**Time:** O(log x) **Space:** O(1)
