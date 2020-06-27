import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gray_400, gray_500 } from "../../base/colors";
import Icon from "../../base/Icon";
import T from "../../base/Text";
import Box from "../../layout/Box";
import { trackerTypes } from "../../utils/trackerTypes";
import UIContext from "../../store/UIContext";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
  },
  button: {
    margin: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray_400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99999,
  },
});

const FormFieldTrackerType = ({ onSave }) => {
  const { screenHeight } = useContext(UIContext);
  const buttonSize = screenHeight < 500 ? 100 : 120;
  return (
    <Box flex1 justifyCenter itemsCenter>
      <View style={styles.container}>
        {trackerTypes.map(({ title, icon, value }) => (
          <TouchableOpacity
            key={value}
            onPress={() => onSave(value)}
            style={[styles.button, { width: buttonSize, height: buttonSize }]}
          >
            <Icon name={icon} size={30} color={gray_500} />
            <Box h1 />
            <T sm>{title}</T>
          </TouchableOpacity>
        ))}
      </View>
    </Box>
  );
};

export default FormFieldTrackerType;
