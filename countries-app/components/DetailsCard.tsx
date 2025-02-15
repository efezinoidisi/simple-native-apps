import { DetailsCardProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { View } from 'react-native';
import ThemedText from './ThemedText';

const DetailsCard = ({ title, value, className }: DetailsCardProps) => {
  return (
    <View className='flex-row gap-2 items-center'>
      <ThemedText
        style={{ fontFamily: 'Axiforma Medium' }}
        className='font-medium tracking-normal leading-[25.66px] text-base text-gray-900 dark:text-gray-100 '
      >
        {title}:
      </ThemedText>
      <ThemedText
        style={{ fontFamily: 'Axiforma Light' }}
        className={cn(
          'font-light text-base text-gray-900 dark:text-gray-100 leading-[24.67px]',
          className
        )}
      >
        {value}
      </ThemedText>
    </View>
  );
};

export default DetailsCard;
