"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./stringExt");
var ObjectExt = (function () {
    function ObjectExt() {
    }
    ObjectExt.mapToObject = function (source, factoryFunc) {
        var target = factoryFunc();
        source = JSON.parse(JSON.stringify(source));
        for (var key in source) {
            if (source.hasOwnProperty(key) && typeof source[key] != "function" && typeof target[key] != "function") {
                target[key] = source[key];
            }
        }
        return target;
    };
    ObjectExt.getTypeName = function (source) {
        var getFuncName = function (funcDef) {
            var name = funcDef.substr("function".length);
            name = name.substr(0, name.indexOf("("));
            name = name.trim();
            return name;
        };
        if (typeof source === "object") {
            var value = getFuncName(source.constructor.toString());
            if (value === "n Object")
                return "Object";
            else
                return value;
        }
        else if (typeof source === "function") {
            return getFuncName(source.toString());
        }
        return (typeof source);
    };
    ObjectExt.getValue = function (source, key) {
        if (!key.hasValue())
            return source;
        if (!key.contains("."))
            return source[key];
        var splitted = key.split(".");
        var current = source;
        for (var i = 0; i < splitted.length; i++) {
            if (!current)
                return null;
            current = current[splitted[i]];
        }
        return current;
    };
    ObjectExt.setValue = function (source, key, value) {
        if (!key.hasValue())
            return;
        if (!key.contains("."))
            source[key] = value;
        // let obj = {
        //     name: "Nivin",
        //     address: {
        //         street: {
        //             number: 74,
        //             name: "Kennedy rd"
        //         },
        //         city: "Scarborough",
        //         province: "ON"
        //     }
        // };
        // address.street.name
        var splitted = key.split(".");
        var current = source;
        for (var i = 0; i < splitted.length - 1; i++) {
            current = current[splitted[i]];
            if (current == null || current == undefined)
                current = {};
        }
        current[splitted[splitted.length - 1]] = value;
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
//# sourceMappingURL=objectExt.js.map