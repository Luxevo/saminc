'use client';

import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "../contexts/LanguageContext";
import { useModal } from "../contexts/ModalContext";
import { translations } from "../lib/translations";

export default function TranslatedHeader() {
  const { language } = useLanguage();
  const { openModal } = useModal();
  const t = translations[language];

  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="max-w-[1400px] mx-auto py-3 lg:py-3 pt-8 pb-4 lg:pt-3 lg:pb-3 px-4 md:px-6 lg:px-0 flex items-center gap-6">
        <Link href="/" className="shrink-0" aria-label="Accueil">
          <Image src="/img/Logo header.svg" alt="saminc.com" width={175} height={60} priority />
        </Link>


        <div className="hidden lg:flex ml-auto items-center gap-4">
          <LanguageSelector />

          <button 
            onClick={openModal}
            className="text-dark text-menu font-normal hover:underline cursor-pointer"
          >
            {t.contactUs}
          </button>
        </div>

        {/* Mobile menu - visible seulement sur mobile */}
        <div className="flex lg:hidden ml-auto items-center gap-1">
          {/* Menu hamburger avec sélecteur de langues à l'intérieur */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
