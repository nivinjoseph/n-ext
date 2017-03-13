class StringExt
{
    public static isWhiteSpace(value: string): boolean
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
        return (index + sub.length) === primary.length;
    }

    public static extractNumbers(value: string): string
    {
        return value.replace(/[^0-9]/g, "");
    }

    public static format(formatString: string, ...params: any[]): string
    {
        let result = formatString;
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
}


Object.defineProperty(String.prototype, "isWhiteSpace", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): boolean
    {
        return StringExt.isWhiteSpace(this);
    }
});

Object.defineProperty(String.prototype, "contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub: string): boolean
    {
        return StringExt.contains(this, sub);
    }
});

Object.defineProperty(String.prototype, "startsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub: string): boolean
    {
        return StringExt.startsWith(this, sub);
    }
});

Object.defineProperty(String.prototype, "endsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub: string): boolean
    {
        return StringExt.endsWith(this, sub);
    }
});

Object.defineProperty(String.prototype, "extractNumbers", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): string
    {
        return StringExt.extractNumbers(this);
    }
});

Object.defineProperty(String.prototype, "format", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (...params: any[]): string
    {
        return StringExt.format(this, params);
    }
});