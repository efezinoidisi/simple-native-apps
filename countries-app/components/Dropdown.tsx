import { DropdownId } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import { Dimensions, FlatList, Pressable, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import ThemedText from './ThemedText';

const { height } = Dimensions.get('screen');

type DropdownProps = {
  data: Array<string>;
  title: string;
  id: DropdownId;
  selectedItems: Array<string>;
  handleChange: (value: string, id: DropdownId) => void;
  isDarkMode: boolean;
};

const Dropdown = ({
  data,
  title,
  id,
  selectedItems,
  handleChange,
  isDarkMode,
}: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <View>
      <Pressable
        className='flex-row justify-between items-center mb-4'
        onPress={toggleDropdownVisibility}
      >
        <ThemedText
          style={{ fontFamily: 'Axiforma Bold' }}
          className='font-bold text-base text-gray-900 dark:text-gray-100'
        >
          {title}
        </ThemedText>
        {isDropdownVisible ? (
          <Feather
            name='chevron-up'
            size={24}
            color={isDarkMode ? '#D0D5DD' : '#667085'}
          />
        ) : (
          <Feather
            name='chevron-down'
            size={24}
            color={isDarkMode ? '#D0D5DD' : '#667085'}
          />
        )}
      </Pressable>

      {isDropdownVisible && (
        <View
          style={{ maxHeight: id === 'timezone' ? height / 5 : 'auto' }}
          className='flex-1 h-auto'
        >
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <View className='h-2' />}
            renderItem={({ item }) => (
              <View className='flex-row items-center justify-between'>
                <ThemedText className='text-base text-gray-500 dark:text-gray-300'>
                  {item}
                </ThemedText>
                <Checkbox
                  status={
                    selectedItems.includes(item) ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange(item, id)}
                  color={isDarkMode ? '#F2F4F7' : '#1C1917'}
                />
              </View>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

export default Dropdown;
