/* eslint-disable @typescript-eslint/no-unsafe-return */
function tryParseArrayIndex(key) {
    if (key === null || key === undefined)
        return null;
    const isNumberValidArrayIndex = (indexNumber) => {
        return !Number.isNaN(indexNumber) && Number.isFinite(indexNumber) && Number.isInteger(indexNumber) && key >= 0;
    };
    if (typeof key === "number" && isNumberValidArrayIndex(key))
        return key;
    if (typeof key === "string" && isNumberValidArrayIndex(Number.parseFloat(key)))
        return Number.parseInt(key);
    return null;
}
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
        // @ts-expect-error: not used atm
        const getName = (funcDef) => {
            let name = funcDef.trim();
            if (name.startsWith("function")) {
                name = name.substr("function".length);
                name = name.substr(0, name.indexOf("("));
            }
            else if (name.startsWith("class")) {
                name = name.substr("class".length);
                name = name.substr(0, name.indexOf("{")).trim();
                if (name.includes(" "))
                    name = name.split(" ")[0];
            }
            return name.trim();
        };
        if (typeof source === "function") {
            return source.name;
            // return getName(source.toString());
        }
        if (typeof source === "object") {
            return source.constructor.name;
            // let value = getName(source.constructor.toString());
            // if (value === "n Object") return "Object";
            // else return value;
        }
        return typeof source;
    }
    static getValue(source, key) {
        if (source === null || source === undefined)
            return undefined;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!ObjectExt._hasValue(key))
            return undefined;
        if (typeof key !== "string")
            return source[key];
        key = key.trim();
        if (!key.includes("."))
            return source[key] === undefined ? null : source[key];
        const splitted = key.split(".").map(t => t.trim());
        let current = source;
        while (splitted.length > 0) {
            if (current === null || current === undefined)
                break;
            const key = splitted.shift();
            if (Array.isArray(current)) {
                const parsedIndex = tryParseArrayIndex(key);
                current = parsedIndex != null
                    ? current[parsedIndex]
                    : current.map(t => t === null || t === undefined || t[key] === null || t[key] === undefined ? null : t[key]);
            }
            else {
                current = current[key];
            }
        }
        return current === undefined ? null : current;
    }
    static setValue(target, key, value) {
        if (target === null || target === undefined)
            return;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!ObjectExt._hasValue(key))
            return;
        if (typeof key !== "string") {
            target[key] = value;
            return;
        }
        key = key.trim();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ObjectExt._ensureKeySafe(key);
        value = value === undefined ? null : value;
        if (!key.includes(".")) {
            target[key] = value;
            return;
        }
        const splitted = key.split(".").map(t => {
            const k = t.trim();
            ObjectExt._ensureKeySafe(k);
            return k;
        });
        let parent = target;
        while (splitted.length > 0) {
            const key = splitted.shift();
            const isLast = splitted.length === 0;
            if (isLast) {
                parent[key] = value; // this will work for arrays and objects
                break;
            }
            let current = parent[key];
            if (current === null || current === undefined)
                parent[key] = current = tryParseArrayIndex(splitted[0]) != null ? [] : {};
            parent = current;
        }
    }
    static serialize(source, ...keys) {
        const keyMaps = keys.map(t => {
            if (t.includes(" as ")) {
                const splitted = t.split(" as ");
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                splitted.forEach(u => ObjectExt._ensureKeySafe(u));
                return {
                    sourceKey: splitted[0].trim(),
                    targetKey: splitted[1].trim()
                };
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            ObjectExt._ensureKeySafe(t);
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
        if (typeof targetClassOrObject === "function") {
            const values = keysOrValues.map(t => {
                if (typeof t === "string") {
                    const key = t.trim();
                    return key.startsWith(":") ? key.substring(1) : ObjectExt.getValue(source, key);
                }
                return t;
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
    static _hasValue(item) {
        if (item == null)
            return false;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (typeof item === "string" && ObjectExt._stringIsWhiteSpace(item))
            return false;
        return true;
    }
    static _ensureKeySafe(key) {
        const dangerous = ["constructor", "prototype", "__proto__"];
        if (dangerous.some(t => t === key))
            throw new Error(`Dangerous key '${key}' detected`);
    }
    static _stringIsWhiteSpace(value) {
        return value.trim().length === 0;
    }
}
function defineObjectExtProperties() {
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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["getTypeName"] === undefined)
        Object.defineProperty(Object.prototype, "getTypeName", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                return ObjectExt.getTypeName(this);
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["getValue"] === undefined)
        Object.defineProperty(Object.prototype, "getValue", {
            configurable: false,
            enumerable: false,
            writable: true, // for webpack compatibility
            value: function (key) {
                return ObjectExt.getValue(this, key);
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["setValue"] === undefined)
        Object.defineProperty(Object.prototype, "setValue", {
            configurable: false,
            enumerable: false,
            writable: true, // for webpack compatibility
            value: function (key, value) {
                ObjectExt.setValue(this, key, value);
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["serializeObject"] === undefined)
        Object.defineProperty(Object.prototype, "serializeObject", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (...keys) {
                return ObjectExt.serialize(this, ...keys);
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["deserializeObject"] === undefined)
        Object.defineProperty(Object.prototype, "deserializeObject", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (targetClassOrObject, ...keysOrValues) {
                return ObjectExt.deserialize(this, targetClassOrObject, ...keysOrValues);
            }
        });
}
defineObjectExtProperties();
export {};
//# sourceMappingURL=object-ext.js.map