'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export default function MobileLanguageSelector() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-language-selector')) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
    setLanguageOpen(false);
  };

  return (
    <div className="relative mobile-language-selector">
      <button 
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-light/60 text-dark text-menu font-normal"
        onClick={() => setLanguageOpen(!languageOpen)}
      >
        <Image src="/icons/globe.svg" alt="Langue" width={16} height={16} />
        {language === 'fr' ? 'Fr' : 'En'}
        <span aria-hidden>▾</span>
      </button>
      {languageOpen && (
        <div className="absolute mt-2 left-0 w-32 rounded border border-light bg-white shadow-sm p-2 text-sm z-[1000]">
          <button 
            className="block w-full text-left px-3 py-2 rounded hover:bg-light/60"
            onClick={() => handleLanguageChange('fr')}
          >
            Fr
          </button>
          <button 
            className="block w-full text-left px-3 py-2 rounded hover:bg-light/60"
            onClick={() => handleLanguageChange('en')}
          >
            En
          </button>
        </div>
      )}
    </div>
  );
}
