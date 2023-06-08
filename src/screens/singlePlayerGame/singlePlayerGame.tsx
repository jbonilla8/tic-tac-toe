import { Text, SafeAreaView } from "react-native";
import React, { ReactElement } from "react";
import styles from "./singlePlayerGame.styles";
import { GradientBackground } from "@components";

export default function SinglePlayerGame(): ReactElement {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#fff" }}>Game</Text>
      </SafeAreaView>
    </GradientBackground>
  );
}
