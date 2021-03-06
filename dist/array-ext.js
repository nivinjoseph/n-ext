"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    // public static groupBy<T>(array: T[], keyFunc: (value: T) => string): { [index: string]: T[] }
    // {
    //     return  array.reduce((acc: { [index: string]: T[] }, t) =>
    //     {
    //         const key = keyFunc(t);
    //         if (!acc[key])
    //             acc[key] = [];
    //         acc[key].push(t);
    //         return acc;
    //     }, {});
    // }
    static groupBy(array, keyFunc) {
        const result = new Array();
        array.reduce((acc, t) => {
            const key = keyFunc(t);
            if (!acc[key]) {
                acc[key] = [];
                result.push({ key, values: acc[key] });
            }
            acc[key].push(t);
            return acc;
        }, {});
        return result;
    }
    static distinct(array, compareFunc) {
        // if (compareFunc == null)
        //     compareFunc = (value: T) => value;
        // let internalArray: T[] = [];
        // for (let i = 0; i < array.length; i++)
        // {
        //     let item = array[i];
        //     if (internalArray.some(t => compareFunc(t) === compareFunc(item)))
        //         continue;
        //     internalArray.push(item);
        // }
        // return internalArray;
        // BECAUSE WE USE SETS
        const setLimit = 16777216;
        if (array.length > setLimit)
            throw new Error(`Array has ${array.length} items (exceeds set limit of ${setLimit}). Calling distinct is prohibited.`);
        if (compareFunc == null)
            return [...new Set(array)];
        const set = new Set();
        const internalArray = [];
        let item;
        let distinguished;
        for (let i = 0; i < array.length; i++) {
            item = array[i];
            distinguished = compareFunc(item);
            if (!set.has(distinguished)) {
                set.add(distinguished);
                internalArray.push(item);
            }
        }
        return internalArray;
    }
    static skip(array, count) {
        if (count <= 0)
            count = 0;
        // let result = new Array<T>();
        // for (let i = count; i < array.length; i++)
        // {
        //     result.push(array[i]);
        // }
        // return result;
        return array.slice(count);
    }
    static take(array, count) {
        if (count <= 0)
            count = 0;
        else if (count > array.length)
            count = array.length;
        // let result = new Array<T>();
        // for (let i = 0; i < count; i++)
        // {
        //     result.push(array[i]);
        // }
        // return result;
        if (count === 0)
            return [];
        return array.slice(0, count);
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
    static equals(array, compareArray, compareFunc) {
        if (array === compareArray)
            return true;
        if (array === null || compareArray === null)
            return false;
        if (!(array instanceof Array) || !(compareArray instanceof Array))
            return false;
        if (array.length !== compareArray.length)
            return false;
        if (compareFunc) {
            for (let i = 0; i < array.length; i++) {
                if (compareFunc(array[i], compareArray[i]))
                    continue;
                return false;
            }
        }
        else {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === compareArray[i])
                    continue;
                return false;
            }
        }
        return true;
    }
    // public static async forEachAsync<T>(array: T[], asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>
    // {
    //     let taskManager = new TaskManager(array, asyncFunc, degreesOfParallelism, false);
    //     await taskManager.execute();
    // }
    static forEachAsync(array, asyncFunc, degreesOfParallelism) {
        return __awaiter(this, void 0, void 0, function* () {
            if (array.length === 0)
                return;
            const bte = new BatchTaskExec(array, asyncFunc, false, degreesOfParallelism);
            yield bte.process();
        });
    }
    // public static async mapAsync<T, U>(array: T[], asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<U[]>
    // {
    //     let taskManager = new TaskManager(array, asyncFunc, degreesOfParallelism, true);
    //     await taskManager.execute();
    //     return taskManager.getResults();
    // }
    static mapAsync(array, asyncFunc, degreesOfParallelism) {
        return __awaiter(this, void 0, void 0, function* () {
            if (array.length === 0)
                return new Array();
            const bte = new BatchTaskExec(array, asyncFunc, true, degreesOfParallelism);
            return yield bte.process();
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
class TaskExec {
    constructor(array, taskFunc, captureResults) {
        this._results = new Array();
        this._executionPromise = null;
        this._array = array;
        this._taskFunc = taskFunc;
        this._captureResults = captureResults;
    }
    execute() {
        if (this._executionPromise != null)
            return this._executionPromise;
        this._executionPromise = this._execute().then(() => this._results);
        return this._executionPromise;
    }
    _execute() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of this._array) {
                const result = yield this._taskFunc(item);
                if (this._captureResults)
                    this._results.push(result);
            }
        });
    }
}
class BatchTaskExec {
    constructor(array, taskFunc, captureResults, taskCount) {
        this._array = array;
        this._taskFunc = taskFunc;
        this._captureResults = captureResults;
        taskCount = taskCount !== null && taskCount !== void 0 ? taskCount : array.length;
        taskCount = Math.max(taskCount, 1);
        taskCount = Math.min(taskCount, array.length);
        this._taskCount = taskCount;
    }
    // BROKEN
    // public async process(): Promise<Array<TResult>>
    // {
    //     if (this._taskCount === this._array.length)
    //         return await Promise.all(this._array.map(t => this._taskFunc(t)));
    //     const batchSize = Math.floor(this._array.length / this._taskCount);
    //     console.log("BATCH SIZE", batchSize);
    //     const promises = new Array<Promise<TResult[]>>();
    //     for (let i = 0; i < this._taskCount; i++)
    //     {
    //         const isLast = i === (this._taskCount - 1);
    //         const taskExec = new TaskExec(this._array.skip(i * batchSize).take(isLast ? this._array.length : batchSize),
    //             this._taskFunc, this._captureResults);
    //         promises.push(taskExec.execute());
    //     }
    //     const results = await Promise.all(promises);
    //     if (!this._captureResults)
    //         return new Array<TResult>();
    //     return results.reduce((acc, items) =>
    //     {
    //         acc.push(...items);
    //         return acc;
    //     }, new Array<TResult>());
    // }
    // Round robin
    // public async process(): Promise<Array<TResult>>
    // {
    //     if (this._taskCount === this._array.length)
    //         return await Promise.all(this._array.map(t => this._taskFunc(t)));
    //     const pools = new Array<Array<T>>();
    //     for (let i = 0; i < this._taskCount; i++)
    //         pools.push([]);
    //     let poolIndex = 0;
    //     for (let i = 0; i < this._array.length; i++)
    //     {
    //         if (poolIndex >= pools.length)
    //             poolIndex = 0;
    //         const pool = pools[poolIndex];
    //         pool.push(this._array[i]);
    //         poolIndex++;
    //     }
    //     const promises = new Array<Promise<TResult[]>>();
    //     for (let i = 0; i < this._taskCount; i++)
    //     {
    //         const taskExec = new TaskExec(pools[i], this._taskFunc, this._captureResults);
    //         promises.push(taskExec.execute());
    //     }
    //     const results = await Promise.all(promises);
    //     if (!this._captureResults)
    //         return new Array<TResult>();
    //     const maxLength = Math.max(...results.map(t => t.length));
    //     const finalResults = new Array<TResult>();
    //     for (let i = 0; i < maxLength; i++)
    //     {
    //         for (let j = 0; j < pools.length; j++)
    //         {
    //             const value = results[j][i];
    //             if (value !== undefined)
    //                 finalResults.push(value);
    //         }
    //     }
    //     return finalResults;
    // }
    // Remainder Round Robin
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._taskCount === this._array.length)
                return yield Promise.all(this._array.map(t => this._taskFunc(t)));
            const remainder = this._array.length % this._taskCount;
            const batchSize = (this._array.length - remainder) / this._taskCount;
            // console.log("BATCH SIZE", batchSize);
            // console.log("REMAINDER", remainder);
            const promises = new Array();
            const hasRemainder = remainder > 0;
            const pools = new Array();
            for (let i = 0; i < this._taskCount; i++)
                pools.push(ArrayExt.take(ArrayExt.skip(this._array, i * batchSize), batchSize));
            if (hasRemainder) {
                const baseLength = this._array.length - remainder;
                let arrayIndex, poolIndex;
                for (arrayIndex = baseLength, poolIndex = 0; arrayIndex < this._array.length; arrayIndex++, poolIndex++) {
                    pools[poolIndex].push(this._array[arrayIndex]);
                }
            }
            // console.log("POOLS", pools);
            for (let i = 0; i < this._taskCount; i++) {
                const taskExec = new TaskExec(pools[i], this._taskFunc, this._captureResults);
                promises.push(taskExec.execute());
            }
            const results = yield Promise.all(promises);
            if (!this._captureResults)
                return new Array();
            if (hasRemainder) {
                const remaining = new Array();
                const baseLength = this._array.length - remainder;
                let arrayIndex, poolIndex;
                for (arrayIndex = baseLength, poolIndex = 0; arrayIndex < this._array.length; arrayIndex++, poolIndex++) {
                    pools[poolIndex].push(this._array[arrayIndex]);
                    const poolResults = results[poolIndex];
                    remaining.push(poolResults[poolResults.length - 1]);
                    poolResults.splice(results[poolIndex].length - 1, 1);
                }
                const actualResults = results.reduce((acc, items) => {
                    acc.push(...items);
                    return acc;
                }, new Array());
                actualResults.push(...remaining);
                return actualResults;
            }
            else {
                return results.reduce((acc, items) => {
                    acc.push(...items);
                    return acc;
                }, new Array());
            }
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
Object.defineProperty(Array.prototype, "isEmpty", {
    configurable: false,
    enumerable: false,
    get: function () {
        return this.length === 0;
    }
});
Object.defineProperty(Array.prototype, "isNotEmpty", {
    configurable: false,
    enumerable: false,
    get: function () {
        return this.length > 0;
    }
});
Object.defineProperty(Array.prototype, "contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (value) {
        return ArrayExt.contains(this, value);
    }
});
Object.defineProperty(Array.prototype, "where", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (filterFunc) {
        return this.filter(filterFunc);
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
Object.defineProperty(Array.prototype, "groupBy", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (keyFunc) {
        return ArrayExt.groupBy(this, keyFunc);
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
    writable: true,
    value: function (value) {
        return ArrayExt.remove(this, value);
    }
});
Object.defineProperty(Array.prototype, "clear", {
    configurable: false,
    enumerable: false,
    writable: true,
    value: function () {
        return ArrayExt.clear(this);
    }
});
Object.defineProperty(Array.prototype, "equals", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareArray, compareFunc) {
        return ArrayExt.equals(this, compareArray, compareFunc);
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