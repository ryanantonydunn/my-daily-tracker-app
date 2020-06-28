import React, { useContext, useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { white } from "../../base/colors";
import { ConfirmButton } from "../../base/IconButton";
import T, { H2 } from "../../base/Text";
import Box from "../../layout/Box";
import { SliderValues } from "../../store/DataContext";
import UIContext from "../../store/UIContext";
import FormFieldBoolean from "./FormFieldBoolean";
import FormFieldNumber from "./FormFieldNumber";
import FormFieldSlider from "./FormFieldSlider";
import FormFieldSliderValues, {
  isInvalidSlider,
} from "./FormFieldSliderValues";
import FormFieldText from "./FormFieldText";
import FormFieldTextSingle from "./FormFieldTextSingle";
import FormFieldTrackerType from "./FormFieldTrackerType";

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
  },
  skipButton: {
    width: 80,
    paddingTop: 15,
    paddingBottom: 15,
  },
  keyboardSubmit: {
    position: "absolute",
    right: 10,
    bottom: 10,
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
  const { screenHeight, safeHeight, isPortrait } = useContext(UIContext);
  const [width, setWidth] = useState(0);

  const [tempValue, setTempValue] = useState(value);

  useEffect(() => setTempValue(value), [value]);

  const hasKeyboard = [
    "text",
    "textSingleLine",
    "number",
    "sliderValues",
  ].includes(type);

  const Component = components[type];

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        setWidth(e.nativeEvent.layout.width);
      }}
      style={[
        styles.container,
        {
          paddingLeft: isPortrait ? 0 : 180,
          paddingRight: isPortrait ? 0 : 180,
          paddingTop: isPortrait ? 80 : 32,
          paddingBottom: isPortrait ? 80 : 20,
        },
        hasKeyboard
          ? {
              flex: 1,
            }
          : {
              height: safeHeight,
            },
      ]}
    >
      <Box flex1>
        <H2>{title}</H2>
        <Box style={{ height: screenHeight < 500 ? 10 : 40 }} />
        <Component
          slider={slider}
          value={tempValue}
          onChange={(val) => setTempValue(val)}
          onSave={(val) => {
            const newVal = val || tempValue;
            if (!isInvalid(type, newVal)) onSave(newVal);
          }}
        />
        <Box h3 />
      </Box>
      {!!onSkip && (
        <View style={[styles.skipButtonContainer, { left: width / 2 - 40 }]}>
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
