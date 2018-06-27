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
    static padString(input) {
        let segmentLength = 4;
        let stringLength = input.length;
        let diff = stringLength % segmentLength;
        if (!diff)
            return input;
        let position = stringLength;
        let padLength = segmentLength - diff;
        let paddedStringLength = stringLength + padLength;
        let buffer = new buffer_1.Buffer(paddedStringLength);
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
    value: function () {
        return StringExt.isEmptyOrWhiteSpace(this.toString());
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
//# sourceMappingURL=string-ext.js.map