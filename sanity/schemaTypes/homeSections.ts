import { defineType, defineField } from "sanity";

/** Singleton — editorial copy for the home page's non-hero sections. Hero copy
 * lives on each `activity` document instead, since it's activity-specific. */
export const homeSections = defineType({
  name: "homeSections",
  title: "Page d'accueil — sections",
  type: "document",
  fields: [
    defineField({
      name: "activitiesSection",
      title: "Section « Nos activités »",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Titre", type: "localeString" }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "localeText" }),
      ],
    }),
    defineField({
      name: "aboutSection",
      title: "Section « Qui sommes-nous »",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Titre", type: "localeString" }),
        defineField({ name: "body", title: "Texte", type: "localeText" }),
        defineField({ name: "certifications", title: "Ligne certifications", type: "localeString" }),
      ],
    }),
    defineField({
      name: "practicalInfoSection",
      title: "Section « Infos pratiques »",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Titre", type: "localeString" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "practicalItem",
              fields: [
                defineField({
                  name: "key",
                  title: "Icône",
                  type: "string",
                  options: {
                    list: [
                      { title: "Saison (calendrier)", value: "season" },
                      { title: "Durée (horloge)", value: "duration" },
                      { title: "Groupes (personnes)", value: "group" },
                      { title: "Matériel (bouclier)", value: "equipment" },
                      { title: "À prévoir (sac)", value: "bring" },
                    ],
                  },
                }),
                defineField({ name: "label", title: "Label", type: "localeString" }),
                defineField({ name: "value", title: "Texte", type: "localeString" }),
              ],
              preview: { select: { title: "label.fr", subtitle: "key" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonialsSection",
      title: "Section « Avis »",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Titre", type: "localeString" }),
        defineField({
          name: "emptyMessage",
          title: "Message si aucun avis",
          type: "localeString",
        }),
        defineField({ name: "ctaLabel", title: "Bouton (vers Facebook)", type: "localeString" }),
      ],
    }),
    defineField({
      name: "gallerySection",
      title: "Section « Galerie »",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Titre", type: "localeString" }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "localeText" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil — sections" }),
  },
});
