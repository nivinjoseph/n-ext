var ArrayExt = (function () {
    function ArrayExt() {
    }
    ArrayExt.orderBy = function (array, compareFunc) {
        var internalArray = [];
        for (var i = 0; i < array.length; i++)
            internalArray.push(array[i]);
        if (compareFunc == null)
            compareFunc = function (value) { return value; };
        internalArray.sort(function (a, b) {
            var valA = compareFunc(a);
            var valB = compareFunc(b);
            if (valA < valB)
                return -1;
            if (valA > valB)
                return 1;
            return 0;
        });
        return internalArray;
    };
    ArrayExt.orderByDesc = function (array, compareFunc) {
        var internalArray = [];
        for (var i = 0; i < array.length; i++)
            internalArray.push(array[i]);
        if (compareFunc == null)
            compareFunc = function (value) { return value; };
        internalArray.sort(function (a, b) {
            var valA = compareFunc(a);
            var valB = compareFunc(b);
            if (valB < valA)
                return -1;
            if (valB > valA)
                return 1;
            return 0;
        });
        return internalArray;
    };
    ArrayExt.distinct = function (array, equalityFunc) {
        if (equalityFunc == null)
            equalityFunc = function (value1, value2) { return value1 === value2; };
        var internalArray = [];
        var _loop_1 = function (i) {
            var item = array[i];
            if (internalArray.some(function (t) { return equalityFunc(t, item); }))
                return "continue";
            internalArray.push(item);
        };
        for (var i = 0; i < array.length; i++) {
            _loop_1(i);
        }
        return internalArray;
    };
    ArrayExt.skip = function (array, count) {
        if (count < 0)
            count = 0;
        var result = new Array();
        for (var i = count; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    };
    ArrayExt.take = function (array, count) {
        if (count < 0)
            count = 0;
        else if (count > array.length)
            count = array.length;
        var result = new Array();
        for (var i = 0; i < count; i++) {
            result.push(array[i]);
        }
        return result;
    };
    ArrayExt.count = function (array, predicate) {
        if (predicate == null) {
            return array.length;
        }
        else {
            var count = 0;
            for (var i = 0; i < array.length; i++) {
                if (predicate(array[i]))
                    count++;
            }
            return count;
        }
    };
    ArrayExt.remove = function (array, value) {
        var index = array.indexOf(value);
        if (index < 0)
            return false;
        array.splice(index, 1);
        return true;
    };
    ArrayExt.clear = function (array) {
        while (array.length > 0) {
            array.pop();
        }
    };
    ArrayExt.equals = function (array, compareArray) {
        if (array === compareArray)
            return true;
        if (array === null || compareArray === null)
            return false;
        if (!(array instanceof Array) || !(compareArray instanceof Array))
            return false;
        if (array.length !== compareArray.length)
            return false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === compareArray[i])
                continue;
            return false;
        }
        return true;
    };
    return ArrayExt;
}());
Object.defineProperty(Array.prototype, "orderBy", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareFunc) {
        return ArrayExt.orderBy(this, compareFunc);
    }
});
Object.defineProperty(Array.prototype, "orderByDesc", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareFunc) {
        return ArrayExt.orderByDesc(this, compareFunc);
    }
});
Object.defineProperty(Array.prototype, "distinct", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (equalityFunc) {
        return ArrayExt.distinct(this, equalityFunc);
    }
});
Object.defineProperty(Array.prototype, "skip", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (count) {
        return ArrayExt.skip(this, count);
    }
});
Object.defineProperty(Array.prototype, "take", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (count) {
        return ArrayExt.take(this, count);
    }
});
Object.defineProperty(Array.prototype, "count", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return ArrayExt.count(this, predicate);
    }
});
Object.defineProperty(Array.prototype, "remove", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (value) {
        return ArrayExt.remove(this, value);
    }
});
Object.defineProperty(Array.prototype, "clear", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return ArrayExt.clear(this);
    }
});
Object.defineProperty(Array.prototype, "equals", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareArray) {
        return ArrayExt.equals(this, compareArray);
    }
});
//# sourceMappingURL=array-ext.js.map