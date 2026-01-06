"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // 1. Import usePathname

export const NaviagationMenu = () => {
  const pathname = usePathname(); // 2. Ambil path URL saat ini
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 3. Hapus properti 'active' karena akan dicek otomatis
  const menuItems = [
    { label: "BIO", href: "/" },
    { label: "WORKS", href: "/works" },
    { label: "GALLERY", href: "/gallery" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-30">
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-transparent">
        <div className="px-6 py-4 flex justify-between items-center w-full">
          <ul className="flex flex-wrap gap-1 sm:gap-2 font-bold uppercase text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight">
            {menuItems.map((item, index) => {
              // 4. Logika penentuan status aktif
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.label} className="group">
                  <Link
                    href={item.href}
                    className={`${
                      isActive ? "text-black opacity-100" : "text-black opacity-20 hover:opacity-100"
                    } inline-block transition-all duration-300 group-hover:text-black group-hover:-translate-y-1`}
                  >
                    {item.label}
                  </Link>
                  {index < menuItems.length - 1 && (
                    <span
                      className={`${
                        isActive ? "text-black" : "text-gray-400"
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
            <Link
              href="/contact"
              className={`${
                pathname === "/contact" ? "opacity-100" : "opacity-20"
              } text-black font-bold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight inline-block transition-all duration-300 group-hover:text-black group-hover:opacity-100 group-hover:-translate-y-1`}
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="text-xl font-black tracking-widest">RIZQI</div>
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
              <div className="text-2xl font-bold">R</div>
              <button onClick={closeMenu} className="text-3xl font-bold leading-none">×</button>
            </div>

            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.label} className="group">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`${
                        isActive ? "text-black" : "text-gray-400"
                      } text-3xl font-bold uppercase tracking-tight inline-block transition-all duration-300 group-hover:text-black group-hover:-translate-y-1`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Social Links tetap sama */}
            <div className="mt-auto pt-12 border-t border-gray-200">
              <ul className="flex flex-col gap-4">
                {["TWITTER", "INSTAGRAM", "LINKEDIN", "EMAIL"].map((social) => (
                  <li key={social} className="group">
                    <Link href={`/${social.toLowerCase()}`} className="text-sm font-bold uppercase tracking-tight text-black inline-block transition-all duration-300 group-hover:text-gray-600 group-hover:-translate-y-1">
                      {social}
                    </Link>
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