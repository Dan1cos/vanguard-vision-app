import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

export interface Marker {
  id: string;
  lon: number;
  lat: number;
  type: string;
  explosionRadius: number;
}

export interface MarkerType {
  id: string;
  title: string;
  explosion_radius: number;
}

export interface FoundItemType {
  id: string;
  lon: number;
  lat: number;
  type_id: string;
  created_at: string;
}

export default function OrdnanceExample() {
  const [locations, setLocations] = useState<Marker[]>([]);

  const fetchAll = async () => {
    try {
      const [typesRes, foundRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/items/types"),
        fetch("http://127.0.0.1:8000/api/items/found"),
      ]);

      if (!typesRes.status && !foundRes.status) {
        console.log("Error fetching");
        console.log(typesRes);
        console.log(foundRes);
        return;
      }

      const typesData: MarkerType[] = await typesRes.json();
      const foundData: FoundItemType[] = await foundRes.json();

      const merged = mergeMarkers(foundData, typesData);
      setLocations(merged);
    } catch (error) {
      console.error("Error while fetching: ", error);
    }
  };
  const mergeMarkers = (
    found: FoundItemType[],
    types: MarkerType[]
  ): Marker[] => {
    return found.map((item) => {
      const type = types.find((t) => t.id === item.type_id);

      return {
        id: item.id,
        lat: item.lat,
        lon: item.lon,
        type: type ? type.title : "Unknown type",
        explosionRadius: type ? type.explosion_radius : 0,
      };
    });
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {locations && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: locations[0]?.lat ?? 52.04915171955253,
            longitude: locations[0]?.lon ?? 13.68345786296459,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
        >
          {locations.map((location) => (
            <View key={location.id}>
              <Marker
                coordinate={{ latitude: location.lat, longitude: location.lon }}
                title={location.type}
                description="Explosion Radius Area"
              />
              <Circle
                center={{ latitude: location.lat, longitude: location.lon }}
                radius={location.explosionRadius}
                strokeColor="rgba(255,0,0,0.5)"
                fillColor="rgba(255,0,0,0.2)"
              />
            </View>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
