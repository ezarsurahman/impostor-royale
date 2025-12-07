import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const crFont = localFont({
  src: '../public/font/cr_font.ttf',
  variable: '--font-cr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Impostor Royale - Clash Royale Party Game",
  description: "Find the impostor card in this fun multiplayer party game! Based on Clash Royale cards. Play with 3-10 friends.",
  keywords: ["impostor royale", "clash royale", "party game", "multiplayer game", "card game", "impostor game"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Impostor Royale - Clash Royale Party Game",
    description: "Find the impostor card! A fun Clash Royale-themed party game for 3-10 players.",
    url: "https://www.improyale.my.id",
    siteName: "Impostor Royale",
    images: [
      {
        url: "/images/improyale-fav.png",
        width: 1200,
        height: 630,
        alt: "Impostor Royale Game"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impostor Royale",
    description: "Find the impostor card in this Clash Royale party game!",
    images: ["/images/improyale-fav.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crFont.variable} antialiased font-cr bg-linear-to-b from-[#00aaff] to-[#002c81] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}


