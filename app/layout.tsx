import '@/public/styles/index.css';
import type { Metadata } from "next";
import { Noto_Sans_Thai, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/src/presentation/providers/ThemeProvider';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-noto-sans-thai',
  preload: true,
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Stray Pet Adoption | Liquid Glass Experience",
  description: "Find your perfect companion with our high-fidelity adoption platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className={`${notoSansThai.className} font-sans antialiased text-[var(--color-text-primary)]`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
