import * as assert from "assert";
import "../src/arrayExt";

suite.only("ArrayExt", () =>    
{
    let numbers: number[];
    let strings: string[];
    
    let objects: any[];
    let first = { item: "item1", value: 1 };
    let second = { item: "item2", value: 2 };
    let third = { item: "item3", value: 3 };
    let fourth = { item: "item4", value: 4 };
    

    setup(() =>
    {
        numbers = [2, 3, 1, 7];
        strings = ["charlie", "alpha", "india", "bravo"];
        
        
        objects = [
            fourth,
            first,
            third,
            second
        ];
    });

    let arrayEqual = (actual: Array<any>, expected: Array<any>) =>
    {
        if (actual === expected)
            return true;

        if (actual === null || expected === null)
            return false;

        if (!(actual instanceof Array) || !(expected instanceof Array))
            return false;

        if (actual.length !== expected.length)
            return false;

        for (let i = 0; i < actual.length; i++)
        {
            if (actual[i] === expected[i])
                continue;

            return false;
        }

        return true;
    };

    suite("orderBy", () =>
    {
        test("should return array of numbers in ascending order", () => 
        {
            assert.ok(arrayEqual(numbers.orderBy(), [1, 2, 3, 7]));
        });

        test("should return array of strings in ascending order", () =>
        {
            assert.ok(arrayEqual(strings.orderBy(), ["alpha", "bravo", "charlie", "india"]));
        });

        test("should return array of objects in ascending order", () =>
        {
            let ordered = objects.orderBy(t => t.item);
            assert.ok(arrayEqual(ordered, [first, second, third, fourth]));
        });
    });

    suite("orderByDesc", () =>
    {
        test("should return array of numbers in descending order", () =>
        {
            assert.ok(arrayEqual(numbers.orderByDesc(), [7, 3, 2, 1]));
        });

        test("should return array of strings in descending order", () =>
        {
            assert.ok(arrayEqual(strings.orderByDesc(), ["india", "charlie", "bravo", "alpha"]));
        });

        test("should return array of objects in descending order", () =>
        {
            let ordered = objects.orderByDesc(t => t.value);
            assert.ok(arrayEqual(ordered, [fourth, third, second, first]));
        });
    });

    suite("skip", () =>
    {
        test("should return remaining numbers in array after number of elements skipped", () =>
        {
            assert.ok(arrayEqual(numbers.skip(2), [1, 7]));
        });
        
        test("should return empty array if number skipped is > array.length", () =>
        {
            assert.ok(arrayEqual(numbers.skip(7), []));
        });

        test("should return remaining strings in array after number of elements skipped", () =>
        {
            assert.ok(arrayEqual(strings.skip(2), ["india", "bravo"]));
        });

        test("should return remaining objects in array after number of elements skipped", () =>
        {
            let skipped = objects.skip(2);
            assert.ok(arrayEqual(skipped, [third, second]));
        });     
    });
    
    suite("take", () =>
    {
        test("should return remaining numbers in array after number taken", () =>
        {
            assert.ok(arrayEqual(numbers.take(2), [2, 3])); 
        });
        
        test("should return complete array if number taken is > array.length", () =>
        {
            assert.ok(arrayEqual(numbers.take(6), [2, 3, 1, 7]));
        });
        
        test("should return remaining strings in array after number taken", () =>
        {
            assert.ok(arrayEqual(strings.take(2), ["charlie", "alpha"]));
        });
        
        test("should return remaining objects in array after number taken", () =>
        {
            let taken = objects.take(2);
            assert.ok(arrayEqual(taken, [fourth, first]));
        });
    });
    
    suite("count", () =>
    {
        test("should return the length of the array when called without a predicate", () =>
        {
            let count = numbers.count();
            assert.strictEqual(count, numbers.length);
        });
        
        test("should return number of items that satisfy the predicate condition when called with a predicate", () =>
        {
            let count = numbers.count(t => t > 5);
            assert.strictEqual(count, 1);
        });
    });
    
    suite("remove", () =>
    {
        test("should return array of numbers minus removed element", () =>
        {
            numbers.remove(3);
            assert.ok(arrayEqual(numbers, [2, 1, 7]));     
        });
        
        test("should return array of strings minus removed element", () =>
        {
            strings.remove("alpha");
            assert.ok(arrayEqual(strings, ["charlie", "india", "bravo"]));
        });
        
        test("should return array of objects minus removed element", () =>
        {
            objects.remove(first);
            assert.ok(arrayEqual(objects, [fourth, third, second]));
        });
        
        test("should return false if element is not in array", () =>
        {
            let removed = numbers.remove(8);
            assert.strictEqual(removed, false);
        });
    });
    
    suite("clear", () =>
    {
        test("should remove all elements in array of numbers", () =>
        {
            numbers.clear();
            assert.ok(arrayEqual(numbers, []));
        });
        
        test("should remove all elements in array of strings", () =>
        {
            strings.clear();
            assert.ok(arrayEqual(strings, []));
        });
        
        test("should remove all elements in array of objects", () =>
        {
            objects.clear();
            assert.ok(arrayEqual(objects, []));
        });
    });
});