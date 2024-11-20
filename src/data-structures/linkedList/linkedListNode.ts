interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export default class LinkedListNode<T> implements Node<T> {
  constructor(
    private _value: T,
    private _next: LinkedListNode<T> | null = null
  ) { }

  public get value(): T {
    return this._value;
  }

  public set value(v: T) {
    this._value = v;
  }

  public get next(): LinkedListNode<T> | null {
    return this._next;
  }

  public set next(node: LinkedListNode<T> | null) {
    this._next = node;
  }

  public isLast(): boolean {
    return this._next === null;
  }

  // Clone method to create a deep copy of the node and its successors
  public clone(): LinkedListNode<T> {
    const clonedNode = new LinkedListNode(this.value);
    if (this.next) {
      clonedNode.next = this.next.clone();
    }
    return clonedNode;
  } public toArray(): T[] {
    const result: T[] = [this.value];
    let current = this._next;

    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }


  public getChainLength(): number {
    let length = 1;
    let current = this._next;

    while (current !== null) {
      length++;
      current = current.next;
    }

    return length;
  }

  public toString(): string {
    const values = this.toArray();
    return `LinkListNode(${values.join('->')})`;
  }

  public static fromArray<U>(values: U[]): LinkedListNode<U> | null {
    if (values.length === 0) return null;

    const head = new LinkedListNode(values[0]);
    let current = head;

    for (let i = 1; i < values.length; i++) {
      const newNode = new LinkedListNode(values[i]);
      current.next = newNode;
      current = newNode;
    }

    return head;
  }

  public static areEqual<U>(node1: LinkedListNode<U> | null, node2: LinkedListNode<U> | null): boolean {
    let current1 = node1;
    let current2 = node2;

    while (current1 !== null && current2 !== null) {
      if (current1.value !== current2.value) {
        return false;
      }
      current1 = current1.next;
      current2 = current2.next;
    }

    // Check if both lists have ended (both null)
    return current1 === null && current2 === null;
  }
}
