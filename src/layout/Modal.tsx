import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { tw } from "../base/styles/tailwind";
import UIContext from "../store/UIContext";

const styles = StyleSheet.create({
  fill: tw(`flex-grow bg-white h-32`),
  fillScreen: tw(`absolute top-0 left-0`),
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

const Modal = () => {
  const { screenWidth, screenHeight, modal, setModal } = useContext(UIContext);
  const fillStyle = { width: screenWidth, height: screenHeight };

  const storedContent = useRef<ReactNode | null>(null);

  const [isRendered, setIsRendered] = useState(false);
  const y = useRef(new Animated.Value(-20));
  const opacity = useRef(new Animated.Value(0));

  useEffect(() => {
    const show = !!modal;
    storedContent.current = modal;
    if (show) setIsRendered(true);
    Animated.parallel([
      Animated.timing(y.current, {
        toValue: show ? 0 : -20,
        useNativeDriver: true,
        duration: 200,
      }),
      Animated.timing(opacity.current, {
        toValue: show ? 1 : 0,
        useNativeDriver: true,
        duration: 200,
      }),
    ]).start(() => {
      if (!show) {
        setIsRendered(false);
        storedContent.current = null;
      }
    });
  }, [modal]);

  if (!isRendered) return null;

  return (
    <View
      style={[styles.fillScreen, fillStyle, tw(`items-center justify-center`)]}
    >
      <Animated.View
        style={[
          {
            ...tw(`z-10 p-4 w-64 rounded-md bg-white`),
            opacity: opacity.current,
            transform: [{ translateY: y.current }],
          },
        ]}
      >
        <ScrollView contentContainerStyle={tw(`flex-grow`)}>
          {storedContent.current}
        </ScrollView>
      </Animated.View>
      <Animated.View
        style={[
          styles.fillScreen,
          fillStyle,
          styles.overlay,
          { opacity: opacity.current },
        ]}
      >
        <TouchableOpacity
          style={fillStyle}
          onPress={() => setModal(undefined)}
        />
      </Animated.View>
    </View>
  );
};

export default Modal;
