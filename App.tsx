import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { FontProvider } from "./src/base/Text";
import Router from "./src/layout/Router";
import { DataProvider } from "./src/store/DataContext";

export default function App() {
  return (
    <NavigationContainer>
      <FontProvider>
        <DataProvider>
          <Router />
        </DataProvider>
      </FontProvider>
    </NavigationContainer>
  );
}
