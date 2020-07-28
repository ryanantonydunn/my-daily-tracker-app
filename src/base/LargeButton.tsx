import React from "react";
import { StyleSheet } from "react-native";
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
}

const LargeButton = ({ onPress, title }: LargeButtonProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Gradient col1="green-500" col2="teal-500" />
      <T style={styles.text}>{title}</T>
    </TouchableOpacity>
  );
};

export default LargeButton;
