"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

export default function GirlsTryouts() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState("");
  const [selectedPos, setSelectedPos] = useState("");
  const [registeringCount, setRegisteringCount] = useState(6);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCount = () => {
      setRegisteringCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        let newCount = prev + change;
        if (newCount < 3) newCount = 3;
        if (newCount > 12) newCount = 12;
        return newCount;
      });
      timeoutId = setTimeout(updateCount, Math.random() * 6000 + 4000);
    };
    let timeoutId = setTimeout(updateCount, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLoc || !selectedPos) {
      alert("Please select your position and location.");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    data.position = selectedPos;
    data.location = selectedLoc;

    try {
      const fbq = (window as any).fbq;
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }

      await fetch('/api/webhook/main', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'girls-tryouts' }),
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form, please try again.');
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden font-dm-sans selection:bg-[#CC0000] selection:text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden w-full bg-[#050C1A] px-4 py-3 flex items-center justify-between z-50 relative border-b border-white/10">
        <Image 
          src="https://traccoveredbridge.com/images/logo.png" 
          alt="Logo" 
          width={60} 
          height={60} 
          className="object-contain"
          referrerPolicy="no-referrer"
        />
        <div className="flex items-center gap-3">
          <LanguageSelector isMobile />
          <button onClick={scrollToForm} className="bg-[#CC0000] hover:bg-red-700 text-white font-anton font-bold px-4 py-2 text-xs tracking-wide rounded-md whitespace-nowrap shadow-sm transition-colors">
            REGISTER
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex absolute top-0 left-0 w-full z-50 px-10 py-6 justify-between items-start max-w-[1400px] mx-auto right-0">
        <Image 
          src="https://traccoveredbridge.com/images/logo.png" 
          alt="Logo" 
          width={100} 
          height={100} 
          className="object-contain drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
        <LanguageSelector />
      </div>

      {/* HERO & FORM UNIFIED SECTION */}
      <div className="relative w-full min-h-[100svh] flex flex-col pt-16 md:pt-28 pb-10 overflow-hidden bg-black">
        {/* Main Static Stadium Background - Female Soccer Player Theme */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3000&auto=format&fit=crop" 
            alt="Girls Soccer Stadium" 
            fill 
            className="object-cover opacity-60 object-top"
            priority
          />
        </div>
        
        {/* Sporty Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-[#CC0000]/10 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 opacity-20 mix-blend-overlay z-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col lg:flex-row flex-1 items-center justify-between gap-12 lg:gap-8">
          
          {/* HERO TEXT */}
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
            <h1 className="font-anton font-black italic text-2xl md:text-3xl tracking-wide mb-1 text-white drop-shadow-lg">Covered Bridge Soccer Club</h1>
            <p className="font-dm-sans text-[10px] md:text-sm tracking-[0.2em] text-[#CC0000] uppercase font-black mb-6 md:mb-8 drop-shadow-sm">
              GIRLS TRYOUTS • AGES U8-U19
            </p>

            <h2 className="font-anton font-black italic text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.85] tracking-wide uppercase drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col items-center lg:items-start">
              <span className="block text-white transform -skew-x-6 relative">
                GIRLS
              </span>
              <span className="block text-[#CC0000] transform -skew-x-6 relative">
                TRYOUTS
              </span>
            </h2>
            
            {/* Speed Slash Element */}
            <div className="h-[6px] w-24 bg-[#CC0000] my-8 skew-x-[-15deg] shadow-[0_0_20px_rgba(204,0,0,0.5)] hidden lg:block"></div>
            
            <div className="text-white/90 font-medium drop-shadow-md flex flex-col gap-3 items-center lg:items-start text-sm md:text-base bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-start gap-2 text-left">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-bold text-[#CC0000] uppercase text-xs tracking-wider">May 21</p>
                  <p>1560 Community Way NE, Gainesville, GA 30501</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 my-1"></div>
              <div className="flex items-start gap-2 text-left">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-bold text-[#CC0000] uppercase text-xs tracking-wider">May 22</p>
                  <p>1034 Franklin Gateway SE Marietta, Ga 30066</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 my-1"></div>
              <div className="flex items-center gap-2 text-left font-anton text-lg tracking-wide">
                <span className="text-xl w-6">⏰</span>
                <p>7:30 PM - 9:00 PM</p>
              </div>
            </div>
            
            {/* INLINE LEAGUES DISPLAY - ELITE SPORT STYLING (Except MLS NEXT) */}
            <div className="mt-10 w-full max-w-[450px] relative group self-center lg:self-start">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#CC0000] via-[#CC0000] to-transparent rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-black/80 border border-white/20 p-5 md:p-6 rounded-2xl backdrop-blur-xl">
                <p className="font-dm-sans text-[10px] md:text-xs uppercase font-black text-white/80 tracking-[0.25em] mb-4 flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#CC0000]"></span>
                  Proudly Competing In
                </p>
                <div className="flex items-center justify-start gap-8">
                   {[
                    { src: "https://traccoveredbridge.com/images/leagues/ga_soccer_logo.png", alt: "Georgia Soccer" },
                    { src: "https://traccoveredbridge.com/images/leagues/national_logo.png", alt: "USYS National" },
                    { src: "https://traccoveredbridge.com/images/leagues/ea_logo.png", alt: "EA League" }
                  ].map((logo, idx) => (
                    <div key={idx} className="relative w-14 h-14 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-110 transition-all duration-300 transform-gpu cursor-pointer grayscale hover:grayscale-0">
                      <Image src={logo.src} alt={logo.alt} fill className="object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="inline-flex items-center justify-center gap-2 bg-[#CC0000] border border-[#CC0000] text-white rounded-full px-5 py-2 mt-8 lg:mt-8 shadow-[0_0_20px_rgba(204,0,0,0.3)] animate-pulse-slow lg:self-start">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </div>
              <span className="font-dm-sans text-[12px] md:text-xs font-bold tracking-wide">
                {registeringCount} PLAYERS CURRENTLY REGISTERING
              </span>
            </div>
          </div>

          {/* FORM CARD */}
          <div id="register-form" ref={formRef} className="w-full lg:w-[45%] max-w-[500px] lg:max-w-[550px] px-0 sm:px-4 shrink-0 relative z-30 mt-8 lg:mt-0">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden border-t-[6px] border-t-[#CC0000] transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              
              {!isSubmitted ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6 text-center">
                    <h2 className="font-anton font-black italic text-2xl md:text-3xl tracking-wide mb-1 text-slate-900 uppercase">
                      Sign-Up <span className="text-[#CC0000]">Now</span>
                    </h2>
                    <p className="font-dm-sans text-xs md:text-sm text-slate-500 font-medium">
                      Fill out the form below to secure your spot.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                      
                      {/* Location Selector */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Location *</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            { id: "Gainesville", label: "Gainesville: May 21" },
                            { id: "Marietta", label: "Marietta: May 22" }
                          ].map(loc => (
                            <button
                              key={loc.id}
                              type="button"
                              onClick={() => setSelectedLoc(loc.id)}
                              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                                selectedLoc === loc.id 
                                  ? 'bg-[#CC0000] border-[#CC0000] text-white shadow-md' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {loc.label}
                            </button>
                          ))}
                        </div>
                        <input type="text" name="Location" required value={selectedLoc} onChange={() => {}} className="sr-only" />
                      </div>

                      {/* Player Details */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Name *</label>
                        <input name="Name" required type="text" className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200" />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">BirthDate *</label>
                        <input name="BirthDate" required type="date" className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Email *</label>
                        <input name="Email" required type="email" className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">City *</label>
                        <input name="City" required type="text" className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200" />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Zip *</label>
                        <input name="Zip" required type="text" className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200" />
                      </div>

                      {/* Position Custom Selector */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2 mt-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">What position do you play? *</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "Goalkeeper", "Left Back", "Right Back", "Center Back", 
                            "Left Midfield", "Right Midfield", "Center Midfield", "Forward"
                          ].map((pos) => (
                            <button
                              key={pos}
                              type="button"
                              onClick={() => setSelectedPos(pos)}
                              className={`p-2 rounded-lg border text-[10px] font-bold transition-all flex items-center justify-center text-center ${
                                selectedPos === pos 
                                  ? 'bg-[#CC0000] border-[#CC0000] text-white shadow-md' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {pos}
                            </button>
                          ))}
                        </div>
                        <input type="text" name="Position" required value={selectedPos} onChange={() => {}} className="sr-only" />
                      </div>

                      {/* Team & Level */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Current Team</label>
                        <input name="CurrentTeam" type="text" className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200" />
                      </div>

                       <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Current Highest Level *</label>
                        <select name="CurrentHighestLevel" required className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200 appearance-none">
                          <option value="" className="text-slate-400">Select Level</option>
                          <option value="Recreational">Recreational</option>
                          <option value="Academy / Select (SCCL, etc)">Academy / Select (SCCL, etc)</option>
                          <option value="DPL / GAL">DPL / GAL</option>
                          <option value="ECNL / ECRL">ECNL / ECRL</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">How did you hear about us? *</label>
                        <select name="HearAboutUs" required className="bg-gray-50 text-slate-900 px-3 py-2.5 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all duration-300 rounded-lg shadow-sm border border-slate-200 appearance-none">
                          <option value="" className="text-slate-400">Select an option</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Friend/Family">Friend/Family</option>
                          <option value="Coach">Coach</option>
                          <option value="Website">Website</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Consent */}
                      <div className="flex flex-row gap-3 items-start sm:col-span-2 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <input type="checkbox" id="consent" name="Consent" required className="mt-1 w-4 h-4 text-[#CC0000] rounded border-gray-300 focus:ring-[#CC0000]" />
                        <label htmlFor="consent" className="font-dm-sans text-xs text-slate-600 leading-tight">
                          <strong>Consent *</strong><br/>
                          I consent to having this website store my submitted information so they can respond to my inquiry.
                        </label>
                      </div>

                    </div>

                    <button type="submit" className="w-full h-14 mt-6 bg-[#CC0000] hover:bg-[#AA0000] text-white font-anton text-xl tracking-wide rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(204,0,0,0.5)] flex items-center justify-center relative overflow-hidden group">
                      <span className="relative z-10 flex items-center gap-2">SUBMIT APPLICATION <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 animate-in zoom-in-95 duration-500">
                  <div className="relative w-20 h-20 mb-6 text-[#CC0000]">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="animate-draw-check" strokeDasharray="283" strokeDashoffset="283" style={{ animation: 'draw-check 1s ease-out forwards' }} />
                      <path d="M30 50 L45 65 L70 35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-check" strokeDasharray="100" strokeDashoffset="100" style={{ animation: 'draw-check 0.5s ease-out 0.5s forwards' }} />
                    </svg>
                  </div>
                  <h2 className="font-anton font-black italic text-3xl tracking-wide mb-3 text-slate-900 uppercase">Application Received</h2>
                  <p className="font-dm-sans text-sm text-slate-600 mb-8 max-w-sm">
                    Thank you for registering for the Girls Tryouts! We have received your information and will be in touch shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#CC0000] font-dm-sans font-semibold uppercase tracking-wide text-xs hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    Submit another player
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
       {/* Footer */}
      <footer className="bg-[#050C1A] pt-16 pb-8 border-t border-white/10 relative z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center">
          <Image 
            src="https://traccoveredbridge.com/images/logo.png" 
            alt="Logo" 
            width={80} 
            height={80} 
            className="object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 mb-6"
            referrerPolicy="no-referrer"
          />
          <p className="font-dm-sans text-xs text-slate-500 font-medium">
            © 2026 Covered Bridge Soccer Club. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
