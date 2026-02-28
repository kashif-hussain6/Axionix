"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const programs = [
  { title: "UI/UX Design", description: "Master user research, wireframing, and high-fidelity design with industry tools." },
  { title: "Full Stack Web Development", description: "From frontend to backend and deployment — build production-ready apps." },
  { title: "Digital Marketing", description: "SEO, content marketing, and analytics to grow your brand online." },
  { title: "DevOps Engineering", description: "Containers, Kubernetes, and cloud platforms for modern infrastructure." },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function Programs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section id="programs" ref={ref} className="relative py-24 bg-background overflow-hidden perspective-3d">
      <motion.div style={{ y }} className="programs-bg-gradient absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Skill Development Programs.</h2>
          <p className="mt-3 max-w-xl text-muted">Industry-focused training with real projects and expert mentors.</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-2xl font-bold text-[#58c9ff]"
          >
            <AnimatedCounter target={50} suffix="+ Students Trained" />
          </motion.p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 perspective-900">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 28, rotateY: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: 2,
                scale: 1.02,
                boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)",
              }}
              className="preserve-3d rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
              <p className="mt-2 text-muted text-sm">{program.description}</p>
              <Link href="#contact" className="mt-4 inline-flex items-center rounded-xl bg-[#58c9ff]/10 px-4 py-2 text-sm font-medium text-[#58c9ff] hover:bg-[#58c9ff]/20 transition-colors">Apply Now</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
