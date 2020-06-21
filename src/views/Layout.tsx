import React, { ReactNode } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  StatusBar,
} from "react-native";
import { white } from "../base/colors";

interface ChildProps {
  children: ReactNode;
}

interface RowProps {
  children: ReactNode;
  style?: ViewStyle;
  itemsStart?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  wrap?: boolean;
}

interface SpacerProps {
  size?: number;
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  bg: {
    backgroundColor: white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowItemsStart: {
    alignItems: "flex-start",
  },
  rowJustifyCenter: {
    justifyContent: "center",
  },
  rowJustifyBetween: {
    justifyContent: "space-between",
  },
  rowWrap: {
    flexWrap: "wrap",
  },
  spacerHorzSm: {
    width: 10,
  },
  formContent: {
    height: 400,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
  },
  scroll: {
    position: "relative",
    flex: 1,
  },
  container: {
    padding: 16,
  },
  absoluteLayer: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export const Layout = ({ children }: ChildProps) => {
  return (
    <SafeAreaView style={[styles.fill, styles.bg, { zIndex: 10 }]}>
      {children}
    </SafeAreaView>
  );
};

export const LayoutForm = ({ children }: ChildProps) => {
  return (
    <>
      <StatusBar animated barStyle="dark-content" />
      <Layout>{children}</Layout>
    </>
  );
};

export const FormContent = ({ children }: ChildProps) => {
  return <View style={styles.formContent}>{children}</View>;
};

export const Row = ({
  children,
  style,
  itemsStart,
  justifyCenter,
  justifyBetween,
  wrap,
}: RowProps) => (
  <View
    style={[
      styles.row,
      itemsStart && styles.rowItemsStart,
      justifyCenter && styles.rowJustifyCenter,
      justifyBetween && styles.rowJustifyBetween,
      wrap && styles.rowWrap,
      style,
    ]}
  >
    {children}
  </View>
);

export const Spacer = ({ size = 20 }: SpacerProps) => (
  <View style={{ width: size, height: size }} />
);

export const Scroll = ({ children }: ChildProps) => (
  <ScrollView style={styles.scroll}>{children}</ScrollView>
);

export const Container = ({ children }: ChildProps) => (
  <View style={styles.container}>{children}</View>
);
