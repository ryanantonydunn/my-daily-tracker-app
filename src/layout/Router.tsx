import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import ChooseDate from "../views/ChooseDate";
import EnterAll from "../views/EnterAll";
import EnterSingle from "../views/EnterSingle";
import Home from "../views/home/Home";
import TrackerForm from "../views/TrackerForm";
import TrackerView from "../views/TrackerView";

export type StackParamList = {
  Home: { date: string };
  TrackerView: { trackerId: string };
  AddTracker: undefined;
  EditTracker: { trackerId: string };
  EnterAll: undefined;
  EnterSingle: { trackerId: string; dateKey: string };
  ChooseDate: { current: string; page: string };
};

const Stack = createStackNavigator<StackParamList>();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{ date: new Date().toISOString() }}
      />
      <Stack.Screen
        name="TrackerView"
        component={TrackerView}
        initialParams={{ trackerId: null }}
      />
      <Stack.Screen name="AddTracker" component={TrackerForm} />
      <Stack.Screen
        name="EditTracker"
        component={TrackerForm}
        initialParams={{ trackerId: null }}
      />
      <Stack.Screen name="EnterAll" component={EnterAll} />
      <Stack.Screen name="EnterSingle" component={EnterSingle} />
      <Stack.Screen name="ChooseDate" component={ChooseDate} />
    </Stack.Navigator>
  );
};

export default Router;
