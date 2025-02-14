// import Countries from '@/components/Countries';
import Countries from '@/components/Countries';
import ErrorMessage from '@/components/Error';
import FilterModal from '@/components/FilterModal';
import LanguageFilterModal from '@/components/LanguageFilterModal';
import Loading from '@/components/Loading';
import SearchBar from '@/components/SearchBar';
import ThemedText from '@/components/ThemedText';
import ThemeToggle from '@/components/ThemeToggle';
import useCountriesQuery from '@/hooks/useCountriesQuery';
import useFilter from '@/hooks/useFilter';
import { DropdownState } from '@/types';
import { getAllLanguages, getTimezones } from '@/utils';
import Feather from '@expo/vector-icons/Feather';
import { useColorScheme } from 'nativewind';
import { useRef, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function Index() {
  const { data: countries, error, isPending } = useCountriesQuery();

  const sectionListRef = useRef(null);

  const {
    filterModalsVisibility,
    setFilters,
    filters,
    setFilterModalVisibility,
  } = useFilter();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  const [searchValue, setSearchValue] = useState('');

  if (isPending) {
    return <Loading isDarkMode={isDarkMode} />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  countries?.sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  // search all available countries not just the filtered ones

  const searchResults = countries?.filter((country) => {
    const languages = country.languages
      ? Object.values(country.languages)
      : [''];

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
    const languageMatch = languages.includes(filters.language);

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

  const filteredCountries = searchValue ? searchResults : filteredResults;

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

  const allLanguages = getAllLanguages(countries);

  const allTimezones = getTimezones(countries);

  const handleApplyFilter = (state: DropdownState) => {
    setFilters((prev) => ({ ...prev, ...state }));
  };

  return (
    <PaperProvider>
      <View className='bg-white min-h-screen dark:bg-dark px-6 py-5 pb-10'>
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
          {/* Language modal open button */}

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

          {/* Timezones and Continents modal open button */}
          <Pressable
            onPress={() =>
              setFilterModalVisibility((prev) => ({
                ...prev,
                continentTimezone: true,
              }))
            }
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
        </View>

        {/* MODALS */}
        <LanguageFilterModal
          isVisible={filterModalsVisibility.language}
          languages={allLanguages}
          onClose={() =>
            setFilterModalVisibility((prev) => ({
              ...prev,
              language: false,
            }))
          }
          value={filters.language}
          onChange={(text) =>
            setFilters((prev) => ({ ...prev, language: text }))
          }
          isDark={isDarkMode}
        />

        <FilterModal
          timezoneValues={filters.timezone}
          continentValues={filters.continent}
          timezones={allTimezones}
          onApplyFilter={handleApplyFilter}
          isVisible={filterModalsVisibility.continentTimezone}
          isDark={isDarkMode}
          onClose={() =>
            setFilterModalVisibility((prev) => ({
              ...prev,
              continentTimezone: false,
            }))
          }
        />

        {/* LIST OF COUNTRIES */}

        <Countries sections={sectionList} />
      </View>
    </PaperProvider>
  );
}
