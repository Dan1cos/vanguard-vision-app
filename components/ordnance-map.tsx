import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapData {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}

interface OrdnanceMapProps {
  apiUrl?: string;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export const OrdnanceMap: React.FC<OrdnanceMapProps> = ({
  apiUrl = "https://api.example.com/map-data",
  initialRegion = {
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
}) => {
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<MapData[]>(apiUrl);
        setMapData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch map data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    //fetchMapData();
  }, [apiUrl]);

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='#eda43fff' />
        <ThemedText>Loading map data...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {mapData.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.coordinates}
            title={item.title}
            description={item.description}
          />
        ))}
      </MapView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
});
