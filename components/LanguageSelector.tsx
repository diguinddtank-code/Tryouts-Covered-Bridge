'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/translations';

interface LanguageSelectorProps {
  isMobile?: boolean;
}

export default function LanguageSelector({ isMobile = false }: LanguageSelectorProps) {
  const { locale, setLocale } = useLanguage();

  const languages: { code: Locale; flag: string; label: string }[] = [
    { code: 'en', flag: '🇺🇸', label: 'EN' },
    { code: 'es', flag: '🇪🇸', label: 'ES' },
    { code: 'pt', flag: '🇧🇷', label: 'PT' },
  ];

  return (
    <div className={`flex ${isMobile ? 'gap-1' : 'gap-2 p-1 bg-black/40 backdrop-blur-sm absolute top-6 right-6 z-50 rounded-lg'}`}>
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`flex items-center ${isMobile ? 'gap-1' : 'gap-1.5'} transition-all duration-200 ${
              isMobile ? 'px-2 py-1 rounded-md' : 'px-3 py-1.5 rounded-md'
            } ${
              isActive
                ? 'bg-red border border-red text-white opacity-100'
                : 'bg-transparent border border-white/15 text-white/60 opacity-60 hover:opacity-80'
            }`}
          >
            <span className={isMobile ? 'text-[16px]' : 'text-[20px]'}>{lang.flag}</span>
            <span className={`font-dm-sans font-bold tracking-widest ${isMobile ? 'text-[11px]' : 'text-[13px]'}`}>
              {lang.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
