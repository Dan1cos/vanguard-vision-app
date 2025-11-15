import { OrdnanceMap } from "components/ordnance-map"; // Adjust path if needed
import React, { JSX } from "react";
import { Platform, StyleSheet, View } from "react-native";
export default function TabTwoScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      {Platform.OS !== "web" && <OrdnanceMap />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
