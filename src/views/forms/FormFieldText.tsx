import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "../../base/Icon";
import { tw } from "../../base/styles/tailwind";
import { textStyles } from "../../base/Text";
import { FormFieldProps } from "./FormField";

const styles = StyleSheet.create({
  container: tw(`relative self-stretch flex-1`),
  scroll: tw(`pt-6 self-stretch flex-1`),
  content: tw(`items-center`),
  input: {
    ...tw(`self-stretch flex-1 text-center p-4`),
    ...textStyles.base,
  },
  buttonContainer: tw(`absolute bottom-0 right-0`),
  button: tw(`
    w-16 h-16 items-center justify-center
    bg-white border border-gray-300 rounded-full
    m-4
  `),
});

const FormFieldText = ({ title, highlight, value, onSave }: FormFieldProps) => {
  const [tempValue, setTempValue] = useState(value);
  useEffect(() => setTempValue(value), [value]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {title}
        <TextInput
          autoFocus
          multiline
          blurOnSubmit={false}
          value={tempValue}
          onChangeText={(str) => setTempValue(str.substring(0, 2000))}
          style={styles.input}
          placeholder="Enter text..."
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onSave(tempValue)}
        >
          <Icon color="green-500" name="check" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormFieldText;
