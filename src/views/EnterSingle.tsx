import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DateShifter, { DateShifterSafeContainer } from "../base/DateShifter";
import Icon from "../base/Icon";
import { tw } from "../base/styles/tailwind";
import TrackerTitle from "../base/TrackerTitle";
import FixedHeight from "../layout/FixedHeight";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import SafeView from "../layout/SafeView";
import DataContext from "../store/DataContext";
import { getDateFromKey, getDateKey } from "../utils/getDateKey";
import { getTrackerComponent } from "./forms/FormField";

const styles = StyleSheet.create({
  scroll: tw(`flex-grow bg-white`),
  entryForm: tw(`flex-1 items-center justify-center`),
  cell: tw(`w-12 items-center`),
  iconButton: tw(`p-2`),
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

  useEffect(() => {
    setDate(getDateFromKey(route.params.dateKey));
  }, [route.params.dateKey]);

  return (
    <LayoutWithHeader title="Make Entry" back="Home">
      <FixedHeight grow enabled={!hasKeyboard}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <DateShifterSafeContainer
            left={<View style={styles.cell} />}
            right={
              <View style={styles.cell}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    navigation.navigate("ChooseDate", {
                      current: date.toISOString(),
                      page: "EnterSingle",
                    });
                  }}
                >
                  <Icon name="today" color="teal-500" />
                </TouchableOpacity>
              </View>
            }
          >
            <DateShifter value={date} onChange={setDate} type="day" />
          </DateShifterSafeContainer>

          <SafeView left right style={styles.entryForm}>
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
          </SafeView>
          {!hasKeyboard && <SafeView bottom />}
        </ScrollView>
      </FixedHeight>
    </LayoutWithHeader>
  );
};

export default EnterSingle;
