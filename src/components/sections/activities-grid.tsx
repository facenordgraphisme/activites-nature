import type { CSSProperties, ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Waves, Mountain } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { PALETTES, photoBackgroundFor } from "@/lib/palettes";
import {
  getActivity,
  getHomeSections,
  getItineraries,
  pick,
  type Locale,
} from "@/sanity/lib/content";
import { imageUrl } from "@/sanity/lib/image";

const CARD_IMAGE_FALLBACK = {
  rafting: "/images/rafting/rafting-01.jpg",
  canyoning: "/images/canyoning/canyoning-05.jpg",
} as const;

export async function ActivitiesGrid() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("activities");
  const [rafting, canyoning, itineraries, homeSections] = await Promise.all([
    getActivity("rafting"),
    getActivity("canyoning"),
    getItineraries("canyoning"),
    getHomeSections(),
  ]);

  const section = homeSections?.activitiesSection;
  const raftingHighlights =
    rafting?.highlights?.map((h) => pick(h, locale)).filter((v): v is string => Boolean(v)) ??
    (t.raw("rafting.highlights") as string[]);
  const canyoningHighlights =
    canyoning?.highlights?.map((h) => pick(h, locale)).filter((v): v is string => Boolean(v)) ??
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
    <section className="py-24" id="activites">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={pick(section?.eyebrow, locale) ?? t("eyebrow")}
            title={pick(section?.title, locale) ?? t("title")}
            subtitle={pick(section?.subtitle, locale) ?? t("subtitle")}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <FeatureCard
              href="/rafting"
              icon={Waves}
              palette="rafting"
              image={imageUrl(rafting?.cardImage) ?? CARD_IMAGE_FALLBACK.rafting}
              title={pick(rafting?.title, locale) ?? t("rafting.title")}
              description={pick(rafting?.description, locale) ?? t("rafting.description")}
              highlights={raftingHighlights}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <FeatureCard
              href="/canyoning"
              icon={Mountain}
              palette="canyoning"
              image={imageUrl(canyoning?.cardImage) ?? CARD_IMAGE_FALLBACK.canyoning}
              title={pick(canyoning?.title, locale) ?? t("canyoning.title")}
              description={pick(canyoning?.description, locale) ?? t("canyoning.description")}
              highlights={canyoningHighlights}
            >
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {itinerariesView.map((itinerary) => (
                  <div
                    key={itinerary.key}
                    className="rounded-xl border border-white/15 bg-black/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-base font-semibold">
                        {itinerary.name}
                      </p>
                      <Badge>{itinerary.tag}</Badge>
                    </div>
                    <p className="mt-1 text-xs font-medium text-white/70">
                      {itinerary.minAge}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      {itinerary.description}
                    </p>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({
  href,
  icon: Icon,
  palette,
  image,
  title,
  description,
  highlights,
  children,
}: {
  href: string;
  icon: typeof Waves;
  palette: "rafting" | "canyoning";
  image: string;
  title: string;
  description: string;
  highlights: string[];
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group bg-grain relative block overflow-hidden rounded-[28px] bg-cover bg-center p-8 text-[color:var(--activity-fg)] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)] sm:p-9"
      style={
        {
          backgroundImage: photoBackgroundFor(PALETTES[palette], image),
          "--activity-fg": PALETTES[palette].fg,
          "--activity-accent": PALETTES[palette].accent,
        } as CSSProperties
      }
    >
      <div className="relative z-10 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
          <Icon size={22} />
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 ease-out group-hover:bg-[color:var(--activity-accent)] group-hover:text-ink">
          <ArrowUpRight
            size={18}
            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
      <h3 className="relative z-10 mt-6 font-display text-2xl font-semibold sm:text-[1.75rem]">{title}</h3>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/85">{description}</p>
      <ul className="relative z-10 mt-5 grid gap-2 sm:grid-cols-2">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/85">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--activity-accent)]" />
            {item}
          </li>
        ))}
      </ul>
      <div className="relative z-10">{children}</div>
    </Link>
  );
}
