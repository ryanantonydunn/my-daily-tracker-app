import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import EnterAll from "../views/EnterAll";
import Home from "../views/home/Home";
import Sandbox from "../views/Sandbox";
import TrackerForm from "../views/TrackerForm";
import TrackerView from "../views/TrackerView";
import EnterSingle from "../views/EnterSingle";

export type StackParamList = {
  Home: undefined;
  Sandbox: undefined;
  TrackerView: { trackerId: string };
  AddTracker: undefined;
  EditTracker: { trackerId: string };
  EnterAll: undefined;
  EnterSingle: { trackerId: string; dateKey: string };
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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Sandbox" component={Sandbox} />
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
    </Stack.Navigator>
  );
};

export default Router;
