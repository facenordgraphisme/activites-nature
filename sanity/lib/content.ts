import type { Image } from "sanity";
import { sanityClient } from "./client";
import { isSanityConfigured } from "../env";

export type Locale = "fr" | "en";

export type LocaleString = { fr?: string; en?: string } | null | undefined;

/** Resolves a bilingual field for the active locale, falling back to French,
 * then to `undefined` so call sites can layer their own next-intl fallback. */
export function pick(value: LocaleString, locale: Locale): string | undefined {
  return value?.[locale] || value?.fr || undefined;
}

export type SanityImage = Image & { asset?: { _ref: string } };

export type TrustItem = { icon: "guides" | "experience" | "season" | "location"; label: LocaleString };

export type SiteSettings = {
  companyName?: string;
  tagline?: LocaleString;
  phones?: { label?: string; number?: string }[];
  email?: string;
  address?: string;
  facebookUrl?: string;
  facebookHandle?: string;
  trustItems?: TrustItem[];
};

export type ActivityDoc = {
  type: "rafting" | "canyoning";
  heroEyebrow?: LocaleString;
  heroTitle?: LocaleString;
  heroSubtitle?: LocaleString;
  ctaLabel?: LocaleString;
  cta2Label?: LocaleString;
  heroImage?: SanityImage;
  cardImage?: SanityImage;
  pageHeroImage?: SanityImage;
  title?: LocaleString;
  description?: LocaleString;
  highlights?: LocaleString[];
  minAge?: string;
  duration?: LocaleString;
  priceFrom?: number;
};

export type ItineraryDoc = {
  _id: string;
  activityType: "rafting" | "canyoning";
  name?: string;
  tag?: LocaleString;
  minAge?: LocaleString;
  duration?: LocaleString;
  description?: LocaleString;
  images?: SanityImage[];
};

export type TeamMemberDoc = {
  _id: string;
  name?: string;
  role?: LocaleString;
  bio?: LocaleString;
  photo?: SanityImage;
  yearsExperience?: number;
  certifications?: string[];
};

export type TestimonialDoc = {
  _id: string;
  author?: string;
  rating?: number;
  quote?: LocaleString;
  activityType?: "rafting" | "canyoning";
  date?: string;
};

export type GalleryImageDoc = {
  _id: string;
  image?: SanityImage;
  alt?: LocaleString;
  activityType?: "rafting" | "canyoning" | "other";
};

export type HomeSections = {
  activitiesSection?: { eyebrow?: LocaleString; title?: LocaleString; subtitle?: LocaleString };
  aboutSection?: {
    eyebrow?: LocaleString;
    title?: LocaleString;
    body?: LocaleString;
    certifications?: LocaleString;
  };
  practicalInfoSection?: {
    eyebrow?: LocaleString;
    title?: LocaleString;
    items?: { key: string; label?: LocaleString; value?: LocaleString }[];
  };
  testimonialsSection?: {
    eyebrow?: LocaleString;
    title?: LocaleString;
    emptyMessage?: LocaleString;
    ctaLabel?: LocaleString;
  };
  gallerySection?: { eyebrow?: LocaleString; title?: LocaleString; subtitle?: LocaleString };
};

export type ContactPageDoc = { eyebrow?: LocaleString; title?: LocaleString; subtitle?: LocaleString };

export type PricingPageDoc = {
  eyebrow?: LocaleString;
  title?: LocaleString;
  subtitle?: LocaleString;
  placeholderNotice?: LocaleString;
  ctaLabel?: LocaleString;
};

export type DeparturesPageDoc = {
  eyebrow?: LocaleString;
  title?: LocaleString;
  subtitle?: LocaleString;
  emptyMessage?: LocaleString;
  noBookingLinkMessage?: LocaleString;
};

export type DepartureDoc = {
  _id: string;
  activityType: "rafting" | "canyoning";
  itinerary?: { _id: string; name?: string } | null;
  startDateTime: string;
  duration?: string;
  capacity?: number;
  price?: number;
  status?: "open" | "full" | "cancelled";
  bookingUrl?: string;
};

/** Every fetch degrades to `null` instead of throwing — a misconfigured or
 * unreachable Sanity project must never break the page, only fall back to
 * the next-intl copy already baked into each component. */
async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    return null;
  }
}

export const getSiteSettings = () =>
  safeFetch<SiteSettings>(`*[_type == "siteSettings"][0]`);

export const getHomeSections = () =>
  safeFetch<HomeSections>(`*[_type == "homeSections"][0]`);

export const getContactPage = () =>
  safeFetch<ContactPageDoc>(`*[_type == "contactPage"][0]`);

export const getPricingPage = () =>
  safeFetch<PricingPageDoc>(`*[_type == "pricingPage"][0]`);

export const getActivity = (type: "rafting" | "canyoning") =>
  safeFetch<ActivityDoc>(`*[_type == "activity" && type == $type][0]`, { type });

export const getActivities = () =>
  safeFetch<ActivityDoc[]>(`*[_type == "activity"] | order(type asc)`);

export const getItineraries = (activityType: "rafting" | "canyoning" = "canyoning") =>
  safeFetch<ItineraryDoc[]>(
    `*[_type == "itinerary" && activityType == $activityType] | order(order asc)`,
    { activityType },
  );

export const getTeamMembers = () =>
  safeFetch<TeamMemberDoc[]>(`*[_type == "teamMember"] | order(order asc)`);

export const getTestimonials = () =>
  safeFetch<TestimonialDoc[]>(`*[_type == "testimonial"] | order(date desc)`);

export const getGalleryImages = (limit?: number) =>
  safeFetch<GalleryImageDoc[]>(
    `*[_type == "galleryImage"] | order(order asc)${limit ? `[0...${limit}]` : ""}`,
  );

export const getDeparturesPage = () =>
  safeFetch<DeparturesPageDoc>(`*[_type == "departuresPage"][0]`);

/** Every future, non-cancelled departure — the calendar page groups these by day client-side. */
export const getUpcomingDepartures = () =>
  safeFetch<DepartureDoc[]>(
    `*[_type == "departure" && defined(startDateTime) && startDateTime >= $now] | order(startDateTime asc) {
      _id, activityType, startDateTime, duration, capacity, price, status, bookingUrl,
      itinerary -> { _id, name }
    }`,
    { now: new Date().toISOString() },
  );
