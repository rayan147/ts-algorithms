// linkedList.ts

import LinkedListNode from "./linkedListNode";

/**
 * A generic singly linked list implementation.
 */
export default class LinkedList<T> implements Iterable<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private _size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  /**
   * Get the number of elements in the linked list.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Check if the linked list is empty.
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   *@returns the value of the head if it exists
   *
   */

  peek(): T | null {
    return this.isEmpty() ? null : this.head!.value;
  }

  /**
   * Add a new element at the beginning of the list.
   * @param value The value to prepend.
   * @returns The linked list instance.
   */
  prepend(value: T): this {
    const newNode = new LinkedListNode(value);
    newNode.next = this.head;
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this._size++;
    return this;
  }

  /**
   * Add a new element at the end of the list.
   * @param value The value to append.
   * @returns The linked list instance.
   */
  append(value: T): this {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this._size++;
    return this;
  }

  /**
   * Insert a new element at a specific index.
   * @param value The value to insert.
   * @param index The position to insert the value at.
   * @returns The linked list instance.
   */
  insert(value: T, index: number): this {
    const sanitizedIndex = Math.max(0, Math.min(index, this._size));

    if (sanitizedIndex === 0 || !this.head) {
      return this.prepend(value);
    }

    if (sanitizedIndex === this._size) {
      return this.append(value);
    }

    let currentNode = this.head;
    for (let i = 0; i < sanitizedIndex - 1 && currentNode.next; i++) {
      currentNode = currentNode.next;
    }

    const newNode = new LinkedListNode(value);
    newNode.next = currentNode.next;
    currentNode.next = newNode;
    this._size++;
    return this;
  }

  /**
   * Remove the first occurrence of a value from the list.
   * @param value The value to remove.
   * @returns The removed node or null if not found.
   */
  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    // Handle head deletion
    if (this.head.value === value) {
      const deleteNode = this.head;
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this._size--;
      return deleteNode;
    }

    let currentNode = this.head;
    // Search for the node to delete
    while (currentNode.next) {
      if (currentNode.next.value === value) {
        const deleteNode = currentNode.next;
        currentNode.next = deleteNode.next;
        if (deleteNode === this.tail) {
          this.tail = currentNode;
        }
        this._size--;
        return deleteNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * Remove the last element from the list.
   * @returns The removed node.
   * @throws Error if the list is empty.
   */
  deleteLast(): LinkedListNode<T> | null {
    if (this.isEmpty()) {
      return null
    }

    if (this.head === this.tail) {
      const deleteNode = this.head;
      this.head = null;
      this.tail = null;
      this._size--;
      return deleteNode;
    }

    let currentNode = this.head;
    // Find the second-to-last node
    while (currentNode !== null && currentNode.next && currentNode.next !== this.tail) {
      currentNode = currentNode.next;
    }

    if (currentNode !== null && !currentNode.next) return null;

    // Store the last node to return
    const deleteNode = this.tail;

    // Update tail and remove reference to delete node
    this.tail = currentNode;

    this.tail!.next = null;

    this._size--;
    return deleteNode;
  }

  /**
   * Update the value of a node at a specific index.
   * @param value The new value.
   * @param index The index of the node to update.
   * @returns The linked list instance.
   */
  update(value: T, index: number): this {
    const sanitizedIndex = Math.max(0, Math.min(index, this._size - 1));

    if (!this.head) {
      return this.append(value);
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex < sanitizedIndex && currentNode.next) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    currentNode.value = value;
    return this;
  }

  /**
   * Clear the linked list.
   * @param immediate Whether to immediately clear all node references.
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  /**
   * Validate if the linked list has been properly cleared.
   * @returns True if cleared, else false.
   */
  validateCleared(): boolean {
    return this.head === null && this.tail === null && this._size === 0;
  }

  /**
   * Convert the linked list to an array.
   * @returns An array of values.
   */
  toArray(): T[] {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }

  /**
   * Convert the linked list to a string representation.
   * @returns A string representing the linked list.
   */
  toString(): string {
    return `LinkedList(${this.toArray().join(' -> ')})`;
  }

  /**
   * Clone the linked list.
   * @returns A new linked list that is a deep copy of the current list.
   */
  clone(): LinkedList<T> {
    const newList = new LinkedList<T>();
    if (!this.head) return newList;

    newList.head = this.head.clone();
    let currentOriginal = this.head.next;
    let currentClone = newList.head;

    while (currentOriginal) {
      currentClone.next = new LinkedListNode(currentOriginal.value);
      currentClone = currentClone.next;
      currentOriginal = currentOriginal.next;
    }

    newList.tail = currentClone;
    newList._size = this._size;

    return newList;
  }

  /**
   * Create a linked list from an array.
   * @param values The array of values.
   * @returns A new linked list.
   */
  static fromArray<U>(values: U[]): LinkedList<U> {
    const list = new LinkedList<U>();
    if (values.length === 0) return list;

    list.head = LinkedListNode.fromArray(values);
    let current = list.head;
    while (current && current.next) {
      current = current.next;
    }
    list.tail = current;
    list._size = values.length;

    return list;
  }

  /**
   * Compare this linked list with another for equality.
   * @param other The other linked list to compare with.
   * @returns True if both lists are equal, else false.
   */
  equals(other: LinkedList<T>): boolean {
    return LinkedListNode.areEqual(this.head, other.head);
  }
  /**
   * Find the first node matching the predicate.
   * @param predicate A function to test each element.
   * @returns The found node or null.
   */

  /**
 * Reverse the linked list.
 * @returns The reversed linked list.
 */

  reverse(): this {
    let prev: LinkedListNode<T> | null = null;
    let current = this.head;
    this.tail = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
    return this;
  }

  find(predicate: (value: T) => boolean): LinkedListNode<T> | null {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  deleteHead(): LinkedListNode<T> | null {
    if (!this.head) return null

    const deleteHead = this.head
    this.head = deleteHead.next

    if (!this.head) {
      this.tail = null
    }

    this._size--;
    return deleteHead
  }

  /**
   * Make the linked list iterable.
   */
  [Symbol.iterator](): Iterator<T> {  // Makes object iterable using for...of
    let current = this.head;          // Tracks current node during iteration

    return {
      next(): IteratorResult<T> {     // Required method that returns {value, done}
        if (current) {                // If we have a current node:
          const value = current.value; // Get its value
          current = current.next;      // Move to next node
          return { value, done: false }; // Return value and indicate more items exist
        }
        return { value: undefined as any, done: true }; // End of list reached
      },
    };
  }
}


