import React from "react";
import Slider from "../../base/Slider";
import { ConfirmButton } from "../../base/IconButton";
import Box from "../../layout/Box";
import { SliderValues } from "../../store/DataContext";

interface FormFieldBooleanProps {
  slider: SliderValues;
  value: any;
  onChange: Function;
  onSave: Function;
}

const FormFieldSlider = ({
  slider,
  value,
  onChange,
  onSave,
}: FormFieldBooleanProps) => {
  return (
    <Box itemsCenter justifyCenter>
      <Slider slider={slider} onChange={(str) => onChange(str)} value={value} />
      <Box h3 />
      <ConfirmButton disabled={value === ""} onPress={() => onSave(value)} />
    </Box>
  );
};

export default FormFieldSlider;
