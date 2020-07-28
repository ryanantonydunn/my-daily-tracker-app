import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import React, { ReactNode, useMemo } from "react";
import { StyleSheet, Text as RNText, TextStyle } from "react-native";
import { gray_200, gray_500, white } from "./colors";
import { col } from "./styles/tailwind";

interface TextProps {
  children;
  style?: TextStyle;
  serif?: boolean;
  title?: boolean;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  bold?: boolean;
  light?: boolean;
  xLight?: boolean;
  white?: boolean;
  center?: boolean;
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
    fontSize: rem(0.875),
    color: col("gray-700"),
  },
  bold: {
    fontFamily: bold,
  },
  serif: {
    fontFamily: sans,
  },
  title: {
    fontFamily: sans,
  },
  xs: {
    fontSize: rem(0.65),
  },
  sm: {
    fontSize: rem(0.75),
  },
  md: {
    fontSize: rem(1),
  },
  lg: {
    fontSize: rem(1.125),
  },
  xl: {
    fontSize: rem(1.225),
  },
  light: {
    color: gray_500,
  },
  xLight: {
    color: gray_200,
  },
  white: {
    color: white,
  },
  center: {
    textAlign: "center",
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

export const H1 = ({ children }: { children: ReactNode }) => (
  <T title xLight>
    {children}
  </T>
);

export const H2 = ({ children }: { children: ReactNode }) => (
  <T title lg center>
    {children}
  </T>
);

export const H3 = ({ children }: { children: ReactNode }) => (
  <T sm bold>
    {children}
  </T>
);

export default T;
