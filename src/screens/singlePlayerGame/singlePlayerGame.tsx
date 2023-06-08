import { Text, SafeAreaView } from "react-native";
import React, { ReactElement } from "react";
import styles from "./singlePlayerGame.styles";
import { GradientBackground } from "@components";
import { Board } from "@components";

export default function SinglePlayerGame(): ReactElement {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={(index) => {
            alert(index);
          }}
          state={["o", "o", "x", "x", "o", null, "x", "o", null]}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
