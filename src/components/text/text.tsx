import {
  View,
  Text as NativeText,
  TextProps as NativeTextProps,
} from "react-native";
import React, { ReactNode, ReactElement } from "react";

type TextProps = {
  weight: "400" | "700";
  children: ReactNode;
} & NativeTextProps;

const defaultProps = {
  weight: "400",
};

export default function Text({
  children,
  style,
  weight,
  ...props
}: TextProps): ReactElement {
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

Text.defaultProps = defaultProps;
