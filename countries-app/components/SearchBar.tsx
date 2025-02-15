import EvilIcons from '@expo/vector-icons/EvilIcons';

import { SearchbarProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = ({
  value,
  onChangeText,
  className,
  onClear,
  ...otherProps
}: SearchbarProps) => {
  const isNotEmpty = value?.length > 0;
  return (
    <View
      className={cn(
        'flex-row items-center justify-start gap-2 px-4',
        className
      )}
    >
      <EvilIcons name='search' size={24} color='#667085' className='' />

      <TextInput
        style={{ fontFamily: 'Axiforma' }}
        value={value}
        onChangeText={onChangeText}
        className='bg-transparent placeholder:text-gray-500 placeholder:justify-center size-full resize-none placeholder:text-base placeholder:font-light dark:text-gray-200 outline-none pr-3 text-center'
        {...otherProps}
      />
      {isNotEmpty ? (
        <TouchableOpacity
          onPress={onClear}
          className='absolute top-1/2 -translate-y-1/2 right-1'
        >
          <EvilIcons name='close' size={24} color='#667085' />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
