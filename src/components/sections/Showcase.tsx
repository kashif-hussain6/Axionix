"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { showcaseProjects } from "@/lib/data";
import { SectionIntro } from "@/components/ui";
import { SiteContainer } from "@/components/layout/SiteContainer";

const cardSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 18,
  mass: 0.9,
};

export function Showcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="showcase" className="axion-section axion-tone-showcase relative bg-background py-24 perspective-3d">
      <SiteContainer className="relative z-[1]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionIntro
            variant="badge"
            badge="Portfolio"
            title="Showcase Of Excellence."
            kicker="Recent projects"
            lead="Your vision, our expertise. We collaborate to craft impactful designs within your timeframe and budget, propelling your business ambitions forward."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {showcaseProjects.map((project, index) => (
            <motion.article
              key={project.imageSrc}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-12% 0px -8% 0px", amount: 0.15 }}
              transition={{ ...cardSpring, delay: index * 0.06 }}
              className="min-w-0"
            >
              <Link
                href="#contact"
                aria-label={`${project.title} — open contact`}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-axion focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md shadow-[0_12px_32px_-12px_rgba(88,201,255,0.15)] transition duration-300 group-hover:border-axion/30 group-hover:shadow-lg group-hover:shadow-[0_20px_40px_-12px_rgba(88,201,255,0.2)] dark:border-border dark:shadow-black/30 dark:group-hover:shadow-black/45">
                  <Image
                    src={project.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 32vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                    aria-hidden
                  >
                    <span className="text-center text-base font-bold tracking-tight text-white sm:text-lg">
                      {project.title}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex justify-center sm:mt-14 md:mt-16"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-axion px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-axion/30 transition hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-axion"
          >
            All Projects
            <span aria-hidden className="text-lg leading-none">
              →
            </span>
          </Link>
        </motion.div>
      </SiteContainer>
    </section>
  );
}
