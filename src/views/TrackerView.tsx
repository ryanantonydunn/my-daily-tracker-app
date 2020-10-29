import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ConfirmDelete from "../base/ConfirmDelete";
import DateShifter from "../base/DateShifter";
import TrackerViewGraph from "./TrackerViewGraph";
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
  scroll: tw(`flex-grow bg-white`),
  title: tw(`flex-row items-center justify-center mt-4 mb-4`),
  btnRow: tw(`bg-gray-100 border-b border-gray-400 flex-row`),
  btnFill: tw(`flex-1`),
  btnBorder: tw(`border-r border-gray-400`),
  btnInner: tw(`h-12 pl-4 pr-4 items-center justify-center`),
  btnActive: tw(`bg-white`),
});

const TrackerView = ({ route, navigation }) => {
  const { trackerId1, trackerId2 } = route.params;
  const { getTracker, deleteTracker } = useContext(DataContext);
  const { setModal } = useContext(UIContext);
  const tracker1 = getTracker(trackerId1);
  const tracker2 = getTracker(trackerId2);
  const isCompare = !!tracker2;

  const [type, setType] = useState<"day" | "week" | "month">("week");
  const current = new Date();
  const [activeDate, setActiveDate] = useState(current);

  const chooseTracker = useCallback(
    (first = false) => {
      navigation.navigate("ChooseTracker", {
        trackerId1,
        trackerId2,
        choosingFirst: first,
      });
    },
    [trackerId1, trackerId2]
  );

  return (
    <LayoutWithHeader
      title={isCompare ? "Compare Trackers" : "View Tracker"}
      back="Home"
      menu={
        !isCompare && [
          {
            onPress: () =>
              navigation.navigate("CustomTracker", {
                trackerId: trackerId1,
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
                    deleteTracker(tracker1.id);
                    navigation.navigate("Home");
                  }}
                />
              ),
            children: "Delete",
          },
        ]
      }
    >
      {!!tracker1 && (
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={tw(`flex-1`)}>
            <SafeView left right style={styles.btnRow}>
              <View style={[styles.btnFill, isCompare && styles.btnBorder]}>
                <TouchableOpacity
                  style={styles.btnInner}
                  onPress={() => chooseTracker(true)}
                >
                  <TrackerTitle sm tracker={tracker1} />
                </TouchableOpacity>
              </View>
              {isCompare && (
                <>
                  <View style={[styles.btnBorder, styles.btnInner]}>
                    <Icon name="keyboard-arrow-right" />
                  </View>
                  <View style={styles.btnFill}>
                    <TouchableOpacity
                      style={styles.btnInner}
                      onPress={() => chooseTracker(false)}
                    >
                      <TrackerTitle sm tracker={tracker2} />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </SafeView>

            <SafeView left right style={styles.btnRow}>
              <View
                style={[styles.btnBorder, type === "day" && styles.btnActive]}
              >
                <TouchableOpacity
                  style={styles.btnInner}
                  onPress={() => setType("day")}
                >
                  <T bold={type === "day"} style={tw(`text-sm`)}>
                    Day
                  </T>
                </TouchableOpacity>
              </View>
              <View
                style={[styles.btnBorder, type === "week" && styles.btnActive]}
              >
                <TouchableOpacity
                  style={styles.btnInner}
                  onPress={() => setType("week")}
                >
                  <T bold={type === "week"} style={tw(`text-sm`)}>
                    Week
                  </T>
                </TouchableOpacity>
              </View>
              <View
                style={[styles.btnBorder, type === "month" && styles.btnActive]}
              >
                <TouchableOpacity
                  style={styles.btnInner}
                  onPress={() => setType("month")}
                >
                  <T bold={type === "month"} style={tw(`text-sm`)}>
                    Month
                  </T>
                </TouchableOpacity>
              </View>
              <View style={styles.btnFill}>
                <DateShifter
                  value={activeDate}
                  onChange={(d) => setActiveDate(d)}
                  type={type === "day" ? "month" : "year"}
                />
              </View>
            </SafeView>

            <SafeView left right style={tw(`mt-4 items-center justify-center`)}>
              <TrackerViewGraph
                trackerId1={trackerId1}
                trackerId2={trackerId2}
                date={activeDate}
                type={type}
              />
            </SafeView>
          </View>
          {(!trackerId1 || !trackerId2) && (
            <SafeView left right style={tw(`bg-white`)}>
              <View style={tw(`p-2`)}>
                <LargeButton
                  title="Compare"
                  onPress={() => chooseTracker(false)}
                />
              </View>
            </SafeView>
          )}
        </ScrollView>
      )}
      <SafeView bottom />
    </LayoutWithHeader>
  );
};

export default TrackerView;
