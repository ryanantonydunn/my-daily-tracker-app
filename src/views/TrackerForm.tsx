import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useContext, useMemo, useState } from "react";
import DataContext, {
  emptySlider,
  emptyTracker,
  Tracker,
} from "../store/DataContext";
import Box from "../layout/Box";

const Stack = createStackNavigator();

const TrackerForm = ({ navigation, route }) => {
  const { getTracker, addTracker, editTracker } = useContext(DataContext);
  const { name, params } = route;

  const [tracker, setTracker] = useState<Tracker>(() =>
    name === "EditTracker" ? getTracker(params.trackerId) : emptyTracker()
  );

  const save = (newTracker = tracker) => {
    if (name === "EditTracker") {
      editTracker(newTracker);
      navigation.navigate("TrackerView", { trackerId: params.trackerId });
    } else {
      addTracker(newTracker);
      navigation.navigate("Home");
    }
  };

  const SetType = useMemo(
    () => () => (
      <Box />
      // <FormField
      //   title="New Tracker Type"
      //   type="trackerType"
      //   onSave={(type) => {
      //     setTracker((d) => ({ ...d, type }));
      //     navigation.navigate("TrackerLabel");
      //   }}
      // />
    ),
    [setTracker]
  );

  const SetLabel = useMemo(
    () => () => (
      <Box />
      // <FormField
      //   title="Tracker Label"
      //   type="textSingleLine"
      //   value={tracker.label}
      //   onSave={(label) => {
      //     if (tracker.type === "slider") {
      //       setTracker({ ...tracker, label });
      //       navigation.navigate("TrackerSlider");
      //     } else {
      //       save({ ...tracker, label });
      //     }
      //   }}
      // />
    ),
    [setTracker, tracker]
  );

  const SetSlider = useMemo(
    () => () => (
      <Box />
      // <FormField
      //   title="Slider values"
      //   type="sliderValues"
      //   value={tracker.slider || emptySlider()}
      //   onSave={(slider) => {
      //     save({ ...tracker, slider });
      //   }}
      // />
    ),
    [tracker]
  );

  return (
    <Box>
      {/* <FormContainer closeTo="Home"> */}
      <Stack.Navigator
        keyboardHandlingEnabled={false}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {name !== "EditTracker" && (
          <Stack.Screen name="TrackerType" component={SetType} />
        )}
        <Stack.Screen name="TrackerLabel" component={SetLabel} />
        <Stack.Screen name="TrackerSlider" component={SetSlider} />
      </Stack.Navigator>
      {/* </FormContainer> */}
    </Box>
  );
};

export default TrackerForm;
