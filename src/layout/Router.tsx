import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Home from "../views/Home";
import Sandbox from "../views/Sandbox";
import TrackerView from "../views/TrackerView";
import TrackerForm from "../views/TrackerForm";
import EnterAll from "../views/EnterAll";

const Stack = createStackNavigator();

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
      <Stack.Screen name="TrackerView" component={TrackerView} />
      <Stack.Screen name="TrackerForm" component={TrackerForm} />
      <Stack.Screen name="EnterAll" component={EnterAll} />
    </Stack.Navigator>
  );
};

export default Router;
