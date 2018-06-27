import { Buffer } from "buffer";


class StringExt
{
    public static isEmptyOrWhiteSpace(value: string): boolean
    {
        return value.trim().length === 0;
    }

    public static contains(primary: string, sub: string): boolean
    {
        return primary.indexOf(sub) !== -1;
    }

    public static startsWith(primary: string, sub: string): boolean
    {
        return primary.indexOf(sub) === 0;
    }

    public static endsWith(primary: string, sub: string): boolean
    {
        let index = primary.lastIndexOf(sub);
        if (index === -1) return false;
        return (index + sub.length) === primary.length;
    }

    public static extractNumbers(value: string): string
    {
        return value.replace(/[^0-9]/g, "");
    }
    
    public static extractCharacters(value: string): string
    {
        return value.replace(/[^a-zA-Z ]/g, "");
    }

    public static format(formatString: string, ...params: any[]): string
    {
        let result = formatString.toString();
        if (result == null) return null;

        if (params == null || params.length === 0) return result;

        for (let i = 0; i < params.length; i++)
        {
            let format = "{" + i.toString() + "}";
            while (StringExt.contains(result, format))
                result = result.replace(format, params[i].toString());
        }

        return result;
    }
    
    public static replaceAll(primary: string, searchValue: string, replaceValue: string): string
    {
        // let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
        // let result = primary.replace(matchOperatorsRe, "\\$&");
        
        // let searchRe = new RegExp(searchValue, ignoreCase ? "gi" : "g");
        
        // return result.replace(searchRe, replaceValue);
        
        while (primary.indexOf(searchValue) !== -1)
            primary = primary.replace(searchValue, replaceValue);
        
        return primary;
    }
    
    public static base64Encode(value: string): string
    {
        return Buffer.from(value, "utf8").toString("base64");
    }
    
    public static base64Decode(value: string): string
    {
        return Buffer.from(value, "base64").toString("utf8");
    }
    
    public static base64UrlEncode(value: string): string
    {
        return Buffer.from(value, "utf8").toString("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }
    
    public static base64UrlDecode(value: string): string
    {
        value = StringExt.padString(value)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");
        
        return Buffer.from(value, "base64").toString("utf8");
    }
    
    
    private static padString(input: string): string
    {
        let segmentLength = 4;
        let stringLength = input.length;
        let diff = stringLength % segmentLength;

        if (!diff)
            return input;

        let position = stringLength;
        let padLength = segmentLength - diff;
        let paddedStringLength = stringLength + padLength;
        let buffer = new Buffer(paddedStringLength);
        buffer.write(input);

        while (padLength--)
            buffer.write("=", position++);

        return buffer.toString();
    }
}


Object.defineProperty(String.prototype, "isEmptyOrWhiteSpace", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): boolean
    {
        return StringExt.isEmptyOrWhiteSpace(this.toString());
    }
});

Object.defineProperty(String.prototype, "contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub: string): boolean
    {
        return StringExt.contains(this.toString(), sub);
    }
});

Object.defineProperty(String.prototype, "startsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub: string): boolean
    {
        return StringExt.startsWith(this.toString(), sub);
    }
});

Object.defineProperty(String.prototype, "endsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub: string): boolean
    {
        return StringExt.endsWith(this.toString(), sub);
    }
});

Object.defineProperty(String.prototype, "extractNumbers", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): string
    {
        return StringExt.extractNumbers(this.toString());
    }
});

Object.defineProperty(String.prototype, "extractCharacters", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): string
    {
        return StringExt.extractCharacters(this.toString());
    }
});

Object.defineProperty(String.prototype, "format", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (...params: any[]): string
    {
        return StringExt.format(this.toString(), ...params);
    }
});

Object.defineProperty(String.prototype, "replaceAll", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (searchValue: string, replaceValue: string): string
    {
        return StringExt.replaceAll(this.toString(), searchValue, replaceValue);
    }
});

Object.defineProperty(String.prototype, "base64Encode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): string
    {
        return StringExt.base64Encode(this.toString());
    }
});

Object.defineProperty(String.prototype, "base64Decode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): string
    {
        return StringExt.base64Decode(this.toString());
    }
});

Object.defineProperty(String.prototype, "base64UrlEncode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): string
    {
        return StringExt.base64UrlEncode(this.toString());
    }
});

Object.defineProperty(String.prototype, "base64UrlDecode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): string
    {
        return StringExt.base64UrlDecode(this.toString());
    }
});