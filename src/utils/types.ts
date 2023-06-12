export type Cell = "x" | "o" | null; // cell can only contain x, o, or empty
export type BoardState = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]; // an array of 9 cells

export type Moves = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BoardResult = {
    winner: Cell;
    direction?: "V" | "H" |"D"; // optional (due to possible draw) winning direction of vertical, horizontal, or diagonal
    column?: 1 | 2 | 3; // if winner won through vertical line
    row?: 1 | 2 | 3; // if winner won through horizontal line
    diagonal?: "MAIN" | "COUNTER"; // if winner won through the main or counter diagonal line
}