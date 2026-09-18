import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { About } from "@/components/sections/about";
import { Cta } from "@/components/sections/cta";
import { getHomeSections, pick, type Locale } from "@/sanity/lib/content";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");
  const homeSections = await getHomeSections();
  return { title: pick(homeSections?.aboutSection?.title, locale) ?? t("title") };
}

export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");
  const homeSections = await getHomeSections();
  const section = homeSections?.aboutSection;

  return (
    <>
      <PageHeader
        eyebrow={pick(section?.eyebrow, locale) ?? t("eyebrow")}
        title={pick(section?.title, locale) ?? t("title")}
        subtitle={pick(section?.body, locale) ?? t("body")}
      />
      <About />
      <Cta />
    </>
  );
}
