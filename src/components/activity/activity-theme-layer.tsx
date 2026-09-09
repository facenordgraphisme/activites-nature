"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { useActivity, type ActivityOrigin } from "./activity-context";
import { PALETTES, photoBackgroundFor } from "@/lib/palettes";
import type { Activity } from "@/lib/activity";

/**
 * Full-bleed photo + color-wash backdrop for the hero. On activity change, a
 * circle of the incoming palette blooms outward from the trigger point (click,
 * or viewport center for keyboard/route-driven changes) and swallows the
 * outgoing colors — the "spectacular" rafting <-> canyoning moment the site
 * is built around. Uses `backgroundImage` (not the `background` shorthand) so
 * the `bg-cover bg-center` classes on each layer aren't reset by inline styles.
 */
export function ActivityThemeLayer({ initialActivity }: { initialActivity: Activity }) {
  const { registerLayer } = useActivity();
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (baseRef.current) {
      baseRef.current.style.backgroundImage = photoBackgroundFor(PALETTES[initialActivity]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const playWipe = (next: Activity, origin: ActivityOrigin) => {
      const container = containerRef.current;
      const base = baseRef.current;
      const reveal = revealRef.current;
      if (!container || !base || !reveal) return;

      const rect = container.getBoundingClientRect();
      const x = origin ? origin.x - rect.left : rect.width / 2;
      const y = origin ? origin.y - rect.top : rect.height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, rect.width - x),
        Math.max(y, rect.height - y),
      );

      reveal.style.backgroundImage = photoBackgroundFor(PALETTES[next]);

      if (prefersReducedMotion) {
        reveal.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;
        base.style.backgroundImage = photoBackgroundFor(PALETTES[next]);
        reveal.style.transition = "opacity 200ms var(--ease-out)";
        reveal.style.opacity = "1";
        window.setTimeout(() => {
          reveal.style.opacity = "0";
          reveal.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        }, 200);
        return;
      }

      reveal.style.opacity = "1";
      reveal.style.clipPath = `circle(0px at ${x}px ${y}px)`;

      animate(0, maxRadius, {
        duration: 0.9,
        ease: [0.77, 0, 0.175, 1],
        onUpdate: (value) => {
          reveal.style.clipPath = `circle(${value}px at ${x}px ${y}px)`;
        },
        onComplete: () => {
          base.style.backgroundImage = photoBackgroundFor(PALETTES[next]);
          reveal.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        },
      });
    };

    registerLayer(playWipe);
    return () => registerLayer(null);
  }, [registerLayer, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div ref={baseRef} className="absolute inset-0 bg-cover bg-center" />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-cover bg-center opacity-0"
        style={{ clipPath: "circle(0px at 50% 50%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
    </div>
  );
}
