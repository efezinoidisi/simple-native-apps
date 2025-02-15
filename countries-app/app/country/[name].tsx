import DetailsCard from '@/components/DetailsCard';
import ErrorMessage from '@/components/Error';
import ImageCarousel from '@/components/ImageCarousel';
import Loading from '@/components/Loading';
import ThemedText from '@/components/ThemedText';
import useCountriesQuery from '@/lib/hooks/useCountriesQuery';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

const CountryDetails = () => {
  const { data: countries, error, status } = useCountriesQuery();
  const { name } = useLocalSearchParams();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  if (!name) {
    throw new Error('Not found!');
  }

  if (status === 'pending') {
    return <Loading isDarkMode={isDarkMode} />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const countryIndex = countries?.findIndex(
    (country) => country.name.common === name
  );

  if (countryIndex < 0) {
    throw new Error('No such Country');
  }

  const country = countries[countryIndex];

  const images = [
    {
      id: '0',
      image: country.flags.png || '',
      alt: country.flags?.alt || country.name.common,
    },
    {
      id: '1',
      image: country.coatOfArms.png || '',
      alt: `${country.name.common} coat of arms`,
    },
  ];

  const language = country.languages
    ? Object.values(country.languages)[0]
    : 'Unavailable';

  const currency = country.currencies
    ? Object.values(country.currencies)[0].name
    : 'Unavailable';

  const giniIndex = country.gini
    ? Object.values(country.gini)[0]
    : 'Unavailable';

  const population = new Intl.NumberFormat().format(country.population);

  return (
    <View className='bg-white min-h-screen dark:bg-dark px-6 py-4 '>
      {/* Header */}
      <View className='flex-row items-center justify-start'>
        <Pressable
          accessible={true}
          accessibilityLabel='go back'
          onPress={() => router.back()}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10'
        >
          <AntDesign
            name='arrowleft'
            size={24}
            color={isDarkMode ? '#F2F4F7' : 'black'}
          />
        </Pressable>
        <ThemedText
          style={{ fontFamily: 'Axiforma Bold' }}
          className='text-gray-900 font-bold text-xl dark:text-gray-200 text-center w-full leading-[32.9px] tracking-normal'
        >
          {country.name.common}
        </ThemedText>
      </View>
      <ScrollView>
        {/* Image Carousel */}

        <ImageCarousel data={images} isDarkMode={isDarkMode} />

        {/* Country Details */}

        <View className='gap-y-2'>
          <DetailsCard title='Population' value={population} />
          <DetailsCard title='Region' value={country.region} />
          <DetailsCard title='Capital' value={country.capital[0]} />
          <DetailsCard title='Official language' value={language} />
        </View>

        <View className='my-6 gap-y-2'>
          <DetailsCard title='Country code' value={country.cca3} />
          <DetailsCard title='Area' value={`${country.area} km2`} />
          <DetailsCard title='Currency' value={currency} />
          <DetailsCard title='Worldbank gini index' value={giniIndex} />
        </View>

        <View className='gap-y-2'>
          <DetailsCard title='Time zone' value={country.timezones[0]} />
          <DetailsCard title='Driving side' value={country.car.side} />
          <DetailsCard
            title='Dialling code'
            value={`${country.idd.root}${country.idd.suffixes[0]}`}
          />
          <DetailsCard
            title='Independent'
            value={country.independent ? 'Yes' : 'No'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CountryDetails;
