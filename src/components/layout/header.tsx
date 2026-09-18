import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

export async function Header() {
  const t = await getTranslations("nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/rafting", label: t("rafting") },
    { href: "/canyoning", label: t("canyoning") },
    { href: "/a-propos", label: t("about") },
    { href: "/tarifs", label: t("pricing") },
    { href: "/prochains-departs", label: t("departures") },
    { href: "/galerie", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-3 z-30 px-3 sm:top-4 sm:px-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border border-border/70 bg-paper/90 py-2 pl-3 pr-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:pl-4 sm:pr-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="Activités Nature"
            width={40}
            height={40}
            className="h-9 w-9 sm:h-10 sm:w-10"
            priority
          />
          <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:inline">
            Activités Nature
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 ease-out hover:bg-surface-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
          >
            {t("bookNow")}
          </Link>
        </div>

        <MobileNav links={links} bookLabel={t("bookNow")} />
      </div>
    </header>
  );
}
