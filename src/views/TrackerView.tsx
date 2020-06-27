import React, { useContext } from "react";
import T, { H1 } from "../base/Text";
import Box from "../layout/Box";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import { ScrollView } from "react-native-gesture-handler";
import DataContext from "../store/DataContext";

const TrackerView = ({ route, navigation }) => {
  const { trackerId } = route.params;
  const { getTracker } = useContext(DataContext);
  const tracker = getTracker(trackerId);

  const title = tracker?.label || "Unknown Tracker";

  return (
    <LayoutWithHeader
      back
      title={<H1>{title}</H1>}
      menu={[
        {
          onPress: () => navigation.navigate("EditTracker", { trackerId }),
          children: "Edit Tracker",
        },
      ]}
    >
      {!!tracker && (
        <Box component={ScrollView} p1>
          <T>{trackerId}</T>
          <Box h2 />
        </Box>
      )}
    </LayoutWithHeader>
  );
};

export default TrackerView;
