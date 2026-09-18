import type { StructureResolver } from "sanity/structure";
import { singletonTypes } from "./schemaTypes";

/** Pins singleton documents (site settings, page sections) as single editable
 * items instead of listable collections, and groups the rest by topic. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Réglages du site")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Page d'accueil — sections")
        .id("homeSections")
        .child(S.document().schemaType("homeSections").documentId("homeSections")),
      S.listItem()
        .title("Contact — accroche")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.listItem()
        .title("Page Tarifs")
        .id("pricingPage")
        .child(S.document().schemaType("pricingPage").documentId("pricingPage")),
      S.listItem()
        .title("Page Prochains départs")
        .id("departuresPage")
        .child(S.document().schemaType("departuresPage").documentId("departuresPage")),
      S.divider(),
      S.listItem()
        .title("Départs programmés")
        .id("departure")
        .child(
          S.documentTypeList("departure")
            .title("Départs programmés")
            .defaultOrdering([{ field: "startDateTime", direction: "asc" }]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() ?? "") && listItem.getId() !== "departure",
      ),
    ]);
