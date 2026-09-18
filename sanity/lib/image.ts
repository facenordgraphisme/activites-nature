import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

export const urlForImage = (source: Image) => builder.image(source);

/** Resolves a Sanity image field to a URL, or `undefined` if the field is
 * empty — callers fall back to a local `/public` asset in that case. */
export function imageUrl(
  source: (Image & { asset?: { _ref: string } }) | null | undefined,
  width = 1600,
): string | undefined {
  if (!source?.asset) return undefined;
  return builder.image(source).width(width).auto("format").url();
}
