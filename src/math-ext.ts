class MathExt
{
    /**
     * 
     * Returns a percentage value of `partialValue` compared to `wholeValue`.
     * 
     * @param partialValue - The partial value.
     * @param wholeValue - The whole value.
     */
    public static percentage(partialValue: number, wholeValue: number): number
    {
        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");
        
        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        
        return (partialValue / wholeValue) * 100;
    }
    
    /**
     * 
     * Returns the partial value given a `percentage` and the `wholeValue`.
     * 
     * @param percentage - The percentage calculated for a partial value.
     * @param wholeValue - The whole value.
     */
    public static percentagePartial(percentage: number, wholeValue: number): number
    {
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");

        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        
        return (percentage * wholeValue) / 100;
    }
    
    /**
     * 
     * Returns the whole value given a `percentage` and the `partialValue`.
     * 
     * @param percentage - The percentage calculated for a whole value. 
     * @param partialValue - The partial value.
     */
    public static percentageWhole(percentage: number, partialValue: number): number
    {
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");

        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");

        return (partialValue / percentage) * 100;
    }
    
    /**
     * 
     * Returns the median value, if none return null.
     * 
     * @param values - The readonly array being checked.
     */
    public static median(values: ReadonlyArray<number>): number | null
    {
        const sorted = MathExt._sortNumbersEliminateNulls(values);
        
        if (sorted.length === 0)
            return null;
        
        if (sorted.length === 1)
            return sorted[0];

        if ((sorted.length % 2) === 0)
        {
            const midish = sorted.length / 2;

            const first = sorted[midish - 1];
            const second = sorted[midish];

            return (first + second) / 2;
        }
        else
        {
            const mid = Math.floor(sorted.length / 2);

            return sorted[mid];
        }
    }
    
    private static _sortNumbersEliminateNulls(values: ReadonlyArray<number>): Array<number>
    {
        let internalArray: number[] = [];
        for (let i = 0; i < values.length; i++)
        {
            if (values[i] != null)
                internalArray.push(values[i]);
        }

        internalArray.sort((a, b) =>
        {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });

        return internalArray;
    }
}


(<any>Math).percentage = function (partialValue: number, wholeValue: number): number
{
    return MathExt.percentage(partialValue, wholeValue);
};

(<any>Math).percentagePartial = function (percentage: number, wholeValue: number): number
{
    return MathExt.percentagePartial(percentage, wholeValue);
};

(<any>Math).percentageWhole = function (percentage: number, partialValue: number): number
{
    return MathExt.percentageWhole(percentage, partialValue);
};

(<any>Math).median = function (values: ReadonlyArray<number>): number | null
{
    return MathExt.median(values);
};