import { View, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Text from "../text/text";
import { BoardState, BoardResult } from "@utils";
import BoardLine from "./boardLine";

type BoardProps = {
  state: BoardState;
  size: number;
  disabled?: boolean;
  gameResult?: BoardResult | false;
  onCellPressed?: (index: number) => void; // function that receives number as an argument and doesn't return anything
};

export default function Board({
  state,
  size,
  disabled,
  gameResult,
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
            disabled={cell !== null || disabled} //disable if current cell is not null or if disabled is passed from the Board component
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
      {gameResult && <BoardLine size={size} gameResult={gameResult} />}
    </View>
  );
}
