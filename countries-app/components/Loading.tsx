import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <View className='h-screen bg-inherit grid place-items-center'>
      <ActivityIndicator
        size={'large'}
        color={isDarkMode ? 'white' : 'black'}
      />
    </View>
  );
};

export default Loading;
