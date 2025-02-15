import { getAllCountries } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export default function useCountriesQuery() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries,
  });
}
