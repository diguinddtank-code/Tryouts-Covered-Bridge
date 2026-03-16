import type { Metadata } from 'next';
import { Anton, DM_Sans } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton'
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-dm-sans' 
});

export const metadata: Metadata = {
  title: 'Covered Bridge SC | Tryouts',
  description: 'Register for Covered Bridge SC Tryouts. Limited spots. Elite coaches. Your next level starts here.',
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans bg-[#050C1A] text-white antialiased selection:bg-red/30 selection:text-white" suppressHydrationWarning>
        <div className="bg-noise"></div>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
