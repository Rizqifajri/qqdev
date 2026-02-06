import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NaviagationMenu } from "./_components/navigation-menu";
import { Footer } from "./_components/footer";
import { SplashScreen } from "./_components/splash-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rizqi Fajri Dev Portfolio",
  description: "Creative Software Developer - Portfolio of Rizqi Fajri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashScreen />
        {/* Navigation - Top (selalu terlihat, tidak ikut fade-in) */}
        <NaviagationMenu />
        <div className="relative page-enter">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
