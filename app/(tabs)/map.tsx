import { OrdnanceMap } from "components/ordnance-map"; // Adjust path if needed
import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";
export default function TabTwoScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <OrdnanceMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
