import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

export default function OrdnanceExample() {
  // Made-up coordinates and explosion radius in meters
  const ordnanceLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const explosionRadius = 200; // meters

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ordnanceLocation.latitude,
          longitude: ordnanceLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={ordnanceLocation}
          title="Ordnance Location"
          description="Explosion Radius Area"
        />
        <Circle
          center={ordnanceLocation}
          radius={explosionRadius}
          strokeColor="rgba(255,0,0,0.5)"
          fillColor="rgba(255,0,0,0.2)"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
