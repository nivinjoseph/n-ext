import * as assert from "assert";
import "../src/stringExt";

suite.only("StringExt", () =>
{
    suite("isWhiteSpace()", () =>
    {
        test("should return true when called on an empty string", () =>
        {
            let testVal = "";
            
            let result = testVal.isWhiteSpace();
            
            assert.ok(result === true);
        });
        
        test("should return true when called on a non-empty string with space characters", () =>
        {
            let testVal = "   ";
            
            let result = testVal.isWhiteSpace();
            
            assert.ok(result === true);
        });
        
        test("should return false when called on a non-empty string", () =>
        {
            let testVal = "foo";
            
            let result = testVal.isWhiteSpace();
            
            assert.ok(result === false);
        });
        
        test("should return false when called on a non-empty string with space and regular characters", () =>
        {
            let testVal = "  foo bar  ";
            
            let result = testVal.isWhiteSpace();
            
            assert.ok(result === false);
        });
    });
    
    suite("contains()", () =>
    {
        test("should return true if argument is a substring of the original string", () =>
        {
            let testVal = "foo bar";
            let arg = "bar";
            
            let result = testVal.contains(arg);
            
            assert.deepStrictEqual(result, true);
        });
    });
});