var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ArrayExt {
    static contains(array, value) {
        return array.some(t => t === value);
    }
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
    static distinct(array, compareFunc) {
        if (compareFunc == null)
            compareFunc = (value) => value;
        let internalArray = [];
        for (let i = 0; i < array.length; i++) {
            let item = array[i];
            if (internalArray.some(t => compareFunc(t) === compareFunc(item)))
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
    static forEachAsync(array, asyncFunc, degreesOfParallelism) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskManager = new TaskManager(array, asyncFunc, degreesOfParallelism, false);
            yield taskManager.execute();
        });
    }
    static mapAsync(array, asyncFunc, degreesOfParallelism) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskManager = new TaskManager(array, asyncFunc, degreesOfParallelism, true);
            yield taskManager.execute();
            return taskManager.getResults();
        });
    }
    static reduceAsync(array, asyncFunc, accumulator) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = 0;
            if (accumulator === undefined) {
                accumulator = array[0];
                index = 1;
            }
            for (let i = index; i < array.length; i++)
                accumulator = yield asyncFunc(accumulator, array[i]);
            return accumulator;
        });
    }
}
class TaskManager {
    constructor(array, taskFunc, taskCount, captureResults) {
        this._array = array;
        this._taskFunc = taskFunc;
        this._taskCount = !taskCount || taskCount <= 0 ? this._array.length : taskCount;
        this._captureResults = captureResults;
        this._tasks = [];
        for (let i = 0; i < this._taskCount; i++)
            this._tasks.push(new Task(this, i, this._taskFunc, captureResults));
        if (this._captureResults)
            this._results = [];
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._array.length; i++) {
                if (this._captureResults)
                    this._results.push(null);
                yield this.executeTaskForItem(this._array[i], i);
            }
            yield this.finish();
        });
    }
    addResult(itemIndex, result) {
        this._results[itemIndex] = result;
    }
    getResults() {
        return this._results;
    }
    executeTaskForItem(item, itemIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            let availableTask = this._tasks.find(t => t.isFree);
            if (!availableTask) {
                let task = yield Promise.race(this._tasks.map(t => t.promise));
                task.free();
                availableTask = task;
            }
            availableTask.execute(item, itemIndex);
        });
    }
    finish() {
        return Promise.all(this._tasks.filter(t => !t.isFree).map(t => t.promise));
    }
}
class Task {
    constructor(manager, id, taskFunc, captureResult) {
        this._manager = manager;
        this._id = id;
        this._taskFunc = taskFunc;
        this._captureResult = captureResult;
        this._promise = null;
    }
    get promise() { return this._promise; }
    get isFree() { return this._promise === null; }
    execute(item, itemIndex) {
        this._promise = new Promise((resolve, reject) => {
            this._taskFunc(item)
                .then((result) => {
                if (this._captureResult)
                    this._manager.addResult(itemIndex, result);
                resolve(this);
            })
                .catch((err) => reject(err));
        });
    }
    free() {
        this._promise = null;
    }
}
Object.defineProperty(Array.prototype, "contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (value) {
        return ArrayExt.contains(this, value);
    }
});
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
    value: function (compareFunc) {
        return ArrayExt.distinct(this, compareFunc);
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
Object.defineProperty(Array.prototype, "forEachAsync", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (asyncFunc, degreesOfParallelism) {
        return ArrayExt.forEachAsync(this, asyncFunc, degreesOfParallelism);
    }
});
Object.defineProperty(Array.prototype, "mapAsync", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (asyncFunc, degreesOfParallelism) {
        return ArrayExt.mapAsync(this, asyncFunc, degreesOfParallelism);
    }
});
Object.defineProperty(Array.prototype, "reduceAsync", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (asyncFunc, accumulator) {
        return ArrayExt.reduceAsync(this, asyncFunc, accumulator);
    }
});
//# sourceMappingURL=array-ext.js.map