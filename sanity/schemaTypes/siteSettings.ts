import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Nom de l'entreprise", type: "string" }),
    defineField({ name: "tagline", title: "Accroche", type: "localeString" }),
    defineField({ name: "phones", title: "Téléphones", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "string" }),
    defineField({ name: "facebookUrl", title: "URL Facebook", type: "url" }),
    defineField({ name: "seasonText", title: "Texte saison", type: "localeString" }),
  ],
});
