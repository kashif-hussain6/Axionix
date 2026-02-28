import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getServiceBySlug, servicesList } from "@/lib/services-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return servicesList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} — Axionix X`,
    description: `Professional ${service.title} services from Axionix X.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{service.title}</h1>
            <p className="mt-3 text-muted">Professional {service.title} to help you build the future.</p>
          </div>
        </section>

        {/* Content + sidebar */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground">
                  If you plan to build a consistently successful brand, seriously focusing on {service.title} is key.
                  We deliver end-to-end solutions tailored to your goals, with clear processes and measurable outcomes.
                </p>
                <p className="mt-4 text-muted">
                  Our team combines industry best practices with innovation to deliver results that scale.
                  Get in touch to discuss your project and how we can help.
                </p>
                <h2 className="mt-10 text-xl font-semibold text-foreground">What we deliver</h2>
                <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
                  <li>Strategy and planning</li>
                  <li>Design and implementation</li>
                  <li>Ongoing support and iteration</li>
                </ul>
              </div>
              <aside className="lg:border-l lg:border-border lg:pl-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-axion">Core services</h2>
                <ul className="mt-4 space-y-3">
                  {servicesList.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={s.slug === slug ? "#" : `/services/${s.slug}`}
                        className={`block border-b border-border/60 py-2 text-sm transition-colors ${
                          s.slug === slug ? "font-medium text-axion" : "text-muted hover:text-axion"
                        }`}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className="mt-6 inline-block rounded-xl border-2 border-axion px-4 py-2.5 text-sm font-medium text-axion hover:bg-axion/10 transition-colors"
                >
                  Make an enquiry
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
