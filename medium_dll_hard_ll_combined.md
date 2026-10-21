# Medium DLL and Hard Linked List Problems

---

title: Delete all occurrences of a key in DLL
topic: Doubly Linked List
difficulty: Medium
pattern: Pointer Manipulation
link: https://takeuforward.org/linked-list/delete-all-occurrences-of-a-key-in-dll/

## Problem
Delete every node containing a given key from a doubly linked list.

## Core idea
Whenever a node matches the key, reconnect its previous and next nodes so that the matching node is removed.

## Approach
1. Traverse the doubly linked list
2. Save the next node before deleting
3. If the current node contains the key, reconnect its neighbors
4. Update the head if the first node is deleted
5. Continue until the end

## Dry run
`10 ⇄ 20 ⇄ 10 ⇄ 30`, key = `10`

| current | action | list |
|---|---|---|
| 10 | delete head | 20 ⇄ 10 ⇄ 30 |
| 20 | keep | 20 ⇄ 10 ⇄ 30 |
| 10 | delete | 20 ⇄ 30 |

Result: `20 ⇄ 30`

## Code
```java
class Node {
    int data;
    Node prev;
    Node next;

    Node(int data) {
        this.data = data;
    }
}

class Solution {
    static Node deleteAllOccurrences(Node head, int key) {
        Node current = head;

        while (current != null) {
            Node nextNode = current.next;

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
Given a sorted doubly linked list, find all pairs whose sum equals the target.

## Core idea
Use one pointer from the beginning and another from the end, just like two pointers on a sorted array.

## Approach
1. Set `left` to the head
2. Move `right` to the last node
3. Calculate `left.data + right.data`
4. If the sum is smaller, move left forward
5. If the sum is larger, move right backward
6. If equal, store the pair and move both pointers

## Dry run
`1 ⇄ 2 ⇄ 3 ⇄ 4 ⇄ 5`, target = `6`

| left | right | sum | action |
|---|---|---|---|
| 1 | 5 | 6 | add (1,5) |
| 2 | 4 | 6 | add (2,4) |

Result: `(1,5), (2,4)`

## Code
```java
import java.util.*;

class Solution {
    static List<int[]> findPairs(Node head, int target) {
        List<int[]> result = new ArrayList<>();

        if (head == null) return result;

        Node left = head;
        Node right = head;

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
Remove duplicate nodes from a sorted doubly linked list.

## Core idea
Since the list is sorted, duplicate values are always adjacent.

## Approach
1. Start from the head
2. Compare the current node with the next node
3. If both values are equal, remove the next node
4. Fix both `next` and `prev` pointers
5. Otherwise move forward

## Dry run
`1 ⇄ 1 ⇄ 2 ⇄ 3 ⇄ 3`

| current | next | action |
|---|---|---|
| 1 | 1 | remove duplicate |
| 1 | 2 | move |
| 2 | 3 | move |
| 3 | 3 | remove duplicate |

Result: `1 ⇄ 2 ⇄ 3`

## Code
```java
class Solution {
    static Node removeDuplicates(Node head) {
        Node current = head;

        while (current != null && current.next != null) {
            if (current.data == current.next.data) {
                Node duplicate = current.next;

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
Find each complete group of `k` nodes, reverse the group, and reconnect it to the remaining list.

## Approach
1. Add a dummy node before the head
2. Find the kth node of the current group
3. If fewer than `k` nodes remain, stop
4. Reverse all nodes in the group
5. Connect the reversed group back to the list
6. Continue with the next group

## Dry run
`1 → 2 → 3 → 4 → 5`, `k = 2`

| group | after reverse |
|---|---|
| 1,2 | 2 → 1 |
| 3,4 | 4 → 3 |
| 5 | unchanged |

Result: `2 → 1 → 4 → 3 → 5`

## Code
```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}

class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode groupPrev = dummy;

