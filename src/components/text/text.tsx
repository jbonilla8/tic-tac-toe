import { View, Text as NativeText } from "react-native";
import React from "react";

export default function Text({ children, style, ...props }) {
  return (
    <View>
      <NativeText
        {...props}
        style={[{ fontFamily: "IBMPlexMono_400Regular" }, style]}
      >
        {children}
      </NativeText>
    </View>
  );
}
