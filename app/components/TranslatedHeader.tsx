'use client';

import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function TranslatedHeader() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="max-w-[1400px] mx-auto py-3 lg:py-3 pt-8 pb-4 lg:pt-3 lg:pb-3 px-4 md:px-6 lg:px-0 flex items-center gap-6">
        <Link href="/" className="shrink-0" aria-label="Accueil">
          <Image src="/img/Logo header.svg" alt="saminc.com" width={175} height={60} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 text-dark">
          <details className="relative group">
            <summary className="list-none cursor-pointer flex items-center gap-1 px-3 py-2 rounded hover:bg-light/60 text-menu font-normal">
              {t.solutions}
              <span aria-hidden>▾</span>
            </summary>
            <div className="absolute mt-2 left-0 w-56 rounded border border-light bg-white shadow-sm p-4 text-sm hidden group-open:block">
              À venir
            </div>
          </details>

          <details className="relative group">
            <summary className="list-none cursor-pointer flex items-center gap-1 px-3 py-2 rounded hover:bg-light/60 text-menu font-normal">
              {t.about}
              <span aria-hidden>▾</span>
            </summary>
            <div className="absolute mt-2 left-0 w-56 rounded border border-light bg-white shadow-sm p-4 text-sm hidden group-open:block">
              À venir
            </div>
          </details>
        </nav>

        <div className="hidden lg:flex ml-auto items-center gap-4">
          <LanguageSelector />

          <Link href="#" className="text-dark text-menu font-normal hover:underline">{t.contactUs}</Link>

          <Link href="#" className="bg-teal text-black text-button font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            <Image src="/icons/userConnect.svg" alt="Se connecter" width={20} height={20} />
            {t.login}
          </Link>
        </div>

        {/* Mobile menu - visible seulement sur mobile */}
        <div className="flex lg:hidden ml-auto items-center gap-1">
          {/* Menu hamburger avec sélecteur de langues à l'intérieur */}
          <MobileMenu />

          {/* Icône utilisateur */}
          <Link href="#" className="p-2 rounded hover:bg-light/60 transition-colors" aria-label="Se connecter">
            <Image src="/icons/userConnectMobile.svg" alt="Se connecter" width={36} height={36} />
          </Link>
        </div>
      </div>
    </header>
  );
}
