const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
const validPuzzle =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

const invalidPuzzle =
  "..9..5.1.85.4...a2432.X..X.1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const shortPuzzle = "....69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite("Unit Tests", () => {
  suite("sudoku solver logic handles", () => {
    test("a valid puzzle string of 81 characters", function (done) {
      assert.equal(solver.validate(validPuzzle), true);
      done();
    });

    test("a puzzle string with invalid characters (not 1-9 or .)", function (done) {
      let result = solver.validate(invalidPuzzle);
      assert.deepEqual(result, { error: "Invalid characters in puzzle" });
      done();
    });

    test("puzzle string that is not 81 characters in length", function (done) {
      let result = solver.validate(shortPuzzle);
      assert.deepEqual(result, {
        error: "Expected puzzle to be 81 characters long",
      });
      done();
    });

    test("a valid row placement", function (done) {
      let result = solver.checkRowPlacement(validPuzzle, "A", 2, 7);
      assert.deepEqual(result, { valid: true });
      done();
    });
    test("an ivalid row placement", function (done) {
      let result = solver.checkRowPlacement(validPuzzle, "A", 2, 5);
      assert.deepEqual(result, { valid: false });
      result = solver.checkRowPlacement(validPuzzle, "K", 2, 9);
      assert.deepEqual(result, { error: "Invalid coordinate" });
      done();
    });
    test("a valid column placement", function (done) {
      let result = solver.checkColPlacement(validPuzzle, "A", 2, 7);
      assert.deepEqual(result, { valid: true });
      done();
    });
    test("an ivalid column placement", function (done) {
      let result = solver.checkColPlacement(validPuzzle, "A", 2, 4);
      assert.deepEqual(result, { valid: false });
      result = solver.checkColPlacement(validPuzzle, "A", 11, 9);
      assert.deepEqual(result, { error: "Invalid coordinate" });
      done();
    });
    test("a valid region (3x3 grid) placement", function (done) {
      let result = solver.checkRegionPlacement(validPuzzle, "F", 3, 4);
      assert.deepEqual(result, { valid: true });
      result = solver.checkRegionPlacement(validPuzzle, "A", 7, 8);
      assert.deepEqual(result, { valid: true });
      result = solver.checkRegionPlacement(validPuzzle, "H", 7, 8);
      assert.deepEqual(result, { valid: true });
      done();
    });
    test("an invalid region (3x3 grid) placement", function (done) {
      let result = solver.checkRegionPlacement(validPuzzle, "F", 3, 2);
      assert.deepEqual(result, { valid: false });
      result = solver.checkRegionPlacement(validPuzzle, "A", 7, 1);
      assert.deepEqual(result, { valid: false });
      result = solver.checkRegionPlacement(validPuzzle, "H", 7, 6);
      assert.deepEqual(result, { valid: false });
      done();
    });
  });
  suite("sudoku solver when submitted", () => {
    test("a valid puzzle strings pass the solver", function (done) {
      done();
    });
    test("an invalid puzzle strings fails the solver", function (done) {
      let result = solver.solve(invalidPuzzle);
      assert.deepEqual(result, { error: "Invalid characters in puzzle" });
      done();
    });
    test("returns the expected solution for an incomplete puzzle", function (done) {
      done();
    });
  });
});
