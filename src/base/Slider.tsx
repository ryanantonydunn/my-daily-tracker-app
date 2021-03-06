import React, { useMemo } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { col, tw } from "./styles/tailwind";
import T from "./Text";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  onChange: Function;
  value: string;
  style?: ViewStyle;
  highlight?: string;
}

// UI size values
const CONTAINER_WIDTH = 300;
const CONTAINER_HEIGHT = 54;
const PADDING = 3;
const BORDER_WIDTH = StyleSheet.hairlineWidth;
const NUMBER_RADIUS = CONTAINER_HEIGHT / 2 - BORDER_WIDTH - PADDING;

// track guide numbers
const GUIDE_NUMBERS = 6;

// used in calculation of how a touch event translates to a value
// value should match where the numbers appear in the UI
const TRACK_START = BORDER_WIDTH + PADDING + NUMBER_RADIUS;
const TRACK_WIDTH = CONTAINER_WIDTH - TRACK_START * 2;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderWidth: BORDER_WIDTH,
    borderColor: col("gray-400"),
    backgroundColor: col("white"),
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    borderRadius: CONTAINER_HEIGHT / 2,
    padding: PADDING,
  },
  track: tw(`flex-row items-center justify-between`),
  number: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    width: NUMBER_RADIUS * 2,
    height: NUMBER_RADIUS * 2,
    borderRadius: NUMBER_RADIUS,
  },
  numberText: tw(`text-sm text-gray-400`),
  numberEdge: {
    backgroundColor: col("gray-200"),
  },
  highlightText: tw(`text-white`),
  touchable: {
    position: "absolute",
    zIndex: 20,
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
  },
});

const Slider = ({
  min = 0,
  max = 10,
  step = 1,
  highlight = col("green-5"),
  onChange,
  value,
  style,
}: SliderProps) => {
  const range = Math.max(max - min, 1);
  const xMultiplier = range / TRACK_WIDTH; // how much does a movement of one pixel equal

  // get value from touch location
  const handleTouch = (e: GestureResponderEvent) => {
    const x = e.nativeEvent.locationX;
    const rawValue = (x - TRACK_START) * xMultiplier;
    const limited = Math.max(min, Math.min(max, rawValue));
    const snappedToStep = Math.round(limited / step) * step;
    const newValue = snappedToStep + min;
    onChange(newValue.toString());
  };

  // calculate guide numbers to show on the track
  const numbers = useMemo(
    () =>
      Array.from(
        { length: GUIDE_NUMBERS },
        (_, i) =>
          Math.round((min + (range / (GUIDE_NUMBERS - 1)) * i) * 100) / 100
      ),
    [min, range]
  );
  const edge = (i: number) => i === 0 || i === numbers.length - 1;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        {numbers.map((n, i) => (
          <View
            key={n}
            style={[
              styles.number,
              edge(i) && styles.numberEdge,
              { left: n / xMultiplier },
            ]}
          >
            <T style={styles.numberText} bold={edge(i)}>
              {n}
            </T>
          </View>
        ))}
        {value !== "" && (
          <View
            style={[
              styles.number,
              {
                left: parseFloat(value) / xMultiplier,
                backgroundColor: col(highlight),
              },
            ]}
          >
            <T style={styles.highlightText}>{value}</T>
          </View>
        )}
      </View>
      <View
        style={styles.touchable}
        onTouchStart={(e) => handleTouch(e)}
        onTouchMove={(e) => handleTouch(e)}
      />
    </View>
  );
};

export default Slider;
