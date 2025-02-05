import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
