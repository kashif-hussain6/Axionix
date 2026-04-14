"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useId, useState } from "react";
import { faqItems } from "@/lib/data";
import { SiteContainer } from "@/components/layout/SiteContainer";

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m7.106 7.106L21 21"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="relative bg-background py-24 perspective-3d">
      <SiteContainer>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-left"
        >
          <div className="mb-4 h-0.5 w-12 rounded-full bg-axion" aria-hidden />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions.
          </h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-axion">FAQs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="w-full"
        >
          <ul className="divide-y divide-border border-y border-border">
            {faqItems.map((item, index) => {
              const num = String(index + 1).padStart(2, "0");
              const isOpen = openId === item.id;
              const panelId = `${baseId}-${item.id}-panel`;
              const buttonId = `${baseId}-${item.id}-button`;

              return (
                <li key={item.id}>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-start gap-3 py-5 text-left sm:gap-5 sm:py-6"
                    >
                      <span className="w-9 shrink-0 pt-0.5 tabular-nums text-foreground sm:w-10">
                        {num}/
                      </span>
                      <span className="min-w-0 flex-1 pr-2">{item.question}</span>
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-axion/35 bg-axion/10 text-axion transition-colors hover:border-axion/55 hover:bg-axion/18 dark:border-axion/45 dark:bg-axion/15 dark:text-axion-light dark:hover:border-axion/60 dark:hover:bg-axion/25 sm:h-10 sm:w-10"
                        aria-hidden
                      >
                        {isOpen ? (
                          <EyeIcon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
                        )}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-12 text-sm leading-relaxed text-muted sm:pb-6 sm:pl-[3.75rem] sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </SiteContainer>
    </section>
  );
}
