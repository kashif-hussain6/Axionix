/**
 * Primary in-page anchors (home) + routes used by the header.
 * Next.js 16: keep nav config in one place for layout + scroll-spy.
 */
export const mainNavLinks = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#showcase", label: "Projects" },
  { href: "#programs", label: "Programs" },
  { href: "#leadership", label: "Leadership" },
  { href: "#faq", label: "FAQ" },
] as const;

/** Section `id`s on the home page — order matches scroll priority for IntersectionObserver */
export const homeScrollSectionIds = [
  "hero",
  "services",
  "showcase",
  "programs",
  "leadership",
  "faq",
  "cta",
  "contact",
] as const;
