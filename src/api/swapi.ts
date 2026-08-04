import { PaginatedResponse, Person, Planet, Species, Film } from '../types/swapi';

const BASE_URL = (import.meta as any).env.VITE_SWAPI_BASE_URL || 'https://swapi.py4e.com/api';

export const fetchPeople = async (page: number = 1): Promise<PaginatedResponse<Person>> => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error('Network response was not ok while fetching people');
  }
  return response.json();
};

export const fetchAllPeople = async (): Promise<Person[]> => {
  let allPeople: Person[] = [];
  let nextUrl: string | null = `${BASE_URL}/people/`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${nextUrl}`);
    }
    const data: PaginatedResponse<Person> = await response.json();
    allPeople = [...allPeople, ...data.results];
    nextUrl = data.next;
  }

  return allPeople;
};

export const fetchPlanet = async (url: string): Promise<Planet> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch planet from ${url}`);
  }
  return response.json();
};

export const fetchSpecies = async (url: string): Promise<Species> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch species from ${url}`);
  }
  return response.json();
};

export const fetchAllPlanets = async (): Promise<Planet[]> => {
  let all: Planet[] = [];
  let nextUrl: string | null = `${BASE_URL}/planets/`;
  while (nextUrl) {
    const response: Response = await fetch(nextUrl);
    if (!response.ok) break;
    const data: PaginatedResponse<Planet> = await response.json();
    all = [...all, ...data.results];
    nextUrl = data.next;
  }
  return all;
};

export const fetchAllSpecies = async (): Promise<Species[]> => {
  let all: Species[] = [];
  let nextUrl: string | null = `${BASE_URL}/species/`;
  while (nextUrl) {
    const response: Response = await fetch(nextUrl);
    if (!response.ok) break;
    const data: PaginatedResponse<Species> = await response.json();
    all = [...all, ...data.results];
    nextUrl = data.next;
  }
  return all;
};

export const fetchAllFilms = async (): Promise<Film[]> => {
  let all: Film[] = [];
  let nextUrl: string | null = `${BASE_URL}/films/`;
  while (nextUrl) {
    const response: Response = await fetch(nextUrl);
    if (!response.ok) break;
    const data: PaginatedResponse<Film> = await response.json();
    all = [...all, ...data.results];
    nextUrl = data.next;
  }
  return all;
};
