class ArrayExt
{
    public static orderBy<T>(array: T[]): T[];
    public static orderBy<T>(array: T[], compareFunc: (value: T) => any): T[];
    public static orderBy<T>(array: T[], compareFunc?: (value: T) => any): T[]
    {
        let internalArray: T[] = [];
        for (let i = 0; i < array.length; i++)
            internalArray.push(array[i]);

        if (compareFunc == null)
            compareFunc = (value: T) => value;

        internalArray.sort((a, b) =>
        {
            let valA = compareFunc(a);
            let valB = compareFunc(b);
            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });

        return internalArray;
    }

    public static orderByDesc<T>(array: T[]): T[];
    public static orderByDesc<T>(array: T[], compareFunc: (value: T) => any): T[];
    public static orderByDesc<T>(array: T[], compareFunc?: (value: T) => any): T[]
    {
        let internalArray: T[] = [];
        for (let i = 0; i < array.length; i++)
            internalArray.push(array[i]);

        if (compareFunc == null)
            compareFunc = (value: T) => value;

        internalArray.sort((a, b) =>
        {
            let valA = compareFunc(a);
            let valB = compareFunc(b);
            if (valB < valA) return -1;
            if (valB > valA) return 1;
            return 0;
        });

        return internalArray;
    }
    
    public static distinct<T>(array: T[]): T[];
    public static distinct<T>(array: T[], equalityFunc: (value1: T, value2: T) => boolean): T[];
    public static distinct<T>(array: T[], equalityFunc?: (value1: T, value2: T) => boolean): T[]
    {
        if (equalityFunc == null)
            equalityFunc = (value1: T, value2: T) => value1 === value2;
        
        let internalArray: T[] = [];
        
        for (let i = 0; i < array.length; i++)
        {
            let item = array[i];
            if (internalArray.some(t => equalityFunc(t, item)))
                continue;
            internalArray.push(item);
        }    
        
        return internalArray;
    }

    public static skip<T>(array: T[], count: number): T[]
    {
        if (count < 0) count = 0;

        let result = new Array<T>();
        for (let i = count; i < array.length; i++)
        {
            result.push(array[i]);
        }
        return result;
    }

    public static take<T>(array: T[], count: number): T[]
    {
        if (count < 0) count = 0;
        else if (count > array.length) count = array.length;

        let result = new Array<T>();
        for (let i = 0; i < count; i++)
        {
            result.push(array[i]);
        }
        return result;
    }

    public static count<T>(array: T[]): number;
    public static count<T>(array: T[], predicate: (value: T) => boolean): number;
    public static count<T>(array: T[], predicate?: (value: T) => boolean): number
    {
        if (predicate == null)
        {
            return array.length;
        } else
        {
            let count = 0;
            for (let i = 0; i < array.length; i++)
            {
                if (predicate(array[i])) count++;
            }
            return count;
        }
    }

    public static remove<T>(array: T[], value: T): boolean
    {
        let index = array.indexOf(value);
        if (index < 0) return false;

        array.splice(index, 1);
        return true;
    }

    public static clear<T>(array: T[]): void
    {
        while (array.length > 0)
        {
            array.pop();
        }
    }
    
    public static equals<T>(array: T[], compareArray: T[]): boolean
    {
        if (array === compareArray)
            return true;

        if (array === null || compareArray === null)
            return false;

        if (!(array instanceof Array) || !(compareArray instanceof Array))
            return false;

        if (array.length !== compareArray.length)
            return false;

        for (let i = 0; i < array.length; i++)
        {
            if (array[i] === compareArray[i])
                continue;

            return false;
        }

        return true;
    }
    
    public static async parallelForEach<T>(array: T[], asyncFunc: (input: T) => Promise<void>, degreesOfParallelism: number): Promise<void>
    {
        if (!degreesOfParallelism || degreesOfParallelism <= 0)
            degreesOfParallelism = array.length;
        
        let taskManager = new TaskManager(degreesOfParallelism, asyncFunc);
        
        for (let i = 0; i < array.length; i++)
            await taskManager.executeTaskForItem(array[i], i);
        
        await taskManager.finish();
    }
}

