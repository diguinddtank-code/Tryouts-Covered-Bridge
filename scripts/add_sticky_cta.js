const fs = require('fs');

let code = fs.readFileSync('app/girls-tryouts/page.tsx', 'utf8');

// 1. Add state
code = code.replace(
  'const [openFaq, setOpenFaq] = useState<number | null>(null);',
  'const [openFaq, setOpenFaq] = useState<number | null>(null);\n  const [showStickyCTA, setShowStickyCTA] = useState(false);'
);

// 2. Add IntersectionObserver useEffect
const effectCode = `
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show CTA if the user scrolled past the form (bottom of form is above viewport top)
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
          setShowStickyCTA(true);
        } else {
          setShowStickyCTA(false);
        }
      },
      { threshold: 0 }
    );
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    return () => observer.disconnect();
  }, []);
`;

code = code.replace(
  '  const handleSubmit = async (e: React.FormEvent) => {',
  effectCode + '\n  const handleSubmit = async (e: React.FormEvent) => {'
);


// 3. Add Fixed CTA UI component before the closing </main>
const stickyCTACode = `
      {/* Sticky Bottom CTA */}
      <div 
        className={\`fixed bottom-0 left-0 w-full z-50 transform transition-transform duration-500 ease-in-out \${
          showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }\`}
      >
        <div className="bg-gradient-to-r from-[#050C1A] via-black to-[#050C1A] border-t-2 border-[#CC0000]/60 shadow-[0_-10px_40px_rgba(204,0,0,0.4)] backdrop-blur-3xl p-3 md:p-4">
          <div className="max-w-[1400px] mx-auto w-full flex flex-row items-center justify-between gap-3 md:gap-6 px-2 sm:px-4">
            <div className="hidden sm:flex flex-col">
              <h3 className="font-anton italic tracking-wide text-white text-lg md:text-xl uppercase drop-shadow-md">
                SECURE YOUR SPOT NOW
              </h3>
              <p className="font-dm-sans text-xs text-slate-300 font-medium">
                <span className="text-[#CC0000] font-bold">{registeringCount}</span> players are registering. Don't miss out!
              </p>
            </div>
            <div className="sm:hidden flex flex-col flex-1">
              <h3 className="font-anton italic tracking-wide text-white text-base md:text-xl uppercase block leading-tight drop-shadow-sm">
                SECURE YOUR SPOT
              </h3>
              <p className="font-dm-sans text-[10px] text-[#CC0000] font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(204,0,0,0.5)]">
                Limited space left!
              </p>
            </div>
            
            <button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-[#CC0000] to-red-700 hover:to-red-600 text-white font-anton text-sm md:text-lg tracking-wider rounded-lg px-6 py-3 w-auto sm:w-[200px] shadow-[0_0_20px_rgba(204,0,0,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              APPLY NOW
              <ChevronRight className="w-5 h-5 hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
`;

code = code.replace(
  '    </main>',
  stickyCTACode + '\n    </main>'
);

fs.writeFileSync('app/girls-tryouts/page.tsx', code);
