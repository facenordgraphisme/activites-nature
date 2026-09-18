import { getLocale, getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FacebookIcon } from "@/components/ui/icons";
import { business } from "@/lib/business-data";
import { getHomeSections, getSiteSettings, getTestimonials, pick, type Locale } from "@/sanity/lib/content";

export async function Testimonials() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("testimonials");
  const [homeSections, siteSettings, testimonials] = await Promise.all([
    getHomeSections(),
    getSiteSettings(),
    getTestimonials(),
  ]);
  const section = homeSections?.testimonialsSection;
  const facebookUrl = siteSettings?.facebookUrl ?? business.facebook;
  const ctaLabel = pick(section?.ctaLabel, locale) ?? t("cta");

  return (
    <section className="py-24">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            eyebrow={pick(section?.eyebrow, locale) ?? t("eyebrow")}
            title={pick(section?.title, locale) ?? t("title")}
            align="center"
          />

          {testimonials && testimonials.length > 0 ? (
            <div className="mt-10 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((review) => (
                <div
                  key={review._id}
                  className="bg-grain flex h-full flex-col gap-4 rounded-2xl bg-surface-dark p-6 text-left text-white"
                >
                  <div className="flex gap-1 text-[color:var(--brand)]">
                    {Array.from({ length: review.rating ?? 5 }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/80">
                    {pick(review.quote, locale)}
                  </p>
                  <p className="mt-auto text-sm font-semibold text-white">{review.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-grain relative w-full max-w-xl overflow-hidden rounded-3xl bg-surface-dark px-8 py-12 text-white">
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex gap-1 text-[color:var(--brand)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-white/70">{pick(section?.emptyMessage, locale) ?? t("empty")}</p>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
                >
                  <FacebookIcon size={16} />
                  {ctaLabel}
                </a>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
