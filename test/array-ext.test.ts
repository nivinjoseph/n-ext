import * as assert from "assert";
import "../src/array-ext";

suite("ArrayExt", () =>    
{
    let numbers: number[];
    let largeNumbers: number[];
    let strings: string[];
    let empty: any[];
    let single: number[];
    
    let objects: any[];
    let first = { item: "item1", value: 1 };
    let second = { item: "item2", value: 2 };
    let third = { item: "item3", value: 3 };
    let fourth = { item: "item4", value: 4 };
    

    setup(() =>
    {
        numbers = [2, 3, 1, 7];
        largeNumbers = [0, 9, 17, 1, 12, 100, 2, 8, 25, 5];
        strings = ["charlie", "alpha", "india", "bravo"];
        empty = [];
        single = [1]; 
        
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
    
    suite("contains", () =>
    {
        test("should return true if item is in the target array", () =>
        {
            let target = ["a", "b", "c"];
            let result = target.contains("c");
            assert.strictEqual(result, true);
        });
        
        test("should return false if item is not in the target array", () =>
        {
            let target = [1, 2, 3];
            let result = target.contains(4);
            assert.strictEqual(result, false);
        });
    });
    
    suite("where", () =>
    {
        test("Given a collection, when the predicate does not match any values, then no values should be returned", () =>
        {
            const target = [1, 2, 3];
            const result = target.where(t => t > 3);
            assert.ok(arrayEqual(result, []));
        });
        
        test("Given a collection, when the predicate matches all the values, then all the values should be returned", () =>
        {
            const target = [1, 2, 3];
            const result = target.where(t => t <= 3);
            assert.ok(arrayEqual(result, [1, 2, 3]));
        });
        
        test("Given a collection, when the predicate matches some of the values, then only the matched values should be returned", () =>
        {
            const target = [1, 2, 3];
            const result = target.where(t => t === 2);
            assert.ok(arrayEqual(result, [2]));
        });
    });

    suite("orderBy", () =>
    {
        test("should return a new empty array object when target is an empty array", () =>
        {
            let ordered = empty.orderBy();
            assert.strictEqual(ordered.length, 0);
            assert.notStrictEqual(ordered, empty);
        });
        
        test("should return a new array object of the same length as the target when target is a single element array", () =>
        {
            let ordered = single.orderBy();
            assert.strictEqual(ordered.length, 1);
            assert.notStrictEqual(ordered, single);
        });
        
        test("should return a new array object of the same length as the target when target is a n element array", () =>
        {
            let ordered = numbers.orderBy();
            assert.strictEqual(ordered.length, numbers.length);
            assert.notStrictEqual(ordered, numbers);
        });
    
        test("should return array of numbers in ascending order", () => 
        {
            let ordered = largeNumbers.orderBy();
            assert.ok(arrayEqual(ordered, [0, 1, 2, 5, 8, 9, 12, 17, 25, 100]));
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
        test("should return a new empty array object when target is an empty array", () =>
        {
            let ordered = empty.orderByDesc();
            assert.strictEqual(ordered.length, empty.length);
            assert.notStrictEqual(ordered, empty);
        });
        
        test("should return a new array object of the same length as the target when target is a single element array", () =>
        {
            let ordered = single.orderByDesc();
            assert.strictEqual(ordered.length, single.length);
            assert.notStrictEqual(ordered, single);
        });
        
        test("should return a new array object of the same length as the target when target is a n element array", () =>
        {
            let ordered = numbers.orderByDesc();
            assert.strictEqual(ordered.length, numbers.length);
            assert.notStrictEqual(ordered, numbers);
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
    
    suite("groupBy", () =>
    {
        test("given array, should work", () =>
        {
            const items = [
                { Phase: "Phase 1", Step: "Step 1", Task: "Task 1", Value: "5" },
                { Phase: "Phase 1", Step: "Step 1", Task: "Task 2", Value: "10" },
                { Phase: "Phase 1", Step: "Step 2", Task: "Task 1", Value: "15" },
    
                { Phase: "Phase 2", Step: "Step 1", Task: "Task 1", Value: "25" },
                { Phase: "Phase 2", Step: "Step 1", Task: "Task 2", Value: "30" },
                { Phase: "Phase 2", Step: "Step 2", Task: "Task 1", Value: "35" },
                { Phase: "Phase 2", Step: "Step 2", Task: "Task 2", Value: "40" }
            ];
            
            const grouped = items.groupBy(t => t.Phase);
            
            assert.strictEqual(grouped.length, 2);
            assert.strictEqual(grouped.find(t => t.key === "Phase 1").values.length, 3);
            assert.strictEqual(grouped.find(t => t.key === "Phase 2").values.length, 4);
        });
    });

    suite("distinct", () =>
    {
        test("given array with primitives, should return distinct values", () =>
        {
            let duplicates = ["foo", "bar", "foo", "baz"];
            let distinct = duplicates.distinct();
            assert.strictEqual(distinct.length, 3);
            assert.ok(arrayEqual(distinct, ["foo", "bar", "baz"]));
        });
        
        test("given array of objects, should return distinct values", () =>
        {
            let duplicate = { id: 1, name: "shrey" };
            let duplicates = [duplicate, { id: 2, name: "nivin" }, { id: 3, name: "shrey" }, duplicate];
            let distinct = duplicates.distinct();
            assert.strictEqual(distinct.length, 3);
            assert.ok(arrayEqual(distinct, [duplicates[0], duplicates[1], duplicates[2]]));
        });
        
        test("given array of objects and equality func, should return distinct values in accordance with the equality func", () =>
        {
            let duplicate = { id: 1, name: "shrey" };
            let duplicates = [duplicate, { id: 2, name: "nivin" }, { id: 3, name: "shrey" }, duplicate];
            let distinct = duplicates.distinct(t => t.name);
            assert.strictEqual(distinct.length, 2);
            assert.ok(arrayEqual(distinct, [duplicates[0], duplicates[1]]));
        });
        
        test.skip("Performance", () =>
        {
            const collection = new Array<string>();
            for (let i = 0; i < 16777216; i++)
            {
                collection.push(`abc${i}`);
            }
            
            const start = Date.now();
            const distinct = collection.distinct();
            const end = Date.now();
            const diff = end - start;
            
            console.log("diff ms =>", diff);
            
            assert.strictEqual(distinct.length, collection.length);
        });
    });
    
    suite("skip", () =>
    {
        test("should return a new empty array object when target is an empty array", () =>
        {
            let skipped = empty.skip(0);
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, empty);
        });
        
        test("should return a new array object excluding elements skipped when target is a single element array", () =>
        {
            let skipped = single.skip(1);
            assert.ok(arrayEqual(skipped, []));
            assert.notStrictEqual(skipped, single);
        });
        
        test("should return a new array object excluding elements skipped when target is a n element array", () =>
        {
            let skipped = numbers.skip(1);
            assert.ok(arrayEqual(skipped, [3, 1, 7]));
            assert.notStrictEqual(skipped, numbers);
        });
        
        test("should return all array elements when number skipped is < 0", () =>
        {
            let skipped = numbers.skip(-2);
            assert.ok(arrayEqual(skipped, numbers));
        });
        
        test("should return numbers in array excluding elements skipped", () =>
        {
            let skipped = numbers.skip(2);
            assert.ok(arrayEqual(skipped, [1, 7]));
        });
        
        test("should return empty array if number skipped is > array.length", () =>
        {
            let skipped = numbers.skip(7);
            assert.ok(arrayEqual(skipped, []));
        });

        test("should return strings in array excluding elements skipped", () =>
        {
            let skipped = strings.skip(2);
            assert.ok(arrayEqual(skipped, ["india", "bravo"]));
        });

        test("should return objects in array excluding elements skipped", () =>
        {
            let skipped = objects.skip(2);
            assert.ok(arrayEqual(skipped, [third, second]));
        });     
    });
    
    suite("take", () =>
    {
        test("should return a new empty array object when target is an empty array", () =>
        {
            let taken = empty.take(1);
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, empty);
        });
        
        test("should return a new empty array object when target is a single element array and no elements have been taken", () =>
        {
            let taken = single.take(0);
            assert.ok(arrayEqual(taken, []));
            assert.notStrictEqual(taken, single);
        });
        
        test("should return a new array object containing element taken when target is a n element array", () =>
        {
            let taken = numbers.take(1);
            assert.ok(arrayEqual(taken, [2]));
            assert.notStrictEqual(taken, numbers);
        });
        
        test("should return empty array if number taken from target array is < 0", () =>
        {
            let taken = numbers.take(-3);
            assert.ok(arrayEqual(taken, []));
        });
        
        test("should return array of elements taken when target elements are numbers", () =>
        {
            let taken = numbers.take(2);
            assert.ok(arrayEqual(taken, [2, 3])); 
        });
        
        test("should return all array elements if number taken from target is > array.length", () =>
        {
            let taken = numbers.take(6);
            assert.ok(arrayEqual(taken, numbers));
        });
        
        test("should return all array elements if number taken from target is == array.length", () =>
        {
            let taken = numbers.take(numbers.length);
            assert.ok(arrayEqual(taken, numbers));
        });
        
        test("should return array of elements taken when target elements are strings", () =>
        {
            let taken = strings.take(2);
            assert.ok(arrayEqual(taken, ["charlie", "alpha"]));
        });
        
        test("should return array of elements taken when target elements are objects", () =>
        {
            let taken = objects.take(2); 
            assert.ok(arrayEqual(taken, [fourth, first]));
        });
    });
    
    suite("count", () =>
    {
        test("should return the length of the empty array when called on the target without a predicate", () =>
        {
            let count = empty.count();
            assert.strictEqual(count, empty.length);
        });
        
        test("should return the length of the single element array when called on the target without a predicate", () =>
        {
            let count = single.count();
            assert.strictEqual(count, single.length);
        });
        
        test("should return the length of the n element array when called on the target without a predicate", () =>
        {
            let count = strings.count();
            assert.strictEqual(count, strings.length);
        });
        
        test("should return number of items that satisfy the predicate condition when called on the target with a predicate", () =>
        {
            let count = numbers.count(t => t > 5);
            assert.strictEqual(count, 1);
        });        
    });
    
    suite("remove", () =>
    {
        test("should return array of numbers in target minus removed element(s)", () =>
        {
            numbers.remove(3);
            assert.ok(arrayEqual(numbers, [2, 1, 7]));     
        });
        
        test("should return array of strings in target minus removed element(s)", () =>
        {
            strings.remove("alpha");
            assert.ok(arrayEqual(strings, ["charlie", "india", "bravo"]));
        });
        
        test("should return array of objects in target minus removed element(s)", () =>
        {
            objects.remove(first);
            assert.ok(arrayEqual(objects, [fourth, third, second]));
        });
        
        test("should return false if element is not in target array", () =>
        {
            let removed = numbers.remove(8);
            assert.strictEqual(removed, false);
        });
        
        test("should return empty array if empty array is target and no elements are removed", () =>
        {
            empty.remove(0);
            assert.ok(arrayEqual(empty, []));
        });
    });
    
    suite("clear", () =>
    {
        test("should return empty array if target array of numbers is cleared", () =>
        {
            numbers.clear();
            assert.ok(arrayEqual(numbers, []));
        });
        
        test("should return empty array if target array of strings is cleared", () =>
        {
            strings.clear(); 
            assert.ok(arrayEqual(strings, []));
        });
        
        test("should return empty array if target array of objects is cleared", () =>
        {
            objects.clear();
            assert.ok(arrayEqual(objects, []));
        });
        
        test("should return empty array if empty target array is cleared", () =>
        {
            empty.clear();
            assert.ok(arrayEqual(empty, []));
        });
        
        test("should return empty array if single element target array is cleared", () =>
        {
            single.clear();
            assert.ok(arrayEqual(single, []));
        });
    });
    
    suite("equals", () =>
    {
        test("should return true when arrays are similar", () =>
        {
            let obj = {};
            let original = ["a", 1, false, obj];
            let compare = ["a", 1, false, obj];
            
            let result = original.equals(compare);
            assert.strictEqual(result, true);
        });
        
        test("should return false when arrays are not similar", () =>
        {
            let original = ["a", 1, false, {}];
            let compare = ["a", 1, false, {}];

            let result = original.equals(compare);
            assert.strictEqual(result, false);
        });
    });
    
    suite("forEachAsync", () =>
    {
        test("should successfully execute", async () =>
        {
            let target = [1, 2, 3, 4, 5, 6];
            let result: number[] = [];
            let asyncFunc = (num: number) =>
            {
                // @ts-ignore
                return new Promise<void>((resolve, reject) =>
                {
                    setTimeout(() =>
                    {
                        result.push(num);
                        resolve();
                    }, 200);
                });
            };
            
            let before = Date.now();
            await target.forEachAsync(asyncFunc, 5);
            let after = Date.now();
            
            assert.strictEqual(target.length, result.length);
            // console.log(result);
            assert.ok(arrayEqual(result.orderBy(), target));
            assert.ok((after - before) < 650);
        });
    });
    
    suite("mapAsync", () =>
    {
        test("should successfully execute", async () =>
        {
            let target = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            let asyncFunc = (num: number) =>
            {
                // @ts-ignore
                return new Promise<number>((resolve, reject) =>
                {
                    setTimeout(() =>
                    {
                        resolve(num * num);
                    }, 200);
                });
            };

            let before = Date.now();
            let result = await target.mapAsync(asyncFunc, 5);
            let after = Date.now();

            assert.strictEqual(target.length, result.length);
            console.log(result);
            assert.ok(arrayEqual(result, [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169]));
            console.log(after - before);
        });
    });
    
    suite("reduceAsync", () =>
    {
        test("should return right value when called without accumulator", async () =>
        {
            let target = [1, 2, 3, 4, 5, 6];
            // @ts-ignore
            let numExecutions = 0;
            let reduced = target.reduce((acc, num) =>
            {
                numExecutions++;
                return acc + num;
            });
            
            // console.log("numExecutions", numExecutions);
            let asyncFunc = (acc: number, num: number) =>
            {
                // @ts-ignore
                return new Promise<number>((resolve, reject) =>
                {
                    setTimeout(() =>
                    {
                        resolve(acc + num);
                    }, 200);
                });
            };

            let before = Date.now();
            let result = await target.reduceAsync(asyncFunc);
            let after = Date.now();

            assert.strictEqual(result, 21);
            assert.strictEqual(result, reduced);
            assert.ok((after - before) > 1000);
        });
        
        test("should return right value when called with accumulator", async () =>
        {
            let target = [1, 2, 3, 4, 5, 6];
            let reduced = target.reduce((acc, num) => acc + num, 0);
            let asyncFunc = (acc: number, num: number) =>
            {
                // @ts-ignore
                return new Promise<number>((resolve, reject) =>
                {
                    setTimeout(() =>
                    {
                        resolve(acc + num);
                    }, 200);
                });
            };

            let before = Date.now();
            let result = await target.reduceAsync(asyncFunc, 0);
            let after = Date.now();

            assert.strictEqual(result, 21);
            assert.strictEqual(result, reduced);
            assert.ok((after - before) > 1200);
        });
    });
    
    suite("isEmpty", () =>
    {
        test("Given an empty array, When isEmpty is accessed, Then the return value should be true", () =>
        {
            const target = new Array<any>();
            
            assert.strictEqual(target.isEmpty, true);
        });
        
        test("Given a non-empty array, When isEmpty is accessed, Then the return value should be false", () =>
        {
            const target = [1, 2];

            assert.strictEqual(target.isEmpty, false);
        });
    });
    
    suite("isNotEmpty", () =>
    {
        test("Given an empty array, When isNotEmpty is accessed, Then the return value should be false", () =>
        {
            const target = new Array<any>();

            assert.strictEqual(target.isNotEmpty, false);
        });
        
        test("Given a non-empty array, When isNotEmpty is accessed, Then the return value should be true", () =>
        {
            const target = [1, 2];

            assert.strictEqual(target.isNotEmpty, true);
        });
    });
});