import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Cta } from "@/components/sections/cta";
import { getHomeSections, pick, type Locale } from "@/sanity/lib/content";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("gallery");
  const homeSections = await getHomeSections();
  return { title: pick(homeSections?.gallerySection?.title, locale) ?? t("title") };
}

export default async function GalleryPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("gallery");
  const homeSections = await getHomeSections();
  const section = homeSections?.gallerySection;

  return (
    <>
      <PageHeader
        eyebrow={pick(section?.eyebrow, locale) ?? t("eyebrow")}
        title={pick(section?.title, locale) ?? t("title")}
        subtitle={pick(section?.subtitle, locale) ?? t("subtitle")}
      />
      <GalleryPreview />
      <Cta />
    </>
  );
}
