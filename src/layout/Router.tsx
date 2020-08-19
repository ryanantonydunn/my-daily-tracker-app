import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import ChooseDate from "../views/ChooseDate";
import EnterAll from "../views/EnterAll";
import EnterSingle from "../views/EnterSingle";
import Home from "../views/Home";
import TrackerView from "../views/TrackerView";
import EditTrackers from "../views/EditTrackers";
import CustomTracker from "../views/CustomTracker";

export type StackParamList = {
  Home: { date: string };
  EditTrackers: undefined;
  CustomTracker: { trackerId?: string; back?: string };
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
      <Stack.Screen name="EditTrackers" component={EditTrackers} />
      <Stack.Screen
        name="CustomTracker"
        component={CustomTracker}
        initialParams={{ trackerId: null, back: "EditTrackers" }}
      />
      <Stack.Screen name="EnterAll" component={EnterAll} />
      <Stack.Screen name="EnterSingle" component={EnterSingle} />
      <Stack.Screen name="ChooseDate" component={ChooseDate} />
    </Stack.Navigator>
  );
};

export default Router;
