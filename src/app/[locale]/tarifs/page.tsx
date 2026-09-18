import { getLocale, getTranslations } from "next-intl/server";
import { Waves, Mountain } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import {
  getActivity,
  getHomeSections,
  getItineraries,
  getPricingPage,
  pick,
  type Locale,
} from "@/sanity/lib/content";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pricing");
  const pricingPage = await getPricingPage();
  return { title: pick(pricingPage?.title, locale) ?? t("title") };
}

export default async function PricingPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pricing");
  const tActivities = await getTranslations("activities");
  const tPractical = await getTranslations("practical");
  const [pricingPage, homeSections, rafting, itineraries] = await Promise.all([
    getPricingPage(),
    getHomeSections(),
    getActivity("rafting"),
    getItineraries("canyoning"),
  ]);

  const practicalItems = homeSections?.practicalInfoSection?.items;
  const practicalValue = (key: string, fallbackKey: string) =>
    pick(practicalItems?.find((item) => item.key === key)?.value, locale) ??
    tPractical(`${fallbackKey}.value`);

  const raftingTitle = pick(rafting?.title, locale) ?? tActivities("rafting.title");
  const itineraryNames =
    itineraries && itineraries.length > 0
      ? itineraries.map((it) => it.name ?? "")
      : [
          tActivities("canyoning.itineraries.0.name"),
          tActivities("canyoning.itineraries.1.name"),
        ];

  const offers = [
    { key: "rafting", icon: Waves, title: raftingTitle },
    { key: "canyon-0", icon: Mountain, title: itineraryNames[0] },
    { key: "canyon-1", icon: Mountain, title: itineraryNames[1] },
  ].filter((offer) => offer.title);

  return (
    <>
      <PageHeader
        eyebrow={pick(pricingPage?.eyebrow, locale) ?? t("eyebrow")}
        title={pick(pricingPage?.title, locale) ?? t("title")}
        subtitle={pick(pricingPage?.subtitle, locale) ?? t("subtitle")}
      />

      <section className="py-24">
        <Container>
          <Reveal className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-4 text-center text-sm text-ink-soft">
            {pick(pricingPage?.placeholderNotice, locale) ?? t("placeholderNotice")}
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <Reveal key={offer.key} delay={index * 0.05}>
                <div className="bg-grain flex h-full flex-col gap-4 rounded-[28px] bg-surface-dark p-7 text-white transition-transform duration-200 ease-out hover:-translate-y-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--brand)]">
                    <offer.icon size={20} className="text-ink" />
                  </span>
                  <p className="font-display text-lg font-semibold text-white">
                    {offer.title}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {practicalValue("duration", "duration")}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {practicalValue("group", "group")}
                  </p>
                  <Button href="/contact" variant="solid" className="mt-auto self-start">
                    {pick(pricingPage?.ctaLabel, locale) ?? t("cta")} →
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Cta />
    </>
  );
}
