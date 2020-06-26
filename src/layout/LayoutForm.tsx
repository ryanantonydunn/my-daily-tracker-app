import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { white } from "../base/colors";
import Box from "./Box";

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: white,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: white,
  },
});

export const FormContainer = ({ children }) => (
  <View style={styles.formContainer}>{children}</View>
);

export const FormContent = ({ children }) => (
  <Box flex1 justifyCenter itemsCenter bgWhite>
    {children}
  </Box>
);

export const FormKeyboardContent = ({ children }) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={styles.content}
  >
    <Box flex1 justifyCenter itemsCenter bgWhite>
      {children}
    </Box>
  </KeyboardAvoidingView>
);

const LayoutForm = ({ children }) => {
  return (
    <>
      <StatusBar animated barStyle="dark-content" />
      <SafeAreaView style={styles.fill}>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </>
  );
};

export default LayoutForm;
