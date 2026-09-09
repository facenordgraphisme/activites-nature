import { getTranslations } from "next-intl/server";
import { ActivityPageHero, ActivityAccentScope } from "@/components/sections/activity-page-hero";
import { PracticalInfo } from "@/components/sections/practical-info";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata() {
  const t = await getTranslations("activities.canyoning");
  return { title: t("title"), description: t("description") };
}

export default async function CanyoningPage() {
  const t = await getTranslations("activities");
  const highlights = t.raw("canyoning.highlights") as string[];
  const itineraries = t.raw("canyoning.itineraries") as {
    name: string;
    tag: string;
    minAge: string;
    description: string;
  }[];

  return (
    <ActivityAccentScope activity="canyoning">
      <ActivityPageHero activity="canyoning" />

      <section className="py-24">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {t("canyoning.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("canyoning.description")}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-surface p-4 text-sm text-ink-soft"
              >
                {item}
              </div>
            ))}
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {itineraries.map((itinerary, index) => (
              <Reveal key={itinerary.name} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {itinerary.name}
                    </h3>
                    <Badge>{itinerary.tag}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[color:var(--activity-accent)]">
                    {itinerary.minAge}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
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
