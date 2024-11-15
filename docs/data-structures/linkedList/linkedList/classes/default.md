[**TypeScript Data Structures v1.0.1**](../../../../README.md) • **Docs**

***

[TypeScript Data Structures v1.0.1](../../../../modules.md) / [data-structures/linkedList/linkedList](../README.md) / default

# Class: default\<T\>

A generic LinkedList implementation that manages a sequence of nodes.
Each node contains a value and a reference to the next node.

## Example

```typescript
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.prepend(0);
console.log(list.size); // 3
```

## Type Parameters

• **T**

The type of elements stored in the LinkedList

## Constructors

### new default()

> **new default**\<`T`\>(`head`, `tail`, `size`): [`default`](default.md)\<`T`\>

#### Parameters

• **head**: `null` = `null`

• **tail**: `null` = `null`

• **size**: `number` = `0`

#### Returns

[`default`](default.md)\<`T`\>

#### Defined in

data-structures/linkedList/linkedList.ts:24

## Properties

### head

> **head**: `null` \| [`default`](../../linkedListNode/classes/default.md)\<`T`\>

#### Defined in

data-structures/linkedList/linkedList.ts:20

***

### size

> **size**: `number`

#### Defined in

data-structures/linkedList/linkedList.ts:22

***

### tail

> **tail**: `null` \| [`default`](../../linkedListNode/classes/default.md)\<`T`\>

#### Defined in

data-structures/linkedList/linkedList.ts:21

## Methods

### append()

> **append**(`value`): [`default`](default.md)\<`T`\>

Adds a new element to the end of the LinkedList.

#### Parameters

• **value**: `T`

The value to append

#### Returns

[`default`](default.md)\<`T`\>

#### Example

```typescript
const list = new LinkedList<number>();
list.append(1); // List: 1
list.append(2); // List: 1 -> 2
```

#### Defined in

data-structures/linkedList/linkedList.ts:67

***

### insert()

> **insert**(`value`, `rawIndex`): [`default`](default.md)\<`T`\>

Inserts a new element at the specified index in the LinkedList.

#### Parameters

• **value**: `T`

The value to insert into the LinkedList

• **rawIndex**: `number`

The position at which to insert the value (normalized to be non-negative)

#### Returns

[`default`](default.md)\<`T`\>

The LinkedList instance for method chaining

#### Remarks

- If rawIndex < 0, the value is inserted at the beginning (index 0)
- If rawIndex >= size, the value is appended to the end
- For valid indices, the value is inserted at the specified position

#### Example

```typescript
const list = new LinkedList<number>();
list.append(1).append(2).append(3);  // List: 1 -> 2 -> 3
list.insert(99, 1);                  // List: 1 -> 99 -> 2 -> 3
```

Visual representation of insertion at index 2:
```
Before insertion of 99 at index 2:
1 -> 2 -> 3 -> 4

Steps:
1. Traverse to node at index 1 (value 2)
2. Create new node (99)
3. Set new node's next to current node's next
4. Set current node's next to new node

After insertion:
1 -> 2 -> 99 -> 3 -> 4
```

Edge cases:
```typescript
// Insert at beginning (index 0 or negative)
list.insert(99, 0);   // Same as prepend
list.insert(99, -1);  // Normalized to index 0

// Insert at end (index >= size)
list.insert(99, 999); // Same as append
```

#### Throws

Throws if value is undefined or null

#### See

 - [prepend](default.md#prepend) For inserting at the beginning
 - [append](default.md#append) For inserting at the end

#### Defined in

data-structures/linkedList/linkedList.ts:139

***

### prepend()

> **prepend**(`value`): [`default`](default.md)\<`T`\>

Adds a new element to the beginning of the LinkedList.

#### Parameters

• **value**: `T`

The value to prepend

#### Returns

[`default`](default.md)\<`T`\>

#### Example

```typescript
const list = new LinkedList<number>();
list.prepend(1); // List: 1
list.prepend(2); // List: 2 -> 1
```

#### Defined in

data-structures/linkedList/linkedList.ts:44
