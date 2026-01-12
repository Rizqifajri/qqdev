"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const ProfileImage = ({ mobileOnly = false }: { mobileOnly?: boolean }) => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );

      // Text animation (for desktop only)
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            delay: 0.5,
            ease: "power2.out",
          }
        );
      }
    }, imageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  if (mobileOnly) {
    return (
      <div ref={imageRef} className="w-full h-96 md:hidden relative">
        <Image
          className="w-full h-full object-cover"
          src='/kikikeren.jpeg'
          alt="profile"
          fill
        />
      </div>
    )
  }

  return (
    <div className="h-full relative">
      {/* Container Foto */}
      <div ref={imageRef} className="h-full w-[600px] relative">
        <Image
          className="h-full w-full object-cover"
          src='/kikikeren.jpeg'
          alt="profile"
          width={600}
          height={1200}
          style={{ minWidth: '600px' }}
        />

        {/* TEKS DI SISI KANAN LUAR */}
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 rotate-90 origin-center">
          <p
            ref={textRef}
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.5em] text-black"
          >
            Creative Frontend Developer
          </p>
        </div>
      </div>
    </div>
  )
}

export const ProfileText = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      // Clone the original element to preserve structure
      const originalHTML = titleRef.current!.innerHTML;

      // Replace text nodes with word spans, preserving br tags
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = originalHTML;

      // Process text nodes and wrap words
      const processNode = (node: Node): string => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          const words = text.trim().split(/\s+/).filter(w => w.length > 0);
          return words.map(word => `<span class="word-reveal inline-block">${word}</span>`).join(" ");
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (element.tagName === "BR") {
            return element.outerHTML;
          }
          return Array.from(node.childNodes).map(processNode).join("");
        }
        return "";
      };

      const newHTML = Array.from(tempDiv.childNodes).map(processNode).join("");
      titleRef.current!.innerHTML = newHTML;

      const wordSpans = titleRef.current!.querySelectorAll(".word-reveal");
      gsap.fromTo(
        wordSpans,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }, titleRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full p-6 md:p-12 lg:p-16 flex-1 flex flex-col justify-end md:min-h-screen">
      <h1
        ref={titleRef}
        className="text-[10vw] md:text-[5vw] lg:text-[4.8vw] xl:text-[5vw] font-semibold uppercase tracking-tighter leading-[0.85] text-black"
      >
        HI. I&apos;M RIZQI FAJRI - <br className="hidden md:block" />
        CREATIVE <br className="hidden lg:block" />
        SOFTWARE DEVELOPER
      </h1>
    </div>
  )
}