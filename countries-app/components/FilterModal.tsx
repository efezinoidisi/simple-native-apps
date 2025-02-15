import { CONTINENTS } from '@/lib/constants';
import { DropdownId, DropdownState, FilterModalProps } from '@/lib/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-paper';
import Dropdown from './Dropdown';
import ThemedText from './ThemedText';

const FilterModal = ({
  timezoneValues,
  timezones,
  isDark,
  isVisible,
  onApplyFilter,
  onClose,
  continentValues,
}: FilterModalProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    continent: false,
    timezone: false,
  });

  const defaultValues = { timezone: [], continent: [] };

  const [selectedItems, setSelectedItems] =
    useState<DropdownState>(defaultValues);

  const handleCheckboxToggle = (value: string, id: DropdownId) => {
    let newSelectedItems = [];

    if (selectedItems[id].includes(value)) {
      newSelectedItems = selectedItems[id].filter((item) => item !== value);
    } else {
      newSelectedItems = [...selectedItems[id], value];
    }

    setSelectedItems((prev) => ({ ...prev, [id]: newSelectedItems }));
  };

  const toggleDropdown = (name: 'continent' | 'timezone') => {
    setIsDropdownVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // at least one item is selected
  const isDirty =
    selectedItems.continent.length !== 0 || selectedItems.timezone.length !== 0;

  const resetSelectedItems = () => {
    setSelectedItems(defaultValues);
    onApplyFilter(defaultValues);
  };

  const handleApply = () => {
    onApplyFilter(selectedItems);
    onClose();
  };

  return (
    <Portal>
      <Modal visible={isVisible} transparent={true} animationType='slide'>
        <Pressable
          onPress={onClose}
          className='bg-black/40 absolute inset-0 size-full dark:bg-white/40'
        />
        <View className='bg-white min-h-[227px] h-auto  absolute bottom-0 w-full rounded-t-[32px] px-6 dark:bg-dark'>
          <View className='flex-row items-center justify-between my-6'>
            <ThemedText className='text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 tracking-normal'>
              Filter
            </ThemedText>

            <Pressable
              accessible={true}
              accessibilityLabel='close modal'
              onPress={onClose}
            >
              <AntDesign name='closesquare' color={'#98A2B3'} size={24} />
            </Pressable>
          </View>

          <View className='my-6 gap-6'>
            {/* Continent Dropdown */}

            <Dropdown
              data={CONTINENTS}
              title='Continent'
              id='continent'
              selectedItems={selectedItems.continent}
              handleChange={handleCheckboxToggle}
              isDarkMode={isDark}
            />

            {/* Timezone Dropdown */}

            <Dropdown
              data={timezones}
              title='Time zone'
              id='timezone'
              selectedItems={selectedItems.timezone}
              handleChange={handleCheckboxToggle}
              isDarkMode={isDark}
            />
          </View>

          {isDirty && (
            <View className='flex-row justify-between items-center mb-6 w-full gap-10'>
              <TouchableOpacity
                onPress={resetSelectedItems}
                className='text-gray-900  dark:text-gray-100 text-base h-[48px] rounded-[4px] w-[104px] border border-gray-900 dark:border-gray-100 justify-center items-center'
              >
                <ThemedText>Reset</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleApply}
                className='bg-[#FF6C00] dark:bg-[#FF6C00]/80 max-w-[236px] rounded-[4px] h-[48px] px-14 justify-center items-center text-base text-gray-25 dark:text-gray-100 '
              >
                <ThemedText>Show Results</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default FilterModal;
