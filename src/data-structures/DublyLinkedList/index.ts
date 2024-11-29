class ListNode<T> {
  public data: T

  constructor(public value: T, public prev: ListNode<T> | null = null, public next: ListNode<T> | null = null) {
    this.data = value;
    this.prev = prev
    this.next = next

  }


  toString(): string {
    if (this.data === undefined || this.data === null) {
      throw new Error(`Cant cast null or undefined as a string`)
    }

    return String(this.data)
  }
}

/**
 * A generic doubly linked list implementation in TypeScript.
 * Supports operations like add, remove, and iterate over elements.
 */

/**
 * DoublyLinkedList class implements a generic doubly linked list data structure
 * where each node contains data and references to both next and previous nodes.
 */


export class DoublyLinkedList<T> implements Iterable<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private _size: number;

  /**
   *
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;

    // Implement Iterator interface
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;

    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.data;
          current = current.next;
          return { value, done: false }
        }
        return { value: null, done: true }
      }
    }
  }
  /**
    * Removes all elements from the list
    * Time Complexity: O(n)
    */

  clear(): void {
    let trav = this.head;

    while (trav !== null) {
      const next = trav.next;
      trav.prev = trav.next = null
      trav.data = null as any;
      trav = next;
    }

    /** The null assignments are necessary because even after cleaning individual nodes,
    * the list's head and tail would still point to the first and last nodes without them.   
    */
    this.head = this.tail = null;
    this._size = 0
  }


  /**
 * Returns the current size of the list
 * Time Complexity: O(1)
 */
  get size(): number {
    return this._size;
  }

  /**
    * Checks if the list is empty
    * Time Complexity: O(1)
    */
  isEmpty(): boolean {
    return this.size === 0;
  }


  /**
    * Adds an element to the end of the list
    * Time Complexity: O(1)
    */

  append(elem: T): this {
    this.addLast(elem)
    return this
  }

  /**
     * Adds an element to the end of the list
     * Time Complexity: O(1)
     */

  private addLast(elem: T): void {
    if (this.isEmpty()) {
      this.head = this.tail = new ListNode<T>(elem)
    } else {
      const newNode = new ListNode<T>(elem, this.tail, null);
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  /**
   * Adds an element to the beginning of the list
   * Time Complexity: O(1)
   */
  prepend(elem: T): this {
    this.addFirst(elem)
    return this
  }

  /**
   * Adds an element to the beginning of the list
   * Time Complexity: O(1)
   */
  private addFirst(elem: T): void {
    if (this.isEmpty()) {
      this.head = this.tail = new ListNode<T>(elem);
    } else {
      this.head!.prev = new ListNode<T>(elem, null, this.head);
      this.head = this.head!.prev
    }

    this._size++
  }

  /**
  * Adds an element at a specified index
  * Time Complexity: O(n)
  */

  insertAt(index: number, data: T): this {
    this.addAt(index, data);
    return this
  }

  private addAt(index: number, data: T): void {
    if (index < 0 || index > this.size) {
      throw new Error(`Out of bounce Index, the queue size is ${this.size} and input index is ${index}`)
    }

    if (index === 0) {
      this.addFirst(data)
      return
    }

    if (this.size === index) {
      this.addLast(data)
      return
    }

    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode!.next
    }

    const previousNode = currentNode!.prev
    const newNode = new ListNode<T>(data, previousNode, currentNode);
    previousNode!.next = newNode;
    currentNode!.prev = newNode;

    this._size++
  }
  /**
     * Returns a string representation of the list
     */
  toString(): string {
    const parts: string[] = [];
    let trav = this.head;
    while (trav !== null) {
      parts.push(String(trav.data));
      trav = trav.next;
    }
    return `[ ${parts.join(' -> <- ')} ]`;
  }


} //#endregion

const list = new DoublyLinkedList<number>();
list.prepend(10).prepend(20).append(45).insertAt(2, 475)

for (const iterator of list) {
  console.log(iterator)

}

console.log(list.toString())
