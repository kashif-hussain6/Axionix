"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteContainer } from "@/components/layout/SiteContainer";

/* Scroll-in: match Services — stagger + spring scale (container / item) */
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

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}



export function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="hero"
      className="relative z-0 -mt-4 overflow-hidden bg-background pb-16 pt-[calc(2rem+5.5rem)] text-foreground sm:-mt-5 sm:pb-20 sm:pt-[calc(2.25rem+5.75rem)] md:pb-24 md:pt-[calc(2.25rem+6rem)]"
    >
      <SiteContainer className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ y: 24 }}
          animate={inView ? { y: 0 } : { y: 24 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-8 flex justify-center sm:mb-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3 py-1.5 pr-5 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-axion text-white">
                <GlobeIcon className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-foreground sm:text-xs">
                DESIGN &amp; DEVELOPMENT AGENCY
              </span>
            </div>
          </div>

          <h1 className="mx-auto max-w-[20ch] text-balance text-center font-sans text-4xl font-bold leading-[1.12] tracking-tight text-[#0f172a] sm:max-w-none sm:text-5xl sm:leading-[1.1] md:text-6xl lg:text-7xl dark:text-foreground">
            <span className="block sm:inline">Digital services</span>{" "}
            <span className="block sm:inline">
              <span className="text-axion dark:text-axion-light">& professional </span>
              training
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-tight text-foreground sm:mt-6 sm:text-lg sm:leading-tight">
            <span className="block text-inherit">
              We partner with you to craft a successful business model that authentically reflects your
              unique vision
            </span>
            <span className="block text-inherit">while achieving your desired conversion goals.</span>
          </p>

          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-axion px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-axion/25 transition hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-axion"
            >
              Get Started
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative mx-auto mt-12 w-full sm:mt-14 md:mt-16"
        >
          <motion.div variants={item} className="relative">
            {/* Soft brand glow behind the frame */}
            <div
              className="pointer-events-none absolute -left-10 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-axion/30 blur-[88px] sm:-left-16 sm:h-80 sm:w-80 dark:bg-axion/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-8 top-0 z-0 h-56 w-56 rounded-full bg-axion-light/25 blur-[80px] sm:-right-12 sm:h-72 sm:w-72 dark:bg-axion/15"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(70vw,28rem)] w-[min(95vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-[40%] bg-gradient-to-br from-axion/12 via-transparent to-axion-light/10 blur-3xl dark:from-axion/8"
              aria-hidden
            />

            {/* Gradient hairline frame + depth */}
            <div className="relative z-[1] mx-auto rounded-[1.5rem] bg-gradient-to-br from-axion/45 via-axion/15 to-axion-light/35 p-[1.5px] shadow-[0_28px_60px_-18px_rgba(12,18,34,0.18),0_0_0_1px_rgba(0,0,0,0.04)] sm:rounded-[1.75rem] sm:p-0.5 md:rounded-[2rem] md:p-[2px] dark:from-axion/35 dark:via-axion/8 dark:to-axion/25 dark:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="overflow-hidden rounded-[1.4375rem] bg-card ring-1 ring-border/70 sm:rounded-[1.6875rem] md:rounded-[1.9375rem] dark:bg-muted/40 dark:ring-border/80">
                <div className="group relative aspect-[5/4] w-full sm:aspect-[16/10] md:aspect-[2/1] lg:aspect-[21/9]">
                  <Image
                    src="/hero-team.png"
                    alt="Team collaborating in a modern office"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1152px"
                    className="object-cover object-[center_38%] transition duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] sm:object-[center_40%] md:object-center"
                    priority
                    quality={92}
                  />
                  {/* Polish: teal wash + bottom blend into page */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-axion/[0.09] via-transparent to-axion-light/[0.06] dark:from-axion/12 dark:to-transparent"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent dark:from-background/70"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_-20px_rgba(12,18,34,0.15)] dark:shadow-[inset_0_0_100px_-24px_rgba(0,0,0,0.45)]"
                    aria-hidden
                  />
                </div>
              </div>
            </div>

            {/* Corner accent — breaks the “flat rectangle” feel */}
            <div
              className="pointer-events-none absolute -bottom-3 -right-2 z-[2] hidden h-24 w-24 rounded-2xl border border-axion/25 bg-gradient-to-br from-card/95 to-card/60 shadow-lg backdrop-blur-sm sm:block md:-bottom-4 md:-right-3 md:h-28 md:w-28 dark:border-axion/20 dark:from-card/80"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-2 -top-3 z-[2] h-16 w-16 rounded-full border border-axion/20 bg-card/80 shadow-md backdrop-blur-md dark:border-axion/15 dark:bg-card/60 sm:h-20 sm:w-20 md:-left-3 md:-top-4"
              aria-hidden
            />
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  );
}
