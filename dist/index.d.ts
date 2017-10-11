declare global
{
    interface String
    {
        isEmptyOrWhiteSpace(): boolean;
        contains(value: string): boolean;
        startsWith(value: string): boolean;
        endsWith(value: string): boolean;
        extractNumbers(): string;
        format(...params: any[]): string;
        replaceAll(searchValue: string, replaceValue: string): string;
        base64Encode(): string;
        base64Decode(): string;
        base64UrlEncode(): string;
        base64UrlDecode(): string;
    }

    interface Object
    {
        // mapToObject(factoryFunc: () => any): any;
        // merge(value: object): void;
        getTypeName(): string;
        getValue(key: string): any;
        setValue(key: string, value: any): void;
    }

    interface Array<T>
    {
        contains(value: T): boolean;
        orderBy(): Array<T>;
        orderBy(compareFunc: (value: T) => any): Array<T>;
        orderByDesc(): Array<T>;
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        distinct(): Array<T>;
        distinct(compareFunc: (value: T) => any): Array<T>;
        skip(count: number): Array<T>;
        take(count: number): Array<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        remove(value: T): boolean;
        clear(): void;
        equals(compareArray: Array<T>): boolean;
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }
    
    interface ReadonlyArray<T>
    {
        contains(value: T): boolean;
        orderBy(): Array<T>;
        orderBy(compareFunc: (value: T) => any): Array<T>;
        orderByDesc(): Array<T>;
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        distinct(): Array<T>;
        distinct(compareFunc: (value: T) => any): Array<T>;
        skip(count: number): Array<T>;
        take(count: number): Array<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        equals(compareArray: Array<T>): boolean;
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }    
}

export { }