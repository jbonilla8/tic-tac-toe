import React, { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import { BoardResult } from "@utils";

const style = StyleSheet.create({
  line: {
    position: "absolute",
    backgroundColor: "red",
  },
  verticalLine: {
    width: 2,
    height: "100%",
  },
  horizontalLine: {
    height: 2,
    width: "100%",
  },
  diagonalLine: {
    width: 2,
    top: 0,
    left: "50%",
  },
});

type BoardLineProps = {
  size: number;
  gameResult?: BoardResult | false;
};

export default function BoardLine({
  size,
  gameResult,
}: BoardLineProps): ReactElement {
  const diagonalHeight = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)); // using pythagorean theorem to calculate length of the diagonal lines

  return (
    <>
      {gameResult && gameResult.column && gameResult.direction === "V" && (
        <View
          style={[
            style.line,
            style.verticalLine,
            {
              left: `${33.3333 * gameResult.column - 16.6666}%`,
            },
          ]}
        ></View>
      )}

      {gameResult && gameResult.row && gameResult.direction === "H" && (
        <View
          style={[
            style.line,
            style.horizontalLine,
            {
              top: `${33.3333 * gameResult.row - 16.6666}%`,
            },
          ]}
        ></View>
      )}

      {gameResult && gameResult.diagonal && gameResult.direction === "D" && (
        <View
          style={[
            style.line,
            style.diagonalLine,
            {
              height: diagonalHeight,
              transform: [
                {
                  // shift the line's center up half its length so it will be centered on the board
                  translateY: -(diagonalHeight - size) / 2,
                },
                {
                  rotateZ: gameResult.diagonal === "MAIN" ? "-45deg" : "45deg",
                },
              ],
            },
          ]}
        ></View>
      )}
    </>
  );
}
