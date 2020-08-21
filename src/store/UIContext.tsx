import React, { ReactNode, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

interface UIContext {
  keyboardHeight: number;
  screenWidth: number;
  screenHeight: number;
  safeWidth: number;
  safeHeight: number;
  isPortrait: boolean;
  modal: ReactNode | undefined;
  setModal: Function;
}

const UIContext = React.createContext<Partial<UIContext>>({
  keyboardHeight: 0,
  screenWidth: 0,
  screenHeight: 0,
  safeWidth: 0,
  safeHeight: 0,
  isPortrait: true,
  modal: undefined,
  setModal: () => {},
});

export const UIProvider = ({ children }) => {
  const inset = useSafeArea();
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [safeWidth, setSafeWidth] = useState(0);
  const [safeHeight, setSafeHeight] = useState(0);
  const [modal, setModal] = useState();

  const onLayout = () => {
    const d = Dimensions.get("window");
    setScreenWidth(d.width);
    setScreenHeight(d.height);
    setSafeWidth(d.width - inset.left - inset.right);
    setSafeHeight(d.height - inset.top - inset.bottom);
  };

  return (
    <>
      <View onLayout={onLayout} />
      <UIContext.Provider
        value={{
          screenWidth,
          screenHeight,
          safeWidth,
          safeHeight,
          isPortrait: screenWidth < screenHeight,
          modal,
          setModal,
        }}
      >
        {children}
      </UIContext.Provider>
    </>
  );
};

export default UIContext;
