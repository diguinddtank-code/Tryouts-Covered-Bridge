"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, animate } from "motion/react";

function AnimatedCounter({ from, to, suffix, duration = 2 }: { from: number, to: number, suffix: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return controls.stop;
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const destinations = [
  { city: "Barcelona", country: "Spain", desc: "Tactical mastery in the heart of Catalonia.", img: "https://picsum.photos/seed/bcn/800/1000" },
  { city: "Miami", country: "USA", desc: "High-intensity training under the sun.", img: "https://picsum.photos/seed/miami/800/1000" },
  { city: "São Paulo", country: "Brazil", desc: "Raw talent and technical flair.", img: "https://picsum.photos/seed/saopaulo/800/1000" },
  { city: "London", country: "UK", desc: "Physicality and pace of the English game.", img: "https://picsum.photos/seed/london/800/1000" },
  { city: "Lisbon", country: "Portugal", desc: "European technical development.", img: "https://picsum.photos/seed/lisbon/800/1000" },
];

const benefits = [
  { icon: "🌍", title: "International Exposure", desc: "Play against top academies and experience different football cultures." },
  { icon: "🤝", title: "Global Scouting Network", desc: "Get seen by international scouts and build your professional network." },
  { icon: "✈️", title: "Full Logistics Support", desc: "Flights, accommodation, and premium meals completely sorted." },
];

export default function TravelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const scrollWidth = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    if (scrollWidth === 0) return;
    const progress = scrollLeft / scrollWidth;
    const index = Math.round(progress * (destinations.length - 1));
    setActiveIndex(index);
  };

  const headline = "THE WORLD IS YOUR TRAINING GROUND";
  const words = headline.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={containerRef} className="relative bg-[#0A0A0A] text-white py-24 md:py-32 overflow-hidden">
      {/* Grain Texture Overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay z-0">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Intro Parallax Background */}
      <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden opacity-30 pointer-events-none">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src="https://picsum.photos/seed/stadium-lights/1920/1080" 
            alt="Stadium Lights" 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/80 to-[#0A0A0A]"></div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Headline */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#CC0000]"></div>
            <span className="font-dm-sans text-[#E5FF00] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
              International Exchange Program
            </span>
          </div>
          <h2 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] uppercase tracking-wide flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-32 border-y border-white/10 py-10">
          {[
            { from: 0, to: 12, suffix: "+", label: "Countries Visited" },
            { from: 0, to: 200, suffix: "+", label: "Athletes Sent" },
            { from: 0, to: 5, suffix: " Years", label: "Of Global Exchange" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-start md:items-center text-left md:text-center">
              <div className="font-anton text-5xl md:text-7xl text-[#E5FF00] mb-2">
                <AnimatedCounter from={stat.from} to={stat.to} suffix={stat.suffix} />
              </div>
              <div className="font-dm-sans text-gray-400 uppercase tracking-widest text-sm font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-end justify-between mb-8">
            <h3 className="font-anton text-4xl md:text-5xl">DESTINATIONS</h3>
            <div className="hidden md:flex gap-2">
              {destinations.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#E5FF00]' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
          </div>
          
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((dest, i) => (
              <div 
                key={i} 
                className="relative shrink-0 w-[85vw] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-2xl overflow-hidden snap-center group cursor-pointer"
              >
                <Image 
                  src={dest.img} 
                  alt={dest.city} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-[#E5FF00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-dm-sans text-[#E5FF00] font-bold tracking-widest text-xs uppercase mb-2">{dest.country}</p>
                  <h4 className="font-anton text-4xl md:text-5xl text-white mb-2">{dest.city}</h4>
                  <p className="font-dm-sans text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {dest.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-2">
            {destinations.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#E5FF00]' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
        </div>

        {/* Benefits & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-anton text-2xl md:text-3xl text-white mb-2 tracking-wide">{benefit.title}</h4>
                  <p className="font-dm-sans text-gray-400 leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5FF00]/10 rounded-full blur-[80px] pointer-events-none"></div>
            <h3 className="font-anton text-3xl md:text-4xl lg:text-5xl text-white mb-4 relative z-10">READY TO PACK YOUR BAGS?</h3>
            <p className="font-dm-sans text-gray-400 mb-8 relative z-10 max-w-md mx-auto">
              Join the elite few who train, compete, and get scouted on the global stage. Your international journey starts with a single tryout.
            </p>
            <button 
              onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-[#E5FF00] hover:bg-white text-black font-anton text-xl tracking-wide rounded-full transition-colors duration-300 shadow-[0_0_30px_rgba(204,0,0,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              APPLY NOW & EXPLORE THE WORLD
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
