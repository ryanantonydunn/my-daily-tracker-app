import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { gray_400 } from "../../base/colors";
import { H3, textStyles } from "../../base/Text";
import Box from "../../layout/Box";
import { SliderValues } from "../../store/DataContext";
import formatNumber from "../../utils/formatNumber";

interface FormFieldSliderValuesProps {
  value: any;
  onChange: Function;
  onSave: Function;
  isInvalid?: Function;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    marginLeft: "auto",
    marginRight: "auto",
  },
  section: {
    width: 100,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderColor: gray_400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  input: {
    ...textStyles.base,
    textAlign: "center",
    alignSelf: "stretch",
  },
});

export const isInvalidSlider = (slider: SliderValues) => {
  const min = parseFloat(slider.min) * 100;
  const max = parseFloat(slider.max) * 100;
  const step = parseFloat(slider.step) * 100;
  return min >= max || (max - min) % step !== 0;
};

const FormFieldSliderValues = ({
  value,
  onChange,
}: FormFieldSliderValuesProps) => {
  const minRef = useRef<any>();
  const maxRef = useRef<any>();
  const stepRef = useRef<any>();

  const field = (ref, title, key, autoFocus) => (
    <TouchableWithoutFeedback
      style={styles.section}
      onPress={() => ref.current.focus()}
    >
      <H3>{title}</H3>
      <Box h1 />
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        keyboardType="decimal-pad"
        value={value[key]}
        onChangeText={(str) => onChange({ ...value, [key]: formatNumber(str) })}
        style={styles.input}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      {field(minRef, "Min", "min", true)}
      <Box w2 />
      {field(maxRef, "Max", "max", false)}
      <Box w2 />
      {field(stepRef, "Step", "step", false)}
    </View>
  );
};

export default FormFieldSliderValues;
