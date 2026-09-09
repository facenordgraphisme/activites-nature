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

export const PALETTES: Record<Activity, Palette> = {
  rafting: {
    from: "#06263f",
    via: "#0b5b78",
    to: "#12a3ab",
    accent: "#4fe6d1",
    accentSoft: "#bff2ea",
    fg: "#eefdfb",
    heroImage: "/images/rafting/rafting-05.jpg",
  },
  canyoning: {
    from: "#2e150f",
    via: "#7a3418",
    to: "#c8631f",
    accent: "#f7a94a",
    accentSoft: "#fbdcb0",
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
