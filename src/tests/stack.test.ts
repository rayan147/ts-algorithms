// tests/stack.test.ts
import { Stack } from '../data-structures';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('push adds an item to the stack', () => {
    stack.push(1);
    expect(stack.pop()).toBe(1);
  });

  test('pop removes and returns the last item', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  test('pop returns undefined when stack is empty', () => {
    expect(stack.pop()).toBeUndefined();
  });
});
