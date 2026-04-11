"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#showcase", label: "Projects" },
  { href: "#programs", label: "Programs" },
  { href: "#leadership", label: "Leadership" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>("hero");
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "services", "showcase", "programs", "leadership", "faq", "cta", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-5">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-xl bg-card px-5 py-3.5 shadow-[0_1px_3px_0_rgba(0,0,0,0.08)] transition-shadow sm:px-6 md:py-4 lg:px-8 ${
            scrolled ? "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)]" : ""
          }`}
        >
          {/* Left: Logo only – SVG for super sharp display */}
          <Link href="#hero" className="flex shrink-0 items-center">
            <Image
              src="/axionix-logo.svg"
              alt="Axionix X"
              width={160}
              height={40}
              sizes="(max-width: 768px) 96px, 140px"
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Center: Nav links */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:gap-9">
            {navLinks.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = activeId === id;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm transition-colors ${
                    isActive ? "text-axion font-medium" : "text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            {/* Company dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-muted hover:text-foreground"
                aria-expanded={companyOpen}
                aria-haspopup="true"
              >
                More
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                  >
                    <Link href="#cta" className="block px-4 py-2 text-sm text-[#6b7280] hover:bg-slate-50 hover:text-slate-900" onClick={() => setCompanyOpen(false)}>
                      Get Started
                    </Link>
                    <Link href="#contact" className="block px-4 py-2 text-sm text-[#6b7280] hover:bg-slate-50 hover:text-slate-900" onClick={() => setCompanyOpen(false)}>
                      Contact
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right: Link + CTA button (Get Started hidden on small screens – shown inside mobile menu) */}
          <div className="flex shrink-0 items-center gap-5">
            <Link href="#contact" className="hidden text-sm text-muted hover:text-foreground sm:block">
              Contact
            </Link>
            <Link
              href="#cta"
              className="hidden rounded-lg bg-axion px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-axion-dark transition-colors md:inline-block"
            >
              Get Started
            </Link>
            {mounted && (
              <button
                type="button"
                aria-label="Toggle theme"
                className="hidden rounded-lg p-2 text-muted hover:bg-slate-100 dark:hover:bg-slate-800 md:inline-flex"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <span className="block h-5 w-5">
                  {/* Moon icon for dark mode */}
                  <svg
                    className="hidden h-5 w-5 dark:block"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                  </svg>
                  {/* Sun icon for light mode */}
                  <svg
                    className="block h-5 w-5 dark:hidden"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M6.34 17.66l1.41-1.41M16.24 7.76l1.41-1.41" />
                  </svg>
                </span>
              </button>
            )}
            <button
              type="button"
              aria-label="Open menu"
              className="rounded-lg p-2 text-muted hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/20" aria-hidden onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 rounded-l-xl border-l border-border bg-card shadow-xl p-6 pt-20"
            >
              <button
                type="button"
                aria-label="Close menu"
                className="absolute top-5 right-5 rounded-lg p-2 text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col gap-1">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-lg px-4 py-3 text-foreground/80 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-axion"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <Link href="#contact" className="rounded-lg px-4 py-3 text-foreground/80 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-axion" onClick={() => setMobileOpen(false)}>
                  Contact
                </Link>
              </div>
              {/* Get Started CTA inside mobile menu */}
              <Link
                href="#cta"
                className="mt-4 block w-full rounded-lg bg-axion px-4 py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-axion-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
