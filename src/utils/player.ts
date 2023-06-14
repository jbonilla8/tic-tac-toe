import { getAvailableMoves, isTerminal, printFormattedBoard } from "./board";
import { BoardState } from "./types";

export const getBestMove = (
  state: BoardState,
  maximizing: boolean,
  depth = 0,
  maxDepth = -1 
): number => {
  // node values
  const childValues: { [key: string]: string } = {};

  // recursive function that will run until we reach a terminal state (draw or win)
  const getBestMoveRecursive = (
    state: BoardState,
    maximizing: boolean,
    depth = 0,
    maxDepth = -1 // the point at which to stop recursion
  ): number => {
    // START base condition
    const terminalObject = isTerminal(state);
    if (terminalObject || depth === maxDepth) {
      if (terminalObject && terminalObject.winner === "x") {
        return 100 - depth;
      } else if (terminalObject && terminalObject.winner === "o") {
        return -100 + depth;
      }
      return 0; // draw
    }
    // END base condition

    // if it's the maximizing player's (x's) turn
    if (maximizing) {
      let best = -100; // worst possible value for the maximizing player
      // calculate the values for the available moves, return an array of indexes for the available moves
      getAvailableMoves(state).forEach((index) => {
        // try the 3 moves, calculate their values and return the best ones
        const child: BoardState = [...state]; // copy current state
        child[index] = "x"; // insert x inside our available move

        // call getBestMoveRecursive again for the available moves for the child nodes
        const childValue = getBestMoveRecursive(child, false, depth + 1, maxDepth);

        // if of these childValues is better than the best number, we need to override the best value with this new best number
        best = Math.max(best, childValue);

        // {
        //     "99": "0" // or 0,1
        // }

        // check if depth is 0 so we are not storing child values
        if (depth === 0) {
          childValues[childValue] = childValues[childValue]
            ? `${childValues[childValue]}, ${index}`
            : `${index}`;
        }
      });

      if (depth === 0) {
        // check if it's not a recursive call
        const arr = childValues[best].split(","); // array of moves
        const rand = Math.floor(Math.random() * arr.length); // getting random value
        return parseInt(arr[rand]);
      }
      return best;
    } else {
      // if it's the minimizing player's (o's) turn
      let best = 100; // worst possible value for the minimizing player
      getAvailableMoves(state).forEach((index) => {
        const child: BoardState = [...state];
        child[index] = "o";

        const childValue = getBestMoveRecursive(child, true, depth + 1, maxDepth);

        best = Math.min(best, childValue);
        if (depth === 0) {
          childValues[childValue] = childValues[childValue]
            ? `${childValues[childValue]}, ${index}`
            : `${index}`;
        }
      });

      if (depth === 0) {
        // check if it's not a recursive call
        const arr = childValues[best].split(","); // array of moves
        const rand = Math.floor(Math.random() * arr.length); // getting random value
        return parseInt(arr[rand]);
      }
      return best;
    }
  };
  return getBestMoveRecursive(state, maximizing, depth, maxDepth);
};
