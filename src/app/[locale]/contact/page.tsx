import type { ComponentType } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FacebookIcon } from "@/components/ui/icons";
import { business } from "@/lib/business-data";
import { getActivity, getContactPage, getSiteSettings, pick, type Locale } from "@/sanity/lib/content";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("contact");
  const contactPage = await getContactPage();
  return { title: pick(contactPage?.title, locale) ?? t("title") };
}

export default async function ContactPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("contact");
  const [contactPage, siteSettings, rafting, canyoning] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getActivity("rafting"),
    getActivity("canyoning"),
  ]);
  const activityOptions = [rafting?.title, canyoning?.title]
    .map((title) => pick(title, locale))
    .filter((v): v is string => Boolean(v));

  const address = siteSettings?.address ?? t("address");
  const phones = siteSettings?.phones?.length
    ? siteSettings.phones
    : business.phones.map((p) => ({ label: p.label, number: p.number }));
  const email = siteSettings?.email ?? business.email;
  const facebookUrl = siteSettings?.facebookUrl ?? business.facebook;
  const facebookHandle = siteSettings?.facebookHandle ?? "natureactivites";

  const mapQuery = encodeURIComponent(address);

  return (
    <>
      <PageHeader
        eyebrow={pick(contactPage?.eyebrow, locale) ?? t("eyebrow")}
        title={pick(contactPage?.title, locale) ?? t("title")}
        subtitle={pick(contactPage?.subtitle, locale) ?? t("subtitle")}
      />

      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-8">
            <div className="grid gap-4">
              <InfoRow icon={MapPin} label={t("addressLabel")} value={address} />
              {phones.map((phone) => (
                <InfoRow
                  key={phone.number}
                  icon={Phone}
                  label={`${t("phoneLabel")} (${phone.label})`}
                  value={phone.number ?? ""}
                  href={`tel:${(phone.number ?? "").replace(/\s/g, "")}`}
                />
              ))}
              <InfoRow
                icon={Mail}
                label={t("emailLabel")}
                value={email}
                href={`mailto:${email}`}
              />
              <InfoRow
                icon={FacebookIcon}
                label={t("facebookLabel")}
                value={facebookHandle}
                href={facebookUrl}
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Localisation Activités Nature — Baratier"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm activityOptions={activityOptions} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="bg-grain flex items-start gap-3 rounded-xl bg-surface-dark p-4 text-white">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand)]">
        <Icon size={18} className="text-ink" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block transition-opacity duration-200 ease-out hover:opacity-80"
      >
        {content}
      </a>
    );
  }

  return content;
}
