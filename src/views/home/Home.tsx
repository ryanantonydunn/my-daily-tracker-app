import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DayShifter from "../../base/DayShifter";
import Gradient from "../../base/Gradient";
import Icon from "../../base/Icon";
import { tw } from "../../base/styles/tailwind";
import T from "../../base/Text";
import LayoutWithHeader from "../../layout/LayoutWithHeader";
import SafeView from "../../layout/SafeView";
import TrackerTable from "./TrackerTable";

const styles = StyleSheet.create({
  safeView: tw(`flex-1 pt-0`),
  container: tw(`flex-1 bg-white`),
  newTracker: tw(`flex-row items-center justify-center p-8`),
  newTrackerText: tw(`ml-2 text-sm text-center`),
  buttonContainer: tw(``),
  buttonPosition: tw(`absolute right-0 bottom-0 m-4`),
  button: tw(`
    w-16 h-16 items-center justify-center
    border-2 border-white
    rounded-full overflow-hidden
  `),
});

const Home = ({ route, navigation }) => {
  const date = new Date(route.params.date);
  const setDate = (date) => navigation.setParams({ date: date.toISOString() });

  return (
    <LayoutWithHeader
      logo
      menu={[
        {
          onPress: setDate,
          children: "View on date",
        },
      ]}
    >
      <ScrollView style={styles.container}>
        <DayShifter value={date} onChange={setDate} page="Home" />
        <TrackerTable date={date} />
        <View>
          <TouchableOpacity
            style={styles.newTracker}
            onPress={() => navigation.navigate("EditTrackers")}
          >
            <Icon name="playlist-add" color="green-500" />
            <T style={styles.newTrackerText}>Edit trackers</T>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonPosition}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EnterAll")}
          >
            <Gradient col1="green-500" col2="teal-500" />
            <Icon color="white" name="add" size={32} />
          </TouchableOpacity>
        </View>
      </View>
      <SafeView bottom />
    </LayoutWithHeader>
  );
};

export default Home;
