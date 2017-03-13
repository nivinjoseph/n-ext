import "./stringExt";

class ObjectExt
{
    public static mapToObject(source: any, factoryFunc: () => any): any
    {
        let target = factoryFunc();
        source = JSON.parse(JSON.stringify(source));
        
        for (var key in source)
        {
            if (source.hasOwnProperty(key) && typeof source[key] != "function" && typeof target[key] != "function")
            {
                target[key] = source[key];
            }
        }
        
        return target;
    }
    
    public static getTypeName(source: any): string 
    {
        let getFuncName = (funcDef: string) =>
        {
            let name = funcDef.substr("function".length);
            name = name.substr(0, name.indexOf("("));
            name = name.trim();
            return name;
        }
        
        if (typeof source === "object")
        {
            let value = getFuncName(source.constructor.toString());
            if (value === "n Object") return "Object";
            else return value;
        }
        else if (typeof source === "function")
        {
            return getFuncName(source.toString());
        }

        return (typeof source);
    }
    
    public static getValue(source: any, key: string): any
    {
        if (!key.hasValue()) return source;
        if (!key.contains(".")) return source[key];

        let splitted = key.split(".");
        let current = source;

        for (let i = 0; i < splitted.length; i++)
        {
            if (!current) return null;
            current = current[splitted[i]];
        }
        return current;
    }
    
    public static setValue(source: any, key: string, value: any): void
    {
        if (!key.hasValue()) return;
        if (!key.contains(".")) source[key] = value;
        
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
        
        let splitted = key.split(".");
        let current = source;
        
        for (let i = 0; i < splitted.length - 1; i++)
        {
            current = current[splitted[i]];
            if (current == null || current == undefined) current = {};
        }
        
        current[splitted[splitted.length - 1]] = value;
        
    }
}


Object.defineProperty(Object.prototype, "mapToObject", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (factoryFunc: () => any): any
    {
        return ObjectExt.mapToObject(this, factoryFunc);
    }
});

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
    writable: false,
    value: function (key: string): any
    {
        return ObjectExt.getValue(this, key);
    }
});

Object.defineProperty(Object.prototype, "setValue", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (key: string, value: any): void
    {
        ObjectExt.setValue(this, key, value);
    }
});