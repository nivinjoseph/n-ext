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
//# sourceMappingURL=array-ext.js.map