declare class ObjectExt {
    static mapToObject(source: any, factoryFunc: () => any): any;
    static getTypeName(source: any): string;
    static getValue(source: any, key: string): any;
    static setValue(source: any, key: string, value: any): void;
    private static stringIsWhiteSpace(value);
    static stringContains(primary: string, sub: string): boolean;
}
