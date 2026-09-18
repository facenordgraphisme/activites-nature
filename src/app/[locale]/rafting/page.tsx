import { getLocale, getTranslations } from "next-intl/server";
import { ActivityPageHero, ActivityAccentScope } from "@/components/sections/activity-page-hero";
import { PracticalInfo } from "@/components/sections/practical-info";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getActivity, pick, type Locale } from "@/sanity/lib/content";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("activities.rafting");
  const activity = await getActivity("rafting");
  return {
    title: pick(activity?.title, locale) ?? t("title"),
    description: pick(activity?.description, locale) ?? t("description"),
  };
}

export default async function RaftingPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("activities");
  const activity = await getActivity("rafting");

  const title = pick(activity?.title, locale) ?? t("rafting.title");
  const description = pick(activity?.description, locale) ?? t("rafting.description");
  const highlights =
    activity?.highlights?.map((h) => pick(h, locale)).filter((v): v is string => Boolean(v)) ??
    (t.raw("rafting.highlights") as string[]);

  return (
    <ActivityAccentScope activity="rafting">
      <ActivityPageHero activity="rafting" />

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="bg-grain rounded-xl bg-surface-dark p-4 text-sm text-white/80"
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
