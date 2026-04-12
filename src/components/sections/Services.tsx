"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";
import { servicesList } from "@/lib/data";

const iconClass = "h-9 w-9 shrink-0 stroke-[1.5] stroke-current";

const serviceIcons: Record<string, () => React.ReactElement> = {
  "product-design": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    </svg>
  ),
  "digital-strategy": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-5 4 3 5-7" strokeWidth={1.8} />
    </svg>
  ),
  "ux-design": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  "software-dev": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeWidth={2} />
    </svg>
  ),
  "mobile-apps": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" strokeWidth={2} />
    </svg>
  ),
  "dev-ops": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 002 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
    </svg>
  ),
  "social-media": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  ),
  "3d-animation": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "brand-identity": () => (
    <svg className={iconClass} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M7 7h.01M7 3h5c.51 0 1.02.2 1.41.59l7 7a2 2 0 010 2.82l-7 7a2 2 0 01-2.82 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
};

/* Scroll-in: cards rise from below with stagger + subtle scale */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.92,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18,
      mass: 0.9,
    },
  },
};

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-24 bg-background perspective-3d">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-left"
        >
          <div className="h-0.5 w-12 rounded-full bg-axion mb-4" aria-hidden />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Services.</h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-axion">
            Work with us, we&apos;ve got you covered
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {servicesList.map((service) => {
            const Icon = serviceIcons[service.slug];
            return (
              <motion.div key={service.slug} variants={item}>
                <Link href={`/services/${service.slug}`} className="block group">
                  <motion.div
                    className="group/card services-card-bg relative flex items-center justify-between rounded-xl border border-border/50 px-6 py-5 overflow-hidden services-card-shadow"
                    transition={{ duration: 0.2 }}
                  >
                    {/* Title: left side */}
                    <span className="relative z-10 font-medium text-[var(--services-card-foreground)] group-hover/card:text-white transition-colors duration-200">
                      {service.title}
                    </span>
                    {/* Right: icon above arrow – icon slides in from the right on hover */}
                    <div className="relative z-10 flex flex-col items-end justify-center gap-1.5">
                      <span className="flex h-9 items-center justify-center text-white translate-x-full opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-300 ease-out">
                        {Icon && <Icon />}
                      </span>
                      <span className="shrink-0 text-[var(--services-card-foreground)] group-hover/card:text-white transition-[color,transform] duration-200 group-hover/card:-translate-x-2">
                        →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
