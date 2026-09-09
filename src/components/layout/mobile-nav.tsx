"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { useHasMounted } from "@/lib/use-has-mounted";

type NavLink = { href: string; label: string };
type Origin = { x: number; y: number };

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function MobileNav({
  links,
  bookLabel,
}: {
  links: NavLink[];
  bookLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  // The header uses backdrop-blur, which creates a containing block for
  // `position: fixed` descendants — without a portal the panel would be
  // clipped to the header's own height instead of the full viewport.
  const mounted = useHasMounted();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleOpen = () => {
    const rect = toggleRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setOpen(true);
  };

  const maxRadius =
    typeof window === "undefined"
      ? 0
      : Math.hypot(
          Math.max(origin.x, window.innerWidth - origin.x),
          Math.max(origin.y, window.innerHeight - origin.y),
        );

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { clipPath: `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)` }
          }
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }
          }
          transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: EASE_DRAWER }}
          className="fixed inset-0 z-50 flex flex-col bg-ink text-paper"
        >
          <div className="flex items-center justify-between px-5 py-3">
            <LocaleSwitcher variant="dark" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-11 w-11 items-center justify-center"
            >
              <HamburgerIcon open />
            </button>
          </div>

          <motion.nav
            className="flex flex-1 flex-col justify-center gap-1 px-8"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.05, delayChildren: reduceMotion ? 0 : 0.2 } },
              closed: {},
            }}
          >
            {links.map((link) => (
              <motion.div
                key={link.href}
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: reduceMotion ? 0 : 16 },
                }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-display text-4xl font-semibold tracking-tight text-white/90 transition-colors duration-200 ease-out hover:text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="px-8 pb-10 pt-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-ink"
            >
              {bookLabel}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={handleOpen}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center"
      >
        <HamburgerIcon open={false} />
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const barClass = "absolute left-0 h-0.5 w-6 rounded-full bg-current";
  return (
    <span className="relative block h-4 w-6">
      <motion.span
        className={barClass}
        style={{ top: 0 }}
        animate={open ? { top: "7px", rotate: 45 } : { top: 0, rotate: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      />
      <motion.span
        className={barClass}
        style={{ top: "7px" }}
        animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
      />
      <motion.span
        className={barClass}
        style={{ top: "14px" }}
        animate={open ? { top: "7px", rotate: -45 } : { top: "14px", rotate: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      />
    </span>
  );
}
