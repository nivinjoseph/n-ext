declare global
{
    interface String
    {   
        /**
         * @description Checks if the string is either empty or whitespace.
         * 
         * @returns True if it is empty or only contains whitespace.
         */
        isEmptyOrWhiteSpace(): boolean;
        /**
         * @description Checks if the string is neither empty or whitespace.
         * 
         * @returns True if it is not empty or does not only contains whitespace.
         */
        isNotEmptyOrWhiteSpace(): boolean;
        /**
         * @description Checks if the string contains a substring, `search`.
         * 
         * @param search - The substring being check for inside the string.
         * @returns True if the string contains the search substring.
         */
        contains(search: string): boolean; // native implementation includes
        // startsWith(value: string): boolean; // native implementation exists
        // endsWith(value: string): boolean; // native implementation exists
        /**
         * @description Extracts all the numbers from a string.
         * 
         * @returns The numbers inside the given string.
         */
        extractNumbers(): string;
        /**
         * @description Extracts all the alphabetical characters from a string.
         * 
         * @returns The alphabetical characters inside the given string.
         */
        extractCharacters(): string;
        /**
         * @description Checks over the string to see if it contains, "{#}" where "#" is an integer; the integer corresponds to the index of the given array, `params`, and will be used to replace all "{#}" inside a given string.
         * 
         * @test
         * ```ts
         * console.log("my name is {0} {1}".format("Viola", "Deluca"));
         * ```
         * 
         * @param params - The array which replaces all instances of "{#}" on the string, where "#" is an integer corresponding to the index of the array and which element to replace it with.
         * @returns The formatted string.
         */
        format(...params: any[]): string;
        /**
         * @description Replaces all instances of `searchValue` substring inside the string with the `replaceValue` string.
         * 
         * @param searchValue - The substring being searched for.
         * @param replaceValue - The string replacing the search value.
         * @returns The formatted string with the values replaced.
         */
        replaceAll(searchValue: string, replaceValue: string): string;
        /**
         * @description Base64 encodes the string.
         * 
         * @returns The based64 encoded string.
         */
        base64Encode(): string;
        /**
         * @description Base64 decodes the string.
         * 
         * @returns The based64 decoded string.
         */
        base64Decode(): string;
        /**
         * @description Base64 encodes the string that contains a URL.
         * 
         * @returns The based64 encoded string.
         */
        base64UrlEncode(): string;
        /**
         * @description Base64 decodes the string that contains a URL.
         * 
         * @returns The based64 decoded string.
         */
        base64UrlDecode(): string;
        /**
         * @description Hex encodes the string.
         * 
         * @returns The hex encoded string.
         */
        hexEncode(): string;
        /**
         * @description Hex decodes the string.
         * 
         * @returns The hex decoded string.
         */
        hexDecode(): string;
        /**
         * @description Checks to see if the string uses the follows the `format`. The `format` uses the follow syntax. 
         * `@` represents an alphabetical character.
         * `#` represents a numerical character.
         * `\` represents an escape character.
         * `*` represents a wildcard, (any length alphanumeric character).
         * 
         * @example
         * ```ts
         * console.log("aAzZ09".matchesFormat("@@@@##"));
         * console.log("12testing".matchesFormat("##test@@@"));
         * console.log("01\\31\\20##".matchesFormat("##\\\\##\\\\##\\#\\#"));
         * console.log("*hello*".matchesFormat("\\**\\*"));
         * ```
         * 
         * @param format - The format of the string to check for.
         * @returns true if the string matches the format.
         */
        matchesFormat(format: string): boolean;
    }

    interface Object
    {
        // mapToObject(factoryFunc: () => any): any;
        // merge(value: object): void;
        /**
         * @description Gets the type name of the object.
         * 
         * @returns The type name.
         */
        getTypeName(): string;
        /**
         * 
         * @description Gets the value inside of an object given a `key`
         * 
         * @param key - The key to locate the value.
         * @returns The value.
         */
        getValue(key: string): any;
        /**
         * 
         * Sets a `value` on the object with the specified `key`.
         * 
         * @param key - The key.
         * @param value - The value to set to the `key`.
         */ 
        setValue(key: string, value: any): void;
        /**
         * @deprecated
         */
        serializeObject(...keys: Array<string>): object; // FIXME: Skeleton Code
        /**
         * @deprecated
         */
        deserializeObject(targetClassOrObject: Function | object, ...keysOrValues: Array<any>): object; // FIXME: Skeleton Code
    }

    interface Array<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        /**
         * @description Checks to see if the array contains a value.
         * 
         * @param value - The value being checked for.
         * @returns True if the value is inside the array.
         */
        contains(value: T): boolean;
        /**
         * @description Filters the array for only true values after checking it against the `filterFunc`.
         * 
         * @param filterFunc - The method checking each iteration of the array element.
         * @returns The filtered array where each element of the array is true from filter function.
         */
        where(filterFunc: (value: T) => boolean): Array<T>;
        /**
         * @description Sorts the array by ascending order.
         * 
         * @returns The sorted array.
         */
        orderBy(): Array<T>;
        /**
         * @description Sorts the array by ascending order while applying a `compareFunc` to each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderBy(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Sorts the array by descending order.
         * 
         * @returns The sorted array.
         */
        orderByDesc(): Array<T>;
        /**
         * @description Sorts the array by descending order while applying a `compareFunc` to each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Iterates through an array of objects and uses `keyFunc` to determine what keys will be
         * used to create a new array grouped by those keys.
         * 
         * @param keyFunc - The function which contains the keys to be grouped.
         * @returns The grouped array of object.
         */
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        /**
         * @description Checks for duplicates value within an array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(): Array<T>;
        /**
         * @description Checks for duplicates value within an array while applying `compareFunc` to each elements
         * inside the array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Creates a new array based on `count` being the initial amount of element being skipped.
         * 
         * @param count - The number of elements to skip.
         * @returns The array with initial count elements removed.
         */
        skip(count: number): Array<T>;
        /**
         * @description Creates a new array with the initial elements of the array up till `count.
         * 
         * @param count - The number of elements to include.
         * @returns The array with only the initial elements up till count.
         */
        take(count: number): Array<T>;
        /**
         * @description Finds the length of the array.
         * 
         * @returns The length of the array.
         */
        count(): number;
        /**
         * @description Finds the number of the array that satisfies the `predicate`.
         * 
         * @param predicate - The predicate function to check each value.
         * @returns The amount of the array which satisfies the predicate.
         */
        count(predicate: (value: T) => boolean): number;
        /**
         * @description Removes all instances of `value` from the array. 
         * 
         * @param value - The specified value being removed from an array.
         * @returns True, if a value has been removed.
         */
        remove(value: T): boolean;
        /**
         * @description Remove all elements from an array.
         * 
         * @returns An empty array.
         */
        clear(): void;
        /**
         * 
         * @description Checks if the array equals the `compareArray` for all indices.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @returns True if the the array exactly matches.
         */
        equals(compareArray: ReadonlyArray<T>): boolean;
        /**
         * @description Checks if the array equals the `compareArray` while applying a `compareFunc` to each elements.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @param compareFunc - The comparison function which compares a transformed value from both array index. 
         * `t1` is the value from `array`. `t2` is the value from the `compareArray`.
         * @returns True if the array matches with the compareFunc.
         */
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        /**
         * @description Has the same functionality as `Array.prototype.forEach` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        /**
         * @description Has the same functionality as `Array.prototype.map` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        /**
         * @description Has the same functionality as `Array.prototype.reduce` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }
    
    interface ReadonlyArray<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        /**
         * @description Checks to see if the array contains a value.
         * 
         * @param value - The value being checked for.
         * @returns True if the value is inside the array.
         */
        contains(value: T): boolean;
        /**
         * @description Filters the array for only true values after checking it against the `filterFunc`.
         * 
         * @param filterFunc - The method checking each iteration of the array element.
         * @returns The filtered array where each element of the array is true from filter function.
         */
        where(filterFunc: (value: T) => boolean): Array<T>;
        /**
         * @description Sorts the array by ascending order.
         * 
         * @returns The sorted array.
         */
        orderBy(): Array<T>;
        /**
         * @description Sorts the array by ascending order while applying a `compareFunc` to each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderBy(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Sorts the array by descending order.
         * 
         * @returns The sorted array.
         */
        orderByDesc(): Array<T>;
        /**
         * @description Sorts the array by descending order while applying a `compareFunc` to each value.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Iterates through an array of objects and uses `keyFunc` to determine what keys will be
         * used to create a new array grouped by those keys.
         * 
         * @param keyFunc - The function which contains the keys to be grouped.
         * @returns The grouped array of object.
         */
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        /**
         * @description Checks for duplicates value within an array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(): Array<T>;
        /**
         * @description Checks for duplicates value within an array while applying `compareFunc` to each elements
         * inside the array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Creates a new array based on `count` being the initial amount of element being skipped.
         * 
         * @param count - The number of elements to skip.
         * @returns The array with initial count elements removed.
         */
        skip(count: number): Array<T>;
        /**
         * @description Creates a new array with the initial elements of the array up till `count.
         * 
         * @param count - The number of elements to include.
         * @returns The array with only the initial elements up till count.
         */
        take(count: number): Array<T>;
        /**
         * @description Finds the length of the array.
         * 
         * @returns The length of the array.
         */
        count(): number;
        /**
         * @description Finds the number of the array that satisfies the `predicate`.
         * 
         * @param predicate - The predicate function to check each value.
         * @returns The amount of the array which satisfies the predicate.
         */
        count(predicate: (value: T) => boolean): number;
        /**
         * @description Removes all instances of `value` from the array. 
         * 
         * @param value - The specified value being removed from an array.
         * @returns True, if a value has been removed.
         */
        remove(value: T): boolean;
        /**
         * @description Remove all elements from an array.
         * 
         * @returns An empty array.
         */
        clear(): void;
        /**
         * 
         * @description Checks if the array equals the `compareArray` for all indices.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @returns True if the the array exactly matches.
         */
        equals(compareArray: ReadonlyArray<T>): boolean;
        /**
         * @description Checks if the array equals the `compareArray` while applying a `compareFunc` to each elements.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @param compareFunc - The comparison function which compares a transformed value from both array index. 
         * `t1` is the value from `array`. `t2` is the value from the `compareArray`.
         * @returns True if the array matches with the compareFunc.
         */
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        /**
         * @description Has the same functionality as `Array.prototype.forEach` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        /**
         * @description Has the same functionality as `Array.prototype.map` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        /**
         * @description Has the same functionality as `Array.prototype.reduce` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }   
    
    interface Math
    {
        /**
         * @description Calculates the percentage given the `partialValue` and `wholeNumber`.
         * 
         * @param partialValue - The partial value.
         * @param wholeValue - The whole value.
         * @returns The percentage value.
         */
        percentage(partialValue: number, wholeValue: number): number;
        /**
         * @description Calculates the partial value given the `percentage` and the `wholeValue`.
         * 
         * @param percentage - The percentage calculated for a partial value.
         * @param wholeValue - The whole value.
         * @returns The partial value.
         */
        percentagePartial(percentage: number, wholeValue: number): number;
        /**
         * @description Calculates the whole value given the `percentage` and the `partialValue`.
         * 
         * @param percentage - The percentage calculated for a whole value. 
         * @param partialValue - The partial value.
         * @returns The whole value.
         */
        percentageWhole(percentage: number, partialValue: number): number;
        /**
         * @description Find the clamp for `value`. The clamp value will be `min` if `value` is lower, else if the value is greater than `max` then it will
         * be `max`, otherwise it be `value`.
         * 
         * @param value - The value being clamped.
         * @param min - The minimum value.
         * @param max - The maximum value.
         * @returns The clamp value.
         */
        clamp(value: number, min: number, max: number): number;
        /**
         * @description Calculates the median value given an array of `values`.
         * 
         * @param values - The readonly array being checked.
         * @returns The median.
         */
        median(values: ReadonlyArray<number>): number | null;
    }
}

export { }