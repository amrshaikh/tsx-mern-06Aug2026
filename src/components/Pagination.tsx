import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages,
  hasNext, 
  hasPrevious, 
  onPageChange,
  disabled = false
}) => {
  // Generate page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious || disabled}
        className={classNames(
          "flex items-center px-3 md:px-4 py-2 bg-white dark:bg-[#050a15] text-slate-600 dark:text-blue-300 rounded-lg transition-colors border border-gray-200 dark:border-blue-900/40",
          (!hasPrevious || disabled) ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 dark:hover:bg-[#0a1224] hover:text-slate-800 dark:hover:text-blue-100 dark:hover:border-blue-700/50"
        )}
      >
        <ChevronLeft size={20} className="md:mr-1" />
        <span className="hidden md:inline">Previous</span>
      </button>
      
      <div className="flex flex-wrap gap-1 md:gap-2">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={disabled}
            className={classNames(
              "w-10 h-10 flex items-center justify-center rounded-lg border font-medium transition-colors font-display",
              currentPage === page 
                ? "bg-blue-600 dark:bg-blue-900/60 text-white dark:text-blue-50 border-blue-500 dark:border-blue-400 shadow-sm dark:shadow-[0_0_10px_rgba(96,165,250,0.4)]" 
                : "bg-white dark:bg-[#050a15] text-slate-600 dark:text-blue-300 border-gray-200 dark:border-blue-900/40 hover:bg-slate-50 dark:hover:bg-[#0a1224] hover:text-slate-800 dark:hover:text-blue-100 dark:hover:border-blue-700/50",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || disabled}
        className={classNames(
          "flex items-center px-3 md:px-4 py-2 bg-white dark:bg-[#050a15] text-slate-600 dark:text-blue-300 rounded-lg transition-colors border border-gray-200 dark:border-blue-900/40",
          (!hasNext || disabled) ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 dark:hover:bg-[#0a1224] hover:text-slate-800 dark:hover:text-blue-100 dark:hover:border-blue-700/50"
        )}
      >
        <span className="hidden md:inline">Next</span>
        <ChevronRight size={20} className="md:ml-1" />
      </button>
    </div>
  );
};
