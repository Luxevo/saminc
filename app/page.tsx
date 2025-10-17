export default function Home() {
  return (
    <main className="min-h-screen bg-light">
      <section className="bg-teal text-light py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1>Welcome to our site</h1>
          <p className="mt-4">A captivating description of your project</p>
          <button className="bg-coral text-light text-button font-medium px-6 py-3 rounded mt-8 hover:opacity-90 transition-opacity">
            Get started
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-dark mb-8">Design System Test</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-light border border-dark p-6 rounded">
            <h4 className="text-dark mb-4">Color Palette</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-teal rounded"></div>
                <span>Teal - #4C9A84</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-coral rounded"></div>
                <span>Coral - #FF6857</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-dark rounded"></div>
                <span>Dark - #1E1E1E</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-light border border-dark rounded"></div>
                <span>Light - #F4F4F4</span>
              </div>
            </div>
          </div>

          <div className="bg-light border border-dark p-6 rounded">
            <h4 className="text-dark mb-4">Typography</h4>
            <div className="space-y-3">
              <div className="text-dark">
                <h1 className="leading-tight">H1 - 48px Bold</h1>
              </div>
              <div className="text-dark">
                <h2>H2 - 32px</h2>
              </div>
              <div className="text-dark">
                <h3>H3 - 24px</h3>
              </div>
              <div className="text-dark">
                <h4>H4 - 18px Bold</h4>
              </div>
              <p className="text-dark">Paragraph - 18px</p>
              <p className="text-menu text-dark">Menu - 16px</p>
              <p className="text-button text-dark">Button - 14px</p>
              <span className="text-dark block">Span - 12px</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-dark">Sample Section</h3>
          <p className="text-dark">
            This is a paragraph demonstrating the Montserrat font at 18px. 
            Your design system is now fully configured and ready to use!
          </p>
          
          <div className="flex gap-4 flex-wrap">
            <button className="bg-teal text-light text-button font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity">
              Primary Button
            </button>
            <button className="bg-coral text-light text-button font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity">
              Accent Button
            </button>
            <button className="bg-dark text-light text-button font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity">
              Dark Button
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

