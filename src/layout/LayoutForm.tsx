import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { white } from "../base/colors";

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: white,
  },
  content: {
    flex: 1,
  },
  formContent: {
    height: 400,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: white,
  },
});

export const FormContainer = ({ children }) => (
  <KeyboardAvoidingView style={styles.formContainer}>
    {children}
  </KeyboardAvoidingView>
);

export const FormContent = ({ children }) => (
  <KeyboardAvoidingView style={styles.formContent}>
    {children}
  </KeyboardAvoidingView>
);

const LayoutForm = ({ children }) => {
  return (
    <>
      <StatusBar animated barStyle="dark-content" />
      <SafeAreaView style={styles.fill}>
        <KeyboardAvoidingView style={styles.content}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default LayoutForm;
