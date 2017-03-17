import * as assert from "assert";
import "../src/arrayExt";

suite.only("ArrayExt", () =>    
{
    let numbers: number[];
    let strings: string[];
    let empty: any[];
    let single: number[];
    let nArray: any[];
    
    let objects: any[];
    let first = { item: "item1", value: 1 };
    let second = { item: "item2", value: 2 };
    let third = { item: "item3", value: 3 };
    let fourth = { item: "item4", value: 4 };
    

    setup(() =>
    {
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
        test("should return a new array empty object when target is an empty array", () =>
        {
            let ordered = empty.orderBy();
            
            assert.strictEqual(ordered.length, 0);
            assert.notStrictEqual(ordered, empty);
        });
        
        test("should return a new array object when target is a single element array", () =>
        {
            let ordered = single.orderBy();
            
            assert.strictEqual(ordered.length, 1);
            assert.notStrictEqual(ordered, single);
        });
        
        test("should return a new array object when target is a n element array", () =>
        {
            let ordered = nArray.orderBy();
            
            assert.strictEqual(ordered.length, nArray.length);
            assert.notStrictEqual(ordered, nArray);
        });
        
        test("should return array of numbers in ascending order", () => 
        {
            let ordered = numbers.orderBy();
            
            assert.ok(arrayEqual(ordered, [1, 2, 3, 7]));
        });

        test("should return array of strings in ascending order", () =>
        {
            let ordered = strings.orderBy();
            
            assert.ok(arrayEqual(ordered, ["alpha", "bravo", "charlie", "india"]));
        });

        test("should return array of objects in ascending order", () =>
        {
            let ordered = objects.orderBy(t => t.item);
            
            assert.ok(arrayEqual(ordered, [first, second, third, fourth]));
        });
    });

    suite("orderByDesc", () =>
    {
        test("should return a new array object when target is an empty array", () =>
        {
            let ordered = empty.orderByDesc();
            
            assert.strictEqual(ordered.length, 0);
            assert.notStrictEqual(ordered, empty);
        });
        test("should return a new array object when target is a single element array", () =>
        {
            let ordered = single.orderByDesc();
            
            assert.strictEqual(ordered.length, 1);
            assert.notStrictEqual(ordered, 1);
        });
        test("should return a new array object when target is a n element array", () =>
        {
            let ordered = nArray.orderByDesc();
            
            assert.strictEqual(ordered.length, nArray.length);
            assert.notStrictEqual(ordered, nArray);
        });
        
        test("should return array of numbers in descending order", () =>
        {
            let ordered = numbers.orderByDesc();
            
            assert.ok(arrayEqual(ordered, [7, 3, 2, 1]));
        });

        test("should return array of strings in descending order", () =>
        {
            let ordered = strings.orderByDesc();
            
            assert.ok(arrayEqual(ordered, ["india", "charlie", "bravo", "alpha"]));
        });

        test("should return array of objects in descending order", () =>
        {
            let ordered = objects.orderByDesc(t => t.value);
            
            assert.ok(arrayEqual(ordered, [fourth, third, second, first]));
        });
    });

    suite("skip", () =>
    {
        test("should return a new array object when target is an empty array", () =>
        {
            let skipped = empty.skip(1);
            
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, empty);
        });
        test("should return a new array object when target is a single element array", () =>
        {
            let skipped = single.skip(1);
            
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, single);
        });
        test("should return a new array object when target is a n element array", () =>
        {
            let skipped = nArray.skip(1);
            
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, nArray);
        });
        
        test("should return remaining numbers in array after number of elements skipped", () =>
        {
            let skipped = numbers.skip(2);
            
            assert.ok(arrayEqual(skipped, [1, 7]));
        });
        
        test("should return empty array if number skipped is > array.length", () =>
        {
            let skipped = numbers.skip(7);
            
            assert.ok(arrayEqual(skipped, []));
        });

        test("should return remaining strings in array after number of elements skipped", () =>
        {
            let skipped = strings.skip(2);
            
            assert.ok(arrayEqual(skipped, ["india", "bravo"]));
        });

        test("should return remaining objects in array after number of elements skipped", () =>
        {
            let skipped = objects.skip(2);
            
            assert.ok(arrayEqual(skipped, [third, second]));
        });     
    });
    
    suite("take", () =>
    {
        test("should return a new array object when target is an empty array", () =>
        {
            let taken = empty.take(1);
            
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, empty);
        });
        
        test("should return a new array object when target is a single element array", () =>
        {
            let taken = single.take(0);
            
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, single);
        });
        
        test("should return a new array object when target is a n element array", () =>
        {
            let taken = nArray.take(1);
            
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, nArray);
        });
        
        test("should return remaining numbers in array after number taken", () =>
        {
            let taken = numbers.take(2);
            
            assert.ok(arrayEqual(taken, [2, 3])); 
        });
        
        test("should return complete array if number taken is > array.length", () =>
        {
            let taken = numbers.take(6);
            
            assert.ok(arrayEqual(taken, [2, 3, 1, 7]));
        });
        
        test("should return remaining strings in array after number taken", () =>
        {
            let taken = strings.take(2);
            
            assert.ok(arrayEqual(taken, ["charlie", "alpha"]));
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
        test("should return array of numbers minus removed element(s)", () =>
        {
            numbers.remove(3);
            
            assert.ok(arrayEqual(numbers, [2, 1, 7]));     
        });
        
        test("should return array of strings minus removed element(s)", () =>
        {
            strings.remove("alpha");
            
            assert.ok(arrayEqual(strings, ["charlie", "india", "bravo"]));
        });
        
        test("should return array of objects minus removed element(s)", () =>
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