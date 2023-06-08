import { View, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Text from "../text/text";

type Cell = "x" | "o" | null; // cell can only contain x, o, or empty

type BoardProps = {
  state: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]; // an array of 9 cells
  size: number;
  onCellPressed?: (index: number) => void; // function that receives number as an argument and doesn't return anything
};

export default function Board({
  state,
  size,
  onCellPressed,
}: BoardProps): ReactElement {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "green",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            onPress={() => onCellPressed && onCellPressed(index)}
            style={{
              width: "33.333%",
              height: "33.333%",
              backgroundColor: "white",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            key={index}
          >
            <Text style={{ fontSize: size / 8 }}>{cell}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
