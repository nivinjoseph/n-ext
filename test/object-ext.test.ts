import * as assert from "assert";
import "../src/object-ext";

suite("ObjectExt", () =>
{
    suite("mapToObject", () =>
    {
        let original: any;
        let mapped: any;
        
        setup(() =>
        {
            original = {
                name: "Keanu",
                address: {
                    street: "15 Benton rd",
                    province: "ON"
                }
            };

            mapped = original.mapToObject(() => ({}));
        });
        
        teardown(() =>
        {
            original = null;
            mapped = null;
        });
        
        test("original should not be the same object as mapped", () =>
        {
            assert.notStrictEqual(mapped, original); 
        });
        
        test("original primitive properties and mapped primitive properties should have the same value", () =>
        {
            assert.strictEqual(mapped.name, original.name);
        });
        
        test("original object properties and mapped object properties should not be the same reference", () => 
        {
            assert.notStrictEqual(mapped.address, original.address);
        });
        
        test("primitive properties on original and mapped object properties must have the same value", () =>
        {
            assert.strictEqual(mapped.address.street, original.address.street);
            assert.strictEqual(mapped.address.province, original.address.province);
        });
    });
    
    suite("getTypeName", () =>
    {
        let val: Object = null;
        let typeName: string = null;
        
        teardown(() =>
        {
            val = null;
            typeName = null;
        });
        
        test("should return 'Number' for number instance", () =>
        {
            val = 1;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Number");
        });
        
        test("should return 'Boolean' for bool instance", () =>
        {
            val = true;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Boolean");
        });
        
        test("should return 'String' for string instance", () =>
        {
            val = "value";
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "String");
        });
        
        test("should return 'Array' for array instance", () =>
        {
            val = [];
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Array");
        });
        
        test("should return 'Date' for Date instance", () =>
        {
            val = new Date();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Date");
        });
        
        test("should return 'Object' for object literal instance", () =>
        {
            val = {}; 
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Object");
        });
        
        test("should return name of the class for custom class instance", () =>
        {
            class Foo { }
            val = new Foo();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Foo");
        });
        
        test("should return the name of the instantiated derived class for custom class instance", () =>
        {
            class Foo { }
            class Bar extends Foo { }
            val = new Bar();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });
        
        test("should return empty string for an arrow function", () =>
        {
            val = () => "foo";
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "");
        });
        
        test("should return empty string for an anonymous function", () =>
        {
            val = function () { };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "");
        });
        
        test("should return name of the function for a named function", () =>
        {
            val = function foo() { };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "foo");
        });
        
        test("should return class name for a class object", () =>
        {
            class Foo { }
            class Bar extends Foo { }
            val = Bar;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });
    });
    
    suite("getValue", () =>
    {
        let targetCountry: Object = null;
        let targetAddress: Object = null;
        let target: Object = null;
        
        setup(() =>
        {
            targetCountry =
                {
                    name: "Canada",
                    code: "CA"
                };
            
            targetAddress =
                {
                    street: "711 Kennedy rd",
                    city: "Toronto",
                    country: targetCountry
                };
            
            target =
                {
                    firstName: "John",
                    lastName: "Smith",
                    address: targetAddress
                };
        });
         
        teardown(() =>
        {
            targetCountry = null;
            targetAddress = null;
            target = null;
        });
        
        test("should return the target object if the key is null", () =>
        {
            let key: string = null;
            let value = target.getValue(key);
            assert.strictEqual(value, target);
        });
        
        test("should return the target object if the key is an empty string", () =>
        {
            let key = "";
            let value = target.getValue(key);
            assert.strictEqual(value, target);
        });
        
        test("should return the target object if the key is a string with just whitespace", () =>
        {
            let key = "  ";
            let value = target.getValue(key);
            assert.strictEqual(value, target);
        });
        
        test("should return null if the key does not exist on the target object", () =>
        {
            let key = "something";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        
        test("should return value if the key exists on the target object", () =>
        {
            let key = "firstName";
            let value = target.getValue(key);
            assert.strictEqual(value, "John");
        });
        
        test("should return value if the multi level key exists on the target object", () =>
        {
            let key = "address.country";
            let value = target.getValue(key);
            assert.strictEqual(value, targetCountry);
        });
        
        test("should return value if the multi level (3 levels) key exists on the target object", () =>
        {
            let key = "address.country.code";
            let value = target.getValue(key);
            assert.strictEqual(value, "CA");
        });
        
        test("should return null if the top level of a multi level key does not exist on the target object", () =>
        {
            let key = "something.country";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        
        test("should return null if the middle level of a multi level key does not exist on the target object", () =>
        {
            let key = "address.something.code";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        
        test("should return null if the bottom level of a multi level key does not exist on the target object", () =>
        {
            let key = "address.country.something";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
    });
    
    suite("setValue", () =>
    {
        let targetCountry: Object = null;
        let targetAddress: Object = null;
        let target: {[index: string]: any} = null;
        let targetString: string = null;
        
        let getCurrentTargetString = () => JSON.stringify(target);

        setup(() =>
        {
            targetCountry =
                {
                    name: "Canada",
                    code: "CA"
                };

            targetAddress =
                {
                    street: "711 Kennedy rd",
                    city: "Toronto",
                    country: targetCountry
                };

            target =
                {
                    firstName: "John",
                    lastName: "Smith",
                    address: targetAddress
                };
            
            targetString = JSON.stringify(target);
        });


        teardown(() =>
        {
            targetCountry = null;
            targetAddress = null;
            target = null;
            targetString = null;
        });
        
        test("should not do anything if the key is null", () =>
        {
            let key = null;
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        
        test("should not do anything if the key is an empty string", () =>
        {
            let key = "";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        
        test("should not do anything if the key is a string with just whitespace", () =>
        {
            let key = "  ";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        
        test("should set value given a key that is a single level key", () =>
        {
            let key = "firstName";
            let value = "Kevin";
            target.setValue(key, value);
            assert.strictEqual(target[key], value);
        });
        
        test("should set value given a multi level key", () =>
        {
            let key = "address.country.code";
            let value = "us";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.country.code, value);
        });
        
        test("should set value given a single level key even if key does not already exist on the object", () =>
        {
            let key = "nickName";
            let value = "Johnny";
            target.setValue(key, value);
            assert.strictEqual((<any>target).nickName, value);
        });
        
        test("should set value given a multi level key even if the bottom level key does not already exist on the object", () =>
        {
            let key = "address.country.language";
            let value = "en-ca";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.country.language, value);
        });
        
        test("should set value given a multi level key even if the middle level key does not already exist on the object", () =>
        {
            let key = "address.province.name";
            let value = "Ontario";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.province.name, value);
        });
        
        test("should set value given a multi level key even of none of the key levels already exist on the object", () =>
        {
            let key = "shippingAddress.province.name";
            let value = "Quebec";
            target.setValue(key, value);
            assert.strictEqual((<any>target).shippingAddress.province.name, value);
        });
    });
});