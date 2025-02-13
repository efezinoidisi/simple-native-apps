import LanguageFilterModal from '@/components/LanguageFilterModal';
import SearchBar from '@/components/SearchBar';
import ThemedText from '@/components/ThemedText';
import ThemeToggle from '@/components/ThemeToggle';
import useCountriesQuery from '@/hooks/useCountriesQuery';
import useFilter from '@/hooks/useFilter';
import { getAllLanguages } from '@/utils';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  View,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function Index() {
  const { data: countries, error, isPending } = useCountriesQuery();

  const sectionListRef = useRef(null);

  const {
    filterModalsVisibility,
    handleFilterStateChange,
    filters,
    setFilterModalVisibility,
  } = useFilter();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  const [searchValue, setSearchValue] = useState('');

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

  countries?.sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  const searchResults = countries?.filter((country) => {
    const languages = country.languages
      ? Object.values(country.languages)
      : [''];
    // languages.includes(filters.language)

    if (
      country.name.common
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    )
      return country;
  });

  const filteredResults = countries?.filter((country) => {
    const languages = country.languages
      ? Object.values(country.languages)
      : [''];
    if (languages.includes(filters.language)) return country;
  });

  const filteredCountries = searchValue ? searchResults : filteredResults;

  const countriesByAlphabet = filteredCountries?.reduce<
    Record<string, { name: string; flag: string; capital: string }[]>
  >((all, word) => {
    const firstLetter = word.name.common[0].toLowerCase();

    all[firstLetter] = all[firstLetter] || [];

    all[firstLetter].push({
      name: word.name.common,
      flag: word.flag,
      capital: word.capital ? word.capital.toString() : 'None',
    });

    return all;
  }, {});

  const sectionList = Object.entries(countriesByAlphabet).map(
    ([title, data]) => {
      return { title, data };
    }
  );

  const allLanguages = getAllLanguages(countries);

  return (
    <PaperProvider>
      <ScrollView>
        <View className='bg-white min-h-screen-safe dark:bg-dark px-6 py-5 pb-10'>
          <View className='flex-row justify-between items-center'>
            {isDarkMode ? (
              <Image
                source={require('@/assets/images/logo.png')}
                style={{ height: 24, width: 98 }}
                resizeMode={'cover'}
              />
            ) : (
              <Image
                source={require('@/assets/images/ex_logo.png')}
                className='w-[98px]'
                style={{ height: 24, width: 98 }}
                resizeMode={'cover'}
              />
            )}

            <ThemeToggle
              isDarkMode={isDarkMode}
              toggleTheme={toggleColorScheme}
            />
          </View>

          {/* SearchBar */}

          <SearchBar
            value={searchValue}
            onClear={() => setSearchValue('')}
            onChangeText={(text) => setSearchValue(text)}
            placeholder='Search Country'
            className='bg-gray-100 h-12 mt-5 mb-4 rounded-[4px] overflow-hidden dark:bg-[#98A2B333]'
          />

          {/* FILTERS */}

          <View className='mb-4 flex-row items-center justify-between'>
            <Pressable
              onPress={() =>
                setFilterModalVisibility((prev) => ({
                  ...prev,
                  language: true,
                }))
              }
              style={{
                boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                borderRadius: 4,
              }}
              className='flex-row items-center gap-2 border-[0.2px] border-[#A9B8D4] h-10 w-[73px] justify-center'
            >
              <Feather
                name='globe'
                size={24}
                color={isDarkMode ? '#D0D5DD' : '#000000'}
              />
              <ThemedText className='uppercase font-medium text-xs text-black dark:text-gray-300'>
                {filters.language.substring(0, 2)}
              </ThemedText>
            </Pressable>

            <Pressable
              style={{
                boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                borderRadius: 4,
              }}
              className='flex-row items-center gap-2 border-[0.2px] border-[#A9B8D4] h-10 w-[86px] justify-center'
            >
              <Feather
                name='filter'
                size={24}
                color={isDarkMode ? '#D0D5DD' : '#000000'}
              />
              <ThemedText className='uppercase font-medium text-xs text-black dark:text-gray-300'>
                Filter
              </ThemedText>
            </Pressable>

            <LanguageFilterModal
              isVisible={filterModalsVisibility.language}
              languages={allLanguages}
              onApplyFilter={() => {}}
              onClose={() =>
                setFilterModalVisibility((prev) => ({
                  ...prev,
                  language: false,
                }))
              }
              value={filters.language}
              onChange={handleFilterStateChange}
              isDark={isDarkMode}
            />
          </View>

          <View className=''>
            <SectionList
              className='grid gap-y-48'
              style={{ gap: 40 }}
              sections={sectionList}
              renderItem={({ item }) => (
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
              )}
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
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
