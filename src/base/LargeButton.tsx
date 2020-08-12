import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Gradient from "./Gradient";
import { tw } from "./styles/tailwind";
import T from "./Text";

const styles = StyleSheet.create({
  container: tw(`rounded-md overflow-hidden p-3`),
  text: tw(`text-center text-white`),
});

interface LargeButtonProps {
  onPress: Function;
  secondary?: boolean;
  title: string;
  style?: StyleProp<ViewStyle>;
}

const LargeButton = ({ onPress, title, style }: LargeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.container, style]}
    >
      <Gradient col1="green-500" col2="teal-500" />
      <T style={styles.text}>{title}</T>
    </TouchableOpacity>
  );
};

export default LargeButton;
