import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import LargeButton from "../base/LargeButton";
import MonthShifter from "../base/MonthShifter";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";
import LayoutWithHeader from "../layout/LayoutWithHeader";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WIDTH = 300;

const styles = StyleSheet.create({
  safeView: tw(`flex-1 pt-0`),
  flex1: tw(`flex-1`),
  container: tw(`flex-1 bg-white p-2 justify-between`),
  days: tw(`flex-row`),
  dayContainer: {
    ...tw(`h-10 justify-center`),
    width: WIDTH / 7,
  },
  day: tw(`text-gray-500 text-xs uppercase`),
  calendar: tw(`items-center justify-center mb-6`),
  calendarContainer: {
    ...tw(`flex-row flex-wrap border border-gray-400 rounded-lg`),
    width: WIDTH + StyleSheet.hairlineWidth * 2,
  },
  offset: tw(`border-r border-b border-gray-400`),
  date: {
    ...tw(`h-10 items-center justify-center border-gray-400`),
    width: WIDTH / 7,
  },
  dateText: tw(`text-sm`),
});

const ChooseDate = ({ route, navigation }) => {
  // current displayed month values
  const current = new Date(route.params.current);
  const [activeMonth, setActiveMonth] = useState(current);
  const month = activeMonth.getMonth();
  const year = activeMonth.getFullYear();

  // check if any given date is disabled
  const isDisabled = useCallback((d: Date) => {
    const max = new Date();
    const min = new Date(2019, 0, 1);
    return isAfter(d, max) || isBefore(d, min);
  }, []);

  // build array of data for each day in the current display
  const days = useMemo(() => {
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: numberOfDays }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);
      const label = format(date, "E do MMMM, yyyy");
      const disabled = isDisabled(date);
      const isCurrent = isSameDay(date, current);
      return { day, date, label, disabled, isCurrent };
    });
  }, [isDisabled, month, year]);

  // calculate display values for the calendar
  const monthStartDay = days[0].date.getDay();
  const mondayFirst = (monthStartDay - 1) % 7;
  const offset = mondayFirst * (WIDTH / 7);

  const showRightBorder = useCallback((n) => (n + mondayFirst) % 7 !== 0, [
    mondayFirst,
  ]);

  const bottomRowLength = (mondayFirst + days.length) % 7 || 7;
  const showBottomBorder = useCallback(
    (n) => n <= days.length - bottomRowLength,
    [mondayFirst]
  );

  return (
    <LayoutWithHeader title="View On Date" back="Home">
      <SafeAreaView style={styles.safeView}>
        <ScrollView style={styles.flex1}>
          <MonthShifter
            value={activeMonth}
            onChange={(d) => setActiveMonth(d)}
          />
          <View style={styles.container}>
            <View style={styles.calendar}>
              <View style={styles.days}>
                {weekDays.map((day) => (
                  <View key={day} style={styles.dayContainer}>
                    <T style={styles.day}>{day}</T>
                  </View>
                ))}
              </View>
              <View style={styles.calendarContainer}>
                {offset !== 0 && (
                  <View
                    style={[
                      styles.offset,
                      {
                        width: offset,
                      },
                    ]}
                  />
                )}
                {days.map((d) => (
                  <TouchableOpacity
                    key={d.label}
                    onPress={() => {
                      navigation.navigate("Home", {
                        date: d.date.toISOString(),
                      });
                    }}
                    disabled={d.disabled}
                    style={[
                      styles.date,
                      showRightBorder(d.day) && tw(`border-r`),
                      showBottomBorder(d.day) && tw(`border-b`),
                      d.disabled && tw(`bg-gray-200`),
                      d.isCurrent && tw(`bg-green-500`),
                    ]}
                  >
                    <T
                      style={[
                        styles.dateText,
                        d.isCurrent && tw(`text-white`),
                        d.disabled && tw(`text-gray-500`),
                      ]}
                    >
                      {d.day}
                    </T>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <LargeButton
              onPress={() => {
                navigation.navigate("Home", {
                  date: new Date().toISOString(),
                });
              }}
              title="Jump to Today"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LayoutWithHeader>
  );
};

export default ChooseDate;
