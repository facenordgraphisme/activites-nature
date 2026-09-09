import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Question fréquente",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "localeString" }),
    defineField({ name: "answer", title: "Réponse", type: "localeText" }),
  ],
});
