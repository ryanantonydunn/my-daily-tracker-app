import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import sub from "date-fns/sub";
import min from "date-fns/min";
import isToday from "date-fns/isToday";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeArea } from "react-native-safe-area-context";
import {
  gray_400,
  gray_500,
  gray_800,
  green,
  red,
  white,
  yellow,
} from "../../base/colors";
import Icon from "../../base/Icon";
import IconButton from "../../base/IconButton";
import T from "../../base/Text";
import Box from "../../layout/Box";
import DataContext from "../../store/DataContext";
import { getDateKey } from "../../utils/getDateKey";
import { trackerIcon } from "../../utils/trackerTypes";

const styles = StyleSheet.create({
  header: {
    backgroundColor: gray_800,
    // borderBottomColor: gray_400,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    paddingBottom: 10,
  },
  date: {
    width: 50,
  },
  row: {
    flexDirection: "row",
    backgroundColor: white,
    borderBottomColor: gray_400,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cell: {
    borderLeftColor: gray_400,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  trackerLabel: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  entry: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

const prepareDates = (n, date) =>
  Array.from({ length: n }).map((_, i) => {
    const d = new Date(date);
    d.setDate(d.getDate() - (n - 1 - i));
    return {
      date: d,
      dateKey: getDateKey(d),
    };
  });

const renderVal = ({ entry, tracker }) => {
  if (!entry || !tracker) return null;
  if (["number", "slider"].includes(tracker.type)) {
    return <T xs>{entry.value}</T>;
  } else if (tracker.type === "boolean") {
    if (entry.value === "true") {
      return <Icon color={green} name="check" />;
    } else {
      return <Icon color={red} name="close" />;
    }
  } else if (tracker.type === "text" && entry.value) {
    return <Icon color={green} name="short-text" />;
  }
};

const TrackerTable = () => {
  const numberOfDays = 4;
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const dates = prepareDates(numberOfDays, date);
  const { trackers, getEntry } = useContext(DataContext);

  const { left, right } = useSafeArea();
  const leftRightSafe = {
    paddingLeft: left,
    paddingRight: right,
  };

  return (
    <>
      <Box style={[styles.header, leftRightSafe]}>
        <Box flex1 row itemsCenter>
          <Box flex1 />
          <Box w5 itemsCenter justifyCenter>
            <IconButton
              name="keyboard-arrow-left"
              color={gray_500}
              onPress={() => setDate(sub(date, { days: numberOfDays }))}
            />
          </Box>
          {dates.map(({ date }, i) => (
            <Box key={i} itemsCenter justifyCenter style={styles.date}>
              <T sm style={{ color: gray_500 }}>
                {format(date, "eeeee")}
              </T>
              <T style={{ color: gray_400 }}>{format(date, "d")}</T>
              <T xs style={{ color: gray_500 }}>
                {format(date, "MMM")}
              </T>
            </Box>
          ))}
          <Box w5 itemsCenter justifyCenter>
            {!isToday(date) && (
              <IconButton
                name="keyboard-arrow-right"
                color={gray_500}
                onPress={() =>
                  setDate(min([new Date(), sub(date, { days: -numberOfDays })]))
                }
              />
            )}
          </Box>
        </Box>
      </Box>
      {trackers.map((tracker) => (
        <Box key={tracker.id} style={[styles.row, leftRightSafe]}>
          <Box flex1>
            <TouchableOpacity
              style={styles.trackerLabel}
              onPress={() => {
                navigation.navigate("TrackerView", { trackerId: tracker.id });
              }}
            >
              <Icon
                name={trackerIcon(tracker.type)}
                color={gray_400}
                size={18}
              />
              <Box w1 />
              <T sm>{tracker.label}</T>
            </TouchableOpacity>
          </Box>
          {dates.map(({ dateKey }) => {
            const entry = getEntry({ trackerId: tracker.id, dateKey });
            return (
              <Box key={dateKey} style={styles.cell}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EnterSingle", {
                      trackerId: tracker.id,
                      dateKey,
                    });
                  }}
                  style={styles.entry}
                >
                  {renderVal({ entry, tracker })}
                </TouchableOpacity>
              </Box>
            );
          })}
          <Box row w5 itemsCenter justifyCenter style={styles.cell}>
            {!!tracker.streak && (
              <>
                <Icon color={yellow} name="star" size={16} />
                <T xs style={{ marginLeft: 5, color: yellow }}>
                  {tracker.streak}
                </T>
              </>
            )}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default TrackerTable;
