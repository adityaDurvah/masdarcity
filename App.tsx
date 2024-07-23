import { StatusBar } from 'expo-status-bar';
import AppNavigator from './appNavigator';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
  return Font.loadAsync({
    'Primary': require('./assets/fonts/Inter-VariableFont_slnt,wght.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
      SplashScreen.hideAsync();
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // You can show a fallback UI here if you want
  }

  return (
    <AppNavigator />
  );
}
