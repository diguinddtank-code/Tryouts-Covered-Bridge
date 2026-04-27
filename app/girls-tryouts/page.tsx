"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Check, ChevronRight, MapPin, Calendar, Clock, Target, Users, Trophy, ChevronDown } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";
import TravelSection from "@/components/TravelSection";
import ScheduleSection from "@/components/ScheduleSection";
import LeaguesSection from "@/components/LeaguesSection";

export default function GirlsTryouts() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState("");
  const [selectedPos, setSelectedPos] = useState("");
  const [registeringCount, setRegisteringCount] = useState(6);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

      await fetch('/api/webhook/girls', {
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
    <main className="min-h-screen bg-[#050C1A] overflow-hidden font-dm-sans selection:bg-[#CC0000] selection:text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden w-full bg-[#050C1A] px-4 py-3 flex items-center justify-between z-50 relative border-b border-white/10 shadow-lg">
        <Image 
          src="https://traccoveredbridge.com/images/logo.png" 
          alt="Logo" 
          width={50} 
          height={50} 
          className="object-contain"
          referrerPolicy="no-referrer"
        />
        <div className="flex items-center gap-3">
          <LanguageSelector isMobile />
          <button onClick={scrollToForm} className="bg-gradient-to-r from-[#CC0000] to-[#CC0000] hover:to-red-700 text-white font-anton font-bold px-4 py-2 text-xs tracking-wide rounded-md whitespace-nowrap shadow-sm transition-all focus:ring-2 focus:ring-[#CC0000]/50">
            {t.nav.register.replace(' →', '')}
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
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform"
          referrerPolicy="no-referrer"
        />
        <LanguageSelector />
      </div>

      {/* HERO & FORM UNIFIED SECTION */}
      <div className="relative w-full min-h-[100svh] flex flex-col pt-0 md:pt-24 pb-8 md:pb-10 overflow-hidden bg-[#050C1A]">
        {/* Main Static Stadium Background - Female Soccer Player Theme */}
        <div className="absolute inset-0 z-0 bg-fixed">
          <Image 
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3000&auto=format&fit=crop" 
            alt="Girls Soccer Stadium" 
            fill 
            className="hidden md:block object-cover opacity-50 object-center lg:bg-fixed"
            priority
          />
          <Image 
            src="https://i.imgur.com/oGcsrgP.png" 
            alt="Girls Soccer Hero Mobile" 
            fill 
            className="block md:hidden object-contain opacity-80 object-top scale-110 translate-y-8 lg:bg-fixed"
            priority
          />
        </div>
        
        {/* Sporty Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#050C1A]/70 via-[#050C1A]/60 md:via-[#050C1A]/90 to-[#CC0000]/30 mix-blend-multiply z-10 transition-all duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-[#050C1A]/40 to-transparent z-10"></div>
        <div className="absolute inset-0 opacity-30 mix-blend-overlay z-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col lg:flex-row flex-1 items-stretch lg:items-center justify-between gap-8 md:gap-12 lg:gap-8 mt-6 md:mt-0">
          
          {/* HERO TEXT */}
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left pt-4 md:mt-8 lg:mt-0">
            <h1 className="font-anton font-black italic text-xl md:text-3xl tracking-wide mb-1 text-white drop-shadow-lg leading-tight uppercase">{t.nav.clubName}</h1>
            <p className="font-dm-sans text-[9px] md:text-sm tracking-[0.2em] text-[#CC0000] uppercase font-black mb-4 md:mb-6 drop-shadow-sm">
              GIRLS TRYOUTS • AGES U8-U19
            </p>

            <h2 className="font-anton font-black italic text-[4.5rem] md:text-8xl lg:text-[7.5rem] leading-[1.1] tracking-widest uppercase drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col items-center lg:items-start mb-2">
              <span className="block text-white transform -skew-x-6 relative">
                GIRLS
              </span>
              <span className="block text-[#CC0000] transform -skew-x-6 relative filter drop-shadow-[0_0_15px_rgba(204,0,0,0.5)]">
                TRYOUTS
              </span>
            </h2>
            
            {/* Speed Slash Element */}
            <div className="h-[4px] md:h-[6px] w-16 md:w-24 bg-gradient-to-r from-[#CC0000] to-[#CC0000] my-4 md:my-8 skew-x-[-15deg] shadow-[0_0_20px_rgba(204,0,0,0.5)] lg:block"></div>
            
            {/* SCHEDULE - COMPACT */}
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[480px] self-center lg:self-start mb-4 md:mb-0">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Location 1 */}
                <div className="bg-gradient-to-br from-[#050C1A]/95 to-black/95 border border-[#CC0000]/30 rounded-xl overflow-hidden relative group backdrop-blur-md shadow-lg p-3 md:p-5 aspect-[4/3] sm:aspect-square flex flex-col justify-center items-center sm:items-start">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#CC0000] to-[#CC0000]"></div>
                  <div className="flex flex-col items-center sm:items-start justify-center gap-2 text-center sm:text-left h-full w-full">
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                       <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#CC0000]" />
                       <span className="font-anton tracking-widest text-[#CC0000] text-[11px] md:text-sm uppercase">May 21</span>
                    </div>
                    <div className="flex justify-center sm:justify-start items-center sm:items-start gap-1 sm:gap-2 text-white/90">
                       <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white/50 shrink-0 mt-0.5" />
                       <p className="font-dm-sans text-[10px] md:text-xs lg:text-sm font-semibold leading-snug">1560 Community Way NE<br/> Gainesville</p>
                    </div>
                  </div>
                </div>

                {/* Location 2 */}
                <div className="bg-gradient-to-br from-[#050C1A]/95 to-black/95 border border-[#CC0000]/30 rounded-xl overflow-hidden relative group backdrop-blur-md shadow-lg p-3 md:p-5 aspect-[4/3] sm:aspect-square flex flex-col justify-center items-center sm:items-start">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#CC0000] to-[#CC0000]"></div>
                   <div className="flex flex-col items-center sm:items-start justify-center gap-2 text-center sm:text-left h-full w-full">
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                       <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#CC0000]" />
                       <span className="font-anton tracking-widest text-[#CC0000] text-[11px] md:text-sm uppercase">May 22</span>
                    </div>
                    <div className="flex justify-center sm:justify-start items-center sm:items-start gap-1 sm:gap-2 text-white/90">
                       <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white/50 shrink-0 mt-0.5" />
                       <p className="font-dm-sans text-[10px] md:text-xs lg:text-sm font-semibold leading-snug">1034 Franklin Gateway SE<br/> Marietta</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time display */}
              <div className="flex items-center justify-center sm:justify-start gap-2 md:gap-3 bg-gradient-to-r from-[#CC0000]/20 to-[#CC0000]/20 border border-[#CC0000]/40 rounded-xl px-3 py-2 md:px-4 md:py-3 w-max mx-auto lg:mx-0 backdrop-blur-md shadow-[0_0_15px_rgba(204,0,0,0.15)]">
                 <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#CC0000]" />
                 <span className="font-anton text-lg md:text-2xl tracking-wider text-white">7:30 PM - 9:00 PM</span>
              </div>
            </div>
            
            {/* INLINE LEAGUES DISPLAY - COMPACT MOBILE & COLORED */}
            <div className="mt-4 md:mt-8 w-full max-w-[450px] relative group self-center lg:self-start">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#CC0000] to-[#CC0000] rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-[#050C1A]/80 border-t-2 border-[#CC0000]/60 p-5 md:p-6 rounded-2xl backdrop-blur-xl flex flex-col items-center lg:items-start shadow-[0_10px_40px_rgba(204,0,0,0.3)]">
                <p className="font-dm-sans text-xs md:text-base uppercase font-black text-white tracking-[0.25em] mb-6 flex items-center justify-center lg:justify-start gap-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  <span className="w-5 h-[3px] bg-[#CC0000] hidden md:block shadow-[0_0_10px_#CC0000]"></span>
                  {t.hero.leaguesLabel}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-5 md:gap-8 flex-wrap">
                   {[
                    { src: "https://traccoveredbridge.com/images/leagues/ga_soccer_logo.png", alt: "Georgia Soccer" },
                    { src: "https://traccoveredbridge.com/images/leagues/national_logo.png", alt: "USYS National" },
                    { src: "https://traccoveredbridge.com/images/leagues/ea_logo.png", alt: "EA League" }
                  ].map((logo, idx) => (
                    <div key={idx} className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-110 transition-all duration-300 transform-gpu cursor-pointer group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">
                      <Image src={logo.src} alt={logo.alt} fill className="object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="inline-flex items-center justify-center gap-2 bg-[#CC0000] border border-[#CC0000] text-white rounded-full px-4 py-1.5 md:px-5 md:py-2 mt-5 md:mt-8 shadow-[0_0_20px_rgba(255,20,147,0.4)] animate-pulse-slow lg:self-start text-[10px] md:text-xs">
              <div className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-white"></span>
              </div>
              <span className="font-dm-sans font-bold tracking-wider">
                {t.hero.urgency.replace('4', registeringCount.toString())}
              </span>
            </div>
          </div>

          {/* FORM CARD */}
          <div id="register-form" ref={formRef} className="w-full lg:w-[45%] max-w-[500px] lg:max-w-[550px] px-0 sm:px-4 shrink-0 relative z-30 mt-6 md:mt-0 flex-1 flex flex-col justify-end lg:justify-center pb-4 md:pb-0">
            <div className="bg-[#ffffff] p-5 md:p-8 rounded-2xl md:rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden border-t-[5px] md:border-t-[8px] border-t-[#CC0000] lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              
              {!isSubmitted ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-5 md:mb-6 text-center">
                    <h2 className="font-anton font-black italic text-2xl md:text-3xl tracking-wide mb-1 text-slate-900 uppercase">
                      {t.form.title} <span className="text-[#CC0000]">{t.form.titleAccent}</span>
                    </h2>
                    <p className="font-dm-sans text-[11px] md:text-sm text-slate-500 font-medium">
                      {t.form.subtitle}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5 md:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-5">
                      
                      {/* Location Selector */}
                      <div className="flex flex-col gap-1 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">{t.form.fields.location}</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "Gainesville", label: "Gainesville" },
                            { id: "Marietta", label: "Marietta" }
                          ].map(loc => (
                            <button
                              key={loc.id}
                              type="button"
                              onClick={() => setSelectedLoc(loc.id)}
                              className={`p-2.5 md:p-3 rounded-lg md:rounded-xl border text-[11px] md:text-xs font-bold transition-all ${
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
                      <div className="flex flex-col gap-1 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">{t.form.fields.playerName}</label>
                        <input name="Name" required type="text" className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200" />
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">{t.form.fields.dob}</label>
                        <input name="BirthDate" required type="date" className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">{t.form.fields.parentEmail}</label>
                        <input name="Email" required type="email" className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">City *</label>
                        <input name="City" required type="text" className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200" />
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Zip *</label>
                        <input name="Zip" required type="text" className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200" />
                      </div>

                      {/* Position Custom Selector */}
                      <div className="flex flex-col gap-1 sm:col-span-2 mt-1">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">{t.form.fields.position}</label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-1.5 md:gap-2">
                          {[
                            "Goalkeeper", "Left Back", "Right Back", "Center Back", 
                            "Left Midfield", "Right Midfield", "Center Midfield", "Forward"
                          ].map((pos) => (
                            <button
                              key={pos}
                              type="button"
                              onClick={() => setSelectedPos(pos)}
                              className={`px-2 py-2 rounded-lg border text-[10px] md:text-xs font-bold transition-all flex items-center justify-center text-center leading-tight ${
                                selectedPos === pos 
                                  ? 'bg-[#CC0000] border-[#CC0000] text-white shadow-md scale-[1.02]' 
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
                      <div className="flex flex-col gap-1 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">{t.form.fields.currentClub}</label>
                        <input name="CurrentTeam" type="text" placeholder={t.form.fields.currentClubPlaceholder} className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200" />
                      </div>

                       <div className="flex flex-col gap-1 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">Current Highest Level *</label>
                        <select name="CurrentHighestLevel" required className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200 appearance-none">
                          <option value="" className="text-slate-400">Select Level</option>
                          <option value="Recreational">Recreational</option>
                          <option value="Academy / Select (SCCL, etc)">Academy / Select (SCCL, etc)</option>
                          <option value="DPL / GAL">DPL / GAL</option>
                          <option value="ECNL / ECRL">ECNL / ECRL</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 sm:col-span-2">
                        <label className="font-dm-sans text-[10px] text-slate-700 uppercase font-bold tracking-wider">{t.form.fields.hearAbout}</label>
                        <select name="HearAboutUs" required className="bg-gray-50 text-slate-900 px-3 py-2 md:py-2.5 font-dm-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-all rounded-lg shadow-sm border border-slate-200 appearance-none">
                          <option value="" className="text-slate-400">{t.form.fields.selectHearAbout}</option>
                          {t.form.fields.options.hearAbout.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Consent */}
                      <div className="flex flex-row gap-3 items-start sm:col-span-2 mt-1 bg-slate-50 p-2.5 md:p-3 rounded-lg border border-slate-100">
                        <input type="checkbox" id="consent" name="Consent" required className="mt-1 w-4 h-4 text-[#CC0000] rounded border-gray-300 focus:ring-[#CC0000]" />
                        <label htmlFor="consent" className="font-dm-sans text-[10px] md:text-xs text-slate-600 leading-tight">
                          <strong>Consent *</strong><br/>
                          I consent to having this website store my submitted information so they can respond to my inquiry.
                        </label>
                      </div>

                    </div>

                    <button type="submit" className="w-full h-12 md:h-14 mt-4 md:mt-6 bg-gradient-to-r from-[#CC0000] to-[#CC0000] hover:to-red-700 text-white font-anton text-lg md:text-xl tracking-wide rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_5px_15px_rgba(255,20,147,0.3)] hover:shadow-[0_8px_25px_rgba(255,20,147,0.5)] flex items-center justify-center relative overflow-hidden group">
                      <span className="relative z-10 flex items-center gap-2">{t.form.submit.replace(' →', '')} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 animate-in zoom-in-95 duration-500">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-5 text-[#CC0000]">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="animate-draw-check" strokeDasharray="283" strokeDashoffset="283" style={{ animation: 'draw-check 1s ease-out forwards' }} />
                      <path d="M30 50 L45 65 L70 35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-check" strokeDasharray="100" strokeDashoffset="100" style={{ animation: 'draw-check 0.5s ease-out 0.5s forwards' }} />
                    </svg>
                  </div>
                  <h2 className="font-anton font-black italic text-2xl md:text-3xl tracking-wide mb-2 md:mb-3 text-slate-900 uppercase">{t.form.success.title}</h2>
                  <p className="font-dm-sans text-xs md:text-sm text-slate-600 mb-6 md:mb-8 max-w-sm">
                    {t.form.success.body}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#CC0000] font-dm-sans font-semibold uppercase tracking-wide text-xs hover:text-red-600 transition-colors flex items-center gap-2"
                  >
                    {t.form.success.reset}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
       {/* BELOW THE FOLD */}
      <div className="bg-navy relative z-30">
        
        {/* SECTION 1 - STATS BAR */}
        <section className="py-12 md:py-20 bg-[#050C1A] relative border-t border-red/20">
          {/* Club-colored glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-red to-transparent opacity-50"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red/10 blur-[50px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {[
                { stat: "12+", label: t.stats.years },
                { stat: "300+", label: t.stats.players },
                { stat: "8", label: t.stats.championships },
                { stat: "U9–U19", label: t.stats.ageGroups }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-[#0A1628] group hover:bg-[#0d1d36] transition-colors duration-300 relative overflow-hidden"
                >
                  {/* Red accent line on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  
                  <span className="font-anton font-black italic text-3xl sm:text-4xl lg:text-5xl text-white mb-2 drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                    {item.stat}
                  </span>
                  <span className="font-dm-sans text-[9px] sm:text-[10px] tracking-[0.15em] text-gold uppercase font-bold text-center">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 - VALUE PROPS (BENTO GRID) */}
        <section className="py-24 md:py-32 bg-[#050C1A] relative">
          {/* Background noise/texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,35,42,0.05)_0%,transparent_50%)]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-red"></div>
                  <span className="font-dm-sans text-red font-bold tracking-[0.2em] uppercase text-xs">The Covered Bridge Difference</span>
                </div>
                <h2 className="font-anton font-black italic text-4xl md:text-6xl lg:text-7xl tracking-wide text-white leading-[0.9]">
                  WE DON&apos;T JUST PLAY.<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-red-500">WE DEVELOP.</span>
                </h2>
              </div>
              <p className="font-dm-sans text-gray-400 max-w-sm text-sm md:text-base border-l-2 border-red/30 pl-6 py-2">
                Our methodology is built on proven European standards, designed to push players to their absolute peak potential.
              </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CARD 1: Wide */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 relative rounded-[2rem] overflow-hidden group min-h-[380px] flex flex-col justify-end p-8 md:p-12 border border-white/10 bg-[#0A1628] hover:border-red/50 transition-colors duration-500 shadow-2xl"
              >
                {/* Abstract Background */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-red/20 rounded-full blur-[80px] group-hover:bg-red/30 transition-colors duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-red/10 backdrop-blur-md border border-red/20 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_15px_rgba(232,35,42,0.2)]">
                    <Target className="w-7 h-7 text-red" />
                  </div>
                  <h3 className="font-anton font-black italic text-3xl md:text-4xl text-white mb-3">{t.value.cards[0].title}</h3>
                  <p className="font-dm-sans text-gray-300 md:text-lg max-w-xl leading-relaxed">{t.value.cards[0].body}</p>
                </div>
              </motion.div>

              {/* CARD 2: Square */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-1 relative rounded-[2rem] overflow-hidden group min-h-[380px] flex flex-col justify-end p-8 md:p-10 bg-gradient-to-br from-[#0A1628] to-[#050C1A] border border-white/10 hover:border-gold/50 transition-colors duration-500 shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] group-hover:bg-gold/20 transition-colors duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 backdrop-blur-md border border-gold/20 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
                    <Users className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-anton font-black italic text-2xl md:text-3xl text-white mb-3">{t.value.cards[1].title}</h3>
                  <p className="font-dm-sans text-gray-400 leading-relaxed">{t.value.cards[1].body}</p>
                </div>
              </motion.div>

              {/* CARD 3: Full Width Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:col-span-3 relative rounded-[2rem] overflow-hidden group min-h-[300px] flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 border border-white/10 bg-[#0A1628] hover:border-white/30 transition-colors duration-500 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10 max-w-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-anton font-black italic text-3xl md:text-5xl text-white mb-4">{t.value.cards[2].title}</h3>
                  <p className="font-dm-sans text-gray-300 md:text-lg leading-relaxed">{t.value.cards[2].body}</p>
                </div>
                
                <div className="relative z-10 mt-8 md:mt-0 hidden md:block">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center group-hover:rotate-180 transition-transform duration-1000">
                    <div className="w-12 h-12 rounded-full bg-white text-[#050C1A] flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        

        {/* SECTION - TRAVEL & EXCHANGE PROGRAM */}
        

        {/* SECTION - LEAGUES & CHAMPIONSHIPS */}
        

        {/* SECTION 3 - TESTIMONIALS */}
        <section className="py-20 md:py-32 bg-[#050C1A] relative overflow-hidden border-y border-white/5">
          {/* Background accents */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute -left-40 top-20 w-96 h-96 bg-red/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -right-40 bottom-20 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="font-anton font-black italic text-3xl md:text-5xl tracking-wide text-white mb-4">{t.testimonials.title}</h2>
              <div className="h-[3px] w-16 bg-gold mx-auto rounded-full"></div>
            </motion.div>

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scroll-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll-left {
                animation: scroll-left 40s linear infinite;
              }
              .pause-on-hover:hover .animate-scroll-left {
                animation-play-state: paused;
              }
            `}} />

            <div className="relative w-full overflow-hidden pause-on-hover py-8 mt-4">
              {/* Fading edges for smooth enter/exit */}
              <div className="absolute top-0 left-0 w-16 md:w-40 h-full bg-gradient-to-r from-[#050C1A] to-transparent z-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-16 md:w-40 h-full bg-gradient-to-l from-[#050C1A] to-transparent z-20 pointer-events-none"></div>
              
              <div className="flex w-max animate-scroll-left gap-6 md:gap-8 px-6 md:px-8 group/list">
                {/* Duplicate the array to create a seamless infinite loop */}
                {[...t.testimonials.cards, ...t.testimonials.cards, ...t.testimonials.cards, ...t.testimonials.cards].map((test, i) => (
                  <div 
                    key={i} 
                    className="w-[300px] md:w-[420px] shrink-0 bg-[#0A1628] p-8 rounded-2xl border border-white/5 transition-all duration-500 relative group/card cursor-pointer group-hover/list:opacity-40 hover:!opacity-100 hover:scale-105 hover:bg-[#0d1d36] hover:border-red/50 hover:shadow-[0_10px_40px_-10px_rgba(232,35,42,0.4)] hover:z-30 flex flex-col"
                  >
                    <div className="flex gap-1 mb-6 text-gold">
                      {[1,2,3,4,5].map(star => <span key={star} className="text-lg">★</span>)}
                    </div>
                    <p className="font-dm-sans text-sm md:text-base text-white/80 italic mb-8 leading-relaxed flex-grow">&quot;{test.quote}&quot;</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-[#050C1A] border border-white/10 flex items-center justify-center font-anton font-bold text-lg text-white group-hover/card:text-gold group-hover/card:border-gold/50 transition-colors duration-300">
                        {test.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-dm-sans font-semibold text-white text-sm md:text-[15px]">{test.name}</p>
                        <p className="font-dm-sans text-[10px] text-gold tracking-widest uppercase font-bold">{test.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 - FAQ */}
        <section className="py-20 md:py-32 max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-anton font-black italic text-3xl md:text-5xl tracking-wide text-white mb-4">{t.faq.title}</h2>
            <div className="h-[3px] w-16 bg-red mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            {t.faq.items.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#0A1628] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-colors duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                >
                  <span className="font-dm-sans font-semibold text-sm md:text-[15px] text-white/90 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-red shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-5 md:px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-5 md:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="font-dm-sans text-gray-400 leading-relaxed text-xs md:text-sm">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 5 - FINAL CTA */}
        <section className="py-24 md:py-32 bg-[#0A1628] text-center border-t border-red/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,35,42,0.1)_0%,transparent_60%)]"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6"
          >
            <h2 className="font-anton font-black italic text-4xl md:text-6xl lg:text-7xl tracking-wide mb-6 md:mb-8 text-white drop-shadow-lg">
              {t.cta.line1} <span className="text-red">{t.cta.line2}</span>
            </h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToForm} 
              className="h-14 md:h-16 px-10 md:px-12 bg-red hover:bg-[#AA0000] text-white font-anton font-bold text-xl md:text-2xl tracking-wide rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(204,0,0,0.5)] hover:shadow-[0_0_35px_rgba(204,0,0,0.7)] inline-flex items-center justify-center btn-shimmer"
            >
              {t.cta.button}
            </motion.button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#050C1A] py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image src="https://traccoveredbridge.com/images/logo.png" alt="Logo" width={40} height={40} className="object-contain opacity-50" referrerPolicy="no-referrer" />
              <span className="font-anton font-black italic text-lg tracking-wide text-white/50">{t.nav.clubName}</span>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Social Icons (SVG) */}
              {[
                <svg key="ig" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                <svg key="yt" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
                <svg key="x" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              ].map((icon, i) => (
                <a key={i} href="#" className="text-white/30 hover:text-gold transition-colors">
                  {icon}
                </a>
              ))}
            </div>
            
            <p className="font-dm-sans text-xs text-white/30">
              {t.footer.rights} · {t.footer.email}
            </p>
          </div>
        </footer>
      </div>
    {/* Footer */}
      <footer className="bg-[#050C1A] pt-12 md:pt-16 pb-8 border-t border-[#CC0000]/20 relative z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center">
          <Image 
            src="https://traccoveredbridge.com/images/logo.png" 
            alt="Logo" 
            width={70} 
            height={70} 
            className="object-contain opacity-60 hover:opacity-100 transition-all duration-300 mb-5"
            referrerPolicy="no-referrer"
          />
          <p className="font-dm-sans text-xs md:text-sm text-slate-500 font-medium">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}
