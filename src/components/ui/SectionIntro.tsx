import type { ReactNode } from "react";

type Props = {
  title: string;
  kicker?: string;
  lead?: string;
  badge?: string;
  variant?: "badge" | "line";
  className?: string;
  children?: ReactNode;
};

export function SectionIntro({
  title,
  kicker,
  lead,
  badge,
  variant = "line",
  className,
  children,
}: Props) {
  return (
    <div className={`text-left ${className ?? "mb-14"}`}>
      {variant === "badge" && badge ? (
        <div
          className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-semibold uppercase tracking-wider text-foreground shadow-sm"
          aria-hidden
        >
          <svg className="h-4 w-4 shrink-0 text-axion" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              strokeLinecap="round"
            />
          </svg>
          {badge}
        </div>
      ) : (
        <div className="mb-4 h-0.5 w-12 rounded-full bg-axion" aria-hidden />
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.25rem] lg:leading-tight">
        {title}
      </h2>
      {kicker ? (
        <p className="mt-2 text-sm font-medium uppercase tracking-wider text-axion sm:text-base">{kicker}</p>
      ) : null}
      {lead ? (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
      ) : null}
      {children}
    </div>
  );
}
