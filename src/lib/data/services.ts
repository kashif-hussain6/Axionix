export const servicesList = [
  {
    title: "Product Design",
    slug: "product-design",
    summary:
      "From concept to polished interfaces — research, UI systems, and handoff-ready design your engineers can ship.",
  },
  {
    title: "Digital Strategy",
    slug: "digital-strategy",
    summary: "Roadmaps, positioning, and measurable growth plans aligned with your market and your goals.",
  },
  {
    title: "UX Design",
    slug: "ux-design",
    summary: "Research-backed flows and prototypes that reduce friction, clarify journeys, and lift conversion.",
  },
  {
    title: "Software Dev.",
    slug: "software-dev",
    summary: "Reliable web platforms and APIs — performance, security, and codebases built to scale with you.",
  },
  {
    title: "Mobile Apps",
    slug: "mobile-apps",
    summary: "Native-feel experiences for iOS and Android with a disciplined release and iteration cadence.",
  },
  {
    title: "Dev Ops",
    slug: "dev-ops",
    summary: "CI/CD, cloud foundations, and observability so your team ships fast without trading stability.",
  },
  {
    title: "Social Media",
    slug: "social-media",
    summary: "Content systems, creative direction, and channel strategy tuned to your brand voice and audience.",
  },
  {
    title: "3d Animation",
    slug: "3d-animation",
    summary: "Product visuals, motion storytelling, and renders that explain complex ideas in seconds.",
  },
  {
    title: "Brand Identity",
    slug: "brand-identity",
    summary: "Visual language, logos, and guidelines that stay unmistakably you across every touchpoint.",
  },
] as const;

export type Service = (typeof servicesList)[number];

const slugToService = Object.fromEntries(
  servicesList.map((s) => [s.slug, s])
) as Record<string, (typeof servicesList)[number]>;

export function getServiceBySlug(slug: string) {
  return slugToService[slug] ?? null;
}

export function getAllServiceSlugs() {
  return servicesList.map((s) => s.slug);
}
