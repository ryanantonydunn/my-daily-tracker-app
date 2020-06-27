import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { FontProvider } from "./src/base/Text";
import Router from "./src/layout/Router";
import { DataProvider } from "./src/store/DataContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UIProvider } from "./src/store/UIContext";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <FontProvider>
          <DataProvider>
            <UIProvider>
              <Router />
            </UIProvider>
          </DataProvider>
        </FontProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
