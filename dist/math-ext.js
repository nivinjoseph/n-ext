"use strict";
class MathExt {
    static percentage(partialValue, wholeValue) {
        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");
        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        return (partialValue / wholeValue) * 100;
    }
    static percentagePartial(percentage, wholeValue) {
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");
        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        return (percentage * wholeValue) / 100;
    }
    static percentageWhole(percentage, partialValue) {
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");
        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");
        return (partialValue / percentage) * 100;
    }
}
Math.percentage = function (partialValue, wholeValue) {
    return MathExt.percentage(partialValue, wholeValue);
};
Math.percentagePartial = function (percentage, wholeValue) {
    return MathExt.percentagePartial(percentage, wholeValue);
};
Math.percentageWhole = function (percentage, partialValue) {
    return MathExt.percentageWhole(percentage, partialValue);
};
//# sourceMappingURL=math-ext.js.map