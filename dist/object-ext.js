var ObjectExt = (function () {
    function ObjectExt() {
    }
    ObjectExt.mapToObject = function (source, factoryFunc) {
        var target = factoryFunc();
        source = JSON.parse(JSON.stringify(source));
        for (var key in source) {
            if (source.hasOwnProperty(key) && typeof source[key] !== "function" && typeof target[key] !== "function") {
                target[key] = source[key];
            }
        }
        return target;
    };
    ObjectExt.getTypeName = function (source) {
        var getName = function (funcDef) {
            var name = funcDef.trim();
            if (ObjectExt.stringStartsWith(name, "function")) {
                name = name.substr("function".length);
                name = name.substr(0, name.indexOf("("));
            }
            else if (ObjectExt.stringStartsWith(name, "class")) {
                name = name.substr("class".length);
                name = name.substr(0, name.indexOf("{")).trim();
                if (ObjectExt.stringContains(name, " "))
                    name = name.split(" ")[0];
            }
            return name.trim();
        };
        if (typeof source === "object") {
            var value = getName(source.constructor.toString());
            if (value === "n Object")
                return "Object";
            else
                return value;
        }
        else if (typeof source === "function") {
            return getName(source.toString());
        }
        return (typeof source);
    };
    ObjectExt.getValue = function (source, key) {
        if (key == null || ObjectExt.stringIsWhiteSpace(key))
            return source;
        key = key.trim();
        if (!ObjectExt.stringContains(key, "."))
            return source[key] === undefined ? null : source[key];
        var splitted = key.split(".").map(function (t) { return t.trim(); });
        var current = source;
        for (var i = 0; i < splitted.length; i++) {
            if (current === null || current === undefined)
                return null;
            current = current[splitted[i]];
        }
        return current === undefined ? null : current;
    };
    ObjectExt.setValue = function (source, key, value) {
        if (key == null || ObjectExt.stringIsWhiteSpace(key))
            return;
        key = key.trim();
        value = value === undefined ? null : value;
        if (!ObjectExt.stringContains(key, "."))
            source[key] = value;
        var splitted = key.split(".").map(function (t) { return t.trim(); });
        var current = source;
        for (var i = 0; i < splitted.length - 1; i++) {
            var next = current[splitted[i]];
            if (next === null || next === undefined)
                next = {};
            current[splitted[i]] = next;
            current = next;
        }
        current[splitted[splitted.length - 1]] = value;
    };
    ObjectExt.stringIsWhiteSpace = function (value) {
        return value.trim().length === 0;
    };
    ObjectExt.stringContains = function (primary, sub) {
        return primary.indexOf(sub) !== -1;
    };
    ObjectExt.stringStartsWith = function (primary, sub) {
        return primary.indexOf(sub) === 0;
    };
    return ObjectExt;
}());
Object.defineProperty(Object.prototype, "mapToObject", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (factoryFunc) {
        return ObjectExt.mapToObject(this, factoryFunc);
    }
});
Object.defineProperty(Object.prototype, "getTypeName", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return ObjectExt.getTypeName(this);
    }
});
Object.defineProperty(Object.prototype, "getValue", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (key) {
        return ObjectExt.getValue(this, key);
    }
});
Object.defineProperty(Object.prototype, "setValue", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (key, value) {
        ObjectExt.setValue(this, key, value);
    }
});
//# sourceMappingURL=object-ext.js.map