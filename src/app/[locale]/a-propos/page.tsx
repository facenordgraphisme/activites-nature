import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { About } from "@/components/sections/about";
import { Cta } from "@/components/sections/cta";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: t("title") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("body")} />
      <About />
      <Cta />
    </>
  );
}
