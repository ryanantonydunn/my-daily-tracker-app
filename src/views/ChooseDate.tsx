import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LargeButton from "../base/LargeButton";
import MonthShifter from "../base/MonthShifter";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";
import WeekDays from "../base/WeekDays";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import SafeView from "../layout/SafeView";

const WIDTH = 300;

const styles = StyleSheet.create({
  scroll: tw(`flex-grow`),
  container: tw(`flex-1 bg-white justify-between`),
  calendar: tw(`items-center justify-center mb-6 mt-4`),
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
      const disabled = isDisabled(date);
      const isCurrent = isSameDay(date, current);
      return { day, date, disabled, isCurrent };
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
      <ScrollView contentContainerStyle={styles.scroll}>
        <MonthShifter value={activeMonth} onChange={setActiveMonth} />
        <SafeView left right style={styles.container}>
          <View style={styles.calendar}>
            <WeekDays width={WIDTH / 7} />
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
                  key={d.day}
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
                    d.isCurrent && tw(`bg-green-100`),
                    d.disabled && tw(`bg-gray-200`),
                  ]}
                >
                  <T
                    bold={d.isCurrent}
                    style={[
                      styles.dateText,
                      d.isCurrent && tw(`text-green-500 `),
                      d.disabled && tw(`text-gray-500`),
                    ]}
                  >
                    {d.day}
                  </T>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={tw(`p-2`)}>
            <LargeButton
              onPress={() => {
                navigation.navigate("Home", {
                  date: new Date().toISOString(),
                });
              }}
              title="Jump to Today"
            />
          </View>
        </SafeView>
      </ScrollView>
      <SafeView bottom />
    </LayoutWithHeader>
  );
};

export default ChooseDate;
