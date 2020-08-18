import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import SafeView from "../layout/SafeView";

const styles = StyleSheet.create({
  scroll: tw(`flex-grow bg-white`),
  title: tw(`text-center text-xl`),
  block: tw(`p-4 border-b border-gray-300`),
  subTitle: tw(`text-center text-sm`),
});

const TrackerForm = ({ navigation, route }) => {
  return (
    <LayoutWithHeader back="Home">
      <ScrollView contentContainerStyle={styles.scroll}>
        <T>Howdy</T>
      </ScrollView>
    </LayoutWithHeader>
  );
};

export default TrackerForm;
