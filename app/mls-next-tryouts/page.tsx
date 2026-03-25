"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { translations, Language } from "./i18n";
import { Check, ChevronDown, MapPin, Calendar, Clock } from "lucide-react";

const WEBHOOK_URL = "https://webhook.infra-remakingautomacoes.cloud/webhook/mlstryouts"; // Configure webhook URL here

const PLAYMETRICS_URL = "https://playmetrics.com/signup?clubToken=TG9naW4tQ2x1Yi52MS0xMTEzLTE3Nzg1OTk1NTh8WnNxdXA4RGhmaXJKVkU5aE1TcUYxODcwb1hTeXNwR1lZT25QcFUxNm5sdz0=&program_id=95068&fbclid=PAT01DUAQwo8RleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafrZeEPBnKTgWEo6imNW8JVh2II6iFkdxngWiMguSPh0ONjQeIMSDpJxbi3OQ_aem_erpg7MfdbbDrfOy04jsTTA";

const handlePlayMetricsClick = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
  }
};

export default function MLSNextTryouts() {
  const [lang, setLang] = useState<Language>("EN");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-dm-sans selection:bg-red selection:text-white relative overflow-x-hidden">
      {/* Grain Texture */}
      <svg className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.04] mix-blend-overlay z-50">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <Navbar lang={lang} setLang={setLang} t={t} />
      
      <main>
        <Hero t={t} />
        <RegistrationForm t={t} />
        <WhyItMatters t={t} />
        <div className="h-px w-full bg-red/20" />
        <Locations t={t} />
        <div className="h-px w-full bg-red/20" />
        <Timeline t={t} />
        <UrgencyStrip t={t} />
        <FAQ t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}

