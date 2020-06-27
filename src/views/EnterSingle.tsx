import React, { useContext, useState } from "react";
import DayShifter from "../base/DayShifter";
import { CloseButton } from "../base/IconButton";
import Box from "../layout/Box";
import LayoutForm from "../layout/LayoutForm";
import DataContext from "../store/DataContext";
import { getDateKey, getDateFromKey } from "../utils/getDateKey";
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
    <LayoutForm>
      <Box row itemsCenter justifyBetween>
        <Box w5 />
        <DayShifter value={date} onChange={(newDate) => setDate(newDate)} />
        <Box w5 itemsCenter justifyCenter>
          <CloseButton to="Home" />
        </Box>
      </Box>
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
    </LayoutForm>
  );
};

export default EnterSingle;
