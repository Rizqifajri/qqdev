"use client";

import { projects } from "@/libs/data.works";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WorksPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !listRef.current) return;

    const ctx = gsap.context(() => {
      const rawText = headingRef.current?.textContent || "";
      if (headingRef.current && rawText.length > 0) {
        headingRef.current.innerHTML = rawText
          .split("")
          .map(
            (char) =>
              `<span class="char-reveal inline-block">${char === " " ? "&nbsp;" : char}</span>`
          )
          .join("");

        const charSpans = headingRef.current.querySelectorAll(".char-reveal");
        gsap.fromTo(
          charSpans,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "power3.out",
          }
        );
      }

      const rows = listRef.current?.querySelectorAll(".work-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={sectionRef} className="bg-white text-black min-h-screen font-sans">
      <section className="pt-20 md:pt-28 px-4 md:px-6 pb-20">
        {/* Header aligned flush with NavigationMenu (px-4 md:px-6) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black pb-6 gap-4">
          <h1
            ref={headingRef}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-none"
          >
            Works
          </h1>
          <div className="flex items-center justify-between w-full md:w-auto gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
            <span>{"// Selected Projects"}</span>
            <span className="text-black">[0{projects.length}]</span>
          </div>
        </div>

        {/* Minimalist Typographic List with Hover Description Marquee */}
        <div ref={listRef} className="flex flex-col">
          {projects.map((project) => (
            <Link
              href={`/works/${project.id}`}
              key={project.id}
              className="work-row group relative overflow-hidden border-b border-black/15 md:hover:border-black md:hover:bg-black md:hover:text-white transition-colors duration-300"
            >
              {/* Default Row Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 md:gap-6 py-6 md:py-9 items-baseline transition-opacity duration-200 md:group-hover:opacity-0">
                {/* Index & Year (+ mobile View CTA) */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-start gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  <div className="flex items-center gap-3">
                    <span>[{project.id}]</span>
                    <span>{project.year}</span>
                  </div>
                  <span className="md:hidden inline-flex items-center gap-1 text-black">
                    View <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Project Title */}
                <div className="md:col-span-5">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[0.95] md:leading-none">
                    {project.title}
                  </h2>
                </div>

                {/* Category & Client */}
                <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-400">
                  <span>{project.category}</span>
                  <span className="mx-2">/</span>
                  <span>{project.client}</span>
                </div>

                {/* Desktop Action Arrow */}
                <div className="hidden md:flex md:col-span-2 justify-end items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  <span>View</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Hover Looping Marquee (Desktop) */}
              <div
                aria-hidden="true"
                className="hidden md:flex items-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none overflow-hidden"
              >
                <div className="flex w-max animate-marquee whitespace-nowrap">
                  {[0, 1, 2, 3].map((copyIdx) => (
                    <span
                      key={copyIdx}
                      className="text-2xl md:text-4xl font-semibold tracking-tight pr-12"
                    >
                      {project.description}
                      <span className="mx-8 opacity-40">—</span>
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
