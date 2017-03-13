var StringExt = (function () {
    function StringExt() {
    }
    StringExt.hasValue = function (value) {
        if (value != null) {
            if (!(typeof value === "string"))
                throw "Argument Exception: Argument is not of type string.";
            return value.trim().length > 0;
        }
        return false;
    };
    StringExt.contains = function (primary, sub) {
        return primary.indexOf(sub) !== -1;
    };
    StringExt.startsWith = function (primary, sub) {
        return primary.indexOf(sub) === 0;
    };
    StringExt.endsWith = function (primary, sub) {
        var index = primary.lastIndexOf(sub);
        return (index + sub.length) === primary.length;
    };
    StringExt.extractNumbers = function (value) {
        return value.replace(/[^0-9]/g, '');
    };
    StringExt.format = function (formatString) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var result = formatString;
        if (result == null)
            return null;
        if (params == null || params.length == 0)
            return result;
        for (var i = 0; i < params.length; i++) {
            var format = "{" + i.toString() + "}";
            while (result.contains(format))
                result = result.replace(format, params[i].toString());
        }
        return result;
    };
    return StringExt;
}());
Object.defineProperty(String.prototype, "hasValue", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.hasValue(this);
    }
});
Object.defineProperty(String.prototype, "contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return StringExt.contains(this, sub);
    }
});
Object.defineProperty(String.prototype, "startsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return StringExt.startsWith(this, sub);
    }
});
Object.defineProperty(String.prototype, "endsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return StringExt.endsWith(this, sub);
    }
});
Object.defineProperty(String.prototype, "extractNumbers", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return StringExt.extractNumbers(this);
    }
});
Object.defineProperty(String.prototype, "format", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return StringExt.format(this, params);
    }
});
//# sourceMappingURL=stringExt.js.map