import LinkedListNode from "./linkedListNode";


/**
 * A generic LinkedList implementation that manages a sequence of nodes.
 * Each node contains a value and a reference to the next node.
 * 
 * @template T - The type of elements stored in the LinkedList
 * @example
 * ```typescript
 * const list = new LinkedList<number>();
 * list.append(1);
 * list.append(2);
 * list.prepend(0);
 * console.log(list.size); // 3
 * ```
 */

export default class LinkedList<T> {
  public head: LinkedListNode<T> | null;
  public tail: LinkedListNode<T> | null;
  public _size: number

  constructor(head = null, tail = null, size = 0) {
    this.head = head;
    this.tail = tail;
    this._size = size;
  }

  get size(): number {
    return this._size;
  }

  /**
   * Adds a new element to the beginning of the LinkedList.
   * 
   * @param {T} value - The value to prepend
   * @returns {void}
   * 
   * @example
   * ```typescript
   * const list = new LinkedList<number>();
   * list.prepend(1); // List: 1
   * list.prepend(2); // List: 2 -> 1
   * ```
   */



  prepend(value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode

    if (!this.tail) this.tail = newNode;

    this._size++
    return this
  }

  /**
   * Adds a new element to the end of the LinkedList.
   * 
   * @param {T} value - The value to append
   * @returns {void}
   * 
   * @example
   * ```typescript
   * const list = new LinkedList<number>();
   * list.append(1); // List: 1
   * list.append(2); // List: 1 -> 2
   * ```
   */
  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }

    this._size++;
    return this;
  }


  /**
   * Inserts a new element at the specified index in the LinkedList.
   * 
   * @param {T} value - The value to insert into the LinkedList
   * @param {number} rawIndex - The position at which to insert the value (normalized to be non-negative)
   * @returns {LinkedList<T>} The LinkedList instance for method chaining
   * 
   * @remarks
   * - If rawIndex < 0, the value is inserted at the beginning (index 0)
   * - If rawIndex >= size, the value is appended to the end
   * - For valid indices, the value is inserted at the specified position
   * 
   * @example
   * ```typescript
   * const list = new LinkedList<number>();
   * list.append(1).append(2).append(3);  // List: 1 -> 2 -> 3
   * list.insert(99, 1);                  // List: 1 -> 99 -> 2 -> 3
   * ```
   * 
   * Visual representation of insertion at index 2:
   * ```
   * Before insertion of 99 at index 2:
   * 1 -> 2 -> 3 -> 4
   * 
   * Steps:
   * 1. Traverse to node at index 1 (value 2)
   * 2. Create new node (99)
   * 3. Set new node's next to current node's next
   * 4. Set current node's next to new node
   * 
   * After insertion:
   * 1 -> 2 -> 99 -> 3 -> 4
   * ```
   * 
   * Edge cases:
   * ```typescript
   * // Insert at beginning (index 0 or negative)
   * list.insert(99, 0);   // Same as prepend
   * list.insert(99, -1);  // Normalized to index 0
   * 
   * // Insert at end (index >= size)
   * list.insert(99, 999); // Same as append
   * ```
   * 
   * @throws {TypeError} Throws if value is undefined or null
   * 
   * @see {@link prepend} For inserting at the beginning
   * @see {@link append} For inserting at the end
   */

  insert(value: T, rawIndex: number): LinkedList<T> {
    const index = rawIndex < 0 ? 0 : rawIndex;

    if (index === 0 || !this.head) return this.prepend(value)

    if (index >= this._size) return this.append(value)

    let currentnode = this.head

    for (let i = 0; i < index - 1; i++) {
      currentnode = currentnode.next as LinkedListNode<T>;
    }

    const newnode = new LinkedListNode<T>(value, currentnode.next)

    currentnode.next = newnode
    this._size++
    return this

  }

  /**
   *@param {T}  value
   *@returns {LinkedListNode<T> | null}
   *
   *
   *
   */
  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) return null;

    let deleteNode: null | LinkedListNode<T> = new LinkedListNode<T>(value)


    while (this.head && this.areEqual(this.head, deleteNode)) {
      deleteNode = this.head;
      this.head = this.head.next as LinkedListNode<T>;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.areEqual(
          currentNode.next as LinkedListNode<T>, deleteNode)) {
          deleteNode = currentNode.next as LinkedListNode<T>;
          currentNode.next = currentNode.next?.next
        }
        currentNode = currentNode.next as LinkedListNode<T>
      }
    }
    this._size--;
    return deleteNode
  }

  private areEqual(value1: LinkedListNode<T>, value2: LinkedListNode<T>): boolean {
    if (value1.value === value2.value) return true
    return false

  }
  /**
   * Clears all elements from the LinkedList.
   * 
   * @returns {void}
   * 
   * @example
   * ```typescript
   * const list = new LinkedList<number>();
   * list.append(1);
   * list.clear();
   * console.log(list.size); // 0
   * ```
   */
  clear(): void {
    this.head = null;
    this._size = 0;
  }

  /**
   * Converts the LinkedList to an array of values (not nodes).
   * 
   * @returns {T[]} An array containing all values in the LinkedList
   * 
   * @example
   * ```typescript
   * const list = new LinkedList<number>();
   * list.append(1).append(2);
   * console.log(list.toArray()); // [1, 2]
   * ```
   */
  toArray(): T[] {  // Changed return type to T[] instead of LinkedListNode<T>[]
    const values: T[] = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      values.push(currentNode.value);  // Push the value, not the entire node
      currentNode = currentNode.next as LinkedListNode<T>;
    }

    return values;
  }

  /**
 * Checks if the LinkedList is empty.
 * 
 * @returns {boolean} True if the LinkedList has no elements, false otherwise
 * 
 * @example
 * ```typescript
 * const list = new LinkedList<number>();
 * console.log(list.isEmpty()); // true
 * list.append(1);
 * console.log(list.isEmpty()); // false
 * ```
 */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
  * @return {string}
  */
  toString(): string {
    return `LinkList(${this.toArray().join(' -> ')})`;
  }


  // update(value: T, rawIndex: number): LinkedList<T> {
  //   const index = rawIndex < 0 ? 0 : rawIndex;
  //   if (index >= this._size) return this.append(value)
  //
  //   let currentNode = this.head
  //
  //   for (let i = 0; i < index; i++) {
  //     if (currentNode === null) throw new Error('index out of bound')
  //     currentNode = currentNode.next as LinkedListNode<T>
  //   }
  //
  //   if (currentNode) {
  //     currentNode.value = value
  //
  //   }
  //   return this
  // }

  update(value: T, rawIndex: number): LinkedList<T> {
    const index = rawIndex < 0 ? 0 : rawIndex;

    if (!this.head) {
      const newNode = new LinkedListNode<T>(value)
      this.head = newNode
      if (!this.tail) this.tail = newNode;
      this._size++
      return this
    }

    if (index >= this._size) {
      const newNode = new LinkedListNode<T>(value)
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode

      }


    }

    let currentNode = this.head;
    let currentIndex = 0;


    while (currentIndex < index && currentNode !== null) {
      currentNode = currentNode.next as LinkedListNode<T>;
      console.log(currentNode)
      currentIndex++

    }

    if (currentNode) {
      currentNode.value = value

    }

    return this

  }

}



const list = new LinkedList<number>();
list.append(1).append(2).append(3).prepend(0);  // List: 1 -> 2 -> 3
list.insert(99, 1);                  // List: 1 -> 99 -> 2 -> 3
list.insert(120, 1).insert(47, 0).update(10, 7)
  .update(541, 0)
const size = list.size
const str = list.toString()


console.log({
  str,
  size,
})

