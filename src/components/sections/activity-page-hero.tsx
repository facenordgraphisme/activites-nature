import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Waves, Mountain } from "lucide-react";
import type { Activity } from "@/lib/activity";
import { PALETTES, photoBackgroundFor } from "@/lib/palettes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const PAGE_HERO_IMAGE: Record<Activity, string> = {
  rafting: "/images/rafting/rafting-04.jpg",
  canyoning: "/images/canyoning/canyoning-11.jpg",
};

export async function ActivityPageHero({ activity }: { activity: Activity }) {
  const t = await getTranslations(`hero.${activity}`);
  const palette = PALETTES[activity];
  const Icon = activity === "rafting" ? Waves : Mountain;

  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center py-24 text-[color:var(--activity-fg)] sm:py-32"
      style={
        {
          backgroundImage: photoBackgroundFor(palette, PAGE_HERO_IMAGE[activity]),
          "--activity-fg": palette.fg,
          "--activity-accent": palette.accent,
          "--activity-accent-soft": palette.accentSoft,
        } as CSSProperties
      }
      data-activity={activity}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container className="relative z-10 flex flex-col items-center gap-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          <Icon size={14} />
          {t("eyebrow")}
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-balance text-base leading-relaxed text-[color:var(--activity-fg)]/85 sm:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-2">
          <Button href="/contact">{t("cta")}</Button>
        </div>
      </Container>
    </section>
  );
}

export function ActivityAccentScope({
  activity,
  children,
}: {
  activity: Activity;
  children: ReactNode;
}) {
  return <div data-activity={activity}>{children}</div>;
}
