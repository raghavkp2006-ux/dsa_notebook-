# Stack and Queue Problems

---

title: Implement Stack using Arrays
topic: Stack and Queue
difficulty: Easy
pattern: Array Implementation
link: https://takeuforward.org/data-structure/implement-stack-using-array/

## Problem
Implement a stack using an array with operations like push, pop, top, and size.

## Core idea
A stack follows LIFO. Keep a pointer `top` that always points to the latest inserted element.

## Approach
1. Create an array to store elements
2. Initialize `top = -1`
3. On push, increment top and insert
4. On pop, return `arr[top]` and decrement top
5. For peek, return `arr[top]`

## Dry run
Push `10, 20, 30`

| operation | stack |
|---|---|
| push 10 | [10] |
| push 20 | [10,20] |
| push 30 | [10,20,30] |
| pop | returns 30 |

## Code
```java
class MyStack {
    private int[] arr;
    private int top;

    MyStack(int capacity) {
        arr = new int[capacity];
        top = -1;
    }

    void push(int x) {
        arr[++top] = x;
    }

    int pop() {
        return arr[top--];
    }

    int peek() {
        return arr[top];
    }

    int size() {
        return top + 1;
    }

    boolean isEmpty() {
        return top == -1;
    }
}
```

**Time:** O(1) per operation **Space:** O(n)

---

title: Implement Queue using Arrays
topic: Stack and Queue
difficulty: Easy
pattern: Circular Queue
link: https://takeuforward.org/data-structure/implement-queue-using-array/

## Problem
Implement a queue using an array.

## Core idea
A queue follows FIFO. Use circular indexing so empty space can be reused.

## Approach
1. Keep `front`, `rear`, and `size`
2. Insert at rear
3. Remove from front
4. Move indices using modulo
5. Track current size

## Dry run
Push `10, 20, 30`

| operation | queue |
|---|---|
| push 10 | [10] |
| push 20 | [10,20] |
| push 30 | [10,20,30] |
| pop | returns 10 |

## Code
```java
class MyQueue {
    private int[] arr;
    private int front;
    private int rear;
    private int size;

    MyQueue(int capacity) {
        arr = new int[capacity];
        front = 0;
        rear = 0;
        size = 0;
    }

    void push(int x) {
        arr[rear] = x;
        rear = (rear + 1) % arr.length;
        size++;
    }

    int pop() {
        int value = arr[front];
        front = (front + 1) % arr.length;
        size--;
        return value;
    }

    int peek() {
        return arr[front];
    }

    int size() {
        return size;
    }

    boolean isEmpty() {
        return size == 0;
    }
}
```

**Time:** O(1) per operation **Space:** O(n)

---

title: Implement Stack using Queue
topic: Stack and Queue
difficulty: Medium
pattern: Queue Rotation
link: https://leetcode.com/problems/implement-stack-using-queues/

## Problem
Implement a stack using queue operations.

## Core idea
After inserting a new element, rotate all older elements behind it so the newest element stays at the front.

## Approach
1. Push new value into queue
2. Rotate previous elements to the back
3. Front of queue becomes stack top
4. Pop directly from queue front

## Dry run
Push `1, 2, 3`

Queue after rotations:

`[3,2,1]`

Pop returns `3`.

## Code
```java
import java.util.*;

class MyStack {
    Queue<Integer> q = new LinkedList<>();

    public void push(int x) {
        q.offer(x);

        for (int i = 0; i < q.size() - 1; i++) {
            q.offer(q.poll());
        }
    }

    public int pop() {
        return q.poll();
    }

    public int top() {
        return q.peek();
    }

    public boolean empty() {
        return q.isEmpty();
    }
}
```

**Time:** Push O(n), Pop O(1) **Space:** O(n)

---

title: Implement Queue using Stack
topic: Stack and Queue
difficulty: Medium
pattern: Two Stacks
link: https://leetcode.com/problems/implement-queue-using-stacks/

## Problem
Implement a queue using two stacks.

## Core idea
Use one stack for input and another for output. Reverse order only when needed.

## Approach
1. Push new elements into `input`
2. When popping, if `output` is empty, move all input elements to output
3. Pop from output
4. Peek works the same way

