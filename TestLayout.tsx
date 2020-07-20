import React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TestLayout = () => {
  return (
    // <View style={{ flex: 1 }}>
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: "green",
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "pink",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ backgroundColor: "red" }}>
            <Text>Cock</Text>
            <TextInput value="text" autoFocus />
          </View>
          {/* </View> */}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TestLayout;
