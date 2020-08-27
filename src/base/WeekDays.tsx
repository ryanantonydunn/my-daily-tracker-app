import React from "react";
import { StyleSheet, View } from "react-native";
import { tw } from "./styles/tailwind";
import T from "./Text";

const styles = StyleSheet.create({
  days: tw(`flex-row`),
  dayContainer: tw(`h-10 justify-center`),
  day: tw(`text-gray-500 text-xs uppercase text-center`),
});

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeekDays = ({ width }) => {
  return (
    <View style={styles.days}>
      {weekDays.map((day) => (
        <View key={day} style={[styles.dayContainer, { width }]}>
          <T style={styles.day}>{day}</T>
        </View>
      ))}
    </View>
  );
};

export default WeekDays;
