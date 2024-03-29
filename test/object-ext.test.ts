/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, test, before, after } from "node:test";
import assert from "node:assert";
import "../src/object-ext.js";

await describe("ObjectExt", async () =>
{
    // await describe("mapToObject", () =>
    // {
    //     let original: any;
    //     let mapped: any;

    //     setup(() =>
    //     {
    //         original = {
    //             name: "Keanu",
    //             address: {
    //                 street: "15 Benton rd",
    //                 province: "ON"
    //             }
    //         };

    //         mapped = original.mapToObject(() => ({}));
    //     });

    //     teardown(() =>
    //     {
    //         original = null;
    //         mapped = null;
    //     });

    //     await test("original should not be the same object as mapped", () =>
    //     {
    //         assert.notStrictEqual(mapped, original); 
    //     });

    //     await test("original primitive properties and mapped primitive properties should have the same value", () =>
    //     {
    //         assert.strictEqual(mapped.name, original.name);
    //     });

    //     await test("original object properties and mapped object properties should not be the same reference", () => 
    //     {
    //         assert.notStrictEqual(mapped.address, original.address);
    //     });

    //     await test("primitive properties on original and mapped object properties must have the same value", () =>
    //     {
    //         assert.strictEqual(mapped.address.street, original.address.street);
    //         assert.strictEqual(mapped.address.province, original.address.province);
    //     });
    // });

    // await describe("merge", () =>
    // {
    //     await test("should successfully merge", () =>
    //     {
    //         let obj: Object = { a: 1, b: "2" };
    //         let val = { b: 2, c: false };

    //         obj.merge(val);

    //         assert.deepStrictEqual(obj, { a: 1, b: 2, c: false });
    //     });
    // });

    await describe("getTypeName", async () =>
    {
        let val: Object = null as any;
        let typeName: string = null as any;

        before(() =>
        {
            val = null as any;
            typeName = null as any;
        });

        await test("should return 'number' for number instance", () =>
        {
            val = 1;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "number");
        });

        await test("should return 'boolean' for bool instance", () =>
        {
            val = true;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "boolean");
        });

        await test("should return 'string' for string instance", () =>
        {
            val = "value";
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "string");
        });

        await test("should return 'Array' for array instance", () =>
        {
            val = [];
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Array");
        });

        await test("should return 'Date' for Date instance", () =>
        {
            val = new Date();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Date");
        });

        await test("should return 'Object' for object literal instance", () =>
        {
            val = {};
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Object");
        });

        await test("should return name of the class for custom class instance", () =>
        {
            class Foo { }
            val = new Foo();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Foo");
        });

        await test("should return the name of the instantiated derived class for custom class instance", () =>
        {
            class Foo { }
            class Bar extends Foo { }
            val = new Bar();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });

        // test("should return empty string for an arrow function", () =>
        // {
        //     val = () => "foo";
        //     typeName = val.getTypeName();
        //     assert.strictEqual(typeName, "");
        // });

        await test("should return empty string for an anonymous function", () =>
        {
            // val = function () { };
            typeName = function (): void { /** empty by design */ }.getTypeName();
            assert.strictEqual(typeName, "");
        });

        await test("should return name of the function for a named function", () =>
        {
            val = function foo(): void { /** empty by design */ };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "foo");
        });

        await test("should return class name for a class object", () =>
        {
            class Foo { }
            class Bar extends Foo { }
            val = Bar;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });
    });

    await describe("getValue", async () =>
    {
        let targetCountry: Object = null as any;
        let targetAddress: Object = null as any;
        let target: Object = null as any;

        before(() =>
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

        after(() =>
        {
            targetCountry = null as any;
            targetAddress = null as any;
            target = null as any;
        });

        await test("should return undefined if the key is null", () =>
        {
            const key: string = null as any;
            const value = target.getValue(key);
            assert.strictEqual(value, undefined);
        });

        await test("should return undefined if the key is an empty string", () =>
        {
            const key = "";
            const value = target.getValue(key);
            assert.strictEqual(value, undefined);
        });

        await test("should return undefined if the key is a string with just whitespace", () =>
        {
            const key = "  ";
            const value = target.getValue(key);
            assert.strictEqual(value, undefined);
        });

        await test("should return null if the key does not exist on the target object", () =>
        {
            const key = "something";
            const value = target.getValue(key);
            assert.strictEqual(value, null);
        });

        await test("should return value if the key exists on the target object", () =>
        {
            const key = "firstName";
            const value = target.getValue(key);
            assert.strictEqual(value, "John");
        });

        await test("should return value if the multi level key exists on the target object", () =>
        {
            const key = "address.country";
            const value = target.getValue(key);
            assert.strictEqual(value, targetCountry);
        });

        await test("should return value if the multi level (3 levels) key exists on the target object", () =>
        {
            const key = "address.country.code";
            const value = target.getValue(key);
            assert.strictEqual(value, "CA");
        });

        await test("should return null if the top level of a multi level key does not exist on the target object", () =>
        {
            const key = "something.country";
            const value = target.getValue(key);
            assert.strictEqual(value, null);
        });

        await test("should return null if the middle level of a multi level key does not exist on the target object", () =>
        {
            const key = "address.something.code";
            const value = target.getValue(key);
            assert.strictEqual(value, null);
        });

        await test("should return null if the bottom level of a multi level key does not exist on the target object", () =>
        {
            const key = "address.country.something";
            const value = target.getValue(key);
            assert.strictEqual(value, null);
        });
    });

    await describe("setValue", async () =>
    {
        let targetCountry: Object = null as any;
        let targetAddress: Object = null as any;
        let target: { [index: string]: any; } = null as any;
        let targetString: string = null as any;

        const getCurrentTargetString = (): string => JSON.stringify(target);

        before(() =>
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


        after(() =>
        {
            targetCountry = null as any;
            targetAddress = null as any;
            target = null as any;
            targetString = null as any;
        });

        await test("should not do anything if the key is null", () =>
        {
            const key = null;
            target.setValue(key as any, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });

        await test("should not do anything if the key is an empty string", () =>
        {
            const key = "";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });

        await test("should not do anything if the key is a string with just whitespace", () =>
        {
            const key = "  ";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });

        await test("should set value given a key that is a single level key", () =>
        {
            const key = "firstName";
            const value = "Kevin";
            target.setValue(key, value);
            assert.strictEqual(target[key], value);
        });

        await test("should set value given a multi level key", () =>
        {
            const key = "address.country.code";
            const value = "us";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.country.code, value);
        });

        await test("should set value given a single level key even if key does not already exist on the object", () =>
        {
            const key = "nickName";
            const value = "Johnny";
            target.setValue(key, value);
            assert.strictEqual((<any>target).nickName, value);
        });

        await test("should set value given a multi level key even if the bottom level key does not already exist on the object", () =>
        {
            const key = "address.country.language";
            const value = "en-ca";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.country.language, value);
        });

        await test("should set value given a multi level key even if the middle level key does not already exist on the object", () =>
        {
            const key = "address.province.name";
            const value = "Ontario";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.province.name, value);
        });

        await test("should set value given a multi level key even of none of the key levels already exist on the object", () =>
        {
            const key = "shippingAddress.province.name";
            const value = "Quebec";
            target.setValue(key, value);
            assert.strictEqual((<any>target).shippingAddress.province.name, value);
        });
    });

    await describe("serialize deserialize", async () =>
    {
        class Address
        {
            private readonly _line1: string;
            private readonly _line2: string;


            public get line1(): string { return this._line1; }
            public get line2(): string { return this._line2; }


            public constructor(line1: string, line2: string)
            {
                this._line1 = line1;
                this._line2 = line2;
            }
        }

        class Customer
        {
            private readonly _firstName: string;
            private readonly _lastName: string;
            private readonly _address: Address;


            public get firstName(): string { return this._firstName; }
            public get lastName(): string { return this._lastName; }
            public get address(): Address { return this._address; }


            public constructor(firstName: string, lastName: string, address: Address)
            {
                this._firstName = firstName;
                this._lastName = lastName;
                this._address = address;
            }
        }

        await test("serialize", () =>
        {
            const original: Object = new Customer("Nivin", "Joseph", new Address("26 Kennedy rd", "Apt 23"));

            const serialized = original.serializeObject("firstName", "lastName as lname", "address.line1 as add.l1", "address.line2 as apt");
            // console.log("serialized", serialized);

            assert.deepStrictEqual(serialized, {
                firstName: "Nivin",
                lname: "Joseph",
                add: {
                    l1: "26 Kennedy rd"
                },
                apt: "Apt 23"
            });
        });

        await test("deserialize", () =>
        {
            const serialized: Object = {
                firstName: "Nivin",
                lname: "Joseph",
                add: {
                    l1: "26 Kennedy rd"
                },
                apt: "Apt 23"
            };

            const deserialized = serialized.deserializeObject(Customer, "firstName", "lname", serialized.deserializeObject(Address, "add.l1", "apt"));
            // console.log("deserialized", deserialized);

            assert.deepStrictEqual(deserialized, new Customer("Nivin", "Joseph", new Address("26 Kennedy rd", "Apt 23")));
        });
    });
});