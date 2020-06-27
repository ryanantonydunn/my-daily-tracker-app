import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useCallback, useContext, useMemo, useState } from "react";
import DayShifter from "../base/DayShifter";
import { CloseButton } from "../base/IconButton";
import Box from "../layout/Box";
import LayoutForm from "../layout/LayoutForm";
import DataContext from "../store/DataContext";
import { getDateKey } from "../utils/getDateKey";
import FormField from "./forms/FormField";

const Stack = createStackNavigator();

const EnterAll = ({ navigation }) => {
  const { trackers = [], addEntry, editEntry, getEntry } = useContext(
    DataContext
  );
  const [date, setDate] = useState(new Date());
  const dateKey = getDateKey(date);

  const next = useCallback((i: number) => {
    if (i === trackers.length - 1) {
      navigation.navigate("Home");
    } else {
      navigation.navigate(`EnterAll${i + 1}`);
    }
  }, []);

  const screens = useMemo(
    () =>
      trackers.map((tracker, i) => {
        const entry = getEntry(tracker.id, dateKey);
        return () => (
          <FormField
            type={tracker.type}
            title={tracker.label}
            onSkip={() => next(i)}
            onSave={(value) => {
              entry
                ? editEntry({ ...entry, value })
                : addEntry({ trackerId: tracker.id, dateKey, id: "", value });
              next(i);
            }}
            value={entry?.value || ""}
            slider={tracker.slider}
          />
        );
      }),
    [trackers, next, dateKey]
  );

  return (
    <LayoutForm>
      <Box row itemsCenter justifyBetween>
        <Box w5 />
        <DayShifter value={date} onChange={(newDate) => setDate(newDate)} />
        <Box w5 itemsCenter justifyCenter>
          <CloseButton to="Home" />
        </Box>
      </Box>
      {!!trackers.length && (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          {screens.map((Component, i) => (
            <Stack.Screen key={i} name={`EnterAll${i}`} component={Component} />
          ))}
        </Stack.Navigator>
      )}
    </LayoutForm>
  );
};

export default EnterAll;
