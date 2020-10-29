import React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TestLayout = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "lightgreen" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: "lightblue" }}
        >
          <ScrollView
            contentContainerStyle={{
              backgroundColor: "gray",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              value="text"
              autoFocus
              style={{ padding: 40, backgroundColor: "orange" }}
            />
            <View
              style={{ height: 400, width: 20, backgroundColor: "brown" }}
            />
            <TouchableOpacity
              style={{ height: 40, backgroundColor: "purple" }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default TestLayout;
