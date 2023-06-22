import { ScrollView } from "react-native";
import React, { ReactElement } from "react";
import { GradientBackground, Text } from "@components";
import styles from "./settings.styles";

export default function Settings(): ReactElement {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>settings</Text>
      </ScrollView>
    </GradientBackground>
  );
}
