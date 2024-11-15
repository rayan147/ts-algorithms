[**TypeScript Data Structures v1.0.1**](../../../../README.md) • **Docs**

***

[TypeScript Data Structures v1.0.1](../../../../modules.md) / [data-structures/linkedList/linkedListNode](../README.md) / default

# Class: default\<T\>

## Type Parameters

• **T**

## Implements

- `Node`\<`T`\>

## Constructors

### new default()

> **new default**\<`T`\>(`value`, `next`): [`default`](default.md)\<`T`\>

#### Parameters

• **value**: `T`

• **next**: `null` \| `Node`\<`T`\> = `null`

#### Returns

[`default`](default.md)\<`T`\>

#### Defined in

data-structures/linkedList/linkedListNode.ts:10

## Properties

### \_next

> **\_next**: `null` \| `Node`\<`T`\>

#### Defined in

data-structures/linkedList/linkedListNode.ts:8

***

### \_value

> **\_value**: `T`

#### Defined in

data-structures/linkedList/linkedListNode.ts:7

## Accessors

### next

#### Get Signature

> **get** **next**(): `null` \| `Node`\<`T`\>

##### Returns

`null` \| `Node`\<`T`\>

#### Set Signature

> **set** **next**(`node`): `void`

##### Parameters

• **node**: `null` \| `Node`\<`T`\>

##### Returns

`void`

#### Implementation of

`Node.next`

#### Defined in

data-structures/linkedList/linkedListNode.ts:25

***

### value

#### Get Signature

> **get** **value**(): `T`

##### Returns

`T`

#### Set Signature

> **set** **value**(`v`): `void`

##### Parameters

• **v**: `T`

##### Returns

`void`

#### Implementation of

`Node.value`

#### Defined in

data-structures/linkedList/linkedListNode.ts:16

## Methods

### clone()

> **clone**(): [`default`](default.md)\<`T`\>

#### Returns

[`default`](default.md)\<`T`\>

#### Defined in

data-structures/linkedList/linkedListNode.ts:38

***

### getChainLength()

> **getChainLength**(): `number`

#### Returns

`number`

#### Defined in

data-structures/linkedList/linkedListNode.ts:55

***

### isLast()

> **isLast**(): `boolean`

#### Returns

`boolean`

#### Defined in

data-structures/linkedList/linkedListNode.ts:34

***

### toArray()

> **toArray**(): `T`[]

#### Returns

`T`[]

#### Defined in

data-structures/linkedList/linkedListNode.ts:43

***

### toString()

> **toString**(): `string`

Returns a string representation of an object.

#### Returns

`string`

#### Defined in

data-structures/linkedList/linkedListNode.ts:68

***

### areEqual()

> `static` **areEqual**\<`U`\>(`node1`, `node2`): `boolean`

#### Type Parameters

• **U**

#### Parameters

• **node1**: `null` \| `Node`\<`U`\>

• **node2**: `null` \| `Node`\<`U`\>

#### Returns

`boolean`

#### Defined in

data-structures/linkedList/linkedListNode.ts:89

***

### fromArray()

> `static` **fromArray**\<`U`\>(`values`): `null` \| [`default`](default.md)\<`U`\>

#### Type Parameters

• **U**

#### Parameters

• **values**: `U`[]

#### Returns

`null` \| [`default`](default.md)\<`U`\>

#### Defined in

data-structures/linkedList/linkedListNode.ts:75
