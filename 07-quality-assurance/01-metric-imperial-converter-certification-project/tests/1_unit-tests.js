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
});
