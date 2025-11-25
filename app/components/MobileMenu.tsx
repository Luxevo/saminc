'use client';

import { useState, useEffect } from 'react';
import MobileLanguageSelector from './MobileLanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { useModal } from '../contexts/ModalContext';
import { translations } from '../lib/translations';

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();
  const { openModal } = useModal();
  const t = translations[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu')) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="relative mobile-menu">
      <button 
        className="p-2 rounded hover:bg-light/60 transition-colors" 
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      
      {menuOpen && (
        <div className="absolute mt-2 right-0 w-48 rounded border border-light bg-white shadow-sm p-4 text-sm z-[1000]">
          <div className="mb-4">
            <MobileLanguageSelector />
          </div>
          <div className="border-t border-light pt-4">
            <button 
              onClick={() => {
                openModal();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded hover:bg-light/60 cursor-pointer"
            >
              {t.contactUs}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
