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
  ],
});
