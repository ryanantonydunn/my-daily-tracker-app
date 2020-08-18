import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import T from "../base/Text";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import DataContext from "../store/DataContext";

const TrackerView = ({ route, navigation }) => {
  const { trackerId } = route.params;
  const { getTracker } = useContext(DataContext);
  const tracker = getTracker(trackerId);

  const title = tracker?.label || "Unknown Tracker";

  return (
    <LayoutWithHeader
      title={title}
      back="Home"
      menu={[
        {
          onPress: () =>
            navigation.navigate("CustomTracker", {
              trackerId: tracker?.id,
              back: "TrackerView",
            }),
          children: "Edit",
        },
        {
          onPress: () => {},
          children: "Delete",
        },
      ]}
    >
      {!!tracker && (
        <ScrollView>
          <T>{trackerId}</T>
        </ScrollView>
      )}
    </LayoutWithHeader>
  );
};

export default TrackerView;
