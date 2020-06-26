import React, { useRef, useEffect } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { rem, textStyles } from "../../base/Text";
import { useNavigation } from "@react-navigation/native";
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
    lineHeight: rem(1.5),
    height: 50,
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
