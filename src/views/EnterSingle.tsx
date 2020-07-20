import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { col } from "../base/colors";
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
        <Box
          h4
          row
          itemsCenter
          justifyCenter
          style={{
            backgroundColor: col("gray-2"),
            borderBottomColor: col("gray-4"),
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <IconButton name="keyboard-arrow-left" color={col("gray-5")} />
          <T sm>Jun 30 2020</T>
          <IconButton name="keyboard-arrow-right" color={col("gray-5")} />
        </Box>
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
