"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socials = [
  { name: "LinkedIn", href: "#", icon: "in" },
  { name: "Twitter", href: "#", icon: "𝕏" },
  { name: "GitHub", href: "#", icon: "⌘" },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section id="contact" className="relative py-24 bg-background">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contact Us.</h2>
          <p className="mt-3 max-w-xl text-slate-500">Get in touch for services or program inquiries.</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.form initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                id="name"
                type="text"
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                className={`w-full rounded-2xl border bg-card px-4 py-3 text-foreground transition-all outline-none ${focused === "name" ? "border-axion ring-2 ring-axion/30" : "border-border"}`}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className={`w-full rounded-2xl border bg-card px-4 py-3 text-foreground transition-all outline-none ${focused === "email" ? "border-axion ring-2 ring-axion/30" : "border-border"}`}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`w-full rounded-2xl border bg-card px-4 py-3 text-foreground transition-all outline-none resize-none ${focused === "message" ? "border-axion ring-2 ring-axion/30" : "border-border"}`}
                placeholder="Your message"
              />
            </div>
            <button type="submit" className="w-full rounded-2xl bg-[#58c9ff] py-3.5 font-semibold text-white hover:bg-[#3ab0e8] transition-colors">
              Send Message
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#58c9ff]/50 bg-white text-slate-700 hover:border-[#58c9ff] hover:text-[#58c9ff] transition-colors" aria-label={s.name}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 h-64 flex items-center justify-center text-slate-400">
              Map placeholder
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
