import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { FacebookIcon } from "@/components/ui/icons";
import { business } from "@/lib/business-data";

export async function Footer() {
  const t = await getTranslations();

  const links = [
    { href: "/rafting", label: t("nav.rafting") },
    { href: "/canyoning", label: t("nav.canyoning") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/tarifs", label: t("nav.pricing") },
    { href: "/galerie", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-surface-muted">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Activités Nature" width={36} height={36} className="h-9 w-9" />
            <p className="font-display text-lg font-semibold text-ink">
              Activités Nature
            </p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">{t("nav.home")}</p>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-soft transition-colors duration-200 ease-out hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">{t("contact.eyebrow")}</p>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{t("contact.address")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <a
                href={`tel:${business.phones[0].number.replace(/\s/g, "")}`}
                className="transition-colors duration-200 ease-out hover:text-ink"
              >
                {business.phones[0].number}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <a
                href={`mailto:${business.email}`}
                className="transition-colors duration-200 ease-out hover:text-ink"
              >
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">{t("contact.facebookLabel")}</p>
          <a
            href={business.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors duration-200 ease-out hover:text-ink"
          >
            <FacebookIcon size={16} />
            natureactivites
          </a>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ink-soft sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}. {t("footer.rights")}
          </p>
          <p>{t("footer.madeWith")}</p>
        </Container>
      </div>
    </footer>
  );
}
