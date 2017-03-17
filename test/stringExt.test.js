"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
require("../src/stringExt");
suite.only("StringExt", function () {
    suite("isWhiteSpace", function () {
        test("should return true when called on an empty string", function () {
            var testVal = "";
            var result = testVal.isWhiteSpace();
            assert.strictEqual(result, true);
        });
        test("should return true when called on a non-empty string with space characters", function () {
            var testVal = "   ";
            var result = testVal.isWhiteSpace();
            assert.strictEqual(result, true);
        });
        test("should return false when called on a non-empty string", function () {
            var testVal = "foo";
            var result = testVal.isWhiteSpace();
            assert.strictEqual(result, false);
        });
        test("should return false when called on a non-empty string with space and regular characters", function () {
            var testVal = "  foo bar  ";
            var result = testVal.isWhiteSpace();
            assert.strictEqual(result, false);
        });
    });
    suite("contains", function () {
        test("should return true if argument is a substring of the target string", function () {
            var target = "foo bar";
            var arg = "bar";
            var result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if argument is not a substring of the target string", function () {
            var target = "foo bar";
            var arg = "baz";
            var result = target.contains(arg);
            assert.strictEqual(result, false);
        });
        test("should return false if argument is not a substring of the target string", function () {
            var target = "foo bar";
            var arg = "foo baz";
            var result = target.contains(arg);
            assert.strictEqual(result, false);
        });
        test("should return true if argument is a space character in the target string", function () {
            var target = "foo bar";
            var arg = " ";
            var result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        test("should return true if argument is an empty string of the target string", function () {
            var target = "foo bar";
            var arg = "";
            var result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        test("should return true if argument and target string are both empty", function () {
            var target = "";
            var arg = "";
            var result = target.contains(arg);
            assert.strictEqual(result, true);
        });
    });
    suite("startsWith", function () {
        test("should return true if the first character in the target string matches the argument", function () {
            var target = "Foo";
            var arg = "F";
            var result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if the first character in the target string does not match the argument", function () {
            var target = "Foo";
            var arg = "A";
            var result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return false if the the first character in the target string is not the same capitalization as the argument", function () {
            var target = "Foo";
            var arg = "f";
            var result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return true if first character in the target string does not match the argument that is an empty string", function () {
            var target = "Foo";
            var arg = "";
            var result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if the first character in the target string does not match the argument that is a space character", function () {
            var target = "Foo";
            var arg = " ";
            var result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return true if the target string is an empty string and the argument has a single character", function () {
            var target = "";
            var arg = "a";
            var result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if target string is a space character and the argument is a non space character", function () {
            var target = " ";
            var arg = "a";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return true if all characters in the target string start with all the characters in the argument string", function () {
            var target = "Foo";
            var arg = "Foo";
            var result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if target string starts with a space character and the argument has a non space character", function () {
            var target = " Foo";
            var arg = "F";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return false if target string is a space character and the argument is a non space character", function () {
            var target = " ";
            var arg = "";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return false if target string is a non space character and the argument is a space character", function () {
            var target = "";
            var arg = " ";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
    });
    suite("endsWith", function () {
        test("should return true if the last character in the target string matches the argument", function () {
            var target = "Foo";
            var arg = "o";
            var result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if the last character in the target string does not match the argument", function () {
            var target = "Foo";
            var arg = "a";
            var result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return false if the the last character in the target string is not the same capitalization as the argument", function () {
            var target = "Foo";
            var arg = "O";
            var result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return true if last character in the target string does not match the argument that is an empty string", function () {
            var target = "Foo";
            var arg = "";
            var result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if the last character in the target string does not match the argument that is a space character", function () {
            var target = "Foo";
            var arg = " ";
            var result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return true if the target string is an empty string and the argument has a character", function () {
            var target = "";
            var arg = "a";
            var result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if target string is a space character and the argument is a non space character", function () {
            var target = " ";
            var arg = "a";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return true if all characters in the target string end with all the characters in the argument string", function () {
            var target = "Foo";
            var arg = "Foo";
            var result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });
        test("should return false if target string ends with a space character and the argument has a non space character", function () {
            var target = "Foo ";
            var arg = "o";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return false if target string is a space character and the argument is a non space character", function () {
            var target = " ";
            var arg = "";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
        test("should return false if target string is a non space character and the argument is a space character", function () {
            var target = "";
            var arg = " ";
            var result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
    });
    suite("extractNumbers", function () {
        test("should return empty string when target string contains no numbers", function () {
            var target = "abc";
            var result = target.extractNumbers();
            assert.strictEqual(result, "");
        });
        test("should return numbers when target string has numbers at the beginning", function () {
            var target = "123abc";
            var result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        test("should return numbers when target string has numbers at the end", function () {
            var target = "abc123";
            var result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        test("should return numbers when target string has numbers in the middle", function () {
            var target = "abc123abc";
            var result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        test("should return all numbers when target string has numbers scattered throught", function () {
            var target = "1a2b3c";
            var result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
    });
    suite("format", function () {
        test("should return the formated string with the arguments in order", function () {
            var target = "my name is {0} {1}";
            var result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola Deluca");
        });
        test("should return the formated string containing only the first argument twice", function () {
            var target = "my name is {0} {0}";
            var result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola Viola");
        });
        test("should return the formated string with the arguments in reverse order", function () {
            var target = "my name is {1} {0}";
            var result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Deluca Viola");
        });
        test("should return the formated string containing only the first argument, leaving the {2} unchanged", function () {
            var target = "my name is {0} {2}";
            var result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola {2}");
        });
        test("should return an empty string if the target is an empty string and the argument has a value", function () {
            var target = "";
            var result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "");
        });
        test("should return the original target unformated when target provides no placeholders", function () {
            var target = "my name is";
            var result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is");
        });
        test("should return the original string if the target has placeholders and the argument provided is an empty string", function () {
            var target = "my name is {0} {1}";
            var result = target.format("");
            assert.strictEqual(result, "my name is {0} {1}");
        });
        test("should return the original string if the target has placeholders but no arguments are provided", function () {
            var target = "my name is {0} {1}";
            var result = target.format();
            assert.strictEqual(result, "my name is {0} {1}");
        });
        test("should return the formated string with the first two arguments when there are more arguments than placeholders", function () {
            var target = "my name is {0} {1}";
            var result = target.format("Viola", "Deluca", "Nivin", "Joseph");
            assert.strictEqual(result, "my name is Viola Deluca");
        });
        test("should return the formated string with only the first placeholder changed given a single argument", function () {
            var target = "my name is {0} {1}";
            var result = target.format("Viola");
            assert.strictEqual(result, "my name is Viola");
        });
    });
});
//# sourceMappingURL=stringExt.test.js.map