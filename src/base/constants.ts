import { Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
const isIPhoneX =
  isIOS && (height === 812 || width === 812 || height === 896 || width === 896);

const statusHeight = isIOS ? 20 : 0;
export const topMargin = isIPhoneX ? 44 : statusHeight;
export const bottomMargin = isIPhoneX ? 34 : 0;

export const screenHeight = height - topMargin - bottomMargin;
export const screenWidth = width;

export const isTablet = width >= 576;
export const isMobile = !isTablet;
