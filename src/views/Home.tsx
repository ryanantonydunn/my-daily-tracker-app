import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { gray_900, green, white, gray_500, gray_200 } from "../base/colors";
import IconButton from "../base/IconButton";
import Logo from "../base/Logo";
import Box from "../layout/Box";
import LayoutWithHeader from "../layout/LayoutWithHeader";

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
  return (
    <LayoutWithHeader
      title={<Logo />}
      menu={[
        {
          onPress: () => navigation.navigate("ChooseDate"),
          children: "View on date",
        },
        {
          onPress: () => navigation.navigate("ChooseDate"),
          children: "Do something",
        },
      ]}
    >
      <Box scroll p2>
        <Button
          onPress={() => navigation.navigate("Sandbox")}
          title="Sandbox"
        />
        <Box h2 />
        <Button
          onPress={() =>
            navigation.navigate("TrackerView", { trackerId: "test-tracker" })
          }
          title="View Tracker"
        />
      </Box>
      <View style={styles.buttonLeft}>
        <IconButton
          lg
          bgColor={white}
          color={gray_500}
          name="playlist-add"
          style={styles.button}
          onPress={() => navigation.navigate("TrackerForm")}
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
