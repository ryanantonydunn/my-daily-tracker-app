import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DataContext from "../store/DataContext";
import { useNavigation } from "@react-navigation/native";
import { tw, col } from "./styles/tailwind";
import Icon from "./Icon";
import T from "./Text";

interface EntryBallProps {
  trackerId: string;
  dateKey: string;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  valueBall: tw(`items-center justify-center w-10 h-10 rounded-full`),
  valueEmpty: tw(`bg-white border border-gray-400`),
  disabled: tw(`bg-gray-200`),
});

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

const EntryBall = ({ trackerId, dateKey, disabled }: EntryBallProps) => {
  const navigation = useNavigation();
  const { getEntry, getTracker, setEntry } = useContext(DataContext);
  const entry = getEntry({ trackerId, dateKey });
  const tracker = getTracker(trackerId);
  return disabled ? (
    <View style={[styles.valueBall, styles.disabled]} />
  ) : (
    <TouchableOpacity
      key={dateKey}
      onPress={() => {
        if (tracker.type === "boolean") {
          const entry = getEntry({
            trackerId: tracker.id,
            dateKey,
          });
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
};

export default EntryBall;
