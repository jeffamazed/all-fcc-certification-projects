"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  const solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    // misisng inputs
    if (!puzzle || !value || !coordinate) {
      return res.status(200).json({ error: "Required field(s) missing" });
    }

    // error coordinate
    if (!/^[A-I][1-9]$/i.test(coordinate.trim())) {
      return res.status(200).json({ error: "Invalid coordinate" });
    }

    // error value
    const valueInt = parseInt(value.trim());
    if (Number.isNaN(valueInt) || valueInt < 1 || valueInt > 9) {
      return res.status(200).json({ error: "Invalid value" });
    }

    const [rowValue, colValue] = coordinate?.trim().split("");
    const trimmedPuzzle = puzzle?.trim();
    const trimmedValue = value?.trim();

    // error validation
    const { error } = solver.validate(puzzle);
    if (error) {
      return res.status(200).json({ error });
    }

    const rowIndex = solver.rows.indexOf(rowValue);
    const colIndex = colValue - 1;
    const cellIndex = rowIndex * 9 + colIndex;

    if (puzzle[cellIndex] === trimmedValue) {
      return res.status(200).json({ valid: true });
    }

    const isRowValid =
      solver.checkRowPlacement(
        trimmedPuzzle,
        rowValue,
        colValue,
        trimmedValue,
      ) || "row";
    const isColValid =
      solver.checkColPlacement(
        trimmedPuzzle,
        rowValue,
        colValue,
        trimmedValue,
      ) || "column";
    const isRegionValid =
      solver.checkRegionPlacement(
        trimmedPuzzle,
        rowValue,
        colValue,
        trimmedValue,
      ) || "region";

    if (
      isRowValid === "row" ||
      isColValid === "column" ||
      isRegionValid === "region"
    ) {
      const conflict = [isRowValid, isColValid, isRegionValid].filter(
        (v) => v !== true,
      );
      return res.status(200).json({ valid: false, conflict });
    }

    const isAllValid = isRowValid && isColValid && isRegionValid;
    if (isAllValid) {
      return res.status(200).json({ valid: true });
    }
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;

    if (!puzzle?.trim()) {
      return res.status(200).json({ error: "Required field missing" });
    }

    const { error } = solver.validate(puzzle);

    if (error) {
      return res.status(200).json({ error });
    }

    const solution = solver.solve(puzzle);
    if (!solution) {
      return res.status(200).json({ error: "Puzzle cannot be solved" });
    }

    res.status(200).json({ solution });
  });
};
