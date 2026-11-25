"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!dotRef.current) return;

    const dot = dotRef.current;
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      gsap.set(dot, { opacity: 1 });
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(target?.closest("a, button, [role='button']"));
      gsap.to(dot, {
        scale: isInteractive ? 1.5 : 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{ opacity: 0 }}
      className="hidden [@media(pointer:fine)]:block fixed top-0 left-0 z-[100] w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none"
    />
  );
};
