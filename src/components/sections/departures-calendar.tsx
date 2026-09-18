"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Waves, Mountain, Clock, Users } from "lucide-react";
import { cn } from "@/lib/cn";

export type DepartureView = {
  id: string;
  activityType: "rafting" | "canyoning";
  title: string;
  startISO: string;
  duration?: string;
  capacity?: number;
  price?: number;
  status: "open" | "full" | "cancelled";
  bookingUrl?: string;
};

const activityIcon = { rafting: Waves, canyoning: Mountain } as const;
const activityDot = { rafting: "bg-[#0f8f97]", canyoning: "bg-[#c85a1a]" } as const;

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const addMonths = (date: Date, delta: number) => new Date(date.getFullYear(), date.getMonth() + delta, 1);

export function DeparturesCalendar({
  departures,
  emptyMessage,
  noBookingLinkLabel,
}: {
  departures: DepartureView[];
  emptyMessage: string;
  noBookingLinkLabel: string;
}) {
  const locale = useLocale();
  const t = useTranslations("departures");
  const tNav = useTranslations("nav");

  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  // Only set once the visitor actually clicks a day — otherwise we fall back
  // to the first upcoming day of whichever month is visible (derived below,
  // not stored, so switching months doesn't need an effect to "reset" it).
  const [manualSelection, setManualSelection] = useState<string | null>(null);

  const byDay = useMemo(() => {
    const map = new Map<string, DepartureView[]>();
    for (const departure of departures) {
      const key = dayKey(new Date(departure.startISO));
      const list = map.get(key) ?? [];
      list.push(departure);
      map.set(key, list);
    }
    return map;
  }, [departures]);

  const monthKey = `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}`;
  const firstInMonth = [...byDay.keys()].filter((key) => key.startsWith(monthKey)).sort()[0] ?? null;
  const selectedDay = manualSelection?.startsWith(monthKey) ? manualSelection : firstInMonth;

  if (departures.length === 0) {
    return (
      <div className="bg-grain rounded-3xl bg-surface-dark px-8 py-16 text-center text-white/70">
        {emptyMessage}
      </div>
    );
  }

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-start offset

  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(visibleMonth);
  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, i + 1); // a known Monday
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d);
  });

  const monthStart = startOfMonth(today);
  const maxMonth = addMonths(monthStart, 12);
  const canGoPrev = visibleMonth.getTime() > monthStart.getTime();
  const canGoNext = visibleMonth.getTime() < maxMonth.getTime();

  const selectedDepartures = selectedDay ? (byDay.get(selectedDay) ?? []) : [];
  const selectedDateLabel = selectedDay
    ? new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" }).format(
        new Date(`${selectedDay}T00:00:00`),
      )
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="bg-grain rounded-3xl bg-surface-dark p-6 text-white sm:p-8">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-semibold capitalize">{monthLabel}</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={t("prevMonth")}
              disabled={!canGoPrev}
              onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ease-out enabled:hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label={t("nextMonth")}
              disabled={!canGoNext}
              onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ease-out enabled:hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold uppercase tracking-wide text-white/40">
          {weekdayLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const date = new Date(year, month, day);
            const key = dayKey(date);
            const dayDepartures = byDay.get(key) ?? [];
            const hasDepartures = dayDepartures.length > 0;
            const isSelected = key === selectedDay;
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return (
              <button
                key={key}
                type="button"
                onClick={() => setManualSelection(key)}
                disabled={isPast}
                className={cn(
                  "relative flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-sm transition-colors duration-200 ease-out",
                  isPast && "text-white/20",
                  !isPast && !hasDepartures && "text-white/60 hover:bg-white/5",
                  !isPast && hasDepartures && "font-semibold text-white hover:bg-white/10",
                  isSelected && "bg-[color:var(--brand)] text-ink hover:bg-[color:var(--brand)]",
                )}
              >
                {day}
                {hasDepartures && (
                  <span className="flex gap-0.5">
                    {[...new Set(dayDepartures.map((d) => d.activityType))].map((type) => (
                      <span
                        key={type}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isSelected ? "bg-ink" : activityDot[type],
                        )}
                      />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[16rem]">
        {!selectedDay ? (
          <p className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center text-sm text-ink-soft">
            {t("selectDayHint")}
          </p>
        ) : (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
              {t("departuresFor")} {selectedDateLabel}
            </p>
            {selectedDepartures.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center text-sm text-ink-soft">
                {t("noDepartureThisDay")}
              </p>
            ) : (
              <div className="mt-4 grid gap-4">
                {selectedDepartures.map((departure) => {
                  const Icon = activityIcon[departure.activityType];
                  const time = new Intl.DateTimeFormat(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(departure.startISO));
                  const closed = departure.status !== "open";

                  return (
                    <motion.div
                      key={departure.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-border bg-surface p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted">
                            <Icon size={18} className="text-ink" />
                          </span>
                          <div>
                            <p className="font-display text-base font-semibold text-ink">
                              {departure.title}
                            </p>
                            <p className="text-sm text-ink-soft">{time}</p>
                          </div>
                        </div>
                        {departure.status === "full" && (
                          <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-ink-soft">
                            {t("full")}
                          </span>
                        )}
                        {departure.status === "cancelled" && (
                          <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-ink-soft line-through">
                            {t("cancelled")}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
                        {departure.duration && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={14} />
                            {departure.duration}
                          </span>
                        )}
                        {typeof departure.capacity === "number" && (
                          <span className="inline-flex items-center gap-1.5">
                            <Users size={14} />
                            {t("spots", { count: departure.capacity })}
                          </span>
                        )}
                        {typeof departure.price === "number" && (
                          <span className="font-semibold text-ink">
                            {departure.price} € {t("priceSuffix")}
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        {departure.bookingUrl && !closed ? (
                          <a
                            href={departure.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
                          >
                            {tNav("bookNow")}
                          </a>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-surface-muted px-5 py-2 text-sm font-semibold text-ink-soft">
                            {closed ? (departure.status === "full" ? t("full") : t("cancelled")) : noBookingLinkLabel}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
