import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gray_400, gray_500 } from "../../base/colors";
import Icon from "../../base/Icon";
import T from "../../base/Text";
import Box from "../../layout/Box";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    width: 120,
    height: 120,
    margin: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray_400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99999,
  },
});

const trackerTypes = [
  { title: "Checkbox", icon: "check", value: "boolean" },
  { title: "Slider", icon: "linear-scale", value: "slider" },
  { title: "Text", icon: "short-text", value: "text" },
  { title: "Number", icon: "all-inclusive", value: "number" },
];

const FormFieldTrackerType = ({ onSave }) => {
  return (
    <View style={styles.container}>
      {trackerTypes.map(({ title, icon, value }) => (
        <TouchableOpacity
          key={value}
          onPress={() => onSave(value)}
          style={styles.button}
        >
          <Icon name={icon} size={30} color={gray_500} />
          <Box h1 />
          <T sm>{title}</T>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FormFieldTrackerType;
