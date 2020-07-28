import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { col, tw } from "./styles/tailwind";
import T from "./Text";

const styles = StyleSheet.create({
  container: tw(`
    h-12
    flex-row items-center justify-between
    bg-gray-100 border-b border-gray-300
  `),
  cell: tw(`w-12 items-center`),
  dateContainer: tw(`flex-row items-center justify-between`),
  iconButton: tw(`p-2`),
  date: tw(`text-xs font-bold`),
});

interface DayShifterProps {
  onChange: Function;
  value: Date;
  max?: Date;
  page: string;
}

const DayShifter = ({
  onChange,
  value,
  max = new Date(),
  page,
}: DayShifterProps) => {
  const navigation = useNavigation();

  const day = value.getDate();
  const month = value.getMonth();
  const year = value.getFullYear();

  const yesterday = new Date(year, month, day - 1);
  const tomorrow = new Date(year, month, day + 1);

  const hasTomorrowLink = !isAfter(tomorrow, max);

  return (
    <View style={styles.container}>
      <View style={styles.cell} />
      <View style={styles.dateContainer}>
        <View style={styles.cell}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onChange(yesterday)}
          >
            <Icon name="keyboard-arrow-left" color="gray-400" />
          </TouchableOpacity>
        </View>
        <T bold style={styles.date}>
          {format(value, "d MMM yyyy")}
        </T>
        <View style={styles.cell}>
          {hasTomorrowLink && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onChange(tomorrow)}
            >
              <Icon name="keyboard-arrow-right" color="gray-400" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.cell}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("ChooseDate", {
              current: value.toISOString(),
              page,
            });
          }}
        >
          <Icon name="today" color="teal-500" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DayShifter;
