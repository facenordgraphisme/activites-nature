import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

export const urlForImage = (source: Image) => builder.image(source);
