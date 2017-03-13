import * as assert from "assert";
import "../src/objectExt"

suite("ObjectExt tests", () =>
{
    suite("mapToObject", () =>
    {
        test.only("basic test", () =>
        {
            let original = {
                name: "Keanu",
                address: {
                    street: "15 Benton rd",
                    province: "ON"
                }
            };
            
            let mapped = original.mapToObject(() => ({}))
            
            assert.ok(original !== mapped);
            assert.ok(original.name === mapped.name);
            assert.ok(original.address !== mapped.address);
            assert.ok(original.address.street === mapped.address.street);
            assert.ok(original.address.province === mapped.address.province);
        });
        
        test("dummy test", () =>
        {
            let something = "something";
            assert.ok(something === "something");
        });
        
        
    });
});