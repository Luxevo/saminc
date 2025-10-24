"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";
import { translations } from "./lib/translations";

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  
  const wordData = t.animatedWords;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordData.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [wordData.length]);
  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
                <h1 className="text-dark" style={{lineHeight: '56.4px'}}>
                  <style jsx>{`
                    @media (max-width: 1023px) {
                      h1 {
                        font-size: 32px !important;
                        line-height: 1.2 !important;
                      }
                    }
                  `}</style>
                  {t.heroTitle}
                </h1>
              
              <p className="text-dark">
                <style jsx>{`
                  @media (max-width: 1023px) {
                    p {
                      font-size: 14px !important;
                    }
                  }
                `}</style>
                {t.heroSubtitle}
              </p>
              
              <button className="bg-coral text-dark text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 w-full lg:w-auto">
                <style jsx>{`
                  @media (max-width: 1023px) {
                    button {
                      font-size: 12px !important;
                    }
                  }
                `}</style>
                <Image src="/icons/demarrerProjet.svg" alt="Démarrer un projet" width={16} height={16} />
                {t.getStarted}
              </button>
            </div>

            {/* Right Column - Card/Image */}
            <div className="relative rounded-lg overflow-hidden shadow-sm pt-4 lg:pt-0">
              <Image 
                src="/img/Img Hero.png" 
                alt="Maison à vendre" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex flex-col justify-between items-center p-8 pt-4 pb-4 lg:pt-8 lg:pb-8">
                <h2 className="text-dark">
                  <style jsx>{`
                    @media (max-width: 1023px) {
                      h2 {
                        font-size: 24px !important;
                      }
                    }
                  `}</style>
                  {t.exploreOffers}
                </h2>
                
                <button className="w-full max-w-xl bg-white text-dark text-button font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
                  <style jsx>{`
                    @media (max-width: 1023px) {
                      button {
                        font-size: 12px !important;
                      }
                    }
                  `}</style>
                  Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Mission/Valeurs */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Logo */}
            <div className="hidden lg:flex justify-center lg:justify-start items-center">
              <Image 
                src="/img/Logo now valeurs.svg" 
                alt="Nos valeurs" 
                width={360} 
                height={155} 
                className="w-full max-w-sm"
              />
            </div>

            {/* Right Column - 3 Containers */}
            <div className="space-y-16">
              {/* Notre Mission */}
              <div className="bg-light border border-light/60 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <Image src="/img/Icon notre mission.svg" alt="Notre mission" width={64} height={64} />
                  <h2 className="text-dark">
                    <style jsx>{`
                      @media (max-width: 1023px) {
                        h2 {
                          font-size: 24px !important;
                        }
                      }
                    `}</style>
                    {t.ourMission}
                  </h2>
                  <h3 className="text-dark">
                    <style jsx>{`
                      @media (max-width: 1023px) {
                        h3 {
                          font-size: 14px !important;
                        }
                      }
                    `}</style>
                    {t.missionTitle}
                  </h3>
                  <p className="text-dark">
                    <style jsx>{`
                      @media (max-width: 1023px) {
                        p {
                          font-size: 14px !important;
                        }
                      }
                    `}</style>
                    {t.missionText}
                  </p>
                </div>
              </div>

              {/* Nos Valeurs */}
              <div className="bg-light border border-light/60 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <Image src="/img/Icon nos valeur.svg" alt="Nos valeurs" width={64} height={64} />
                  <h2 className="text-dark">
                    <style jsx>{`
                      @media (max-width: 1023px) {
                        h2 {
                          font-size: 24px !important;
                        }
                      }
                    `}</style>
                    {t.ourValues}
                  </h2>
                  <h3 className="text-dark">
                    <style jsx>{`
                      @media (max-width: 1023px) {
                        h3 {
                          font-size: 14px !important;
                        }
                      }
                    `}</style>
                    {t.valuesTitle}
                  </h3>
                  <p className="text-dark">
                    <style jsx>{`
                      @media (max-width: 1023px) {
                        p {
                          font-size: 14px !important;
                        }
                      }
                    `}</style>
                    {t.valuesText}
                  </p>
                </div>
              </div>

              {/* Valeurs de Motivation */}
              <div className="bg-light border border-light/60 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <Image src="/img/icon nos valeurs_2.svg" alt="Valeurs de motivation" width={64} height={64} />
                  <h2 className="text-dark">
                    <style jsx>{`
                      @media (max-width: 1023px) {
                        h2 {
                          font-size: 24px !important;
                        }
                      }
                    `}</style>
                    {t.motivationValues}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">{t.innovation}</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">{t.creativity}</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">{t.authenticity}</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">{t.perseverance}</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">{t.ethics}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Besoin d'une ressource */}
      <section className="py-4 lg:py-16 px-4 md:px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative rounded-lg overflow-hidden shadow-sm">
              <Image 
                src="/img/Img section besion d_une ressource.png" 
                alt="Besoin d'une ressource" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
            </div>

            {/* Right Column - Content */}
            <div className="flex justify-center">
              <div className="space-y-4 flex flex-col items-start text-left w-full max-w-2xl">
                <h2 className="text-dark">
                  <style jsx>{`
                    @media (max-width: 1023px) {
                      h2 {
                        font-size: 24px !important;
                      }
                    }
                  `}</style>
                  {t.need}<span className={`text-teal font-bold text-[22px] lg:text-[32px] inline-block transition-all duration-700 ease-out ${
                    isAnimating 
                      ? 'transform translate-y-8 opacity-0' 
                      : 'transform translate-y-0 opacity-100'
                  }`}>{wordData[currentWordIndex]?.article || 'un'} {wordData[currentWordIndex]?.word || 'inspecteur'} ?</span>
                </h2>
                
                <p className="text-dark">
                  {t.resourceText}
                </p>
                
                <div className="flex flex-col">
                  <div className="flex gap-4 flex-wrap items-start">
                    <button className="bg-coral text-dark text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0 inline-flex items-center justify-center gap-2 w-full lg:w-auto">
                      <style jsx>{`
                        @media (max-width: 1023px) {
                          button {
                            font-size: 12px !important;
                          }
                        }
                      `}</style>
                      <Image src="/icons/onVousConnecte.svg" alt="On vous connecte" width={16} height={16} />
                      {t.connectYou}
                    </button>
                    <div className="flex flex-col items-center w-full lg:w-auto">
                      <button className="bg-dark text-light text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity w-full lg:w-auto flex items-center justify-center">
                        <style jsx>{`
                          @media (max-width: 1023px) {
                            button {
                              font-size: 12px !important;
                            }
                          }
                        `}</style>
                        {t.signUp}
                      </button>
                      <span className="text-dark/60 mt-2 block">
                        • Professionnels •
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vous êtes en transaction */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="space-y-4 flex flex-col items-start text-left">
                <h2 className="text-dark">
                  <style jsx>{`
                    @media (max-width: 1023px) {
                      h2 {
                        font-size: 24px !important;
                      }
                    }
                  `}</style>
                  {t.transactionTitle}
                </h2>
                
                <p className="text-dark">
                  {t.transactionText}
                </p>
                
                <button className="bg-coral text-dark text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 w-full lg:w-auto">
                  <style jsx>{`
                    @media (max-width: 1023px) {
                      button {
                        font-size: 12px !important;
                      }
                    }
                  `}</style>
                  <Image src="/icons/suivreProcess.svg" alt="Suivre le processus" width={16} height={16} />
                  {t.followProcess}
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative rounded-lg overflow-hidden shadow-sm order-1 lg:order-2">
              <Image 
                src="/img/Img section transaction.png" 
                alt="Vous êtes en transaction" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer className="bg-teal py-16 px-4 md:px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 items-stretch justify-items-start lg:justify-items-center">
              {/* Colonne 1 - Logo */}
              <div className="flex justify-start lg:justify-center">
                <Image 
                  src="/img/Logo footer.svg" 
                  alt="saminc.com" 
                  width={360} 
                  height={163} 
                  className="w-full max-w-[300px] lg:max-w-[400px] h-auto"
                />
              </div>

             {/* Colonne 2 - Plan du site */}
             <div className="flex flex-col items-start lg:items-center">
               <h3 className="text-dark mb-3 lg:mb-6 w-full">
                 <style jsx>{`
                   h3 {
                     font-weight: 600 !important;
                     font-size: 18px !important;
                   }
                 `}</style>
                 {t.siteMap}
               </h3>
               <div className="space-y-2 lg:space-y-3 text-left w-full">
                 <a href="#" className="block text-dark hover:underline">
                   <style jsx>{`
                     @media (max-width: 1023px) {
                       a {
                         font-size: 16px !important;
                       }
                     }
                   `}</style>
                   {t.exploreOffers}
                 </a>
                 <a href="#" className="block text-dark hover:underline">
                   <style jsx>{`
                     @media (max-width: 1023px) {
                       a {
                         font-size: 16px !important;
                       }
                     }
                   `}</style>
                   {t.about}
                 </a>
                 <a href="#" className="block text-dark hover:underline">
                   <style jsx>{`
                     @media (max-width: 1023px) {
                       a {
                         font-size: 16px !important;
                       }
                     }
                   `}</style>
                   Contactez-nous
                 </a>
                 <a href="#" className="block text-dark hover:underline">
                   <style jsx>{`
                     @media (max-width: 1023px) {
                       a {
                         font-size: 16px !important;
                       }
                     }
                   `}</style>
                   Politique de confidentialité
                 </a>
                 <a href="#" className="block text-dark hover:underline">
                   <style jsx>{`
                     @media (max-width: 1023px) {
                       a {
                         font-size: 16px !important;
                       }
                     }
                   `}</style>
                   Termes et conditions
                 </a>
                 <a href="#" className="block text-dark hover:underline">
                   <style jsx>{`
                     @media (max-width: 1023px) {
                       a {
                         font-size: 16px !important;
                       }
                     }
                   `}</style>
                   Politique de témoins (CA)
                 </a>
               </div>
             </div>

            {/* Colonne 3 - Contact */}
            <div className="flex flex-col items-start">
              <h3 className="text-dark mb-3 lg:mb-6">
                <style jsx>{`
                  h3 {
                    font-weight: 600 !important;
                    font-size: 18px !important;
                  }
                `}</style>
                {t.contact}
              </h3>
              <div className="flex items-start gap-3">
                <Image 
                  src="/img/linkedin.svg" 
                  alt="LinkedIn" 
                  width={24} 
                  height={24} 
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-dark py-4 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-white text-[14px]">Copyright © 2025 Saminc</p>
        </div>
      </div>
    </main>
  );
}

