# Linked List Problems

---

title: Introduction to LinkedList, learn about struct, and how is node represented
topic: Linked List
difficulty: Easy
pattern: Node Representation
link: https://takeuforward.org/linked-list/learn-linked-list/

## Problem
Understand how a singly linked list is represented using nodes.

## Core idea
Each node stores some data and a reference to the next node. The first node is called `head`.

## Approach
1. Create a `Node` class
2. Store the node value in `data`
3. Store the next node reference in `next`
4. Keep a `head` reference to the first node
5. Traverse by repeatedly moving to `next`

## Dry run
`10 → 20 → 30 → null`

| node | data | next |
|---|---|---|
| head | 10 | 20 |
| second | 20 | 30 |
| third | 30 | null |

## Code
```java
class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}
```

**Time:** O(1) to create one node **Space:** O(1) per node

---

title: Inserting a node in LinkedList
topic: Linked List
difficulty: Easy
pattern: Pointer Manipulation
link: https://takeuforward.org/linked-list/insert-at-head-of-linked-list/

## Problem
Insert a new node at the beginning of a singly linked list.

## Core idea
Point the new node to the current head, then make the new node the new head.

## Approach
1. Create a new node
2. Set `newNode.next = head`
3. Update `head = newNode`
4. Return the new head

## Dry run
`head = 20 → 30`

Insert `10`

| step | list |
|---|---|
| create 10 | `10` |
| 10.next = 20 | `10 → 20 → 30` |
| head = 10 | `10 → 20 → 30` |

