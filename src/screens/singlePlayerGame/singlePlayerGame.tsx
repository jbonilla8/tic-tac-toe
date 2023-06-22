import { SafeAreaView, Dimensions, View, Text } from "react-native";
import React, { ReactElement, useState, useEffect } from "react";
import styles from "./singlePlayerGame.styles";
import { Button, GradientBackground } from "@components";
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
const randomPlayer = Math.random() < 0.5 ? "HUMAN" : "BOT";

export default function SinglePlayerGame(): ReactElement {
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
    null, null, null,
    null, null, null,
    null, null, null
  ]);

  // initializes beginning user at random to either HUMAN or BOT
  const [turn, setTurn] = useState<"HUMAN" | "BOT">(randomPlayer);

  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });

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

  const newGame = () => {
    setState([null, null, null, null, null, null, null, null, null]);
    setTurn(randomPlayer);
  };

  useEffect(() => {
    if (gameResult) {
      // handle game finished
      const winner = getWinner(gameResult.winner);
      if (winner === "HUMAN") {
        playSound("win");
        setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
      }
      if (winner === "BOT") {
        playSound("loss");
        setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
      }
      if (winner === "DRAW") {
        playSound("draw");
        setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
      }
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
        <View>
          <Text style={styles.difficulty}>Difficulty: Hard</Text>
          <View style={styles.results}>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Wins</Text>
              <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Draws</Text>
              <Text style={styles.resultsCount}>{gamesCount.draws}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Losses</Text>
              <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
            </View>
          </View>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"} // disable buttons if isTerminal returns an object and not false, also if its the bot's turn
          onCellPressed={(cell) => {
            handleOnCellPressed(cell);
          }}
          state={state}
          gameResult={gameResult}
          size={SCREEN_WIDTH - 60}
        />

        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(gameResult.winner) === "HUMAN" && "You Won"}
              {getWinner(gameResult.winner) === "BOT" && "You Lost"}
              {getWinner(gameResult.winner) === "DRAW" && "It's a Tie"}
            </Text>
            <Button
              title="Play Again"
              style={{ paddingHorizontal: 40 }}
              onPress={() => newGame()}
            />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
