class SudokuSolver {
  validate(puzzleString) {
    if (typeof puzzleString !== "string" || puzzleString.trim().length === 0)
      return { error: "Required field missing" };
    if (!/^[\d.]+$/.test(puzzleString))
      return { error: "Invalid characters in puzzle" };
    if (puzzleString.length !== 81)
      return { error: "Expected puzzle to be 81 characters long" };

    return puzzleString;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const rowIndex = rows.indexOf(row);
    const start = rowIndex * 9;
    const end = start + 9;

    const rowToCheck = puzzleString.slice(start, end).split("");

    const seen = new Set(rowToCheck.filter((item) => item !== "."));

    return !seen.has(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colIndex = column - 1;
    const colToCheck = [];

    for (let r = 0; r < 9; r++) {
      const index = 9 * r + colIndex;
      colToCheck.push(puzzleString[index]);
    }

    const seen = new Set(colToCheck.filter((item) => item !== "."));

    return !seen.has(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const rowIndex = rows.indexOf(row);
    const colIndex = column - 1;

    const regionRowStart = Math.floor(rowIndex / 3) * 3;
    const regionColStart = Math.floor(colIndex / 3) * 3;
    const regionToCheck = [];

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const index = regionColStart + c + (r + regionRowStart) * 9;
        regionToCheck.push(puzzleString[index]);
      }
    }

    const seen = new Set(regionToCheck.filter((item) => item !== "."));

    return !seen.has(value);
  }

  solve(puzzleString) {
    const dotIndex = puzzleString.indexOf(".");
    if (dotIndex === -1) return puzzleString;

    const row = Math.floor(dotIndex / 9);
    const col = dotIndex % 9;
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

    for (let n = 1; n <= 9; n++) {
      const value = String(n);

      if (
        this.checkRowPlacement(puzzleString, rows[row], col + 1, value) &&
        this.checkColPlacement(puzzleString, rows[row], col + 1, value) &&
        this.checkRegionPlacement(puzzleString, rows[row], col + 1, value)
      ) {
        const newPuzzle =
          puzzleString.slice(0, dotIndex) +
          value +
          puzzleString.slice(dotIndex + 1);

        const solved = this.solve(newPuzzle);
        if (solved) return solved;
      }
    }
    // to end the recurse
    return null;
  }
}

module.exports = SudokuSolver;
