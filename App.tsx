import { StatusBar } from 'expo-status-bar';
import AppNavigator from './appNavigator';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
// import useNotifications from './hooks/notifications';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
  return Font.loadAsync({
    'Primary': require('./assets/fonts/DIN/DIN-Next-Regular.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  // const { getToken, getPermissions } = useNotifications();

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
      SplashScreen.hideAsync();
    };

    // const token = getToken();
    // console.log(token)
    // getPermissions();
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // You can show a fallback UI here if you want
  }

  return (
    <>
     <LinearGradient
      colors={['#00d4ff', '#ffffff']} // Replace with your gradient colors
      style={styles.gradient}
    >
    <Image source={require('./assets/Masdarcity_logo.png')} style={styles.logo} />
    </LinearGradient>
    <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    // width: 200,
    // height: 50,
    alignSelf: 'center',
    // marginTop: 100
  },
  gradient: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height:80,
  },
})