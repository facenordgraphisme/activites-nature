"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/cn";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
] as const;

export function LocaleSwitcher({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const dark = variant === "dark";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border p-0.5 text-xs font-semibold",
        dark ? "border-white/20 bg-white/10" : "border-border bg-surface",
        className,
      )}
    >
      {locales.map(({ code, label }) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          aria-current={activeLocale === code}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors duration-200 ease-out",
            activeLocale === code
              ? dark
                ? "bg-white text-ink"
                : "bg-ink text-paper"
              : dark
                ? "text-white/70 hover:text-white"
                : "text-ink-soft hover:text-ink",
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
