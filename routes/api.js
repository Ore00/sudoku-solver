"use strict";
const { body, check } = require("express-validator");
const SudokuSolver = require("../controllers/sudoku-solver.js");
const { validate } = require("../controllers/validate.js");
import "regenerator-runtime/runtime";

module.exports = function (app) {
  let solver = new SudokuSolver();

  app
    .route("/api/check")
    .post(
      validate([
        body("coordinate").notEmpty(),
        body("value").notEmpty(),
        body("puzzle").notEmpty(),
      ]),
      (req, res) => {
        let coordinate = req.body.coordinate;
        let value = req.body.value;
        let puzzle = req.body.puzzle;
        let row = coordinate.split("")[0];
        let column = coordinate.split("")[1];

        let result = solver.check(puzzle, row, column, value);

        res.send(result);
      },
    );

  app.route("/api/solve").post(async (req, res) => {
    const required = await check("puzzle").notEmpty().run(req);
    if (!required.isEmpty()) {
      res.send({ error: "Required field missing" });
    } else {
      let puzzle = req.body.puzzle;
      let result = solver.solve(puzzle);
      res.send(result);
    }
  });
};
