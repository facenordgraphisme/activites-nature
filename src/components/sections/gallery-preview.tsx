import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const tiles = [
  { src: "/images/rafting/rafting-06.jpg", alt: "Rafting dans les rapides de la Durance", span: "sm:col-span-2 sm:row-span-2" },
  { src: "/images/canyoning/canyoning-09.jpg", alt: "Toboggan naturel en canyoning", span: "" },
  { src: "/images/rafting/rafting-02.jpg", alt: "Groupe de rafting au bord de la Durance", span: "" },
  { src: "/images/canyoning/canyoning-03.jpg", alt: "Saut en canyoning dans un bassin", span: "" },
  { src: "/images/rafting/rafting-07.jpg", alt: "Famille souriante en rafting", span: "" },
  { src: "/images/canyoning/canyoning-08.jpg", alt: "Parent et enfant en canyoning", span: "" },
  { src: "/images/rafting/rafting-12.jpg", alt: "Rafting sportif dans les rapides", span: "" },
  { src: "/images/canyoning/canyoning-11.jpg", alt: "Guide encadrant une descente en rappel", span: "" },
];

export async function GalleryPreview() {
  const t = await getTranslations("gallery");

  return (
    <section className="bg-surface-muted py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:[grid-auto-rows:9rem]">
          {tiles.map((tile, index) => (
            <Reveal key={tile.src} delay={index * 0.04} className={tile.span}>
              <div className="relative h-full min-h-32 overflow-hidden rounded-2xl">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 ease-out hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
