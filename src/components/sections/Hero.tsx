"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden bg-background text-foreground perspective-3d"
    >
      {/* Content – logo and copy, shadow only (no coloured orbs in light/dark) */}
      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        {/* Logo area – smaller size, centered, with entrance + loop animation */}
        <div className="w-full flex justify-center perspective-3d">
          <div className="relative inline-flex items-center justify-center w-full max-w-3xl">
            {/* Soft radial glow behind logo */}
            <motion.div
              className="hero-logo-glow absolute inset-0 w-full max-w-md h-32 sm:h-40 rounded-full opacity-50"
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Logo – smaller, with entrance animation + subtle float & glow pulse */}
            <motion.div
              className="hero-logo-glow absolute inset-0 w-full max-w-md h-32 sm:h-40 rounded-full opacity-50"
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Logo – smaller, with entrance animation + subtle float & glow pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -5, 0],
             
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-full rounded-lg"
            >
              <Image
                src="/axionix-logo.svg"
                alt="Axionix X"
                width={640}
                height={158}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-10 text-foreground text-xl font-semibold sm:text-2xl md:text-3xl"
          >
          Empowering with Innovation
        </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-3 max-w-xl mx-auto text-muted text-base sm:text-lg"
          >
          Digital services and professional training to help you build the future.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="#services">
            <motion.span
              className="inline-flex rounded-2xl bg-[var(--axion)] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[var(--axion)]/30"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px -12px rgba(88, 201, 255, 0.45)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Services
            </motion.span>
          </Link>
          <Link href="#programs">
            <motion.span
              className="inline-flex rounded-2xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-slate-900/25"
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: "rgb(30,64,175)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Join Programs
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
