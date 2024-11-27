import LinkedList from "../data-structures/LinkedList";
import LinkedListNode from "../data-structures/LinkedList/linkedListNode";

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });
  describe('edge cases', () => {
    it('should handle deleting the only element', () => {
      list.append(1);
      const deleted = list.delete(1);
      expect(deleted?.value).toBe(1);
      expect(list.isEmpty()).toBe(true);
    });

    it('should handle deleting head when it matches value', () => {
      list.append(1).append(2);
      const deleted = list.delete(1);
      expect(deleted?.value).toBe(1);
      expect(list.toArray()).toEqual([2]);
    });

    it('should handle deletion when node is tail', () => {
      list.append(1).append(2);
      const deleted = list.delete(2);
      expect(deleted?.value).toBe(2);
      expect(list.toArray()).toEqual([1]);
    });

    it('should handle deleteLast with single node', () => {
      list.append(1);
      const deleted = list.deleteLast();
      expect(deleted?.value).toBe(1);
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('LinkedListNode', () => {
    it('should create node from array', () => {
      const node = LinkedListNode.fromArray([1, 2, 3]);
      if (node) {
        expect(node.value).toBe(1);
        expect(node.next?.value).toBe(2);
        expect(node.next?.next?.value).toBe(3);

      }
    });

    it('should compare nodes for equality', () => {
      const node1 = LinkedListNode.fromArray([1, 2]);
      const node2 = LinkedListNode.fromArray([1, 2]);
      const node3 = LinkedListNode.fromArray([1, 3]);

      expect(LinkedListNode.areEqual(node1, node2)).toBe(true);
      expect(LinkedListNode.areEqual(node1, node3)).toBe(false);
      expect(LinkedListNode.areEqual(node1, null)).toBe(false);
      expect(LinkedListNode.areEqual(null, node1)).toBe(false);
      expect(LinkedListNode.areEqual(null, null)).toBe(true);
    });

    it('should clone nodes deeply', () => {
      const original = new LinkedListNode(1);
      original.next = new LinkedListNode(2);
      const cloned = original.clone();

      expect(cloned.value).toBe(original.value);
      expect(cloned.next?.value).toBe(original.next?.value);
      expect(cloned).not.toBe(original);
      expect(cloned.next).not.toBe(original.next);
    });
  });
  describe('initialization', () => {
    it('should create empty list', () => {
      expect(list.size).toBe(0);
      expect(list.isEmpty()).toBe(true);
      expect(list.toArray()).toEqual([]);
    });
  });

  describe('basic operations', () => {
    it('should append values correctly', () => {
      list.append(1).append(2).append(3);
      expect(list.toArray()).toEqual([1, 2, 3]);
      expect(list.size).toBe(3);
    });

    it('should prepend values correctly', () => {
      list.prepend(1).prepend(2).prepend(3);
      expect(list.toArray()).toEqual([3, 2, 1]);
      expect(list.size).toBe(3);
    });

    it('should insert values at specific positions', () => {
      list.append(1).append(3);
      list.insert(2, 1);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });

    it('should handle insert at invalid indices', () => {
      list.insert(1, -1); // Should insert at beginning
      list.insert(3, 5);  // Should insert at end
      list.insert(2, 1);  // Should insert in middle
      expect(list.toArray()).toEqual([1, 2, 3]);
    });

    it('should return null is peeking at an empty stack', () => {
      const emptyList = new LinkedList<number>();
      expect(emptyList.peek()).toBeNull()
    })

    it('should return the value of the head when peeking', () => {
      list.append(1);
      expect(list.peek()).toBe<number>(1);
    })

  });

  describe('deletion operations', () => {
    beforeEach(() => {
      list.append(1).append(2).append(3).append(4);
    });

    it('should delete specified values', () => {
      const deletedNode = list.delete(2);
      expect(deletedNode?.value).toBe(2);
      expect(list.toArray()).toEqual([1, 3, 4]);
    });

    it('should handle deleting non-existent values', () => {
      const deletedNode = list.delete(5);
      expect(deletedNode).toBeNull();
      expect(list.toArray()).toEqual([1, 2, 3, 4]);
    });

    it('should delete the last element', () => {
      const deletedNode = list.deleteLast();
      expect(deletedNode?.value).toBe(4);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });

    it('should delete the head element', () => {
      const deletedNode = list.deleteHead();
      expect(deletedNode?.value).toBe(1);
      expect(list.toArray()).toEqual([2, 3, 4]);
    });

    it('should throw error when deleting last element from empty list', () => {
      const emptyList = new LinkedList<number>();
      expect(emptyList.deleteLast()).toBeNull()
    });
  });

  describe('update operations', () => {
    beforeEach(() => {
      list.append(1).append(2).append(3);
    });

    it('should update value at specific index', () => {
      list.update(5, 1);
      expect(list.toArray()).toEqual([1, 5, 3]);
    });

    it('should handle update at invalid indices', () => {
      list.update(5, -1); // Should update first element
      list.update(6, 10); // Should update last element
      expect(list.toArray()).toEqual([5, 2, 6]);
    });
  });

  describe('utility operations', () => {
    it('should clear the list', () => {
      list.append(1).append(2).append(3);
      list.clear();
      expect(list.validateCleared()).toBe(true);
      expect(list.isEmpty()).toBe(true);
    });

    it('should convert to string correctly', () => {
      list.append(1).append(2).append(3);
      expect(list.toString()).toBe('LinkedList(1 -> 2 -> 3)');
    });

    it('should create list from array', () => {
      const newList = LinkedList.fromArray([1, 2, 3]);
      expect(newList.toArray()).toEqual([1, 2, 3]);
    });

    it('should clone list correctly', () => {
      list.append(1).append(2).append(3);
      const clonedList = list.clone();
      expect(clonedList.toArray()).toEqual(list.toArray());
      expect(clonedList.equals(list)).toBe(true);
    });
  });

  describe('search operations', () => {
    beforeEach(() => {
      list.append(1).append(2).append(3).append(4);
    });

    it('should find elements using predicate', () => {
      const node = list.find(value => value === 3);
      expect(node?.value).toBe(3);
    });

    it('should return null when element not found', () => {
      const node = list.find(value => value === 5);
      expect(node).toBeNull();
    });
  });

  describe('reverse operation', () => {
    it('should reverse the list correctly', () => {
      list.append(1).append(2).append(3);
      list.reverse();
      expect(list.toArray()).toEqual([3, 2, 1]);
    });

    it('should handle reversing empty list', () => {
      list.reverse();
      expect(list.toArray()).toEqual([]);
    });

    it('should handle reversing single element list', () => {
      list.append(1);
      list.reverse();
      expect(list.toArray()).toEqual([1]);
    });
  });

  describe('iteration', () => {
    it('should be iterable', () => {
      list.append(1).append(2).append(3);
      const values: number[] = [];
      for (const value of list) {
        values.push(value);
      }
      expect(values).toEqual([1, 2, 3]);
    });
  });
});
