import * as assert from "assert";
import "../src/arrayExt";

suite("ArrayExt", () =>    
{
    let numbers: number[];
    let strings: string[];
    let objects: any[];

    setup(() =>
    {
        numbers = [2, 3, 1, 7];
        strings = ["charlie", "alpha", "india", "bravo"];
        objects = [
            { item: "item4", value: 4 },
            { item: "item1", value: 1 },
            { item: "item3", value: 3 },
            { item: "item2", value: 2 }
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

    suite("orderBy()", () =>
    {
        test("should return array of numbers in ascending order", () => 
        {
            assert.ok(arrayEqual(numbers.orderBy(), [1, 2, 3, 7]));
        });

        test("should return array of strings in ascending order", () =>
        {
            assert.ok(arrayEqual(strings.orderBy(), ["alpha", "bravo", "charlie", "india"]));
        });

        test.skip("should return array of objects in ascending order", () =>
        {
            assert.ok(arrayEqual(objects.orderBy(), [
                { item: "item1", value: 1 },
                { item: "item2", value: 2 },
                { item: "item3", value: 3 },
                { item: "item4", value: 4 }
            ]));
        });
    });

    suite("orderByDesc()", () =>
    {
        test("should return array of numbers in descending order", () =>
        {
            assert.ok(arrayEqual(numbers.orderByDesc(), [7, 3, 2, 1]));
        });

        test("should return array of strings in descending order", () =>
        {
            assert.ok(arrayEqual(strings.orderByDesc(), ["india", "charlie", "bravo", "alpha"]));
        });

        test.skip("should return array of objects in descending order", () =>
        {

        });
    });

    suite("skip()", () =>
    {
        test("should return remaining numbers in array after number skipped", () =>
        {
            assert.ok(arrayEqual(numbers.skip(2), [1, 7]));
        });

        test("should return remaining strings in array after number skipped", () =>
        {
            assert.ok(arrayEqual(strings.skip(2), ["india", "bravo"]));
        });

        test.skip("should return remaining objects in array after number skipped", () =>
        {
            
        });     
    });
    
    suite("take()", () =>
    {
        test("should return remaining numbers in array after number taken", () =>
        {
            assert.ok(arrayEqual(numbers.take(2), [2, 3])); 
        });
        
        test("should return remaining strings in array after number taken", () =>
        {
            assert.ok(arrayEqual(strings.take(2), ["charlie", "alpha"]));
        });
        
        test.skip("should return remaining objects in array after number taken", () =>
        {
            
        });
    });
    
    suite("count()", () =>
    {
        test.only("", () =>
        {
            console.log(numbers.count());
        }); 
    });
});