import * as Assert from "assert";
import "../src/math-ext";


suite("MathExt", () =>
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