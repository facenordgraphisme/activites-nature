import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Photo galerie",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", title: "Texte alternatif", type: "localeString" }),
    defineField({
      name: "activityType",
      title: "Activité",
      type: "string",
      options: {
        list: [
          { title: "Rafting", value: "rafting" },
          { title: "Canyoning", value: "canyoning" },
          { title: "Autre", value: "other" },
        ],
      },
    }),
    defineField({ name: "order", title: "Ordre d'affichage", type: "number" }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "alt.fr", subtitle: "activityType", media: "image" },
  },
});
