export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "services",
    question: "What services does your agency offer?",
    answer:
      "We offer product design, digital strategy, UX design, software development, mobile apps, DevOps, social media, 3D animation, and brand identity — from discovery through launch and ongoing support.",
  },
  {
    id: "help-business",
    question: "How can your agency help my business?",
    answer:
      "We align design and engineering with your goals: clearer positioning, faster products, better conversion, and training so your team can sustain results. We work as an extension of your team, not a black box.",
  },
  {
    id: "pricing",
    question: "What is your pricing structure?",
    answer:
      "Engagements are scoped per project or retainer depending on scope, timeline, and team size. After a short discovery call we share a transparent estimate and milestones — no surprise fees.",
  },
  {
    id: "differentiators",
    question: "What sets your agency apart from competitors?",
    answer:
      "We combine strategic thinking with hands-on execution: senior practitioners on every workstream, fast feedback loops, and a focus on measurable outcomes rather than deliverables for their own sake.",
  },
  {
    id: "trends",
    question: "How do you stay up to date with trends?",
    answer:
      "We invest in continuous learning — tooling, accessibility, performance, and platform changes — and bake that into our process so your product stays modern without chasing hype for its own sake.",
  },
];
