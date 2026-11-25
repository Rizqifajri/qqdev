"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const word1Ref = useRef<HTMLSpanElement | null>(null);
  const dashRef = useRef<HTMLSpanElement | null>(null);
  const word2Ref = useRef<HTMLSpanElement | null>(null);
  const textGroupRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
        },
      });

      // 1. Minimalist entrance: masked upward reveal + hairline progress
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.1
      )
        .fromTo(
          [word1Ref.current, dashRef.current, word2Ref.current],
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.15
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: "power2.inOut" },
          0.2
        );

      // 2. Measure exact landing hero target position across mobile, tablet, and desktop
      const getTargetTransform = () => {
        const target = document.getElementById("hero-role-target");
        const source = textGroupRef.current;
        if (!target || !source) {
          return { x: 0, y: 0, scale: 1 };
        }

        const sRect = source.getBoundingClientRect();
        const tRect = target.getBoundingClientRect();

        const dx =
          tRect.left + tRect.width / 2 - (sRect.left + sRect.width / 2);
        // Account for .page-enter's initial translateY(8px) before settling
        const dy =
          tRect.top - 8 + tRect.height / 2 - (sRect.top + sRect.height / 2);
        const scale = Math.max(0.75, Math.min(tRect.width / sRect.width, 1.5));

        return { x: dx, y: dy, scale };
      };

      // 3. Fade metadata/progress and glide text directly to the landing title position
      tl.to(
        [metaRef.current, lineRef.current],
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        1.7
      )
        .to(
          dashRef.current,
          { opacity: 0, width: 0, margin: 0, duration: 0.35, ease: "power2.inOut" },
          1.75
        )
        .to(
          textGroupRef.current,
          {
            x: () => getTargetTransform().x,
            y: () => getTargetTransform().y,
            scale: () => getTargetTransform().scale,
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
          },
          1.8
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          2.1
        );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-white text-black px-4 md:px-6 py-5 select-none pointer-events-none"
    >
      {/* Top Minimalist Micro-Header */}
      <div
        ref={metaRef}
        className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400"
      >
        <span>Rizqi Fajri</span>
        <span>Portfolio © 2026</span>
      </div>

      {/* Centerpiece: Creative - Software Developer */}
      <div className="my-auto flex flex-col items-center justify-center">
        <div
          ref={textGroupRef}
          className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4 text-center origin-center"
        >
          <span className="overflow-hidden inline-block">
            <span
              ref={word1Ref}
              className="inline-block text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tighter"
            >
              Creative
            </span>
          </span>

          <span className="overflow-hidden inline-block">
            <span
              ref={dashRef}
              className="inline-block text-2xl sm:text-4xl md:text-5xl font-light text-gray-400"
            >
              —
            </span>
          </span>

          <span className="overflow-hidden inline-block">
            <span
              ref={word2Ref}
              className="inline-block text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tighter"
            >
              Software Developer
            </span>
          </span>
        </div>
      </div>

      {/* Bottom Hairline Progress */}
      <div className="w-full h-[1px] bg-black/10 overflow-hidden">
        <div
          ref={lineRef}
          className="w-full h-full bg-black origin-left"
        />
      </div>
    </div>
  );
}
