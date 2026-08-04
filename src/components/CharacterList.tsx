import React, { useState, useMemo } from 'react';
import { useCharacters, useAllCharacters } from '../hooks/queries';
import { CharacterCard } from './CharacterCard';
import { Pagination } from './Pagination';
import { SearchFilter, FilterState } from './SearchFilter';
import { Person } from '../types/swapi';

interface CharacterListProps {
  onSelectCharacter: (person: Person) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ onSelectCharacter }) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({ search: '', homeworld: '', film: '', species: '' });
  
  const hasActiveFilters = Boolean(filters.search || filters.homeworld || filters.film || filters.species);
  
  // Queries
  const { 
    data: paginatedData, 
    isLoading: isLoadingPaginated, 
    isError: isErrorPaginated,
    error: errorPaginated,
    refetch: refetchPaginated 
  } = useCharacters(page);

  const { 
    data: allData, 
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
    refetch: refetchAll 
  } = useAllCharacters(!!hasActiveFilters); // Only fetch all if filters are active

  // Filter Logic
  const filteredData = useMemo(() => {
    if (!hasActiveFilters || !allData) return [];
    
    return allData.filter(person => {
      // Name search
      const matchesSearch = person.name.toLowerCase().includes(filters.search.toLowerCase());
      
      // Film filter
      const matchesFilm = !filters.film || person.films.some(f => f.endsWith(`/${filters.film}/`));
      
      // Homeworld filter
      const matchesHomeworld = !filters.homeworld || person.homeworld.endsWith(`/${filters.homeworld}/`);
      
      // Species filter
      const matchesSpecies = !filters.species || 
        person.species.some(s => s.endsWith(`/${filters.species}/`));
        
      return matchesSearch && matchesFilm && matchesHomeworld && matchesSpecies;
    });
  }, [allData, filters, hasActiveFilters]);

  // Loading & Error States
  const isLoading = hasActiveFilters ? isLoadingAll : isLoadingPaginated;
  const isError = hasActiveFilters ? isErrorAll : isErrorPaginated;
  const error = hasActiveFilters ? errorAll : errorPaginated;

  const handleRetry = () => {
    if (hasActiveFilters) refetchAll();
    else refetchPaginated();
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col bg-white dark:bg-[#0a1224]/60 rounded-xl overflow-hidden h-[330px] animate-pulse border border-gray-200 dark:border-blue-900/30">
          <div className="w-full h-64 bg-gray-200 dark:bg-[#050a15]/80"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-300 dark:bg-blue-900/40 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-blue-900/40 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <SearchFilter 
        filters={filters} 
        onFilterChange={setFilters} 
        isSearching={hasActiveFilters && isLoadingAll} 
      />

      {isError ? (
        <div className="flex flex-col items-center justify-center p-12 bg-red-900/20 border border-red-500/50 rounded-2xl">
          <h3 className="text-2xl font-bold text-red-500 mb-2">Error Loading Characters</h3>
          <p className="text-red-400 mb-6 text-center">{error?.message}</p>
          <button 
            onClick={handleRetry}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
          >
            Retry Fetch
          </button>
        </div>
      ) : isLoading ? (
        renderSkeletons()
      ) : hasActiveFilters ? (
        <div className="space-y-6">
          <p className="text-slate-500 dark:text-blue-400/80 transition-colors">Found {filteredData.length} matching subjects across archives.</p>
          {filteredData.length === 0 ? (
            <div className="text-center py-20 text-slate-400 dark:text-blue-500/50 transition-colors">
              <p className="text-2xl font-display tracking-wide font-medium mb-2 text-slate-600 dark:text-blue-200">No matching records found.</p>
              <p>Adjust query parameters to expand search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredData.map(person => (
                <CharacterCard key={person.url} person={person} onClick={onSelectCharacter} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedData?.results.map(person => (
              <CharacterCard key={person.url} person={person} onClick={onSelectCharacter} />
            ))}
          </div>
          
          <Pagination 
            currentPage={page}
            totalPages={paginatedData ? Math.ceil(paginatedData.count / 10) : 0}
            hasNext={!!paginatedData?.next}
            hasPrevious={!!paginatedData?.previous}
            onPageChange={setPage}
            disabled={isLoadingPaginated}
          />
        </>
      )}
    </div>
  );
};
