import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FacebookIcon } from "@/components/ui/icons";
import { business } from "@/lib/business-data";

export async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <section className="py-24">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

          <div className="mt-10 flex w-full max-w-xl flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-surface-muted px-8 py-12">
            <div className="flex gap-1 text-[color:var(--activity-accent)]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-ink-soft">{t("empty")}</p>
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
            >
              <FacebookIcon size={16} />
              {t("cta")}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
