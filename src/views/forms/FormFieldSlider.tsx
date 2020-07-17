import React, { useContext, useEffect, useState } from "react";
import { ConfirmButton } from "../../base/IconButton";
import Slider from "../../base/Slider";
import T from "../../base/Text";
import Box from "../../layout/Box";
import UIContext from "../../store/UIContext";
import { FormFieldProps } from "./FormField";
import { trackerIcon } from "../../utils/trackerTypes";
import Icon from "../../base/Icon";

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
    <Box itemsCenter justifyCenter style={{ height }}>
      <Box row>
        <Icon name={trackerIcon("slider")} color={highlight} />
        <Box w1 />
        <T lg title>
          {title}
        </T>
      </Box>
      <Box h2 />
      <Slider
        onChange={(str) => setTempValue(str)}
        value={tempValue}
        highlight={highlight}
      />
      <Box h2 />
      <ConfirmButton
        disabled={tempValue === ""}
        onPress={() => onSave(tempValue)}
      />
      <Box h4 />
    </Box>
  );
};

export default FormFieldSlider;
