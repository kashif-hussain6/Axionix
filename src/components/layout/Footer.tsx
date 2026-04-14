"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteContainer } from "@/components/layout/SiteContainer";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-14">
      <SiteContainer>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Link href="#hero" className="flex items-center">
            <Image src="/axionix-logo.svg" alt="Axionix X" width={100} height={36} className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#services" className="text-sm text-muted hover:text-axion transition-colors">
              Services
            </Link>
            <Link href="#programs" className="text-sm text-muted hover:text-axion transition-colors">
              Programs
            </Link>
            <Link href="#contact" className="text-sm text-muted hover:text-axion transition-colors">
              Contact
            </Link>
            <Link
              href="#contact"
              className="rounded-xl border-2 border-axion px-4 py-2 text-sm font-medium text-axion hover:bg-axion/10 transition-colors"
            >
              Email Inquiry
            </Link>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted">© {new Date().getFullYear()} Axionix X. All rights reserved.</p>
      </SiteContainer>
    </footer>
  );
}
