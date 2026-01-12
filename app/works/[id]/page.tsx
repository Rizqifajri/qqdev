"use client";

import { projects } from "@/libs/data.works";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
  const project = projects.find((p) => p.id === id);
  const mainRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const nextProjectRef = useRef<HTMLAnchorElement | null>(null);

  if (!project) notFound();

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    if (!mainRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Text reveal animation for title
      const titleText = titleRef.current?.textContent || "";
      if (titleRef.current && titleText.length > 0) {
        const words = titleText.split(" ");
        titleRef.current.innerHTML = words
          .map((word) => `<span class="word-reveal inline-block">${word}</span>`)
          .join(" ");

        const wordSpans = titleRef.current.querySelectorAll(".word-reveal");
        gsap.fromTo(
          wordSpans,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Info sections animation
      if (infoRef.current) {
        const infoItems = infoRef.current.querySelectorAll("div");
        gsap.fromTo(
          infoItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Images gallery animation
      if (imagesRef.current) {
        const images = imagesRef.current.querySelectorAll("div");
        gsap.fromTo(
          images,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imagesRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Next project link animation
      if (nextProjectRef.current) {
        gsap.fromTo(
          nextProjectRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: nextProjectRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, mainRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [id]);

  return (
    <main ref={mainRef} className="bg-white text-black min-h-screen font-sans flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        {/* KIRI: Info Project (Sticky) */}
        <div className="w-full md:w-[40%] p-8 md:p-16 md:sticky md:top-[120px] md:h-[calc(100vh-120px)] flex flex-col justify-between border-r border-gray-100">
          <div>
            <h1
              ref={titleRef}
              className="text-2xl md:text-7xl mt-14 md:mt-2 font-bold uppercase tracking-tighter mb-12 leading-[0.9]"
            >
              {project.title}
            </h1>

            <div ref={infoRef} className="space-y-4 text-[10px] font-mono uppercase">
              <div className="grid grid-cols-2 py-4 border-t border-gray-100">
                <span className="text-gray-400">Tech</span>
                <span className="font-bold">{project.tech.join(", ")}</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-t border-gray-100">
                <span className="text-gray-400">Role</span>
                <span className="font-bold">{project.category}</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-t border-gray-100 border-b">
                <span className="text-gray-400">Client</span>
                <span className="font-bold">{project.client}</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p ref={descriptionRef} className="text-xl font-light leading-snug text-gray-800 max-w-sm">
              {project.description}
            </p>
          </div>
        </div>

        {/* KANAN: Gallery Scrollable */}
        <div ref={imagesRef} className="w-full md:w-[60%] flex flex-col bg-gray-50/50">
          {/* Images Gallery */}
          {project.images.map((img, idx) => (
            <div key={idx} className="relative w-full aspect-[16/10] border-b border-gray-100 bg-white">
              <Image
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}

          {/* Footer Navigation */}
          <Link
            ref={nextProjectRef}
            href={`/works/${nextProject.id}`}
            className="group py-40 flex flex-col items-center justify-center bg-black text-white hover:bg-zinc-900 transition-all duration-500 uppercase font-bold text-sm tracking-[0.3em]"
          >
            <span className="text-[10px] font-mono mb-4 opacity-40 group-hover:opacity-100">Next Project</span>
            <div className="text-xl md:text-4xl tracking-tighter">
              {nextProject.title} →
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}