function Navbar({ lang, setLang, t }: { lang: Language; setLang: (l: Language) => void; t: any }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-red/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image 
            src="https://traccoveredbridge.com/wp-content/uploads/2024/03/Covered_Bridge_logo.png" 
            alt="Covered Bridge SC" 
            width={48} 
            height={48} 
            className="object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="font-anton text-xl tracking-wide hidden sm:block">{t.clubName}</span>
        </div>
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
          {(['EN', 'ES', 'PT'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                lang === l ? 'bg-red text-white shadow-lg' : 'text-white/70 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero({ t }: { t: any }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const targetDate = new Date("May 4, 2025 00:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsStarted(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const headlineWords = t.heroHeadline.split(" ");

  const scrollToForm = () => {
    handlePlayMetricsClick();
    window.open(PLAYMETRICS_URL, '_blank');
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.15)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6 md:gap-10 mb-6"
        >
          <div className="relative w-20 h-20 md:w-28 md:h-28">
            <Image 
              src="https://traccoveredbridge.com/wp-content/uploads/2024/03/Covered_Bridge_logo.png"
              alt="Covered Bridge SC"
              fill
              className="object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="relative w-20 h-20 md:w-28 md:h-28">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
            <Image 
              src="https://images.mlssoccer.com/image/upload/v1664742553/assets/logos/mls-next-2022-COLOR-800x800.png"
              alt="MLS Next"
              fill
              className="object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">
          {t.academyDivision}
        </span>

        {/* Headline */}
        <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight mb-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
          {headlineWords.map((word: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base md:text-xl text-white/80 font-medium mb-8"
        >
          {t.heroSubheadline}
        </motion.p>

        {/* Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8"
        >
          {[t.badgeLocations, t.badgeAges, t.badgeFree].map((badge, i) => (
            <div key={i} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-bold tracking-wide uppercase">
              {badge}
            </div>
          ))}
        </motion.div>

        {/* Countdown */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {isStarted ? (
            <div className="text-2xl md:text-3xl font-anton text-red">{t.tryoutsStarted}</div>
          ) : (
            <div className="flex gap-3 md:gap-6 justify-center">
              {[
                { label: t.days, value: timeLeft.days },
                { label: t.hours, value: timeLeft.hours },
                { label: t.minutes, value: timeLeft.minutes },
                { label: t.seconds, value: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="font-anton text-3xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(204,0,0,0.5)] w-12 md:w-20 text-center">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-[9px] md:text-[10px] text-white/50 tracking-widest mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function WhyItMatters({ t }: { t: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="font-anton text-4xl md:text-5xl mb-6 text-white"
        >
          {t.whyHeadline}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-3xl mx-auto"
        >
          {t.whyBody}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[t.stat1, t.stat2, t.stat3].map((stat, i) => (
            <div key={i} className="px-5 py-3 bg-red/10 text-red border border-red/20 rounded-full font-bold text-sm tracking-wide">
              {stat}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Locations({ t }: { t: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const locations = [
    { name: t.loc1Name, address: t.loc1Address, dates: t.loc1Dates, link: "https://maps.google.com/?q=100+Euharlee+5+Forks+Rd+SW,+Euharlee,+GA+30145", schedule: [{ age: "U13–U14", time: "6:00–7:00pm" }, { age: "U15–U16", time: "7:00–8:00pm" }, { age: "U17–U19", time: "8:00–9:00pm" }] },
    { name: t.loc2Name, address: t.loc2Address, dates: t.loc2Dates, link: "https://maps.google.com/?q=1560+Community+Way+NE,+Gainesville,+GA+30501", schedule: [{ age: "U13–U14", time: "6:00–7:00pm" }, { age: "U15–U16", time: "7:00–8:00pm" }, { age: "U17–U19", time: "8:00–9:00pm" }] },
    { name: t.loc3Name, address: t.loc3Address, dates: t.loc3Dates, link: "https://maps.google.com/?q=1034+Franklin+Gateway+SE,+Marietta,+GA+30067", schedule: [{ age: "U13–U14", time: "6:00–7:30pm" }, { age: "U15–U16", time: "6:00–7:30pm" }, { age: "U17–U19", time: "7:30–9:00pm" }] }
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="font-anton text-4xl md:text-5xl mb-12 text-center"
        >
          {t.locationsHeadline}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/5 border-t-2 border-t-red border-x border-b border-white/10 rounded-xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(204,0,0,0.1)] transition-all duration-300 flex flex-col h-full"
            >
              <h3 className="font-anton text-3xl mb-4 text-white">{loc.name}</h3>
              
              <a href={loc.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/70 hover:text-red transition-colors mb-4 group">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm leading-snug">{loc.address}</span>
              </a>
              
              <div className="flex items-center gap-3 text-white mb-6">
                <Calendar className="w-5 h-5 text-red" />
                <span className="font-bold">{loc.dates}</span>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3 text-white/50 text-sm font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  {t.scheduleTitle}
                </div>
                <ul className="space-y-2">
                  {loc.schedule.map((slot, j) => (
                    <li key={j} className="flex justify-between text-sm">
                      <span className="font-bold text-white/90">{slot.age}</span>
                      <span className="text-white/60">{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline({ t }: { t: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { title: t.step1Title, desc: t.step1Desc },
    { title: t.step2Title, desc: t.step2Desc },
    { title: t.step3Title, desc: t.step3Desc },
    { title: t.step4Title, desc: t.step4Desc },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="font-anton text-4xl md:text-5xl mb-16 text-center"
        >
          {t.timelineHeadline}
        </motion.h2>

        <div className="relative">
          {/* Desktop Line */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-white/10">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-red origin-left"
            />
          </div>

          {/* Mobile Line */}
          <div className="md:hidden absolute top-0 left-6 w-0.5 h-full bg-white/10">
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-red origin-top"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.2) }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-red flex items-center justify-center font-anton text-xl shrink-0 shadow-[0_0_15px_rgba(204,0,0,0.3)]">
                  {i + 1}
                </div>
                <div className="md:text-center mt-1 md:mt-4">
                  <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UrgencyStrip({ t }: { t: any }) {
  const scrollToForm = () => {
    handlePlayMetricsClick();
    window.open(PLAYMETRICS_URL, '_blank');
  };

  return (
    <section className="bg-[#CC0000]/10 border-y border-[#CC0000]/30 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red animate-pulse shadow-[0_0_10px_#CC0000]" />
          <p className="font-bold text-white/90 md:text-lg">{t.urgencyText}</p>
        </div>
        <button 
          onClick={scrollToForm}
          className="shrink-0 px-6 py-3 bg-red hover:bg-red/90 text-white font-bold uppercase tracking-wide rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(204,0,0,0.4)]"
        >
          {t.urgencyBtn}
        </button>
      </div>
    </section>
  );
}

function FAQ({ t }: { t: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
    { q: t.q6, a: t.a6 },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="font-anton text-4xl md:text-5xl mb-12 text-center"
        >
          {t.faqHeadline}
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-red' : 'text-white/50'}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-white/70 leading-relaxed border-t border-white/5 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegistrationForm({ t }: { t: any }) {
  const PLAYMETRICS_URL = "https://playmetrics.com/signup?clubToken=TG9naW4tQ2x1Yi52MS0xMTEzLTE3Nzg1OTk1NTh8WnNxdXA4RGhmaXJKVkU5aE1TcUYxODcwb1hTeXNwR1lZT25QcFUxNm5sdz0=&program_id=95068&fbclid=PAT01DUAQwo8RleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafrZeEPBnKTgWEo6imNW8JVh2II6iFkdxngWiMguSPh0ONjQeIMSDpJxbi3OQ_aem_erpg7MfdbbDrfOy04jsTTA";

  const handlePlayMetricsClick = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  };

  return (
    <section id="register-form" className="pb-24 pt-8 px-4 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-anton text-5xl md:text-6xl mb-4">{t.formHeadline}</h2>
          <p className="text-red font-bold tracking-widest uppercase text-sm">{t.formSubheadline}</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border-t-4 border-t-red border-x border-b border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full">
            <a 
              href={PLAYMETRICS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePlayMetricsClick}
              className="w-full sm:w-auto inline-flex h-12 sm:h-14 px-6 sm:px-10 bg-red hover:bg-[#AA0000] text-white font-anton text-lg sm:text-xl tracking-wide rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(204,0,0,0.4)] items-center justify-center btn-shimmer group"
            >
              <span>{t.submitBtn}</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <p className="mt-4 text-xs sm:text-sm text-white/50 font-medium flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure registration via PlayMetrics
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ t }: { t: any }) {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Image 
          src="https://traccoveredbridge.com/wp-content/uploads/2024/03/Covered_Bridge_logo.png" 
          alt="Logo" 
          width={40} 
          height={40} 
          className="opacity-50 mb-6 grayscale hover:grayscale-0 transition-all"
          referrerPolicy="no-referrer"
        />
        <p className="text-white/40 text-sm font-bold tracking-wider uppercase">
          {t.footerText}
        </p>
      </div>
    </footer>
  );
}
