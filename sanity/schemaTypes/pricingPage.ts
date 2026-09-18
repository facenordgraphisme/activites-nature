import { defineType, defineField } from "sanity";

/** Singleton — copy for the /tarifs page header and notice. */
export const pricingPage = defineType({
  name: "pricingPage",
  title: "Page Tarifs",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({ name: "subtitle", title: "Sous-titre", type: "localeText" }),
    defineField({ name: "placeholderNotice", title: "Bandeau d'avertissement", type: "localeString" }),
    defineField({ name: "ctaLabel", title: "Bouton devis", type: "localeString" }),
  ],
  preview: {
    prepare: () => ({ title: "Page Tarifs" }),
  },
});
