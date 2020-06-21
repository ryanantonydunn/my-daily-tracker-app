import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { H2 } from "../base/Text";
import Box from "../layout/Box";
import { FormContent } from "../layout/LayoutForm";
import { Tracker } from "../store/TrackerContext";
import IconButton, { ConfirmButton } from "../base/IconButton";
import { gray_400, green, red } from "../base/colors";
import Slider from "../base/Slider";

interface EnterFieldProps {
  tracker: Tracker;
  onSave?: Function;
}

const EnterField = ({ tracker, onSave }: EnterFieldProps) => {
  const [value, setValue] = useState("");
  return (
    <FormContent>
      <H2>{tracker.label}</H2>
      <Box h3 />
      {tracker.type === "boolean" ? (
        <Box row>
          <IconButton
            xl
            border={gray_400}
            color={red}
            name="close"
            onPress={() => onSave("false")}
          />
          <Box w2 />
          <ConfirmButton onPress={() => onSave("true")} />
        </Box>
      ) : tracker.type === "slider" ? (
        <>
          <Slider
            min={tracker.min}
            max={tracker.max}
            step={tracker.step}
            onChange={(value) => setValue(value)}
            value={value}
          />
          <Box h3 />
          <ConfirmButton
            disabled={value === ""}
            onPress={() => onSave(value)}
          />
        </>
      ) : tracker.type === "text" ? (
        <>
          <TextInput
            autoFocus
            onChange={(e) => setValue(e.nativeEvent.text)}
            onSubmitEditing={() => onSave(value)}
            onBlur={() => {
              console.log("yah");
            }}
          />
        </>
      ) : tracker.type === "number" ? (
        <View />
      ) : (
        <View />
      )}
    </FormContent>
  );
};

export default EnterField;
