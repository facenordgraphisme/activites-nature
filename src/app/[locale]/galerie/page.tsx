import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Cta } from "@/components/sections/cta";

export async function generateMetadata() {
  const t = await getTranslations("gallery");
  return { title: t("title") };
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <GalleryPreview />
      <Cta />
    </>
  );
}
