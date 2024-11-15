interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export default class LinkedListNode<T> implements Node<T> {
  public _value: T;
  public _next: Node<T> | null;

  constructor(value: T, next: Node<T> | null = null) {
    this._value = value;
    this._next = next;
  }


  public get value(): T {
    return this._value;
  }


  public set value(v: T) {
    this._value = v;
  }

  public get next(): Node<T> | null {
    return this._next
  }


  public set next(node: Node<T> | null) {
    this._next = node;
  }

  isLast(): boolean {
    return this._next === null;
  }

  clone(): LinkedListNode<T> {
    return new LinkedListNode<T>(this._value, this._next)
  }


  toArray(): T[] {
    const result: T[] = [this.value];
    let current: Node<T> | null = this._next;

    while (current !== null) {
      result.push(current.value)
      current = current.next
    }

    return result
  }

  getChainLength(): number {
    let length = 1;
    let current: Node<T> | null = this._next;

    while (current !== null) {
      length++;
      current = current.next;
    }

    return length
  }


  toString(): string {
    const values = this.toArray();
    return `LinkListNode(${values.join('->')})`;

  }

  // Static method to create a chain of nodes from an array
  static fromArray<U>(values: U[]): LinkedListNode<U> | null {
    if (values.length === 0) return null;

    const head = new LinkedListNode(values[0]);
    let current = head;

    for (let i = 1; i < values.length; i++) {
      current.next = new LinkedListNode(values[i]);
      current = current.next as LinkedListNode<U>
    }

    return head;
  }

  static areEqual<U>(node1: Node<U> | null, node2: Node<U> | null): boolean {
    let current1 = node1;
    let current2 = node2;

    while (current1 !== null && current2 !== null) {
      if (current1.value !== current2.value) {
        return false
      }

      current1 = current1.next;
      current2 = current2.next
    }
    return current1 !== null && current2 !== null
  }

}
