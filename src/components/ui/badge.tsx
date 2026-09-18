import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "activity-transition inline-flex items-center rounded-full bg-[color:var(--activity-accent-soft)] px-3 py-1 text-xs font-semibold tracking-wide text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
