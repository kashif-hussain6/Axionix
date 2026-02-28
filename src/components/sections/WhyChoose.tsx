"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  { title: "Industry-Focused Learning", description: "Curriculum aligned with current industry demands and tools.", icon: "🎯" },
  { title: "Real-World Projects", description: "Build portfolio-ready projects that mirror professional workflows.", icon: "🛠️" },
  { title: "Expert Mentors", description: "Learn from practitioners with years of hands-on experience.", icon: "👩‍🏫" },
  { title: "Career Growth Support", description: "Resume reviews, interview prep, and placement assistance.", icon: "📈" },
];

export function WhyChoose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why" className="relative py-24 bg-background perspective-3d">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Axionix X.</h2>
          <p className="mt-4 max-w-2xl text-muted">We combine education and execution to help you succeed.</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 perspective-800">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28, rotateY: i % 2 === 0 ? -12 : 12 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{
                y: -6,
                rotateX: 4,
                scale: 1.02,
                boxShadow: "0 20px 40px -12px rgba(88, 201, 255, 0.2)",
              }}
              className="preserve-3d rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
