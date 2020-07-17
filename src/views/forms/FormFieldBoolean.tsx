import React, { useContext } from "react";
import Box from "../../layout/Box";
import IconButton, { ConfirmButton } from "../../base/IconButton";
import { col, red } from "../../base/colors";
import T from "../../base/Text";
import { FormFieldProps } from "./FormField";
import Icon from "../../base/Icon";
import { trackerIcon } from "../../utils/trackerTypes";
import UIContext from "../../store/UIContext";

const FormFieldBoolean = ({
  title,
  highlight,
  value,
  onSave,
}: FormFieldProps) => {
  const { safeHeight } = useContext(UIContext);
  const height = safeHeight - 88;

  return (
    <Box itemsCenter justifyCenter style={{ height }}>
      <Box row>
        <Icon name={trackerIcon("boolean")} color={highlight} />
        <Box w1 />
        <T lg title>
          {title}
        </T>
      </Box>
      <Box h2 />
      <Box row>
        <IconButton
          lg
          border={col("gray-4")}
          color={red}
          name="close"
          onPress={() => onSave("false")}
        />
        <Box w2 />
        <ConfirmButton onPress={() => onSave("true")} />
      </Box>
      <Box h4 />
    </Box>
  );
};

export default FormFieldBoolean;
