import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { col, gray_900, white } from "../../base/colors";
import DayShifter from "../../base/DayShifter";
import Icon from "../../base/Icon";
import IconButton from "../../base/IconButton";
import Logo from "../../base/Logo";
import T from "../../base/Text";
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
    bottom: 15,
    right: 15,
  },
  buttonPaddingOnTable: {
    height: 100,
  },
});

const Home = ({ route, navigation }) => {
  const date = new Date(route.params.date);
  const setDate = (date) => navigation.setParams({ date: date.toISOString() });

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
        <DayShifter value={date} onChange={setDate} page="Home" />
        <TrackerTable date={date} />
        <Box h1 />
        <Box>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Icon name="playlist-add" color={col("green-5")} />
            <Box w1 />
            <T sm center>
              New tracker
            </T>
          </TouchableOpacity>
        </Box>
        <Box h4 />
      </Box>

      <Box bgWhite component={SafeAreaView}>
        <Box flex1 bgWhite>
          <View style={styles.buttonRight}>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: col("white"),
                borderRadius: 30,
                overflow: "hidden",
              }}
              onPress={() => navigation.navigate("EnterAll")}
            >
              <LinearGradient
                colors={[col("green-5"), col("teal-5")]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              />
              <Icon color={white} name="add" size={32} />
            </TouchableOpacity>
          </View>
        </Box>
      </Box>
    </LayoutWithHeader>
  );
};

export default Home;
