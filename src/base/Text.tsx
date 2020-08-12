import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import React, { ReactNode, useMemo } from "react";
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from "react-native";
import { col } from "./styles/tailwind";

interface TextProps {
  children;
  style?: StyleProp<TextStyle>;
  bold?: boolean;
}

export const FontProvider = ({ children }: { children: ReactNode }) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });
  return fontsLoaded ? <>{children}</> : null;
};

export const rem = (n: number) => 20 * n;

export const sans = "Nunito_400Regular";
export const bold = "Nunito_700Bold";

export const textStyles = StyleSheet.create({
  base: {
    fontFamily: sans,
  },
  bold: {
    fontFamily: bold,
  },
});

const T = ({ children, style, ...styleOptions }: TextProps) => {
  const propStyles = useMemo(
    () =>
      Object.keys(styleOptions)
        .filter((key) => styleOptions[key])
        .map((key) => textStyles[key]),
    [styleOptions]
  );
  return (
    <RNText style={[textStyles.base, ...propStyles, style]}>{children}</RNText>
  );
};

export default T;
