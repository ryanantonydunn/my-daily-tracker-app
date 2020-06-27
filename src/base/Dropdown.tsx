import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Dimensions } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { gray_400, gray_900, white } from "../base/colors";
import T from "../base/Text";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export interface DropdownItem {
  onPress?: Function;
  children: ReactNode | string;
}

interface DropdownProps {
  open?: boolean;
  onClose: Function;
  items: DropdownItem[];
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
}

const styles = StyleSheet.create({
  fillScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  },
  touchable: {
    width,
    height,
  },
  dropdown: {
    position: "absolute",
    zIndex: 10,
    width: 150,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray_400,
    elevation: 5,
    shadowColor: gray_900,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 2,
  },
  dropdownItem: {
    padding: 15,
  },
});

const renderChildren = (d: ReactNode | string) =>
  typeof d === "string" ? <T>{d}</T> : d;

const Dropdown = ({ open, onClose, items, ...position }: DropdownProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const y = useRef(new Animated.Value(-20));
  const opacity = useRef(new Animated.Value(0));

  useEffect(() => {
    if (open) setIsRendered(true);
    Animated.parallel([
      Animated.timing(y.current, {
        toValue: open ? 0 : -20,
        useNativeDriver: true,
        duration: 200,
      }),
      Animated.timing(opacity.current, {
        toValue: open ? 1 : 0,
        useNativeDriver: true,
        duration: 200,
      }),
    ]).start(() => {
      if (!open) setIsRendered(false);
    });
  }, [open]);

  if (!isRendered) return null;

  return (
    <>
      <View style={styles.fillScreen}>
        <SafeAreaView>
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[
                styles.dropdown,
                {
                  ...position,
                  opacity: opacity.current,
                  transform: [{ translateY: y.current }],
                },
              ]}
            >
              {items.map(({ children, onPress }, i) =>
                onPress ? (
                  <TouchableOpacity
                    key={i}
                    style={styles.dropdownItem}
                    onPress={() => {
                      onClose();
                      onPress();
                    }}
                  >
                    {renderChildren(children)}
                  </TouchableOpacity>
                ) : (
                  <View key={i} style={styles.dropdownItem}>
                    {renderChildren(children)}
                  </View>
                )
              )}
            </Animated.View>
            <View style={styles.fillScreen}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => onClose()}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Dropdown;
