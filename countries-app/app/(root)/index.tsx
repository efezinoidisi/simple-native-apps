// import Countries from '@/components/Countries';
import ErrorMessage from '@/components/Error';
import Loading from '@/components/Loading';
import SearchBar from '@/components/SearchBar';
import ThemedText from '@/components/ThemedText';
import ThemeToggle from '@/components/ThemeToggle';
import useCountriesQuery from '@/lib/hooks/useCountriesQuery';
import useAppDataStore from '@/lib/stores/app-data-store';
import useAppModalStore from '@/lib/stores/app-modals-store';
import HomeScreen from '@/screens/HomeScreen';
import Feather from '@expo/vector-icons/Feather';
import { useColorScheme } from 'nativewind';
import { Image, Pressable, StatusBar, View } from 'react-native';

export default function Index() {
  const { data: countries, error, isPending, status } = useCountriesQuery();

  const { search, updateSearch, language } = useAppDataStore((state) => state);

  const { toggleFilterModal, toggleLanguageModal } = useAppModalStore(
    (state) => state
  );

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <View className='bg-white min-h-screen dark:bg-dark px-6 py-5 pb-10 flex-1'>
      <StatusBar
        backgroundColor={isDarkMode ? '#000F24' : 'white'}
        animated
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
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

        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleColorScheme} />
      </View>

      {/* SearchBar */}

      <SearchBar
        value={search}
        onClear={() => updateSearch('')}
        onChangeText={updateSearch}
        placeholder='Search Country'
        className='bg-gray-100 h-12 mt-5 mb-4 rounded-[4px] overflow-hidden dark:bg-[#98A2B333]'
      />

      {/* FILTERS */}

      <View className='mb-4 flex-row items-center justify-between'>
        {/* Language modal open button */}

        <Pressable
          onPress={toggleLanguageModal}
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
            {language.substring(0, 2)}
          </ThemedText>
        </Pressable>

        {/* Timezones and Continents modal open button */}
        <Pressable
          onPress={toggleFilterModal}
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

      {status === 'pending' ? (
        <Loading isDarkMode={isDarkMode} />
      ) : (
        <HomeScreen countries={countries} isDarkMode={isDarkMode} />
      )}
    </View>
  );
}
