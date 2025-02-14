import React from 'react';
import { View } from 'react-native';
import ThemedText from './ThemedText';

const ErrorMessage = ({
  message = 'An unknown error has occurred, Please try again later!',
}: {
  message?: string;
}) => {
  return (
    <View className='h-screen bg-inherit grid place-items-center'>
      <ThemedText>{message}</ThemedText>
    </View>
  );
};

export default ErrorMessage;
