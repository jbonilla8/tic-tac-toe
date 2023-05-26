import { View, Text as NativeText } from "react-native";
import React from "react";

export default function Text({ children, style, weight, ...props }) {
  let fontFamily;

  if (weight === "400") {
    fontFamily = "IBMPlexMono_400Regular";
  }

  if (weight === "700") {
    fontFamily = "IBMPlexMono_700Bold";
  }

  return (
    <View>
      <NativeText {...props} style={[{ fontFamily }, style]}>
        {children}
      </NativeText>
    </View>
  );
}
