import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { tw } from "../../base/styles/tailwind";
import { textStyles } from "../../base/Text";
import FormContainer from "../../layout/FormContainer";
import formatNumber from "../../utils/formatNumber";
import { FormFieldProps } from "./FormField";

const styles = StyleSheet.create({
  input: {
    ...tw(`self-stretch text-center`),
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
    <FormContainer>
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
    </FormContainer>
  );
};

export default FormFieldNumber;
