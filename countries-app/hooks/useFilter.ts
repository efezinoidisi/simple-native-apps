import { useState } from 'react';

type FilterState = {
  language: string;
  continent: string;
  timezone: string;
};

export default function useFilter() {
  const [filters, setFilters] = useState<FilterState>({
    language: 'English',
    continent: '',
    timezone: '',
  });

  const [filterModalsVisibility, setFilterModalVisibility] = useState({
    language: false,
    continentTimezone: false,
  });

  const handleFilterStateChange = (value: string, id: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  return {
    filterModalsVisibility,
    filters,
    handleFilterStateChange,
    setFilterModalVisibility,
  };
}
