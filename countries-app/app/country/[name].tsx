import ThemedText from '@/components/ThemedText';
import useCountriesQuery from '@/hooks/useCountriesQuery';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const CountryDetails = () => {
  const { data: countries, isPending, error } = useCountriesQuery();
  const { name } = useLocalSearchParams();

  if (!name) {
    throw new Error('Not found!');
  }

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const countryIndex = countries?.findIndex(
    (country) => country.name.common === name
  );

  if (countryIndex < 0) {
    throw new Error('No such Country');
  }

  const country = countries[countryIndex];

  console.log(country);

  return (
    <View className='bg-white min-h-screen-safe dark:bg-dark'>
      <ThemedText>{country.name.common}</ThemedText>
    </View>
  );
};

export default CountryDetails;
