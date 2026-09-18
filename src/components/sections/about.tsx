import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { getHomeSections, getTeamMembers, pick, type Locale } from "@/sanity/lib/content";

export async function About() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");
  const [homeSections, teamMembers] = await Promise.all([getHomeSections(), getTeamMembers()]);
  const section = homeSections?.aboutSection;

  const guides =
    teamMembers && teamMembers.length > 0
      ? teamMembers.map((member) => ({
          key: member._id,
          name: member.name ?? "",
          role: pick(member.role, locale) ?? "",
        }))
      : [
          { key: "guide1", name: t("guide1Name"), role: t("guide1Role") },
          { key: "guide2", name: t("guide2Name"), role: t("guide2Role") },
        ];

  return (
    <section className="py-24" id="a-propos">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={pick(section?.eyebrow, locale) ?? t("eyebrow")}
              title={pick(section?.title, locale) ?? t("title")}
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {pick(section?.body, locale) ?? t("body")}
            </p>
            <p className="mt-4 text-sm font-medium text-ink-soft">
              {pick(section?.certifications, locale) ?? t("certifications")}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <div
                key={guide.key}
                className="bg-grain rounded-2xl bg-surface-dark p-6 text-white"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--brand)]">
                  <Compass size={20} className="text-ink" />
                </div>
                <p className="mt-4 font-display text-xl font-semibold text-white">
                  {guide.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {guide.role}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { src: "/images/canyoning/canyoning-07.jpg", alt: "Encadrement d'un groupe en canyoning" },
            { src: "/images/rafting/rafting-03.jpg", alt: "Briefing avant une descente en rafting" },
            { src: "/images/canyoning/canyoning-01.jpg", alt: "Passage technique encadré en canyoning" },
            { src: "/images/rafting/rafting-09.jpg", alt: "Guide au poste arrière du raft" },
          ].map((photo) => (
            <div
              key={photo.src}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 22vw, 45vw"
                className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
