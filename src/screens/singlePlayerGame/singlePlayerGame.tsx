import { SafeAreaView, Dimensions } from "react-native";
import React, { ReactElement, useState, useEffect } from "react";
import styles from "./singlePlayerGame.styles";
import { GradientBackground } from "@components";
import { Board } from "@components";
import {
  BoardState,
  isEmpty,
  isTerminal,
  getBestMove,
  Cell,
  useSounds,
} from "@utils";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function SinglePlayerGame(): ReactElement {
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
    null, null, null,
    null, null, null,
    null, null, null
  ]);

  // initializes beginning user at random to either HUMAN or BOT
  const [turn, setTurn] = useState<"HUMAN" | "BOT">(
    Math.random() < 0.5 ? "HUMAN" : "BOT"
  );

  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);

  const playSound = useSounds();

  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    // make a copy of the current state
    const stateCopy: BoardState = [...state]; // copy current state
    // return (don't allow input) if cell is already occupied or someone has won
    if (stateCopy[cell] || isTerminal(stateCopy)) return; // extra check
    stateCopy[cell] = symbol; // insert cell into stateCopy
    setState(stateCopy); // update the state to the stateCopy

    try {
      // play button press audios
      symbol === "x" ? playSound("pop1") : playSound("pop2");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnCellPressed = (cell: number): void => {
    if (turn !== "HUMAN") return;

    insertCell(cell, isHumanMaximizing ? "x" : "o");
    setTurn("BOT");
  };

  const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
    if (winnerSymbol === "x") {
      return isHumanMaximizing ? "HUMAN" : "BOT";
    }

    if (winnerSymbol === "o") {
      return isHumanMaximizing ? "BOT" : "HUMAN";
    }

    return "DRAW";
  };

  useEffect(() => {
    if (gameResult) {
      // handle game finished
      const winner = getWinner(gameResult.winner);
      if (winner === "HUMAN") {
        playSound("win");
        alert("You won!");
      }
      if (winner === "BOT") {
        playSound("loss");
        alert("You lose :(");
      }
      if (winner === "DRAW") {
        playSound("draw");
        alert("It's a tie.");
      }
      alert("GAME OVER");
    } else {
      if (turn === "BOT") {
        // if the board is empty and it is the bot's turn
        if (isEmpty(state)) {
          const centerAndCorners = [0, 2, 6, 8, 4];
          const firstMove =
            centerAndCorners[
              Math.floor(Math.random() * centerAndCorners.length)
            ];
          insertCell(firstMove, "x");
          setIsHumanMaximizing(false);
          setTurn("HUMAN");
        } else {
          // if the board is NOT empty and it is the bot's turn
          const best = getBestMove(state, !isHumanMaximizing, 0, 1);
          insertCell(best, isHumanMaximizing ? "o" : "x");
          setTurn("HUMAN");
        }
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"} // disable buttons if isTerminal returns an object and not false, also if its the bot's turn
          onCellPressed={(cell) => {
            handleOnCellPressed(cell);
          }}
          state={state}
          gameResult={gameResult}
          size={SCREEN_WIDTH - 60}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
