import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import Box from "../layout/Box";
import { col } from "./colors";
import IconButton from "./IconButton";
import T from "./Text";

interface DayShifterProps {
  onChange: Function;
  value: Date;
  max?: Date;
}

const DayShifter = ({ onChange, value, max = new Date() }: DayShifterProps) => {
  const day = value.getDate();
  const month = value.getMonth();
  const year = value.getFullYear();
  const yesterday = new Date(year, month, day - 1);
  const tomorrow = new Date(year, month, day + 1);
  const hasTomorrowLink = !isAfter(tomorrow, max);
  return (
    <Box
      h4
      row
      itemsCenter
      justifyCenter
      style={{
        backgroundColor: col("gray-2"),
        borderBottomColor: col("gray-4"),
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    >
      <Box w5>
        <IconButton
          name="keyboard-arrow-left"
          color={col("gray-4")}
          onPress={() => onChange(yesterday)}
        />
      </Box>
      <T xs>{format(value, "EEE d MMM")}</T>
      <Box w5>
        {hasTomorrowLink && (
          <IconButton
            name="keyboard-arrow-right"
            color={col("gray-4")}
            onPress={() => onChange(tomorrow)}
          />
        )}
      </Box>
    </Box>
  );
};

export default DayShifter;
