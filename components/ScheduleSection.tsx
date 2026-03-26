import { motion } from "motion/react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ScheduleSection() {
  const { t } = useLanguage();

  const locations = [
    {
      name: "Cumming",
      address: "1270 Sawnee Dr, Cumming, GA 30040",
      dates: "May 12 & 14",
      times: [
        { age: "2021-2012", time: "6:00pm - 7:30pm" },
        { age: "2011-2007", time: "7:30pm - 9:00pm" }
      ]
    },
    {
      name: "Euharlee",
      address: "100 Euharlee 5 Forks Rd SW Euharlee, GA 30145",
      dates: "May 16 & 17",
      times: [
        { age: "2021-2012", time: "1:00pm - 2:30pm" },
        { age: "2011-2007", time: "2:30pm - 4:00pm" }
      ]
    },
    {
      name: "Gainesville",
      address: "1560 Community Way NE, Gainesville, GA 30501",
      dates: "May 11 & 13",
      times: [
        { age: "2021-2012", time: "6:00pm - 7:30pm" },
        { age: "2011-2007", time: "7:30pm - 9:00pm" }
      ]
    },
    {
      name: "Marietta",
      address: "1034 Franklin Gateway SE, Marietta, GA 30067",
      dates: "May 15",
      times: [
        { age: "2021-2012", time: "6:00pm - 7:30pm" },
        { age: "2011-2007", time: "7:30pm - 9:00pm" }
      ]
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -left-40 top-20 w-96 h-96 bg-red/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -right-40 bottom-20 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold tracking-widest text-white/70 mb-6 uppercase">
            {t.schedule?.tag || "Tryout Schedule"}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase">
            {t.schedule?.title || "DATES & LOCATIONS"}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t.schedule?.subtitle || "Find the closest location and register for your age group's tryout session."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">
                {loc.name}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70">{loc.address}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70 font-bold">{loc.dates}</p>
                </div>
                
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {loc.times.map((timeBlock, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Born {timeBlock.age}</span>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <Clock className="w-4 h-4 text-white/40" />
                        {timeBlock.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
