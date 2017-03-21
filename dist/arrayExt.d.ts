declare class ArrayExt {
    static orderBy<T>(array: T[]): T[];
    static orderBy<T>(array: T[], compareFunc: (value: T) => any): T[];
    static orderByDesc<T>(array: T[]): T[];
    static orderByDesc<T>(array: T[], compareFunc: (value: T) => any): T[];
    static skip<T>(array: T[], count: number): T[];
    static take<T>(array: T[], count: number): T[];
    static count<T>(array: T[]): number;
    static count<T>(array: T[], predicate: (value: T) => boolean): number;
    static remove<T>(array: T[], value: T): boolean;
    static clear<T>(array: T[]): void;
}
