"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/libs/data.experiences";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const bioText = "Driven by a passion for building impactful and scalable digital solutions, I’ve been crafting modern web applications using clean code and thoughtful design. With hands-on experience in frontend and full-stack development, I enjoy turning ideas into functional products through smooth user interfaces and reliable systems. From internal platforms to AI-powered applications, I’ve worked on real-world projects that solve practical problems. Now, I continue to grow as a software engineer, focusing on delivering meaningful digital experiences through technology.";

export const IntroductionSelf = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Bersihkan semua trigger lama sebelum setup ulang
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    if (!sectionRef.current) return;

    // Reset state elemen agar animasi bisa ulang
    const headings = sectionRef.current.querySelectorAll(".reveal-heading");
    headings.forEach((el) => gsap.set(el, { opacity: 0, y: 30 }));

    const chars = sectionRef.current.querySelectorAll(".char-reveal");
    chars.forEach((char) => gsap.set(char, { opacity: 0.1 }));

    const paragraphs = sectionRef.current.querySelectorAll(".reveal-text-words");
    paragraphs.forEach((paragraph) => {
      // Simpan text asli hanya sekali
      const originalText =
        paragraph.getAttribute("data-original-text") || paragraph.textContent || "";
      paragraph.setAttribute("data-original-text", originalText);

      const words = originalText.trim().split(/\s+/);
      paragraph.innerHTML = words
        .map((word) => `<span class="word-reveal">${word}</span>`)
        .join(" ");

      const wordSpans = paragraph.querySelectorAll(".word-reveal");
      wordSpans.forEach((span) => gsap.set(span, { opacity: 0, y: 20 }));
    });

    // Delay kecil untuk pastikan DOM siap sebelum ScrollTrigger di-refresh
    const timeoutId = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        if (!sectionRef.current) return;

        // 1. Animasi Heading
        const headingEls = sectionRef.current.querySelectorAll(".reveal-heading");
        headingEls.forEach((el) => {
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
                refreshPriority: -1,
              },
            }
          );
        });

        // 2. Animasi per huruf (CSS sticky container + GSAP ScrollTrigger scrub)
        const bioSection = sectionRef.current.querySelector(".bio-pin-section");
        const charEls = sectionRef.current.querySelectorAll(".char-reveal");
        if (bioSection && charEls.length > 0) {
          gsap.fromTo(
            charEls,
            { opacity: 0.1 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: bioSection,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.4,
                refreshPriority: -1,
              },
            }
          );
        }

        // 3. Animasi per kata
        const paragraphEls = sectionRef.current.querySelectorAll(".reveal-text-words");
        paragraphEls.forEach((paragraph) => {
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
                refreshPriority: -1,
              },
            }
          );
        });

        ScrollTrigger.refresh();
      }, sectionRef);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return (
    <div ref={sectionRef} className="flex flex-col">
      <section className="flex flex-col md:pt-32 px-6 sm:px-12 md:px-24">
        {/* BIO SECTION */}
        <div className="bio-pin-section relative h-[220vh]">
          <div className="sticky top-0 min-h-screen flex flex-col justify-center py-12">
            <h1 className="text-center font-light text-sm md:text-md mb-10 md:mb-16 tracking-[0.3em] reveal-heading">
              MYSELF
            </h1>

            <p className="text-left font-light tracking-wide text-lg sm:text-3xl lg:text-4xl mx-auto max-w-9xl">
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
        </div>

        {/* EXPERIENCE SECTION */}
      </section>

      <section className="px-4 md:px-6 py-12 md:py-20 bg-white">
        <h1 className="text-center font-light text-sm md:text-md mt-8 mb-8 md:my-24 tracking-[0.3em] reveal-heading">
          PROFESIONAL EXPERIENCES
        </h1>
        <div className="border-b border-black pb-4 md:pb-8" />

        <div className="flex flex-col">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 md:py-12 border-b border-black/15 md:border-black md:hover:bg-black md:hover:text-white md:hover:px-4 transition-all duration-500"
            >
              <div className="md:col-span-2 flex md:block items-center justify-between">
                <span className="font-mono text-[10px] md:block md:mb-2 opacity-50 md:group-hover:opacity-100">[{exp.id}]</span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 md:text-current">{exp.period}</p>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] md:leading-none mb-1 md:mb-2">
                  {exp.role}
                </h3>
                <p className="text-sm sm:text-base md:text-xl font-medium uppercase opacity-60 md:opacity-50 md:group-hover:opacity-100 tracking-tight">
                  @ {exp.company}
                </p>
              </div>
              <div className="md:col-span-5 flex items-center">
                <p className="text-xs sm:text-sm md:text-lg text-gray-600 md:text-current leading-snug max-w-md">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col px-4 md:px-6">
        {/* TECH SECTION */}
        <div className="flex flex-col items-center pb-16 md:pb-28">
          <h1 className="text-center font-light text-sm md:text-md mt-8 mb-10 md:my-24 tracking-[0.3em] reveal-heading text-gray-400">
            TECHNOLOGIES
          </h1>

          <div className="grid grid-cols-5 md:flex md:flex-wrap md:justify-center gap-4 sm:gap-6 md:gap-10 max-w-5xl w-full justify-items-center">
            {[
              { src: "https://skillicons.dev/icons?i=ts", alt: "TypeScript" },
              { src: "https://skillicons.dev/icons?i=nextjs", alt: "Next.js" },
              { src: "https://skillicons.dev/icons?i=react", alt: "React" },
              { src: "https://skillicons.dev/icons?i=tailwind", alt: "Tailwind CSS" },

              { src: "https://skillicons.dev/icons?i=nestjs", alt: "NestJS" },
              { src: "https://skillicons.dev/icons?i=prisma", alt: "Prisma ORM" },
              { src: "https://skillicons.dev/icons?i=firebase", alt: "Firebase" },
              { src: "https://skillicons.dev/icons?i=go", alt: "Go" },
              { src: "https://skillicons.dev/icons?i=py", alt: "Python" },
              { src: "https://skillicons.dev/icons?i=fastapi", alt: "FastAPI" },
              { src: "https://skillicons.dev/icons?i=docker", alt: "Docker" },
              { src: "https://skillicons.dev/icons?i=git", alt: "Git" },
              { src: "https://skillicons.dev/icons?i=gitlab", alt: "GitLab" },
              { src: "https://skillicons.dev/icons?i=figma", alt: "Figma" },
              { src: "https://skillicons.dev/icons?i=postman", alt: "Postman" },
            ].map((tech, index) => (
              <div
                key={index}
                title={tech.alt}
                className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
              >
                <Image
                  src={tech.src}
                  alt={tech.alt}
                  unoptimized
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-SCREEN CONTACT SECTION */}
      <section
        id="contact"
        className="min-h-screen w-full border-t border-black bg-white text-black flex flex-col justify-between px-4 md:px-6 pt-24 md:pt-28 pb-0 mb-0"
      >
        {/* Top Row: Editorial Intro & Vertical Social Stack */}
        <div className="reveal-heading grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-6 space-y-4">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400">
              {"// Open for Collaborations"}
            </span>
            <p className="text-lg sm:text-xl md:text-2xl font-light leading-snug max-w-md text-black">
              Have a product, system, or idea you&apos;d like to bring to life?
              Always open to meaningful engineering conversations.
            </p>
          </div>

          <div className="md:col-span-6 flex md:justify-end">
            <ul className="w-full md:w-64 flex flex-col">
              {[
                { label: "Email", href: "mailto:rizqifajri51@gmail.com" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/rizqifajri" },
                { label: "GitHub", href: "https://github.com/Rizqifajri" },
                { label: "Instagram", href: "https://www.instagram.com/rizqifajriii" },
                { label: "Medium", href: "https://medium.com/@rizqifajrii" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between py-2.5 border-b border-black/15 hover:border-black transition-colors duration-300 font-mono text-xs uppercase tracking-[0.15em]"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom-Anchored Typographic CTA */}
        <div className="mt-auto pt-12">
          <div className="border-b border-black/15 pb-3 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
            <span>Rizqi Fajri — Based in Jakarta, ID</span>
            <a
              href="mailto:rizqifajri51@gmail.com"
              className="text-black hover:underline"
            >
              rizqifajri51@gmail.com ↗
            </a>
          </div>
          <a
            href="mailto:rizqifajri51@gmail.com"
            className="group block w-full overflow-hidden mb-0 pb-0"
          >
            <h2 className="text-[12.6vw] md:text-[12.8vw] whitespace-nowrap font-bold uppercase tracking-tighter leading-[0.75] mb-0 pb-0 text-black transition-all duration-500 group-hover:opacity-80">
              GET IN TOUCH
            </h2>
          </a>
        </div>
      </section>
    </div>
  );
};