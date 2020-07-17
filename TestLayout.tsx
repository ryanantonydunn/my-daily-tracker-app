import React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import T from "./src/base/Text";
import { col } from "./src/base/colors";
import { LinearGradient } from "expo-linear-gradient";
import Box from "./src/layout/Box";
import UndrawTakingNotes from "./src/images/UndrawTakingNotes";
import Logo from "./src/base/Logo";
import IconButton from "./src/base/IconButton";

const TestLayout = () => {
  return (
    <>
      <SafeAreaView style={{ paddingBottom: 20 }}>
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
        <Box row itemsCenter justifyBetween>
          <Box w5 />
          <Logo />
          <IconButton name="check" color={col("white")} />
        </Box>
      </SafeAreaView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          marginTop: -20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <ScrollView>
          <SafeAreaView>
            <LinearGradient
              colors={[col("green-2"), col("teal-2")]}
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
            <Box itemsCenter justifyCenter p2>
              <UndrawTakingNotes width={180} />
            </Box>
          </SafeAreaView>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <T>Howdy</T>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default TestLayout;
