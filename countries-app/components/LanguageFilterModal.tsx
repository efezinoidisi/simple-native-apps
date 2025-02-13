import { LanguageFilterModalProps } from '@/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ThemedText from './ThemedText';

const LanguageFilterModal = ({
  isVisible,
  onApplyFilter,
  onClose,
  languages,
  value,
  onChange,
  isDark,
}: LanguageFilterModalProps) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType='slide'>
      <View className='bg-black/40 absolute inset-0 size-full dark:bg-white/40'>
        <View className='bg-white h-[82%] absolute bottom-0 w-full rounded-t-[32px] px-6 dark:bg-dark'>
          <View className='flex-row items-center justify-between my-6'>
            <ThemedText className='text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 tracking-normal'>
              Languages
            </ThemedText>

            <Pressable onPress={onClose}>
              <AntDesign name='closesquare' color={'#98A2B3'} size={24} />
            </Pressable>
          </View>

          <RadioButton.Group
            onValueChange={(text) => onChange(text, 'language')}
            value={value}
          >
            <FlatList
              data={languages}
              ItemSeparatorComponent={() => <View className='h-2' />}
              keyExtractor={(item, index) => `${item}${index}`}
              renderItem={({ item }) => {
                if (!item) return null;

                return (
                  <View className='flex-row justify-between items-center'>
                    <ThemedText>{item}</ThemedText>
                    <RadioButton
                      value={item}
                      color={isDark ? '#F2F4F7' : '#001637'}
                    />
                  </View>
                );
              }}
            />
          </RadioButton.Group>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageFilterModal;
