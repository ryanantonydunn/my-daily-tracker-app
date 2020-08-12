import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Tracker } from "../store/DataContext";
import Icon from "./Icon";
import { tw } from "./styles/tailwind";
import T from "./Text";

interface TrackerTitleProps {
  tracker: Tracker;
  sm?: Boolean;
  style?: StyleProp<ViewStyle>;
}

export const trackerTypes = [
  { title: "Checkbox", icon: "event-available", value: "boolean" },
  { title: "Slider", icon: "linear-scale", value: "slider" },
  { title: "Text", icon: "short-text", value: "text" },
  { title: "Number", icon: "all-inclusive", value: "number" },
];

const trackerIcon = (trackerType) =>
  trackerTypes.find(({ value }) => value === trackerType)?.icon;

const styles = StyleSheet.create({
  title: tw(`flex-row items-center`),
  text: tw(`text-lg ml-2`),
  small: tw(`text-sm ml-1`),
});

const TrackerTitle = ({ tracker, sm = false, style }: TrackerTitleProps) => {
  return (
    <View style={[styles.title, style]}>
      <Icon
        name={trackerIcon(tracker.type)}
        color={tracker.color}
        size={sm ? 20 : 24}
      />
      <T style={[styles.text, sm && styles.small]}>{tracker.label}</T>
    </View>
  );
};

export default TrackerTitle;
