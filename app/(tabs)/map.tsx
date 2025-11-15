import { ThemedView } from '@/components/themed-view';
import OrdnanceMarker from "components/ordnance-marker";
import React, { JSX } from "react";
import { StyleSheet } from "react-native";

export default function TabTwoScreen(): JSX.Element {
  return (
    <ThemedView style={styles.container}>
      {/* <OrdnanceMap /> */}
      <OrdnanceMarker />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
