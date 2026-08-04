import React, { useEffect, useRef } from 'react';
import { Person } from '../types/swapi';
import { usePlanet, useSpecies } from '../hooks/queries';
import { formatHeight, formatMass, formatDate, getSpeciesColor } from '../utils/helpers';
import { X } from 'lucide-react';

interface CharacterModalProps {
  person: Person | null;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ person, onClose }) => {
  const { data: homeworld, isLoading, isError } = usePlanet(person?.homeworld || null);
  
  const speciesUrl = person?.species && person.species.length > 0 ? person.species[0] : null;
  const { data: species } = useSpecies(speciesUrl);
  const speciesName = speciesUrl ? species?.name : 'Unknown';
  const color = getSpeciesColor(speciesName);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (person) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [person, onClose]);

  if (!person) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-[#00040f]/90 backdrop-blur-md transition-colors duration-300"
         onClick={onClose}>
      <div 
        ref={modalRef}
        className="bg-white/90 dark:bg-[#050a15]/90 border border-gray-200 dark:border-blue-900/40 w-full max-w-lg rounded-2xl shadow-xl dark:shadow-[0_0_40px_rgba(30,58,138,0.2)] overflow-hidden relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 dark:text-blue-500/50 hover:text-slate-600 dark:hover:text-blue-300 transition-colors z-10 dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-display font-bold tracking-wide mb-6 drop-shadow-md" style={{ color }}>{person.name}</h2>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mb-8">
            <div>
              <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Height</p>
              <p className="font-medium text-lg text-slate-800 dark:text-blue-50">{formatHeight(person.height)}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Mass</p>
              <p className="font-medium text-lg text-slate-800 dark:text-blue-50">{formatMass(person.mass)}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Birth Year</p>
              <p className="font-medium text-lg text-slate-800 dark:text-blue-50">{person.birth_year}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Films</p>
              <p className="font-medium text-lg text-slate-800 dark:text-blue-50">{person.films.length}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Added to API</p>
              <p className="font-medium text-lg text-slate-800 dark:text-blue-50">{formatDate(person.created)}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-blue-900/30 pt-6">
            <h3 className="text-xl font-display font-semibold mb-4 text-slate-800 dark:text-blue-200 tracking-wide">Homeworld</h3>
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-5 bg-gray-700 rounded w-1/3"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                </div>
              </div>
            ) : isError ? (
              <p className="text-red-400">Failed to load homeworld data.</p>
            ) : homeworld ? (
              <div className="bg-slate-50 dark:bg-[#0a1224]/50 border border-gray-200 dark:border-blue-900/30 rounded-xl p-4 shadow-sm dark:shadow-[0_0_15px_rgba(30,58,138,0.1)]">
                <p className="text-lg font-bold text-slate-800 dark:text-blue-50 mb-3">{homeworld.name}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Terrain</p>
                    <p className="capitalize text-slate-700 dark:text-blue-100">{homeworld.terrain}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Climate</p>
                    <p className="capitalize text-slate-700 dark:text-blue-100">{homeworld.climate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-500 dark:text-blue-400/70 mb-1 tracking-wide text-xs uppercase">Population</p>
                    <p className="text-slate-700 dark:text-blue-100">{homeworld.population}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
