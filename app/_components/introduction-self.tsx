"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { experiences } from "@/libs/data.experiences";

gsap.registerPlugin(ScrollTrigger);

const bioText = "DRIVEN BY A PASSION FOR BUILDING IMPACTFUL AND SCALABLE DIGITAL SOLUTIONS, I’VE BEEN CRAFTING MODERN WEB APPLICATIONS USING CLEAN CODE AND THOUGHTFUL DESIGN. WITH HANDS-ON EXPERIENCE IN FRONTEND AND FULL-STACK DEVELOPMENT, I ENJOY TURNING IDEAS INTO FUNCTIONAL PRODUCTS THROUGH SMOOTH USER INTERFACES AND RELIABLE SYSTEMS. FROM INTERNAL PLATFORMS TO AI-POWERED APPLICATIONS, I’VE WORKED ON REAL-WORLD PROJECTS THAT SOLVE PRACTICAL PROBLEMS. NOW, I CONTINUE TO GROW AS A SOFTWARE ENGINEER, FOCUSING ON DELIVERING MEANINGFUL DIGITAL EXPERIENCES THROUGH TECHNOLOGY.";

export const IntroductionSelf = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // --- Setup Lenis Smooth Scroll ---
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

    // --- GSAP Context ---
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // 1. Animasi Heading (Judul Section)
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

      // 2. LOGIKA BARU: SCRUBBING TEXT (Per Huruf)
      const chars = sectionRef.current.querySelectorAll(".char-reveal");
      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          { opacity: 0.1 }, // Mulai samar (0.1)
          {
            opacity: 1,     // Jadi jelas (1)
            ease: "none",
            stagger: 0.1,   // Jarak antar huruf dalam timeline scroll
            scrollTrigger: {
              trigger: chars[0].parentElement, // Trigger: <p> wrapper
              start: "top 75%",                // Mulai animasi
              end: "bottom 50%",               // Selesai animasi
              scrub: 1,                        // Mulus (smooth 1s)
            },
          }
        );
      }

      // 3. Animasi Per Kata (Teknologi / Contact Email)
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

    }, sectionRef);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
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
      {/* BIO SECTION */}
      <div>
        <h1 className="text-center font-light text-md my-24 tracking-[0.3em] reveal-heading">
          MYSELF
        </h1>

        <p className="text-center uppercase font-extrabold md:leading-[2.6rem] tracking-wide text-sm sm:text-3xl lg:text-5xl mx-auto max-w-9xl">
          {bioText.split("").map((char, index) => (
            <span
              key={index}
              className="char-reveal inline-block"
              style={{ minWidth: char === " " ? "0.3em" : "0" }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* EXPERIENCE SECTION */}
      <section className="px-4 md:px-8 py-20 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-8">
          <p className="text-[10px] font-mono mt-4 md:mt-0 max-w-[150px] uppercase text-right text-gray-400">
            // My professional timeline.
          </p>
        </div>

        <div className="flex flex-col">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-12 border-b border-black hover:bg-black hover:text-white transition-all duration-500 px-4"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-[10px] block mb-2 opacity-50 group-hover:opacity-100">[{exp.id}]</span>
                <p className="font-mono text-[10px] uppercase tracking-widest">{exp.period}</p>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-2">
                  {exp.role}
                </h3>
                <p className="text-xl font-medium uppercase opacity-50 group-hover:opacity-100 tracking-tight">
                  @ {exp.company}
                </p>
              </div>
              <div className="md:col-span-5 flex items-center">
                <p className="text-sm md:text-lg leading-snug max-w-md">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH SECTION */}
      <div>
        <h1 className="text-center font-light text-md my-24 tracking-[0.3em] reveal-heading">
          TECHNOLOGIES
        </h1>
        <p className="reveal-text-words text-center uppercase font-extrabold md:leading-[2.6rem] tracking-wide text-sm sm:text-2xl lg:text-5xl mx-auto max-w-9xl">
          TYPESCRIPT / NEXTJS / GSAP / VERCEL / EXPRESS
        </p>
      </div>

      {/* CONTACT SECTION */}
      <div id="contact" className="mb-32 mt-24 scroll-mt-32 md:scroll-mt-40">
        <h1 className="text-center font-light text-md my-12 tracking-[0.3em] reveal-heading text-gray-400">
          GET IN TOUCH
        </h1>
        <div className="flex flex-col items-center justify-center space-y-8">
          <a
            href="https://www.linkedin.com/in/rizqifajri"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-text-words group relative inline-block text-center uppercase font-black tracking-tighter text-xl md:text-5xl leading-none transition-all duration-700 ease-in-out"
          >
            <span className="relative z-10 transition-all duration-700 ease-in-out">
              rizqifajri51@gmail.com
            </span>
            <div className="absolute bottom-[-4px] left-0 h-[2px] w-0 bg-black transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full"></div>
          </a>

          <div className="reveal-heading grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 pt-12 border-t border-gray-100 w-full max-w-5xl">
            {[
              { label: "LINKEDIN", href: "https://www.linkedin.com/in/rizqifajri" },
              { label: "INSTAGRAM", href: "https://www.instagram.com/rizqifajriii" },
              { label: "GITHUB", href: "https://github.com/Rizqifajri" },
              { label: "Medium", href: "https://medium.com/@rizqifajri" },
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
      </div>
    </section>
  );
};