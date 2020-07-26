import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { col } from "../base/colors";
import DayShifter from "../base/DayShifter";
import IconButton from "../base/IconButton";
import T, { H1 } from "../base/Text";
import Box from "../layout/Box";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import DataContext from "../store/DataContext";
import { getDateFromKey, getDateKey } from "../utils/getDateKey";
import { getTrackerComponent } from "./forms/FormField";

const EnterSingle = ({ route, navigation }) => {
  const { trackerId, dateKey: paramDateKey } = route.params;
  const { getTracker, addEntry, editEntry, getEntry } = useContext(DataContext);
  const [date, setDate] = useState(getDateFromKey(paramDateKey));
  const dateKey = getDateKey(date);
  const tracker = getTracker(trackerId);
  const entry = getEntry({ trackerId, dateKey });
  const value = entry?.value || "";

  const FormFieldComponent = getTrackerComponent(tracker.type);

  const hasKeyboard = ["number", "text"].includes(tracker.type);

  return (
    <LayoutWithHeader
      hasKeyboard={hasKeyboard}
      title={<H1>Make Entry</H1>}
      back="Home"
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <DayShifter value={date} onChange={setDate} page="EnterSingle" />
        <Box
          flex1
          itemsCenter
          justifyCenter
          style={{ backgroundColor: "white" }}
        >
          {!!tracker && (
            <FormFieldComponent
              title={tracker.label}
              highlight={tracker.color}
              value={value}
              onSave={(value) => {
                entry
                  ? editEntry({ ...entry, value })
                  : addEntry({
                      trackerId: tracker.id,
                      dateKey,
                      id: "",
                      value,
                    });
                navigation.navigate("Home");
              }}
            />
          )}
        </Box>
      </ScrollView>
    </LayoutWithHeader>
  );
};

export default EnterSingle;