class TaskManager<T>
{
    private readonly _taskCount: number;
    private readonly _taskFunc: (input: T) => Promise<void>;
    private readonly _tasks: Task<T>[];
    
    
    public constructor(taskCount: number, taskFunc: (input: T) => Promise<void>)
    {
        this._taskCount = taskCount;
        this._taskFunc = taskFunc;
        this._tasks = [];
        for (let i = 0; i < this._taskCount; i++)
            this._tasks.push(new Task<T>(i));
    }
    
    
    public async executeTaskForItem(item: T, itemIndex: number): Promise<void>
    {
        let availableTask = this._tasks.find(t => t.isFree);
        if (!availableTask)
        {
            let task = await Promise.race(this._tasks.map(t => t.promise));
            task.free();
            availableTask = task;
        }
        
        availableTask.execute(item, itemIndex, this._taskFunc);
    }
    
    public finish(): Promise<any>
    {
        return Promise.all(this._tasks.filter(t => !t.isFree).map(t => t.promise));
    }
}   

class Task<T>
{
    private readonly _id: number;
    private _item: T;
    private _itemIndex: number;
    private _promise: Promise<Task<T>>;
    
    
    public get id(): number { return this._id; }
    public get item(): T { return this._item; }
    public get itemIndex(): number { return this._itemIndex; }
    public get promise(): Promise<Task<T>> { return this._promise; }
    public get isFree(): boolean { return this._promise === null; }
    
    
    public constructor(id: number)
    {
        this._id = id;
        this._item = null;
        this._itemIndex = null;
        this._promise = null;
    }
    
    
    public execute(item: T, itemIndex: number, taskFunc: (input: T) => Promise<void>): void
    {
        this._item = item;
        this._itemIndex = itemIndex;
        this._promise = new Promise((resolve, reject) =>
        {
            taskFunc(item)
                .then(() => resolve(this))
                .catch((err) => reject(err));
        });
    }
    
    public free(): void
    {
        this._item = this._itemIndex = this._promise = null;
    }
}    
   

Object.defineProperty(Array.prototype, "orderBy", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareFunc?: (value: any) => any): Array<any>
    {
        return ArrayExt.orderBy(this, compareFunc);
    }
});

Object.defineProperty(Array.prototype, "orderByDesc", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareFunc?: (value: any) => any): Array<any>
    {
        return ArrayExt.orderByDesc(this, compareFunc);
    }
});

Object.defineProperty(Array.prototype, "distinct", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (equalityFunc?: (value1: any, value2: any) => boolean): Array<any>
    {
        return ArrayExt.distinct(this, equalityFunc);
    }
});

Object.defineProperty(Array.prototype, "skip", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (count: number): Array<any>
    {
        return ArrayExt.skip(this, count);
    }
});

Object.defineProperty(Array.prototype, "take", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (count: number): Array<any>
    {
        return ArrayExt.take(this, count);
    }
});

Object.defineProperty(Array.prototype, "count", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate?: (value: any) => boolean): number
    {
        return ArrayExt.count(this, predicate);
    }
});

Object.defineProperty(Array.prototype, "remove", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (value: any): boolean
    {
        return ArrayExt.remove(this, value);
    }
});

Object.defineProperty(Array.prototype, "clear", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (): void
    {
        return ArrayExt.clear(this);
    }
});

Object.defineProperty(Array.prototype, "equals", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareArray: Array<any>): boolean
    {
        return ArrayExt.equals(this, compareArray);
    }
});

Object.defineProperty(Array.prototype, "parallelForEach", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (asyncFunc: (input: any) => Promise<void>, degreesOfParallelism: number): Promise<void>
    {
        return ArrayExt.parallelForEach(this, asyncFunc, degreesOfParallelism);
    }
});