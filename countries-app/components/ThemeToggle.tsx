import { ThemeToggleProps } from '@/lib/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const ThemeToggle = ({ isDarkMode, toggleTheme }: ThemeToggleProps) => {
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className='rounded-[32px] size-8 bg-gray-25 justify-center items-center transition-colors duration-200 dark:bg-[#98A2B333]'
      accessible={true}
      accessibilityLabel='Toggle theme'
    >
      <Feather
        name={isDarkMode ? 'moon' : 'sun'}
        size={24}
        color={isDarkMode ? '#EAECF0' : '#000000'}
        className='transition-colors duration-200'
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;
