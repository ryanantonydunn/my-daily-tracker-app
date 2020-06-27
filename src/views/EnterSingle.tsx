import React, { useContext, useState } from "react";
import DayShifter from "../base/DayShifter";
import DataContext from "../store/DataContext";
import { getDateFromKey, getDateKey } from "../utils/getDateKey";
import FormContainer from "./forms/FormContainer";
import FormField from "./forms/FormField";

const EnterSingle = ({ route, navigation }) => {
  const { trackerId, dateKey: paramDateKey } = route.params;
  const { getTracker, addEntry, editEntry, getEntry } = useContext(DataContext);
  const [date, setDate] = useState(getDateFromKey(paramDateKey));
  const dateKey = getDateKey(date);
  const tracker = getTracker(trackerId);
  const entry = getEntry(trackerId, dateKey);
  const value = entry?.value || "";

  return (
    <FormContainer
      closeTo="Home"
      topLeft={
        <DayShifter value={date} onChange={(newDate) => setDate(newDate)} />
      }
    >
      {!!tracker && (
        <FormField
          type={tracker.type}
          title={tracker.label}
          onSave={(value) => {
            entry
              ? editEntry({ ...entry, value })
              : addEntry({ trackerId: tracker.id, dateKey, id: "", value });
            navigation.navigate("Home");
          }}
          value={value}
          slider={tracker.slider}
        />
      )}
    </FormContainer>
  );
};

export default EnterSingle;
