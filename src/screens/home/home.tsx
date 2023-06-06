import { View, Text, Button } from "react-native";
import React, { ReactElement } from "react";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { StackNavigatorParams } from "@config/navigator";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Game"
        onPress={() => {
          navigation.navigate("Game", { gameId: "455" });
        }}
      />
    </View>
  );
}
