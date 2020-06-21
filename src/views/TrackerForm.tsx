import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gray_400, gray_500 } from "../base/colors";
import Icon from "../base/Icon";
import { CloseButton, ConfirmButton } from "../base/IconButton";
import T, { H2 } from "../base/Text";
import Box from "../layout/Box";
import LayoutForm, { FormContent, FormContainer } from "../layout/LayoutForm";
import { emptyTracker, Tracker } from "../store/TrackerContext";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    marginLeft: "auto",
    marginRight: "auto",
  },
  typeButton: {
    width: 120,
    height: 120,
    margin: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray_400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99999,
  },
});

const trackerTypes = [
  { title: "Checkbox", icon: "check", value: "boolean" },
  { title: "Slider", icon: "linear-scale", value: "slider" },
  { title: "Text", icon: "short-text", value: "text" },
  { title: "Number", icon: "all-inclusive", value: "number" },
];

const TrackerFormPage = ({ children }: { children: ReactNode }) => (
  <FormContainer>
    <FormContent>{children}</FormContent>
    <Box h2 />
  </FormContainer>
);

const TrackerForm = ({ navigation }) => {
  const [newTracker, setNewTracker] = useState<Tracker>(emptyTracker());

  const setValue = useCallback((values) => {
    setNewTracker((d) => ({ ...d, ...values }));
  }, []);

  const save = () => {
    navigation.navigate("Home");
  };

  const SetType = useMemo(
    () => () => (
      <TrackerFormPage>
        <H2>New Tracker Type</H2>
        <Box h2 />
        <View style={styles.typeContainer}>
          {trackerTypes.map(({ title, icon, value }) => (
            <TouchableOpacity
              key={value}
              onPress={() => {
                setValue({ type: value });
                navigation.navigate("TrackerLabel");
              }}
              style={styles.typeButton}
            >
              <Icon name={icon} size={30} color={gray_500} />
              <Box h1 />
              <T sm>{title}</T>
            </TouchableOpacity>
          ))}
        </View>
      </TrackerFormPage>
    ),
    [setValue]
  );

  const SetLabel = useMemo(
    () => () => (
      <TrackerFormPage>
        <H2>Tracker label</H2>
        <Box h2 />
        <T>Typy boi</T>
        <Box h2 />
        <ConfirmButton
          onPress={() =>
            newTracker.type === "slider"
              ? navigation.navigate("TrackerSlider")
              : save()
          }
        />
      </TrackerFormPage>
    ),
    [setValue, newTracker.type]
  );

  const SetSlider = useMemo(
    () => () => (
      <TrackerFormPage>
        <H2>Slider Values</H2>
        <Box h2 />
        <T>Slidy boi</T>
        <Box h2 />
        <ConfirmButton onPress={save} />
      </TrackerFormPage>
    ),
    [setValue, newTracker.type]
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
        <Stack.Screen name="TrackerType" component={SetType} />
        <Stack.Screen name="TrackerLabel" component={SetLabel} />
        <Stack.Screen name="TrackerSlider" component={SetSlider} />
      </Stack.Navigator>
    </LayoutForm>
  );
};

export default TrackerForm;
