"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
class StringExt {
    static isEmptyOrWhiteSpace(value) {
        return value.trim().length === 0;
    }
    static contains(primary, sub) {
        return primary.indexOf(sub) !== -1;
    }
    static startsWith(primary, sub) {
        return primary.indexOf(sub) === 0;
    }
    static endsWith(primary, sub) {
        let index = primary.lastIndexOf(sub);
        if (index === -1)
            return false;
        return (index + sub.length) === primary.length;
    }
    static extractNumbers(value) {
        return value.replace(/[^0-9]/g, "");
    }
    static extractCharacters(value) {
        return value.replace(/[^a-zA-Z ]/g, "");
    }
    static format(formatString, ...params) {
        let result = formatString.toString();
        if (result == null)
            return null;
        if (params == null || params.length === 0)
            return result;
        for (let i = 0; i < params.length; i++) {
            let format = "{" + i.toString() + "}";
            while (StringExt.contains(result, format))
                result = result.replace(format, params[i].toString());
        }
        return result;
    }
    static replaceAll(primary, searchValue, replaceValue) {
        // let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
        // let result = primary.replace(matchOperatorsRe, "\\$&");
        // let searchRe = new RegExp(searchValue, ignoreCase ? "gi" : "g");
        // return result.replace(searchRe, replaceValue);
        while (primary.indexOf(searchValue) !== -1)
            primary = primary.replace(searchValue, replaceValue);
        return primary;
    }
    static base64Encode(value) {
        return buffer_1.Buffer.from(value, "utf8").toString("base64");
    }
    static base64Decode(value) {
        return buffer_1.Buffer.from(value, "base64").toString("utf8");
    }
    static base64UrlEncode(value) {
        return buffer_1.Buffer.from(value, "utf8").toString("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }
    static base64UrlDecode(value) {
        value = StringExt.padString(value)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");
        return buffer_1.Buffer.from(value, "base64").toString("utf8");
    }
    static hexEncode(value) {
        return buffer_1.Buffer.from(value, "utf8").toString("hex");
    }
    static hexDecode(value) {
        return buffer_1.Buffer.from(value, "hex").toString("utf8");
    }
    static matchesFormat(primary, format) {
        if (format === SystemFormatSymbol.wildcard)
            return true;
        const allSystemFormatSymbols = Object.entries(SystemFormatSymbol).map(t => t[1]);
        const formatTokens = new Array();
        let index = 0;
        while (index < format.length) {
            const char = format.charAt(index);
            if (char === SystemFormatSymbol.escape) {
                const nextChar = format.charAt(index + 1);
                if (allSystemFormatSymbols.includes(nextChar)) {
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
    static stringMatchesFormatTokens(primary, formatTokens) {
        if (formatTokens.includes(SystemFormatSymbol.wildcard)) {
            const indexOfWildCard = formatTokens.indexOf(SystemFormatSymbol.wildcard);
            const beforeWildcard = formatTokens.slice(0, indexOfWildCard);
            const afterWildcard = formatTokens.slice(indexOfWildCard + 1);
            return StringExt.stringMatchesFormatTokens(primary.substring(0, beforeWildcard.length), beforeWildcard) &&
                StringExt.stringMatchesFormatTokens(primary.substring(primary.length - afterWildcard.length), afterWildcard);
        }
        if (formatTokens.length !== primary.length)
            return false;
        for (let i = 0; i < formatTokens.length; i++) {
            const char = primary[i];
            const token = formatTokens[i];
            if (token === SystemFormatSymbol.alphabet) {
                const charCode = char.charCodeAt(0);
                if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) // "A"-"Z" = 65-90 "a"-"z" = 97-122 
                    return false;
            }
            else if (token === SystemFormatSymbol.number) {
                const charCode = char.charCodeAt(0);
                if (!(charCode >= 48 && charCode <= 57)) // "0"-"9" = 48-57
                    return false;
            }
            else {
                const expectedChar = token.length === 2 ? token[1] : token; // tokens for system chars are '\@' '\#' '\*' '\\'     
                if (char !== expectedChar)
                    return false;
            }
        }
        return true;
    }
    static padString(input) {
        let segmentLength = 4;
        let stringLength = input.length;
        let diff = stringLength % segmentLength;
        if (!diff)
            return input;
        let position = stringLength;
        let padLength = segmentLength - diff;
        let paddedStringLength = stringLength + padLength;
        let buffer = buffer_1.Buffer.alloc(paddedStringLength);
        buffer.write(input);
        while (padLength--)
            buffer.write("=", position++);
        return buffer.toString();
    }
}
var SystemFormatSymbol;
(function (SystemFormatSymbol) {
    SystemFormatSymbol["wildcard"] = "*";
    SystemFormatSymbol["number"] = "#";
    SystemFormatSymbol["alphabet"] = "@";
    SystemFormatSymbol["escape"] = "\\";
})(SystemFormatSymbol || (SystemFormatSymbol = {}));
Object.defineProperty(String.prototype, "isEmptyOrWhiteSpace", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.isEmptyOrWhiteSpace(this.toString());
    }
});
Object.defineProperty(String.prototype, "isNotEmptyOrWhiteSpace", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return !StringExt.isEmptyOrWhiteSpace(this.toString());
    }
});
Object.defineProperty(String.prototype, "contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return StringExt.contains(this.toString(), sub);
    }
});
Object.defineProperty(String.prototype, "startsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return StringExt.startsWith(this.toString(), sub);
    }
});
Object.defineProperty(String.prototype, "endsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return StringExt.endsWith(this.toString(), sub);
    }
});
Object.defineProperty(String.prototype, "extractNumbers", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.extractNumbers(this.toString());
    }
});
Object.defineProperty(String.prototype, "extractCharacters", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.extractCharacters(this.toString());
    }
});
Object.defineProperty(String.prototype, "format", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (...params) {
        return StringExt.format(this.toString(), ...params);
    }
});
Object.defineProperty(String.prototype, "replaceAll", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (searchValue, replaceValue) {
        return StringExt.replaceAll(this.toString(), searchValue, replaceValue);
    }
});
Object.defineProperty(String.prototype, "base64Encode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.base64Encode(this.toString());
    }
});
Object.defineProperty(String.prototype, "base64Decode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.base64Decode(this.toString());
    }
});
Object.defineProperty(String.prototype, "base64UrlEncode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.base64UrlEncode(this.toString());
    }
});
Object.defineProperty(String.prototype, "base64UrlDecode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.base64UrlDecode(this.toString());
    }
});
Object.defineProperty(String.prototype, "hexEncode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.hexEncode(this.toString());
    }
});
Object.defineProperty(String.prototype, "hexDecode", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.hexDecode(this.toString());
    }
});
Object.defineProperty(String.prototype, "matchesFormat", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (format) {
        if (format == null || typeof format !== "string" || StringExt.isEmptyOrWhiteSpace(format))
            throw new Error("format must be a valid string");
        return StringExt.matchesFormat(this.toString(), format.trim());
    }
});
//# sourceMappingURL=string-ext.js.map