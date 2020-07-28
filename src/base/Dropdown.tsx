import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import UIContext from "../store/UIContext";
import { col, tw } from "./styles/tailwind";
import T from "./Text";

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
  fill: tw(`flex-1`),
  fillScreen: tw(`absolute top-0 left-0`),
  dropdown: tw(`
    absolute z-10 w-48 pt-1 pb-1
    bg-white border border-gray-400 rounded-md
  `),
  dropdownShadow: {
    elevation: 5,
    shadowColor: col("gray-900"),
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  dropdownItem: tw(`p-4`),
});

const renderChildren = (d: ReactNode | string) =>
  typeof d === "string" ? <T>{d}</T> : d;

const Dropdown = ({ open, onClose, items, ...position }: DropdownProps) => {
  const { screenWidth, screenHeight } = useContext(UIContext);
  const fillStyle = { width: screenWidth, height: screenHeight };

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
      <View style={[styles.fillScreen, fillStyle]}>
        <SafeAreaView>
          <View style={styles.fill}>
            <Animated.View
              style={[
                styles.dropdown,
                styles.dropdownShadow,
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
            <View style={[styles.fillScreen, fillStyle]}>
              <TouchableOpacity style={fillStyle} onPress={() => onClose()} />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Dropdown;
