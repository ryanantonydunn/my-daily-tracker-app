import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { textStyles } from "../../base/Text";
import useAutoFocus from "../../utils/useAutoFocus";

interface FormFieldTextSingleProps {
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

const FormFieldTextSingle = ({
  onChange,
  onSave,
  value,
}: FormFieldTextSingleProps) => {
  const focusRef = useAutoFocus();
  return (
    <TextInput
      ref={focusRef}
      returnKeyType="done"
      blurOnSubmit={false}
      value={value}
      onChangeText={(str) => onChange(str.substring(0, 30))}
      onSubmitEditing={() => onSave()}
      style={styles.input}
    />
  );
};

export default FormFieldTextSingle;
