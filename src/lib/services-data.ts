export const servicesList = [
  { title: "Product Design", slug: "product-design" },
  { title: "Digital Strategy", slug: "digital-strategy" },
  { title: "UX Design", slug: "ux-design" },
  { title: "Software Dev.", slug: "software-dev" },
  { title: "Mobile Apps", slug: "mobile-apps" },
  { title: "Dev Ops", slug: "dev-ops" },
  { title: "Social Media", slug: "social-media" },
  { title: "3d Animation", slug: "3d-animation" },
  { title: "Brand Identity", slug: "brand-identity" },
] as const;

const slugToService = Object.fromEntries(
  servicesList.map((s) => [s.slug, s])
) as Record<string, (typeof servicesList)[number]>;

export function getServiceBySlug(slug: string) {
  return slugToService[slug] ?? null;
}

export function getAllServiceSlugs() {
  return servicesList.map((s) => s.slug);
}
