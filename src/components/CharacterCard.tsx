import React, { useState } from 'react';
import { Person } from '../types/swapi';
import { useSpecies } from '../hooks/queries';
import { extractIdFromUrl, getImageUrl, getSpeciesColor } from '../utils/helpers';
import classNames from 'classnames';
import { User } from 'lucide-react';

interface CharacterCardProps {
  person: Person;
  onClick: (person: Person) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ person, onClick }) => {
  const id = extractIdFromUrl(person.url);
  const [imgFailed, setImgFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const speciesUrl = person.species && person.species.length > 0 ? person.species[0] : null;
  const { data: species, isLoading } = useSpecies(speciesUrl);
  
  // Default to Unknown if no species provided, use gray while loading
  const speciesName = speciesUrl ? species?.name : 'Unknown';
  const color = isLoading ? '#374151' : getSpeciesColor(speciesName);

  return (
    <div 
      onClick={() => onClick(person)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        borderColor: isHovered ? color : '', 
        boxShadow: isHovered ? `0 0 25px ${color}40, inset 0 0 10px ${color}10` : 'none' 
      }}
      className={classNames(
        "relative flex flex-col bg-white/80 dark:bg-[#0a1224]/60 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer",
        "transition-all duration-500 hover:-translate-y-2 group border border-gray-200 dark:border-blue-900/30",
        isHovered ? "" : "border-gray-200 dark:border-blue-900/30"
      )}
    >
      <div className="w-full h-64 bg-gray-100 dark:bg-[#050a15] relative">
        {!imgFailed ? (
          <img 
            src={getImageUrl(id)} 
            alt={person.name} 
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-[#050a15]">
            <User size={64} className="text-gray-300 dark:text-blue-900/50" />
          </div>
        )}
      </div>
      <div style={{ backgroundColor: color }} className="p-4 flex flex-col flex-grow text-white shadow-inner">
        <h3 className="text-xl font-display font-bold tracking-wide mb-1 truncate drop-shadow-md">{person.name}</h3>
        <div className="mt-auto">
          {isLoading ? (
            <div className="h-4 w-16 bg-white/30 rounded animate-pulse" />
          ) : (
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
              {speciesName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
