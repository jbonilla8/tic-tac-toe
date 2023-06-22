import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Home, SinglePlayerGame, Settings } from "@screens";
import { colors } from "@utils";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const navigatorOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.teal,
  },
  headerTintColor: colors.lightGreen,
  headerTitleStyle: {
    fontFamily: "IBMPlexMono_700Bold",
    fontSize: 20,
  },
  headerBackTitleStyle: {
    fontFamily: "IBMPlexMono_700Bold",
    fontSize: 14,
  },
};

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={navigatorOptions}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SinglePlayerGame"
          component={SinglePlayerGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerBackTitle: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
