import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LargeButton from "../base/LargeButton";
import Rocket from "../base/Rocket";
import { tw } from "../base/styles/tailwind";
import T from "../base/Text";
import SafeView from "../layout/SafeView";

const styles = StyleSheet.create({
  bg: tw(`flex-1 bg-white`),
  container: tw(`flex-1 justify-between`),
  image: tw(`items-center justify-center`),
});

const GetStarted = () => {
  const navigation = useNavigation();
  return (
    <SafeView top left bottom right style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container}>
        <View />

        <View style={styles.image}>
          <Rocket scale={0.3} style={tw(`w-64 h-64`)} />
          <T style={tw(`mt-2 text-xl w-56 text-center text-teal-500`)}>
            Get started by setting up your trackers
          </T>
        </View>
        <View style={tw(`p-2`)}>
          <LargeButton
            onPress={() => navigation.navigate("EditTrackers")}
            title="Set up trackers"
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default GetStarted;
