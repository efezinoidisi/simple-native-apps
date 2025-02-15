import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

const LayoutNav = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </PaperProvider>
  );
};

export default LayoutNav;
