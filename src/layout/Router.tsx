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
import ChooseTracker from "../views/ChooseTracker";

export type StackParamList = {
  Home: { date: string };
  EditTrackers: undefined;
  CustomTracker: { trackerId?: string; back?: string };
  TrackerView: {
    trackerId1: string | undefined;
    trackerId2: string | undefined;
  };
  AddTracker: undefined;
  EditTracker: { trackerId: string };
  EnterAll: undefined;
  EnterSingle: { trackerId: string; dateKey: string };
  ChooseDate: { current: string; page: string };
  ChooseTracker: {
    trackerId1: string;
    trackerId2: string;
    choosingFirst: boolean;
  };
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
        initialParams={{ trackerId1: undefined, trackerId2: undefined }}
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
      <Stack.Screen name="ChooseTracker" component={ChooseTracker} />
    </Stack.Navigator>
  );
};

export default Router;
