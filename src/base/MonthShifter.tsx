import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { tw } from "./styles/tailwind";
import T from "./Text";

const styles = StyleSheet.create({
  container: tw(`
    h-12
    flex-row items-center justify-center
    bg-gray-100 border-b border-gray-300
  `),
  cell: tw(`w-12 items-center`),
  dateContainer: tw(`flex-row items-center justify-between`),
  iconButton: tw(`p-2`),
  date: tw(`text-xs font-bold`),
});

interface MonthShifterProps {
  onChange: Function;
  value: Date;
  max?: Date;
}

const MonthShifter = ({
  onChange,
  value,
  max = new Date(),
}: MonthShifterProps) => {
  const month = value.getMonth();
  const year = value.getFullYear();

  const previous = new Date(year, month - 1, 1);
  const next = new Date(year, month + 1, 1);
  const hasNext = !isAfter(next, max);

  return (
    <View style={styles.container}>
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
          {format(value, "MMM yyyy")}
        </T>
        <View style={styles.cell}>
          {hasNext && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onChange(next)}
            >
              <Icon name="keyboard-arrow-right" color="gray-400" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default MonthShifter;
