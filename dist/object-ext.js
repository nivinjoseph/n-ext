class ObjectExt {
    // public static mapToObject(source: any, factoryFunc: () => any): any
    // {
    //     let target = factoryFunc();
    //     source = JSON.parse(JSON.stringify(source));
    //     for (let key in source)
    //     {
    //         if (source.hasOwnProperty(key) && typeof source[key] !== "function" && typeof target[key] !== "function")
    //         {
    //             target[key] = source[key];
    //         }
    //     }
    //     return target;
    // }
    // public static merge(target: object, source: object): void
    // {
    //     Object.assign(target, source);
    // }
    static getTypeName(source) {
        let getName = (funcDef) => {
            let name = funcDef.trim();
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
            let value = getName(source.constructor.toString());
            if (value === "n Object")
                return "Object";
            else
                return value;
        }
        else if (typeof source === "function") {
            return getName(source.toString());
        }
        return (typeof source);
    }
    static getValue(source, key) {
        if (key == null || ObjectExt.stringIsWhiteSpace(key))
            return source;
        key = key.trim();
        if (!ObjectExt.stringContains(key, "."))
            return source[key] === undefined ? null : source[key];
        let splitted = key.split(".").map(t => t.trim());
        let current = source;
        for (let i = 0; i < splitted.length; i++) {
            if (current === null || current === undefined)
                return null;
            current = current[splitted[i]];
        }
        return current === undefined ? null : current;
    }
    static setValue(source, key, value) {
        if (key == null || ObjectExt.stringIsWhiteSpace(key))
            return;
        key = key.trim();
        value = value === undefined ? null : value;
        if (!ObjectExt.stringContains(key, "."))
            source[key] = value;
        let splitted = key.split(".").map(t => t.trim());
        let current = source;
        for (let i = 0; i < splitted.length - 1; i++) {
            let next = current[splitted[i]];
            if (next === null || next === undefined)
                next = {};
            current[splitted[i]] = next;
            current = next;
        }
        current[splitted[splitted.length - 1]] = value;
    }
    static stringIsWhiteSpace(value) {
        return value.trim().length === 0;
    }
    static stringContains(primary, sub) {
        return primary.indexOf(sub) !== -1;
    }
    static stringStartsWith(primary, sub) {
        return primary.indexOf(sub) === 0;
    }
}
// Object.defineProperty(Object.prototype, "mapToObject", {
//     configurable: false,
//     enumerable: false,
//     writable: false,
//     value: function (factoryFunc: () => any): any
//     {
//         return ObjectExt.mapToObject(this, factoryFunc);
//     }
// });
// Object.defineProperty(Object.prototype, "merge", {
//     configurable: false,
//     enumerable: false,
//     writable: false,
//     value: function (value: object): void
//     {
//         ObjectExt.merge(this, value);
//     }
// });
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