## Dry run
Push `1,2,3`

Input: `[1,2,3]`

Move to output:

`[3,2,1]`

Pop returns `1`.

## Code
```java
import java.util.*;

class MyQueue {
    Stack<Integer> input = new Stack<>();
    Stack<Integer> output = new Stack<>();

    public void push(int x) {
        input.push(x);
    }

    public int pop() {
        move();
        return output.pop();
    }

    public int peek() {
        move();
        return output.peek();
    }

    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }

    private void move() {
        if (output.isEmpty()) {
            while (!input.isEmpty()) {
                output.push(input.pop());
            }
        }
    }
}
```

**Time:** Amortized O(1) **Space:** O(n)

---

title: Implement stack using Linkedlist
topic: Stack and Queue
difficulty: Easy
pattern: Linked List
link: https://takeuforward.org/data-structure/implement-stack-using-linked-list/

## Problem
Implement a stack using a linked list.

## Core idea
Use the head of the linked list as the top of the stack.

## Approach
1. Create a node for every pushed value
2. Insert new node at head
3. Pop by removing head
4. Peek using head value

## Dry run
Push `10,20`

`20 → 10`

Pop returns `20`.

## Code
```java
class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
    }
}

class MyStack {
    Node top;

    void push(int x) {
        Node node = new Node(x);
        node.next = top;
        top = node;
    }

    int pop() {
        int value = top.data;
        top = top.next;
        return value;
    }

    int peek() {
        return top.data;
    }

    boolean isEmpty() {
        return top == null;
    }
}
```

**Time:** O(1) per operation **Space:** O(n)

---

title: Implement queue using Linkedlist
topic: Stack and Queue
difficulty: Medium
pattern: Linked List
link: https://takeuforward.org/data-structure/implement-queue-using-linked-list/

## Problem
Implement a queue using a linked list.

## Core idea
Keep both front and rear pointers for O(1) insertion and deletion.

## Approach
1. Add new nodes at rear
2. Remove nodes from front
3. If queue becomes empty, reset rear
4. Peek from front

## Dry run
Enqueue `10,20,30`

`10 → 20 → 30`

Dequeue returns `10`.

## Code
```java
class MyQueue {
    Node front;
    Node rear;

    void push(int x) {
        Node node = new Node(x);

        if (rear == null) {
            front = rear = node;
            return;
        }

        rear.next = node;
        rear = node;
    }

    int pop() {
        int value = front.data;
        front = front.next;

        if (front == null) rear = null;

        return value;
    }

    int peek() {
        return front.data;
    }

    boolean isEmpty() {
        return front == null;
    }
}
```

**Time:** O(1) per operation **Space:** O(n)

---

title: Check for balanced paranthesis
topic: Stack and Queue
difficulty: Medium
pattern: Stack Matching
link: https://leetcode.com/problems/valid-parentheses/

## Problem
Check whether brackets in a string are balanced.

## Core idea
Push opening brackets and match every closing bracket with the latest opening bracket.

## Approach
1. Traverse characters
2. Push opening brackets
3. For closing brackets, check stack top
4. If mismatch or empty stack, return false
5. At end, stack must be empty

## Dry run
`s = "{[()]}"`

