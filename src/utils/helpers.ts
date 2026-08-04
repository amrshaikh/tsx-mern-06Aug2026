export const extractIdFromUrl = (url: string): string => {
  // e.g. "https://swapi.dev/api/people/1/" -> "1"
  const matches = url.match(/\/([0-9]+)\/$/);
  return matches ? matches[1] : '';
};

export const getImageUrl = (id: string): string => {
  return `https://picsum.photos/seed/${id}/400/400`;
};

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const getSpeciesColor = (speciesName?: string): string => {
  const name = speciesName?.toLowerCase() || 'human';
  
  // Manual overrides for a few iconic species
  switch (name) {
    case 'human': return '#2563eb'; // blue-600
    case 'droid': return '#6b7280'; // gray-500
    case 'wookiee': return '#b45309'; // amber-700
    case 'yoda\'s species': return '#16a34a'; // green-600
    case 'unknown': return '#475569'; // slate-600
  }

  // Deterministic generator for the rest
  const hash = Math.abs(hashCode(name));
  const hue = hash % 360;
  // Saturation 55-65%, Lightness 35-45% for good white text contrast
  const saturation = 55 + (hash % 11); 
  const lightness = 35 + (hash % 11);
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const formatHeight = (height: string): string => {
  if (height === 'unknown') return 'Unknown';
  const cm = parseInt(height, 10);
  if (isNaN(cm)) return 'Unknown';
  return `${(cm / 100).toFixed(2)} m`;
};

export const formatMass = (mass: string): string => {
  if (mass === 'unknown') return 'Unknown';
  return `${mass} kg`;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'Unknown';
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};
