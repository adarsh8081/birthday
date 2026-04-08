import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';

import CustomCursor from '@/components/ui/CustomCursor';
import Navigation from '@/components/ui/Navigation';

import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Happy Birthday Ishika | A Special Gift',
  description: 'A warm, elegant, and animated birthday celebration crafted for Ishika.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body>
        {children}
        <Navigation />
        <CustomCursor />
      </body>
    </html>
  );
}
