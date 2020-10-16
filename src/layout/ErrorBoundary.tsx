import React, { ReactNode } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { error: Error | null; hasError: boolean }
> {
  state = { error: null, hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { error: error.toString(), hasError: true };
  }

  resetError: Function = () => {
    this.setState({ error: null, hasError: false });
  };

  render() {
    return this.state.hasError ? (
      <View style={styles.container}>
        <Text style={styles.header}>App Error</Text>
        <Text>{this.state.error}</Text>
      </View>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
