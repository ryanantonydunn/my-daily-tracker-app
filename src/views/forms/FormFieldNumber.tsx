import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { rem, textStyles } from "../../base/Text";

interface FormFieldNumberProps {
  value: any;
  onChange: Function;
  onSave: Function;
}

const styles = StyleSheet.create({
  input: {
    ...textStyles.base,
    alignSelf: "stretch",
    lineHeight: rem(1.5),
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
      onChangeText={(str) => onChange(str)}
      onSubmitEditing={() => onSave(value)}
      style={styles.input}
    />
  );
};

export default FormFieldNumber;
