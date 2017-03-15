"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/arrayExt");
suite("ArrayExt", function () {
    var numbers;
    var strings;
    var objects;
    setup(function () {
        numbers = [2, 3, 1, 7];
        strings = ["charlie", "alpha", "india", "bravo"];
        objects = [
            { item: "item4", value: 4 },
            { item: "item1", value: 1 },
            { item: "item3", value: 3 },
            { item: "item2", value: 2 }
        ];
    });
    var arrayEqual = function (actual, expected) {
        if (actual === expected)
            return true;
        if (actual === null || expected === null)
            return false;
        if (!(actual instanceof Array) || !(expected instanceof Array))
            return false;
        if (actual.length !== expected.length)
            return false;
        for (var i = 0; i < actual.length; i++) {
            if (actual[i] === expected[i])
                continue;
            return false;
        }
        return true;
    };
    suite("orderBy()", function () {
        test("should return array of numbers in ascending order", function () {
            assert.ok(arrayEqual(numbers.orderBy(), [1, 2, 3, 7]));
        });
        test("should return array of strings in ascending order", function () {
            assert.ok(arrayEqual(strings.orderBy(), ["alpha", "bravo", "charlie", "india"]));
        });
        test.skip("should return array of objects in ascending order", function () {
            assert.ok(arrayEqual(objects.orderBy(), [
                { item: "item1", value: 1 },
                { item: "item2", value: 2 },
                { item: "item3", value: 3 },
                { item: "item4", value: 4 }
            ]));
        });
    });
    suite("orderByDesc()", function () {
        test("should return array of numbers in descending order", function () {
            assert.ok(arrayEqual(numbers.orderByDesc(), [7, 3, 2, 1]));
        });
        test("should return array of strings in descending order", function () {
            assert.ok(arrayEqual(strings.orderByDesc(), ["india", "charlie", "bravo", "alpha"]));
        });
        test.skip("should return array of objects in descending order", function () {
        });
    });
    suite("skip()", function () {
        test("should return remaining numbers in array after number skipped", function () {
            assert.ok(arrayEqual(numbers.skip(2), [1, 7]));
        });
        test("should return remaining strings in array after number skipped", function () {
            assert.ok(arrayEqual(strings.skip(2), ["india", "bravo"]));
        });
        test.skip("should return remaining objects in array after number skipped", function () {
        });
    });
    suite("take()", function () {
        test("should return remaining numbers in array after number taken", function () {
            assert.ok(arrayEqual(numbers.take(2), [2, 3]));
        });
        test("should return remaining strings in array after number taken", function () {
            assert.ok(arrayEqual(strings.take(2), ["charlie", "alpha"]));
        });
        test.skip("should return remaining objects in array after number taken", function () {
        });
    });
    suite("count()", function () {
        test.only("", function () {
            console.log(numbers.count());
        });
    });
});
//# sourceMappingURL=arrayExt.test.js.map