import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const base =
  "activity-transition inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold sm:text-base transition-transform duration-200 ease-out active:scale-[0.97]";

const variants = {
  solid:
    "bg-[color:var(--activity-accent)] text-ink hover:brightness-105",
  outline:
    "border border-white/40 text-white hover:bg-white/10",
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
