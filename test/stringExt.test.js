"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/stringExt");
suite("StringExt", function () {
    suite("isWhiteSpace()", function () {
        test("should return true when called on an empty string", function () {
            var testVal = "";
            var result = testVal.isWhiteSpace();
            assert.ok(result === true);
        });
        test("should return true when called on a non-empty string with space characters", function () {
            var testVal = "   ";
            var result = testVal.isWhiteSpace();
            assert.ok(result === true);
        });
        test("should return false when called on a non-empty string", function () {
            var testVal = "foo";
            var result = testVal.isWhiteSpace();
            assert.ok(result === false);
        });
        test("should return false when called on a non-empty string with space and regular characters", function () {
            var testVal = "  foo bar  ";
            var result = testVal.isWhiteSpace();
            assert.ok(result === false);
        });
    });
});
//# sourceMappingURL=stringExt.test.js.map