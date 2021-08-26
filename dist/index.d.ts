declare global
{
    interface String
    {
        isEmptyOrWhiteSpace(): boolean;
        isNotEmptyOrWhiteSpace(): boolean;
        contains(search: string): boolean; // native implementation includes
        // startsWith(value: string): boolean; // native implementation exists
        // endsWith(value: string): boolean; // native implementation exists
        extractNumbers(): string;
        extractCharacters(): string;
        format(...params: any[]): string;
        replaceAll(searchValue: string, replaceValue: string): string;
        base64Encode(): string;
        base64Decode(): string;
        base64UrlEncode(): string;
        base64UrlDecode(): string;
        hexEncode(): string;
        hexDecode(): string;
        /**
         * @param format ```wildcard = *, number = #, alphabet = @, escape = \```
         * @description Only one wildcard is allowed
         * @example ```(###)-###-####```, ```*.xls```, ```*\@company.com```
         */
        matchesFormat(format: string): boolean;
    }

    interface Object
    {
        // mapToObject(factoryFunc: () => any): any;
        // merge(value: object): void;
        getTypeName(): string;
        getValue(key: string): any;
        setValue(key: string, value: any): void;
        serializeObject(...keys: Array<string>): object;
        deserializeObject(targetClassOrObject: Function | object, ...keysOrValues: Array<any>): object;
    }

    interface Array<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        readonly first: T;
        readonly last: T;
        contains(value: T): boolean;
        where(filterFunc: (value: T) => boolean): Array<T>;
        orderBy(): Array<T>;
        orderBy(compareFunc: (value: T) => any): Array<T>;
        orderByDesc(): Array<T>;
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        distinct(): Array<T>;
        distinct(compareFunc: (value: T) => any): Array<T>;
        skip(count: number): Array<T>;
        take(count: number): Array<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        remove(value: T): boolean;
        clear(): void;
        equals(compareArray: ReadonlyArray<T>): boolean;
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }

    interface ReadonlyArray<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        contains(value: T): boolean;
        where(filterFunc: (value: T) => boolean): Array<T>;
        orderBy(): Array<T>;
        orderBy(compareFunc: (value: T) => any): Array<T>;
        orderByDesc(): Array<T>;
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        distinct(): Array<T>;
        distinct(compareFunc: (value: T) => any): Array<T>;
        skip(count: number): Array<T>;
        take(count: number): Array<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        equals(compareArray: ReadonlyArray<T>): boolean;
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }

    interface Math
    {
        percentage(partialValue: number, wholeValue: number): number;
        percentagePartial(percentage: number, wholeValue: number): number;
        percentageWhole(percentage: number, partialValue: number): number;
        clamp(value: number, min: number, max: number): number;
        median(values: ReadonlyArray<number>): number | null;
    }
}

export { }