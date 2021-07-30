import * as Assert from "assert";
import "../src/math-ext";


suite("MathExt", () =>
{
    suite("percentage", () =>
    {
        test("percentage", () =>
        {
            Assert.strictEqual(Math.percentage(10, 200), 5);
        });

        test("percentagePartial", () =>
        {
            Assert.strictEqual(Math.percentagePartial(5, 200), 10);
        });

        test("percentageWhole", () =>
        {
            Assert.strictEqual(Math.percentageWhole(5, 10), 200);
        });
    });
    
    suite("clamp", () =>
    {
        test("below range", () =>
        {
            Assert.strictEqual(Math.clamp(5, 6, 10), 6);
        });

        test("within range", () =>
        {
            Assert.strictEqual(Math.clamp(8, 6, 10), 8);
        });

        test("above range", () =>
        {
            Assert.strictEqual(Math.clamp(14, 6, 10), 10);
        });
    });
    
    suite("median", () =>
    {
        test("median empty", () =>
        {
            Assert.strictEqual(Math.median([]), null);
        });
        
        test("median nulls", () =>
        {
            Assert.strictEqual(Math.median([null, undefined, null, null]), null);
        });
        
        test("median one", () =>
        {
            Assert.strictEqual(Math.median([5]), 5);
        });
        
        test("median odd", () =>
        {
            Assert.strictEqual(Math.median([1, 6, 3, 3, 9, 7, 8]), 6);
        });
        
        test("median even", () =>
        {
            Assert.strictEqual(Math.median([4, 1, 2, 3, 9, 5, 8, 6]), 4.5);
        });
    });
});