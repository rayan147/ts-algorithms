import { Queue } from "../data-structures";


describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should handle empty queue operations', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
    expect(queue.dequeue()).toBeNull();
    expect(queue.peek()).toBeNull();
  });

  it('should handle clear operation', () => {
    queue.enqueue(1).enqueue(2);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  it('should convert to array correctly', () => {
    queue.enqueue(1).enqueue(2);
    expect(queue.toArray()).toEqual([1, 2]);
  });

  it('should convert to string correctly', () => {
    queue.enqueue(1).enqueue(2);
    expect(queue.toString()).toBe('Queue(1 <-2)');
  });

  it('should maintain FIFO order with multiple operations', () => {
    queue.enqueue(1).enqueue(2);
    expect(queue.peek()).toBe(1);
    expect(queue.size()).toBe(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.peek()).toBe(2);
    expect(queue.size()).toBe(1);
  });
});
