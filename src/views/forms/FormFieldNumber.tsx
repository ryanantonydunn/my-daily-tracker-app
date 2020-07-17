import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import T, { textStyles } from "../../base/Text";
import formatNumber from "../../utils/formatNumber";
import { FormFieldProps } from "./FormField";
import Box from "../../layout/Box";

const styles = StyleSheet.create({
  input: {
    ...textStyles.base,
    alignSelf: "stretch",
    textAlign: "center",
  },
});

const FormFieldNumber = ({
  title,
  highlight,
  value,
  onSave,
}: FormFieldProps) => {
  const [tempValue, setTempValue] = useState(value);
  useEffect(() => setTempValue(value), [value]);

  return (
    <Box itemsCenter justifyCenter>
      <Box h1 />
      <T title lg style={{ color: highlight }}>
        {title}
      </T>
      <Box h1 />
      <TextInput
        autoFocus
        selectTextOnFocus
        keyboardType="numeric"
        returnKeyType="done"
        blurOnSubmit={false}
        value={tempValue}
        onChangeText={(str) => setTempValue(formatNumber(str))}
        onSubmitEditing={() => onSave(tempValue)}
        style={styles.input}
        placeholder="Enter a number"
      />
    </Box>
  );
};

export default FormFieldNumber;
