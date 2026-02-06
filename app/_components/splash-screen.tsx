"use client";

import { useEffect, useState } from "react";

const TEXT = "Hello !";
const HOLD_DURATION = 2000; // 3 detik penuh sebelum mulai fade out
const FADE_DURATION = 700; // durasi fade out (ms) dengan efek blur

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, HOLD_DURATION + FADE_DURATION);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="splash-screen fixed inset-0 z-50 flex items-center justify-center bg-white text-black text-5xl font-light">
        <span className="flex gap-1">
          {TEXT.split("").map((char, index) => (
            <span
              key={index}
              className="splash-char inline-block"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </div>

      <style jsx>{`
        .splash-screen {
          animation: splash-fade-out ${FADE_DURATION}ms ease-out ${HOLD_DURATION}ms
            forwards;
        }

        .splash-char {
          animation-name: splash-char-in;
          animation-duration: 600ms;
          animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
          animation-fill-mode: forwards;
        }

        @keyframes splash-char-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes splash-fade-out {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            filter: blur(12px);
          }
        }
      `}</style>
    </>
  );
}


