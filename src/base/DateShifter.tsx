import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SafeView from "../layout/SafeView";
import Icon from "./Icon";
import { tw } from "./styles/tailwind";
import T from "./Text";

const styles = StyleSheet.create({
  dateContainer: tw(`h-12 flex-row items-center justify-center`),
  cell: tw(`w-12 items-center justify-center`),
  iconButton: tw(`p-2`),
  date: tw(`text-xs font-bold`),
  safeContainer: tw(
    `border-b border-gray-400 bg-gray-100 flex-row items-center justify-between`
  ),
});

interface DateShifterProps {
  onChange: Function;
  value: Date;
  max?: Date;
  type: "day" | "year" | "month";
}

const DateShifter = ({
  onChange,
  value,
  max = new Date(),
  type,
}: DateShifterProps) => {
  const day = value.getDate();
  const month = value.getMonth();
  const year = value.getFullYear();

  let previous, next, displayFormat;
  if (type === "day") {
    previous = new Date(year, month, day - 1);
    next = new Date(year, month, day + 1);
    displayFormat = "d MMM yyyy";
  } else if (type === "month") {
    previous = new Date(year, month - 1, 1);
    next = new Date(year, month + 1, 1);
    displayFormat = "MMM yyyy";
  } else if (type === "year") {
    previous = new Date(year - 1, month, 1);
    next = new Date(year + 1, month, 1);
    displayFormat = "yyyy";
  }

  const hasNextLink = !isAfter(next, max);

  return (
    <View style={styles.dateContainer}>
      <View style={styles.cell}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onChange(previous)}
        >
          <Icon name="keyboard-arrow-left" color="gray-400" />
        </TouchableOpacity>
      </View>
      <T bold style={styles.date}>
        {format(value, displayFormat)}
      </T>
      <View style={styles.cell}>
        {hasNextLink && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onChange(next)}
          >
            <Icon name="keyboard-arrow-right" color="gray-400" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const DateShifterSafeContainer = ({
  children,
  left = <View />,
  right = <View />,
}) => (
  <SafeView left right style={styles.safeContainer}>
    {left}
    {children}
    {right}
  </SafeView>
);

export default DateShifter;
