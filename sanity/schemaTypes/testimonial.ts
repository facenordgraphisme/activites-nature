import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Avis client",
  type: "document",
  fields: [
    defineField({ name: "author", title: "Auteur", type: "string" }),
    defineField({ name: "rating", title: "Note (1-5)", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "quote", title: "Avis", type: "localeText" }),
    defineField({
      name: "activityType",
      title: "Activité concernée",
      type: "string",
      options: {
        list: [
          { title: "Rafting", value: "rafting" },
          { title: "Canyoning", value: "canyoning" },
        ],
      },
    }),
    defineField({ name: "date", title: "Date", type: "date" }),
  ],
});
