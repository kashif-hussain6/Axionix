"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SiteContainer } from "@/components/layout/SiteContainer";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative py-24 bg-gradient-to-b from-[#58c9ff]/10 to-background overflow-hidden">
      <SiteContainer className="relative" innerClassName="text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28, rotateX: 10 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="perspective-700"
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Ready to Build the Future with Axionix X?
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Start your journey today — explore services or join our programs.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="#contact">
              <motion.span
                className="preserve-3d inline-flex rounded-2xl bg-axion px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-axion/30"
                whileHover={{
                  scale: 1.06,
                  y: -4,
                  rotateX: 6,
                  boxShadow: "0 24px 48px -8px rgba(88, 201, 255, 0.55)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  );
}
