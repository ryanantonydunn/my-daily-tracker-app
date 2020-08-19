import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "../base/Icon";
import { col, tw } from "../base/styles/tailwind";
import T, { textStyles } from "../base/Text";
import { trackerTypes } from "../base/TrackerTitle";
import FixedHeight from "../layout/FixedHeight";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import SafeView from "../layout/SafeView";
import DataContext, { newTracker } from "../store/DataContext";

const styles = StyleSheet.create({
  scroll: tw(`flex-grow bg-white`),
  titleBlock: tw(`p-4 border-b border-gray-300`),
  titleText: tw(`text-center text-xl text-teal-500`),
  center: tw(`flex-1 items-center justify-center`),
  input: {
    ...tw(`text-center p-4`),
    ...textStyles.base,
  },
  full: tw(`flex-1`),
  roundButton: tw(`
    w-28 h-28 m-2
    rounded-full border border-gray-400
    flex items-center justify-center
  `),
  buttons: tw(`w-64 flex flex-row flex-wrap items-center justify-center`),
  colorButton: tw(`
    w-14 h-14 m-2
    rounded-full border border-gray-400
    flex items-center justify-center
  `),
  colorButtonCurrent: tw(`border-gray-900`),
  colorButtonInner: tw(`w-12 h-12 rounded-full`),
});

const colors = [
  "red-500",
  "orange-500",
  "yellow-600",
  "green-500",
  "teal-500",
  "blue-500",
  "indigo-500",
  "purple-500",
  "pink-500",
  "gray-400",
  "gray-600",
  "gray-800",
];

const Stack = createStackNavigator();

const Page = ({ children, title, hasKeyboard = false }) => (
  <FixedHeight enabled={!hasKeyboard}>
    <ScrollView contentContainerStyle={styles.scroll}>
      <SafeView left right style={styles.titleBlock}>
        <T style={styles.titleText}>{title}</T>
      </SafeView>
      <View style={!hasKeyboard && styles.center}>{children}</View>
    </ScrollView>
  </FixedHeight>
);

const CustomTracker = ({ route, navigation }) => {
  const { trackerId, back } = route.params;
  const { setTracker, getTracker } = useContext(DataContext);
  const tracker = getTracker(trackerId);

  const isEditing = !!tracker;

  const [label, setLabel] = useState(tracker?.label || "");
  const [type, setType] = useState(tracker?.type || "");
  const [color, setColor] = useState(tracker?.color || "");

  const save = (color) => {
    const existingTracker = tracker || newTracker();
    setTracker({ ...existingTracker, label, type, color });
    navigation.navigate(
      back,
      back === "TrackerView" && { trackerId: existingTracker.id }
    );
  };

  return (
    <LayoutWithHeader title="Custom Tracker" back>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="CustomTrackerLabel">
          {() => (
            <Page hasKeyboard title="Give your tracker a name">
              <TextInput
                autoFocus
                blurOnSubmit={false}
                value={label}
                onChangeText={(str) => setLabel(str.substring(0, 2000))}
                style={styles.input}
                placeholder="Enter name..."
                onSubmitEditing={() => {
                  navigation.navigate(
                    isEditing ? "CustomTrackerColor" : "CustomTrackerType"
                  );
                }}
              />
            </Page>
          )}
        </Stack.Screen>
        <Stack.Screen name="CustomTrackerType">
          {() => (
            <Page title="What kind of tracker?">
              <View style={styles.buttons}>
                {trackerTypes.map(({ title, icon, value }) => (
                  <TouchableOpacity
                    key={value}
                    style={styles.roundButton}
                    onPress={() => {
                      setType(value);
                      navigation.navigate("CustomTrackerColor");
                    }}
                  >
                    <Icon name={icon} color="gray-500" />
                    <T style={tw(`mt-1`)}>{title}</T>
                  </TouchableOpacity>
                ))}
              </View>
            </Page>
          )}
        </Stack.Screen>
        <Stack.Screen name="CustomTrackerColor">
          {() => (
            <Page title="Highlight color">
              <View style={styles.buttons}>
                {colors.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.colorButton,
                      color === c && styles.colorButtonCurrent,
                    ]}
                    onPress={() => {
                      save(c);
                    }}
                  >
                    <View
                      style={[
                        styles.colorButtonInner,
                        { backgroundColor: col(c) },
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </Page>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </LayoutWithHeader>
  );
};

export default CustomTracker;
