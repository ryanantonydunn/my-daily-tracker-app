import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

interface SafeViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

const SafeView = ({
  children,
  style,
  top,
  bottom,
  left,
  right,
}: SafeViewProps) => {
  const insets = useSafeArea();
  return (
    <View
      style={[
        {
          paddingTop: top ? insets.top : 0,
          paddingLeft: left ? insets.left : 0,
          paddingRight: right ? insets.right : 0,
          paddingBottom: bottom ? insets.bottom : 0,
        },
        style,
      ]}
    >
      {children && children}
    </View>
  );
};

export default SafeView;
