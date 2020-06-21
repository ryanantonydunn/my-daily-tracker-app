import React, { ReactNode, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

interface BoxProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  scroll?: boolean;
  flex1?: boolean;
  row?: boolean;
  itemsCenter?: boolean;
  itemsStart?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  wrap?: boolean;
  p1?: boolean;
  p2?: boolean;
  w1?: boolean;
  w2?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
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
  h1: {
    height: 10,
  },
  h2: {
    height: 20,
  },
  h3: {
    height: 30,
  },
});

const Box = ({ children, style, scroll, ...styleOptions }: BoxProps) => {
  const Component = scroll ? ScrollView : View;
  const propStyles = useMemo(
    () => Object.keys(styleOptions).map((key) => styles[key]),
    [styleOptions]
  );
  return <Component style={[...propStyles, style]}>{children}</Component>;
};

export default Box;
