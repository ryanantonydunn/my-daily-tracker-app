import React, { ReactNode, useMemo } from "react";
import { Text as RNText, StyleSheet } from "react-native";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import { ZillaSlab_400Regular } from "@expo-google-fonts/zilla-slab";
import { gray_700, gray_500, gray_200, white } from "./colors";

interface TextProps {
  children;
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

const styles = StyleSheet.create({
  base: {
    fontFamily: "Lato_400Regular",
    fontSize: rem(0.875),
    color: gray_700,
  },
  serif: {
    fontFamily: "ZillaSlab_400Regular",
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

const T = ({ children, ...styleOptions }: TextProps) => {
  const propStyles = useMemo(
    () => Object.keys(styleOptions).map((key) => styles[key]),
    [styleOptions]
  );
  return <RNText style={[styles.base, ...propStyles]}>{children}</RNText>;
};

export const H1 = ({ children }: { children: ReactNode }) => (
  <T serif xLight md>
    {children}
  </T>
);

export const H2 = ({ children }: { children: ReactNode }) => (
  <T serif md center>
    {children}
  </T>
);

export default T;
