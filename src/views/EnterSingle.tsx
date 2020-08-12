import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DayShifter from "../base/DayShifter";
import { tw } from "../base/styles/tailwind";
import TrackerTitle from "../base/TrackerTitle";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import DataContext from "../store/DataContext";
import { getDateFromKey, getDateKey } from "../utils/getDateKey";
import { getTrackerComponent } from "./forms/FormField";

const styles = StyleSheet.create({
  safeView: tw(`flex-1 pt-0`),
  scroll: tw(`flex-1`),
  entryForm: tw(`flex-1 items-center justify-center bg-white`),
});

const EnterSingle = ({ route, navigation }) => {
  const { trackerId, dateKey: paramDateKey } = route.params;
  const { getTracker, setEntry, getEntry } = useContext(DataContext);
  const [date, setDate] = useState(getDateFromKey(paramDateKey));
  const dateKey = getDateKey(date);
  const tracker = getTracker(trackerId);
  const entry = getEntry({ trackerId, dateKey });
  const value = entry?.value || "";

  const FormFieldComponent = getTrackerComponent(tracker.type);

  const hasKeyboard = ["number", "text"].includes(tracker.type);

  return (
    <LayoutWithHeader hasKeyboard={hasKeyboard} title="Make Entry" back="Home">
      <SafeAreaView style={[styles.safeView, hasKeyboard && tw(`pb-0`)]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <DayShifter value={date} onChange={setDate} page="EnterSingle" />
          <View style={styles.entryForm}>
            {!!tracker && (
              <FormFieldComponent
                title={<TrackerTitle tracker={tracker} style={tw(`mb-4`)} />}
                highlight={tracker.color}
                value={value}
                onSave={(value) => {
                  setEntry(tracker, dateKey, value);
                  navigation.navigate("Home");
                }}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LayoutWithHeader>
  );
};

export default EnterSingle;