        while (true) {
            ListNode kth = getKth(groupPrev, k);

            if (kth == null) {
                break;
            }

            ListNode groupNext = kth.next;

            ListNode prev = groupNext;
            ListNode current = groupPrev.next;

            while (current != groupNext) {
                ListNode next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }

            ListNode oldStart = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = oldStart;
        }

        return dummy.next;
    }

    private ListNode getKth(ListNode start, int k) {
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
pattern: Circular Linked List
link: https://leetcode.com/problems/rotate-list/

## Problem
Rotate a linked list to the right by `k` positions.

## Core idea
Connect the tail to the head to form a circle, then break the circle at the correct new tail.

## Approach
1. Find the length of the list
2. Find the tail
3. Set `k = k % length`
4. Connect tail to head
5. Move to the new tail at `length - k - 1`
6. Break the circle and return the new head

## Dry run
`1 → 2 → 3 → 4 → 5`, `k = 2`

| step | list |
|---|---|
| make circle | 1 → 2 → 3 → 4 → 5 → 1 |
| new tail | 3 |
| new head | 4 |

Result: `4 → 5 → 1 → 2 → 3`

## Code
```java
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        int length = 1;
        ListNode tail = head;

        while (tail.next != null) {
            tail = tail.next;
            length++;
        }

        k %= length;

        if (k == 0) {
            return head;
        }

        tail.next = head;

        int steps = length - k - 1;
        ListNode newTail = head;

        for (int i = 0; i < steps; i++) {
            newTail = newTail.next;
        }

        ListNode newHead = newTail.next;
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
pattern: Merge Sorted Lists
link: https://takeuforward.org/linked-list/flattening-a-linked-list/

## Problem
Flatten a linked list where every node has a `next` pointer and a sorted `bottom` linked list.

## Core idea
Flatten the list on the right recursively, then merge the current bottom list with the flattened list.

## Approach
1. If head or head.next is null, return head
2. Recursively flatten the right side
3. Merge the current bottom list with the flattened right list
4. Compare values while merging
5. Connect everything using `bottom`
6. Return the merged head

## Dry run
Top list:

`5 → 10 → 19`

Bottom lists:

`5 ↓ 7 ↓ 8`  
`10 ↓ 20`  
`19 ↓ 22`

Flattened:

`5 ↓ 7 ↓ 8 ↓ 10 ↓ 19 ↓ 20 ↓ 22`

## Code
```java
class Node {
    int data;
    Node next;
    Node bottom;

    Node(int data) {
        this.data = data;
    }
}

class Solution {
    static Node flatten(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        head.next = flatten(head.next);

        return merge(head, head.next);
    }

    private static Node merge(Node a, Node b) {
        Node dummy = new Node(0);
        Node tail = dummy;

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

**Time:** O(total nodes × number of top lists) **Space:** O(number of top lists) recursion stack

---

title: Clone a Linked List with random and next pointer
topic: Linked List
difficulty: Hard
pattern: Interleaving Nodes
link: https://leetcode.com/problems/copy-list-with-random-pointer/

## Problem
Create a deep copy of a linked list where every node has both `next` and `random` pointers.

## Core idea
Insert each copied node directly after its original node. This makes the copied random pointer easy to find without using a HashMap.

## Approach
1. Insert a copied node after every original node
2. Set copied random pointer using `original.random.next`
3. Separate the copied list from the original list
4. Restore the original list
5. Return the copied head

## Dry run
Original:

`7 → 13 → 11`

After inserting copies:

`7 → 7' → 13 → 13' → 11 → 11'`

Then assign random pointers and separate both lists.

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
        if (head == null) {
            return null;
        }

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

        RandomNode copyHead = head.next;
        current = head;

        while (current != null) {
            RandomNode copy = current.next;

            current.next = copy.next;

            if (copy.next != null) {
                copy.next = copy.next.next;
            }

            current = current.next;
        }

        return copyHead;
    }
}
```

**Time:** O(n) **Space:** O(1) auxiliary
