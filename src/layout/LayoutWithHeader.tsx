import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dropdown, { DropdownItem } from "../base/Dropdown";
import Gradient from "../base/Gradient";
import Icon from "../base/Icon";
import Logo from "../base/Logo";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";

interface LayoutWithHeaderProps {
  title?: string;
  logo?: boolean;
  back?: string | true;
  menu?: DropdownItem[];
  children: ReactNode;
  hasKeyboard?: boolean;
}

const styles = StyleSheet.create({
  wrapper: tw(`flex-1`),
  header: tw(`flex-row items-center justify-between h-12`),
  cell: tw(`w-12 items-center`),
  iconButton: tw(`p-2`),
  title: tw(`text-lg text-white`),
});

const LayoutWithHeader = ({
  title,
  logo,
  back,
  menu,
  children,
  hasKeyboard = false,
}: LayoutWithHeaderProps) => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const showDropdown = menu?.length && menuOpen;

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <StatusBar animated barStyle="light-content" />
      <SafeAreaView>
        <Gradient col1="green-500" col2="teal-500" />
        <View style={styles.header}>
          <View style={styles.cell}>
            {back && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  if (back === true) {
                    navigation.goBack();
                  } else if (typeof back === "string") {
                    navigation.navigate(back);
                  }
                }}
              >
                <Icon name="arrow-back" color="white" />
              </TouchableOpacity>
            )}
          </View>
          {title && <T style={styles.title}>{title}</T>}
          {logo && <Logo />}
          <View style={styles.cell}>
            {menu?.length && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setMenuOpen(true)}
              >
                <Icon name="more-vert" color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
      {children}
      <Dropdown
        open={showDropdown}
        top={44}
        right={10}
        items={menu}
        onClose={() => setMenuOpen(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default LayoutWithHeader;
