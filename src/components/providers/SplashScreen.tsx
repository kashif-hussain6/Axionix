"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const DOT_COUNT = 52;

/** Longer hold so slow zoom + dots are visible before fade */
const SPLASH_VISIBLE_MS = 4200;
const EXIT_DURATION = 0.45;

type DotConfig = {
  left: string;
  top: string;
  size: number;
  colorVar: string;
  duration: number;
  delay: number;
  driftX: number[];
  driftY: number[];
  opacity: number[];
};

function buildDots(): DotConfig[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => {
    const left = ((i * 41 + 11) % 92) + 4;
    const top = ((i * 57 + 23) % 92) + 4;
    const size = 2 + (i % 5);
    const colorVar = ["--axion", "--axion-light", "--axion-dark"][i % 3];
    const duration = 11 + (i % 9) * 0.85;
    const delay = (i * 0.09) % 2.8;
    const amp = 10 + (i % 7) * 3;
    const driftX = [0, amp * 0.6, -amp * 0.45, amp * 0.25, 0];
    const driftY = [0, -amp * 0.75, amp * 0.5, -amp * 0.35, 0];
    const opacity = [0.15, 0.55, 0.35, 0.5, 0.15];
    return {
      left: `${left}%`,
      top: `${top}%`,
      size,
      colorVar,
      duration,
      delay,
      driftX,
      driftY,
      opacity,
    };
  });
}

function SplashFloatingDots() {
  const dots = useMemo(() => buildDots(), []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: `var(${d.colorVar})`,
            boxShadow: `0 0 ${Math.max(6, d.size * 3)}px color-mix(in srgb, var(${d.colorVar}) 55%, transparent)`,
          }}
          initial={false}
          animate={{
            x: d.driftX,
            y: d.driftY,
            opacity: d.opacity,
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(() => pathname === "/");

  useEffect(() => {
    if (pathname !== "/") setVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [visible]);

  useEffect(() => {
    if (pathname !== "/" || !visible) return;
    const id = setTimeout(() => setVisible(false), SPLASH_VISIBLE_MS);
    return () => clearTimeout(id);
  }, [pathname, visible]);

  return (
    <>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="splash"
            role="presentation"
            aria-hidden
            className="fixed inset-0 z-[10050] flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: EXIT_DURATION, ease: [0.65, 0, 0.35, 1] },
            }}
          >
            {/* Base */}
            <div className="absolute inset-0 bg-background" aria-hidden />

            {/* Soft aurora bands */}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,color-mix(in_srgb,var(--axion)_22%,var(--background))_0%,transparent_42%,color-mix(in_srgb,var(--axion-light)_12%,var(--background))_78%,transparent_100%)] opacity-[0.92] dark:bg-[linear-gradient(118deg,color-mix(in_srgb,var(--axion)_14%,var(--background))_0%,transparent_38%,color-mix(in_srgb,var(--axion-dark)_18%,var(--background))_72%,transparent_100%)] dark:opacity-[0.88]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(220deg,transparent_0%,color-mix(in_srgb,var(--axion-light)_14%,transparent)_35%,transparent_70%)] dark:bg-[linear-gradient(220deg,transparent_0%,color-mix(in_srgb,var(--axion)_10%,transparent)_40%,transparent_75%)]"
              aria-hidden
            />

            {/* Corner glow orbs */}
            <div
              className="pointer-events-none absolute -left-[20%] -top-[15%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--axion)_35%,transparent)_0%,transparent_68%)] blur-2xl dark:bg-[radial-gradient(circle,color-mix(in_srgb,var(--axion)_22%,transparent)_0%,transparent_65%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-[18%] -right-[12%] h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--axion-dark)_30%,transparent)_0%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle,color-mix(in_srgb,var(--axion-dark)_20%,transparent)_0%,transparent_68%)]"
              aria-hidden
            />

            {/* Center spotlight behind logo */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(85vmin,520px)] w-[min(95vw,640px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--axion)_18%,transparent)_0%,transparent_62%)] dark:bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--axion)_12%,transparent)_0%,transparent_58%)]"
              aria-hidden
            />

            {/* Vignette */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_90%_at_50%_50%,transparent_35%,var(--background)_92%)] opacity-95 dark:opacity-[0.97]"
              aria-hidden
            />

            <SplashFloatingDots />

            {/* Logo above dots */}
            <div className="relative z-[2] flex w-full justify-center px-4 sm:px-6">
              <motion.div
                className="flex justify-center"
                style={{ transformOrigin: "50% 50%" }}
                initial={{ scale: 0.82 }}
                animate={{ scale: [0.82, 1.06, 1] }}
                transition={{
                  duration: 2.45,
                  times: [0, 0.52, 1],
                  ease: [
                    [0.25, 0.1, 0.25, 1],
                    [0.33, 1, 0.68, 1],
                  ],
                }}
              >
                <Image
                  src="/axionix-logo.svg"
                  alt="Axionix X"
                  width={640}
                  height={160}
                  className="block h-32 w-auto max-w-[min(94vw,420px)] object-contain object-center drop-shadow-[0_12px_48px_rgba(88,201,255,0.35)] sm:h-36 sm:max-w-[min(92vw,500px)] md:h-44 md:max-w-[min(90vw,580px)] lg:h-48 lg:max-w-[min(88vw,660px)]"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
