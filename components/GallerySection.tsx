"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Category = "All" | "Athletes" | "Training" | "Travel" | "Matches";

interface GalleryItem {
  id: string;
  category: Category;
  src: string;
  title: string;
  className: string;
}

const galleryItems: GalleryItem[] = [
  { id: "01", category: "Training", src: "https://picsum.photos/seed/gallery-01/800/1000", title: "Morning Drills", className: "col-span-2 row-span-2" },
  { id: "02", category: "Athletes", src: "https://picsum.photos/seed/gallery-02/800/800", title: "Focus", className: "col-span-1 row-span-1" },
  { id: "03", category: "Matches", src: "https://picsum.photos/seed/gallery-03/1000/800", title: "Derby Day", className: "col-span-1 row-span-1 md:col-span-2" },
  { id: "04", category: "Travel", src: "https://picsum.photos/seed/gallery-04/800/1200", title: "Away Game", className: "col-span-1 row-span-2" },
  { id: "05", category: "Training", src: "https://picsum.photos/seed/gallery-05/800/800", title: "Tactical Session", className: "col-span-1 row-span-1" },
  { id: "06", category: "Athletes", src: "https://picsum.photos/seed/gallery-06/800/800", title: "Recovery", className: "col-span-1 row-span-1" },
  { id: "07", category: "Matches", src: "https://picsum.photos/seed/gallery-07/1200/800", title: "Championship", className: "col-span-2 row-span-2" },
  { id: "08", category: "Athletes", src: "https://picsum.photos/seed/gallery-08/800/1000", title: "New Signing", className: "col-span-1 row-span-2" },
  { id: "09", category: "Training", src: "https://picsum.photos/seed/gallery-09/800/800", title: "Weight Room", className: "col-span-1 row-span-1" },
  { id: "10", category: "Travel", src: "https://picsum.photos/seed/gallery-10/1000/800", title: "Airport Bound", className: "col-span-1 row-span-1 md:col-span-2" },
  { id: "11", category: "Matches", src: "https://picsum.photos/seed/gallery-11/800/800", title: "Celebration", className: "col-span-1 row-span-1" },
  { id: "12", category: "Athletes", src: "https://picsum.photos/seed/gallery-12/800/800", title: "Captain", className: "col-span-1 row-span-1" },
];

const categories: Category[] = ["All", "Athletes", "Training", "Travel", "Matches"];

// Tilt Card Component for the parallax depth effect
function TiltCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`relative w-full h-full rounded-xl overflow-hidden cursor-pointer group ${item.className}`}
      style={{ perspective: 1000 }}
      onClick={onClick}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full origin-center"
      >
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Dark gradient overlay slides up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A]/90 via-[#050C1A]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Label fades in */}
        <div 
          className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-8 h-1 bg-red mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
          <h4 className="font-anton text-2xl md:text-3xl text-white tracking-wide uppercase drop-shadow-lg">
            {item.title}
          </h4>
          <p className="font-dm-sans text-white/70 text-xs font-bold tracking-widest uppercase mt-1">
            {item.category}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  // Lightbox navigation
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const headline = "BUILT DIFFERENT. TRAINED DIFFERENT.";
  const words = headline.split(" ");

  return (
    <section className="relative bg-[#030712] py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Noise Texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay z-0">
        <filter id="gallery-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#gallery-noise)" />
      </svg>

      {/* Marquee Background */}
      <div className="absolute top-10 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex">
        <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] font-anton text-[10rem] leading-none text-white">
          ATHLETES · TRAINING · EXCELLENCE · RESULTS · TRYOUTS · ATHLETES · TRAINING · EXCELLENCE · RESULTS · TRYOUTS · 
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-red"></div>
            <span className="font-dm-sans text-red font-bold tracking-[0.2em] uppercase text-xs">Our Club</span>
            <div className="h-px w-8 bg-red"></div>
          </div>
          
          <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wide flex flex-wrap justify-center gap-x-3 gap-y-1">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2 rounded-full font-dm-sans text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
                activeCategory === category ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[250px] grid-flow-dense">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <TiltCard 
                key={item.id} 
                item={item} 
                onClick={() => openLightbox(index)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/95 backdrop-blur-xl p-4 md:p-8"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              className="absolute left-4 md:left-10 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button 
              className="absolute right-4 md:right-10 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain bg-black/50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-anton text-3xl md:text-5xl text-white tracking-wide uppercase">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="font-dm-sans text-red font-bold tracking-widest uppercase text-sm mt-2">
                  {filteredItems[lightboxIndex].category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
