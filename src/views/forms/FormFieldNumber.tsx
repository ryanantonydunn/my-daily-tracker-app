import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { tw } from "../../base/styles/tailwind";
import { textStyles } from "../../base/Text";
import formatNumber from "../../utils/formatNumber";
import { FormFieldProps } from "./FormField";

const styles = StyleSheet.create({
  cont: tw(`relative self-stretch flex-1 items-center pt-6`),
  input: {
    ...tw(`self-stretch text-center p-4`),
    ...textStyles.base,
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
    <View style={styles.cont}>
      {title}
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
        placeholder="Enter number..."
      />
    </View>
  );
};

export default FormFieldNumber;
