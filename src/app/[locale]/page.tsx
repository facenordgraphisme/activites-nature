import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ActivitiesGrid } from "@/components/sections/activities-grid";
import { PracticalInfo } from "@/components/sections/practical-info";
import { Testimonials } from "@/components/sections/testimonials";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActivitiesGrid />
      <About />
      <PracticalInfo />
      <Testimonials />
      <GalleryPreview />
      <Cta />
    </>
  );
}
