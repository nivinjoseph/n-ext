"use strict";
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
        if (!ObjectExt.hasValue(key))
            return undefined;
        if (typeof (key) !== "string")
            return source[key];
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
    static setValue(target, key, value) {
        if (!ObjectExt.hasValue(key))
            return;
        if (typeof (key) !== "string") {
            target[key] = value;
            return;
        }
        key = key.trim();
        ObjectExt.ensureKeySafe(key);
        value = value === undefined ? null : value;
        if (!ObjectExt.stringContains(key, ".")) {
            target[key] = value;
            return;
        }
        const splitted = key.split(".").map(t => t.trim());
        splitted.forEach(t => ObjectExt.ensureKeySafe(t));
        let current = target;
        for (let i = 0; i < splitted.length - 1; i++) {
            let next = current[splitted[i]];
            if (next === null || next === undefined)
                next = {};
            current[splitted[i]] = next;
            current = next;
        }
        current[splitted[splitted.length - 1]] = value;
    }
    static serialize(source, ...keys) {
        const keyMaps = keys.map(t => {
            if (ObjectExt.stringContains(t, " as ")) {
                const splitted = t.split(" as ");
                splitted.forEach(u => ObjectExt.ensureKeySafe(u));
                return {
                    sourceKey: splitted[0].trim(),
                    targetKey: splitted[1].trim()
                };
            }
            ObjectExt.ensureKeySafe(t);
            return {
                sourceKey: t,
                targetKey: t
            };
        });
        const target = {};
        keyMaps.forEach(t => {
            const value = ObjectExt.getValue(source, t.sourceKey);
            ObjectExt.setValue(target, t.targetKey, value);
        });
        return target;
    }
    static deserialize(source, targetClassOrObject, ...keysOrValues) {
        if (typeof (targetClassOrObject) === "function") {
            const values = keysOrValues.map(t => {
                if (typeof (t) === "string") {
                    const key = t.trim();
                    return key[0] === ":" ? key.substr(1) : ObjectExt.getValue(source, key);
                }
                return t;
            });
            return new targetClassOrObject(...values);
        }
        else {
            keysOrValues.forEach(t => {
                const value = ObjectExt.getValue(source, t);
                ObjectExt.setValue(targetClassOrObject, t, value);
            });
            return targetClassOrObject;
        }
    }
    static hasValue(item) {
        if (item == null)
            return false;
        if (typeof (item) === "string" && ObjectExt.stringIsWhiteSpace(item))
            return false;
        return true;
    }
    static ensureKeySafe(key) {
        const dangerous = ["constructor", "prototype", "__proto__"];
        if (dangerous.some(t => t === key))
            throw new Error(`Dangerous key '${key}' detected`);
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
    writable: true,
    value: function (key) {
        return ObjectExt.getValue(this, key);
    }
});
Object.defineProperty(Object.prototype, "setValue", {
    configurable: false,
    enumerable: false,
    writable: true,
    value: function (key, value) {
        ObjectExt.setValue(this, key, value);
    }
});
Object.defineProperty(Object.prototype, "serializeObject", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (...keys) {
        return ObjectExt.serialize(this, ...keys);
    }
});
Object.defineProperty(Object.prototype, "deserializeObject", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (targetClassOrObject, ...keysOrValues) {
        return ObjectExt.deserialize(this, targetClassOrObject, ...keysOrValues);
    }
});
//# sourceMappingURL=object-ext.js.map