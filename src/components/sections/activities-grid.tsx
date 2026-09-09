import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Waves, Mountain } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { PALETTES, photoBackgroundFor } from "@/lib/palettes";

const CARD_IMAGE = {
  rafting: "/images/rafting/rafting-01.jpg",
  canyoning: "/images/canyoning/canyoning-05.jpg",
} as const;

export async function ActivitiesGrid() {
  const t = await getTranslations("activities");

  const raftingHighlights = t.raw("rafting.highlights") as string[];
  const canyoningHighlights = t.raw("canyoning.highlights") as string[];
  const itineraries = t.raw("canyoning.itineraries") as {
    name: string;
    tag: string;
    minAge: string;
    description: string;
  }[];

  return (
    <section className="py-24" id="activites">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <FeatureCard
              href="/rafting"
              icon={Waves}
              palette="rafting"
              title={t("rafting.title")}
              description={t("rafting.description")}
              highlights={raftingHighlights}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <FeatureCard
              href="/canyoning"
              icon={Mountain}
              palette="canyoning"
              title={t("canyoning.title")}
              description={t("canyoning.description")}
              highlights={canyoningHighlights}
            >
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {itineraries.map((itinerary) => (
                  <div
                    key={itinerary.name}
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
  title,
  description,
  highlights,
  children,
}: {
  href: string;
  icon: typeof Waves;
  palette: "rafting" | "canyoning";
  title: string;
  description: string;
  highlights: string[];
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group block bg-cover bg-center rounded-3xl p-8 text-[color:var(--activity-fg)] transition-transform duration-200 ease-out hover:-translate-y-1"
      style={
        {
          backgroundImage: photoBackgroundFor(PALETTES[palette], CARD_IMAGE[palette]),
          "--activity-fg": PALETTES[palette].fg,
          "--activity-accent": PALETTES[palette].accent,
        } as CSSProperties
      }
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
          <Icon size={22} />
        </span>
        <ArrowUpRight
          size={20}
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/85">{description}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/85">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--activity-accent)]" />
            {item}
          </li>
        ))}
      </ul>
      {children}
    </Link>
  );
}
