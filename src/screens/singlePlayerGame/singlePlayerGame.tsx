import { SafeAreaView } from "react-native";
import React, { ReactElement, useState } from "react";
import styles from "./singlePlayerGame.styles";
import { GradientBackground } from "@components";
import { Board } from "@components";
import {
  printFormattedBoard,
  BoardState,
  isEmpty,
  isFull,
  getAvailableMoves,
  isTerminal,
} from "@utils";

export default function SinglePlayerGame(): ReactElement {
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
    null, null, null,
    null, null, null,
    null, null, null
  ]);

  const handleOnCellPressed = (cell: number): void => {
    // make a copy of the current state
    const stateCopy: BoardState = [...state]; // copy current state

    // return (don't allow input) if cell is already occupied or someone has won
    if (stateCopy[cell] || isTerminal(stateCopy)) return; // extra check

    stateCopy[cell] = "x"; // insert cell into stateCopy
    setState(stateCopy); // update the state to the stateCopy
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state))} // disable buttons if isTerminal returns an object and not false
          onCellPressed={(cell) => {
            handleOnCellPressed(cell);
          }}
          state={state}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
