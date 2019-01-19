import * as assert from "assert";
import "../src/string-ext";

suite("StringExt", () =>
{
    suite("isEmptyOrWhiteSpace", () =>
    {
        test("should return true when called on an empty string", () =>
        {
            let target = "";
            let result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, true);
        });
        
        test("should return true when called on a non-empty string with space characters", () =>
        {
            let target = "   ";
            let result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, true);
        });
        
        test("should return false when called on a non-empty string", () =>
        {
            let target = "foo";    
            let result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, false);
        });
        
        test("should return false when called on a non-empty string with space and regular characters", () =>
        {
            let target = "  foo bar  ";    
            let result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, false);
        });
    });
    
    suite("contains", () =>
    {
        test("should return true if argument is a substring of the target string", () =>
        {
            let target = "foo bar";
            let arg = "bar";
            let result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if argument is not a substring of the target string", () =>
        {
            let target = "foo bar";
            let arg = "baz";
            let result = target.contains(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return false if argument is partially of the target string", () =>
        {
            let target = "foo bar";
            let arg = "foo baz";
            let result = target.contains(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return true if argument is a space character in the target string", () =>
        {
            let target = "foo bar";
            let arg = " ";
            let result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return true if argument is an empty string of the target string", () =>
        {
            let target = "foo bar";
            let arg = "";
            let result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return true if argument and target string are both empty", () =>
        {
            let target = "";
            let arg = "";
            let result = target.contains(arg);
            assert.strictEqual(result, true);
        });
    });
    
    suite("startsWith", () =>
    {
        test("should return true if the first character in the target string matches the argument", () =>
        {
            let target = "Foo";
            let arg = "F";
            let result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if the first character in the target string does not match the argument", () =>
        {
            let target = "Foo";
            let arg = "A"; 
            let result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return false if the the first character in the target string is not the same capitalization as the argument", () =>
        {
            let target = "Foo";
            let arg = "f";
            let result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return true if first character in the target string does not match the argument that is an empty string", () =>
        {
            let target = "Foo";
            let arg = "";
            let result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if the first character in the target string does not match the argument that is a space character", () =>
        {
            let target = "Foo";
            let arg = " ";
            let result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return false if the target string is an empty string and the argument has a single character", () =>
        {
            let target = "";
            let arg = "a";
            let result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if target string is a space character and the argument is a non space character", () =>
        {
            let target = " ";
            let arg = "a";
            let result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if all characters in the target string start with all the characters in the argument string", () =>
        {
            let target = "Foo";
            let arg = "Foo";
            let result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if target string starts with a space character and the argument has a non space character", () =>
        {
            let target = " Foo";
            let arg = "F";
            let result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return true if target string is a space character and the argument is a non space character", () =>
        {
            let target = " ";
            let arg = "";
            let result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if target is an empty string and the argument is a space character", () =>
        {
            let target = "";
            let arg = " ";
            let result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
    });
    
    suite("endsWith", () =>
    {
        test("should return true if the last character in the target string matches the argument", () =>
        {
            let target = "Foo";
            let arg = "o";
            let result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if the last character in the target string does not match the argument", () =>
        {
            let target = "Foo";
            let arg = "a";
            let result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if the the last character in the target string is not the same capitalization as the argument", () =>
        {
            let target = "Foo";
            let arg = "O";
            let result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if last character in the target string does not match the argument that is an empty string", () =>
        {
            let target = "Foo";
            let arg = "";
            let result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if the last character in the target string does not match the argument that is a space character", () =>
        {
            let target = "Foo";
            let arg = " ";
            let result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if the target string is an empty string and the argument has a single character", () =>
        {
            let target = "";
            let arg = "a";
            let result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if target string is a space character and the argument is a non space character", () =>
        {
            let target = " ";
            let arg = "a";
            let result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if all characters in the target string end with all the characters in the argument string", () =>
        {
            let target = "Foo";
            let arg = "Foo";
            let result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if target string ends with a space character and the argument has a non space character", () =>
        {
            let target = "Foo ";
            let arg = "o";
            let result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if target string is a space character and the argument is a non space character", () =>
        {
            let target = " ";
            let arg = "";
            let result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if target is an empty string and the argument is a space character", () =>
        {
            let target = "";
            let arg = " ";
            let result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
    });
    
    suite("extractNumbers", () =>
    {
        test("should return empty string when target string contains no numbers", () =>
        {
            let target = "abc";        
            let result = target.extractNumbers();
            assert.strictEqual(result, "");
        });
        
        test("should return numbers when target string has numbers at the beginning", () =>
        {
            let target = "123abc";
            let result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        
        test("should return numbers when target string has numbers at the end", () =>
        {
            let target = "abc123";
            let result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        
        test("should return numbers when target string has numbers in the middle", () =>
        {
            let target = "abc123abc";
            let result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        
        test("should return all numbers when target string has numbers scattered through out", () =>
        {
            let target = "1a24-b34__89c/78l";
            let result = target.extractNumbers();
            assert.strictEqual(result, "124348978");
        });
    });
    
    suite("extractCharacters", () =>
    {
        test("should return empty string when target string contains no characters", () =>
        {
            let target = "123";
            let result = target.extractCharacters();
            assert.strictEqual(result, "");
        });

        test("should return characters when target string has characters at the beginning", () =>
        {
            let target = "ab c 123";
            let result = target.extractCharacters();
            assert.strictEqual(result, "ab c ");
        });

        test("should return characters when target string has characters at the end", () =>
        {
            let target = "123ab c";
            let result = target.extractCharacters();
            assert.strictEqual(result, "ab c");
        });

        test("should return characters when target string has characters in the middle", () =>
        {
            let target = "123abc345 ";
            let result = target.extractCharacters();
            assert.strictEqual(result, "abc ");
        });

        test("should return all characters when target string has characters scattered through out", () =>
        {
            let target = "1a24bk-jf348 9c  78l ";
            let result = target.extractCharacters();
            assert.strictEqual(result, "abkjf c  l ");
        });
    });
    
    suite("format", () =>
    {
        test("should return formated string with arguments in order", () =>
        {
            let target = "my name is {0} {1}";  
            let result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola Deluca");
        });
        
        test("should return formated string containing only first argument twice", () =>
        {
            let target = "my name is {0} {0}";
            let result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola Viola");
        });

        test("should return formated string with arguments in reverse order", () =>
        {
            let target = "my name is {1} {0}";
            let result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Deluca Viola");
        });

        test("should return formated string containing only first argument, leaving {2} unchanged", () =>
        {
            let target = "my name is {0} {2}";
            let result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola {2}");
        });
        
        test("should return an empty string if target is an empty string and argument has value", () =>
        {
            let target = "";
            let result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "");
        });
        
        test("should return original target unformated when target provides no placeholders", () =>
        {
            let target = "my name is";
            let result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is");
        });
        
        test("should return formated string with placeholder replaced by empty string if target has placeholders and argument provided is an empty string", () =>
        {
            let target = "my name is {0} {1}";
            let result = target.format("");
            assert.strictEqual(result, "my name is  {1}");
        });
        
        test("should return original string if target has placeholders but no arguments are provided", () =>
        {
            let target = "my name is {0} {1}";
            let result = target.format();
            assert.strictEqual(result, "my name is {0} {1}");
        });
        
        test("should return formated string with first two arguments when there are more arguments than placeholders", () =>
        {
            let target = "my name is {0} {1}";
            let result = target.format("Viola", "Deluca", "Nivin", "Joseph");
            assert.strictEqual(result, "my name is Viola Deluca");
        });
        
        test("should return formated string with only first placeholder changed given a single argument", () =>
        {
            let target = "my name is {0} {1}";
            let result = target.format("Viola");
            assert.strictEqual(result, "my name is Viola {1}");
        });
    });
    
    suite("replaceAll", () =>
    {
        test("should not change anything if search value is not found", () =>
        {
            let target = "Mr Blue has a blue house and a blue car";
            let searchValue = "red";
            let replaceValue = "green";
            
            let result = target.replaceAll(searchValue, replaceValue);
            
            assert.strictEqual(result, target);
        });
        
        test("should replace all occurances of search value if it is found", () =>
        {
            let target = "Mr Blue has a blue house and a blue car";
            let searchValue = "blue";
            let replaceValue = "red";

            let result = target.replaceAll(searchValue, replaceValue);

            assert.strictEqual(result, "Mr Blue has a red house and a red car");
        });
        
        // test("should replace all occurances of search value case insensitive if found", () =>
        // {
        //     let target = "Mr Blue has a blue house and a blue car";
        //     let searchValue = "blue";
        //     let replaceValue = "red";

        //     let result = target.replaceAll(searchValue, replaceValue, true);

        //     assert.strictEqual(result, "Mr red has a red house and a red car");
        // });
        
        test("should replace all occurances of search value when original value contains special characters", () =>
        {
            let target = "http://localhost:4002/pim-api/getProducts?$pageNumber=1&$pageSize=500";
            let searchValue = "Products";
            let replaceValue = "Assets";

            let result = target.replaceAll(searchValue, replaceValue);

            assert.strictEqual(result, "http://localhost:4002/pim-api/getAssets?$pageNumber=1&$pageSize=500");
        });
    });
    
    suite("base64Encode and base64Decode", () =>
    {
        test("should successfully encode and decode", () =>
        {
            let value = "sdjhfbe326t3rguy78hy^T^%R*uq9321we183et++==hgdedrt^%$#@!)(*";
            let encoded = value.base64Encode();
            // console.log(encoded);
            assert.notStrictEqual(encoded, value);
            let decoded = encoded.base64Decode();
            assert.strictEqual(decoded, value);
        });
    });
    
    suite("base64UrlEncode and base64UrlDecode", () =>
    {
        test("should successfully encode and decode", () =>
        {
            let value = "sdjhfbe326t3rguy78hy^T^%R*uq9321we183et++==hgdedrt^%$#@!)(*";
            let encoded = value.base64UrlEncode();
            // console.log(encoded);
            assert.notStrictEqual(encoded, value);
            let decoded = encoded.base64UrlDecode();
            assert.strictEqual(decoded, value);
        });
    });
    
    suite("hexEncode and hexDecode", () =>
    {
        test("should successfully encode and decode", () =>
        {
            let value = "sdjhfbe326t3rguy78hy^T^%R*uq9321we183et++==hgdedrt^%$#@!)(*";
            let encoded = value.hexEncode();
            // console.log(encoded);
            assert.notStrictEqual(encoded, value);
            let decoded = encoded.hexDecode();
            assert.strictEqual(decoded, value);
        });
    });
});