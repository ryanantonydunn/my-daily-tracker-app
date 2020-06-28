import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { gray_200, gray_500, gray_900, green, white } from "../../base/colors";
import IconButton from "../../base/IconButton";
import Logo from "../../base/Logo";
import Box from "../../layout/Box";
import LayoutWithHeader from "../../layout/LayoutWithHeader";
import TrackerTable from "./TrackerTable";

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
    bottom: 0,
    left: 0,
  },
  buttonRight: {
    position: "absolute",
    padding: 10,
    bottom: 0,
    right: 0,
  },
  buttonPaddingOnTable: {
    height: 100,
  },
});

const Home = ({ navigation }) => {
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
      <Box flex1 bgWhite component={ScrollView}>
        <TrackerTable />
        <Box bgWhite style={styles.buttonPaddingOnTable} />
      </Box>
      <Box bgWhite component={SafeAreaView}>
        <Box flex1 bgWhite>
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
        </Box>
      </Box>
    </LayoutWithHeader>
  );
};

export default Home;
