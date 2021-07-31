declare global
{
    interface String
    {   
        /**
         * Returns true if the `value` is empty or whitespace.
         */
        isEmptyOrWhiteSpace(): boolean;
        /**
         * Returns true if the `value` is not empty or not all whitespace.
         */
        isNotEmptyOrWhiteSpace(): boolean;
        /**
         * 
         * Returns true if `primary` string contains `search` substring.
         * 
         * @param search - The search substring.
         */
        contains(search: string): boolean; // native implementation includes
        // startsWith(value: string): boolean; // native implementation exists
        // endsWith(value: string): boolean; // native implementation exists
        /**
         * 
         * Returns `value` with all numbers replaced with whitespace.
         * 
         */
        extractNumbers(): string;
        /**
         * 
         * Returns `value` with all alphabetical characters replaced with whitespace.
         * 
         */
        extractCharacters(): string;
        /**
         * 
         * Returns the formatted string given a string format, `formatString` and an array, `params` to replace the string format. The string retains it's original syntax except the inclusion of `{value}` where `value` is the array index will be replaced `param`'s array index value.
         * 
         * @param params - The array which will replace the certain parts of `formatString`.
         */
        format(...params: any[]): string;
        /**
         * 
         * Returns a string given a `primary` string with all `searchValue` replaced by `replaceValue`.
         * 
         * @param searchValue - The searchValue which is checked on `primary`.
         * @param replaceValue - The replacement value to replace the `searchValue`
         */
        replaceAll(searchValue: string, replaceValue: string): string;
        /**
         * 
         * Returns a base64 encoded string given a `value`.
         * 
         */
        base64Encode(): string;
        /**
         * 
         * Returns a base64 decoded string given a `value`.
         * 
         */
        base64Decode(): string;
        /**
         * 
         * Returns a base64 encoded string given a `value` which is a URL.
         * 
         */
        base64UrlEncode(): string;
        /**
         * 
         * Returns a base64 decoded string given a `value` which contains a URL.
         * 
         */
        base64UrlDecode(): string;
        /**
         * 
         * Returns a hex encode string of a given `value`
         * 
         */
        hexEncode(): string;
        /**
         * 
         * Returns a hex decoded string of a given hex encoded `value`
         * 
         */
        hexDecode(): string;
        /**
         * 
         * Returns true if `primary` matches the format, `format` else, returns false. The `format` uses the follow syntax. 
         * `@` represents an alphabetical character.
         * `#` represents a numerical character.
         * `\` represents an escape character.
         * `*` represents a wildcard, (any length alphanumeric character).
         * 
         * @param format - The format of the string to check for.
         */
        matchesFormat(format: string): boolean;
    }

    interface Object
    {
        // mapToObject(factoryFunc: () => any): any;
        // merge(value: object): void;
        /**
         * 
         * Returns the type name of the `source`.
         * 
         */
        getTypeName(): string;
        /**
         * 
         * Returns a value from a `source` given a `key`.
         * 
         * @param key - The key.
         */
        getValue(key: string): any;
        /**
         * 
         * Sets a `value` on an array given a `target` and the specific `key` to set the value to.
         * 
         * @param key - The key.
         * @param value - The value to set to the `key`.
         */ 
        setValue(key: string, value: any): void;
        /**
         * 
         * Returns a serialize object given the `keys`.
         * 
         * @param keys - The array of keys.
         */
        serializeObject(...keys: Array<string>): object;
        // FIXME: What are these params?
        deserializeObject(targetClassOrObject: Function | object, ...keysOrValues: Array<any>): object;
    }

    interface Array<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        /**
         * 
         * Returns true if the `array` contains a specific value.
         * 
         * @param value - The value being checked for.
         */
        contains(value: T): boolean;
        where(filterFunc: (value: T) => boolean): Array<T>;
        /**
         * 
         * Returns the array ordered by ascending order given an `array`.
         * 
         */
        orderBy(): Array<T>;
        /**
         * 
         * Returns the array ordered by ascending order given an `array` while applying a compareFunc each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         */
        orderBy(compareFunc: (value: T) => any): Array<T>;
        /**
         * 
         * Returns the array ordered by descending order given an `array`.
         * 
         */
        orderByDesc(): Array<T>;
        /**
         * 
         * Returns the array ordered by descending order given an `array` while applying a `compareFunc` each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         */
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        /**
         * 
         * Returns an array of objects which is grouped `array` by its specific `keyFunc`.
         * 
         * @param keyFunc - The callback which contains the keys to be grouped.
         */
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        /**
         * 
         * Returns an array with only distinctive values given an `array`.
         * 
         */
        distinct(): Array<T>;
        /**
         * 
         * Returns an array with only distinctive values given an `array` and while applying a `compareFunc` to each value.
         * 
         * @param compareFunc - The comparison function.
         */
        distinct(compareFunc: (value: T) => any): Array<T>;
        /**
         * 
         * Returns an array given an `array` which does not include the initial elements specified by `count`.
         * 
         * @param count - The number of index to skip.
         */
        skip(count: number): Array<T>;
        /**
         * 
         * Returns an array given an `array` which includes the initial elements up till `count`.
         * 
         * @param count - The number of index to include.
         */
        take(count: number): Array<T>;
        /**
         * 
         * Returns the number of element in an `array`.
         * 
         */
        count(): number;
        /**
         * 
         * Returns the number of element in an `array` which satisfy the `predicate` callback.
         * 
         * @param predicate - The predicate callback to check each value.
         */
        count(predicate: (value: T) => boolean): number;
        /**
         * 
         * Removes a `value` from a given `array`. Returns false if the index is invalid or negative, else returns true.
         * 
         * @param value - The specified value being removed from an array.
         */
        remove(value: T): boolean;
        /**
         * 
         * Removes all elements from an `array`.
         * 
         */
        clear(): void;
        /**
         * 
         * Returns true if the `array` equals the `compareArray` for all indices, else false.
         * 
         * @param compareArray - The comparison array being checked for equality.
         */
        equals(compareArray: ReadonlyArray<T>): boolean;
        /**
         * 
         * Returns true if the `array` equals the `compareArray` while applying a `compareFunc` to each index, else false.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @param compareFunc - The comparison callback which compares a transformed value from both array index. `t1` is the value from `array`. `t2` is the value from the `compareArray`.
         */
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        /**
         * 
         * Returns a promise and provides a asynchronous callback, `asyncFunc` that provides the same functionality as `Array.prototype.forEach()`.
         * 
         * @param asyncFunc - The asynchronous `forEach` callback. 
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        /**
         * 
         * Returns a promise and provides a asynchronous callback, `asyncFunc` that provides the same functionality as `Array.prototype.map()`.
         * 
         * @param asyncFunc - The asynchronous `map` callback. 
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        /**
         * 
         * Returns a promise and provides a asynchronous callback, `asyncFunc` that provides the same functionality as `Array.prototype.reduce()`.
         * 
         * @param asyncFunc - The asynchronous `reduce` callback. 
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }
    
    interface ReadonlyArray<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        /**
         * 
         * Returns true if the `array` contains a specific value.
         * 
         * @param value - The value being checked for.
         */
        contains(value: T): boolean;
        where(filterFunc: (value: T) => boolean): Array<T>;
        /**
         * 
         * Returns the array ordered by ascending order given an `array`.
         * 
         */
        orderBy(): Array<T>;
        /**
         * 
         * Returns the array ordered by ascending order given an `array` while applying a compareFunc each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         */
        orderBy(compareFunc: (value: T) => any): Array<T>;
        /**
         * 
         * Returns the array ordered by descending order given an `array`.
         * 
         */
        orderByDesc(): Array<T>;
        /**
         * 
         * Returns the array ordered by descending order given an `array` while applying a `compareFunc` each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         */
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        /**
         * 
         * Returns an array of objects which is grouped `array` by its specific `keyFunc`.
         * 
         * @param keyFunc - The callback which contains the keys to be grouped.
         */
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        /**
         * 
         * Returns an array with only distinctive values given an `array`.
         * 
         */
        distinct(): Array<T>;
        /**
         * 
         * Returns an array with only distinctive values given an `array` and while applying a `compareFunc` to each value.
         * 
         * @param compareFunc - The comparison function.
         */
        distinct(compareFunc: (value: T) => any): Array<T>;
        /**
         * 
         * Returns an array given an `array` which does not include the initial elements specified by `count`.
         * 
         * @param count - The number of index to skip.
         */
        skip(count: number): Array<T>;
        /**
         * 
         * Returns an array given an `array` which includes the initial elements up till `count`.
         * 
         * @param count - The number of index to include.
         */
        take(count: number): Array<T>;
        /**
         * 
         * Returns the number of element in an `array`.
         * 
         */
        count(): number;
        /**
         * 
         * Returns the number of element in an `array` which satisfy the `predicate` callback.
         * 
         * @param predicate - The predicate callback to check each value.
         */
        count(predicate: (value: T) => boolean): number;
        /**
         * 
         * Removes a `value` from a given `array`. Returns false if the index is invalid or negative, else returns true.
         * 
         * @param value - The specified value being removed from an array.
         */
        remove(value: T): boolean;
        /**
         * 
         * Removes all elements from an `array`.
         * 
         */
        clear(): void;
        /**
         * 
         * Returns true if the `array` equals the `compareArray` for all indices, else false.
         * 
         * @param compareArray - The comparison array being checked for equality.
         */
        equals(compareArray: ReadonlyArray<T>): boolean;
        /**
         * 
         * Returns true if the `array` equals the `compareArray` while applying a `compareFunc` to each index, else false.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @param compareFunc - The comparison callback which compares a transformed value from both array index. `t1` is the value from `array`. `t2` is the value from the `compareArray`.
         */
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        /**
         * 
         * Returns a promise and provides a asynchronous callback, `asyncFunc` that provides the same functionality as `Array.prototype.forEach()`.
         * 
         * @param asyncFunc - The asynchronous `forEach` callback. 
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        /**
         * 
         * Returns a promise and provides a asynchronous callback, `asyncFunc` that provides the same functionality as `Array.prototype.map()`.
         * 
         * @param asyncFunc - The asynchronous `map` callback. 
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        /**
         * 
         * Returns a promise and provides a asynchronous callback, `asyncFunc` that provides the same functionality as `Array.prototype.reduce()`.
         * 
         * @param asyncFunc - The asynchronous `reduce` callback. 
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }   
    
    interface Math
    {
        /**
         * 
         * Returns a percentage value of `partialValue` compared to `wholeValue`.
         * 
         * @param partialValue - The partial value.
         * @param wholeValue - The whole value.
         */
        percentage(partialValue: number, wholeValue: number): number;
        /**
         * 
         * Returns the partial value given a `percentage` and the `wholeValue`.
         * 
         * @param percentage - The percentage calculated for a partial value.
         * @param wholeValue - The whole value.
         */
        percentagePartial(percentage: number, wholeValue: number): number;
        /**
         * 
         * Returns the whole value given a `percentage` and the `partialValue`.
         * 
         * @param percentage - The percentage calculated for a whole value. 
         * @param partialValue - The partial value.
         */
        percentageWhole(percentage: number, partialValue: number): number;
        /**
         * 
         * Returns `min` if the `value` is less than `min`, returns `max` if the `value` greater than `max`, else returns the `value`.
         * 
         * @param value - The value being compared.
         * @param min - The minimum value.
         * @param max - The maximum value.
         */
        clamp(value: number, min: number, max: number): number;
        /**
         * 
         * Returns the median value, if none return null.
         * 
         * @param values - The readonly array being checked.
         */
        median(values: ReadonlyArray<number>): number | null;
    }
}

export { }