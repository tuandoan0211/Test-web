import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import SearchResults from './SearchResults';

export default function Search() {
  const { searchQuery, setSearchQuery, isSearchOpen, openSearch, closeSearch } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, closeSearch]);

  return (
    <>
      {/* Search Button - Desktop */}
      <button
        onClick={openSearch}
        className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-orange-600 font-medium transition-colors border border-gray-300 rounded-lg hover:border-orange-500"
      >
        <SearchIcon size={18} />
        <span className="text-sm">Tìm kiếm...</span>
      </button>

      {/* Search Button - Mobile */}
      <button
        onClick={openSearch}
        className="md:hidden text-gray-600 hover:text-orange-600 transition-colors p-2"
      >
        <SearchIcon size={20} />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm pt-20"
            onClick={closeSearch}
          >
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl mx-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative flex items-center">
                  <SearchIcon className="absolute left-4 text-gray-400" size={20} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-gray-800"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Results */}
              <SearchResults onClose={closeSearch} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

