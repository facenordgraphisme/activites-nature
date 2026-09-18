import type { CSSProperties, ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Waves, Mountain } from "lucide-react";
import type { Activity } from "@/lib/activity";
import { PALETTES, photoBackgroundFor } from "@/lib/palettes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { RevealLine } from "@/components/ui/reveal";
import { getActivity, pick, type Locale } from "@/sanity/lib/content";
import { imageUrl } from "@/sanity/lib/image";

const PAGE_HERO_IMAGE_FALLBACK: Record<Activity, string> = {
  rafting: "/images/rafting/rafting-04.jpg",
  canyoning: "/images/canyoning/canyoning-11.jpg",
};

export async function ActivityPageHero({ activity }: { activity: Activity }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations(`hero.${activity}`);
  const doc = await getActivity(activity);
  const palette = PALETTES[activity];
  const Icon = activity === "rafting" ? Waves : Mountain;

  const eyebrow = pick(doc?.heroEyebrow, locale) ?? t("eyebrow");
  const title = pick(doc?.heroTitle, locale) ?? t("title");
  const subtitle = pick(doc?.heroSubtitle, locale) ?? t("subtitle");
  const cta = pick(doc?.ctaLabel, locale) ?? t("cta");
  const image = imageUrl(doc?.pageHeroImage) ?? PAGE_HERO_IMAGE_FALLBACK[activity];

  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center py-28 text-[color:var(--activity-fg)] sm:py-36"
      style={
        {
          backgroundImage: photoBackgroundFor(palette, image),
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
      <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
          <Icon size={14} className="text-[color:var(--activity-accent)]" />
          {eyebrow}
        </span>
        <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          <RevealLine>{title}</RevealLine>
        </h1>
        <p className="max-w-2xl text-balance text-base leading-relaxed text-[color:var(--activity-fg)]/80 sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-2">
          <Button href="/contact">{cta}</Button>
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
