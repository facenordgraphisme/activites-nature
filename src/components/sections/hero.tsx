"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Award, BadgeCheck, CalendarDays, MapPin, Waves, Mountain } from "lucide-react";
import { ActivityProvider, useActivity } from "@/components/activity/activity-context";
import { ActivityThemeLayer } from "@/components/activity/activity-theme-layer";
import { ActivitySwitcher } from "@/components/activity/activity-switcher";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const trustIcons = [BadgeCheck, Award, CalendarDays, MapPin] as const;
const trustKeys = ["guides", "experience", "season", "location"] as const;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Module-level (not React state): flips once, client-side only, after the
// hero's first paint. Reading it during render doesn't retarget an
// in-flight animation the way a state/ref flip reacted to via re-render
// would — it's just picked up fresh on whatever the *next* render happens
// to be (an activity switch), which is exactly what we want: the entrance
// delay plays once, then every later switch is instant.
let heroHasEntered = false;

export function Hero() {
  return (
    <ActivityProvider initialActivity="rafting">
      <HeroInner />
    </ActivityProvider>
  );
}

function HeroInner() {
  const { activity } = useActivity();
  const t = useTranslations();
  const ActivityIcon = activity === "rafting" ? Waves : Mountain;

  // The one-time entrance choreography (logo -> switcher -> copy -> trust bar)
  // only plays on first paint — later activity switches skip the extra delay.
  const entranceDelay = heroHasEntered ? 0 : 0.45;
  useEffect(() => {
    heroHasEntered = true;
  }, []);

  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden text-[color:var(--activity-fg)]">
      <ActivityThemeLayer initialActivity="rafting" />

      <Container className="relative z-10 flex flex-col items-center gap-10 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
        >
          <Image
            src="/logo.png"
            alt="Activités Nature"
            width={176}
            height={176}
            priority
            className="h-32 w-32 drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:h-44 sm:w-44"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
        >
          <ActivitySwitcher />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activity}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: entranceDelay }}
            className="flex max-w-2xl flex-col items-center gap-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <ActivityIcon size={14} />
              {t(`hero.${activity}.eyebrow`)}
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              {t(`hero.${activity}.title`)}
            </h1>
            <p className="text-balance text-base leading-relaxed text-[color:var(--activity-fg)]/85 sm:text-lg">
              {t(`hero.${activity}.subtitle`)}
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="solid">
                {t(`hero.${activity}.cta`)}
              </Button>
              <Button href={`/${activity}`} variant="outline">
                {t(`hero.${activity}.cta2`)}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.dl
          className="grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/20 pt-8 sm:grid-cols-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.85 } },
          }}
        >
          {trustKeys.map((key, index) => {
            const Icon = trustIcons[index];
            return (
              <motion.div
                key={key}
                className="flex flex-col items-center gap-2"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <Icon size={18} className="text-[color:var(--activity-accent)]" />
                <dd className="text-xs leading-snug text-[color:var(--activity-fg)]/80 sm:text-sm">
                  {t(`trust.${key}`)}
                </dd>
              </motion.div>
            );
          })}
        </motion.dl>
      </Container>
    </section>
  );
}
