import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { rem, textStyles } from "../../base/Text";
import useAutoFocus from "../../utils/useAutoFocus";

interface FormFieldTextProps {
  value: any;
  onChange: Function;
}

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

const FormFieldText = ({ onChange, value }: FormFieldTextProps) => {
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
        onChangeText={(str) => onChange(str.substring(0, 2000))}
        style={styles.input}
      />
    </ScrollView>
  );
};

export default FormFieldText;
