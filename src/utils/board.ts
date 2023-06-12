import { BoardState, Moves, BoardResult } from "./types";

export const printFormattedBoard = (state: BoardState): void => {
  let formattedString = '';
  state.forEach((cell, index) => {
    formattedString += cell ? ` ${cell} |` : "   |";
    // after every 3rd element, append a new line
    if((index + 1) % 3 === 0) {
      formattedString = formattedString.slice(0, -1); // remove last char in row
      if(index < 8) { // remove last row of lines
        formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n'
      }
    }
  });
  console.log(formattedString)
};

// checks every cell in the board and returns true only if each cell is null
export const isEmpty = (state: BoardState): boolean => {
  return state.every(cell => cell === null);
};

// checks every cell in the board and returns true only if each cell has a symbol
export const isFull = (state: BoardState): boolean => {
  return state.every(cell => cell);
};

export const getAvailableMoves = (state: BoardState): Moves[] => {
  const moves: Moves[] = [];
  state.forEach((cell, index) => {
    if(cell === null) {
      moves.push(index as Moves);
    }
  })
  return moves;
}

export const isTerminal = (state: BoardState): BoardResult | false => {
  if(isEmpty(state)) return false;
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < winningLines.length; index++) {
    const line = winningLines[index];
    const [cell1, cell2, cell3] = line; // get cells from line - destructure
    // if state of cell1 is not empty
    // check that cell2 and cell3 have the same symbol as cell1
    if(state[cell1] && state[cell1] === state[cell2] && state[cell1] === state[cell3]) {
      // return result object of type BoardResult with the winner symbol
      const result: BoardResult = {
        winner: state[cell1]
      }

      // horizontal wins
      if (index < 3) {
        result.direction = 'H';
        result.row = index === 0 ? 1 : index === 1 ? 2 : 3; // if index is 0 return 1 else if 1 return 2 else return 3
      }

      // vertical wins
      if (index >= 3 && index <= 5) { // index between 3 and 5
        result.direction = "V";
        result.column = index === 3 ? 1 : index === 4 ? 2 : 3;
      }

      // diagonal wins
      if (index > 5) {
        result.direction = "D";
        result.diagonal = index === 6 ? "MAIN" : "COUNTER";
      }

      return result;
    }
  }

  // after the loop, if nothing is returned, it either means that the game is still going or there is a draw
  if (isFull(state)) {
    return {
      winner: null // draw
    }
  }
  return false; // game is still going

}