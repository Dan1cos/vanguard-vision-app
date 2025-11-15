import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import "react-native-reanimated";

import { ThemedView } from "@/components/themed-view";
import { useFontsLoaded } from "@/constants/fonts";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return (
      <ThemedView
        style={[
          styles.loadingContainer,
          { backgroundColor: colorScheme === "dark" ? "#151718" : "#dfdcc8" },
        ]}
      >
        <ActivityIndicator size="large" color="#ff9800" />
      </ThemedView>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
