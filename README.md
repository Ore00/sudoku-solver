# Sudoku Solver

An early puzzle helper that checks if your Sudoku moves follow the rules—born from a onine certification project. Originally completed as a part of a [Quality Assurance Challange](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver) see challege objectes below.

## Project Overview

 This is a simple Node.js web application that allows users to validate whether a sequence of numbers adheres to sudoku rules. It is monolithic and it features html frontend with a nodejs persistent backend.

### Features

- Validates whether an individual coordinate (A1) can accept a value of 1 - 9 as valid
- Validates whether a value is valid between 1 - 9 
- Validates whether a string is adheres to all sudoku rules and solves the puzzel.

### Limitations
- User can not type values into the sudoku board (grid)
- Use canot save a sequence of numbers as a valid suduku puzzel

---

## Tech Stack

- **Frontend:** HTML, CSS
- **Backend:** Node.js, Express
- **CI/CD:** GitHub Actions

---
## Getting Started / Running Locally

Follow these steps to run the project on your local machine.

```bash
# 1. Clone the repository
git clone https://github.com/Ore00/sudoku-solver.git
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Create an `.env` file from `.env.example` and set up your environment variables

# 4. Start the development server
npm run dev

```

## Deploying to Production

Steps or commands used to deploy the app.

- Push to `main` branch to auto-deploy
- Use `npm run build` for static exports
- Configure `.github/workflows/release.yml` for deployment options

---

## Contributions

This repository is primarily for personal use, but contributions are welcome.  
If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

> Please follow conventional commits and write clear commit messages.

---

## License

This project is licensed under the MIT License — see the [LICENSE](https://opensource.org/license/mit) file for details.


## Objectives of Challenge

* You can POST /api/solve with form data containing puzzle which will be a string containing a combination of numbers (1-9) and periods . to represent empty spaces. The returned object will contain a solution property with the solved puzzle.

* If the object submitted to /api/solve is missing puzzle, the returned value will be { error: 'Required field missing' }

* If the puzzle submitted to /api/solve contains values which are not numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }

* If the puzzle submitted to /api/solve is greater or less than 81 characters, the returned value will be { error: 'Expected puzzle to be 81 characters long' }

* If the puzzle submitted to /api/solve is invalid or cannot be solved, the returned value will be { error: 'Puzzle cannot be solved' }

* You can POST to /api/check an object containing puzzle, coordinate, and value where the coordinate is the letter A-I indicating the row, followed by a number 1-9 indicating the column, and value is a number from 1-9.

* The return value from the POST to /api/check will be an object containing a valid property, which is true if the number may be placed at the provided coordinate and false if the number may not. If false, the returned object will also contain a conflict property which is an array containing the strings "row", "column", and/or "region" depending on which makes the placement invalid.

* If value submitted to /api/check is already placed in puzzle on that coordinate, the returned value will be an object containing a valid property with true if value is not conflicting.

* If the puzzle submitted to /api/check contains values which are not numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }

* If the puzzle submitted to /api/check is greater or less than 81 characters, the returned value will be { error: 'Expected puzzle to be 81 characters long' }

* If the object submitted to /api/check is missing puzzle, coordinate or value, the returned value will be { error: 'Required field(s) missing' }

* If the coordinate submitted to api/check does not point to an existing grid cell, the returned value will be { error: 'Invalid coordinate'}

* If the value submitted to /api/check is not a number between 1 and 9, the returned value will be { error: 'Invalid value' }

### File modified to complete the logical challenge
* controllers/sudoku-solver.js
* routes/api.js
* controllers/validate.js
* tests/1_unit-tests.js
* tests/2_functional-tests.js


 **[Replit URL](https://replit.com/@Ore00/sudoku-solver/)**
