import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactElement } from "react";
import styles from "./button.styles";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export default function Button({
  title,
  style,
  ...props
}: ButtonProps): ReactElement {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
