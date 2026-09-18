import { localeString, localeText } from "./localeString";
import { siteSettings } from "./siteSettings";
import { homeSections } from "./homeSections";
import { contactPage } from "./contactPage";
import { pricingPage } from "./pricingPage";
import { departuresPage } from "./departuresPage";
import { teamMember } from "./teamMember";
import { activity } from "./activity";
import { itinerary } from "./itinerary";
import { departure } from "./departure";
import { testimonial } from "./testimonial";
import { galleryImage } from "./galleryImage";
import { faq } from "./faq";

export const schemaTypes = [
  localeString,
  localeText,
  siteSettings,
  homeSections,
  contactPage,
  pricingPage,
  departuresPage,
  teamMember,
  activity,
  itinerary,
  departure,
  testimonial,
  galleryImage,
  faq,
];

/** Document types that should only ever have a single instance — the desk
 * structure in sanity.config.ts pins these instead of listing them. */
export const singletonTypes = new Set([
  "siteSettings",
  "homeSections",
  "contactPage",
  "pricingPage",
  "departuresPage",
]);
