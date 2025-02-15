import { create } from 'zustand';
import { AppModalState } from '../types';

const defaultState = {
  languageModal: false,
  filterModal: false,
};

const useAppModalStore = create<AppModalState>()((set) => ({
  ...defaultState,
  toggleFilterModal: () =>
    set((state) => ({ filterModal: !state.filterModal })),
  toggleLanguageModal: () =>
    set((state) => ({ languageModal: !state.languageModal })),
}));

export default useAppModalStore;
