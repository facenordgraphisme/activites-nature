import { getTranslations } from "next-intl/server";
import { ActivityPageHero, ActivityAccentScope } from "@/components/sections/activity-page-hero";
import { PracticalInfo } from "@/components/sections/practical-info";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata() {
  const t = await getTranslations("activities.rafting");
  return { title: t("title"), description: t("description") };
}

export default async function RaftingPage() {
  const t = await getTranslations("activities");
  const highlights = t.raw("rafting.highlights") as string[];

  return (
    <ActivityAccentScope activity="rafting">
      <ActivityPageHero activity="rafting" />

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {t("rafting.title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("rafting.description")}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-surface p-4 text-sm text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <PracticalInfo />
      <Cta />
    </ActivityAccentScope>
  );
}
