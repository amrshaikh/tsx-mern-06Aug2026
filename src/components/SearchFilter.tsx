import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAllPlanets, useAllSpecies, useAllFilms } from '../hooks/queries';
import { extractIdFromUrl } from '../utils/helpers';

export interface FilterState {
  search: string;
  homeworld: string;
  film: string;
  species: string;
}

interface SearchFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isSearching: boolean;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onFilterChange, isSearching }) => {
  const [localSearch, setLocalSearch] = useState(filters.search);

  const { data: planets } = useAllPlanets();
  const { data: species } = useAllSpecies();
  const { data: films } = useAllFilms();

  // Compute sorted options
  const sortedPlanets = planets ? [...planets].sort((a, b) => a.name.localeCompare(b.name)) : [];
  const sortedSpecies = species ? [...species].sort((a, b) => a.name.localeCompare(b.name)) : [];
  // some APIs use title for films, others name. Assuming Film type has title
  const sortedFilms = films ? [...films].sort((a, b) => (a.title || '').localeCompare(b.title || '')) : [];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFilterChange({ ...filters, search: localSearch });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, filters, onFilterChange]);

  const hasActiveFilters = filters.search || filters.homeworld || filters.film || filters.species;

  const clearFilters = () => {
    setLocalSearch('');
    onFilterChange({ search: '', homeworld: '', film: '', species: '' });
  };

  return (
    <div className="bg-white/50 dark:bg-[#0a1224]/50 p-4 md:p-6 rounded-2xl border border-gray-200 dark:border-blue-900/30 mb-8 backdrop-blur-md shadow-lg dark:shadow-[0_0_20px_rgba(30,58,138,0.1)] transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 dark:text-blue-500/70 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-blue-900/30 rounded-xl bg-white dark:bg-[#050a15] text-slate-800 dark:text-blue-50 placeholder-slate-400 dark:placeholder-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="Identify target..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            className="bg-white dark:bg-[#050a15] border border-gray-200 dark:border-blue-900/30 text-slate-700 dark:text-blue-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
            value={filters.homeworld}
            onChange={(e) => onFilterChange({ ...filters, homeworld: e.target.value })}
          >
            <option value="">All Homeworlds</option>
            {sortedPlanets.map(p => (
              <option key={p.url} value={extractIdFromUrl(p.url)}>{p.name}</option>
            ))}
          </select>

          <select
            className="bg-white dark:bg-[#050a15] border border-gray-200 dark:border-blue-900/30 text-slate-700 dark:text-blue-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
            value={filters.species}
            onChange={(e) => onFilterChange({ ...filters, species: e.target.value })}
          >
            <option value="">All Species</option>
            {sortedSpecies.map(s => (
              <option key={s.url} value={extractIdFromUrl(s.url)}>{s.name}</option>
            ))}
          </select>

          <select
            className="bg-white dark:bg-[#050a15] border border-gray-200 dark:border-blue-900/30 text-slate-700 dark:text-blue-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
            value={filters.film}
            onChange={(e) => onFilterChange({ ...filters, film: e.target.value })}
          >
            <option value="">All Films</option>
            {sortedFilms.map(f => (
              <option key={f.url} value={extractIdFromUrl(f.url)}>{f.title}</option>
            ))}
          </select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-blue-400/80 transition-colors">
            {isSearching ? <span className="animate-pulse text-blue-500 dark:text-blue-400">Querying database...</span> : 'Filters active'}
          </span>
          <button 
            onClick={clearFilters}
            className="flex items-center text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
          >
            <X size={16} className="mr-1" /> Clear all
          </button>
        </div>
      )}
    </div>
  );
};
