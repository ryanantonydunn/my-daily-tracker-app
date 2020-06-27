import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { gray_900, green, white, gray_500, gray_200 } from "../base/colors";
import IconButton from "../base/IconButton";
import Logo from "../base/Logo";
import Box from "../layout/Box";
import LayoutWithHeader from "../layout/LayoutWithHeader";
import DataContext from "../store/DataContext";
import { ScrollView } from "react-native-gesture-handler";
import T from "../base/Text";

const styles = StyleSheet.create({
  button: {
    elevation: 4,
    shadowColor: gray_900,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    margin: 10,
  },
  buttonLeft: {
    position: "absolute",
    padding: 10,
    bottom: 5,
    left: 5,
  },
  buttonRight: {
    position: "absolute",
    padding: 10,
    bottom: 5,
    right: 5,
  },
});

const Home = ({ navigation }) => {
  const { trackers, entries, getTracker } = useContext(DataContext);
  return (
    <LayoutWithHeader
      title={<Logo />}
      menu={[
        {
          onPress: () => navigation.navigate("Sandbox"),
          children: "Sandbox",
        },
      ]}
    >
      <Box component={ScrollView} p2>
        {trackers.map((tracker) => (
          <Button
            key={tracker.id}
            onPress={() =>
              navigation.navigate("TrackerView", { trackerId: tracker.id })
            }
            title={`${tracker.label} - ${tracker.type}`}
          />
        ))}
        <View style={{ width: 100, height: 10, backgroundColor: "grey" }} />
        {entries.map((entry) => {
          const tracker = getTracker(entry.trackerId);
          return (
            !!tracker && (
              <Button
                key={entry.id}
                onPress={() =>
                  navigation.navigate("EnterSingle", {
                    trackerId: tracker.id,
                    dateKey: entry.dateKey,
                  })
                }
                title={`${tracker.label} - ${entry.dateKey} - ${entry.value}`}
              />
            )
          );
        })}
      </Box>
      <View style={styles.buttonLeft}>
        <IconButton
          lg
          bgColor={white}
          color={gray_500}
          name="playlist-add"
          style={styles.button}
          onPress={() => navigation.navigate("AddTracker")}
        />
      </View>
      <View style={styles.buttonRight}>
        <IconButton
          lg
          bgColor={green}
          border={gray_200}
          color={white}
          name="playlist-play"
          style={styles.button}
          onPress={() => navigation.navigate("EnterAll")}
        />
      </View>
    </LayoutWithHeader>
  );
};

export default Home;
