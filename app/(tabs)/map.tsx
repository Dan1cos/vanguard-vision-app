import OrdnanceMarker from "components/ordnance-marker";
import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";
export default function TabTwoScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      {/* <OrdnanceMap /> */}
      <OrdnanceMarker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
