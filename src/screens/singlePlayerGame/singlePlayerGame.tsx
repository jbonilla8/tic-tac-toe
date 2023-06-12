import { SafeAreaView } from "react-native";
import React, { ReactElement } from "react";
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
  const b: BoardState = [
    "x", "x", "o", 
    "o", "x", "x", 
    "x", "o", "o"
  ];
  printFormattedBoard(b);
  console.log(isTerminal(b));
  // console.log(isEmpty(b));
  // console.log(isFull(b));
  // console.log(getAvailableMoves(b));

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={(index) => {
            alert(index);
          }}
          state={b}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
