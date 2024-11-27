// src/data-structures/stack.ts

import LinkedList from "../LinkedList";


export class Stack<T> implements Iterable<T> {
  private list = new LinkedList<T>()

  push(item: T): this {
    this.list.append(item);
    return this
  }

  pop(): T | null {
    const node = this.list.deleteLast()
    if (node) {
      return node?.value

    }
    return null
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null
    }
    return this.list.peek();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  size(): number {
    return this.list.size;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]()
  }
}


