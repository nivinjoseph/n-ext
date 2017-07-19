var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ArrayExt {
    static orderBy(array, compareFunc) {
        let internalArray = [];
        for (let i = 0; i < array.length; i++)
            internalArray.push(array[i]);
        if (compareFunc == null)
            compareFunc = (value) => value;
        internalArray.sort((a, b) => {
            let valA = compareFunc(a);
            let valB = compareFunc(b);
            if (valA < valB)
                return -1;
            if (valA > valB)
                return 1;
            return 0;
        });
        return internalArray;
    }
    static orderByDesc(array, compareFunc) {
        let internalArray = [];
        for (let i = 0; i < array.length; i++)
            internalArray.push(array[i]);
        if (compareFunc == null)
            compareFunc = (value) => value;
        internalArray.sort((a, b) => {
            let valA = compareFunc(a);
            let valB = compareFunc(b);
            if (valB < valA)
                return -1;
            if (valB > valA)
                return 1;
            return 0;
        });
        return internalArray;
    }
    static distinct(array, equalityFunc) {
        if (equalityFunc == null)
            equalityFunc = (value1, value2) => value1 === value2;
        let internalArray = [];
        for (let i = 0; i < array.length; i++) {
            let item = array[i];
            if (internalArray.some(t => equalityFunc(t, item)))
                continue;
            internalArray.push(item);
        }
        return internalArray;
    }
    static skip(array, count) {
        if (count < 0)
            count = 0;
        let result = new Array();
        for (let i = count; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    }
    static take(array, count) {
        if (count < 0)
            count = 0;
        else if (count > array.length)
            count = array.length;
        let result = new Array();
        for (let i = 0; i < count; i++) {
            result.push(array[i]);
        }
        return result;
    }
    static count(array, predicate) {
        if (predicate == null) {
            return array.length;
        }
        else {
            let count = 0;
            for (let i = 0; i < array.length; i++) {
                if (predicate(array[i]))
                    count++;
            }
            return count;
        }
    }
    static remove(array, value) {
        let index = array.indexOf(value);
        if (index < 0)
            return false;
        array.splice(index, 1);
        return true;
    }
    static clear(array) {
        while (array.length > 0) {
            array.pop();
        }
    }
    static equals(array, compareArray) {
        if (array === compareArray)
            return true;
        if (array === null || compareArray === null)
            return false;
        if (!(array instanceof Array) || !(compareArray instanceof Array))
            return false;
        if (array.length !== compareArray.length)
            return false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === compareArray[i])
                continue;
            return false;
        }
        return true;
    }
    static parallelForEach(array, asyncFunc, degreesOfParallelism) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!degreesOfParallelism || degreesOfParallelism <= 0)
                degreesOfParallelism = array.length;
            let taskManager = new TaskManager(degreesOfParallelism, asyncFunc);
            for (let i = 0; i < array.length; i++)
                yield taskManager.executeTaskForItem(array[i], i);
            yield taskManager.finish();
        });
    }
}
class TaskManager {
    constructor(taskCount, taskFunc) {
        this._taskCount = taskCount;
        this._taskFunc = taskFunc;
        this._tasks = [];
        for (let i = 0; i < this._taskCount; i++)
            this._tasks.push(new Task(i));
    }
    executeTaskForItem(item, itemIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            let availableTask = this._tasks.find(t => t.isFree);
            if (!availableTask) {
                let task = yield Promise.race(this._tasks.map(t => t.promise));
                task.free();
                availableTask = task;
            }
            availableTask.execute(item, itemIndex, this._taskFunc);
        });
    }
    finish() {
        return Promise.all(this._tasks.filter(t => !t.isFree).map(t => t.promise));
    }
}
class Task {
    constructor(id) {
        this._id = id;
        this._item = null;
        this._itemIndex = null;
        this._promise = null;
    }
    get id() { return this._id; }
    get item() { return this._item; }
    get itemIndex() { return this._itemIndex; }
    get promise() { return this._promise; }
    get isFree() { return this._promise === null; }
    execute(item, itemIndex, taskFunc) {
        this._item = item;
        this._itemIndex = itemIndex;
        this._promise = new Promise((resolve, reject) => {
            taskFunc(item)
                .then(() => resolve(this))
                .catch((err) => reject(err));
        });
    }
    free() {
        this._item = this._itemIndex = this._promise = null;
    }
}
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
Object.defineProperty(Array.prototype, "parallelForEach", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (asyncFunc, degreesOfParallelism) {
        return ArrayExt.parallelForEach(this, asyncFunc, degreesOfParallelism);
    }
});
//# sourceMappingURL=array-ext.js.map