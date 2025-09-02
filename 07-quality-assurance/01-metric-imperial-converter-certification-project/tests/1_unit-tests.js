const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("ConvertHandler: Number Parsing", function () {
    test("Should correctly read a whole number input", function () {
      assert.equal(convertHandler.getNum("32kg"), 32);
      assert.equal(convertHandler.getNum("10mi"), 10);
      assert.equal(convertHandler.getNum("50lbs"), 50);
    });

    test("Should correctly read a decimal number input", function () {
      assert.equal(convertHandler.getNum("10.1kg"), 10.1);
      assert.equal(convertHandler.getNum("5.5mi"), 5.5);
      assert.equal(convertHandler.getNum("19.5lbs"), 19.5);
    });

    test("Should correctly read a fractional input", function () {
      assert.equal(convertHandler.getNum("5/3kg"), 1.66667);
      assert.equal(convertHandler.getNum("1/2mi"), 0.5);
      assert.equal(convertHandler.getNum("55/12"), 4.58333);
    });

    test("Should correctly read a fractional input with a decimal", function () {
      assert.equal(convertHandler.getNum("2.4/1.3kg"), 1.84615);
      assert.equal(convertHandler.getNum("1.1/0.5mi"), 2.2);
      assert.equal(convertHandler.getNum("5.22/3.33"), 1.56757);
    });
  });

  suite("ConvertHandler: Number Parsing Edge Cases", function () {
    test("Should correctly return an error on a double-fraction", function () {
      assert.equal(convertHandler.getNum("3/3/4"), "invalid number");
      assert.equal(convertHandler.getNum("2.2/4.5/11"), "invalid number");
      assert.equal(
        convertHandler.getNum("2.22/3.33/555/11.1"),
        "invalid number",
      );
    });

    test("Should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      assert.equal(convertHandler.getNum("gal"), 1);
      assert.equal(convertHandler.getNum("km"), 1);
      assert.equal(convertHandler.getNum("mi"), 1);
    });
  });

  suite("ConvertHandler: Unit Parsing", function () {
    test("Should correctly read each valid input unit", function () {
      assert.equal(convertHandler.getUnit("15gal"), "gal");
      assert.equal(convertHandler.getUnit("10km"), "km");
      assert.equal(convertHandler.getUnit("5lbs"), "lbs");
      assert.equal(convertHandler.getUnit("7mi"), "mi");
      assert.equal(convertHandler.getUnit("1L"), "L");
      assert.equal(convertHandler.getUnit("11kg"), "kg");
    });

    test("Should return the correct return unit for each valid input unit", function () {
      assert.equal(convertHandler.getUnit("15asd"), "invalid unit");
      assert.equal(convertHandler.getUnit("10asqwerqd"), "invalid unit");
      assert.equal(convertHandler.getUnit("5mileeee"), "invalid unit");
    });

    test("Should return the correct return unit for each valid input unit", function () {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });

    test("Should correctly return the spelled-out string unit for each valid input unit", function () {
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });
  });

  suite("ConvertHandler: Convert", function () {
    test("Should convert gal to L", function () {
      assert.approximately(convertHandler.convert(5, "gal"), 18.92705, 0.00001);
    });

    test("Should convert L to gal", function () {
      assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.00001);
      assert.approximately(convertHandler.convert(5.5, "L"), 1.45295, 0.00001);
    });

    test("Should convert km to mi", function () {
      assert.approximately(convertHandler.convert(10, "km"), 6.21373, 0.00001);
      assert.approximately(
        convertHandler.convert(15.5, "km"),
        9.63128,
        0.00001,
      );
    });

    test("Should convert mi to km", function () {
      assert.approximately(convertHandler.convert(2, "mi"), 3.21868, 0.00001);
      assert.approximately(convertHandler.convert(4.9, "mi"), 7.88577, 0.00001);
    });

    test("Should convert lbs to kg", function () {
      assert.approximately(convertHandler.convert(50, "lbs"), 22.6796, 0.00001);
      assert.approximately(
        convertHandler.convert(75.5, "lbs"),
        34.2462,
        0.00001,
      );
    });

    test("Should convert kg to lbs", function () {
      assert.approximately(convertHandler.convert(15, "kg"), 33.06937, 0.00001);
      assert.approximately(
        convertHandler.convert(37.5, "kg"),
        82.67342,
        0.00001,
      );
    });
  });
});
