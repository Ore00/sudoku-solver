class SudokuSolver {
  validate(puzzleString) {
    let validChars = /^[0-9.]*$/;
    if (!validChars.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }
    if (puzzleString.length !== 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let validRow = /^[A-I]$/;
    if (!validRow.test(row)) {
      return { error: "Invalid coordinate" };
    }
    if (value == undefined) {
      return { error: "Required field(s) missing" };
    }
    let rowValues = this.determineRowValues(puzzleString, row);

    if (rowValues.includes(value)) {
      return { valid: false };
    } else {
      return { valid: true };
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    let validCol = /^[1-9]$/;
    if (!validCol.test(column)) {
      return { error: "Invalid coordinate" };
    }

    let colValues = this.determineColumnValues(puzzleString, column);

    if (colValues.includes(value)) {
      return { valid: false };
    } else {
      return { valid: true };
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let validValue = /^[1-9]$/;
    if (!validValue.test(value)) {
      return { error: "Invalid value" };
    }
    let grid = this.determineGrid(puzzleString, row, column);
    if (grid.indexOf(value) == -1) {
      return { valid: true };
    } else {
      return { valid: false };
    }
  }

  determineAvailableValues(puzzleString, row, column) {
    let grid = this.determineGrid(puzzleString, row, column);
    let rowValues = this.determineRowValues(puzzleString, row);
    let colValues = this.determineColumnValues(puzzleString, column);
    let allValues = grid.concat(colValues, rowValues);
    let availableValues = [];
    for (let i = 1; i <= 9; i++) {
      if (allValues.indexOf(i) == -1) {
        availableValues.push(i);
      }
    }
    return availableValues;
  }
  determineColumnValues(puzzleString, column) {
    let colIndex = column - 1;
    let colValues = "";

    let len = puzzleString.length < 81 ? puzzleString.length : 81;
    for (let i = colIndex; i < len; i += 9) {
      colValues = colValues + puzzleString.charAt(i);
    }
    return colValues;
  }
  determineCoordinate(position) {
    let rowLetter = String.fromCharCode(
      "A".charCodeAt(0) + Math.floor(position / 9),
    );
    let col = (position % 9) + 1;
    return rowLetter + col;
  }
  determineGrid(puzzleString, row, column) {
    let rowIndex = row.charCodeAt(0) - 65;
    let multiplier = rowIndex < 3 ? 0 : rowIndex < 6 ? 3 : 6;
    let colIndex = column <= 3 ? 0 : column <= 6 ? 3 : 6;
    let pos = multiplier == 0 ? colIndex : colIndex + multiplier * 9;
    let max = pos + 27;
    let grid = "";
    let temp = "";
    console.log("pos", pos);
    for (let i = pos; i < max; i += 9) {
      temp = puzzleString.slice(i, i + 3);
      grid = grid + temp;
    }
    return grid;
  }
  determineRowValues(puzzleString, row) {
    let rowIndex = row.charCodeAt(0) - 65;
    let rowValues = puzzleString.slice(rowIndex * 9, rowIndex * 9 + 9);
    return rowValues;
  }
  check(puzzleString, row, column, value) {
    try {
      let conflict = [];
      let isValid = this.validate(puzzleString);
      if (isValid === true) {
        let rowValid = this.checkRowPlacement(puzzleString, row, column, value);
        if (rowValid.error) {
          return rowValid;
        }
        let colValid = this.checkColPlacement(puzzleString, row, column, value);
        if (colValid.error) {
          return colValid;
        }
        let regValid = this.checkRegionPlacement(
          puzzleString,
          row,
          column,
          value,
        );
        if (regValid.error) {
          return regValid;
        }
        if (!rowValid.valid) {
          conflict.push("row");
        }
        if (!colValid.valid) {
          conflict.push("column");
        }
        if (!regValid.valid) {
          conflict.push("region");
        }
        if (conflict.length == 0) {
          return { valid: true };
        } else {
          return { valid: false, conflict: conflict };
        }
      } else {
        return isValid;
      }
    } catch (err) {
      return { error: err.message };
    }
  }
  getPuzzleString(puzzleString, position, newValue) {
    if (position != 0) {
      return (
        puzzleString.substring(position, 1) +
        newValue +
        puzzleString.subString(position + 1)
      );
    } else {
      return newValue + puzzleString.substring(position);
    }
  }
  solve(puzzleString) {
    let isValid = this.validate(puzzleString);

    if (isValid === true) {
      let solvedPuzzle = puzzleString;
      //add solution for solving the puzzle
      //convert string pos to coordinate if the value is equal to '.'
      //determine the correct value for the string pos
      //check if the value is valid
      //if the value is valid, replace the '.' with the value
      for (let i = 0; i < puzzleString.length; i++) {
        let value = puzzleString.charAt(i);
        if (value === ".") {
          let coordinate = this.determineCoordinate(i);
          let row = coordinate.charAt(0);
          let col = coordinate.charAt(1);
          let availableValues = this.getAvailableValues(puzzleString, row, col);
          if (availableValues.length === 1) {
            console.log("availableValues", availableValues);
            solvedPuzzle = this.getPuzzleString(
              puzzleString,
              i,
              availableValues[0],
            );
            console.log("solvedPuzzle", solvedPuzzle);
          } else {
            // choose value from those available values
            for(let j = 0; j < availableValues.length; j++)
            {
              
            }
          }
        } else {
          continue;
        }
      }
      return { solution: solvedPuzzle };
    } else {
      return isValid;
    }
  }
}

module.exports = SudokuSolver;
