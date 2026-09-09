import { getTranslations } from "next-intl/server";
import { Waves, Mountain } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export async function generateMetadata() {
  const t = await getTranslations("pricing");
  return { title: t("title") };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  const tActivities = await getTranslations("activities");
  const tPractical = await getTranslations("practical");

  const offers = [
    { icon: Waves, title: tActivities("rafting.title") },
    { icon: Mountain, title: tActivities("canyoning.itineraries.0.name") },
    { icon: Mountain, title: tActivities("canyoning.itineraries.1.name") },
  ];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-24">
        <Container>
          <Reveal className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-4 text-center text-sm text-ink-soft">
            {t("placeholderNotice")}
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <Reveal key={offer.title} delay={index * 0.05}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
                  <span className="activity-transition flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--activity-accent-soft)]">
                    <offer.icon size={20} className="text-ink" />
                  </span>
                  <p className="font-display text-lg font-semibold text-ink">
                    {offer.title}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {tPractical("duration.value")}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {tPractical("group.value")}
                  </p>
                  <Button href="/contact" variant="ghost" className="mt-auto self-start !px-0">
                    {t("cta")} →
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
