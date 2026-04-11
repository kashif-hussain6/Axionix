import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WaveDivider } from "@/components/ui/WaveDivider";
import {
  Hero,
  Services,
  Showcase,
  Programs,
  LeadershipSlider,
  FAQ,
  CTA,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WaveDivider fill="var(--wave-fill)" />
        <Services />
        <Showcase />
        <Programs />
        <LeadershipSlider />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
