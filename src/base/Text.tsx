import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts,
} from "@expo-google-fonts/lato";
import { ZillaSlab_400Regular } from "@expo-google-fonts/zilla-slab";
import React, { ReactNode, useMemo } from "react";
import { StyleSheet, Text as RNText, TextStyle } from "react-native";
import { gray_200, gray_500, gray_700, white } from "./colors";

interface TextProps {
  children;
  style?: TextStyle;
  serif?: boolean;
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
    Lato_400Regular,
    Lato_700Bold,
    ZillaSlab_400Regular,
  });
  return fontsLoaded ? <>{children}</> : null;
};

export const rem = (n: number) => 20 * n;

export const sans = "Lato_400Regular";
export const serif = "ZillaSlab_400Regular";

export const textStyles = StyleSheet.create({
  base: {
    fontFamily: sans,
    fontSize: rem(0.875),
    color: gray_700,
  },
  serif: {
    fontFamily: serif,
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
  bold: {
    fontFamily: "Lato_700Bold",
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
    () => Object.keys(styleOptions).map((key) => textStyles[key]),
    [styleOptions]
  );
  return (
    <RNText style={[textStyles.base, ...propStyles, style]}>{children}</RNText>
  );
};

export const H1 = ({ children }: { children: ReactNode }) => (
  <T serif xLight md>
    {children}
  </T>
);

export const H2 = ({ children }: { children: ReactNode }) => (
  <T serif lg center>
    {children}
  </T>
);

export const H3 = ({ children }: { children: ReactNode }) => (
  <T sm bold>
    {children}
  </T>
);

export default T;