| char | stack |
|---|---|
| { | { |
| [ | {[ |
| ( | {[( |
| ) | {[ |
| ] | { |
| } | empty |

Result: `true`

## Code
```java
import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) return false;

                char top = stack.pop();

                if ((ch == ')' && top != '(') ||
                    (ch == ']' && top != '[') ||
                    (ch == '}' && top != '{')) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Implement Min Stack
topic: Stack and Queue
difficulty: Medium
pattern: Auxiliary Minimum
link: https://leetcode.com/problems/min-stack/

## Problem
Design a stack supporting push, pop, top, and getMin in O(1).

## Core idea
Store both the value and minimum-so-far at every level.

## Approach
1. Maintain two stacks
2. Push value into normal stack
3. Push current minimum into min stack
4. Pop both together
5. Minimum is always min stack top

## Dry run
Push `5, 2, 7`

Min stack:

`5, 2, 2`

Current min = `2`.

## Code
```java
import java.util.*;

class MinStack {
    Stack<Integer> stack = new Stack<>();
    Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);

        if (minStack.isEmpty()) {
            minStack.push(val);
        } else {
            minStack.push(Math.min(val, minStack.peek()));
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
```

**Time:** O(1) per operation **Space:** O(n)

---

title: Infix to Postfix Conversion using Stack
topic: Stack and Queue
difficulty: Medium
pattern: Operator Stack
link: https://takeuforward.org/data-structure/infix-to-postfix/

## Problem
Convert an infix expression into postfix notation.

## Core idea
Operands go directly to output while operators are managed using precedence and a stack.

## Approach
1. Append operands directly
2. Push `(` onto stack
3. On `)`, pop until `(`
4. For operators, pop operators with higher/equal precedence
5. Push current operator
6. Pop remaining operators at end

## Dry run
`A+B*C`

Postfix:

`ABC*+`

## Code
```java
import java.util.*;

class Solution {
    static String infixToPostfix(String s) {
        Stack<Character> stack = new Stack<>();
        StringBuilder ans = new StringBuilder();

        for (char ch : s.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                ans.append(ch);
            } else if (ch == '(') {
                stack.push(ch);
            } else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    ans.append(stack.pop());
                }
                stack.pop();
            } else {
                while (!stack.isEmpty() &&
                       stack.peek() != '(' &&
                       precedence(stack.peek()) >= precedence(ch)) {
                    ans.append(stack.pop());
                }
                stack.push(ch);
            }
        }

        while (!stack.isEmpty()) {
            ans.append(stack.pop());
        }

        return ans.toString();
    }

    static int precedence(char ch) {
        if (ch == '^') return 3;
        if (ch == '*' || ch == '/') return 2;
        if (ch == '+' || ch == '-') return 1;
        return 0;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Prefix to Infix Conversion
topic: Stack and Queue
difficulty: Medium
pattern: Expression Stack
link: https://takeuforward.org/data-structure/prefix-to-infix-conversion/

## Problem
Convert a prefix expression into infix.

## Core idea
Traverse from right to left and combine two operands whenever an operator appears.

## Approach
1. Traverse prefix from right to left
2. Push operands
3. On operator, pop two strings
4. Create `(a op b)`
5. Push result back

## Dry run
Prefix: `*+AB-CD`

Result:

`((A+B)*(C-D))`

## Code
```java
import java.util.*;

class Solution {
    static String prefixToInfix(String s) {
        Stack<String> stack = new Stack<>();

        for (int i = s.length() - 1; i >= 0; i--) {
            char ch = s.charAt(i);

            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String a = stack.pop();
                String b = stack.pop();

                stack.push("(" + a + ch + b + ")");
            }
        }

        return stack.pop();
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Prefix to Postfix Conversion
topic: Stack and Queue
difficulty: Medium
pattern: Expression Stack
link: https://takeuforward.org/data-structure/prefix-to-postfix-conversion/

## Problem
Convert prefix notation into postfix notation.

## Core idea
Traverse prefix from right to left and combine operand strings after operators.

## Approach
1. Traverse right to left
2. Push operands
3. On operator, pop two operands
4. Form `a + b + operator`
5. Push result

## Dry run
Prefix: `*+AB-CD`

Postfix:

`AB+CD-*`

## Code
```java
import java.util.*;

class Solution {
    static String prefixToPostfix(String s) {
        Stack<String> stack = new Stack<>();

        for (int i = s.length() - 1; i >= 0; i--) {
            char ch = s.charAt(i);

            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String a = stack.pop();
                String b = stack.pop();

                stack.push(a + b + ch);
            }
        }

        return stack.pop();
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Postfix to Prefix Conversion
topic: Stack and Queue
difficulty: Medium
pattern: Expression Stack
link: https://takeuforward.org/data-structure/postfix-to-prefix-conversion/

## Problem
Convert postfix notation to prefix notation.

## Core idea
Traverse left to right and combine the two latest operands whenever an operator appears.

## Approach
1. Traverse postfix left to right
2. Push operands
3. On operator, pop `b` then `a`
4. Form `operator + a + b`
5. Push result

## Dry run
Postfix: `AB+CD-*`

Prefix:

`*+AB-CD`

## Code
```java
import java.util.*;

class Solution {
    static String postfixToPrefix(String s) {
        Stack<String> stack = new Stack<>();

        for (char ch : s.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String b = stack.pop();
                String a = stack.pop();

                stack.push(ch + a + b);
            }
        }

        return stack.pop();
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Postfix to Infix
topic: Stack and Queue
difficulty: Medium
pattern: Expression Stack
link: https://takeuforward.org/data-structure/postfix-to-infix-conversion/

## Problem
Convert postfix notation into infix notation.

## Core idea
Push operands and combine them into bracketed infix expressions on operators.

## Approach
1. Traverse left to right
2. Push operands
3. On operator, pop `b` then `a`
4. Form `(a op b)`
5. Push result

## Dry run
Postfix: `AB+C*`

Result:

`((A+B)*C)`

## Code
```java
import java.util.*;

class Solution {
    static String postfixToInfix(String s) {
        Stack<String> stack = new Stack<>();

        for (char ch : s.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String b = stack.pop();
                String a = stack.pop();

                stack.push("(" + a + ch + b + ")");
            }
        }

        return stack.pop();
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Convert Infix To Prefix Notation
topic: Stack and Queue
difficulty: Medium
pattern: Reverse + Postfix
link: https://takeuforward.org/data-structure/infix-to-prefix/

## Problem
Convert infix notation to prefix notation.

## Core idea
Reverse the expression, swap brackets, convert to postfix, then reverse the result.

## Approach
1. Reverse infix string
2. Replace `(` with `)` and vice versa
3. Convert modified expression to postfix
4. Reverse postfix result
5. Return prefix

## Dry run
Infix:

`A+B*C`

Prefix:

`+A*BC`

## Code
```java
class Solution {
    static String infixToPrefix(String s) {
        StringBuilder rev = new StringBuilder(s).reverse();

        for (int i = 0; i < rev.length(); i++) {
            if (rev.charAt(i) == '(') {
                rev.setCharAt(i, ')');
            } else if (rev.charAt(i) == ')') {
                rev.setCharAt(i, '(');
            }
        }

        String postfix = infixToPostfix(rev.toString());

        return new StringBuilder(postfix).reverse().toString();
    }

    static String infixToPostfix(String s) {
        java.util.Stack<Character> stack = new java.util.Stack<>();
        StringBuilder ans = new StringBuilder();

        for (char ch : s.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                ans.append(ch);
            } else if (ch == '(') {
                stack.push(ch);
            } else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    ans.append(stack.pop());
                }
                stack.pop();
            } else {
                while (!stack.isEmpty() &&
                       stack.peek() != '(' &&
                       precedence(stack.peek()) > precedence(ch)) {
                    ans.append(stack.pop());
                }

                stack.push(ch);
            }
        }

        while (!stack.isEmpty()) {
            ans.append(stack.pop());
        }

        return ans.toString();
    }

    static int precedence(char ch) {
        if (ch == '^') return 3;
        if (ch == '*' || ch == '/') return 2;
        if (ch == '+' || ch == '-') return 1;
        return 0;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Next Greater Element
topic: Stack and Queue
difficulty: Easy
pattern: Monotonic Stack
link: https://leetcode.com/problems/next-greater-element-i/

## Problem
For every element, find the first greater element to its right.

## Core idea
Traverse from right to left while keeping a decreasing stack.

## Approach
1. Traverse from right to left
2. Pop all elements `<= current`
3. Stack top is next greater
4. If stack is empty, answer is `-1`
5. Push current element

## Dry run
`arr = [4,5,2,10]`

Result:

`[5,10,10,-1]`

## Code
```java
import java.util.*;

class Solution {
    static int[] nextGreater(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }

            ans[i] = stack.isEmpty() ? -1 : stack.peek();

            stack.push(arr[i]);
        }

        return ans;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Next Greater Element 2
topic: Stack and Queue
difficulty: Medium
pattern: Circular Monotonic Stack
link: https://leetcode.com/problems/next-greater-element-ii/

## Problem
Find the next greater element in a circular array.

## Core idea
Simulate two passes using indices modulo `n`.

## Approach
1. Traverse from `2n - 1` down to `0`
2. Use `i % n` as real index
3. Pop smaller/equal values
4. During first real pass, store answers
5. Push current value

## Dry run
`nums = [1,2,1]`

Result:

`[2,-1,2]`

## Code
```java
import java.util.*;

class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = 2 * n - 1; i >= 0; i--) {
            int index = i % n;

            while (!stack.isEmpty() && stack.peek() <= nums[index]) {
                stack.pop();
            }

            if (i < n) {
                ans[index] = stack.isEmpty() ? -1 : stack.peek();
            }

            stack.push(nums[index]);
        }

        return ans;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Next Smaller Element
topic: Stack and Queue
difficulty: Easy
pattern: Monotonic Stack
link: https://takeuforward.org/stack/next-smaller-element/

## Problem
For every element, find the first smaller element on its right.

## Core idea
Traverse from right to left using an increasing stack.

## Approach
1. Traverse from right
2. Pop values `>= current`
3. Stack top becomes next smaller
4. If empty, answer is `-1`
5. Push current

## Dry run
`arr = [4,8,5,2,25]`

Result:

`[2,5,2,-1,-1]`

## Code
```java
import java.util.*;

class Solution {
    static int[] nextSmaller(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() >= arr[i]) {
                stack.pop();
            }

            ans[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }

        return ans;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Number of NGEs to the right
topic: Stack and Queue
difficulty: Easy
pattern: Right-Side Counting
link: https://takeuforward.org/stack/number-of-nges-to-the-right/

## Problem
For given indices, count how many elements to the right are greater than the current element.

## Core idea
For each query index, scan the right side and count greater values.

## Approach
1. For every query index
2. Store current value
3. Traverse all indices to the right
4. Count values greater than current
5. Save count

## Dry run
`arr = [3,4,2,7,5]`, query index = `1`

Value = `4`

Greater elements to right: `7,5`

Result: `2`

## Code
```java
class Solution {
    static int countNGE(int[] arr, int index) {
        int count = 0;

        for (int i = index + 1; i < arr.length; i++) {
            if (arr[i] > arr[index]) {
                count++;
            }
        }

        return count;
    }
}
```

**Time:** O(n) per query **Space:** O(1)

---

title: Trapping Rainwater
topic: Stack and Queue
difficulty: Hard
pattern: Two Pointers
link: https://leetcode.com/problems/trapping-rain-water/

## Problem
Find how much rainwater can be trapped between bars.

## Core idea
Water above a bar depends on the smaller of the maximum heights on its left and right.

## Approach
1. Use left and right pointers
2. Track leftMax and rightMax
3. Move the side with smaller height
4. Add trapped water using max boundary
5. Continue until pointers meet

## Dry run
`height = [4,2,0,3,2,5]`

Total trapped water = `9`

## Code
```java
class Solution {
    public int trap(int[] height) {
        int left = 0;
        int right = height.length - 1;

        int leftMax = 0;
        int rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }

        return water;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Sum of subarray minimum
topic: Stack and Queue
difficulty: Medium
pattern: Monotonic Stack
link: https://leetcode.com/problems/sum-of-subarray-minimums/

## Problem
Find the sum of minimum values of all subarrays.

## Core idea
For each element, count how many subarrays use it as the minimum.

## Approach
1. Find previous smaller element
2. Find next smaller-or-equal element
3. Calculate left contribution
4. Calculate right contribution
5. Add `arr[i] * left * right`

## Dry run
`arr = [3,1,2,4]`

Subarray minimum sum = `17`

## Code
```java
import java.util.*;

class Solution {
    public int sumSubarrayMins(int[] arr) {
        int n = arr.length;
        long mod = 1_000_000_007L;

        int[] left = new int[n];
        int[] right = new int[n];

        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
                stack.pop();
            }

            left[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }

        stack.clear();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }

            right[i] = stack.isEmpty() ? n - i : stack.peek() - i;
            stack.push(i);
        }

        long ans = 0;

        for (int i = 0; i < n; i++) {
            ans = (ans + (long) arr[i] * left[i] * right[i]) % mod;
        }

        return (int) ans;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Asteroid Collision
topic: Stack and Queue
difficulty: Medium
pattern: Stack Simulation
link: https://leetcode.com/problems/asteroid-collision/

## Problem
Simulate collisions between moving asteroids.

## Core idea
A collision happens only when a positive asteroid is followed by a negative asteroid.

## Approach
1. Traverse asteroids
2. If no collision is possible, push asteroid
3. While top moves right and current moves left, compare sizes
4. Remove smaller asteroid
5. Handle equal destruction

## Dry run
`[5,10,-5]`

10 collides with -5 and survives.

Result:

`[5,10]`

## Code
```java
import java.util.*;

class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> stack = new Stack<>();

        for (int a : asteroids) {
            boolean alive = true;

            while (alive &&
                   a < 0 &&
                   !stack.isEmpty() &&
                   stack.peek() > 0) {

                if (stack.peek() < -a) {
                    stack.pop();
                } else if (stack.peek() == -a) {
                    stack.pop();
                    alive = false;
                } else {
                    alive = false;
                }
            }

            if (alive) {
                stack.push(a);
            }
        }

        int[] ans = new int[stack.size()];

        for (int i = ans.length - 1; i >= 0; i--) {
            ans[i] = stack.pop();
        }

        return ans;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Sum of subarray ranges
topic: Stack and Queue
difficulty: Medium
pattern: Monotonic Stack
link: https://leetcode.com/problems/sum-of-subarray-ranges/

## Problem
Find the sum of `(maximum - minimum)` over all subarrays.

## Core idea
Calculate total contribution as maximum minus total contribution as minimum.

## Approach
1. Count contribution of every element as maximum
2. Count contribution as minimum
3. Use monotonic stacks for previous/next boundaries
4. Subtract minimum contribution from maximum contribution

## Dry run
`nums = [1,2,3]`

Subarray ranges:

`0 + 0 + 0 + 1 + 1 + 2 = 4`

Result: `4`

## Code
```java
class Solution {
    public long subArrayRanges(int[] nums) {
        long ans = 0;
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            int min = nums[i];
            int max = nums[i];

            for (int j = i; j < n; j++) {
                min = Math.min(min, nums[j]);
                max = Math.max(max, nums[j]);

                ans += max - min;
            }
        }

        return ans;
    }
}
```

**Time:** O(n²) **Space:** O(1)

---

title: Remove k Digits
topic: Stack and Queue
difficulty: Medium
pattern: Monotonic Stack
link: https://leetcode.com/problems/remove-k-digits/

## Problem
Remove `k` digits from a number string to make the smallest possible number.

## Core idea
Whenever the current digit is smaller than the previous digit, remove the larger previous digit.

## Approach
1. Use a stack
2. While current digit is smaller than stack top and k > 0, pop
3. Push current digit
4. If k remains, remove from end
5. Remove leading zeros

## Dry run
`num = "1432219", k = 3`

Result:

`"1219"`

## Code
```java
import java.util.*;

class Solution {
    public String removeKdigits(String num, int k) {
        Stack<Character> stack = new Stack<>();

        for (char ch : num.toCharArray()) {
            while (!stack.isEmpty() &&
                   k > 0 &&
                   stack.peek() > ch) {
                stack.pop();
                k--;
            }

            stack.push(ch);
        }

        while (k > 0) {
            stack.pop();
            k--;
        }

        StringBuilder ans = new StringBuilder();

        for (char ch : stack) {
            if (ans.length() == 0 && ch == '0') continue;
            ans.append(ch);
        }

        return ans.length() == 0 ? "0" : ans.toString();
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Largest rectangle in a histogram
topic: Stack and Queue
difficulty: Medium
pattern: Monotonic Stack
link: https://leetcode.com/problems/largest-rectangle-in-histogram/

## Problem
Find the largest rectangular area in a histogram.

## Core idea
For each bar, find how far it can extend left and right before hitting a smaller bar.

## Approach
1. Use increasing stack of indices
2. When current bar is smaller, pop
3. Calculate width using new stack top
4. Compute area
5. Continue with sentinel at end

## Dry run
`heights = [2,1,5,6,2,3]`

Largest rectangle:

`5 × 2 = 10`

Result: `10`

## Code
```java
import java.util.*;

class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= heights.length; i++) {
            int current = (i == heights.length) ? 0 : heights[i];

            while (!stack.isEmpty() &&
                   heights[stack.peek()] > current) {

                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                int width = i - left - 1;

                maxArea = Math.max(maxArea, height * width);
            }

            stack.push(i);
        }

        return maxArea;
    }
}
```

**Time:** O(n) **Space:** O(n)

---

title: Maximal Rectangles
topic: Stack and Queue
difficulty: Hard
pattern: Histogram per Row
link: https://leetcode.com/problems/maximal-rectangle/

## Problem
Find the largest rectangle containing only `1`s in a binary matrix.

## Core idea
Treat every row as the base of a histogram and reuse the largest rectangle in histogram solution.

## Approach
1. Maintain histogram heights for each column
2. For every row, update heights
3. Reset height to 0 on matrix zero
4. Find largest histogram rectangle
5. Track global maximum

## Dry run
For matrix:

`1 0 1 0 0`  
`1 0 1 1 1`  
`1 1 1 1 1`  
`1 0 0 1 0`

Maximum area = `6`

## Code
```java
class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0) return 0;

        int[] heights = new int[matrix[0].length];
        int max = 0;

        for (char[] row : matrix) {
            for (int j = 0; j < row.length; j++) {
                heights[j] = row[j] == '1' ? heights[j] + 1 : 0;
            }

            max = Math.max(max, largestRectangleArea(heights));
        }

        return max;
    }

    private int largestRectangleArea(int[] heights) {
        java.util.Stack<Integer> stack = new java.util.Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= heights.length; i++) {
            int current = i == heights.length ? 0 : heights[i];

            while (!stack.isEmpty() &&
                   heights[stack.peek()] > current) {

                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                int width = i - left - 1;

                maxArea = Math.max(maxArea, height * width);
            }

            stack.push(i);
        }

        return maxArea;
    }
}
```

**Time:** O(rows × cols) **Space:** O(cols)

---

title: Sliding Window maximum
topic: Stack and Queue
difficulty: Hard
pattern: Monotonic Deque
link: https://leetcode.com/problems/sliding-window-maximum/

## Problem
Find the maximum value in every window of size `k`.

## Core idea
Use a deque containing useful indices in decreasing value order.

## Approach
1. Remove indices outside current window
2. Remove smaller values from deque back
3. Add current index
4. Front always stores window maximum
5. Record result after first full window

## Dry run
`nums = [1,3,-1,-3,5,3,6,7], k = 3`

Result:

`[3,3,5,5,6,7]`

## Code
```java
import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int[] ans = new int[nums.length - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();

        int index = 0;

        for (int i = 0; i < nums.length; i++) {
            while (!dq.isEmpty() && dq.peekFirst() <= i - k) {
                dq.pollFirst();
            }

            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
                dq.pollLast();
            }

            dq.offerLast(i);

            if (i >= k - 1) {
                ans[index++] = nums[dq.peekFirst()];
            }
        }

        return ans;
    }
}
```

**Time:** O(n) **Space:** O(k)

---

title: Stock span problem
topic: Stack and Queue
difficulty: Medium
pattern: Monotonic Stack
link: https://leetcode.com/problems/online-stock-span/

## Problem
For each stock price, find how many consecutive previous days had price less than or equal to today's price.

## Core idea
Store pairs of `(price, span)` and merge spans while previous prices are smaller or equal.

## Approach
1. Start span at 1
2. Pop all prices `<= current`
3. Add their spans
4. Push current price with total span
5. Return span

## Dry run
Prices:

`100,80,60,70,60,75,85`

Spans:

`1,1,1,2,1,4,6`

## Code
```java
import java.util.*;

class StockSpanner {
    Stack<int[]> stack = new Stack<>();

    public int next(int price) {
        int span = 1;

        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            span += stack.pop()[1];
        }

        stack.push(new int[]{price, span});

        return span;
    }
}
```

**Time:** Amortized O(1) **Space:** O(n)

---

title: The Celebrity Problem
topic: Stack and Queue
difficulty: Hard
pattern: Candidate Elimination
link: https://takeuforward.org/data-structure/the-celebrity-problem/

## Problem
Find a celebrity who knows nobody but is known by everybody else.

## Core idea
Eliminate impossible candidates pairwise, then verify the last candidate.

## Approach
1. Start candidate at 0
2. If candidate knows `i`, candidate cannot be celebrity
3. Replace candidate with `i`
4. Verify candidate knows nobody
5. Verify everyone knows candidate

## Dry run
If person 2 is known by everyone and knows nobody:

Result: `2`

## Code
```java
class Solution {
    static int celebrity(int[][] matrix) {
        int n = matrix.length;
        int candidate = 0;

        for (int i = 1; i < n; i++) {
            if (matrix[candidate][i] == 1) {
                candidate = i;
            }
        }

        for (int i = 0; i < n; i++) {
            if (i == candidate) continue;

            if (matrix[candidate][i] == 1 ||
                matrix[i][candidate] == 0) {
                return -1;
            }
        }

        return candidate;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: LRU cache (IMPORTANT)
topic: Stack and Queue
difficulty: Hard
pattern: HashMap + Doubly Linked List
link: https://leetcode.com/problems/lru-cache/

## Problem
Design an LRU cache with O(1) get and put operations.

## Core idea
Use a HashMap for direct lookup and a doubly linked list to track usage order.

## Approach
1. Map key to node
2. Keep most recently used node near head
3. On get, move node to front
4. On put, update or insert
5. If capacity exceeds limit, remove least recently used node from tail

## Dry run
Capacity = 2

`put(1,1)`  
`put(2,2)`  
`get(1)` → 1  
`put(3,3)` removes key 2

## Code
```java
import java.util.*;

class LRUCache {
    class Node {
        int key;
        int value;
        Node prev;
        Node next;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    int capacity;
    HashMap<Integer, Node> map = new HashMap<>();
    Node head = new Node(0, 0);
    Node tail = new Node(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;

        Node node = map.get(key);
        remove(node);
        insertFront(node);

        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }

        Node node = new Node(key, value);
        insertFront(node);
        map.put(key, node);

        if (map.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertFront(Node node) {
        node.next = head.next;
        node.prev = head;

        head.next.prev = node;
        head.next = node;
    }
}
```

**Time:** O(1) get/put **Space:** O(capacity)

---

title: LFU cache
topic: Stack and Queue
difficulty: Hard
pattern: Frequency Buckets
link: https://leetcode.com/problems/lfu-cache/

## Problem
Design a cache that removes the least frequently used key. Break ties using least recently used order.

## Core idea
Track each key's frequency and keep an ordered set of keys for every frequency.

## Approach
1. Map key to node
2. Maintain frequency buckets
3. Track minimum frequency
4. On get or put update, move node to next frequency bucket
5. On overflow, remove least recent node from minimum-frequency bucket

## Dry run
Capacity = 2

`put(1,1)`  
`put(2,2)`  
`get(1)` increases freq(1)  
`put(3,3)` removes key 2

## Code
```java
import java.util.*;

class LFUCache {
    int capacity;
    int minFreq = 0;

    HashMap<Integer, Integer> values = new HashMap<>();
    HashMap<Integer, Integer> freq = new HashMap<>();
    HashMap<Integer, LinkedHashSet<Integer>> groups = new HashMap<>();

    public LFUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        if (!values.containsKey(key)) return -1;

        touch(key);
        return values.get(key);
    }

    public void put(int key, int value) {
        if (capacity == 0) return;

        if (values.containsKey(key)) {
            values.put(key, value);
            touch(key);
            return;
        }

        if (values.size() == capacity) {
            LinkedHashSet<Integer> set = groups.get(minFreq);
            int removeKey = set.iterator().next();

            set.remove(removeKey);
            values.remove(removeKey);
            freq.remove(removeKey);
        }

        values.put(key, value);
        freq.put(key, 1);

        groups.computeIfAbsent(1, x -> new LinkedHashSet<>()).add(key);

        minFreq = 1;
    }

    private void touch(int key) {
        int f = freq.get(key);

        groups.get(f).remove(key);

        if (groups.get(f).isEmpty() && minFreq == f) {
            minFreq++;
        }

        freq.put(key, f + 1);

        groups.computeIfAbsent(f + 1, x -> new LinkedHashSet<>()).add(key);
    }
}
```

**Time:** O(1) average get/put **Space:** O(capacity)
