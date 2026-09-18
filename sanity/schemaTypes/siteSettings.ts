import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Nom de l'entreprise", type: "string" }),
    defineField({ name: "tagline", title: "Accroche (footer)", type: "localeString" }),
    defineField({
      name: "phones",
      title: "Téléphones",
      type: "array",
      of: [
        {
          type: "object",
          name: "phone",
          fields: [
            defineField({ name: "label", title: "Label (ex: prénom)", type: "string" }),
            defineField({ name: "number", title: "Numéro", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Adresse (formatée)", type: "string" }),
    defineField({ name: "facebookUrl", title: "URL Facebook", type: "url" }),
    defineField({ name: "facebookHandle", title: "Identifiant Facebook affiché", type: "string" }),
    defineField({
      name: "trustItems",
      title: "Bandeau de confiance (hero)",
      description: "Les 4 badges affichés sous le hero (icône + texte).",
      type: "array",
      of: [
        {
          type: "object",
          name: "trustItem",
          fields: [
            defineField({
              name: "icon",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  { title: "Guides diplômés (badge)", value: "guides" },
                  { title: "Expérience (médaille)", value: "experience" },
                  { title: "Saison (calendrier)", value: "season" },
                  { title: "Localisation (pin)", value: "location" },
                ],
              },
            }),
            defineField({ name: "label", title: "Texte", type: "localeString" }),
          ],
          preview: {
            select: { title: "label.fr", subtitle: "icon" },
          },
        },
      ],
    }),
  ],
});
