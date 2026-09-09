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
    { href: "/galerie", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-2 sm:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Activités Nature"
            width={80}
            height={80}
            className="h-20 w-20"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors duration-200 ease-out hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
          >
            {t("bookNow")}
          </Link>
        </div>

        <MobileNav links={links} bookLabel={t("bookNow")} />
      </div>
    </header>
  );
}
