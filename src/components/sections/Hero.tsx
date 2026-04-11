"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
      className="relative z-0 -mt-4 overflow-hidden bg-white pb-16 pt-[calc(2rem+5.5rem)] text-neutral-900 sm:-mt-5 sm:pb-20 sm:pt-[calc(2.25rem+5.75rem)] md:pb-24 md:pt-[calc(2.25rem+6rem)] dark:bg-background dark:text-foreground"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ y: 24 }}
          animate={inView ? { y: 0 } : { y: 24 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-8 flex justify-center sm:mb-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border bg-white px-3 py-1.5 pr-5 dark:border-border dark:bg-card">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-axion text-white">
                <GlobeIcon className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#0f172a] sm:text-xs dark:text-foreground">
                DESIGN &amp; DEVELOPMENT AGENCY
              </span>
            </div>
          </div>

          <h1 className="font-sans text-[clamp(1.05rem,4.2vw,3.15rem)] font-bold leading-tight tracking-tight text-[#0f172a] dark:text-foreground">
            <span className="inline-block whitespace-nowrap">
              Digital services
              <span className="text-axion dark:text-axion-light">{" & professional "}</span>
              training
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-tight !text-[#0f172a] sm:mt-6 sm:text-lg sm:leading-tight dark:!text-white">
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
          <motion.div
            variants={item}
            className="relative overflow-hidden rounded-[24px] bg-neutral-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] sm:rounded-[28px] md:rounded-[32px] dark:bg-muted/30 dark:shadow-black/30"
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/hero-team.png"
                alt="Team collaborating in a modern office"
                fill
                className="object-cover object-[center_42%] sm:object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="relative z-10 mx-auto mt-4 w-full max-w-[min(100%,340px)] sm:max-w-[360px] md:absolute md:bottom-6 md:right-6 md:mx-0 md:mt-0 md:max-w-[min(calc(100%-2rem),400px)] lg:bottom-8 lg:right-8"
          >
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