## Code
```java
class Solution {
    static Node insertAtHead(Node head, int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        return newNode;
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Deleting a node in LinkedList
topic: Linked List
difficulty: Easy
pattern: Pointer Manipulation
link: https://takeuforward.org/linked-list/delete-last-node-of-linked-list/

## Problem
Delete a node with a given value from a singly linked list.

## Core idea
Find the node just before the target and skip the target node by changing one pointer.

## Approach
1. If head is null, return null
2. If head contains the target, return `head.next`
3. Traverse until `current.next` is the target
4. Set `current.next = current.next.next`
5. Return head

## Dry run
`10 → 20 → 30`, delete `20`

| step | list |
|---|---|
| current = 10 | `10 → 20 → 30` |
| skip 20 | `10 → 30` |

## Code
```java
class Solution {
    static Node deleteValue(Node head, int value) {
        if (head == null) return null;

        if (head.data == value) {
            return head.next;
        }

        Node current = head;

        while (current.next != null && current.next.data != value) {
            current = current.next;
        }

        if (current.next != null) {
            current.next = current.next.next;
        }

        return head;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Find the length of the linkedlist [learn traversal]
topic: Linked List
difficulty: Easy
pattern: Traversal
link: https://takeuforward.org/linked-list/length-of-linked-list/

## Problem
Find the number of nodes in a singly linked list.

## Core idea
Traverse from head to null and count every node.

## Approach
1. Set `count = 0`
2. Start from `head`
3. Move through each node
4. Increment count
5. Return count

## Dry run
`10 → 20 → 30 → null`

| node | count |
|---|---|
| 10 | 1 |
| 20 | 2 |
| 30 | 3 |

## Code
```java
class Solution {
    static int length(Node head) {
        int count = 0;

        while (head != null) {
            count++;
            head = head.next;
        }

        return count;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Search an element in the LL
topic: Linked List
difficulty: Easy
pattern: Traversal
link: https://takeuforward.org/linked-list/search-an-element-in-a-linked-list/

## Problem
Check whether a value exists in a singly linked list.

## Core idea
Traverse node by node and compare each value with the target.

## Approach
1. Start at head
2. Compare current node data with target
3. If equal, return true
4. Otherwise move to next node
5. Return false if null is reached

## Dry run
`10 → 20 → 30`, target = `20`

| node | action |
|---|---|
| 10 | not target |
| 20 | found |

## Code
```java
class Solution {
    static boolean search(Node head, int target) {
        while (head != null) {
            if (head.data == target) {
                return true;
            }

            head = head.next;
        }

        return false;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Introduction to DLL, learn about struct, and how is node represented
topic: Doubly Linked List
difficulty: Easy
pattern: Node Representation
link: https://takeuforward.org/linked-list/introduction-to-doubly-linked-list/

## Problem
Understand how a doubly linked list node is represented.

## Core idea
Each node stores data, a pointer to the previous node, and a pointer to the next node.

## Approach
1. Create a `DLLNode` class
2. Store data in `data`
3. Store previous node in `prev`
4. Store next node in `next`
5. Head has `prev = null`

## Dry run
`10 ⇄ 20 ⇄ 30`

| node | prev | data | next |
|---|---|---|---|
| first | null | 10 | 20 |
| second | 10 | 20 | 30 |
| third | 20 | 30 | null |

## Code
```java
class DLLNode {
    int data;
    DLLNode prev;
    DLLNode next;

    DLLNode(int data) {
        this.data = data;
    }
}
```

**Time:** O(1) to create one node **Space:** O(1) per node

---

title: Insert a node in DLL
topic: Doubly Linked List
difficulty: Easy
pattern: Pointer Manipulation
link: https://takeuforward.org/linked-list/insert-at-end-of-doubly-linked-list/

## Problem
Insert a new node at the beginning of a doubly linked list.

## Core idea
Connect the new node to the current head in both directions and update the head.

## Approach
1. Create the new node
2. Set `newNode.next = head`
3. If head exists, set `head.prev = newNode`
4. Make `newNode` the head
5. Return new head

## Dry run
`20 ⇄ 30`

Insert `10`

| step | list |
|---|---|
| newNode.next = 20 | `10 → 20 ⇄ 30` |
| 20.prev = 10 | `10 ⇄ 20 ⇄ 30` |

## Code
```java
class Solution {
    static DLLNode insertAtHead(DLLNode head, int value) {
        DLLNode newNode = new DLLNode(value);

        newNode.next = head;

        if (head != null) {
            head.prev = newNode;
        }

        return newNode;
    }
}
```

**Time:** O(1) **Space:** O(1)

---

title: Delete a node in DLL
topic: Doubly Linked List
difficulty: Easy
pattern: Pointer Manipulation
link: https://takeuforward.org/linked-list/delete-last-node-of-a-doubly-linked-list/

## Problem
Delete a node with a given value from a doubly linked list.

## Core idea
Reconnect the previous and next nodes around the node being deleted.

## Approach
1. Find the target node
2. Connect its previous node to its next node
3. Connect its next node to its previous node
4. Handle deletion of head separately
5. Return head

## Dry run
`10 ⇄ 20 ⇄ 30`, delete `20`

| action | list |
|---|---|
| 10.next = 30 | `10 → 30` |
| 30.prev = 10 | `10 ⇄ 30` |

## Code
```java
class Solution {
    static DLLNode deleteValue(DLLNode head, int value) {
        DLLNode current = head;

        while (current != null && current.data != value) {
            current = current.next;
        }

        if (current == null) return head;

        if (current.prev != null) {
            current.prev.next = current.next;
        } else {
            head = current.next;
        }

        if (current.next != null) {
            current.next.prev = current.prev;
        }

        return head;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Reverse a DLL
topic: Doubly Linked List
difficulty: Easy
pattern: Pointer Reversal
link: https://takeuforward.org/linked-list/reverse-a-doubly-linked-list/

## Problem
Reverse a doubly linked list.

## Core idea
For every node, swap its `prev` and `next` pointers.

## Approach
1. Start from head
2. Swap `prev` and `next`
3. Move using the swapped pointer
4. Continue until null
5. Last processed node becomes new head

## Dry run
`10 ⇄ 20 ⇄ 30`

| step | list direction |
|---|---|
| swap at 10 | 10 points backward |
| swap at 20 | 20 points backward |
| swap at 30 | new head = 30 |

Result: `30 ⇄ 20 ⇄ 10`

## Code
```java
class Solution {
    static DLLNode reverse(DLLNode head) {
        DLLNode current = head;
        DLLNode newHead = null;

        while (current != null) {
            DLLNode temp = current.prev;
            current.prev = current.next;
            current.next = temp;

            newHead = current;
            current = current.prev;
        }

        return newHead;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Middle of a LinkedList [TortoiseHare Method]
topic: Linked List
difficulty: Medium
pattern: Slow and Fast Pointers
link: https://leetcode.com/problems/middle-of-the-linked-list/

## Problem
Find the middle node of a singly linked list.

## Core idea
Move one pointer one step and another pointer two steps. When the fast pointer reaches the end, the slow pointer is at the middle.

## Approach
1. Set `slow = head`
2. Set `fast = head`
3. Move slow by one step
4. Move fast by two steps
5. Return slow when fast reaches the end

## Dry run
`1 → 2 → 3 → 4 → 5`

| slow | fast |
|---|---|
| 1 | 1 |
| 2 | 3 |
| 3 | 5 |

Result: `3`

## Code
```java
class Solution {
    public Node middleNode(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Reverse a LinkedList [Iterative]
topic: Linked List
difficulty: Medium
pattern: Pointer Reversal
link: https://leetcode.com/problems/reverse-linked-list/

## Problem
Reverse a singly linked list iteratively.

## Core idea
Reverse each node's `next` pointer while traversing the list.

## Approach
1. Set `prev = null`
2. Start `current = head`
3. Store next node
4. Point current to prev
5. Move prev and current forward
6. Return prev

## Dry run
`1 → 2 → 3`

| current | prev | action |
|---|---|---|
| 1 | null | 1→null |
| 2 | 1 | 2→1 |
| 3 | 2 | 3→2 |

Result: `3 → 2 → 1`

## Code
```java
class Solution {
    public Node reverseList(Node head) {
        Node prev = null;
        Node current = head;

        while (current != null) {
            Node next = current.next;
            current.next = prev;

            prev = current;
            current = next;
        }

        return prev;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Reverse a LL [Recursive]
topic: Linked List
difficulty: Medium
pattern: Recursion
link: https://leetcode.com/problems/reverse-linked-list/

## Problem
Reverse a singly linked list recursively.

## Core idea
Reverse the remaining list first, then make the next node point back to the current node.

## Approach
1. If head or head.next is null, return head
2. Recursively reverse from `head.next`
3. Make `head.next.next = head`
4. Set `head.next = null`
5. Return new head

## Dry run
`1 → 2 → 3`

| recursion | action |
|---|---|
| reverse(3) | returns 3 |
| node 2 | 3→2 |
| node 1 | 2→1 |

Result: `3 → 2 → 1`

## Code
```java
class Solution {
    public Node reverseList(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        Node newHead = reverseList(head.next);

        head.next.next = head;
        head.next = null;

        return newHead;
    }
}
```

**Time:** O(n) **Space:** O(n) recursion stack

---

title: Detect a loop in LL
topic: Linked List
difficulty: Medium
pattern: Floyd's Cycle Detection
link: https://leetcode.com/problems/linked-list-cycle/

## Problem
Check whether a linked list contains a cycle.

## Core idea
If slow moves one step and fast moves two steps, they will eventually meet if a cycle exists.

## Approach
1. Set slow and fast to head
2. Move slow by one
3. Move fast by two
4. If they meet, return true
5. If fast reaches null, return false

## Dry run
`1 → 2 → 3 → 4`
`    ↑       ↓`
`    ← ← ← ←`

| slow | fast |
|---|---|
| 2 | 3 |
| 3 | 2 |
| 4 | 4 |

Result: `true`

## Code
```java
class Solution {
    public boolean hasCycle(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Find the starting point in LL
topic: Linked List
difficulty: Medium
pattern: Floyd's Cycle Detection
link: https://leetcode.com/problems/linked-list-cycle-ii/

## Problem
Find the node where a cycle begins.

## Core idea
After slow and fast meet inside the cycle, move one pointer back to head. Moving both one step at a time makes them meet at the cycle start.

## Approach
1. Detect a meeting using slow and fast
2. If no meeting occurs, return null
3. Move slow back to head
4. Move both one step at a time
5. Their meeting point is the cycle start

## Dry run
`3 → 2 → 0 → -4`
`    ↑         ↓`
`    ← ← ← ← ←`

Result: node `2`

## Code
```java
class Solution {
    public Node detectCycle(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                slow = head;

                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }

                return slow;
            }
        }

        return null;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Length of Loop in LL
topic: Linked List
difficulty: Medium
pattern: Floyd's Cycle Detection
link: https://takeuforward.org/linked-list/length-of-loop-in-linked-list/

## Problem
Find the number of nodes present inside a linked-list cycle.

## Core idea
After slow and fast meet, keep one pointer fixed and move the other around the cycle until they meet again.

## Approach
1. Detect a cycle using slow and fast
2. When they meet, start count at 1
3. Move one pointer by one step
4. Count until it returns to the meeting node
5. Return count

## Dry run
Cycle: `2 → 3 → 4 → 2`

Counted nodes: `2, 3, 4`

Result: `3`

## Code
```java
class Solution {
    static int loopLength(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                int count = 1;
                Node current = slow.next;

                while (current != slow) {
                    count++;
                    current = current.next;
                }

                return count;
            }
        }

        return 0;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Check if LL is palindrome or not
topic: Linked List
difficulty: Medium
pattern: Middle + Reverse
link: https://leetcode.com/problems/palindrome-linked-list/

## Problem
Check whether a linked list reads the same forward and backward.

## Core idea
Find the middle, reverse the second half, then compare both halves.

## Approach
1. Find the middle using slow and fast
2. Reverse the second half
3. Compare first half and second half
4. If all values match, return true
5. Otherwise return false

## Dry run
`1 → 2 → 2 → 1`

| left | right | match |
|---|---|---|
| 1 | 1 | yes |
| 2 | 2 | yes |

Result: `true`

## Code
```java
class Solution {
    public boolean isPalindrome(Node head) {
        if (head == null || head.next == null) return true;

        Node slow = head;
        Node fast = head;

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        Node second = reverse(slow.next);
        Node first = head;

        while (second != null) {
            if (first.data != second.data) {
                return false;
            }

            first = first.next;
            second = second.next;
        }

        return true;
    }

    private Node reverse(Node head) {
        Node prev = null;

        while (head != null) {
            Node next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }

        return prev;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Segregate odd and even nodes in LL
topic: Linked List
difficulty: Medium
pattern: Pointer Rearrangement
link: https://leetcode.com/problems/odd-even-linked-list/

## Problem
Group nodes at odd positions first, followed by nodes at even positions.

## Core idea
Maintain separate odd and even chains, then connect the odd chain to the start of the even chain.

## Approach
1. Set `odd = head`
2. Set `even = head.next`
3. Save `evenHead`
4. Rearrange odd and even links separately
5. Connect odd tail to `evenHead`

## Dry run
`1 → 2 → 3 → 4 → 5`

Odd positions: `1 → 3 → 5`  
Even positions: `2 → 4`

Result: `1 → 3 → 5 → 2 → 4`

## Code
```java
class Solution {
    public Node oddEvenList(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        Node odd = head;
        Node even = head.next;
        Node evenHead = even;

        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;

            even.next = odd.next;
            even = even.next;
        }

        odd.next = evenHead;

        return head;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Remove Nth node from the back of the LL
topic: Linked List
difficulty: Medium
pattern: Two Pointers
link: https://leetcode.com/problems/remove-nth-node-from-end-of-list/

## Problem
Remove the `n`th node from the end of a linked list.

## Core idea
Keep a gap of `n` nodes between fast and slow pointers.

## Approach
1. Create a dummy node before head
2. Move fast `n` steps ahead
3. Move slow and fast together
4. When fast reaches the last node, slow is before the target
5. Skip the target node

## Dry run
`1 → 2 → 3 → 4 → 5`, n = `2`

Target from end = `4`

Result: `1 → 2 → 3 → 5`

## Code
```java
class Solution {
    public Node removeNthFromEnd(Node head, int n) {
        Node dummy = new Node(0);
        dummy.next = head;

        Node slow = dummy;
        Node fast = dummy;

        for (int i = 0; i < n; i++) {
            fast = fast.next;
        }

        while (fast.next != null) {
            slow = slow.next;
            fast = fast.next;
        }

        slow.next = slow.next.next;

        return dummy.next;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Delete the middle node of LL
topic: Linked List
difficulty: Medium
pattern: Slow and Fast Pointers
link: https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/

## Problem
Delete the middle node of a linked list.

## Core idea
Use slow and fast pointers while keeping track of the node before slow.

## Approach
1. Handle a one-node list
2. Set slow and fast to head
3. Keep `prev` before slow
4. Move slow by one and fast by two
5. Remove slow using `prev.next = slow.next`

## Dry run
`1 → 3 → 4 → 7 → 1 → 2 → 6`

Middle = `7`

Result: `1 → 3 → 4 → 1 → 2 → 6`

## Code
```java
class Solution {
    public Node deleteMiddle(Node head) {
        if (head == null || head.next == null) {
            return null;
        }

        Node slow = head;
        Node fast = head;
        Node prev = null;

        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        prev.next = slow.next;

        return head;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Sort LL
topic: Linked List
difficulty: Medium
pattern: Merge Sort
link: https://leetcode.com/problems/sort-list/

## Problem
Sort a linked list in ascending order.

## Core idea
Use Merge Sort because linked lists can be split and merged efficiently without random access.

## Approach
1. Find the middle node
2. Split the list into two halves
3. Recursively sort both halves
4. Merge the sorted halves
5. Return merged head

## Dry run
`4 → 2 → 1 → 3`

| step | lists |
|---|---|
| split | `4→2` and `1→3` |
| sort halves | `2→4` and `1→3` |
| merge | `1→2→3→4` |

## Code
```java
class Solution {
    public Node sortList(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        Node slow = head;
        Node fast = head.next;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        Node right = slow.next;
        slow.next = null;

        Node left = sortList(head);
        right = sortList(right);

        return merge(left, right);
    }

    private Node merge(Node a, Node b) {
        Node dummy = new Node(0);
        Node tail = dummy;

        while (a != null && b != null) {
            if (a.data <= b.data) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }

            tail = tail.next;
        }

        tail.next = (a != null) ? a : b;

        return dummy.next;
    }
}
```

**Time:** O(n log n) **Space:** O(log n) recursion stack

---

title: Sort a LL of 0's 1's and 2's by changing links
topic: Linked List
difficulty: Medium
pattern: Three Lists
link: https://takeuforward.org/linked-list/sort-a-linked-list-of-0s-1s-and-2s/

## Problem
Sort a linked list containing only `0`, `1`, and `2` by changing links.

## Core idea
Build three separate lists for 0s, 1s, and 2s, then connect them.

## Approach
1. Create dummy heads for 0, 1, and 2 lists
2. Traverse original list
3. Attach each node to the correct list
4. Connect 0-list to 1-list
5. Connect 1-list to 2-list

## Dry run
`1 → 2 → 0 → 1 → 2 → 0`

Lists:

`0 → 0`  
`1 → 1`  
`2 → 2`

Result: `0 → 0 → 1 → 1 → 2 → 2`

## Code
```java
class Solution {
    static Node sort012(Node head) {
        Node zeroDummy = new Node(0);
        Node oneDummy = new Node(0);
        Node twoDummy = new Node(0);

        Node zero = zeroDummy;
        Node one = oneDummy;
        Node two = twoDummy;

        Node current = head;

        while (current != null) {
            if (current.data == 0) {
                zero.next = current;
                zero = zero.next;
            } else if (current.data == 1) {
                one.next = current;
                one = one.next;
            } else {
                two.next = current;
                two = two.next;
            }

            current = current.next;
        }

        zero.next = oneDummy.next != null ? oneDummy.next : twoDummy.next;
        one.next = twoDummy.next;
        two.next = null;

        return zeroDummy.next;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Find the intersection point of Y LL
topic: Linked List
difficulty: Medium
pattern: Two Pointers
link: https://leetcode.com/problems/intersection-of-two-linked-lists/

## Problem
Find the node where two linked lists intersect.

## Core idea
Let both pointers switch to the other list when reaching null. They travel equal total distance and meet at the intersection.

## Approach
1. Set pointer `a` to headA
2. Set pointer `b` to headB
3. Move both one step
4. At null, switch to the other list head
5. Return when `a == b`

## Dry run
A: `4 → 1 → 8 → 4 → 5`  
B: `5 → 6 → 1 → 8 → 4 → 5`

Intersection: node `8`

## Code
```java
class Solution {
    public Node getIntersectionNode(Node headA, Node headB) {
        Node a = headA;
        Node b = headB;

        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }

        return a;
    }
}
```

**Time:** O(n + m) **Space:** O(1)

---

title: Add 1 to a number represented by LL
topic: Linked List
difficulty: Medium
pattern: Reverse + Carry
link: https://takeuforward.org/linked-list/add-one-to-a-number-represented-by-linked-list/

## Problem
Add `1` to a number represented by linked-list digits.

## Core idea
Reverse the list, add one with carry, then reverse again.

## Approach
1. Reverse the list
2. Set carry = 1
3. Add carry to each digit
4. Create a new node if carry remains
5. Reverse back

## Dry run
`1 → 9 → 9`

Number = `199`

After +1 = `200`

Result: `2 → 0 → 0`

## Code
```java
class Solution {
    static Node addOne(Node head) {
        head = reverse(head);

        Node current = head;
        Node prev = null;
        int carry = 1;

        while (current != null && carry > 0) {
            int sum = current.data + carry;
            current.data = sum % 10;
            carry = sum / 10;

            prev = current;
            current = current.next;
        }

        if (carry > 0) {
            prev.next = new Node(carry);
        }

        return reverse(head);
    }

    private static Node reverse(Node head) {
        Node prev = null;

        while (head != null) {
            Node next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }

        return prev;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Add 2 numbers in LL
topic: Linked List
difficulty: Medium
pattern: Carry Simulation
link: https://leetcode.com/problems/add-two-numbers/

## Problem
Add two numbers represented by linked lists where digits are stored in reverse order.

## Core idea
Add corresponding digits together with carry exactly like normal addition.

## Approach
1. Create a dummy result node
2. Traverse both lists
3. Add both digits and carry
4. Store `sum % 10`
5. Update carry to `sum / 10`
6. Add final carry if needed

## Dry run
`2 → 4 → 3` + `5 → 6 → 4`

Represents `342 + 465 = 807`

Result: `7 → 0 → 8`

## Code
```java
class Solution {
    public Node addTwoNumbers(Node l1, Node l2) {
        Node dummy = new Node(0);
        Node tail = dummy;

        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;

            if (l1 != null) {
                sum += l1.data;
                l1 = l1.next;
            }

            if (l2 != null) {
                sum += l2.data;
                l2 = l2.next;
            }

            tail.next = new Node(sum % 10);
            carry = sum / 10;

            tail = tail.next;
        }

        return dummy.next;
    }
}
```

**Time:** O(max(n,m)) **Space:** O(max(n,m)) for output

---

title: Delete all occurrences of a key in DLL
topic: Doubly Linked List
difficulty: Medium
pattern: Pointer Manipulation
link: https://takeuforward.org/linked-list/delete-all-occurrences-of-a-key-in-dll/

## Problem
Delete every node containing a given key from a doubly linked list.

## Core idea
Whenever a matching node is found, reconnect its previous and next nodes around it.

## Approach
1. Traverse the list
2. Save next node before deletion
3. If current value equals key, reconnect neighbors
4. Update head if needed
5. Continue traversal

## Dry run
`10 ⇄ 20 ⇄ 10 ⇄ 30`, key = `10`

Result: `20 ⇄ 30`

## Code
```java
class Solution {
    static DLLNode deleteAll(DLLNode head, int key) {
        DLLNode current = head;

        while (current != null) {
            DLLNode nextNode = current.next;

            if (current.data == key) {
                if (current.prev != null) {
                    current.prev.next = current.next;
                } else {
                    head = current.next;
                }

                if (current.next != null) {
                    current.next.prev = current.prev;
                }
            }

            current = nextNode;
        }

        return head;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Find pairs with given sum in DLL
topic: Doubly Linked List
difficulty: Medium
pattern: Two Pointers
link: https://takeuforward.org/linked-list/find-pairs-with-given-sum-in-doubly-linked-list/

## Problem
Find all pairs in a sorted doubly linked list whose sum equals a target.

## Core idea
Use one pointer from the beginning and another from the end, similar to two pointers on a sorted array.

## Approach
1. Set left to head
2. Move right to the tail
3. Compare `left.data + right.data`
4. Move left if sum is too small
5. Move right if sum is too large
6. Store pair when equal

## Dry run
`1 ⇄ 2 ⇄ 3 ⇄ 4 ⇄ 5`, target = `6`

Pairs: `(1,5), (2,4)`

## Code
```java
import java.util.*;

class Solution {
    static List<int[]> findPairs(DLLNode head, int target) {
        List<int[]> result = new ArrayList<>();

        if (head == null) return result;

        DLLNode left = head;
        DLLNode right = head;

        while (right.next != null) {
            right = right.next;
        }

        while (left != right && right.next != left) {
            int sum = left.data + right.data;

            if (sum == target) {
                result.add(new int[]{left.data, right.data});
                left = left.next;
                right = right.prev;
            } else if (sum < target) {
                left = left.next;
            } else {
                right = right.prev;
            }
        }

        return result;
    }
}
```

**Time:** O(n) **Space:** O(1) excluding output

---

title: Remove duplicates from sorted DLL
topic: Doubly Linked List
difficulty: Medium
pattern: Traversal
link: https://takeuforward.org/linked-list/remove-duplicates-from-sorted-dll/

## Problem
Remove duplicate values from a sorted doubly linked list.

## Core idea
Because the list is sorted, duplicates are adjacent. Remove repeated next nodes directly.

## Approach
1. Start from head
2. Compare current node with next node
3. If values are equal, delete next node
4. Otherwise move current forward
5. Continue to the end

## Dry run
`1 ⇄ 1 ⇄ 2 ⇄ 3 ⇄ 3`

Result: `1 ⇄ 2 ⇄ 3`

## Code
```java
class Solution {
    static DLLNode removeDuplicates(DLLNode head) {
        DLLNode current = head;

        while (current != null && current.next != null) {
            if (current.data == current.next.data) {
                DLLNode duplicate = current.next;

                current.next = duplicate.next;

                if (duplicate.next != null) {
                    duplicate.next.prev = current;
                }
            } else {
                current = current.next;
            }
        }

        return head;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Reverse LL in group of given size K
topic: Linked List
difficulty: Hard
pattern: Group Reversal
link: https://leetcode.com/problems/reverse-nodes-in-k-group/

## Problem
Reverse nodes of a linked list in groups of size `k`.

## Core idea
Find each complete group of `k` nodes, reverse it, then connect it with the previous and next parts.

## Approach
1. Use a dummy node before head
2. Find the kth node of the current group
3. If fewer than k nodes remain, stop
4. Reverse the group
5. Connect reversed group to previous and next sections

## Dry run
`1 → 2 → 3 → 4 → 5`, k = `2`

Groups: `(1,2), (3,4), (5)`

Result: `2 → 1 → 4 → 3 → 5`

## Code
```java
class Solution {
    public Node reverseKGroup(Node head, int k) {
        Node dummy = new Node(0);
        dummy.next = head;

        Node groupPrev = dummy;

        while (true) {
            Node kth = getKth(groupPrev, k);

            if (kth == null) {
                break;
            }

            Node groupNext = kth.next;

            Node prev = groupNext;
            Node current = groupPrev.next;

            while (current != groupNext) {
                Node next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }

            Node oldStart = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = oldStart;
        }

        return dummy.next;
    }

    private Node getKth(Node start, int k) {
        while (start != null && k > 0) {
            start = start.next;
            k--;
        }

        return start;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Rotate a LL
topic: Linked List
difficulty: Hard
pattern: Circular Connection
link: https://leetcode.com/problems/rotate-list/

## Problem
Rotate a linked list to the right by `k` positions.

## Core idea
Connect the tail to the head to form a circle, then break the circle at the new tail.

## Approach
1. Find list length and tail
2. Set `k = k % length`
3. Connect tail to head
4. Move to the new tail at `length - k - 1`
5. Break the circle
6. Return new head

## Dry run
`1 → 2 → 3 → 4 → 5`, k = `2`

Result: `4 → 5 → 1 → 2 → 3`

## Code
```java
class Solution {
    public Node rotateRight(Node head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        int length = 1;
        Node tail = head;

        while (tail.next != null) {
            tail = tail.next;
            length++;
        }

        k %= length;

        if (k == 0) return head;

        tail.next = head;

        int steps = length - k - 1;
        Node newTail = head;

        for (int i = 0; i < steps; i++) {
            newTail = newTail.next;
        }

        Node newHead = newTail.next;
        newTail.next = null;

        return newHead;
    }
}
```

**Time:** O(n) **Space:** O(1)

---

title: Flattening of LL
topic: Linked List
difficulty: Hard
pattern: Merge Lists
link: https://takeuforward.org/linked-list/flattening-a-linked-list/

## Problem
Flatten a linked list where each node has a `next` pointer and a sorted `bottom` list.

## Core idea
Recursively flatten the right side, then merge the current bottom list with the flattened right list.

## Approach
1. Recursively flatten `head.next`
2. Merge current list with flattened next list
3. Compare values through `bottom` pointers
4. Build one sorted bottom chain
5. Return merged head

## Dry run
Top nodes:

`5 → 10 → 19`

Bottom chains:

`5 ↓ 7 ↓ 8`  
`10 ↓ 20`  
`19 ↓ 22`

Flattened result:

`5 ↓ 7 ↓ 8 ↓ 10 ↓ 19 ↓ 20 ↓ 22`

## Code
```java
class BottomNode {
    int data;
    BottomNode next;
    BottomNode bottom;

    BottomNode(int data) {
        this.data = data;
    }
}

class Solution {
    static BottomNode flatten(BottomNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        head.next = flatten(head.next);

        return merge(head, head.next);
    }

    private static BottomNode merge(BottomNode a, BottomNode b) {
        BottomNode dummy = new BottomNode(0);
        BottomNode tail = dummy;

        while (a != null && b != null) {
            if (a.data <= b.data) {
                tail.bottom = a;
                a = a.bottom;
            } else {
                tail.bottom = b;
                b = b.bottom;
            }

            tail = tail.bottom;
            tail.next = null;
        }

        tail.bottom = (a != null) ? a : b;

        return dummy.bottom;
    }
}
```

**Time:** O(total nodes × number of top lists) in simple recursive merge **Space:** O(number of top lists) recursion stack

---

title: Clone a Linked List with random and next pointer
topic: Linked List
difficulty: Hard
pattern: Interleaving Nodes
link: https://leetcode.com/problems/copy-list-with-random-pointer/

## Problem
Create a deep copy of a linked list where every node has `next` and `random` pointers.

## Core idea
Insert each copied node directly after its original node. This allows random pointers to be assigned without a HashMap.

## Approach
1. Insert a copy after every original node
2. Set copy's random using `original.random.next`
3. Separate original and copied lists
4. Restore original links
5. Return copied head

## Dry run
Original:

`7 → 13 → 11`

After interleaving:

`7 → 7' → 13 → 13' → 11 → 11'`

Then assign random pointers and separate.

## Code
```java
class RandomNode {
    int val;
    RandomNode next;
    RandomNode random;

    RandomNode(int val) {
        this.val = val;
    }
}

class Solution {
    public RandomNode copyRandomList(RandomNode head) {
        if (head == null) return null;

        RandomNode current = head;

        while (current != null) {
            RandomNode copy = new RandomNode(current.val);
            copy.next = current.next;
            current.next = copy;
            current = copy.next;
        }

        current = head;

        while (current != null) {
            if (current.random != null) {
                current.next.random = current.random.next;
            }

            current = current.next.next;
        }

        RandomNode dummy = new RandomNode(0);
        RandomNode copyTail = dummy;
        current = head;

        while (current != null) {
            RandomNode copy = current.next;
            current.next = copy.next;

            copyTail.next = copy;
            copyTail = copy;

            current = current.next;
        }

        return dummy.next;
    }
}
```

**Time:** O(n) **Space:** O(1) auxiliary
