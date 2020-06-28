import React, { ReactNode, useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { white } from "../../base/colors";
import { CloseButton } from "../../base/IconButton";
import UIContext from "../../store/UIContext";
import Box from "../../layout/Box";

interface FormContainerProps {
  children: ReactNode;
  closeTo?: string;
  topLeft?: ReactNode;
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: white,
  },
  content: {
    flex: 1,
    backgroundColor: white,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  topLeft: {
    position: "absolute",
    top: 18,
    width: 150,
  },
});

const FormContainer = ({ children, closeTo, topLeft }: FormContainerProps) => {
  const { safeWidth, isPortrait } = useContext(UIContext);
  return (
    <>
      <StatusBar animated barStyle="dark-content" />
      <SafeAreaView style={styles.fill}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.content}
        >
          {children}
          {!!closeTo && (
            <View style={styles.closeButton}>
              <CloseButton to={closeTo} />
            </View>
          )}
          {!!topLeft && (
            <Box
              row
              itemsCenter
              justifyCenter
              style={[
                styles.topLeft,
                { left: isPortrait ? safeWidth / 2 - 75 : 10 },
              ]}
            >
              {topLeft}
            </Box>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default FormContainer;
