import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { getDateKey } from "../utils/getDateKey";
import { col, tw } from "../base/styles/tailwind";
import T from "../base/Text";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import { ScrollView } from "react-native-gesture-handler";
import DataContext from "../store/DataContext";
import Svg, { Circle, Line } from "react-native-svg";

interface GraphProps {
  trackerId: string;
  trackerIdCompare?: string;
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
  dateText: tw(``),
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

const Graph = ({ trackerId, trackerIdCompare, date, type }: GraphProps) => {
  const { getEntry, getTracker } = useContext(DataContext);
  const tracker = getTracker(trackerId);
  // const dates = prepareDates(30, date);

  // TODO transform data into these three arrays

  // TODO days = this month, weeks = weeks of the year, months = months of the year
  const dates = [
    new Date(2020, 8, 15),
    new Date(2020, 8, 14),
    new Date(2020, 8, 13),
    new Date(2020, 8, 15),
    new Date(2020, 8, 14),
    new Date(2020, 8, 13),
    new Date(2020, 8, 15),
    new Date(2020, 8, 14),
    new Date(2020, 8, 13),
    new Date(2020, 8, 15),
    new Date(2020, 8, 14),
    new Date(2020, 8, 13),
  ];

  const scales = [
    {
      min: 0,
      max: 10,
      labels: [10, 5, 0],
      color: "green-500",
    },
    {
      min: 10,
      max: 100,
      labels: [100, 70, 40, 10],
      color: "red-500",
    },
  ];

  const values = [
    [0, 10, 5],
    [52, 45.5, 41.7],
  ];

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
            {dates.map((date, i) => (
              <View
                key={i}
                style={[styles.date, isToday(date) && styles.dateCurrent]}
              >
                <T style={styles.dayText}>{format(date, "eee")}</T>
                <T style={styles.dateText}>{format(date, "d")}</T>
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
              {/* <Line
              x1={25}
              y1={32}
              x2={75}
              y2={82}
              strokeWidth={2}
              stroke={col("red-500")}
            />
            <Line
              x1={25}
              y1={18}
              x2={75}
              y2={118}
              strokeWidth={2}
              stroke={col(tracker.color)}
            />
            <Line
              x1={75}
              y1={118}
              x2={125}
              y2={75}
              strokeWidth={2}
              stroke={col(tracker.color)}
            /> */}

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
        {/* {dates.map(({ date }, i) => (
          <View key={i} style={tw(`border-l border-b border-gray-400 p-2`)}>
            <View style={[styles.day, isToday(date) && styles.today]}>
              <T style={styles.dayText}>{format(date, "eee")}</T>
              <T style={styles.dateText}>{format(date, "d")}</T>
            </View>
            <View style={tw(`flex-row items-end`)}>
              <View style={tw(`w-4 h-12 mr-1 bg-green-500`)} />
              <View style={tw(`w-4 h-64 bg-red-500`)} />
            </View>
          </View>
        ))} */}
      </ScrollView>
    </>
  );
};

export default Graph;
