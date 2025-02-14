import { FilterState } from '@/types';
import { useState } from 'react';

export default function useFilter() {
  const [filters, setFilters] = useState<FilterState>({
    language: 'English',
    continent: [],
    timezone: [],
  });

  const [filterModalsVisibility, setFilterModalVisibility] = useState({
    language: false,
    continentTimezone: false,
  });

  return {
    filterModalsVisibility,
    filters,
    setFilters,
    setFilterModalVisibility,
  };
}
