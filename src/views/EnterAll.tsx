import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useCallback, useMemo, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DayShifter from "../base/DayShifter";
import { CloseButton } from "../base/IconButton";
import T from "../base/Text";
import Box from "../layout/Box";
import LayoutForm from "../layout/LayoutForm";
import DataContext from "../store/DataContext";

const styles = StyleSheet.create({
  skipButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  skipButton: {
    width: 80,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

const Stack = createStackNavigator();

const EnterAll = ({ navigation }) => {
  const { trackers = [], entries = [] } = useContext(DataContext);
  const [date, setDate] = useState(new Date());

  const next = useCallback((i: number) => {
    if (i === trackers.length - 1) {
      navigation.navigate("Home");
    } else {
      navigation.navigate(`EnterAll${i + 1}`);
    }
  }, []);

  const screens = useMemo(
    () =>
      trackers.map((tracker, i) => () => (
        <>
          <View style={styles.skipButtonContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={() => next(i)}>
              <T center light>
                Skip
              </T>
            </TouchableOpacity>
          </View>
        </>
      )),
    [next]
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
