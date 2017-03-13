import * as assert from "assert";
import "../src/objectExt"

suite("ObjectExt", () =>
{
    suite("mapToObject()", () =>
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
            assert.ok(original !== mapped); 
        });
        
        test("original primitive properties and mapped primitive properties should have the same value", () =>
        {
            assert.ok(original.name === mapped.name);
        });
        
        test("original object properties and mapped object properties should not be the same reference", () => 
        {
            assert.ok(original.address !== mapped.address);
        });
        
        test("primitive properties on original and mapped object properties must have the same value", () =>
        {
            assert.ok(original.address.street === mapped.address.street);
            assert.ok(original.address.province === mapped.address.province);
        });
    });
});