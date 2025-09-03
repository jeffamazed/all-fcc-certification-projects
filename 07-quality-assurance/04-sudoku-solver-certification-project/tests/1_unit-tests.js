const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const sudokuSolver = new Solver();

suite("Unit Tests", () => {
  suite("Puzzle string validation", function () {
    const validPuzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    const invalidPuzzle =
      "..9..5.1.85.4....2432..b...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.a";
    const invalidPuzzle2 =
      "..9..5.1.85.4....2432....3.2.1.5..69.83.9.....6.62.71...9......1945....4.37.4.3..6..78";

    test("Handles a valid puzzle string of 81 characters", function () {
      assert.isObject(
        sudokuSolver.validate(validPuzzle),
        "Should return an object",
      );
      assert.deepEqual(sudokuSolver.validate(validPuzzle), {
        error: false,
        puzzle: validPuzzle,
      });
    });

    test("Handles a puzzle string with invalid characters (not 1-9 or .)", function () {
      assert.isObject(
        sudokuSolver.validate(invalidPuzzle),
        "Should return an object",
      );
      assert.deepEqual(sudokuSolver.validate(invalidPuzzle), {
        error: "Invalid characters in puzzle",
      });
    });
    test("Handles a puzzle string that is not 81 characters in length", function () {
      assert.isObject(
        sudokuSolver.validate(invalidPuzzle2),
        "Should return an object",
      );
      assert.deepEqual(sudokuSolver.validate(invalidPuzzle2), {
        error: "Expected puzzle to be 81 characters long",
      });
    });
  });

  suite("Placement checks", function () {
    const validPuzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    test("Handles a valid row placement", function () {
      assert.typeOf(
        sudokuSolver.checkRowPlacement(validPuzzle, "A", "1", "7"),
        "boolean",
      );
      assert.isTrue(sudokuSolver.checkRowPlacement(validPuzzle, "A", "2", "6"));
    });

    test("Handles an invalid row placement", function () {
      assert.typeOf(
        sudokuSolver.checkRowPlacement(validPuzzle, "A", "4", "9"),
        "boolean",
      );
      assert.isNotTrue(
        sudokuSolver.checkRowPlacement(validPuzzle, "A", "5", "9"),
      );
    });

    test("Handles a valid column placement", function () {
      assert.typeOf(
        sudokuSolver.checkColPlacement(validPuzzle, "A", "7", "3"),
        "boolean",
      );
      assert.isTrue(sudokuSolver.checkColPlacement(validPuzzle, "A", "9", "6"));
    });

    test("Handles an invalid column placement", function () {
      assert.typeOf(
        sudokuSolver.checkColPlacement(validPuzzle, "B", "3", "9"),
        "boolean",
      );
      assert.isNotTrue(
        sudokuSolver.checkColPlacement(validPuzzle, "B", "5", "6"),
      );
    });

    test("Handles a valid region(3x3 grid) placement", function () {
      assert.typeOf(
        sudokuSolver.checkRegionPlacement(validPuzzle, "D", "2", "1"),
        "boolean",
      );
      assert.isTrue(
        sudokuSolver.checkRegionPlacement(validPuzzle, "D", "3", "3"),
      );
    });

    test("Handles an invalid region (3x3 grid) placement", function () {
      assert.typeOf(
        sudokuSolver.checkRegionPlacement(validPuzzle, "D", "7", "8"),
        "boolean",
      );
      assert.isNotTrue(
        sudokuSolver.checkRegionPlacement(validPuzzle, "E", "9", "9"),
      );
    });
  });

  suite("Solver", function () {
    const validPuzzle =
      ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
    const validSolution =
      "473891265851726394926345817568913472342687951197254638734162589685479123219538746";
    const invalidPuzzle =
      ".7.88.....5....3.4.2..4..125689..472...6.35..1.7.5.63873.3.2.8.6..47.1..2.9.387.6";

    test("Valid puzzle strings pass the solver", function () {
      assert.isString(sudokuSolver.solve(validPuzzle));
      assert.equal(sudokuSolver.solve(validPuzzle), validSolution);
    });

    test("Invalid puzzle strings fail the solver", function () {
      assert.isNull(sudokuSolver.solve(invalidPuzzle));
    });

    test("Solver returns the expected solution for an incomplete puzzle", function () {
      const puzzle =
        "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";
      const expectedSolution =
        "534678912672195348198342567859761423426853791713924856961537284287419635345286179";

      assert.equal(sudokuSolver.solve(puzzle), expectedSolution);
    });
  });
});
