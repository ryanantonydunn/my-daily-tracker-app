import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { CloseButton } from "../base/IconButton";
import Box from "../layout/Box";
import LayoutForm from "../layout/LayoutForm";
import DataContext, {
  emptySlider,
  emptyTracker,
  Tracker,
} from "../store/DataContext";
import FormField from "./forms/FormField";

const Stack = createStackNavigator();

const TrackerForm = ({ navigation, route }) => {
  const { getTracker, addTracker, editTracker } = useContext(DataContext);
  const [tracker, setTracker] = useState<Tracker>(
    route === "EditTracker" ? getTracker() : emptyTracker()
  );

  const save = (directSave) => {
    if (route === "EditTracker") {
      editTracker(directSave || tracker);
    } else {
      addTracker(directSave || tracker);
    }
    navigation.navigate("Home");
  };

  const SetType = useMemo(
    () => () => (
      <FormField
        title="New Tracker Type"
        type="trackerType"
        onSave={(type) => {
          setTracker((d) => ({ ...d, type }));
          navigation.navigate("TrackerLabel");
        }}
      />
    ),
    [setTracker]
  );

  const SetLabel = useMemo(
    () => () => (
      <FormField
        title="Tracker Label"
        type="textSingleLine"
        value={tracker.label}
        onSave={(label) => {
          if (tracker.type === "slider") {
            setTracker({ ...tracker, label });
            navigation.navigate("TrackerSlider");
          } else {
            save({ ...tracker, label });
          }
        }}
      />
    ),
    [setTracker, tracker]
  );

  const SetSlider = useMemo(
    () => () => (
      <FormField
        title="Slider values"
        type="sliderValues"
        value={tracker.slider || emptySlider()}
        onSave={(slider) => {
          save({ ...tracker, slider });
        }}
      />
    ),
    [tracker]
  );

  return (
    <LayoutForm>
      <Box row itemsCenter justifyBetween>
        <Box />
        <Box w5 itemsCenter justifyCenter>
          <CloseButton to="Home" />
        </Box>
      </Box>
      <Stack.Navigator
        keyboardHandlingEnabled={false}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="TrackerType" component={SetType} />
        <Stack.Screen name="TrackerLabel" component={SetLabel} />
        <Stack.Screen name="TrackerSlider" component={SetSlider} />
      </Stack.Navigator>
    </LayoutForm>
  );
};

export default TrackerForm;
