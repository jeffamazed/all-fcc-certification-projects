function ConvertHandler() {
  this.conversionMap = {
    gal: { factor: 3.78541, target: "L" },
    L: { factor: 1 / 3.78541, target: "gal" },
    lbs: { factor: 0.453592, target: "kg" },
    kg: { factor: 1 / 0.453592, target: "lbs" },
    mi: { factor: 1.60934, target: "km" },
    km: { factor: 1 / 1.60934, target: "mi" },
  };

  this.fullNames = {
    gal: "gallons",
    L: "liters",
    lbs: "pounds",
    kg: "kilograms",
    mi: "miles",
    km: "kilometers",
  };

  this.getNum = function (input) {
    const numMatch = input.match(/^[\d.\/]+/);
    if (!numMatch) return 1;

    const numStr = numMatch[0];

    if (numStr.includes("/")) {
      const nums = numStr.split("/");

      // multiple "/" not allowed
      if (nums.length !== 2) return "invalid number";
      const numerator = parseFloat(nums[0]);
      const denominator = parseFloat(nums[1]);

      if (
        Number.isNaN(numerator) ||
        Number.isNaN(denominator) ||
        nums[0].split(".").length > 2 ||
        nums[1].split(".").length > 2
      )
        return "invalid number";
      return Number((numerator / denominator).toFixed(5));
    } else {
      // reject multiple dots
      if (numStr.split(".").length > 2) return "invalid number";
      const number = parseFloat(numStr);
      return Number.isNaN(number)
        ? "invalid number"
        : Number(number.toFixed(5));
    }
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return "invalid unit";

    let unit = match[0];

    // Normalize: "L" must stay capital, others lowercase
    if (unit.toLowerCase() === "l") unit = "L";
    else unit = unit.toLowerCase();

    if (!Object.keys(this.conversionMap).includes(unit)) return "invalid unit";

    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    return this.conversionMap[initUnit].target;
  };

  this.spellOutUnit = function (unit) {
    return this.fullNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const factor = this.conversionMap[initUnit].factor;
    const result = initNum * factor;

    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
