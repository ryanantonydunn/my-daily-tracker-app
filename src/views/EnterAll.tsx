import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { green, white } from "../base/colors";
import DayShifter from "../base/DayShifter";
import IconButton from "../base/IconButton";
import T from "../base/Text";
import Box from "../layout/Box";
import DataContext from "../store/DataContext";
import { getDateKey } from "../utils/getDateKey";
import FormContainer from "./forms/FormContainer";
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
    <FormContainer
      closeTo="Home"
      topLeft={
        <DayShifter value={date} onChange={(newDate) => setDate(newDate)} />
      }
    >
      {!!trackers.length ? (
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
      ) : (
        <Box flex1 itemsCenter justifyCenter>
          <TouchableOpacity onPress={() => navigation.navigate("AddTracker")}>
            <Box itemsCenter>
              <IconButton
                lg
                name="playlist-add"
                bgColor={green}
                color={white}
              />
              <Box h2 />
              <T bold center>
                Set up your first tracker!
              </T>
            </Box>
          </TouchableOpacity>
        </Box>
      )}
    </FormContainer>
  );
};

export default EnterAll;
