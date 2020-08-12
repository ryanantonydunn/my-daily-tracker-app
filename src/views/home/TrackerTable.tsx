import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../base/Icon";
import { col, tw } from "../../base/styles/tailwind";
import T from "../../base/Text";
import TrackerTitle from "../../base/TrackerTitle";
import DataContext from "../../store/DataContext";
import UIContext from "../../store/UIContext";
import { getDateKey } from "../../utils/getDateKey";

const CELL_SIZE = 50;

const styles = StyleSheet.create({
  days: tw(`flex-row items-center justify-end pr-3 border-b border-gray-300`),
  day: {
    ...tw(`items-center justify-center bg-white`),
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  today: tw(`bg-yellow-200`),
  dayText: tw(`text-gray-500 text-xs uppercase`),
  dateText: tw(``),

  trackerRow: tw(`flex-row items-stretch border-b border-gray-300 pr-3`),
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

  valueBall: tw(`items-center justify-center w-10 h-10 rounded-full`),
  valueEmpty: tw(`bg-white border border-gray-400`),
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
 * Render the value of an entry in the table
 */
const renderVal = ({ entry, tracker }) => {
  const empty = (
    <View style={[styles.valueBall, styles.valueEmpty]}>
      <Icon size={18} color="gray-400" name="add" />
    </View>
  );
  if (!entry || !tracker || entry.value === "") return empty;

  // Numbers
  if (["number", "slider"].includes(tracker.type)) {
    const fontSize = (0.85 - entry.value.length * 0.07) * 20;
    return (
      <View style={[styles.valueBall, { backgroundColor: col(tracker.color) }]}>
        <T style={{ color: "white", fontSize }}>{entry.value}</T>
      </View>
    );

    // Booleans
  } else if (tracker.type === "boolean") {
    return (
      <View
        style={[
          styles.valueBall,
          {
            backgroundColor:
              entry.value === "true" ? col(tracker.color) : col("gray-400"),
          },
        ]}
      >
        <Icon
          color="white"
          name={entry.value === "true" ? "check" : "close"}
          size={18}
        />
      </View>
    );
    // Text
  } else if (tracker.type === "text" && entry.value) {
    return (
      <View style={[styles.valueBall, { backgroundColor: col(tracker.color) }]}>
        <Icon color="white" name="short-text" />
      </View>
    );
  } else {
    return empty;
  }
};

/**
 * Main table of tracker entries
 */

const TrackerTable = ({ date }) => {
  const { screenWidth } = useContext(UIContext);

  const numberOfDays = Math.floor((screenWidth - 160) / CELL_SIZE);
  const navigation = useNavigation();
  const dates = prepareDates(numberOfDays, date);
  const { trackers, getEntry, setEntry } = useContext(DataContext);

  return (
    <>
      <View style={styles.days}>
        {dates.map(({ date }, i) => (
          <View key={i} style={[styles.day, isToday(date) && styles.today]}>
            <T style={styles.dayText}>{format(date, "eee")}</T>
            <T style={styles.dateText}>{format(date, "d")}</T>
          </View>
        ))}
      </View>

      {trackers.map((tracker) => (
        <View key={tracker.id} style={styles.trackerRow}>
          <View style={styles.trackerLabelContainer}>
            <TouchableOpacity
              style={styles.trackerLabelButton}
              onPress={() => {
                navigation.navigate("TrackerView", { trackerId: tracker.id });
              }}
            >
              <TrackerTitle sm tracker={tracker} />
            </TouchableOpacity>
          </View>

          {dates.map(({ date, dateKey }) => {
            const entry = getEntry({ trackerId: tracker.id, dateKey });
            return (
              <TouchableOpacity
                key={dateKey}
                style={[styles.entryContainer, isToday(date) && styles.today]}
                onPress={() => {
                  if (tracker.type === "boolean") {
                    const entry = getEntry({ trackerId: tracker.id, dateKey });
                    setEntry(
                      tracker,
                      dateKey,
                      entry?.value === "true" ? "false" : "true"
                    );
                  } else {
                    navigation.navigate("EnterSingle", {
                      trackerId: tracker.id,
                      dateKey,
                    });
                  }
                }}
              >
                {renderVal({ entry, tracker })}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </>
  );
};

export default TrackerTable;
