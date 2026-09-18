import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { FacebookIcon } from "@/components/ui/icons";
import { business } from "@/lib/business-data";
import { getSiteSettings, pick, type Locale } from "@/sanity/lib/content";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const siteSettings = await getSiteSettings();

  const companyName = siteSettings?.companyName ?? business.name;
  const tagline = pick(siteSettings?.tagline, locale) ?? t("footer.tagline");
  const address = siteSettings?.address ?? t("contact.address");
  const phone = siteSettings?.phones?.[0]?.number ?? business.phones[0].number;
  const email = siteSettings?.email ?? business.email;
  const facebookUrl = siteSettings?.facebookUrl ?? business.facebook;
  const facebookHandle = siteSettings?.facebookHandle ?? "natureactivites";

  const links = [
    { href: "/rafting", label: t("nav.rafting") },
    { href: "/canyoning", label: t("nav.canyoning") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/tarifs", label: t("nav.pricing") },
    { href: "/prochains-departs", label: t("nav.departures") },
    { href: "/galerie", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-surface-dark text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--brand), transparent)" }}
      />
      <Container className="grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Activités Nature" width={36} height={36} className="h-9 w-9" />
            <p className="font-display text-lg font-semibold text-white">
              {companyName}
            </p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            {tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            {t("nav.home")}
          </p>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors duration-200 ease-out hover:text-[color:var(--brand)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            {t("contact.eyebrow")}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-white/40" />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-white/40" />
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="transition-colors duration-200 ease-out hover:text-[color:var(--brand)]"
              >
                {phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-white/40" />
              <a
                href={`mailto:${email}`}
                className="transition-colors duration-200 ease-out hover:text-[color:var(--brand)]"
              >
                {email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            {t("contact.facebookLabel")}
          </p>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 ease-out hover:text-[color:var(--brand)]"
          >
            <FacebookIcon size={16} />
            {facebookHandle}
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {companyName}. {t("footer.rights")}
          </p>
          <p>{t("footer.madeWith")}</p>
        </Container>
      </div>
    </footer>
  );
}
