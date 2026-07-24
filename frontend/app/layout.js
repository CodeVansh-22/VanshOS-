import '@/styles/globals.css';
import { Cormorant_Garamond, Playfair_Display, Manrope, Space_Grotesk } from 'next/font/google';
import CursorGlow from '@/components/ui/CursorGlow';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
});

export const metadata = {
  title: 'VanshOS — Vansh Sunil Chauhan | Personal Digital Product',
  description: 'Personal portfolio & admin suite of Vansh Sunil Chauhan, Aspiring Data Analyst & Web Developer. BCA Graduate from YCMOU.',
  keywords: ['Vansh Chauhan', 'VanshOS', 'Data Analyst', 'Web Developer', 'Mumbai', 'BCA', 'YCMOU'],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[#0B0B0B] text-[#FAFAFA] font-body antialiased selection:bg-[#C9A227] selection:text-[#0B0B0B]">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
