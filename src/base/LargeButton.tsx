import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Box from "../layout/Box";
import { col } from "./colors";
import T from "./Text";

interface LargeButtonProps {
  onPress: Function;
  secondary?: boolean;
  title: string;
}

const LargeButton = ({
  onPress,
  secondary = false,
  title,
}: LargeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={[col("green-5"), col("teal-5")]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <Box
        bgWhite={secondary}
        style={{ padding: 10, margin: 2, borderRadius: 3 }}
      >
        <T sm center white={!secondary}>
          {title}
        </T>
      </Box>
    </TouchableOpacity>
  );
};

export default LargeButton;
