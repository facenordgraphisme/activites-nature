import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { getGalleryImages, getHomeSections, pick, type Locale } from "@/sanity/lib/content";
import { imageUrl } from "@/sanity/lib/image";

const fallbackTiles = [
  { src: "/images/rafting/rafting-06.jpg", alt: "Rafting dans les rapides de la Durance" },
  { src: "/images/canyoning/canyoning-09.jpg", alt: "Toboggan naturel en canyoning" },
  { src: "/images/rafting/rafting-02.jpg", alt: "Groupe de rafting au bord de la Durance" },
  { src: "/images/canyoning/canyoning-03.jpg", alt: "Saut en canyoning dans un bassin" },
  { src: "/images/rafting/rafting-07.jpg", alt: "Famille souriante en rafting" },
  { src: "/images/canyoning/canyoning-08.jpg", alt: "Parent et enfant en canyoning" },
  { src: "/images/rafting/rafting-12.jpg", alt: "Rafting sportif dans les rapides" },
  { src: "/images/canyoning/canyoning-11.jpg", alt: "Guide encadrant une descente en rappel" },
];

// Only the first tile is enlarged into a 2x2 block — a fixed layout choice,
// independent of which photos are actually in the gallery.
const spanFor = (index: number) => (index === 0 ? "sm:col-span-2 sm:row-span-2" : "");

export async function GalleryPreview() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("gallery");
  const [images, homeSections] = await Promise.all([getGalleryImages(12), getHomeSections()]);
  const section = homeSections?.gallerySection;

  const tiles =
    images && images.length > 0
      ? images.map((doc) => ({
          key: doc._id,
          src: imageUrl(doc.image, 1200) ?? "",
          alt: pick(doc.alt, locale) ?? "",
        }))
      : fallbackTiles.map((tile) => ({ key: tile.src, ...tile }));

  return (
    <section className="bg-surface-muted py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={pick(section?.eyebrow, locale) ?? t("eyebrow")}
            title={pick(section?.title, locale) ?? t("title")}
            subtitle={pick(section?.subtitle, locale) ?? t("subtitle")}
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:[grid-auto-rows:9rem]">
          {tiles.map((tile, index) => (
            <Reveal key={tile.key} delay={index * 0.04} className={spanFor(index)}>
              <div className="group relative h-full min-h-32 overflow-hidden rounded-2xl">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
