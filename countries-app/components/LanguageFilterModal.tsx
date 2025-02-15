import { LanguageFilterModalProps } from '@/lib/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { Portal, RadioButton } from 'react-native-paper';
import ThemedText from './ThemedText';

const LanguageFilterModal = ({
  isVisible,
  onClose,
  languages,
  value,
  onChange,
  isDark,
}: LanguageFilterModalProps) => {
  const handleRadioButtonPress = (text: string) => {
    onChange(text);
    onClose();
  };


  return (
    <Portal>
      <Modal visible={isVisible} transparent={true} animationType='slide'>
        <Pressable
          onPress={onClose}
          className='bg-black/40  inset-0 absolute  size-full dark:bg-white/40'
        />
        <View className='bg-white h-[82%] absolute bottom-0 w-full rounded-t-[32px] px-6 dark:bg-dark'>
          <View className='flex-row items-center justify-between my-6'>
            <ThemedText className='text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 tracking-normal'>
              Languages
            </ThemedText>

            <Pressable onPress={onClose}>
              <AntDesign name='closesquare' color={'#98A2B3'} size={24} />
            </Pressable>
          </View>

          <View className='flex-1'>
            <RadioButton.Group
              onValueChange={handleRadioButtonPress}
              value={value}
            >
              <FlatList
                data={languages}
                ItemSeparatorComponent={() => <View className='h-2' />}
                keyExtractor={(item, index) => `${item}${index}`}
                renderItem={({ item }) => {
                  if (!item) return null;

                  return (
                    <TouchableOpacity
                      className='flex-row justify-between items-center'
                      onPress={() => handleRadioButtonPress(item)}
                    >
                      <ThemedText>{item}</ThemedText>
                      <RadioButton
                        value={item}
                        color={isDark ? '#F2F4F7' : '#001637'}
                        status={value === item ? 'checked' : 'unchecked'}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </RadioButton.Group>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default LanguageFilterModal;
