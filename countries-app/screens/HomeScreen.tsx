import FilterModal from '@/components/FilterModal';
import LanguageFilterModal from '@/components/LanguageFilterModal';
import ThemedText from '@/components/ThemedText';
import useAppDataStore from '@/lib/stores/app-data-store';
import useAppModalStore from '@/lib/stores/app-modals-store';
import { Country, DropdownState } from '@/lib/types';
import { getAllLanguages, getTimezones } from '@/lib/utils';
import { Link } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, SectionList, View } from 'react-native';

const { height } = Dimensions.get('screen');

const HomeScreen = ({
  countries,
  isDarkMode,
}: {
  countries: Array<Country>;
  isDarkMode: boolean;
}) => {
  const { language, filters, search, updateFilters, updateLanguage } =
    useAppDataStore((state) => state);

  const { languageModal, filterModal, toggleFilterModal, toggleLanguageModal } =
    useAppModalStore((state) => state);

  countries?.sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  // search all available countries not just the filtered ones

  const searchResults = countries?.filter((country) => {
    const languages = country.languages
      ? Object.values(country.languages)
      : [''];

    if (country.name.common.toLowerCase().includes(search.trim().toLowerCase()))
      return country;
  });

  const filteredResults = countries?.filter((country) => {
    const languages = country.languages
      ? Object.values(country.languages)
      : [''];
    const languageMatch = languages.includes(language);

    const continentMatch =
      filters.continent.length > 0
        ? filters.continent.includes(country.continents[0])
        : true;

    const timezoneMatch =
      filters.timezone.length > 0
        ? filters.timezone.includes(country.timezones[0])
        : true;

    return languageMatch && continentMatch && timezoneMatch;
  });

  const filteredCountries = search ? searchResults : filteredResults;

  // group countries using the alphabetical order
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

  const allLanguages = useMemo(() => getAllLanguages(countries), [countries]);

  const allTimezones = useMemo(() => getTimezones(countries), [countries]);

  const handleApplyFilter = (state: DropdownState) => {
    updateFilters(state);
  };

  const renderItem = useCallback(
    ({ item }: { item: { name: string; flag: string; capital: string } }) => {
      return (
        <Link
          href={{
            pathname: '/country/[name]',
            params: { name: item.name },
          }}
          className='flex-1'
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
    },
    []
  );

  return (
    <View className=''>
      {/* LIST OF COUNTRIES */}

      <View style={{ height: height * 0.65 }}>
        <SectionList
          sections={sectionList}
          renderItem={renderItem}
          initialNumToRender={15}
          keyExtractor={(item) => item.name}
          renderSectionHeader={({ section }) => (
            <ThemedText className='text-gray-500 uppercase mt-5 mb-4'>
              {section.title}
            </ThemedText>
          )}
          ItemSeparatorComponent={() => <View className='h-2' />}
          ListEmptyComponent={() => (
            <View>
              <ThemedText>No such country found...</ThemedText>
            </View>
          )}
        />
      </View>

      {/* MODALS */}
      <LanguageFilterModal
        isVisible={languageModal}
        languages={allLanguages}
        onClose={toggleLanguageModal}
        value={language}
        onChange={updateLanguage}
        isDark={isDarkMode}
      />

      <FilterModal
        timezoneValues={filters.timezone}
        continentValues={filters.continent}
        timezones={allTimezones}
        onApplyFilter={handleApplyFilter}
        isVisible={filterModal}
        isDark={isDarkMode}
        onClose={toggleFilterModal}
      />
    </View>
  );
};

export default HomeScreen;
