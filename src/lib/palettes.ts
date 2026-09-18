import type { Activity } from "./activity";

export type Palette = {
  from: string;
  via: string;
  to: string;
  accent: string;
  accentSoft: string;
  fg: string;
  heroImage: string;
};

// Chrome (buttons, badges, bullets) shares one brand accent everywhere — only the
// photo wash + hero foreground swap per activity, so the site reads as one brand.
const BRAND_ACCENT = "#cdff5c";
const BRAND_ACCENT_SOFT = "#e8ffb8";

export const PALETTES: Record<Activity, Palette> = {
  rafting: {
    from: "#052033",
    via: "#0a4f68",
    to: "#0f8f97",
    accent: BRAND_ACCENT,
    accentSoft: BRAND_ACCENT_SOFT,
    fg: "#eefdfb",
    heroImage: "/images/rafting/rafting-05.jpg",
  },
  canyoning: {
    from: "#261209",
    via: "#6e2f13",
    to: "#c85a1a",
    accent: BRAND_ACCENT,
    accentSoft: BRAND_ACCENT_SOFT,
    fg: "#fff6ec",
    heroImage: "/images/canyoning/canyoning-06.jpg",
  },
};

export const gradientFor = (palette: Palette) =>
  `linear-gradient(135deg, ${palette.from} 0%, ${palette.via} 55%, ${palette.to} 100%)`;

const hexToRgba = (hex: string, alpha: number) => {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Color wash + photo, for hero/card backgrounds — keeps the palette legible over a real photo. */
export const photoBackgroundFor = (palette: Palette, image = palette.heroImage) =>
  `linear-gradient(135deg, ${hexToRgba(palette.from, 0.88)} 0%, ${hexToRgba(palette.via, 0.72)} 55%, ${hexToRgba(palette.to, 0.8)} 100%), url(${image})`;
