import { getLocale, getTranslations } from "next-intl/server";
import { ActivityPageHero, ActivityAccentScope } from "@/components/sections/activity-page-hero";
import { PracticalInfo } from "@/components/sections/practical-info";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { getActivity, getItineraries, pick, type Locale } from "@/sanity/lib/content";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("activities.canyoning");
  const activity = await getActivity("canyoning");
  return {
    title: pick(activity?.title, locale) ?? t("title"),
    description: pick(activity?.description, locale) ?? t("description"),
  };
}

export default async function CanyoningPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("activities");
  const [activity, itineraries] = await Promise.all([
    getActivity("canyoning"),
    getItineraries("canyoning"),
  ]);

  const title = pick(activity?.title, locale) ?? t("canyoning.title");
  const description = pick(activity?.description, locale) ?? t("canyoning.description");
  const highlights =
    activity?.highlights?.map((h) => pick(h, locale)).filter((v): v is string => Boolean(v)) ??
    (t.raw("canyoning.highlights") as string[]);

  const itinerariesView =
    itineraries && itineraries.length > 0
      ? itineraries.map((it) => ({
          key: it._id,
          name: it.name ?? "",
          tag: pick(it.tag, locale) ?? "",
          minAge: pick(it.minAge, locale) ?? "",
          description: pick(it.description, locale) ?? "",
        }))
      : (
          t.raw("canyoning.itineraries") as {
            name: string;
            tag: string;
            minAge: string;
            description: string;
          }[]
        ).map((it) => ({ key: it.name, ...it }));

  return (
    <ActivityAccentScope activity="canyoning">
      <ActivityPageHero activity="canyoning" />

      <section className="py-24">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="bg-grain rounded-xl bg-surface-dark p-4 text-sm text-white/80"
              >
                {item}
              </div>
            ))}
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {itinerariesView.map((itinerary, index) => (
              <Reveal key={itinerary.key} delay={index * 0.08}>
                <div className="bg-grain h-full rounded-[28px] bg-surface-dark p-7 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {itinerary.name}
                    </h3>
                    <Badge>{itinerary.tag}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[color:var(--brand)]">
                    {itinerary.minAge}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {itinerary.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PracticalInfo />
      <Cta />
    </ActivityAccentScope>
  );
}
