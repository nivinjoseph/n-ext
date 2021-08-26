import { Buffer } from "buffer";


class StringExt
{
    public static isEmptyOrWhiteSpace(value: string): boolean
    {
        return value.trim().length === 0;
    }

    public static contains(primary: string, search: string): boolean
    {
        // return primary.indexOf(sub) !== -1;
        
        return primary.includes(search);
    }

    // public static startsWith(primary: string, sub: string): boolean
    // {
    //     return primary.indexOf(sub) === 0;
    // }

    // public static endsWith(primary: string, sub: string): boolean
    // {
    //     let index = primary.lastIndexOf(sub);
    //     if (index === -1) return false;
    //     return (index + sub.length) === primary.length;
    // }

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
    
    public static hexEncode(value: string): string
    {
        return Buffer.from(value, "utf8").toString("hex");
    }

    public static hexDecode(value: string): string
    {
        return Buffer.from(value, "hex").toString("utf8");
    }

    public static matchesFormat(primary: string, format: string): boolean
    {
        if (format === SystemFormatSymbol.wildcard)
            return true;
        
        const allSystemFormatSymbols = Object.entries(SystemFormatSymbol).map(t => t[1] as string);
        const formatTokens = new Array<string>();
        let index = 0;
        while (index < format.length)
        {
            const char = format.charAt(index);
            if (char === SystemFormatSymbol.escape)
            {
                const nextChar = format.charAt(index + 1);
                if (allSystemFormatSymbols.includes(nextChar))
                {
                    formatTokens.push(`${SystemFormatSymbol.escape}${nextChar}`);
                    index += 2;
                    continue;
                }
            }
            formatTokens.push(char);
            index++;
        }
        
        if (formatTokens.filter(t => t === SystemFormatSymbol.wildcard).length > 1)
            throw new Error("Invalid format, only 1 wildcard allowed");  
            
        return StringExt.stringMatchesFormatTokens(primary, formatTokens);
    }
    
    private static stringMatchesFormatTokens(primary: string, formatTokens: ReadonlyArray<string>): boolean
    {
        if (formatTokens.includes(SystemFormatSymbol.wildcard))
        {
            const indexOfWildCard = formatTokens.indexOf(SystemFormatSymbol.wildcard);
            const beforeWildcard = formatTokens.slice(0, indexOfWildCard);
            const afterWildcard = formatTokens.slice(indexOfWildCard + 1);
            
            return StringExt.stringMatchesFormatTokens(primary.substring(0, beforeWildcard.length), beforeWildcard) &&
                StringExt.stringMatchesFormatTokens(primary.substring(primary.length - afterWildcard.length), afterWildcard); 
        }
        
        if (formatTokens.length !== primary.length)
            return false;
            
        for (let i = 0; i < formatTokens.length; i++)
        {    
            const char = primary[i];
            const token = formatTokens[i];
            
            if (token === SystemFormatSymbol.alphabet)
            {
                const charCode = char.charCodeAt(0);
                if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) // "A"-"Z" = 65-90 "a"-"z" = 97-122 
                    return false;
            }
            else if (token === SystemFormatSymbol.number)
            {
                const charCode = char.charCodeAt(0);
                if (!(charCode >= 48 && charCode <= 57)) // "0"-"9" = 48-57
                    return false;
            }
            else
            {
                const expectedChar = token.length === 2 ? token[1] : token; // tokens for system chars are '\@' '\#' '\*' '\\'     
                if (char !== expectedChar)
                    return false;
            }
        }
        
        return true;
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
        let buffer = Buffer.alloc(paddedStringLength);
        buffer.write(input);

        while (padLength--)
            buffer.write("=", position++);

        return buffer.toString();
    }
}

enum SystemFormatSymbol
{
    wildcard = "*",
    number = "#", 
    alphabet = "@",
    escape = "\\"
}


function defineStringExtProperties(): void
{
    if (String.prototype["isEmptyOrWhiteSpace"] === undefined)
        Object.defineProperty(String.prototype, "isEmptyOrWhiteSpace", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): boolean
            {
                return StringExt.isEmptyOrWhiteSpace(this.toString());
            }
        });

    if (String.prototype["isNotEmptyOrWhiteSpace"] === undefined)
        Object.defineProperty(String.prototype, "isNotEmptyOrWhiteSpace", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): boolean
            {
                return !StringExt.isEmptyOrWhiteSpace(this.toString());
            }
        });

    if (String.prototype["contains"] === undefined)
        Object.defineProperty(String.prototype, "contains", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (search: string): boolean
            {
                return StringExt.contains(this.toString(), search);
            }
        });

    // Object.defineProperty(String.prototype, "startsWith", {
    //     configurable: false,
    //     enumerable: false,
    //     writable: false,
    //     value: function (sub: string): boolean
    //     {
    //         return StringExt.startsWith(this.toString(), sub);
    //     }
    // });

    // Object.defineProperty(String.prototype, "endsWith", {
    //     configurable: false,
    //     enumerable: false,
    //     writable: false,
    //     value: function (sub: string): boolean
    //     {
    //         return StringExt.endsWith(this.toString(), sub);
    //     }
    // });

    if (String.prototype["extractNumbers"] === undefined)
        Object.defineProperty(String.prototype, "extractNumbers", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.extractNumbers(this.toString());
            }
        });

    if (String.prototype["extractCharacters"] === undefined)
        Object.defineProperty(String.prototype, "extractCharacters", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.extractCharacters(this.toString());
            }
        });

    if (String.prototype["format"] === undefined)
        Object.defineProperty(String.prototype, "format", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (...params: any[]): string
            {
                return StringExt.format(this.toString(), ...params);
            }
        });

    if (String.prototype["replaceAll"] === undefined)
        Object.defineProperty(String.prototype, "replaceAll", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (searchValue: string, replaceValue: string): string
            {
                return StringExt.replaceAll(this.toString(), searchValue, replaceValue);
            }
        });

    if (String.prototype["base64Encode"] === undefined)
        Object.defineProperty(String.prototype, "base64Encode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.base64Encode(this.toString());
            }
        });

    if (String.prototype["base64Decode"] === undefined)
        Object.defineProperty(String.prototype, "base64Decode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.base64Decode(this.toString());
            }
        });

    if (String.prototype["base64UrlEncode"] === undefined)
        Object.defineProperty(String.prototype, "base64UrlEncode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.base64UrlEncode(this.toString());
            }
        });

    if (String.prototype["base64UrlDecode"] === undefined)
        Object.defineProperty(String.prototype, "base64UrlDecode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.base64UrlDecode(this.toString());
            }
        });

    if (String.prototype["hexEncode"] === undefined)
        Object.defineProperty(String.prototype, "hexEncode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.hexEncode(this.toString());
            }
        });

    if (String.prototype["hexDecode"] === undefined)
        Object.defineProperty(String.prototype, "hexDecode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return StringExt.hexDecode(this.toString());
            }
        });

    if (String.prototype["matchesFormat"] === undefined)
        Object.defineProperty(String.prototype, "matchesFormat", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (format: string): boolean
            {
                if (format == null || typeof format !== "string" || StringExt.isEmptyOrWhiteSpace(format))
                    throw new Error("format must be a valid string");

                return StringExt.matchesFormat(this.toString(), format.trim());
            }
        });
}

defineStringExtProperties();