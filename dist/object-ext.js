"use strict";
class ObjectExt {
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
    static setValue(target, key, value) {
        if (key == null || ObjectExt.stringIsWhiteSpace(key))
            return;
        key = key.trim();
        value = value === undefined ? null : value;
        if (!ObjectExt.stringContains(key, "."))
            target[key] = value;
        let splitted = key.split(".").map(t => t.trim());
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
                return {
                    sourceKey: splitted[0].trim(),
                    targetKey: splitted[1].trim()
                };
            }
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