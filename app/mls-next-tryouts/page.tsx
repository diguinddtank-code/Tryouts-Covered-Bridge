"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { translations, Language } from "./i18n";
import { Check, ChevronDown, MapPin, Calendar, Clock } from "lucide-react";

const WEBHOOK_URL = "https://webhook.infra-remakingautomacoes.cloud/webhook/mlstryouts"; // Configure webhook URL here

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
    document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth" });
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
    document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth" });
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState("");
  const [selectedPos, setSelectedPos] = useState("");

  const positions = [
    t.posGK, t.posLB, t.posRB, t.posCB, 
    t.posLM, t.posRM, t.posCM, t.posFW
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <section id="register-form" className="pb-24 pt-8 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border-t-4 border-t-red border-x border-b border-white/10 rounded-2xl p-12 text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-anton text-4xl mb-4">{t.successTitle}</h3>
            <p className="text-white/60 mb-8">{t.successSub}</p>
            <Image 
              src="https://traccoveredbridge.com/wp-content/uploads/2024/03/Covered_Bridge_logo.png" 
              alt="Logo" 
              width={60} 
              height={60} 
              className="opacity-50"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>
    );
  }

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
          className="bg-white/5 border-t-4 border-t-red border-x border-b border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input type="checkbox" name="consent" required className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-white/30 rounded bg-transparent peer-checked:bg-red peer-checked:border-red transition-all group-hover:border-white/50" />
                <Check className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className="text-sm text-white/70 leading-relaxed">{t.consent}</span>
            </label>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-3">{t.locationLabel} *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: "euharlee", label: "Euharlee — May 5 & 7" },
                  { id: "gainesville", label: "Gainesville — May 4 & 6" },
                  { id: "marietta", label: "Marietta — May 8" }
                ].map(loc => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLoc(loc.id)}
                    className={`p-4 rounded-xl border text-sm font-bold transition-all ${
                      selectedLoc === loc.id 
                        ? 'bg-red border-red text-white shadow-[0_0_15px_rgba(204,0,0,0.3)]' 
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
              {/* Hidden input for form validation */}
              <input type="text" name="location" required value={selectedLoc} onChange={() => {}} className="sr-only" />
            </div>

            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">{t.playerInfoLabel}</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">{t.nameLabel} *</label>
                <input type="text" name="playerName" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">{t.dobLabel} *</label>
                <input type="date" name="dob" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all [color-scheme:dark]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">{t.emailLabel} *</label>
                <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">{t.cityLabel} *</label>
                <input type="text" name="city" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">{t.zipLabel} *</label>
                <input type="text" name="zip" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all" />
              </div>
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-3">{t.positionLabel} *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {positions.map(pos => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={pos}
                    type="button"
                    onClick={() => setSelectedPos(pos)}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                      selectedPos === pos 
                        ? 'bg-red border-red text-white shadow-[0_0_10px_rgba(204,0,0,0.3)]' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {pos}
                  </motion.button>
                ))}
              </div>
              <input type="text" name="position" required value={selectedPos} onChange={() => {}} className="sr-only" />
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">{t.hearLabel} *</label>
                <input type="text" name="hearAbout" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">
                  {t.teamLabel} <span className="text-white/30 normal-case font-normal ml-1">({t.optional})</span>
                </label>
                <input type="text" name="team" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-white/50 mb-2">{t.levelLabel} *</label>
                <input type="text" name="level" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red focus:shadow-[0_0_0_2px_rgba(204,0,0,0.3)] transition-all" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full min-h-[56px] bg-red hover:bg-red/90 text-white font-bold text-lg tracking-widest uppercase rounded-lg transition-all hover:shadow-[0_0_20px_rgba(204,0,0,0.4)] relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {isSubmitting ? "..." : t.submitBtn}
            </button>

          </form>
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
