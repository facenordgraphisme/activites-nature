import { getTranslations } from "next-intl/server";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { business } from "@/lib/business-data";

export async function Cta() {
  const t = await getTranslations("contact");

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(120deg, #06263f 0%, #12a3ab 45%, #c8631f 100%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
                {t("title")}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                {t("subtitle")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${business.phones[0].number.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
                >
                  <Phone size={16} />
                  {business.phones[0].number}
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-white/10"
                >
                  <Mail size={16} />
                  {business.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
