import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { col, tw } from "../base/styles/tailwind";
import T from "../base/Text";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";
import isThisMonth from "date-fns/isThisMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import { ScrollView } from "react-native-gesture-handler";
import DataContext from "../store/DataContext";
import Svg, { Circle, Line } from "react-native-svg";

interface GraphProps {
  trackerId1: string;
  trackerId2: string | undefined;
  date: Date;
  type: string;
}

const CELL_SIZE = 40;
const GRAPH_HEIGHT = 240;

const styles = StyleSheet.create({
  container: tw(`flex-row self-center pb-4 pr-2`),
  date: {
    ...tw(`items-center justify-center`),
    width: CELL_SIZE,
    height: CELL_SIZE + 10,
  },
  dateCurrent: tw(`bg-yellow-200`),
  dayText: tw(`text-gray-500 text-xs uppercase`),
  weekText: tw(`text-gray-800 text-xxs uppercase`),
  dateText: tw(``),
});

const TrackerViewGraph = ({
  trackerId1,
  trackerId2,
  date,
  type,
}: GraphProps) => {
  const { getTracker, getAverageValue } = useContext(DataContext);
  const tracker1 = getTracker(trackerId1);
  const tracker2 = getTracker(trackerId2);
  const trackers = [tracker1, tracker2].filter(Boolean);

  const year = date.getFullYear();
  const month = date.getMonth();

  let dates, dateLabels, isCurrent, values;
  /**
   * Day formatting
   */
  if (type === "day") {
    const numberOfDays = getDaysInMonth(date);
    dates = Array.from(
      { length: numberOfDays },
      (_, i) => new Date(year, month, i + 1)
    );
    isCurrent = isToday;
    dateLabels = dates.map((date) => (
      <>
        <T style={styles.dayText}>{format(date, "eee")}</T>
        <T style={styles.dateText}>{format(date, "d")}</T>
      </>
    ));
    values = trackers.map((tracker) =>
      dates.map((date) => getAverageValue(tracker.id, date, 1))
    );

    /**
     * Week formatting
     */
  } else if (type === "week") {
    const firstDate = startOfWeek(new Date(year, 0, 1));
    dates = Array.from({ length: 52 }, (_, i) => addDays(firstDate, i * 7));
    isCurrent = isThisWeek;
    dateLabels = dates.map((date) => (
      <>
        <T style={styles.weekText}>{format(date, "MMM d")}</T>
        <T style={styles.weekText}>{format(addDays(date, 6), "MMM d")}</T>
      </>
    ));
    values = trackers.map((tracker) =>
      dates.map((date) => getAverageValue(tracker.id, date, 7))
    );

    /**
     * Month formatting
     */
  } else if (type === "month") {
    dates = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
    isCurrent = isThisMonth;
    dateLabels = dates.map((date) => (
      <T style={styles.dayText}>{format(date, "MMM")}</T>
    ));
    values = trackers.map((tracker) =>
      dates.map((date) => {
        const numberOfDays = getDaysInMonth(date);
        return getAverageValue(tracker.id, date, numberOfDays);
      })
    );
  } else {
    return;
  }

  const scales = trackers.map((tracker, i) => {
    const min = Math.min(...values[i]);
    const max = Math.max(...values[i]);
    const labels = [max, min];
    return { min, max, labels, color: tracker.color };
  });

  console.log(values, scales);

  // generate dot values
  const dots: { x: number; y: number }[][] = values.map(
    (trackerValues, trackerIndex) =>
      trackerValues.map((value, dateIndex) => {
        const x = CELL_SIZE / 2 + dateIndex * CELL_SIZE;
        const { min, max } = scales[trackerIndex];
        const height = GRAPH_HEIGHT - 50;
        const y = 25 + (height - (height / (max - min)) * (value - min));
        return { x, y };
      })
  );

  // generate line values from dots
  const lines: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }[][] = dots.map((trackerDots, trackerIndex) => {
    const lines = [];
    trackerDots.forEach((dot, dotIndex) => {
      const previousDot = trackerDots[dotIndex - 1];
      if (previousDot) {
        lines.push({
          x1: previousDot.x,
          y1: previousDot.y,
          x2: dot.x,
          y2: dot.y,
        });
      }
    });
    return lines;
  });

  return (
    <>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        {scales.map((scale, i) => (
          <View key={i}>
            <View style={styles.date}></View>
            <View
              style={[
                tw(`items-center justify-between`),
                { height: GRAPH_HEIGHT },
              ]}
            >
              {scale.labels.map((label, i) => (
                <View key={i} style={[tw(`justify-center`), { height: 50 }]}>
                  <T bold style={{ color: col(scale.color) }}>
                    {label}
                  </T>
                </View>
              ))}
            </View>
          </View>
        ))}
        <View style={{ width: CELL_SIZE * dates.length }}>
          <View style={tw(`flex-row`)}>
            {dateLabels.map((dateLabel, i) => (
              <View
                key={i}
                style={[styles.date, isCurrent(dates[i]) && styles.dateCurrent]}
              >
                {dateLabel}
              </View>
            ))}
          </View>
          <View style={tw(`border border-gray-400`)}>
            <Svg width={dates.length * CELL_SIZE} height={GRAPH_HEIGHT}>
              {Array.from({ length: 7 }, (_, i) => {
                const y = 25 + ((GRAPH_HEIGHT - 50) / 6) * i;
                return (
                  <Line
                    key={i}
                    x1={0}
                    y1={y}
                    x2={10000}
                    y2={y}
                    strokeWidth={1}
                    stroke={col("gray-200")}
                  />
                );
              })}
              {lines.map((trackerLines, trackerIndex) =>
                trackerLines.map((l, i) => (
                  <Line
                    key={`${trackerIndex}-${i}`}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    strokeWidth={2}
                    stroke={col(scales[trackerIndex].color)}
                  />
                ))
              )}

              {dots.map((trackerDots, trackerIndex) =>
                trackerDots.map((d, i) => (
                  <Circle
                    key={`${trackerIndex}-${i}`}
                    cx={d.x}
                    cy={d.y}
                    r="6"
                    fill={col(scales[trackerIndex].color)}
                  />
                ))
              )}
            </Svg>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TrackerViewGraph;
