import { WaveDivider } from "@/components/ui";
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

export default function HomePage() {
  return (
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
  );
}
