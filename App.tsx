import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { FontProvider } from "./src/base/Text";
import Router from "./src/layout/Router";

export default function App() {
  return (
    <NavigationContainer>
      <FontProvider>
        <Router />
      </FontProvider>
    </NavigationContainer>
  );
}
