"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/arrayExt");
suite.only("ArrayExt", function () {
    var numbers;
    var strings;
    var empty;
    var single;
    var nArray;
    var objects;
    var first = { item: "item1", value: 1 };
    var second = { item: "item2", value: 2 };
    var third = { item: "item3", value: 3 };
    var fourth = { item: "item4", value: 4 };
    setup(function () {
        numbers = [2, 3, 1, 7];
        strings = ["charlie", "alpha", "india", "bravo"];
        empty = [];
        single = [1];
        nArray = new Array();
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
        test("should return a new array empty object when target is an empty array", function () {
            var ordered = empty.orderBy();
            assert.strictEqual(ordered.length, 0);
            assert.notStrictEqual(ordered, empty);
        });
        test("should return a new array object when target is a single element array", function () {
            var ordered = single.orderBy();
            assert.strictEqual(ordered.length, 1);
            assert.notStrictEqual(ordered, single);
        });
        test("should return a new array object when target is a n element array", function () {
            var ordered = nArray.orderBy();
            assert.strictEqual(ordered.length, nArray.length);
            assert.notStrictEqual(ordered, nArray);
        });
        test("should return array of numbers in ascending order", function () {
            var ordered = numbers.orderBy();
            assert.ok(arrayEqual(ordered, [1, 2, 3, 7]));
        });
        test("should return array of strings in ascending order", function () {
            var ordered = strings.orderBy();
            assert.ok(arrayEqual(ordered, ["alpha", "bravo", "charlie", "india"]));
        });
        test("should return array of objects in ascending order", function () {
            var ordered = objects.orderBy(function (t) { return t.item; });
            assert.ok(arrayEqual(ordered, [first, second, third, fourth]));
        });
    });
    suite("orderByDesc", function () {
        test("should return a new array object when target is an empty array", function () {
            var ordered = empty.orderByDesc();
            assert.strictEqual(ordered.length, 0);
            assert.notStrictEqual(ordered, empty);
        });
        test("should return a new array object when target is a single element array", function () {
            var ordered = single.orderByDesc();
            assert.strictEqual(ordered.length, 1);
            assert.notStrictEqual(ordered, 1);
        });
        test("should return a new array object when target is a n element array", function () {
            var ordered = nArray.orderByDesc();
            assert.strictEqual(ordered.length, nArray.length);
            assert.notStrictEqual(ordered, nArray);
        });
        test("should return array of numbers in descending order", function () {
            var ordered = numbers.orderByDesc();
            assert.ok(arrayEqual(ordered, [7, 3, 2, 1]));
        });
        test("should return array of strings in descending order", function () {
            var ordered = strings.orderByDesc();
            assert.ok(arrayEqual(ordered, ["india", "charlie", "bravo", "alpha"]));
        });
        test("should return array of objects in descending order", function () {
            var ordered = objects.orderByDesc(function (t) { return t.value; });
            assert.ok(arrayEqual(ordered, [fourth, third, second, first]));
        });
    });
    suite("skip", function () {
        test("should return a new array object when target is an empty array", function () {
            var skipped = empty.skip(1);
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, empty);
        });
        test("should return a new array object when target is a single element array", function () {
            var skipped = single.skip(1);
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, single);
        });
        test("should return a new array object when target is a n element array", function () {
            var skipped = nArray.skip(1);
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, nArray);
        });
        test("should return remaining numbers in array after number of elements skipped", function () {
            var skipped = numbers.skip(2);
            assert.ok(arrayEqual(skipped, [1, 7]));
        });
        test("should return empty array if number skipped is > array.length", function () {
            var skipped = numbers.skip(7);
            assert.ok(arrayEqual(skipped, []));
        });
        test("should return remaining strings in array after number of elements skipped", function () {
            var skipped = strings.skip(2);
            assert.ok(arrayEqual(skipped, ["india", "bravo"]));
        });
        test("should return remaining objects in array after number of elements skipped", function () {
            var skipped = objects.skip(2);
            assert.ok(arrayEqual(skipped, [third, second]));
        });
    });
    suite("take", function () {
        test("should return a new array object when target is an empty array", function () {
            var taken = empty.take(1);
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, empty);
        });
        test("should return a new array object when target is a single element array", function () {
            var taken = single.take(0);
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, single);
        });
        test("should return a new array object when target is a n element array", function () {
            var taken = nArray.take(1);
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, nArray);
        });
        test("should return remaining numbers in array after number taken", function () {
            var taken = numbers.take(2);
            assert.ok(arrayEqual(taken, [2, 3]));
        });
        test("should return complete array if number taken is > array.length", function () {
            var taken = numbers.take(6);
            assert.ok(arrayEqual(taken, [2, 3, 1, 7]));
        });
        test("should return remaining strings in array after number taken", function () {
            var taken = strings.take(2);
            assert.ok(arrayEqual(taken, ["charlie", "alpha"]));
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
        test("should return array of numbers minus removed element(s)", function () {
            numbers.remove(3);
            assert.ok(arrayEqual(numbers, [2, 1, 7]));
        });
        test("should return array of strings minus removed element(s)", function () {
            strings.remove("alpha");
            assert.ok(arrayEqual(strings, ["charlie", "india", "bravo"]));
        });
        test("should return array of objects minus removed element(s)", function () {
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