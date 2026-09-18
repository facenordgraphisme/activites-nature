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
    defineField({
      name: "heroEyebrow",
      title: "Hero — eyebrow",
      description: "Petit texte au-dessus du grand titre (ex: « Eau vive · Rivière Durance »).",
      type: "localeString",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero — titre",
      description: "Le grand titre affiché sur le hero de l'accueil et de la page activité.",
      type: "localeString",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — sous-titre",
      type: "localeText",
    }),
    defineField({ name: "ctaLabel", title: "Hero — bouton principal", type: "localeString" }),
    defineField({ name: "cta2Label", title: "Hero — bouton secondaire", type: "localeString" }),
    defineField({
      name: "heroImage",
      title: "Image de fond (hero)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cardImage",
      title: "Image de la carte (grille activités)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pageHeroImage",
      title: "Image de fond (page /rafting ou /canyoning)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "title",
      title: "Titre (carte / page activité)",
      description: "Ex: « Rafting sur la Durance ». Utilisé dans la grille d'activités et le H2 de la page dédiée.",
      type: "localeString",
    }),
    defineField({ name: "description", title: "Description détaillée", type: "localeText" }),
    defineField({
      name: "highlights",
      title: "Points forts",
      type: "array",
      of: [{ type: "localeString" }],
    }),
    defineField({ name: "minAge", title: "Âge minimum", type: "string" }),
    defineField({ name: "duration", title: "Durée", type: "localeString" }),
    defineField({ name: "priceFrom", title: "Prix à partir de (€)", type: "number" }),
  ],
  preview: {
    select: { title: "title.fr", subtitle: "type" },
  },
});
