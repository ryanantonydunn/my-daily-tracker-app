import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { tw } from "../base/styles/tailwind";
import UIContext from "../store/UIContext";

const styles = StyleSheet.create({
  container: tw(`items-center justify-center`),
});

const FormContainer = ({ children, fixedHeight = false }) => {
  const { safeHeight } = useContext(UIContext);
  const height = safeHeight - 88;
  return (
    <View style={[styles.container, fixedHeight && { height }]}>
      {children}
    </View>
  );
};

export default FormContainer;
