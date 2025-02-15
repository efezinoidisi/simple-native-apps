import { API_BASE_URL } from '@/lib/constants';
import { Country } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export async function getAllCountries(): Promise<Country[]> {
  const response = await fetch(`${API_BASE_URL}/all`);

  const data = await response.json();

  return data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAllLanguages(countries: Array<Country>) {
  if (!countries) return null;
  const languages = countries.flatMap((country) => {
    if (country.languages) {
      return Object.values(country.languages);
    }
  });

  // remove duplicates

  const languageSet = new Set(languages);

  return Array.from(languageSet).sort();
}

export function getTimezones(countries: Country[]) {
  return countries
    .flatMap((country) => country.timezones)
    .filter((timezone, index, self) => self.indexOf(timezone) === index);
}
