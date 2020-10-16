import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DateShifter, { DateShifterSafeContainer } from "../base/DateShifter";
import EntryBall from "../base/EntryBall";
import Icon from "../base/Icon";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";
import TrackerTitle from "../base/TrackerTitle";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import SafeView from "../layout/SafeView";
import DataContext from "../store/DataContext";
import UIContext from "../store/UIContext";
import { getDateKey } from "../utils/getDateKey";

const CELL_SIZE = 50;

const styles = StyleSheet.create({
  container: tw(`flex-1 bg-white`),
  cell: tw(`w-12 items-center`),
  iconButton: tw(`p-2`),

  days: tw(`flex-row items-center justify-end border-b border-gray-300`),
  day: {
    ...tw(`items-center justify-center bg-white`),
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  today: tw(`bg-yellow-200`),
  dayText: tw(`text-gray-500 text-xs uppercase`),
  dateText: tw(``),

  trackerRow: tw(`flex-row items-stretch border-b border-gray-300`),
  trackerLabelContainer: tw(`flex-1`),
  trackerLabelButton: {
    ...tw(`flex-1 justify-center items-start pl-2`),
    height: CELL_SIZE + 10,
  },

  entryContainer: {
    ...tw(`items-center justify-center`),
    width: CELL_SIZE,
    height: CELL_SIZE + 10,
  },

  newTracker: tw(`flex-row items-center justify-center p-8`),
  newTrackerText: tw(`ml-2 text-sm text-center`),
});

/**
 * Build the array of dates to query
 */
const prepareDates = (n, date) =>
  Array.from({ length: n }).map((_, i) => {
    const d = new Date(date);
    d.setDate(d.getDate() - (n - 1 - i));
    return {
      date: d,
      dateKey: getDateKey(d),
    };
  });

/**
 * Main table of tracker entries
 */

const TrackerTable = ({ route }) => {
  const date = new Date(route.params.date);
  const setDate = (date) => navigation.setParams({ date: date.toISOString() });

  const { screenWidth } = useContext(UIContext);

  const numberOfDays = Math.floor((screenWidth - 160) / CELL_SIZE);
  const navigation = useNavigation();
  const dates = prepareDates(numberOfDays, date);
  const { activeTrackers, getEntry, setEntry } = useContext(DataContext);

  return (
    <LayoutWithHeader logo>
      <ScrollView style={styles.container}>
        <DateShifterSafeContainer
          left={<View style={styles.cell} />}
          right={
            <View style={styles.cell}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  navigation.navigate("ChooseDate", {
                    current: date.toISOString(),
                    page: "Home",
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
        <SafeView left right style={styles.days}>
          {dates.map(({ date }, i) => (
            <View key={i} style={[styles.day, isToday(date) && styles.today]}>
              <T style={styles.dayText}>{format(date, "eee")}</T>
              <T style={styles.dateText}>{format(date, "d")}</T>
            </View>
          ))}
          <View style={tw(`w-3`)} />
        </SafeView>

        {activeTrackers.map((tracker) => (
          <SafeView left right key={tracker.id} style={styles.trackerRow}>
            <View style={styles.trackerLabelContainer}>
              <TouchableOpacity
                style={styles.trackerLabelButton}
                onPress={() => {
                  navigation.navigate("TrackerView", {
                    trackerId1: tracker.id,
                    trackerId2: undefined,
                  });
                }}
              >
                <TrackerTitle sm tracker={tracker} />
              </TouchableOpacity>
            </View>

            {dates.map(({ date, dateKey }) => (
              <View
                key={dateKey}
                style={[styles.entryContainer, isToday(date) && styles.today]}
              >
                <EntryBall trackerId={tracker.id} dateKey={dateKey} />
              </View>
            ))}
            <View style={tw(`w-3`)} />
          </SafeView>
        ))}

        <TouchableOpacity
          style={styles.newTracker}
          onPress={() => navigation.navigate("EditTrackers")}
        >
          <Icon name="playlist-add" color="green-500" />
          <T style={styles.newTrackerText}>Edit trackers</T>
        </TouchableOpacity>
      </ScrollView>
    </LayoutWithHeader>
  );
};

export default TrackerTable;
