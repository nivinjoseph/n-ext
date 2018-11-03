class ObjectExt
{
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
    
    public static getTypeName(source: any): string 
    {
        let getName = (funcDef: string) =>
        {
            let name = funcDef.trim();
            if (ObjectExt.stringStartsWith(name, "function"))
            {
                name = name.substr("function".length);
                name = name.substr(0, name.indexOf("("));
            }    
            else if (ObjectExt.stringStartsWith(name, "class"))
            {
                name = name.substr("class".length);
                name = name.substr(0, name.indexOf("{")).trim();
                if (ObjectExt.stringContains(name, " "))
                    name = name.split(" ")[0];
            }    
            return name.trim();
        };
        
        if (typeof source === "object")
        {
            let value = getName(source.constructor.toString());
            if (value === "n Object") return "Object";
            else return value;
        }
        else if (typeof source === "function")
        {
            return getName(source.toString());
        }

        return (typeof source);
    }
    
    public static getValue(source: any, key: string): any
    {
        if (key == null || ObjectExt.stringIsWhiteSpace(key)) return source;
        key = key.trim();
        if (!ObjectExt.stringContains(key, "."))
            return source[key] === undefined ? null : source[key];
        
        let splitted = key.split(".").map(t => t.trim());
        let current = source;

        for (let i = 0; i < splitted.length; i++)
        {
            if (current === null || current === undefined) return null;
            current = current[splitted[i]];
        }
        return current === undefined ? null : current;
    }
    
    public static setValue(target: any, key: string, value: any): void
    {
        if (key == null || ObjectExt.stringIsWhiteSpace(key)) return;
        key = key.trim();
        value = value === undefined ? null : value;
        if (!ObjectExt.stringContains(key, ".")) target[key] = value;
        
        let splitted = key.split(".").map(t => t.trim());
        let current = target;
        
        for (let i = 0; i < splitted.length - 1; i++)
        {
            let next = current[splitted[i]]; 
            if (next === null || next === undefined) next = {};
            current[splitted[i]] = next;
            current = next;
        }
        
        current[splitted[splitted.length - 1]] = value;
    }

    public static serialize(source: any, ...keys: Array<string>): object
    {
        const keyMaps = keys.map(t =>
        {
            if (ObjectExt.stringContains(t, " as "))
            {
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

        keyMaps.forEach(t =>
        {
            const value = ObjectExt.getValue(source, t.sourceKey);
            ObjectExt.setValue(target, t.targetKey, value);
        });

        return target;
    }

    public static deserialize(source: any, targetClass: Function, ...keys: Array<any>): object
    {
        const values = keys.map(t =>
        {
            if (typeof (t) === "string")
            {
                const key = t.trim();
                return key[0] === ":" ? key.substr(1) : ObjectExt.getValue(source, key);
            }
            
            return t;
        });

        const target = new (<any>targetClass)(...values);
        return target;
    }
    

    private static stringIsWhiteSpace(value: string): boolean
    {
        return value.trim().length === 0;
    }

    private static stringContains(primary: string, sub: string): boolean
    {
        return primary.indexOf(sub) !== -1;
    }
    
    private static stringStartsWith(primary: string, sub: string): boolean
    {
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
    value: function (): string
    {
        return ObjectExt.getTypeName(this);
    }
});

Object.defineProperty(Object.prototype, "getValue", {
    configurable: false,
    enumerable: false,
    writable: true,  // for webpack compatibility
    value: function (key: string): any
    {
        return ObjectExt.getValue(this, key);
    }
});

Object.defineProperty(Object.prototype, "setValue", {
    configurable: false,
    enumerable: false,
    writable: true, // for webpack compatibility
    value: function (key: string, value: any): void
    {
        ObjectExt.setValue(this, key, value);
    }
});

Object.defineProperty(Object.prototype, "serialize", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (...keys: Array<string>): object
    {
        return ObjectExt.serialize(this, ...keys);
    }
});

Object.defineProperty(Object.prototype, "deserialize", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (targetClass: Function, ...keys: Array<any>): object
    {
        return ObjectExt.deserialize(this, targetClass, ...keys);
    }
});