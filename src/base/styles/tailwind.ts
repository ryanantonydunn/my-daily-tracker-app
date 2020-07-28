import { StyleSheet } from "react-native";
import { create } from "tailwind-rn";
import styles from "./styles.json";

/**
 * Replace borders and px spaces with hairline width
 */
const borderProps = [
  "borderTopWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderBottomWidth",
];
Object.entries(styles).forEach(([key, properties]) => {
  // set all 1px borders to hairline width
  if (key.includes("border")) {
    Object.entries(properties).forEach(([propName, propValue]) => {
      if (borderProps.includes(propName) && propValue === 1) {
        styles[key][propName] = StyleSheet.hairlineWidth;
      }
    });
  }

  // set all -px values to hairline width
  if (key.endsWith("-px")) {
    Object.entries(properties).forEach(([propName, propValue]) => {
      if (propValue === 1) {
        styles[key][propName] = StyleSheet.hairlineWidth;
      } else if (propValue === -1) {
        styles[key][propName] = -StyleSheet.hairlineWidth;
      }
    });
  }
});

const { tailwind, getColor } = create(styles);
export { tailwind as tw, getColor as col };
