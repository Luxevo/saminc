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
    </main>
  );
}

