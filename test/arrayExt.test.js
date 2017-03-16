"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/arrayExt");
suite.only("ArrayExt", function () {
    var numbers;
    var strings;
    var objects;
    var first = { item: "item1", value: 1 };
    var second = { item: "item2", value: 2 };
    var third = { item: "item3", value: 3 };
    var fourth = { item: "item4", value: 4 };
    setup(function () {
        numbers = [2, 3, 1, 7];
        strings = ["charlie", "alpha", "india", "bravo"];
        objects = [
            fourth,
            first,
            third,
            second
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
    suite("orderBy", function () {
        test("should return array of numbers in ascending order", function () {
            assert.ok(arrayEqual(numbers.orderBy(), [1, 2, 3, 7]));
        });
        test("should return array of strings in ascending order", function () {
            assert.ok(arrayEqual(strings.orderBy(), ["alpha", "bravo", "charlie", "india"]));
        });
        test("should return array of objects in ascending order", function () {
            var ordered = objects.orderBy(function (t) { return t.item; });
            assert.ok(arrayEqual(ordered, [first, second, third, fourth]));
        });
    });
    suite("orderByDesc", function () {
        test("should return array of numbers in descending order", function () {
            assert.ok(arrayEqual(numbers.orderByDesc(), [7, 3, 2, 1]));
        });
        test("should return array of strings in descending order", function () {
            assert.ok(arrayEqual(strings.orderByDesc(), ["india", "charlie", "bravo", "alpha"]));
        });
        test("should return array of objects in descending order", function () {
            var ordered = objects.orderByDesc(function (t) { return t.value; });
            assert.ok(arrayEqual(ordered, [fourth, third, second, first]));
        });
    });
    suite("skip", function () {
        test("should return remaining numbers in array after number of elements skipped", function () {
            assert.ok(arrayEqual(numbers.skip(2), [1, 7]));
        });
        test("should return empty array if number skipped is > array.length", function () {
            assert.ok(arrayEqual(numbers.skip(7), []));
        });
        test("should return remaining strings in array after number of elements skipped", function () {
            assert.ok(arrayEqual(strings.skip(2), ["india", "bravo"]));
        });
        test("should return remaining objects in array after number of elements skipped", function () {
            var skipped = objects.skip(2);
            assert.ok(arrayEqual(skipped, [third, second]));
        });
    });
    suite("take", function () {
        test("should return remaining numbers in array after number taken", function () {
            assert.ok(arrayEqual(numbers.take(2), [2, 3]));
        });
        test("should return complete array if number taken is > array.length", function () {
            assert.ok(arrayEqual(numbers.take(6), [2, 3, 1, 7]));
        });
        test("should return remaining strings in array after number taken", function () {
            assert.ok(arrayEqual(strings.take(2), ["charlie", "alpha"]));
        });
        test("should return remaining objects in array after number taken", function () {
            var taken = objects.take(2);
            assert.ok(arrayEqual(taken, [fourth, first]));
        });
    });
    suite("count", function () {
        test("should return the length of the array when called without a predicate", function () {
            var count = numbers.count();
            assert.strictEqual(count, numbers.length);
        });
        test("should return number of items that satisfy the predicate condition when called with a predicate", function () {
            var count = numbers.count(function (t) { return t > 5; });
            assert.strictEqual(count, 1);
        });
    });
    suite("remove", function () {
        test("should return array of numbers minus removed element", function () {
            numbers.remove(3);
            assert.ok(arrayEqual(numbers, [2, 1, 7]));
        });
        test("should return array of strings minus removed element", function () {
            strings.remove("alpha");
            assert.ok(arrayEqual(strings, ["charlie", "india", "bravo"]));
        });
        test("should return array of objects minus removed element", function () {
            objects.remove(first);
            assert.ok(arrayEqual(objects, [fourth, third, second]));
        });
        test("should return false if element is not in array", function () {
            var removed = numbers.remove(8);
            assert.strictEqual(removed, false);
        });
    });
    suite("clear", function () {
        test("should remove all elements in array of numbers", function () {
            numbers.clear();
            assert.ok(arrayEqual(numbers, []));
        });
        test("should remove all elements in array of strings", function () {
            strings.clear();
            assert.ok(arrayEqual(strings, []));
        });
        test("should remove all elements in array of objects", function () {
            objects.clear();
            assert.ok(arrayEqual(objects, []));
        });
    });
});
//# sourceMappingURL=arrayExt.test.js.map