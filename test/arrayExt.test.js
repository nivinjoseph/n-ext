"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/arrayExt");
suite("remove", function () {
    test("should pass", function () {
        var collection = [1, 2, 3, 4, 5];
        var take = collection.take(2);
        assert.deepEqual(take.length, 2);
    });
});
//# sourceMappingURL=arrayExt.test.js.map