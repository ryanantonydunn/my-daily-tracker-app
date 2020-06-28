import React, { ReactNode, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { white } from "../base/colors";

interface BoxProps {
  component?: any;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  flex1?: boolean;
  row?: boolean;
  itemsCenter?: boolean;
  itemsStart?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  wrap?: boolean;
  bgWhite?: boolean;
  p1?: boolean;
  p2?: boolean;
  w1?: boolean;
  w2?: boolean;
  w3?: boolean;
  w4?: boolean;
  w5?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  itemsCenter: {
    alignItems: "center",
  },
  itemsStart: {
    alignItems: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  wrap: {
    flexWrap: "wrap",
  },
  bgWhite: {
    backgroundColor: white,
  },
  p1: {
    padding: 10,
  },
  p2: {
    padding: 20,
  },
  w1: {
    width: 10,
  },
  w2: {
    width: 20,
  },
  w3: {
    width: 30,
  },
  w4: {
    width: 40,
  },
  w5: {
    width: 50,
  },
  h1: {
    height: 10,
  },
  h2: {
    height: 20,
  },
  h3: {
    height: 30,
  },
  h4: {
    height: 40,
  },
  h5: {
    height: 50,
  },
});

const Box = ({ component, children, style, ...styleOptions }: BoxProps) => {
  const Component = component ? component : View;
  const propStyles = useMemo(
    () => Object.keys(styleOptions).map((key) => styles[key]),
    [styleOptions]
  );
  return <Component style={[...propStyles, style]}>{children}</Component>;
};

export default Box;
