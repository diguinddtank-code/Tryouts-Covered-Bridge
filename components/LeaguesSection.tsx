"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";

const featuredLeagues = [
  {
    name: "MLS NEXT",
    desc: "The premier development league for elite youth players in North America.",
    logo: "https://images.mlssoccer.com/image/upload/v1664742553/assets/logos/mls-next-2022-COLOR-800x800.png",
    width: 120,
    height: 120,
  },
  {
    name: "USYS NATIONAL",
    desc: "The largest youth soccer organization, providing a proven pathway to excellence.",
    logo: "https://traccoveredbridge.com/images/leagues/national_logo.png",
    width: 110,
    height: 110,
  }
];

const allLogos = [
  { name: "Georgia Soccer", src: "https://traccoveredbridge.com/images/leagues/ga_soccer_logo.png", w: 100, h: 100 },
  { name: "USYS", src: "https://traccoveredbridge.com/images/leagues/national_logo.png", w: 100, h: 100 },
  { name: "EA LEAGUE", src: "https://traccoveredbridge.com/images/leagues/ea_logo.png", w: 100, h: 100 },
  { name: "MLS Next", src: "https://images.mlssoccer.com/image/upload/v1664742553/assets/logos/mls-next-2022-COLOR-800x800.png", w: 100, h: 100 },
  { name: "Nike", src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", w: 140, h: 70, isLarge: true },
];

const stats = [
  { value: "6+", label: "Leagues" },
  { value: "Elite", label: "State & National Level" },
  { value: "U9-U19", label: "All Age Groups" },
];

export default function LeaguesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={sectionRef} className="relative bg-[#02040A] py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Background Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#CC0000]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#CC0000]"></div>
            <span className="font-dm-sans text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-xs">Excellence</span>
            <div className="h-px w-12 bg-[#D4AF37]"></div>
          </div>
          <h2 className="font-anton font-black italic text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide mb-6">
            We Compete at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-red-700">Highest Level</span>
          </h2>
          <p className="font-dm-sans text-gray-400 max-w-2xl mx-auto text-lg">
            Our athletes train and play in the most competitive leagues in the country, ensuring maximum exposure and development.
          </p>
        </motion.div>

        {/* Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 max-w-4xl mx-auto">
          {featuredLeagues.map((league, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="relative p-[1px] rounded-3xl overflow-hidden group"
            >
              {/* Animated Conic Gradient Border */}
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#D4AF37_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Static subtle border when not hovered */}
              <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-transparent transition-colors duration-500"></div>

              {/* Card Content */}
              <div className="relative h-full bg-[#050C1A]/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 flex flex-col items-center text-center z-10">
                <div className="relative w-full h-32 flex items-center justify-center mb-6">
                  {/* Subtle glow behind logo */}
                  <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-colors duration-500"></div>
                  <Image 
                    src={league.logo} 
                    alt={league.name} 
                    width={league.width} 
                    height={league.height} 
                    className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <h3 className="font-anton font-bold text-2xl text-white mb-3 tracking-wide">{league.name}</h3>
                <p className="font-dm-sans text-gray-400 text-sm leading-relaxed">{league.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></motion.div>

        {/* Stats Strip */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-anton font-black text-3xl md:text-4xl text-white mb-1">{stat.value}</span>
              <span className="font-dm-sans text-[#D4AF37] text-xs font-bold tracking-[0.15em] uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></motion.div>

        {/* Marquee */}
        <motion.div variants={itemVariants} className="w-full overflow-hidden mb-20 md:mb-24">
          <div className="marquee-container relative w-full h-32 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Left/Right Fade Masks */}
            <div className="absolute left-0 top-0 w-24 md:w-40 h-full bg-gradient-to-r from-[#02040A] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-24 md:w-40 h-full bg-gradient-to-l from-[#02040A] to-transparent z-20 pointer-events-none"></div>
            
            <div className="marquee-content inline-flex w-max h-full items-center">
              {[...Array(4)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="inline-flex h-full items-center gap-16 md:gap-24 px-8 md:px-12">
                  {allLogos.map((logo, i) => (
                    <div key={`${arrayIndex}-${i}`} className="flex-shrink-0 relative flex items-center justify-center group cursor-pointer" style={{ width: logo.w, height: logo.h }}>
                      <Image 
                        src={logo.src} 
                        alt={logo.name} 
                        fill
                        className={`object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${logo.isLarge ? 'scale-125' : ''}`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <button 
            onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-anton font-bold tracking-widest text-sm uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(204,0,0,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Join a Club That Competes
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}
