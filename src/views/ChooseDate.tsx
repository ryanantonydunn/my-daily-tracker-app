import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { col } from "../base/colors";
import IconButton from "../base/IconButton";
import LargeButton from "../base/LargeButton";
import T, { H1, rem } from "../base/Text";
import Box from "../layout/Box";
import LayoutWithHeader from "../layout/LayoutWithHeader";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ChooseDate = ({ route, navigation }) => {
  const current = new Date(route.params.current);
  const [activeMonth, setActiveMonth] = useState(current);

  const month = activeMonth.getMonth();
  const year = activeMonth.getFullYear();

  const previous = new Date(year, month - 1, 1);
  const next = new Date(year, month + 1, 1);
  const hasNext = !isAfter(next, new Date());

  // const isCurrentMonth = isSameMonth(date, currentValue);
  // const currentDay = currentValue.getDate();

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

  const monthStartDay = days[0].date.getDay();
  const mondayFirst = (monthStartDay - 1) % 7;
  const offset = mondayFirst * (280 / 7);

  const showRightBorder = useCallback((n) => (n + mondayFirst) % 7 !== 0, [
    mondayFirst,
  ]);

  const bottomRowLength = (mondayFirst + days.length) % 7 || 7;
  const showBottomBorder = useCallback(
    (n) => n <= days.length - bottomRowLength,
    [mondayFirst]
  );

  return (
    <LayoutWithHeader title={<H1>View On Date</H1>} back="Home">
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Box
          h5
          row
          itemsCenter
          justifyCenter
          style={{
            backgroundColor: col("gray-1"),
            borderBottomColor: col("gray-3"),
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Box w5 itemsCenter>
            <IconButton
              name="keyboard-arrow-left"
              color={col("gray-4")}
              onPress={() => setActiveMonth(previous)}
            />
          </Box>
          <T xs bold>
            {format(activeMonth, "MMM yyyy")}
          </T>
          <Box w5 itemsCenter>
            {hasNext && (
              <IconButton
                name="keyboard-arrow-right"
                color={col("gray-4")}
                onPress={() => setActiveMonth(next)}
              />
            )}
          </Box>
        </Box>
        <Box flex1 bgWhite p2 justifyBetween>
          <Box itemsCenter>
            <Box row style={{ width: 280 }}>
              {weekDays.map((day) => (
                <Box key={day} h3 itemsCenter style={{ width: 280 / 7 }}>
                  <T
                    light
                    style={{
                      fontSize: rem(0.55),
                      textTransform: "uppercase",
                    }}
                  >
                    {day}
                  </T>
                </Box>
              ))}
            </Box>
            <Box
              row
              wrap
              style={{
                width: 280 + StyleSheet.hairlineWidth * 2,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: col("gray-4"),
                borderRadius: 4,
              }}
            >
              {offset !== 0 && (
                <Box
                  style={{
                    width: offset,
                    borderRightWidth: StyleSheet.hairlineWidth,
                    borderRightColor: col("gray-4"),
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: col("gray-4"),
                  }}
                />
              )}
              {days.map((d) => (
                <TouchableOpacity
                  key={d.label}
                  onPress={() => {
                    navigation.navigate("Home", { date: d.date.toISOString() });
                  }}
                  disabled={d.disabled}
                  style={[
                    {
                      width: 280 / 7,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    showRightBorder(d.day) && {
                      borderRightWidth: StyleSheet.hairlineWidth,
                      borderRightColor: col("gray-4"),
                    },
                    showBottomBorder(d.day) && {
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: col("gray-4"),
                    },
                    d.disabled && {
                      backgroundColor: col("gray-2"),
                    },
                    d.isCurrent && {
                      backgroundColor: col("green-5"),
                    },
                  ]}
                >
                  <T sm white={d.isCurrent} light={d.disabled}>
                    {d.day}
                  </T>
                </TouchableOpacity>
              ))}
            </Box>
          </Box>
          <LargeButton
            onPress={() => {
              navigation.navigate("Home", { date: new Date().toISOString() });
            }}
            title="Jump to Today"
          />
        </Box>
      </ScrollView>
    </LayoutWithHeader>
  );
};

export default ChooseDate;
