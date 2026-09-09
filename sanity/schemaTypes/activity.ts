import { defineType, defineField } from "sanity";

export const activity = defineType({
  name: "activity",
  title: "Activité",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Rafting", value: "rafting" },
          { title: "Canyoning", value: "canyoning" },
        ],
      },
    }),
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "heroImage", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "minAge", title: "Âge minimum", type: "string" }),
    defineField({ name: "duration", title: "Durée", type: "localeString" }),
    defineField({ name: "priceFrom", title: "Prix à partir de (€)", type: "number" }),
    defineField({
      name: "highlights",
      title: "Points forts",
      type: "array",
      of: [{ type: "localeString" }],
    }),
  ],
});
