"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import { ArrowUpRight } from "lucide-react";

export const NaviagationMenu = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInContactSection, setIsInContactSection] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenisRef.current = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Track if we're in contact section using Intersection Observer
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let observer: IntersectionObserver | null = null;
    let rafId: number | null = null;

    const timeoutId = setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (!contactSection) {
        setIsInContactSection(false);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            const isVisible = rect.top < windowHeight * 0.5 && rect.bottom > 100;
            setIsInContactSection(isVisible);
          });
        },
        {
          threshold: [0, 0.1, 0.3, 0.5, 1],
          rootMargin: "-100px 0px -30% 0px",
        }
      );

      observer.observe(contactSection);

      const handleScroll = () => {
        const rect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight * 0.5 && rect.bottom > 100;
        setIsInContactSection(isVisible);
      };

      handleScroll();

      const checkScroll = () => {
        handleScroll();
        rafId = requestAnimationFrame(checkScroll);
      };
      rafId = requestAnimationFrame(checkScroll);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  // Handle hash navigation on page load
  useEffect(() => {
    if (pathname === "/" && window.location.hash === "#contact") {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection && lenisRef.current) {
          lenisRef.current.scrollTo(contactSection, {
            offset: -100,
            duration: 1.5,
          });
        } else if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMenu();

    if (pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(contactSection, {
            offset: -100,
            duration: 1.5,
          });
        } else {
          contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      window.location.href = "/#contact";
    }
  };

  const menuItems = [
    { id: "01", label: "BIO", href: "/" },
    { id: "02", label: "WORKS", href: "/works" },
    { id: "03", label: "CONTACT", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-transparent">
        <div className="px-6 py-4 flex justify-between items-center w-full">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2 font-bold uppercase text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
            {menuItems.map((item, index) => {
              const isContact = item.label === "CONTACT";
              const isBio = item.label === "BIO";
              const isActive = isContact
                ? pathname === "/" && isInContactSection
                : isBio
                ? pathname === "/" && !isInContactSection
                : pathname.startsWith(item.href);

              return (
                <li key={item.label} className="group flex items-baseline">
                  {isContact ? (
                    <Link
                      href="/#contact"
                      onClick={handleContactClick}
                      className={`${
                        isActive
                          ? "text-black opacity-100"
                          : "text-black opacity-25 hover:opacity-100"
                      } inline-block transition-all duration-300 group-hover:-translate-y-0.5 cursor-pointer`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${
                        isActive
                          ? "text-black opacity-100"
                          : "text-black opacity-25 hover:opacity-100"
                      } inline-block transition-all duration-300 group-hover:-translate-y-0.5`}
                    >
                      {item.label}
                    </Link>
                  )}
                  {index < menuItems.length - 1 && (
                    <span
                      className={`${
                        isActive ? "text-black" : "text-gray-300"
                      } transition-colors duration-300 group-hover:text-black`}
                    >
                      ,
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="group">
            <a
              href="https://www.linkedin.com/in/rizqifajri"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isInContactSection ? "opacity-100" : "opacity-25"
              } text-black font-bold uppercase text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight inline-flex items-center gap-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 cursor-pointer`}
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Top-Right Trigger Button */}
      <button
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        className={`md:hidden fixed top-4 right-4 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] focus:outline-none ${
          isMenuOpen
            ? "bg-white text-black rotate-180"
            : "bg-black text-white shadow-sm hover:scale-105"
        }`}
      >
        <ArrowUpRight className="w-5 h-5 transition-transform duration-500" />
      </button>

      {/* Mobile Full-Screen Circular Reveal Menu */}
      <div
        style={{
          clipPath: isMenuOpen
            ? "circle(150vmax at calc(100% - 38px) 38px)"
            : "circle(0px at calc(100% - 38px) 38px)",
        }}
        className={`fixed inset-0 z-40 md:hidden bg-black text-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-between h-full px-6 pt-24 pb-10">
          {/* Simple Centered/Stacked Nav Links */}
          <ul className="flex flex-col gap-5 my-auto">
            {menuItems.map((item) => {
              const isContact = item.label === "CONTACT";
              const isBio = item.label === "BIO";
              const isActive = isContact
                ? pathname === "/" && isInContactSection
                : isBio
                ? pathname === "/" && !isInContactSection
                : pathname.startsWith(item.href);

              return (
                <li key={item.label}>
                  {isContact ? (
                    <Link
                      href="/#contact"
                      onClick={handleContactClick}
                      className={`block text-5xl font-bold uppercase tracking-tighter leading-none transition-opacity duration-300 ${
                        isActive ? "text-white opacity-100" : "text-white opacity-40 hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block text-5xl font-bold uppercase tracking-tighter leading-none transition-opacity duration-300 ${
                        isActive ? "text-white opacity-100" : "text-white opacity-40 hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Minimal Bottom Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            {[
              { label: "Email", href: "mailto:rizqifajri51@gmail.com" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/rizqifajri" },
              { label: "GitHub", href: "https://github.com/Rizqifajri" },
              { label: "Instagram", href: "https://www.instagram.com/rizqifajriii" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="hover:text-white transition-colors duration-200"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
