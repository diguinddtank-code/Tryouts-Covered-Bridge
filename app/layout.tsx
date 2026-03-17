import type { Metadata } from 'next';
import { Anton, DM_Sans } from 'next/font/google';
import Script from 'next/script';
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
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1070545399813605');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-dm-sans bg-[#050C1A] text-white antialiased selection:bg-red/30 selection:text-white" suppressHydrationWarning>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1070545399813605&ev=PageView&noscript=1" alt="" />
        </noscript>
        <div className="bg-noise"></div>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
