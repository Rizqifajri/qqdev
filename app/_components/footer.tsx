"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="bg-black text-white w-full px-4 md:px-6 pt-14 pb-8 border-t border-black">
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
        {/* Brand & Direct Email */}
        <div className="md:col-span-6 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
              {"// Get In Touch"}
            </span>
            <p className="text-xl sm:text-2xl font-light leading-snug max-w-md text-white/90">
              Creative software developer crafting scalable web applications and thoughtful interfaces.
            </p>
          </div>
          <a
            href="mailto:rizqifajri51@gmail.com"
            className="group inline-flex items-center gap-2 text-lg sm:text-2xl font-bold uppercase tracking-tighter text-white w-fit"
          >
            <span className="border-b border-white/30 group-hover:border-white transition-colors duration-300">
              rizqifajri51@gmail.com
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3 space-y-4">
          <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
            Navigation
          </span>
          <ul className="flex flex-col gap-2.5 font-mono text-xs uppercase tracking-[0.15em]">
            {[
              { label: "Bio", href: "/" },
              { label: "Works", href: "/works" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors duration-200 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Local Time */}
        <div className="md:col-span-3 space-y-4">
          <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
            Connect
          </span>
          <ul className="flex flex-col gap-2.5 font-mono text-xs uppercase tracking-[0.15em]">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/rizqifajri" },
              { label: "GitHub", href: "https://github.com/Rizqifajri" },
              { label: "Instagram", href: "https://www.instagram.com/rizqifajriii" },
              { label: "Medium", href: "https://medium.com/@rizqifajrii" },
            ].map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </li>
            ))}
          </ul>
          <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Jakarta, ID — {time}
          </p>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        <p>© 2026 Rizqi Fajri — All Rights Reserved</p>
        <p>Designed &amp; Built by Rizqi Fajri</p>
      </div>
    </footer>
  );
};
