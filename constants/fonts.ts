import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const loadFonts = async () => {
  await Font.loadAsync({
    Montserrat: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold,
  });
};

export const useFontsLoaded = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAllFonts = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(false);
      }
    };

    loadAllFonts();
  }, []);

  return fontsLoaded;
};