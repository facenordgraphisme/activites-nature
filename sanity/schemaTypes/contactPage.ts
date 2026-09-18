import { defineType, defineField } from "sanity";

/** Singleton — shared by the global bottom-of-page CTA and the /contact page header. */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact — accroche",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({ name: "subtitle", title: "Sous-titre", type: "localeText" }),
  ],
  preview: {
    prepare: () => ({ title: "Contact — accroche" }),
  },
});
