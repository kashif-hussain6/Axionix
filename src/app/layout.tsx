import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SplashScreen } from "@/components/providers/SplashScreen";

/** Primary UI + headings — geometric, premium feel (replaces generic Inter site-wide). */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axionix X — Innovate. Build. Transform.",
  description:
    "Axionix X is an innovative tech and skill development company providing digital services and professional training programs.",
  keywords: ["tech", "skill development", "digital services", "training", "UX", "software development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased noise bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SplashScreen>{children}</SplashScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}
