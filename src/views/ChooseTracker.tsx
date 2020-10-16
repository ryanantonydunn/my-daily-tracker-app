import React, { Fragment, useCallback, useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../base/Icon";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";
import TrackerTitle from "../base/TrackerTitle";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import SafeView from "../layout/SafeView";
import DataContext from "../store/DataContext";

const styles = StyleSheet.create({
  scroll: tw(`flex-grow bg-white`),
  block: tw(`p-4 border-b border-gray-300`),
  container: tw(`flex-1`),
  blockTitle: tw(`p-2 bg-gray-200`),
  subTitle: tw(`text-center text-sm`),
  item: tw(`border-b border-gray-300`),
  itemInner: tw(`p-3`),
  itemInnerDisabled: tw(`bg-gray-100`),
  itemInnerCurrent: tw(`bg-yellow-200`),
  newTracker: tw(`flex-row items-center justify-center p-8`),
  newTrackerText: tw(`ml-2 text-sm text-center`),
});

const ChooseTracker = ({ route, navigation }) => {
  const { trackerId1, trackerId2, choosingFirst } = route.params;
  const { groups, trackers } = useContext(DataContext);

  const choose = useCallback(
    (id) => {
      const props = { trackerId1, trackerId2 };
      if (choosingFirst) {
        props.trackerId1 = id;
      } else {
        props.trackerId2 = id;
      }
      navigation.navigate("TrackerView", props);
    },
    [trackerId1, trackerId2]
  );

  const remove = useCallback(() => {
    const props = {
      trackerId1,
      trackerId2: undefined,
    };
    if (choosingFirst) {
      props.trackerId1 = trackerId2;
    }
    navigation.navigate("TrackerView", props);
  }, [trackerId1, trackerId2]);

  const isCurrent = useCallback(
    (tracker) => tracker.id === (choosingFirst ? trackerId1 : trackerId2),
    [trackerId1, trackerId2]
  );

  const availableTrackers = useMemo(() => {
    const filteredGroups = [];
    groups.forEach((group) => {
      const groupTrackers = trackers.filter(
        (t) =>
          t.group === group.id &&
          !t.disabled &&
          t.id !== (choosingFirst ? trackerId2 : trackerId1)
      );
      if (groupTrackers.length) {
        filteredGroups.push({
          group,
          trackers: groupTrackers,
        });
      }
    });
    return filteredGroups;
  }, []);

  return (
    <LayoutWithHeader title="Choose Tracker" back="TrackerView">
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          {availableTrackers.map((d) => (
            <Fragment key={d.group.id}>
              <SafeView left right style={styles.blockTitle}>
                <T bold style={styles.subTitle}>
                  {d.group.label}
                </T>
              </SafeView>
              {d.trackers.map((tracker) => (
                <SafeView key={tracker.id} left right style={styles.item}>
                  <TouchableOpacity
                    style={[
                      styles.itemInner,
                      isCurrent(tracker) && styles.itemInnerCurrent,
                    ]}
                    onPress={() => choose(tracker.id)}
                  >
                    <TrackerTitle sm tracker={tracker} />
                  </TouchableOpacity>
                </SafeView>
              ))}
            </Fragment>
          ))}
          {!!trackerId1 && !!trackerId2 && (
            <TouchableOpacity
              style={styles.newTracker}
              onPress={() => remove()}
            >
              <Icon name="cancel" color="red-500" />
              <T style={styles.newTrackerText}>Remove Comparison</T>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <SafeView bottom />
    </LayoutWithHeader>
  );
};

export default ChooseTracker;
