import React, { ReactNode, useContext } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { tw } from "../base/styles/tailwind";
import UIContext from "../store/UIContext";
import SafeView from "./SafeView";

interface FormContainerProps {
  children: ReactNode;
  fixedHeight?: boolean;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: tw(`items-center justify-center`),
});

const FormContainer = ({
  children,
  fixedHeight = false,
  style,
}: FormContainerProps) => {
  const { safeHeight } = useContext(UIContext);
  const height = safeHeight - 88;
  return (
    <>
      <View style={[styles.container, fixedHeight && { height }, style]}>
        {children}
      </View>
    </>
  );
};

export default FormContainer;
