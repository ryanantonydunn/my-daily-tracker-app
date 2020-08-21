import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { tw } from "./styles/tailwind";
import T from "./Text";

const styles = StyleSheet.create({
  container: tw(`items-center justify-center`),
  headerText: tw(`text-red-500 text-2xl text-center mb-4`),
  bodyText: tw(`mb-6 text-center`),
  buttonRow: tw(`flex-row justify-between`),
});

const ConfirmDelete = ({ cancel, confirm }) => {
  return (
    <>
      <View style={styles.container}>
        <Icon name="delete" size={50} color="red-500" />
        <T style={styles.headerText}>Are you sure?</T>
        <T style={styles.bodyText}>
          Deleting this tracker will remove all your stored entries
        </T>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            confirm();
            cancel();
          }}
          style={tw(`p-4`)}
        >
          <T bold>Delete</T>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => cancel()} style={tw(`p-4`)}>
          <T bold>Cancel</T>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ConfirmDelete;
