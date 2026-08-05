import { useState, useEffect } from 'react'
import { CharacterList } from './components/CharacterList'
import { CharacterModal } from './components/CharacterModal'
import { Person } from './types/swapi'
import { Github, Sun, Moon } from 'lucide-react'

function App() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-[#050a15]/80 backdrop-blur-md border-b border-gray-200 dark:border-blue-900/30 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-display text-3xl font-bold tracking-widest text-slate-800 dark:text-blue-100 uppercase dark:drop-shadow-[0_0_10px_rgba(191,219,254,0.3)]">
              Star Wars
            </h1>
            <span className="text-xs text-slate-500 dark:text-blue-400 tracking-[0.3em] uppercase mt-1 opacity-70">API Database</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-slate-600 dark:text-blue-500 dark:hover:text-blue-300 transition-colors dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <a 
              href="https://github.com/amrshaikh/tsx-mern-06Aug2026" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 dark:text-blue-500 dark:hover:text-blue-300 transition-colors dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <CharacterList onSelectCharacter={setSelectedPerson} />
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-black/80 py-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500 dark:text-gray-500">
          <p>
            Powered by <a href="https://swapi.py4e.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors underline decoration-slate-300 dark:decoration-gray-700 underline-offset-2">SWAPI (The Star Wars API)</a>. Data is for demonstration purposes.
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedPerson && (
        <CharacterModal 
          person={selectedPerson} 
          onClose={() => setSelectedPerson(null)} 
        />
      )}
    </div>
  )
}

export default App
