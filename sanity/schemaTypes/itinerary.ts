import { defineType, defineField } from "sanity";

export const itinerary = defineType({
  name: "itinerary",
  title: "Parcours (canyoning)",
  type: "document",
  fields: [
    defineField({
      name: "activityType",
      title: "Activité",
      type: "string",
      initialValue: "canyoning",
      options: {
        list: [
          { title: "Rafting", value: "rafting" },
          { title: "Canyoning", value: "canyoning" },
        ],
      },
    }),
    defineField({ name: "name", title: "Nom", type: "string" }),
    defineField({ name: "tag", title: "Étiquette", type: "localeString" }),
    defineField({ name: "minAge", title: "Âge minimum", type: "localeString" }),
    defineField({ name: "duration", title: "Durée", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "order", title: "Ordre d'affichage", type: "number" }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "activityType" },
  },
});
