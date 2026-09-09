import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FacebookIcon } from "@/components/ui/icons";
import { business } from "@/lib/business-data";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return { title: t("title") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const mapQuery = encodeURIComponent(
    `${business.address.line1}, ${business.address.postalCode} ${business.address.city}, ${business.address.country}`,
  );

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-8">
            <div className="grid gap-4">
              <InfoRow icon={MapPin} label={t("addressLabel")} value={t("address")} />
              {business.phones.map((phone) => (
                <InfoRow
                  key={phone.number}
                  icon={Phone}
                  label={`${t("phoneLabel")} (${phone.label})`}
                  value={phone.number}
                  href={`tel:${phone.number.replace(/\s/g, "")}`}
                />
              ))}
              <InfoRow
                icon={Mail}
                label={t("emailLabel")}
                value={business.email}
                href={`mailto:${business.email}`}
              />
              <InfoRow
                icon={FacebookIcon}
                label={t("facebookLabel")}
                value="natureactivites"
                href={business.facebook}
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
            <ContactForm />
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
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
      <span className="activity-transition flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--activity-accent-soft)]">
        <Icon size={18} className="text-ink" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
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
