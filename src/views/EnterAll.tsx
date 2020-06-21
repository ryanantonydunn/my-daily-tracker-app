import React, { useEffect, useMemo, useCallback } from "react";
import { View, Text, Button } from "react-native";
import IconButton, { CloseButton } from "../base/IconButton";
import { red } from "../base/colors";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { trackers } from "../store/TrackerContext";
import { H2 } from "../base/Text";
import EnterField from "./EnterField";
import LayoutForm, { FormContent, FormContainer } from "../layout/LayoutForm";
import Box from "../layout/Box";

const Stack = createStackNavigator();

const EnterAll = ({ navigation }) => {
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
        <FormContainer>
          <EnterField
            tracker={tracker}
            onSave={(newValue) => {
              // save
              console.log(newValue);
              next(i);
            }}
          />
          <Button onPress={() => next(i)} title="Skip" />
        </FormContainer>
      )),
    [next]
  );

  return (
    <LayoutForm>
      <Box row itemsCenter justifyBetween>
        <View />
        <CloseButton to="Home" />
      </Box>
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
    </LayoutForm>
  );
};

export default EnterAll;
