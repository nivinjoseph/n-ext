"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/objectExt");
suite("ObjectExt", function () {
    suite("mapToObject()", function () {
        var original;
        var mapped;
        setup(function () {
            original = {
                name: "Keanu",
                address: {
                    street: "15 Benton rd",
                    province: "ON"
                }
            };
            mapped = original.mapToObject(function () { return ({}); });
        });
        teardown(function () {
            original = null;
            mapped = null;
        });
        test("original should not be the same object as mapped", function () {
            assert.ok(original !== mapped);
        });
        test("original primitive properties and mapped primitive properties should have the same value", function () {
            assert.ok(original.name === mapped.name);
        });
        test("original object properties and mapped object properties should not be the same reference", function () {
            assert.ok(original.address !== mapped.address);
        });
        test("primitive properties on original and mapped object properties must have the same value", function () {
            assert.ok(original.address.street === mapped.address.street);
            assert.ok(original.address.province === mapped.address.province);
        });
    });
});
//# sourceMappingURL=objectExt.test.js.map