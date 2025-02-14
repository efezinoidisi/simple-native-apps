import { Link } from 'expo-router';
import React from 'react';
import { SectionList, Text, View } from 'react-native';
import ThemedText from './ThemedText';

type Item = { name: string; flag: string; capital: string };

const Countries = ({
  sections,
}: {
  sections: {
    title: string;
    data: Item[];
  }[];
}) => {
  return (
    <View className='flex-1'>
      <SectionList
        className='grid gap-y-48'
        style={{ gap: 40 }}
        sections={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        renderSectionHeader={({ section }) => (
          <Text className='text-gray-500 uppercase mt-5 mb-4'>
            {section.title}
          </Text>
        )}
        ItemSeparatorComponent={() => <View className='h-2' />}
        ListEmptyComponent={() => (
          <View>
            <ThemedText>No such country found...</ThemedText>
          </View>
        )}
      />
    </View>
  );
};

export default Countries;

function renderItem({ item }: { item: Item }) {
  return (
    <Link
      href={{
        pathname: '/country/[name]',
        params: { name: item.name },
      }}
    >
      <View className='flex flex-row gap-4 items-center'>
        <ThemedText className='text-[40px]'>{item.flag}</ThemedText>
        <View className=''>
          <ThemedText className='text-gray-900 dark:text-gray-100 mb-[2px]'>
            {item.name}
          </ThemedText>
          <ThemedText className='text-gray-500 dark:text-gray-400'>
            {item.capital}
          </ThemedText>
        </View>
      </View>
    </Link>
  );
}
