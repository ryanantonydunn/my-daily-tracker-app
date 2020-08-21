import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FontProvider } from "./src/base/Text";
import Router from "./src/layout/Router";
import { DataProvider } from "./src/store/DataContext";
import { UIProvider } from "./src/store/UIContext";
import Modal from "./src/layout/Modal";
import TestLayout from "./TestLayout";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <FontProvider>
          <DataProvider>
            <UIProvider>
              <Router />
              {/* <TestLayout /> */}
              <Modal />
            </UIProvider>
          </DataProvider>
        </FontProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
