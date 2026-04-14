import type { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
  /** Extra classes on the outer wrapper (same horizontal padding as the navbar `<header>`). */
  className?: string;
  /** Extra classes on the inner `max-w-7xl` box (same horizontal padding as the navbar bar). */
  innerClassName?: string;
};

/**
 * Content width aligned with {@link Navbar}: outer gutter + `max-w-7xl` + inner padding
 * matching the nav bar (`px-5 sm:px-6 lg:px-8`).
 */
export function SiteContainer({ children, className, innerClassName }: SiteContainerProps) {
  return (
    <div className={className ? `px-4 sm:px-6 lg:px-8 ${className}` : "px-4 sm:px-6 lg:px-8"}>
      <div
        className={
          innerClassName
            ? `mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${innerClassName}`
            : "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8"
        }
      >
        {children}
      </div>
    </div>
  );
}
