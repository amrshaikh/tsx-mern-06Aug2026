import { useQuery } from '@tanstack/react-query';
import { 
  fetchPeople, 
  fetchAllPeople, 
  fetchPlanet, 
  fetchSpecies,
  fetchAllPlanets,
  fetchAllSpecies,
  fetchAllFilms 
} from '../api/swapi';

export const useCharacters = (page: number) => {
  return useQuery({
    queryKey: ['characters', page],
    queryFn: () => fetchPeople(page),
  });
};

export const useAllCharacters = (enabled: boolean) => {
  return useQuery({
    queryKey: ['characters', 'all'],
    queryFn: fetchAllPeople,
    enabled, // Only fetch when true (e.g. search/filter mode activated)
    staleTime: Infinity, // Cache forever once loaded
  });
};

export const usePlanet = (url: string | null) => {
  return useQuery({
    queryKey: ['planet', url],
    queryFn: () => fetchPlanet(url as string),
    enabled: !!url,
  });
};

export const useSpecies = (url: string | null) => {
  return useQuery({
    queryKey: ['species', url],
    queryFn: () => fetchSpecies(url as string),
    enabled: !!url,
    staleTime: Infinity,
  });
};

export const useAllPlanets = () => {
  return useQuery({
    queryKey: ['planets', 'all'],
    queryFn: fetchAllPlanets,
    staleTime: Infinity,
  });
};

export const useAllSpecies = () => {
  return useQuery({
    queryKey: ['species', 'all'],
    queryFn: fetchAllSpecies,
    staleTime: Infinity,
  });
};

export const useAllFilms = () => {
  return useQuery({
    queryKey: ['films', 'all'],
    queryFn: fetchAllFilms,
    staleTime: Infinity,
  });
};
