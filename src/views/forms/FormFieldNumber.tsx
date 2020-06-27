import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { textStyles } from "../../base/Text";
import formatNumber from "../../utils/formatNumber";

interface FormFieldNumberProps {
  value: any;
  onChange: Function;
  onSave: Function;
}

const styles = StyleSheet.create({
  input: {
    ...textStyles.base,
    alignSelf: "stretch",
    textAlign: "center",
  },
});

const FormFieldNumber = ({ onChange, onSave, value }: FormFieldNumberProps) => {
  return (
    <TextInput
      autoFocus
      keyboardType="numeric"
      returnKeyType="done"
      blurOnSubmit={false}
      value={value}
      onChangeText={(str) => onChange(formatNumber(str))}
      onSubmitEditing={() => onSave()}
      style={styles.input}
    />
  );
};

export default FormFieldNumber;
