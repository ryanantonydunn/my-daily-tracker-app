import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { gray_200, gray_900, white } from "../base/colors";
import IconButton from "../base/IconButton";
import Box from "./Box";
import Dropdown, { DropdownItem } from "../base/Dropdown";

interface LayoutWithHeaderProps {
  title: ReactNode;
  back?: string | true;
  menu?: DropdownItem[];
  children: ReactNode;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: gray_900,
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
}: LayoutWithHeaderProps) => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const showDropdown = menu?.length && menuOpen;
  return (
    <>
      <StatusBar animated barStyle="light-content" />
      <SafeAreaView style={styles.header}>
        <Box row itemsCenter justifyBetween style={styles.headerInner}>
          {back ? (
            <IconButton
              name="arrow-back"
              color={gray_200}
              onPress={() => {
                if (back === true) {
                  navigation.goBack();
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
      <SafeAreaView style={styles.fill}>
        <View style={styles.content}>
          {children}
          {showDropdown && (
            <>
              {/* <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: 10,
                  backgroundColor: "red",
                  width: 200,
                  height: 200,
                }}
              /> */}
              <Dropdown
                top={44}
                right={10}
                items={menu}
                onClose={() => setMenuOpen(false)}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default LayoutWithHeader;
