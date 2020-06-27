import React from "react";
import Box from "../../layout/Box";
import IconButton, { ConfirmButton } from "../../base/IconButton";
import { gray_400, red } from "../../base/colors";

interface FormFieldBooleanProps {
  onSave: Function;
}

const FormFieldBoolean = ({ onSave }: FormFieldBooleanProps) => {
  return (
    <Box flex1 itemsCenter justifyCenter>
      <Box row>
        <IconButton
          xl
          border={gray_400}
          color={red}
          name="close"
          onPress={() => onSave("false")}
        />
        <Box w2 />
        <ConfirmButton onPress={() => onSave("true")} />
      </Box>
    </Box>
  );
};

export default FormFieldBoolean;
