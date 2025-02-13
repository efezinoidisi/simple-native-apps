import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { Pressable, View } from 'react-native';
import ThemedText from './ThemedText';

const FilterModal = () => {
  return (
    <View>
      <View className='bg-black/40 absolute inset-0 size-full dark:bg-white/40'>
        <View className='bg-white h-fit absolute bottom-0 w-full rounded-t-[32px] px-6 dark:bg-dark'>
          <View className='flex-row items-center justify-between my-6'>
            <ThemedText className='text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 tracking-normal'>
              Languages
            </ThemedText>

            <Pressable>
              <AntDesign name='closesquare' color={'#98A2B3'} size={24} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterModal;
