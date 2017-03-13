"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/objectExt");
suite("ObjectExt tests", function () {
    suite("mapToObject", function () {
        test.only("basic test", function () {
            var original = {
                name: "Keanu",
                address: {
                    street: "15 Benton rd",
                    province: "ON"
                }
            };
            var mapped = original.mapToObject(function () { return ({}); });
            assert.ok(original !== mapped);
            assert.ok(original.name === mapped.name);
            assert.ok(original.address !== mapped.address);
            assert.ok(original.address.street === mapped.address.street);
            assert.ok(original.address.province === mapped.address.province);
        });
        test("dummy test", function () {
            var something = "something";
            assert.ok(something === "something");
        });
    });
});
//# sourceMappingURL=objectExt.test.js.map