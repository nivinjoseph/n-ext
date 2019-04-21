class MathExt
{
    public static percentage(partialValue: number, wholeValue: number): number
    {
        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");
        
        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        
        return (partialValue / wholeValue) * 100;
    }
    
    public static percentagePartial(percentage: number, wholeValue: number): number
    {
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");

        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        
        return (percentage * wholeValue) / 100;
    }
    
    public static percentageWhole(percentage: number, partialValue: number): number
    {
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");

        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");

        return (partialValue / percentage) * 100;
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