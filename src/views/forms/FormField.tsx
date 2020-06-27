import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { white } from "../../base/colors";
import { ConfirmButton } from "../../base/IconButton";
import T, { H2 } from "../../base/Text";
import Box from "../../layout/Box";
import { SliderValues } from "../../store/DataContext";
import useKeyboard from "../../utils/useKeyboard";
import FormFieldBoolean from "./FormFieldBoolean";
import FormFieldNumber from "./FormFieldNumber";
import FormFieldSlider from "./FormFieldSlider";
import FormFieldSliderValues, {
  isInvalidSlider,
} from "./FormFieldSliderValues";
import FormFieldText from "./FormFieldText";
import FormFieldTextSingle from "./FormFieldTextSingle";
import FormFieldTrackerType from "./FormFieldTrackerType";
import { useNavigation } from "@react-navigation/native";

type FormFieldType =
  | "boolean"
  | "slider"
  | "number"
  | "text"
  | "textSingleLine"
  | "sliderValues"
  | "trackerType";

interface FormFieldProps {
  type: FormFieldType;
  slider?: SliderValues;
  value?: string | SliderValues;
  onSkip?: Function;
  onSave?: Function;
  title?: string;
}

const components = {
  boolean: FormFieldBoolean,
  slider: FormFieldSlider,
  number: FormFieldNumber,
  text: FormFieldText,
  textSingleLine: FormFieldTextSingle,
  sliderValues: FormFieldSliderValues,
  trackerType: FormFieldTrackerType,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: white,
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
  },
  skipButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  skipButton: {
    width: 80,
    paddingTop: 15,
    paddingBottom: 15,
  },
  keyboardSubmit: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

const isInvalid = (type: FormFieldType, value: any) => {
  if (type === "sliderValues") {
    return isInvalidSlider(value);
  } else {
    return value === "";
  }
};

const FormField = ({
  type,
  slider,
  onSkip,
  title,
  value,
  onSave,
}: FormFieldProps) => {
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => setTempValue(value), [value]);

  const hasKeyboard = [
    "text",
    "textSingleLine",
    "number",
    "sliderValues",
  ].includes(type);

  const Component = components[type];

  const keyboardHeight = useKeyboard();

  return (
    <View
      style={[
        styles.container,
        { marginBottom: hasKeyboard ? keyboardHeight : 0 },
      ]}
    >
      <Box flex1 p2 style={styles.content}>
        <H2>{title}</H2>
        <Box h4 />
        <Component
          slider={slider}
          value={tempValue}
          onChange={(val) => setTempValue(val)}
          onSave={(val) => {
            const newVal = val || tempValue;
            if (!isInvalid(type, newVal)) onSave(newVal);
          }}
        />
        <Box h4 />
      </Box>
      {!!onSkip && (
        <View style={styles.skipButtonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={() => onSkip()}>
            <T center light>
              Skip
            </T>
          </TouchableOpacity>
        </View>
      )}
      {hasKeyboard && (
        <Box style={styles.keyboardSubmit}>
          <ConfirmButton
            disabled={isInvalid(type, tempValue)}
            onPress={() => onSave(tempValue)}
          />
        </Box>
      )}
    </View>
  );
};

export default FormField;
