import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { gray_500, gray_400, green, red, gray_300 } from "./colors";
import { useNavigation } from "@react-navigation/native";

interface IconButtonProps {
  name: string;
  color?: string;
  bgColor?: string;
  border?: string;
  onPress?: Function;
  sm?: boolean;
  lg?: boolean;
  xl?: boolean;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 99999,
  },
  sm: {
    width: 32,
    height: 32,
  },
  lg: {
    width: 64,
    height: 64,
  },
  xl: {
    width: 82,
    height: 82,
  },
});

const IconButton = ({
  name,
  color = gray_500,
  bgColor,
  border,
  style,
  onPress,
  sm,
  lg,
  xl,
}: IconButtonProps) => {
  const props = {
    style: [
      styles.base,
      bgColor && { backgroundColor: bgColor },
      border && {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: border,
      },
      sm && styles.sm,
      lg && styles.lg,
      xl && styles.xl,
      style,
    ],
  };

  const iconSize = xl ? 30 : lg ? 28 : sm ? 18 : 24;
  const renderIcon = <Icon name={name} size={iconSize} color={color} />;

  return onPress ? (
    <TouchableOpacity {...props} onPress={() => onPress()}>
      {renderIcon}
    </TouchableOpacity>
  ) : (
    <View {...props}>{renderIcon}</View>
  );
};

export const ConfirmButton = ({
  onPress,
  disabled,
}: {
  onPress: Function;
  disabled?: boolean;
}) =>
  disabled ? (
    <IconButton lg border={gray_300} color={gray_300} name="check" />
  ) : (
    <IconButton
      lg
      border={gray_400}
      color={green}
      name="check"
      onPress={onPress}
    />
  );

export const CloseButton = ({ to }: { to: string }) => {
  const navigation = useNavigation();
  return (
    <IconButton
      lg
      color={red}
      name="close"
      onPress={() => navigation.navigate(to)}
    />
  );
};

export default IconButton;
