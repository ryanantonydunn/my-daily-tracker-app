import React, { useState, useEffect } from "react";
import useKeyboard from "../utils/useKeyboard";
import { Dimensions, View } from "react-native";

interface UIContext {
  keyboardHeight: number;
  screenWidth: number;
  screenHeight: number;
}

const UIContext = React.createContext<Partial<UIContext>>({
  keyboardHeight: 0,
  screenWidth: 0,
  screenHeight: 0,
});

export const UIProvider = ({ children }) => {
  const keyboardHeight = useKeyboard();
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  const onLayout = () => {
    const d = Dimensions.get("window");
    setScreenWidth(d.width);
    setScreenHeight(d.height);
  };

  return (
    <>
      <View onLayout={onLayout} />
      <UIContext.Provider
        value={{
          keyboardHeight,
          screenWidth,
          screenHeight,
        }}
      >
        {children}
      </UIContext.Provider>
    </>
  );
};

export default UIContext;
