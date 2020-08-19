import React, { ReactNode, useContext } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import UIContext from "../store/UIContext";
import { HEADER_HEIGHT } from "./LayoutWithHeader";

interface FixedHeightProps {
  children: ReactNode;
  enabled?: boolean;
  grow?: boolean;
  style?: StyleProp<ViewStyle>;
}

const FixedHeight = ({
  children,
  enabled = false,
  grow = false,
  style,
}: FixedHeightProps) => {
  const { safeHeight } = useContext(UIContext);
  const height = safeHeight - HEADER_HEIGHT;
  return (
    <>
      <View
        style={[enabled && { height }, grow && !enabled && { flex: 1 }, style]}
      >
        {children}
      </View>
    </>
  );
};

export default FixedHeight;
