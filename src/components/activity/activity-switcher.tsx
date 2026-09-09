"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useActivity } from "./activity-context";
import { ACTIVITIES } from "@/lib/activity";
import { cn } from "@/lib/cn";

export function ActivitySwitcher({ className }: { className?: string }) {
  const t = useTranslations("switcher");
  const { activity, setActivity } = useActivity();

  return (
    <div
      role="tablist"
      aria-label={t("label")}
      className={cn(
        "relative inline-flex items-center rounded-full border border-white/25 bg-white/10 p-1 backdrop-blur-md",
        className,
      )}
    >
      {ACTIVITIES.map((option) => (
        <SwitchOption
          key={option}
          active={activity === option}
          label={t(option)}
          onSelect={(origin) => setActivity(option, origin)}
        />
      ))}
    </div>
  );
}

function SwitchOption({
  active,
  label,
  onSelect,
}: {
  active: boolean;
  label: string;
  onSelect: (origin: { x: number; y: number }) => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={(event) => onSelect({ x: event.clientX, y: event.clientY })}
      className={cn(
        "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ease-out sm:px-6 sm:text-base",
        active ? "text-ink" : "text-white/80 hover:text-white",
      )}
    >
      {active && (
        <motion.span
          layoutId="activity-switch-pill"
          className="absolute inset-0 -z-10 rounded-full bg-white"
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
        />
      )}
      {label}
    </button>
  );
}
