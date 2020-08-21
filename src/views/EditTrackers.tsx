import React, { Fragment, useContext, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ConfirmDelete from "../base/ConfirmDelete";
import Icon from "../base/Icon";
import LargeButton from "../base/LargeButton";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";
import TrackerTitle from "../base/TrackerTitle";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import SafeView from "../layout/SafeView";
import DataContext from "../store/DataContext";
import UIContext from "../store/UIContext";

const styles = StyleSheet.create({
  scroll: tw(`flex-grow justify-between bg-white`),
  title: tw(`text-center text-xl text-teal-500`),
  block: tw(`p-4 border-b border-gray-300`),
  blockTitle: tw(`p-2 bg-gray-200`),
  subTitle: tw(`text-center text-sm`),
  buttonRow: tw(`flex-row items-center border-b border-gray-300`),
  buttonTitle: tw(`flex-1`),
  buttonTitleInner: tw(`flex-row justify-between p-3`),
  buttonCell: tw(`border-l border-gray-400`),
  buttonCellInner: tw(`items-center justify-center p-3`),
  checkbox: tw(`
    w-6 h-6 border border-gray-500 rounded-md
    flex items-center justify-center
  `),
  newTracker: tw(`flex-row items-center justify-center p-8`),
  newTrackerText: tw(`ml-2 text-sm text-center`),
});

const EditTrackers = ({ navigation }) => {
  const { setModal } = useContext(UIContext);
  const [actionButtonTrackerId, setActionButtonTrackerId] = useState("");

  const { groups, trackers, editTracker, deleteTracker } = useContext(
    DataContext
  );
  const toggle = (tracker) => {
    setActionButtonTrackerId("");
    editTracker({ ...tracker, disabled: !tracker.disabled });
  };
  return (
    <LayoutWithHeader title="Edit Trackers" back="Home">
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <SafeView left right style={styles.block}>
            <T style={styles.title}>What do you want to track?</T>
          </SafeView>
          {groups.map((group) => (
            <Fragment key={group.id}>
              <SafeView left right style={styles.blockTitle}>
                <T bold style={styles.subTitle}>
                  {group.label}
                </T>
              </SafeView>
              {trackers
                .filter((t) => t.group === group.id)
                .map((tracker) => (
                  <SafeView
                    key={tracker.id}
                    left
                    right
                    style={styles.buttonRow}
                  >
                    {actionButtonTrackerId === tracker.id ? (
                      <>
                        <View style={styles.buttonTitle}>
                          <TouchableOpacity
                            style={styles.buttonTitleInner}
                            onPress={() => setActionButtonTrackerId("")}
                          >
                            <TrackerTitle sm tracker={tracker} />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonCell}>
                          <TouchableOpacity
                            style={styles.buttonCellInner}
                            onPress={() => {
                              navigation.navigate("CustomTracker", {
                                trackerId: tracker.id,
                              });
                            }}
                          >
                            <Icon name="edit" color="gray-500" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonCell}>
                          <TouchableOpacity
                            style={styles.buttonCellInner}
                            onPress={() =>
                              setModal(
                                <ConfirmDelete
                                  cancel={() => setModal()}
                                  confirm={() => deleteTracker(tracker.id)}
                                />
                              )
                            }
                          >
                            <Icon name="delete" color="red-400" />
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <View style={styles.buttonTitle}>
                        <TouchableOpacity
                          style={styles.buttonTitleInner}
                          onPress={() => toggle(tracker)}
                          onLongPress={() =>
                            setActionButtonTrackerId(tracker.id)
                          }
                        >
                          <TrackerTitle sm tracker={tracker} />
                          <View style={styles.checkbox}>
                            {!tracker.disabled && (
                              <Icon name="check" color="green-500" />
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </SafeView>
                ))}
            </Fragment>
          ))}
          <TouchableOpacity
            style={styles.newTracker}
            onPress={() => navigation.navigate("CustomTracker")}
          >
            <Icon name="playlist-add" color="green-500" />
            <T style={styles.newTrackerText}>Create custom tracker</T>
          </TouchableOpacity>
        </View>
        <SafeView left right>
          <View style={tw(`p-2`)}>
            <LargeButton
              onPress={() => {
                navigation.navigate("Home", {
                  date: new Date().toISOString(),
                });
              }}
              title="Done"
            />
          </View>
        </SafeView>
      </ScrollView>
      <SafeView bottom />
    </LayoutWithHeader>
  );
};

export default EditTrackers;
