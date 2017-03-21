declare class StringExt {
    static isEmptyOrWhiteSpace(value: string): boolean;
    static contains(primary: string, sub: string): boolean;
    static startsWith(primary: string, sub: string): boolean;
    static endsWith(primary: string, sub: string): boolean;
    static extractNumbers(value: string): string;
    static format(formatString: string, ...params: any[]): string;
}
