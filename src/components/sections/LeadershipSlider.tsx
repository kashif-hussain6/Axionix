"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const team = [
  { name: "Alex Chen", role: "Founder & CEO", image: "/team-member.png" },
  { name: "Sarah Mitchell", role: "Chief Operating Officer", image: "/team-member.png" },
  { name: "James Wilson", role: "Head of Technology", image: "/team-member.png" },
  { name: "Priya Singh", role: "Product Director", image: "/team-member.png" },
  { name: "Michael Lee", role: "Strategy Lead", image: "/team-member.png" },
  { name: "Emma Davis", role: "Customer Success Head", image: "/team-member.png" },
];

const CARD_GAP = 24;
const AUTO_SLIDE_MS = 6000;

type CardProps = {
  name: string;
  role: string;
  image: string;
};

const cardEnter = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 22,
      delay: 0.12 + i * 0.08,
    },
  }),
};

function Card({ name, role, image }: CardProps) {
  return (
    <div className="relative h-full overflow-hidden rounded-[32px] bg-card">
      {/* Image fills the whole card */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 360px, 380px"
      />

      {/* Axionix themed overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent" />

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-medium text-axion-light shadow-[0_10px_30px_rgba(15,23,42,0.8)] backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-axion" />
          Leadership Team
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-200/90">{role}</p>
        </div>
      </div>

      {/* Subtle card edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-slate-200/60" />
    </div>
  );
}

// Duplicate so we can scroll left forever, then instantly reset to start (no reverse)
const duplicatedTeam = [...team, ...team];

export function LeadershipSlider() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [cardWidth, setCardWidth] = useState(320);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // When we reach the duplicate of the first card, reset to 0 without animating (seamless loop)
  useEffect(() => {
    if (index === team.length) {
      setIndex(0);
      setInstant(true);
    }
  }, [index]);

  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  // Auto-scroll: advance one card; when index hits team.length, effect above resets to 0 (instant, no reverse)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => Math.min(prev + 1, team.length));
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(i, team.length - 1)));
  const offset = index * (cardWidth + CARD_GAP);
  const logicalIndex = index % team.length; // for dots and "active" card highlight

  return (
    <section ref={sectionRef} id="leadership" className="relative py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header – scroll-in animation */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex-shrink-0 w-7 h-7 rounded-sm bg-axion rotate-accent"
            aria-hidden
          />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Axionix X Leadership
          </h2>
        </motion.div>

        {/* Cards row – infinite scroll left; when end reached, reset to start (no reverse) */}
        <div className="relative">
          <div ref={containerRef} className="overflow-hidden px-2 sm:px-4">
            <motion.div
              className="flex gap-6"
              animate={{ x: -offset }}
              transition={
                instant
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 35 }
              }
            >
              {duplicatedTeam.map((person, i) => {
                const isActive = i === index;
                return (
                  <motion.div
                    key={`${person.name}-${i}`}
                    ref={i === 0 ? cardRef : null}
                    className="flex-shrink-0 w-[80vw] sm:w-[320px] md:w-[360px] lg:w-[380px]"
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    variants={cardEnter}
                    custom={i % team.length}
                  >
                    <motion.div
                      className={`leadership-card h-[360px] sm:h-[420px] rounded-[36px] border transition-all duration-300 bg-white ${
                        isActive
                          ? "border-axion/40 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18),0_0_0_1px_rgba(88,201,255,0.15)]"
                          : "border-slate-200/80 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)]"
                      }`}
                      initial={false}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.2 },
                      }}
                      animate={{
                        y: isActive ? -8 : 0,
                        scale: isActive ? 1.03 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <Card {...person} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Pagination dots – active = Axionix colour (by logical index) */}
        <div className="flex justify-center gap-2 mt-10">
          {team.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === logicalIndex ? "w-8 bg-axion" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
