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
    const numMatch = input.match(/^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?/);
    let number = 1;

    if (numMatch) {
      const numStr = numMatch[0];
      if (numStr.includes("/")) {
        const [numerator, denominator] = numStr.split("/").map(Number);
        number = numerator / denominator;
      } else {
        number = Number(numStr);
      }
    }

    return number;
  };

  this.getUnit = function (input) {
    const unitMatch = input.match(/[a-zA-z]+$/);
    const unit = !Object.keys(this.fullNames).includes(unitMatch)
      ? "invalid unit"
      : unitMatch;

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

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
