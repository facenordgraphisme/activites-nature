import { getLocale, getTranslations } from "next-intl/server";
import { CalendarRange, Clock, Users, ShieldCheck, Backpack } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { getHomeSections, pick, type Locale } from "@/sanity/lib/content";

const iconFor: Record<string, typeof CalendarRange> = {
  season: CalendarRange,
  duration: Clock,
  group: Users,
  equipment: ShieldCheck,
  bring: Backpack,
};

const fallbackKeys = ["season", "duration", "group", "equipment", "bring"] as const;

export async function PracticalInfo() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("practical");
  const homeSections = await getHomeSections();
  const section = homeSections?.practicalInfoSection;

  const items =
    section?.items && section.items.length > 0
      ? section.items.map((item) => ({
          key: item.key,
          label: pick(item.label, locale) ?? t(`${item.key}.label`),
          value: pick(item.value, locale) ?? t(`${item.key}.value`),
        }))
      : fallbackKeys.map((key) => ({ key, label: t(`${key}.label`), value: t(`${key}.value`) }));

  return (
    <section className="bg-surface-muted py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={pick(section?.eyebrow, locale) ?? t("eyebrow")}
            title={pick(section?.title, locale) ?? t("title")}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => {
            const Icon = iconFor[item.key] ?? CalendarRange;
            return (
              <Reveal key={item.key} delay={index * 0.05}>
                <div className="bg-grain flex h-full flex-col gap-3 rounded-2xl bg-surface-dark p-6 text-white transition-transform duration-200 ease-out hover:-translate-y-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--brand)]">
                    <Icon size={18} className="text-ink" />
                  </span>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-sm leading-relaxed text-white/60">{item.value}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
