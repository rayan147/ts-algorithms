# TypeScript Algorithms and Data Structures

A collection of algorithms and data structures implemented in TypeScript.

## Installation

```bash
npm install @rayan147/ts-algorithms
# or
pnpm add @rayan147/ts-algorithms
```

## Usage

## Stack

```typescript
import { Stack } from "@rayan147/ts-algorithms";

const stack = new Stack<number>();
stack.push(1).push(2);
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
```

## Queue

```typescript
import { LinkedList } from "@rayan147/ts-algorithms";

const list = new LinkedList<number>();
list.append(1).append(2);
list.prepend(0);
console.log(list.toArray()); // [0, 1, 2]
```

## Testing

```bash
# working on getting this to a higher coverage
pnpm test
```

## Features

- Type-safe implementations
- Iterable data structures
- Chainable operations
- Comprehensive error handling

## License

MIT
