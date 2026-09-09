import { defineType, defineField } from "sanity";

export const itinerary = defineType({
  name: "itinerary",
  title: "Parcours (canyoning)",
  type: "document",
  fields: [
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
  ],
});
