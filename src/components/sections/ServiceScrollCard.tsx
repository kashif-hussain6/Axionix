"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactElement } from "react";
import type { Service } from "@/lib/data";

const CARD_BACKGROUNDS = [
  "color-mix(in srgb, rgb(88 201 255) 14%, white)",
  "color-mix(in srgb, rgb(45 212 191) 12%, white)",
  "color-mix(in srgb, rgb(56 189 248) 14%, white)",
  "color-mix(in srgb, rgb(125 211 252) 16%, white)",
  "color-mix(in srgb, rgb(34 211 238) 12%, white)",
  "color-mix(in srgb, rgb(96 165 250) 14%, white)",
  "color-mix(in srgb, rgb(165 180 252) 12%, white)",
  "color-mix(in srgb, rgb(52 211 153) 12%, white)",
  "color-mix(in srgb, rgb(14 165 233) 14%, white)",
] as const;

type Props = {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  imageSrc: string;
  imageAlt: string;
  Icon?: () => ReactElement;
};

export function ServiceScrollCard({ service, index, total, progress, imageSrc, imageAlt, Icon }: Props) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const n = Math.max(total, 1);
  const segment = 1 / n;
  const rangeStart = index * segment;
  const rangeEnd = Math.min(1, (index + 1) * segment + 0.08);
  const targetScale = 1 - 0.045 * (n - 1 - index);

  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, Math.max(0.82, targetScale)]);

  const { scrollYProgress: cardLocal } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(cardLocal, [0, 1], [1.45, 1]);

  const bg = CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length];
  const topOffset = `calc(-5vh + ${index * 22}px)`;

  return (
    <div
      ref={containerRef}
      className="sticky top-0 flex h-[min(100dvh,100svh)] items-center justify-center"
      style={{ zIndex: 10 + index }}
    >
      <motion.div
        className="relative w-full max-w-7xl origin-top rounded-[1.5rem] border border-border/50 p-6 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12),0_0_0_1px_rgba(88,201,255,0.12)] sm:p-8 lg:rounded-[1.75rem] lg:p-10 dark:border-border dark:shadow-black/40"
        style={{
          backgroundColor: bg,
          scale: reduceMotion ? 1 : scale,
          top: topOffset,
        }}
      >
        <Link
          href={`/services/${service.slug}`}
          className="group/card outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-[inherit]"
        >
          <h3 className="text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-[1.65rem]">
            {service.title}
          </h3>
          <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:gap-10">
            <div className="relative flex w-full flex-col justify-center lg:w-[42%] lg:pt-4">
              <p className="text-pretty text-sm leading-relaxed text-foreground/85 first-letter:float-left first-letter:mr-1 first-letter:font-semibold first-letter:text-foreground first-letter:leading-none first-letter:sm:text-2xl sm:text-base">
                {service.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-axion-dark dark:text-axion">
                <span className="text-sm font-semibold underline decoration-axion/40 underline-offset-4 transition group-hover/card:decoration-axion">
                  See service
                </span>
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="text-current" aria-hidden>
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/50 lg:w-[58%] dark:bg-white/5">
              <motion.div className="relative h-full w-full" style={{ scale: reduceMotion ? 1 : imageScale }}>
                <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 58vw" />
              </motion.div>
              {Icon ? (
                <div className="pointer-events-none absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-axion shadow-md backdrop-blur-sm dark:bg-slate-900/80">
                  <Icon />
                </div>
              ) : null}
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
