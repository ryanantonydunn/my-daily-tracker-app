import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { rem, textStyles } from "../../base/Text";
import useAutoFocus from "../../utils/useAutoFocus";

interface FormFieldTextProps {
  value: any;
  onChange: Function;
}

const styles = StyleSheet.create({
  input: {
    ...textStyles.base,
    alignSelf: "stretch",
    lineHeight: rem(1.5),
    height: 200,
    textAlign: "center",
  },
});

const FormFieldText = ({ onChange, value }: FormFieldTextProps) => {
  const focusRef = useAutoFocus();
  return (
    <TextInput
      ref={focusRef}
      multiline
      blurOnSubmit={false}
      value={value}
      onChangeText={(str) => onChange(str.substring(0, 2000))}
      style={styles.input}
    />
  );
};

export default FormFieldText;
