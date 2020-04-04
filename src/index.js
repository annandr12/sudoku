const POSSIBLE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const solveSudoku = (matrix) => {
  let solution = matrix.map(arr => arr.slice(0));

  solution = solveHelper(solution);

  return solution;
};

const solveHelper = (solution) => {
  let minRow = -1;
  let minColumn = -1;
  let minValues = [];

  while (true) {
    minRow = -1;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (solution[r][c] != 0) {
          continue;
        }
        const possibleValues = getPossibleValues(solution, r, c);
        if (possibleValues.length === 0) {
          return false;
        } else if (possibleValues.length === 1) {
          solution[r][c] = possibleValues[0];
        } else if (minRow < 0 || possibleValues.length < minValues.length) {
          minRow = r;
          minColumn = c;
          minValues = [...possibleValues];
        }
      }
    }
    if (minRow === -1) {
      return solution;
    } else if (minValues.length > 1) {
      break;
    }
  }
  minValues = getPossibleValues(solution, minRow, minColumn);
  for (let key = minValues.length - 1; key >= 0; key--) {
    const solutionCopy = solution.map(arr => arr.slice(0));
    solutionCopy[minRow][minColumn] = minValues[key];
    const temp = solveHelper(solutionCopy);
    if (temp) {
      solution = temp;
      return solution;
    }
  }
};

const getPossibleValues = (matrix, rowIndex, columnIndex) => {
  let values = [...POSSIBLE_VALUES];

  values = values.filter(val => !getAllRowValues(matrix, rowIndex).includes(val));
  values = values.filter(val => !getAllColumnValues(matrix, columnIndex).includes(val));
  values = values.filter(val => !getAllBlockValues(matrix, rowIndex, columnIndex).includes(val));

  return values;
};

const getAllRowValues = (matrix, rowIndex) => {
  return [...matrix[rowIndex]];
}

const getAllColumnValues = (matrix, columnIndex) => {
  return matrix.map(arr => arr[columnIndex]);
};

const getAllBlockValues = (matrix, rowIndex, columnIndex) => {
  const blockValues = [];
  const blockRowStart = 3 * (Math.floor(rowIndex / 3));
  const blockColumnStart = 3 * (Math.floor(columnIndex / 3));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      blockValues.push(matrix[blockRowStart + i][blockColumnStart + j]);
    }
  }
  return blockValues;
};

module.exports = solveSudoku;