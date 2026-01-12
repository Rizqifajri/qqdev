"use client";

import { projects } from "@/libs/data.works";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorksPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Text reveal animation for "Works" heading
      const headingChars = headingRef.current?.textContent?.split("") || [];
      if (headingRef.current && headingChars.length > 0) {
        headingRef.current.innerHTML = headingChars
          .map((char) => `<span class="char-reveal inline-block">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        const charSpans = headingRef.current.querySelectorAll(".char-reveal");
        gsap.fromTo(
          charSpans,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Card animation - fade in with stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("a");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={sectionRef} className="bg-white text-black min-h-screen font-sans">
      {/* WORKS SECTION */}
      <section className="px-4 md:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-8">
          <h2
            ref={headingRef}
            className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-none"
          >
            Works
          </h2>
          <p className="text-[10px] font-mono mt-4 md:mt-0 max-w-[150px] uppercase text-right">
            {"// Selected digital craftsmanship."}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0 border-l border-t border-black"
        >
          {projects.map((project) => (
            <Link
              href={`/works/${project.id}`}
              key={project.id}
              className="group relative border-r border-b border-black cursor-pointer overflow-hidden bg-white"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex justify-between items-end group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <div>
                  <span className="text-[10px] font-mono mb-2 block">[{project.id}]</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter leading-tight">{project.title}</h3>
                  <p className="text-[10px] uppercase font-medium text-gray-400 group-hover:text-gray-300">
                    {project.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Area for Spacing */}
      <div className="h-32 bg-white"></div>
    </main>
  );
}