"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/objectExt");
suite("ObjectExt", function () {
    suite("mapToObject", function () {
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
            assert.notStrictEqual(mapped, original);
        });
        test("original primitive properties and mapped primitive properties should have the same value", function () {
            assert.strictEqual(mapped.name, original.name);
        });
        test("original object properties and mapped object properties should not be the same reference", function () {
            assert.notStrictEqual(mapped.address, original.address);
        });
        test("primitive properties on original and mapped object properties must have the same value", function () {
            assert.strictEqual(mapped.address.street, original.address.street);
            assert.strictEqual(mapped.address.province, original.address.province);
        });
    });
    suite("getTypeName", function () {
        var val = null;
        var typeName = null;
        teardown(function () {
            val = null;
            typeName = null;
        });
        test("should return 'Number' for number instance", function () {
            val = 1;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Number");
        });
        test("should return 'Boolean' for bool instance", function () {
            val = true;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Boolean");
        });
        test("should return 'String' for string instance", function () {
            val = "value";
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "String");
        });
        test("should return 'Array' for array instance", function () {
            val = [];
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Array");
        });
        test("should return 'Date' for Date instance", function () {
            val = new Date();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Date");
        });
        test("should return 'Object' for object literal instance", function () {
            val = {};
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Object");
        });
        test("should return name of the class for custom class instance", function () {
            var Foo = (function () {
                function Foo() {
                }
                return Foo;
            }());
            val = new Foo();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Foo");
        });
        test("should return the name of the instantiated derived class for custom class instance", function () {
            var Foo = (function () {
                function Foo() {
                }
                return Foo;
            }());
            var Bar = (function (_super) {
                __extends(Bar, _super);
                function Bar() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Bar;
            }(Foo));
            val = new Bar();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });
        test("should return empty string for an arrow function", function () {
            val = function () { return "foo"; };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "");
        });
        test("should return empty string for an anonymous function", function () {
            val = function () { };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "");
        });
        test("should return name of the function for a named function", function () {
            val = function foo() { };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "foo");
        });
        test("should return class name for a class object", function () {
            var Foo = (function () {
                function Foo() {
                }
                return Foo;
            }());
            var Bar = (function (_super) {
                __extends(Bar, _super);
                function Bar() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Bar;
            }(Foo));
            val = Bar;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });
    });
    suite("getValue", function () {
        var targetCountry = null;
        var targetAddress = null;
        var target = null;
        setup(function () {
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
        teardown(function () {
            targetCountry = null;
            targetAddress = null;
            target = null;
        });
        test("should return the target object if the key is null", function () {
            var key = null;
            var value = target.getValue(key);
            assert.strictEqual(value, target);
        });
        test("should return the target object if the key is an empty string", function () {
            var key = "";
            var value = target.getValue(key);
            assert.strictEqual(value, target);
        });
        test("should return the target object if the key is a string with just whitespace", function () {
            var key = "  ";
            var value = target.getValue(key);
            assert.strictEqual(value, target);
        });
        test("should return null if the key does not exist on the target object", function () {
            var key = "something";
            var value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        test("should return value if the key exists on the target object", function () {
            var key = "firstName";
            var value = target.getValue(key);
            assert.strictEqual(value, "John");
        });
        test("should return value if the multi level key exists on the target object", function () {
            var key = "address.country";
            var value = target.getValue(key);
            assert.strictEqual(value, targetCountry);
        });
        test("should return value if the multi level (3 levels) key exists on the target object", function () {
            var key = "address.country.code";
            var value = target.getValue(key);
            assert.strictEqual(value, "CA");
        });
        test("should return null if the top level of a multi level key does not exist on the target object", function () {
            var key = "something.country";
            var value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        test("should return null if the middle level of a multi level key does not exist on the target object", function () {
            var key = "address.something.code";
            var value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        test("should return null if the bottom level of a multi level key does not exist on the target object", function () {
            var key = "address.country.something";
            var value = target.getValue(key);
            assert.strictEqual(value, null);
        });
    });
    suite("setValue", function () {
        var targetCountry = null;
        var targetAddress = null;
        var target = null;
        var targetString = null;
        var getCurrentTargetString = function () { return JSON.stringify(target); };
        setup(function () {
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
        teardown(function () {
            targetCountry = null;
            targetAddress = null;
            target = null;
            targetString = null;
        });
        test("should not do anything if the key is null", function () {
            var key = null;
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        test("should not do anything if the key is an empty string", function () {
            var key = "";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        test("should not do anything if the key is a string with just whitespace", function () {
            var key = "  ";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        test("should set value given a key that is a single level key", function () {
            var key = "firstName";
            var value = "Kevin";
            target.setValue(key, value);
            assert.strictEqual(target[key], value);
        });
        test("should set value given a multi level key", function () {
            var key = "address.country.code";
            var value = "us";
            target.setValue(key, value);
            assert.strictEqual(target.address.country.code, value);
        });
        test("should set value given a single level key even if key does not already exist on the object", function () {
            var key = "nickName";
            var value = "Johnny";
            target.setValue(key, value);
            assert.strictEqual(target.nickName, value);
        });
        test("should set value given a multi level key even if the bottom level key does not already exist on the object", function () {
            var key = "address.country.language";
            var value = "en-ca";
            target.setValue(key, value);
            assert.strictEqual(target.address.country.language, value);
        });
        test("should set value given a multi level key even if the middle level key does not already exist on the object", function () {
            var key = "address.province.name";
            var value = "Ontario";
            target.setValue(key, value);
            assert.strictEqual(target.address.province.name, value);
        });
        test("should set value given a multi level key even of none of the key levels already exist on the object", function () {
            var key = "shippingAddress.province.name";
            var value = "Quebec";
            target.setValue(key, value);
            assert.strictEqual(target.shippingAddress.province.name, value);
        });
    });
});
//# sourceMappingURL=objectExt.test.js.map