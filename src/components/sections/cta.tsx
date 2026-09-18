import { getLocale, getTranslations } from "next-intl/server";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { business } from "@/lib/business-data";
import { getContactPage, getSiteSettings, pick, type Locale } from "@/sanity/lib/content";

export async function Cta() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("contact");
  const [contactPage, siteSettings] = await Promise.all([getContactPage(), getSiteSettings()]);

  const title = pick(contactPage?.title, locale) ?? t("title");
  const subtitle = pick(contactPage?.subtitle, locale) ?? t("subtitle");
  const phone = siteSettings?.phones?.[0]?.number ?? business.phones[0].number;
  const email = siteSettings?.email ?? business.email;

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="bg-grain relative overflow-hidden rounded-[2.5rem] bg-surface-dark px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--brand) 22%, transparent) 0%, transparent 55%), radial-gradient(circle at 85% 80%, color-mix(in oklab, var(--brand) 16%, transparent) 0%, transparent 50%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-xl font-display text-3xl font-semibold text-white sm:text-5xl">
                {title}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                {subtitle}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-ink transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
                >
                  <Phone size={16} />
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-white/10"
                >
                  <Mail size={16} />
                  {email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
