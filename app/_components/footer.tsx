"use client";
import { useEffect, useState } from "react";

export const Footer = () => {
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
    const interval = setInterval(updateTime, 10000); // Update setiap 10 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reveal-heading flex flex-col md:flex-row justify-between items-center mt-32 pt-8 border-t border-gray-100 font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em] w-full p-24">
      <p className="hover:text-black transition-colors duration-300 cursor-default">
        © 2026 RIZQI FAJRI — ALL RIGHTS RESERVED
      </p>
      
      <p className="my-4 md:my-0 hover:text-black transition-colors duration-300 cursor-default">
        JAKARTA, ID — {time}
      </p>
      
      <p className="hover:text-black transition-colors duration-300 cursor-default">
        DESIGNED & BUILT BY RIZQI FAJRI
      </p>
    </div>
  );
};