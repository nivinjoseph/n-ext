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
//# sourceMappingURL=string-ext.js.map