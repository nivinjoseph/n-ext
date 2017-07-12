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
    }

    interface Object
    {
        mapToObject(factoryFunc: () => any): any;
        getTypeName(): string;
        getValue(key: string): any;
        setValue(key: string, value: any): void;
    }

    interface Array<T>
    {
        orderBy(): Array<T>;
        orderBy(compareFunc: (value: T) => any): Array<T>;
        orderByDesc(): Array<T>;
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        distinct(): Array<T>;
        distinct(equalityFunc: (value1: T, value2: T) => boolean): Array<T>;
        skip(count: number): Array<T>;
        take(count: number): Array<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        remove(value: T): boolean;
        clear(): void;
        equals(compareArray: Array<T>): boolean
    }
    
    interface ReadonlyArray<T>
    {
        orderBy(): Array<T>;
        orderBy(compareFunc: (value: T) => any): Array<T>;
        orderByDesc(): Array<T>;
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        distinct(): Array<T>;
        distinct(equalityFunc: (value1: T, value2: T) => boolean): Array<T>;
        skip(count: number): Array<T>;
        take(count: number): Array<T>;
        count(): number;
        count(predicate: (value: T) => boolean): number;
        equals(compareArray: Array<T>): boolean
    }    
}

export { }