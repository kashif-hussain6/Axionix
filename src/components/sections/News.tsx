"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const posts = [
  { date: "Feb 20, 2025", title: "Launching Our New DevOps Bootcamp", description: "Accelerate your infrastructure skills with hands-on labs and real-world scenarios." },
  { date: "Feb 12, 2025", title: "Axionix X Partners with Leading Tech Firms", description: "New placement partnerships to connect graduates with top companies." },
  { date: "Feb 5, 2025", title: "UX Design Masterclass Recap", description: "Highlights from our sold-out workshop with industry experts." },
];

export function News() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="news" className="relative py-24 bg-background perspective-3d">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-left"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">News and Events.</h2>
          <p className="mt-3 max-w-xl text-muted">Latest updates and events from Axionix X.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3 perspective-900">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 28, rotateY: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              whileHover={{
                y: -8,
                rotateX: 4,
                rotateY: -2,
                scale: 1.02,
                boxShadow: "0 24px 48px -12px rgba(0,0,0,0.1)",
              }}
              className="preserve-3d rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
            >
              <div className="h-36 bg-gradient-to-br from-[#58c9ff]/20 to-[#58c9ff]/5" />
              <div className="p-5">
                <time className="text-sm text-muted">{post.date}</time>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{post.title}</h3>
                <p className="mt-2 text-muted text-sm">{post.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
