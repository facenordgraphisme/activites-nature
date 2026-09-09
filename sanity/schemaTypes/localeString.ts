import { defineType, defineField } from "sanity";

/** Reusable bilingual string/text field set, used inline via `fields: [...localeStringFields("title")]`. */
export const localeString = defineType({
  name: "localeString",
  title: "Texte (FR/EN)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Texte long (FR/EN)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "text" }),
    defineField({ name: "en", title: "English", type: "text" }),
  ],
});
