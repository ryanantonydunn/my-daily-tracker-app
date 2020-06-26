import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import React from "react";
import Box from "../layout/Box";
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
    <Box row itemsCenter>
      <Box w5 justifyCenter>
        <IconButton
          name="keyboard-arrow-left"
          onPress={() => onChange(yesterday)}
        />
      </Box>
      <T light>{format(value, "EEE d MMM")}</T>
      <Box w5 justifyCenter>
        {hasTomorrowLink && (
          <IconButton
            name="keyboard-arrow-right"
            onPress={() => onChange(tomorrow)}
          />
        )}
      </Box>
    </Box>
  );
};

export default DayShifter;
