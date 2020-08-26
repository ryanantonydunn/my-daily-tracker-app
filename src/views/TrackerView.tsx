import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ConfirmDelete from "../base/ConfirmDelete";
import T from "../base/Text";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import DataContext from "../store/DataContext";
import UIContext from "../store/UIContext";

const TrackerView = ({ route, navigation }) => {
  const { trackerId } = route.params;
  const { getTracker, deleteTracker } = useContext(DataContext);
  const { setModal } = useContext(UIContext);
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
          onPress: () =>
            setModal(
              <ConfirmDelete
                cancel={() => setModal()}
                confirm={() => {
                  deleteTracker(tracker.id);
                  navigation.navigate("Home");
                }}
              />
            ),
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
