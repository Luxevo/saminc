import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h1 className="text-dark" style={{lineHeight: '56.4px'}}>
                Obtenez un service<br />
                à la hauteur de vos<br />
                besoins
              </h1>
              
              <p className="text-dark">
                Réalisez votre projet immobilier en toute sérénité,<br />
                suivez son évolution, restez informé et optimisez votre<br />
                transaction.
              </p>
              
              <button className="bg-coral text-dark text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
                Démarrer un projet
              </button>
            </div>

            {/* Right Column - Card/Image */}
            <div className="relative rounded-lg overflow-hidden shadow-sm">
              <Image 
                src="/img/Img Hero.png" 
                alt="Maison à vendre" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex flex-col justify-between items-center p-8">
                <h2 className="text-dark">Explorer les offres</h2>
                
                <button className="w-full max-w-xl bg-white text-dark text-button font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Mission/Valeurs */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Logo */}
            <div className="flex justify-center lg:justify-start items-center">
              <Image 
                src="/img/Logo now valeurs.svg" 
                alt="Nos valeurs" 
                width={360} 
                height={155} 
                className="w-full max-w-sm"
              />
            </div>

            {/* Right Column - 3 Containers */}
            <div className="space-y-8">
              {/* Notre Mission */}
              <div className="bg-light border border-light/60 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <Image src="/img/Icon notre mission.svg" alt="Notre mission" width={64} height={64} />
                  <h2 className="text-dark">Notre mission</h2>
                  <h3 className="text-dark">Aider les gens.</h3>
                  <p className="text-dark">
                    Permettre à chacun de réaliser ce dont ils ont véritablement besoin; les accompagner dans cette direction avec soin, et harmoniser.
                  </p>
                </div>
              </div>

              {/* Nos Valeurs */}
              <div className="bg-light border border-light/60 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <Image src="/img/Icon nos valeur.svg" alt="Nos valeurs" width={64} height={64} />
                  <h2 className="text-dark">Nos valeurs</h2>
                  <h3 className="text-dark">La transparence, la bienveillance et la compétence.</h3>
                  <p className="text-dark">
                    Notre modèle est fondé sur la transparence, notre système permet à nos clients d'avoir une vision claire, nos conseils et recommandations sont basés et adaptés selon les besoins et nous dirigeons les transactions, avec compétence.
                  </p>
                </div>
              </div>

              {/* Valeurs de Motivation */}
              <div className="bg-light border border-light/60 p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <Image src="/img/icon nos valeurs_2.svg" alt="Valeurs de motivation" width={64} height={64} />
                  <h2 className="text-dark">Quelques-uns de nos valeurs de motivation</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">L'innovation</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">La créativité</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">L'authenticité</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">Persévérance</span>
                    <span className="bg-white text-dark px-3 py-1 rounded-full text-sm">L'éthique</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Besoin d'une ressource */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
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
              <div className="space-y-4 flex flex-col items-start text-left">
                <h2 className="text-dark">Besoin d'<span className="text-teal font-bold text-[32px]">une ressource ?</span></h2>
                
                <p className="text-dark">
                  L'envie de contribuer et aidez les gens.
                </p>
                
                <div className="flex flex-col">
                  <div className="flex gap-4 flex-wrap items-start">
                    <button className="bg-coral text-dark text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0 inline-flex items-center gap-2">
                      On vous connecte
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <button className="bg-dark text-light text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                        Inscrivez-vous
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
            <div className="flex justify-center">
              <div className="space-y-4 flex flex-col items-start text-left">
                <h2 className="text-dark">Vous êtes en transaction ?</h2>
                
                <p className="text-dark">
                  Suivez votre projet en ligne.<br />
                  Découvrez nos conseils.
                </p>
                
                <button className="bg-coral text-dark text-button font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                  Suivre le processus
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative rounded-lg overflow-hidden shadow-sm">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-stretch justify-items-center">
              {/* Colonne 1 - Logo */}
              <div className="flex justify-center">
                <Image 
                  src="/img/Logo footer.svg" 
                  alt="saminc.com" 
                  width={360} 
                  height={163} 
                  className="w-full max-w-[400px] h-auto"
                />
              </div>

             {/* Colonne 2 - Plan du site */}
             <div className="flex flex-col items-center">
               <h3 className="text-dark mb-6 w-full pl-4">Plan du site</h3>
               <div className="space-y-3 text-left w-full pl-4">
                 <a href="#" className="block text-dark hover:underline">Explorer les offres</a>
                 <a href="#" className="block text-dark hover:underline">À propos</a>
                 <a href="#" className="block text-dark hover:underline">Contactez-nous</a>
                 <a href="#" className="block text-dark hover:underline">Politique de confidentialité</a>
                 <a href="#" className="block text-dark hover:underline">Termes et conditions</a>
                 <a href="#" className="block text-dark hover:underline">Politique de témoins (CA)</a>
               </div>
             </div>

            {/* Colonne 3 - Contact */}
            <div className="flex flex-col items-center">
              <h3 className="text-dark mb-6">Contact</h3>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-dark">LinkedIn</span>
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

