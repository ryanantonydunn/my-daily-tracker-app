import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../base/Icon";
import Slider from "../../base/Slider";
import { tw } from "../../base/styles/tailwind";
import FormContainer from "../../layout/FormContainer";
import UIContext from "../../store/UIContext";
import { FormFieldProps } from "./FormField";

const styles = StyleSheet.create({
  button: tw(`
    w-20 h-20 items-center justify-center
    bg-white border border-gray-300 rounded-full
    mr-2 ml-2 mt-4
  `),
});

const FormFieldSlider = ({
  title,
  highlight,
  value,
  onSave,
}: FormFieldProps) => {
  const { safeHeight } = useContext(UIContext);
  const height = safeHeight - 88;
  const [tempValue, setTempValue] = useState(value);
  useEffect(() => setTempValue(value), [value]);

  return (
    <FormContainer fixedHeight>
      {title}
      <Slider
        onChange={(str) => setTempValue(str)}
        value={tempValue}
        highlight={highlight}
      />
      <TouchableOpacity style={styles.button} onPress={() => onSave(tempValue)}>
        <Icon color="green-500" name="check" size={32} />
      </TouchableOpacity>
    </FormContainer>
  );
};

export default FormFieldSlider;
