"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export const IntroductionSelf = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const headings = sectionRef.current.querySelectorAll(".reveal-heading");
      headings.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      const paragraphs = sectionRef.current.querySelectorAll(".reveal-text-words");
      paragraphs.forEach((paragraph) => {
        if (paragraph.getAttribute("data-words-ready") === "true") return;
        const text = paragraph.textContent || "";
        const words = text.trim().split(/\s+/);

        paragraph.innerHTML = words
          .map((word) => `<span class="word-reveal">${word}</span>`)
          .join(" ");
        paragraph.setAttribute("data-words-ready", "true");

        const wordSpans = paragraph.querySelectorAll(".word-reveal");
        gsap.fromTo(
          wordSpans,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 70%",
              markers: false,
            },
          }
        );
      });

      const elements = sectionRef.current.querySelectorAll(".reveal-text:not(.reveal-text-words)");
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:pt-32 px-6 sm:px-12 md:px-24"
    >
      <div>
        <h1 className="text-center font-light text-md my-24 tracking-[0.3em] reveal-heading">
          MYSELF
        </h1>

        <p className="reveal-text-words text-center uppercase font-extrabold md:leading-[2.6rem] tracking-wide text-sm sm:text-3xl lg:text-5xl mx-auto max-w-9xl">
          DRIVEN BY THE DESIRE TO CREATE UNIQUE AND MEMORABLE DIGITAL EXPERIENCES, I&rsquo;VE
          BUILT A CAREER IN CREATIVE DEVELOPMENT — BRINGING PIXELS TO LIFE WITH STYLE AND
          PURPOSE. RECOGNIZED FOR MY SENSE OF SMOOTH ANIMATIONS AND ENGAGING
          INTERACTIONS, I&rsquo;VE HAD THE CHANCE TO WORK WITH AMAZING COMPANIES WORLDWIDE.
          NOW, AS A CO-FOUNDER OF PROPAGANDE, OUR NEW CREATIVE WEB DEVELOPMENT STUDIO,
          I&rsquo;M TAKING THINGS TO THE NEXT LEVEL. CHECK OUT MY WORK AND SEE WHERE THIS
          JOURNEY HAS TAKEN ME.
        </p>
      </div>

      <div>
        <h1 className="text-center font-light text-md my-24 tracking-[0.3em] reveal-heading">
          TECHNOLOGIES
        </h1>

        <p className="reveal-text-words text-center uppercase font-extrabold md:leading-[2.6rem] tracking-wide text-sm sm:text-2xl lg:text-5xl mx-auto max-w-9xl">
          TYPESCRIPT / NEXTJS / GSAP / VERCEL / EXPRESS
        </p>
      </div>

      {/* CONTACT SECTION */}
      <div className="mb-32 mt-24">
        <h1 className="text-center font-light text-md my-12 tracking-[0.3em] reveal-heading text-gray-400">
          GET IN TOUCH
        </h1>

        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Email Besar dengan Hover Effect */}
          <a
            href="mailto:rizqifajri51@gmail.com"
            className="reveal-text-words group relative inline-block text-center uppercase font-black tracking-tighter text-xl md:text-5xl  leading-none transition-all duration-700 ease-in-out"
          >
            {/* Hilangkan class 'underline' di sini agar tidak tabrakan dengan animasi */}
            <span className="relative z-10 transition-all duration-700 ease-in-out">
              rizqifajri51@gmail.com
            </span>

            {/* Garis bawah animasi: Pastikan ada h-[2px] dan duration yang pas */}
            <div className="absolute bottom-[-4px] left-0 h-[2px] w-0 bg-black transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full"></div>
          </a>

          {/* Social Links Grid */}
          <div className="reveal-heading grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 pt-12 border-t border-gray-100 w-full max-w-5xl">
            {[
              { label: "LINKEDIN", href: "#" },
              { label: "INSTAGRAM", href: "#" },
              { label: "TWITTER", href: "#" },
              { label: "GITHUB", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] py-4 border border-transparent hover:border-black transition-all duration-300 uppercase"
              >
                {social.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Footer Credit ala Agency
        <div className="reveal-heading flex flex-col md:flex-row justify-between items-center mt-32 pt-8 border-t border-gray-100 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
          <p>© 2026 RIZQI FAJRI — ALL RIGHTS RESERVED</p>
          <p>JAKARTA, ID — 1:31 AM</p>
          <p>DESIGNED BY RIZQI FAJRI</p>
        </div> */}
      </div>
    </section>
  );
};
