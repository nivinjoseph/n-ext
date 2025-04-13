# n-ext

A TypeScript library providing useful extensions for core JavaScript types (Array, String, etc.) with a focus on functional programming and utility methods.

## Installation

```bash
npm install @nivinjoseph/n-ext

or 

yarn add @nivinjoseph/n-ext
```

## Usage

Import the library in your TypeScript/JavaScript project:

```typescript
import '@nivinjoseph/n-ext';
```

## Features

### Array Extensions

The library provides a rich set of array manipulation methods:

```typescript
// Basic operations
const numbers = [1, 2, 3, 4, 5];
numbers.contains(3); // true
numbers.remove(3); // true, removes the first occurrence
numbers.clear(); // empties the array

// Functional operations
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// Ordering
const ordered = users.orderBy(u => u.name); // ascending
const orderedDesc = users.orderByDesc(u => u.name); // descending

// Grouping
const grouped = users.groupBy(u => u.name[0]); // groups by first letter

// Distinct values
const unique = [1, 2, 2, 3, 3, 3].distinct(); // [1, 2, 3]

// Pagination
const page1 = users.skip(0).take(2); // first 2 items
const page2 = users.skip(2).take(2); // next 2 items

// Async operations
await users.forEachAsync(async user => {
    await processUser(user);
}, 2); // process 2 users at a time
```

### String Extensions

Enhanced string manipulation capabilities:

```typescript
// Validation
"".isEmptyOrWhiteSpace(); // true
"  ".isEmptyOrWhiteSpace(); // true
"hello".isEmptyOrWhiteSpace(); // false

// Search
"hello world".contains("world"); // true

// Formatting
StringExt.format("Hello {0}, welcome to {1}", "Alice", "Wonderland"); // "Hello Alice, welcome to Wonderland"

// String cleaning
"abc123".extractNumbers(); // "123"
"abc123".extractCharacters(); // "abc"

// Encoding/Decoding
const encoded = StringExt.base64Encode("hello"); // "aGVsbG8="
const decoded = StringExt.base64Decode(encoded); // "hello"

// URL-safe base64
const urlSafe = StringExt.base64UrlEncode("hello"); // "aGVsbG8"
const decodedUrl = StringExt.base64UrlDecode(urlSafe); // "hello"

// Pattern matching
"abc123".matchesFormat("@@@###"); // true (3 letters followed by 3 numbers)
"abc123".matchesFormat("@@@*"); // true (3 letters followed by anything)
```

### Object Extensions

Enhanced object manipulation capabilities:

```typescript
const obj = { a: 1, b: { c: 2 } };

// Type information
obj.getTypeName(); // "Object"

// Deep property access
obj.getValue("b.c"); // 2

// Deep property assignment
obj.setValue("b.d", 3);
// obj is now { a: 1, b: { c: 2, d: 3 } }
```

### Math Extensions

Enhanced mathematical operations:

```typescript
// Percentage calculations
Math.percentage(25, 100); // 25 (25% of 100)
Math.percentagePartial(25, 100); // 25 (25% of 100)
Math.percentageWhole(25, 25); // 100 (25 is 25% of 100)

// Value clamping
Math.clamp(15, 10, 20); // 15 (within range)
Math.clamp(5, 10, 20); // 10 (clamped to min)
Math.clamp(25, 10, 20); // 20 (clamped to max)

// Statistical operations
Math.median([1, 2, 3, 4, 5]); // 3
Math.median([1, 2, 3, 4]); // 2.5

// Linear space generation
Math.linearSpace(0, 10, 5); // [0, 2.5, 5, 7.5, 10]
```

## API Reference

### Array Methods

- `contains<T>(value: T): boolean` - Checks if array contains a value
- `orderBy<T>(compareFunc?: (value: T) => any): Array<T>` - Sorts array in ascending order
- `orderByDesc<T>(compareFunc?: (value: T) => any): Array<T>` - Sorts array in descending order
- `groupBy<T>(keyFunc: (value: T) => string): Array<{ key: string; values: Array<T>; }>` - Groups array elements by key
- `distinct<T>(compareFunc?: (value: T) => any): Array<T>` - Returns unique elements
- `skip<T>(count: number): Array<T>` - Skips first n elements
- `take<T>(count: number): Array<T>` - Takes first n elements
- `count<T>(predicate?: (value: T) => boolean): number` - Counts elements matching predicate
- `remove<T>(value: T): boolean` - Removes first occurrence of value
- `clear(): void` - Removes all elements
- `equals<T>(compareArray: Array<T>, compareFunc?: (t1: T, t2: T) => boolean): boolean` - Compares arrays
- `forEachAsync<T>(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>` - Async forEach
- `mapAsync<T, U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>` - Async map
- `reduceAsync<T, U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>` - Async reduce

### String Methods

- `isEmptyOrWhiteSpace(): boolean` - Checks if string is empty or whitespace
- `contains(search: string): boolean` - Checks if string contains substring
- `extractNumbers(): string` - Extracts only numbers from string
- `extractCharacters(): string` - Extracts only letters from string
- `format(formatString: string, ...params: any[]): string` - Formats string with parameters
- `base64Encode(): string` - Base64 encodes string
- `base64Decode(): string` - Base64 decodes string
- `base64UrlEncode(): string` - URL-safe Base64 encodes string
- `base64UrlDecode(): string` - URL-safe Base64 decodes string
- `hexEncode(): string` - Hex encodes string
- `hexDecode(): string` - Hex decodes string
- `matchesFormat(format: string): boolean` - Checks if string matches format pattern

### Object Methods

- `getTypeName(): string` - Gets the type name of the object
- `getValue(key: string): any` - Gets a value from the object using dot-notation path
- `setValue(key: string, value: any): void` - Sets a value in the object using dot-notation path

### Math Methods

- `percentage(partialValue: number, wholeValue: number): number` - Calculates percentage
- `percentagePartial(percentage: number, wholeValue: number): number` - Calculates partial value from percentage
- `percentageWhole(percentage: number, partialValue: number): number` - Calculates whole value from percentage
- `clamp(value: number, min: number, max: number): number` - Clamps value between min and max
- `median(values: ReadonlyArray<number>): number | null` - Calculates median of values
- `linearSpace(start: number, end: number, count: number): Array<number>` - Generates evenly spaced numbers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
