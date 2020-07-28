import React from "react";
import { StyleSheet, View } from "react-native";
import { tw } from "./styles/tailwind";
import T from "./Text";

const styles = StyleSheet.create({
  container: tw(`flex-row`),
  outer: tw(`text-white text-lg`),
  inner: tw(`text-yellow-300 text-lg`),
});

const Logo = () => {
  return (
    <View style={styles.container}>
      <T style={styles.outer}>My</T>
      <T style={styles.inner}>Daily</T>
      <T style={styles.outer}>Tracker</T>
    </View>
  );
};

export default Logo;
