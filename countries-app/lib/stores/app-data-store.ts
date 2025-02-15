import { create } from 'zustand';
import { AppDataState } from '../types';

const defaultState = {
  language: 'English',
  search: '',
  filters: {
    continent: [],
    timezone: [],
  },
};

const useAppDataStore = create<AppDataState>()((set) => ({
  ...defaultState,
  updateFilters: (data) => {
    set(() => ({
      filters: data,
    }));
  },
  updateLanguage: (value) => {
    set(() => ({
      language: value,
    }));
  },
  updateSearch: (value) => {
    set(() => ({
      search: value,
    }));
  },
}));

export default useAppDataStore;
