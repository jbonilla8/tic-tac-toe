import { SafeAreaView } from "react-native";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import styles from "./singlePlayerGame.styles";
import { GradientBackground } from "@components";
import { Board } from "@components";
import { BoardState, isEmpty, isTerminal, getBestMove, Cell } from "@utils";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

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

  const pop1SoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);
  const winSoundRef = useRef<Audio.Sound | null>(null);
  const lossSoundRef = useRef<Audio.Sound | null>(null);
  const drawSoundRef = useRef<Audio.Sound | null>(null);

  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    // make a copy of the current state
    const stateCopy: BoardState = [...state]; // copy current state
    // return (don't allow input) if cell is already occupied or someone has won
    if (stateCopy[cell] || isTerminal(stateCopy)) return; // extra check
    stateCopy[cell] = symbol; // insert cell into stateCopy
    setState(stateCopy); // update the state to the stateCopy

    try {
      // play audios
      symbol === "x"
        ? pop1SoundRef.current?.replayAsync()
        : pop2SoundRef.current?.replayAsync();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        try {
          winSoundRef.current?.replayAsync();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          alert("You won!");
        } catch (error) {
          console.log(error);
        }
      }
      if (winner === "BOT") {
        try {
          lossSoundRef.current?.replayAsync();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          alert("You lost :(");
        } catch (error) {
          console.log(error);
        }
      }
      if (winner === "DRAW") {
        try {
          drawSoundRef.current?.replayAsync();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          alert("It's a tie!");
        } catch (error) {
          console.log(error);
        }
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

  useEffect(() => {
    // load sounds
    const pop1SoundObject = new Audio.Sound();
    const pop2SoundObject = new Audio.Sound();
    const winSoundObject = new Audio.Sound();
    const lossSoundObject = new Audio.Sound();
    const drawSoundObject = new Audio.Sound();

    const loadSounds = async () => {
      await pop1SoundObject.loadAsync(require("@assets/pop_1.wav"));
      pop1SoundRef.current = pop1SoundObject;
      await pop2SoundObject.loadAsync(require("@assets/pop_2.wav"));
      pop2SoundRef.current = pop2SoundObject;
      await winSoundObject.loadAsync(require("@assets/win.mp3"));
      winSoundRef.current = winSoundObject;
      await lossSoundObject.loadAsync(require("@assets/loss.mp3"));
      lossSoundRef.current = lossSoundObject;
      await drawSoundObject.loadAsync(require("@assets/draw.mp3"));
      drawSoundRef.current = drawSoundObject;
    };

    loadSounds();

    return () => {
      // unload sounds when screen unmounts
      pop1SoundObject && pop1SoundObject.unloadAsync();
      pop2SoundObject && pop2SoundObject.unloadAsync();
      winSoundObject && winSoundObject.unloadAsync();
      lossSoundObject && lossSoundObject.unloadAsync();
      drawSoundObject && drawSoundObject.unloadAsync();
    };
  }, []);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"} // disable buttons if isTerminal returns an object and not false, also if its the bot's turn
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
