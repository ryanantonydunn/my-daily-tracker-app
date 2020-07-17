import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { rem, textStyles } from "../../base/Text";
import useAutoFocus from "../../utils/useAutoFocus";
import { FormFieldProps } from "./FormField";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    ...textStyles.base,
    alignSelf: "stretch",
    lineHeight: rem(1.5),
    textAlign: "center",
  },
});

const FormFieldText = ({ onSave, value }: FormFieldProps) => {
  const focusRef = useAutoFocus();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <TextInput
        ref={focusRef}
        multiline
        blurOnSubmit={false}
        value={value}
        onChangeText={(str) => onSave(str.substring(0, 2000))}
        style={styles.input}
      />
    </ScrollView>
  );
};

export default FormFieldText;
