import LinkedList from "../LinkedList";



export class Queue<T> implements Iterable<T> {
  private queue = new LinkedList<T>();

  enqueue(value: T): this {
    this.queue.append(value)
    return this
  }

  dequeue(): T | null {
    const node = this.queue.deleteHead();
    return node?.value ?? null
  }

  peek(): T | null {
    return this.queue.peek()
  }

  isEmpty(): boolean {
    return this.queue.isEmpty()
  }

  size(): number {
    return this.queue.size;
  }

  clear(): void {
    this.queue.clear()
  }

  toArray(): T[] {
    return this.queue.toArray()
  }

  [Symbol.iterator](): Iterator<T> {
    return this.queue[Symbol.iterator]();
  }

  toString(): string {
    return `Queue(${this.toArray().join(' <-')})`;
  }

}
