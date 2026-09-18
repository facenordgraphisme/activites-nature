import { getLocale, getTranslations } from "next-intl/server";
import { getActivity, getSiteSettings, pick, type Locale } from "@/sanity/lib/content";
import { imageUrl } from "@/sanity/lib/image";
import { PALETTES } from "@/lib/palettes";
import { HeroClient, type HeroActivityContent, type HeroTrustItem } from "./hero-client";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const [rafting, canyoning, siteSettings] = await Promise.all([
    getActivity("rafting"),
    getActivity("canyoning"),
    getSiteSettings(),
  ]);

  const content: Record<"rafting" | "canyoning", HeroActivityContent> = {
    rafting: {
      eyebrow: pick(rafting?.heroEyebrow, locale) ?? t("hero.rafting.eyebrow"),
      title: pick(rafting?.heroTitle, locale) ?? t("hero.rafting.title"),
      subtitle: pick(rafting?.heroSubtitle, locale) ?? t("hero.rafting.subtitle"),
      cta: pick(rafting?.ctaLabel, locale) ?? t("hero.rafting.cta"),
      cta2: pick(rafting?.cta2Label, locale) ?? t("hero.rafting.cta2"),
      image: imageUrl(rafting?.heroImage) ?? PALETTES.rafting.heroImage,
    },
    canyoning: {
      eyebrow: pick(canyoning?.heroEyebrow, locale) ?? t("hero.canyoning.eyebrow"),
      title: pick(canyoning?.heroTitle, locale) ?? t("hero.canyoning.title"),
      subtitle: pick(canyoning?.heroSubtitle, locale) ?? t("hero.canyoning.subtitle"),
      cta: pick(canyoning?.ctaLabel, locale) ?? t("hero.canyoning.cta"),
      cta2: pick(canyoning?.cta2Label, locale) ?? t("hero.canyoning.cta2"),
      image: imageUrl(canyoning?.heroImage) ?? PALETTES.canyoning.heroImage,
    },
  };

  const trustKeys = ["guides", "experience", "season", "location"] as const;
  const trustItems: HeroTrustItem[] =
    siteSettings?.trustItems?.map((item) => ({
      key: item.icon,
      label: pick(item.label, locale) ?? t(`trust.${item.icon}`),
    })) ?? trustKeys.map((key) => ({ key, label: t(`trust.${key}`) }));

  return <HeroClient content={content} trustItems={trustItems} />;
}
