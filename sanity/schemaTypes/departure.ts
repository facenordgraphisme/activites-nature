import { defineType, defineField } from "sanity";

export const departure = defineType({
  name: "departure",
  title: "Départ programmé",
  type: "document",
  fields: [
    defineField({
      name: "activityType",
      title: "Activité",
      type: "string",
      validation: (r) => r.required(),
      options: {
        list: [
          { title: "Rafting", value: "rafting" },
          { title: "Canyoning", value: "canyoning" },
        ],
      },
    }),
    defineField({
      name: "itinerary",
      title: "Parcours (canyoning uniquement)",
      description: "Laisser vide pour le rafting. Précise quel parcours canyoning si besoin.",
      type: "reference",
      to: [{ type: "itinerary" }],
      options: { filter: 'activityType == "canyoning"' },
      hidden: ({ document }) => document?.activityType !== "canyoning",
    }),
    defineField({
      name: "startDateTime",
      title: "Date et heure de départ",
      type: "datetime",
      validation: (r) => r.required(),
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
    }),
    defineField({
      name: "duration",
      title: "Durée affichée",
      description: "Ex: « 2h30 »",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Nombre de places",
      type: "number",
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "price",
      title: "Prix par personne (€)",
      type: "number",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      initialValue: "open",
      options: {
        list: [
          { title: "Ouvert aux réservations", value: "open" },
          { title: "Complet", value: "full" },
          { title: "Annulé", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "bookingUrl",
      title: "Lien de réservation (Outplanners)",
      description: "Laisser vide tant que la réservation en ligne n'est pas prête pour ce départ.",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Date de départ",
      name: "startDateTimeAsc",
      by: [{ field: "startDateTime", direction: "asc" }],
    },
  ],
  preview: {
    select: { activityType: "activityType", startDateTime: "startDateTime", status: "status" },
    prepare: ({ activityType, startDateTime, status }) => {
      const date = startDateTime
        ? new Date(startDateTime).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Date non définie";
      const label = activityType === "canyoning" ? "Canyoning" : "Rafting";
      const statusSuffix = status && status !== "open" ? ` — ${status === "full" ? "complet" : "annulé"}` : "";
      return { title: `${date} · ${label}${statusSuffix}` };
    },
  },
});
