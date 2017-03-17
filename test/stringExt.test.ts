import * as assert from "assert";
import "../src/stringExt";

suite("StringExt", () =>
{
    suite("isEmptyOrWhiteSpace", () =>
    {
        test("should return true when called on an empty string", () =>
        {
            let testVal = "";
            
            let result = testVal.isEmptyOrWhiteSpace();
            
            assert.ok(result === true);
        });
        
        test("should return true when called on a non-empty string with space characters", () =>
        {
            let testVal = "   ";
            
            let result = testVal.isEmptyOrWhiteSpace();
            
            assert.ok(result === true);
        });
        
        test("should return false when called on a non-empty string", () =>
        {
            let testVal = "foo";
            
            let result = testVal.isEmptyOrWhiteSpace();
            
            assert.ok(result === false);
        });
        
        test("should return false when called on a non-empty string with space and regular characters", () =>
        {
            let testVal = "  foo bar  ";
            
            let result = testVal.isEmptyOrWhiteSpace();
            
            assert.ok(result === false);
        });
    });
});