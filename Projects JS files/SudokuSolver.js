document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const solveBtn = document.getElementById("solveBtn");
    const clearBtn = document.getElementById("clearBtn");

    // Create Sudoku grid
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.className = "cell";
            grid.appendChild(input);
        }
    }

    solveBtn.addEventListener("click", solveSudoku);
    clearBtn.addEventListener("click", clearGrid);

    function solveSudoku() {
        const gridInputs = document.querySelectorAll("#grid input");
        const grid = [];
        let index = 0;

        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const value = gridInputs[index].value.trim();
                row.push(value === "" ? 0 : parseInt(value));
                index++;
            }
            grid.push(row);
        }

        if (solveSudokuRecursive(grid)) {
            // Update UI with solved puzzle
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    gridInputs[i * 9 + j].value = grid[i][j];
                }
            }
        } else {
            alert("No solution exists");
        }
    }

    function solveSudokuRecursive(grid) {
        let emptyCell = findEmptyCell(grid);
        if (!emptyCell) {
            return true; // Puzzle solved successfully
        }

        let [row, col] = emptyCell;

        // Try placing numbers from 1 to 9 in the empty cell
        for (let num = 1; num <= 9; num++) {
            if (isValidMove(grid, row, col, num)) {
                grid[row][col] = num;

                // Recursively attempt to solve the puzzle
                if (solveSudokuRecursive(grid)) {
                    return true;
                }

                grid[row][col] = 0; // Undo the current cell if no solution found
            }
        }
        return false; // Backtrack if no valid number can be placed in the current cell
    }

    function isValidSudoku(grid) {
        let seen = new Set();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] !== 0) {
                    let num = grid[i][j];
                    // Check if the current number has already been seen in its row, column, or subgrid
                    if (seen.has(`${i}-${num}`) || seen.has(`${num}-${j}`) || seen.has(`${Math.floor(i / 3)}-${Math.floor(j / 3)}-${num}`)) {
                        return false;
                    }
                    seen.add(`${i}-${num}`);
                    seen.add(`${num}-${j}`);
                    seen.add(`${Math.floor(i / 3)}-${Math.floor(j / 3)}-${num}`);
                }
            }
        }
        return true;
    }

    function usedInSubgrid(grid, startRow, startCol, num) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) {
                    return true;
                }
            }
        }
        return false;
    }

    function usedInCol(grid, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === num) {
                return true;
            }
        }
        return false;
    }

    function usedInRow(grid, row, num) {
        return grid[row].includes(num);
    }

    function isValidMove(grid, row, col, num) {
        return !usedInRow(grid, row, num) && !usedInCol(grid, col, num) && !usedInSubgrid(grid, row - row % 3, col - col % 3, num);
    }

    function findEmptyCell(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    function clearGrid() {
        const gridInputs = document.querySelectorAll("#grid input");
        gridInputs.forEach(input => input.value = "");
    }
});
