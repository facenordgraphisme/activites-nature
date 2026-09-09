import { getTranslations } from "next-intl/server";
import { CalendarRange, Clock, Users, ShieldCheck, Backpack } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const items = [
  { key: "season", icon: CalendarRange },
  { key: "duration", icon: Clock },
  { key: "group", icon: Users },
  { key: "equipment", icon: ShieldCheck },
  { key: "bring", icon: Backpack },
] as const;

export async function PracticalInfo() {
  const t = await getTranslations("practical");

  return (
    <section className="bg-surface-muted py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ key, icon: Icon }, index) => (
            <Reveal key={key} delay={index * 0.05}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
                <span className="activity-transition flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--activity-accent-soft)]">
                  <Icon size={18} className="text-ink" />
                </span>
                <p className="text-sm font-semibold text-ink">
                  {t(`${key}.label`)}
                </p>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {t(`${key}.value`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
