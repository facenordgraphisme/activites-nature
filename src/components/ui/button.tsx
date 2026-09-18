import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const base =
  "activity-transition inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold sm:text-base transition-all duration-200 ease-out active:scale-[0.97]";

const variants = {
  solid:
    "bg-[color:var(--activity-accent)] text-ink shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-lg",
  dark: "bg-ink text-paper hover:-translate-y-0.5 hover:bg-black",
  outline:
    "border border-white/40 text-white hover:bg-white/10",
  outlineDark:
    "border border-border text-ink hover:border-ink hover:bg-surface-muted",
  ghost: "text-ink-soft hover:text-ink",
};

type ButtonOwnProps = {
  variant?: keyof typeof variants;
  className?: string;
};

export function Button({
  variant = "solid",
  className,
  href,
  ...props
}: ButtonOwnProps &
  (
    | ({ href: string } & ComponentPropsWithoutRef<typeof Link>)
    | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
  )) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as ComponentPropsWithoutRef<"button">)}
    />
  );
}
