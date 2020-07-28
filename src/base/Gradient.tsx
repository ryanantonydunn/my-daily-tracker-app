import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { tw, col } from "./styles/tailwind";

interface GradientProps {
  vertical?: boolean;
  col1: string;
  col2: string;
}

const styles = StyleSheet.create({
  gradient: tw(`absolute top-0 left-0 right-0 bottom-0`),
});

const Gradient = ({ vertical = false, col1, col2 }: GradientProps) => {
  const start = vertical ? { x: 1, y: 0 } : { x: 0, y: 1 };
  return (
    <LinearGradient
      colors={[col(col1), col(col2)]}
      start={start}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    />
  );
};

export default Gradient;
