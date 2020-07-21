import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { col, gray_200, gray_400, green, white } from "../../base/colors";
import Icon from "../../base/Icon";
import T, { rem } from "../../base/Text";
import Box from "../../layout/Box";
import DataContext from "../../store/DataContext";
import UIContext from "../../store/UIContext";
import { getDateKey } from "../../utils/getDateKey";
import { trackerIcon } from "../../utils/trackerTypes";

const styles = StyleSheet.create({
  header: {
    backgroundColor: gray_200,
    borderBottomColor: gray_400,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  const empty = (
    <Box
      itemsCenter
      justifyCenter
      style={{
        width: 40,
        height: 40,
        backgroundColor: col("white"),
        borderRadius: 20,
        borderColor: col("gray-4"),
        borderWidth: StyleSheet.hairlineWidth,
      }}
    >
      <Icon size={18} color={col("gray-4")} name="add" />
    </Box>
  );
  if (!entry || !tracker || entry.value === "") return empty;
  if (["number", "slider"].includes(tracker.type)) {
    const fontRem = 0.85 - entry.value.length * 0.07;
    return (
      <Box
        itemsCenter
        justifyCenter
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: tracker.color,
        }}
      >
        <T white style={{ fontSize: rem(fontRem) }}>
          {entry.value}
        </T>
      </Box>
    );
  } else if (tracker.type === "boolean") {
    return (
      <Box
        itemsCenter
        justifyCenter
        style={{
          width: 40,
          height: 40,
          backgroundColor:
            entry.value === "true" ? tracker.color : col("gray-4"),
          borderRadius: 20,
        }}
      >
        <Icon
          color={col("white")}
          name={entry.value === "true" ? "check" : "close"}
          size={18}
        />
      </Box>
    );
  } else if (tracker.type === "text" && entry.value) {
    return <Icon color={green} name="short-text" />;
  } else {
    return empty;
  }
};

const TrackerTable = () => {
  const { screenWidth } = useContext(UIContext);

  const numberOfDays = Math.floor((screenWidth - 160) / 50);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const dates = prepareDates(numberOfDays, date);
  const { trackers, getEntry } = useContext(DataContext);

  return (
    <>
      <Box
        row
        itemsCenter
        style={{
          backgroundColor: col("gray-2"),
          borderBottomColor: col("gray-4"),
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Box flex1 />
        {dates.map(({ date }, i) => (
          <Box
            key={i}
            itemsCenter
            justifyCenter
            w5
            h4
            style={{
              backgroundColor: isToday(date) ? "#eeeac9" : col("gray-2"),
            }}
          >
            <T
              style={{
                fontSize: rem(0.55),
                textTransform: "uppercase",
                color: isToday(date) ? col("gray-7") : col("gray-5"),
              }}
            >
              {format(date, "eee d")}
            </T>
          </Box>
        ))}
        <Box w1 />
      </Box>

      {trackers.map((tracker) => (
        <Box
          key={tracker.id}
          flex1
          row
          style={{
            alignItems: "stretch",
            borderBottomColor: col("gray-4"),
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Box flex1 row itemsCenter>
            <TouchableOpacity
              style={styles.trackerLabel}
              onPress={() => {
                navigation.navigate("TrackerView", { trackerId: tracker.id });
              }}
            >
              <Icon
                name={trackerIcon(tracker.type)}
                color={tracker.color}
                size={20}
              />
              <Box w1 />
              <T sm title>
                {tracker.label}
              </T>
            </TouchableOpacity>
          </Box>
          {dates.map(({ date, dateKey }) => {
            const entry = getEntry({ trackerId: tracker.id, dateKey });
            return (
              <Box
                key={dateKey}
                itemsCenter
                justifyCenter
                w5
                style={{
                  height: 60,
                  backgroundColor: isToday(date) ? "#fff7d0" : col("white"),
                }}
              >
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
          <Box w1 />
        </Box>
      ))}
    </>
  );
};

export default TrackerTable;
