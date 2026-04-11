export type ShowcaseProject = {
  slug: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
};

/** Basename without extension, e.g. `/foo/bar/sunrise-resort.png` → `sunrise-resort` */
function imageBasename(imageSrc: string): string {
  const segment = imageSrc.split("/").pop() ?? "";
  return segment.replace(/\.[^.]+$/, "") || "project";
}

/** URL-safe id for React keys, from filename */
function slugFromImagePath(imageSrc: string): string {
  const name = imageBasename(imageSrc);
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "project"
  );
}

/**
 * Human-readable title from the image filename.
 * - `project1.jpg` → "Project 1"
 * - `sunrise-resort.png` → "Sunrise Resort"
 * - `Johnson_Partners.jpg` → "Johnson Partners"
 */
function titleFromImagePath(imageSrc: string): string {
  const name = imageBasename(imageSrc);
  if (!name || name === "project") return "Project";

  const projectNum = /^project(\d+)$/i.exec(name);
  if (projectNum) return `Project ${projectNum[1]}`;

  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

type ShowcaseProjectInput = {
  /** Path under `public/` — name (without extension) drives the card title */
  imageSrc: string;
  /** Optional; defaults to "{title} project preview" */
  imageAlt?: string;
};

function toProject(input: ShowcaseProjectInput): ShowcaseProject {
  const title = titleFromImagePath(input.imageSrc);
  return {
    slug: slugFromImagePath(input.imageSrc),
    title,
    imageSrc: input.imageSrc,
    imageAlt: input.imageAlt ?? `${title} project preview`,
  };
}

/**
 * Only list `imageSrc` here. The visible name is always derived from the file name
 * (e.g. `/green-leaf.jpg` → "Green Leaf", `/project2.png` → "Project 2").
 */
const showcaseProjectInputs: ShowcaseProjectInput[] = [
  { imageSrc: "/project1.jpg" },
  { imageSrc: "/project2.png" },
  { imageSrc: "/project3.png" },
  { imageSrc: "/project4.png" },
  { imageSrc: "/project5.png" },
  { imageSrc: "/project6.jpg" },
];

export const showcaseProjects: ShowcaseProject[] = showcaseProjectInputs.map(toProject);
