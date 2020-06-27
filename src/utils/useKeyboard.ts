import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

const useKeyboard = () => {
  const { bottom } = useSafeArea();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height - bottom);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardWillHide", onKeyboardDidHide);
    return () => {
      Keyboard.removeListener("keyboardWillShow", onKeyboardDidShow);
      Keyboard.removeListener("keyboardWillHide", onKeyboardDidHide);
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboard;
