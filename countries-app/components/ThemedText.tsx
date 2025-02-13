import { ThemedTextProps } from '@/types';
import { cn } from '@/utils';
import React from 'react';
import { Text, type TextProps } from 'react-native';



const ThemedText = ({ theme, className, ...otherProps }: ThemedTextProps) => {
  return (
    <Text
      style={{ fontFamily: 'Axiforma' }}
      className={cn(
        'text-black dark:text-white leading-[22.18px] -tracking-[0.3px]',
        className
      )}
      {...otherProps}
    />
  );
};

export default ThemedText;
