"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

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
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    return () => {
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

    // Wait a bit for the page to render
    const timeoutId = setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (!contactSection) {
        setIsInContactSection(false);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Consider "in view" if section is visible in upper part of viewport
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            // Active when section top is above 50% of viewport and section is visible
            const isVisible = rect.top < windowHeight * 0.5 && rect.bottom > 100;
            setIsInContactSection(isVisible);
          });
        },
        {
          threshold: [0, 0.1, 0.3, 0.5, 1],
          rootMargin: "-100px 0px -30% 0px", // Trigger when section is in upper part of viewport
        }
      );

      observer.observe(contactSection);

      // Also check on scroll for more accurate detection
      const handleScroll = () => {
        const rect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Check if contact section is in viewport (top part visible)
        const isVisible = rect.top < windowHeight * 0.5 && rect.bottom > 100;
        setIsInContactSection(isVisible);
      };

      // Initial check
      handleScroll();

      // Use requestAnimationFrame for continuous checking (works with Lenis)
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
      }, 500); // Wait for page to fully render
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
      // If already on home page, scroll to contact section
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
      // If on different page, navigate to home with hash
      // Use window.location for proper hash navigation
      window.location.href = "/#contact";
    }
  };

  const menuItems = [
    { label: "BIO", href: "/" },
    { label: "WORKS", href: "/works" },
    // { label: "GALLERY", href: "/gallery" },
    { label: "CONTACT", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-30">
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-transparent">
        <div className="px-6 py-4 flex justify-between items-center w-full">
          <ul className="flex flex-wrap gap-1 sm:gap-2 font-bold uppercase text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
            {menuItems.map((item, index) => {
              // 4. Logika penentuan status aktif
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const isContact = item.label === "CONTACT";
              // Contact is active only when in contact section
              const contactIsActive = isContact && pathname === "/" && isInContactSection;

              return (
                <li key={item.label} className="group">
                  {isContact ? (
                    <Link
                      href="/#contact"
                      onClick={handleContactClick}
                      className={`${contactIsActive ? "text-black opacity-100" : "text-black opacity-20 hover:opacity-100"
                        } inline-block transition-all duration-300 group-hover:text-black group-hover:-translate-y-1 cursor-pointer`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${isActive ? "text-black opacity-100" : "text-black opacity-20 hover:opacity-100"
                        } inline-block transition-all duration-300 group-hover:text-black group-hover:-translate-y-1`}
                    >
                      {item.label}
                    </Link>
                  )}
                  {index < menuItems.length - 1 && (
                    <span
                      className={`${(isActive || contactIsActive) ? "text-black" : "text-gray-400"
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
              className={`${isInContactSection ? "opacity-100" : "opacity-20"
                } text-black font-bold uppercase text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight inline-block transition-all duration-300 group-hover:text-black group-hover:opacity-100 group-hover:-translate-y-1 cursor-pointer`}
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 border-gray-200 bg-white/95 backdrop-blur">
        <div className="text-xl font-black tracking-widest">QQ</div>
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-1.5 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-8 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "translate-y-1 rotate-45" : ""}`}></span>
          <span className={`block w-8 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`block w-8 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "-translate-y-1 -rotate-45" : ""}`}></span>
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeMenu}></div>

        <div className="absolute top-0 left-0 w-full h-full bg-white shadow-xl overflow-y-auto">
          <div className="flex flex-col p-8 h-full">
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-bold">QQ</div>
              <button onClick={closeMenu} className="text-3xl font-bold leading-none">×</button>
            </div>

            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                const isContact = item.label === "CONTACT";
                const contactIsActive = isContact && isInContactSection;

                return (
                  <li key={item.label} className="group">
                    {isContact ? (
                      <Link
                        href="/#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          handleContactClick(e);
                        }}
                        className={`${contactIsActive ? "text-black" : "text-gray-400"
                          } text-3xl font-bold uppercase tracking-tight inline-block transition-all duration-300 group-hover:text-black group-hover:-translate-y-1 cursor-pointer`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`${isActive ? "text-black" : "text-gray-400"
                          } text-3xl font-bold uppercase tracking-tight inline-block transition-all duration-300 group-hover:text-black group-hover:-translate-y-1`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto pt-12 border-t border-gray-200">
              <ul className="flex flex-col gap-4">
                {[
                  { label: "INSTAGRAM", href: "https://www.instagram.com/rizqifajriii" },
                  { label: "LINKEDIN", href: "https://www.linkedin.com/in/rizqifajri" },
                  { label: "EMAIL", href: "mailto:rizqifajri51@gmail.com" },
                ].map((social) => (
                  <li key={social.label} className="group">
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={closeMenu}
                      className="text-sm font-bold uppercase tracking-tight text-black inline-block transition-all duration-300 group-hover:text-gray-600 group-hover:-translate-y-1"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};