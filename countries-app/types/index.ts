import { TextInputProps, TextProps } from 'react-native';

export type Country = {
  name: {
    common: string;
    official: string;
  };
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  cca2: string;
  cca3: string;
  capital: Array<string>;
  altSpellings: Array<string>;
  region: string;
  languages: {
    [key: string]: string;
  };
  latlng: Array<number>;
  landlocked: boolean;
  area: number;
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  car: {
    signs: Array<string>;
    side: string;
  };
  timezones: Array<string>;
  continents: Array<string>;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: Array<number>;
  };
  idd: {
    root: string;
    suffixes: Array<string>;
  };
  gini: {
    [key: number]: number;
  };
};

export type ThemeToggleProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export type ThemedTextProps = TextProps & {
  theme?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export type SearchbarProps = TextInputProps & {
  onClear: () => void;
  value: string;
};

export type LanguageFilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilter: (filter: string) => void;
  languages: Array<string | undefined> | null;
  value: string;
  onChange: (value: string, id: string) => void;
  isDark: boolean;
};

export type CarouselItem = {
  id: string;
  image: string;
  alt?: string;
};

export type ImageCarouselProps = {
  data: Array<CarouselItem>;
  isDarkMode: boolean;
};

export type DetailsCardProps = {
  title: string;
  value: string | number;
  className?: string;
};