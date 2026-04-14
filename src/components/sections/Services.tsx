"use client";

import { motion, useInView, useScroll } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";
import { showcaseProjects, servicesList, type Service } from "@/lib/data";
import { ServiceScrollCard } from "./ServiceScrollCard";
import { SiteContainer } from "@/components/layout/SiteContainer";

const ic = "h-5 w-5 shrink-0 sm:h-6 sm:w-6";

/** Recognizable metaphors (generic shapes — not third-party logos) */
const serviceIcons: Record<string, () => React.ReactElement> = {
  "product-design": () => (
    <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19l-7-7 7-7 7 7-7 7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M14.5 9.5l-5 5M9.5 9.5l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  "digital-strategy": () => (
    <svg className={ic} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 19h16v2H4v-2z" fill="currentColor" fillOpacity="0.2" />
      <path d="M6 16V10h4v6H6zm5 6V7h4v15h-4zm5-9v9h4V13h-4z" fill="currentColor" fillOpacity="0.85" />
      <path d="M5 8l3-3 4 4 5-6 3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "ux-design": () => (
    <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M17 9l4-2v10l-4-2V9z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="15" r="2" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 16.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "software-dev": () => (
    <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 9l-3 3 3 3M16 9l3 3-3 3M13.5 7l-3 10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.06" />
    </svg>
  ),
  "mobile-apps": () => (
    <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <rect x="8.5" y="5" width="7" height="10.5" rx="1" fill="currentColor" fillOpacity="0.18" />
      <circle cx="9.5" cy="7.5" r="0.85" fill="currentColor" />
      <circle cx="12" cy="7.5" r="0.85" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="0.85" fill="currentColor" />
      <circle cx="9.5" cy="10" r="0.85" fill="currentColor" />
      <circle cx="12" cy="10" r="0.85" fill="currentColor" />
      <circle cx="14.5" cy="10" r="0.85" fill="currentColor" />
      <path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "dev-ops": () => (
    <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="14" y="4" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="14" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      <rect x="14" y="14" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 7h4M10 17h4M7 10v4M17 10v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "social-media": () => (
    <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="10" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="8" r="2.5" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="15" cy="16" r="2.5" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.5 11.5L13.5 9M14 10l2 4.5M11 12.5l2.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "3d-animation": () => (
    <svg className={ic} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 2v9l8 4.5M12 11L4 6.5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  ),
  "brand-identity": () => (
    <svg className={ic} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.08" />
      <path
        d="M12 8c-2 0-3.5 1.2-3.5 3 0 2.5 3.5 5 3.5 5s3.5-2.5 3.5-5c0-1.8-1.5-3-3.5-3z"
        fill="currentColor"
        fillOpacity="0.35"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const SERVICE_ACCENT_RGB = [
  "88 201 255",
  "45 212 191",
  "56 189 248",
  "125 211 252",
  "34 211 238",
  "96 165 250",
  "165 180 252",
  "52 211 153",
  "14 165 233",
] as const;

function ServiceStackCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = serviceIcons[service.slug];
  const accent = SERVICE_ACCENT_RGB[index % SERVICE_ACCENT_RGB.length];
  const iconWrapStyle = {
    backgroundColor: `rgb(${accent} / 0.14)`,
    color: `rgb(${accent})`,
  } as React.CSSProperties;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group/card block w-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl lg:rounded-2xl"
      style={{ "--svc-accent": accent } as React.CSSProperties}
    >
      {/* Uniform width + min-height on lg so every card matches before / during stack */}
      <div className="services-card-surface services-stack-card relative flex min-h-[11.5rem] w-full flex-col gap-3 overflow-hidden rounded-xl border border-border/40 p-4 sm:min-h-[12.5rem] sm:gap-3.5 sm:p-5 lg:min-h-[14.5rem] lg:rounded-2xl lg:border-border/50 lg:p-5 xl:min-h-[15rem]">
        <div
          className="services-card-glow pointer-events-none absolute inset-0 rounded-[inherit]"
          aria-hidden
        />
        <div className="relative z-10 flex w-full items-start justify-between gap-2">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm sm:h-11 sm:w-11"
            style={iconWrapStyle}
            aria-hidden
          >
            {Icon ? <Icon /> : null}
          </div>
          <span
            className="pt-0.5 text-base text-muted transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:text-axion sm:text-lg"
            aria-hidden
          >
            →
          </span>
        </div>
        <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">
          <h3 className="text-base font-bold tracking-tight text-[var(--services-card-foreground)] transition-colors duration-300 group-hover/card:text-foreground lg:text-[1.0625rem]">
            {service.title}
          </h3>
          <p className="mt-2 line-clamp-4 flex-1 text-xs leading-relaxed text-muted transition-colors duration-300 group-hover/card:text-foreground/85 sm:text-[0.8125rem] lg:mt-2.5 lg:text-sm lg:leading-snug">
            {service.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ServicesDesktopScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const total = servicesList.length;

  return (
    <div ref={scrollRef} className="relative hidden lg:block">
      {servicesList.map((service, index) => {
        const project = showcaseProjects[index % showcaseProjects.length];
        const Icon = serviceIcons[service.slug];
        return (
          <ServiceScrollCard
            key={service.slug}
            service={service}
            index={index}
            total={total}
            progress={scrollYProgress}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            Icon={Icon}
          />
        );
      })}
    </div>
  );
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="services-stack-section relative bg-background py-20 lg:py-28">
      <SiteContainer>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-semibold uppercase tracking-wider text-foreground shadow-sm"
              aria-hidden
            >
              <svg className="h-4 w-4 shrink-0 text-axion" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
              </svg>
              Our services
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[2.65rem] lg:leading-[1.08] xl:text-[3.15rem]">
            Services.
          </h2>
          <p className="mt-3 text-base font-medium uppercase tracking-wider text-axion sm:text-lg">
            Work with us, we&apos;ve got you covered
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
            Strategy, design, engineering, and growth in one place — from first sketch to shipped product and beyond.
          </p>
        </motion.div>

        <div className="mt-12 w-full sm:mt-14 lg:mt-16">
          <div className="flex w-full flex-col gap-4 lg:hidden">
            {servicesList.map((service, index) => (
              <ServiceStackCard key={service.slug} service={service} index={index} />
            ))}
          </div>
          <ServicesDesktopScroll />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex justify-center sm:mt-14 lg:mt-20"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-axion px-8 py-4 text-base font-semibold text-slate-950 shadow-md transition-[box-shadow,transform] hover:shadow-lg hover:brightness-105 active:scale-[0.98] sm:px-9 sm:py-4 sm:text-lg"
          >
            Get started
            <span className="text-xl leading-none sm:text-2xl" aria-hidden>
              →
            </span>
          </Link>
        </motion.div>
      </SiteContainer>
    </section>
  );
}
