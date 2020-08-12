import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../base/Icon";
import { tw } from "../../base/styles/tailwind";
import FormContainer from "../../layout/FormContainer";
import { FormFieldProps } from "./FormField";

const styles = StyleSheet.create({
  buttons: tw(`flex-row mb-8`),
  button: tw(`
    w-20 h-20 items-center justify-center
    bg-white border border-gray-300 rounded-full
    mr-2 ml-2
  `),
});

const FormFieldBoolean = ({ title, value, onSave }: FormFieldProps) => {
  return (
    <FormContainer fixedHeight>
      {title}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => onSave("false")}>
          <Icon color="red-500" name="add" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onSave("true")}>
          <Icon color="green-500" name="add" size={32} />
        </TouchableOpacity>
      </View>
    </FormContainer>
  );
};

export default FormFieldBoolean;
