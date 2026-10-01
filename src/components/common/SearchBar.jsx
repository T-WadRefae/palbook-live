import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import { searchContent } from '../../data/searchIndex';

// Global search used in the navbar. Searches worksheets, General lessons and
// PalBook lessons from a static offline index and deep-links to each result.
const SearchBar = ({ className = '' }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();

  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const results = q ? searchContent(q) : [];

  // Close the results when clicking outside the component.
  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const go = (item) => {
    setOpen(false);
    setQ('');
    if (item.external) window.open(item.href, '_blank', 'noopener');
    else navigate(item.to);
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ direction: isAr ? 'rtl' : 'ltr' }}
    >
      <FiSearch className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3 text-slate-400 text-sm" />
      <input
        type="text"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => q && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results[0]) go(results[0]);
          if (e.key === 'Escape') setOpen(false);
        }}
        placeholder={t('common.searchPlaceholder')}
        className="w-full h-9 ps-9 pe-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-secondary-400 focus:bg-white dark:focus:bg-slate-900 outline-none text-slate-700 dark:text-slate-100 placeholder:text-slate-400"
      />

      {open && q && (
        <div className="absolute z-50 mt-1.5 start-0 w-full sm:w-80 max-h-80 overflow-auto rounded-2xl bg-white dark:bg-slate-800 shadow-kid border border-slate-100 dark:border-slate-700">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
              {t('common.noResults')}
            </div>
          ) : (
            results.map((item, i) => (
              <button
                key={i}
                onClick={() => go(item)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-start hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-xl shrink-0">{item.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                    {isAr ? item.titleAr : item.titleEn}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {isAr ? item.typeAr : item.typeEn}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
