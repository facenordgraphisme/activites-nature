import { defineType, defineField } from "sanity";

/** Singleton — copy for the /prochains-departs page header and empty state. */
export const departuresPage = defineType({
  name: "departuresPage",
  title: "Page Prochains départs",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Titre", type: "localeString" }),
    defineField({ name: "subtitle", title: "Sous-titre", type: "localeText" }),
    defineField({
      name: "emptyMessage",
      title: "Message si aucun départ programmé",
      type: "localeString",
    }),
    defineField({
      name: "noBookingLinkMessage",
      title: "Label du bouton si le lien de réservation n'est pas encore prêt",
      type: "localeString",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Prochains départs" }),
  },
});
