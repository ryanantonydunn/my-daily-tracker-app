import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useCallback, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { gray_200, gray_900, white, green, col } from "../base/colors";
import Dropdown, { DropdownItem } from "../base/Dropdown";
import IconButton from "../base/IconButton";
import Box from "./Box";
import { LinearGradient } from "expo-linear-gradient";
import ImageRocket from "../images/ImageRocket";
import UndrawTakingNotes from "../images/UndrawTakingNotes";

interface LayoutWithHeaderProps {
  title: ReactNode;
  back?: string | true;
  menu?: DropdownItem[];
  children: ReactNode;
  hasKeyboard?: boolean;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: green,
  },
  headerInner: {
    height: 48,
  },
  headerSide: {
    width: 48,
  },
  fill: {
    flex: 1,
    backgroundColor: white,
  },
  content: {
    flex: 1,
  },
});

const LayoutWithHeader = ({
  title,
  back,
  menu,
  children,
  hasKeyboard = false,
}: LayoutWithHeaderProps) => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const showDropdown = menu?.length && menuOpen;

  const Wrapper = useCallback(
    ({ children }) =>
      hasKeyboard ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        children
      ),
    [hasKeyboard]
  );

  return (
    <Wrapper>
      <StatusBar animated barStyle="light-content" />
      <SafeAreaView style={styles.header}>
        <LinearGradient
          colors={[col("green-5"), col("teal-5")]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <Box row itemsCenter justifyBetween style={styles.headerInner}>
          {back ? (
            <IconButton
              name="arrow-back"
              color={gray_200}
              onPress={() => {
                if (back === true) {
                  navigation.goBack();
                } else if (typeof back === "string") {
                  navigation.navigate(back);
                }
              }}
            />
          ) : (
            <View style={styles.headerSide} />
          )}
          {title}
          {menu?.length ? (
            <IconButton
              name="more-vert"
              color={gray_200}
              onPress={() => setMenuOpen(true)}
            />
          ) : (
            <View style={styles.headerSide} />
          )}
        </Box>
      </SafeAreaView>
      {children}
      <Dropdown
        open={showDropdown}
        top={44}
        right={10}
        items={menu}
        onClose={() => setMenuOpen(false)}
      />
    </Wrapper>
  );
};

export default LayoutWithHeader;
