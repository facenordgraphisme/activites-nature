// One-off / idempotent content seed. Run with:
//   node --env-file=.env.local scripts/seed-sanity.mjs
// Every document uses a deterministic _id + createOrReplace, so re-running
// this script updates the same records instead of duplicating them.
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN — aborting seed.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const assetCache = new Map();

async function image(relPath) {
  if (assetCache.has(relPath)) return assetCache.get(relPath);
  const filePath = join(process.cwd(), "public", relPath);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename: relPath.split("/").pop() });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  assetCache.set(relPath, ref);
  console.log(`  uploaded ${relPath} -> ${asset._id}`);
  return ref;
}

const loc = (fr, en) => ({ fr, en });

async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log(`upserted ${doc._type}/${doc._id}`);
}

async function run() {
  console.log(`Seeding project ${projectId} (${dataset})...\n`);

  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Activités Nature",
    tagline: loc(
      "Rafting & canyoning entre Embrun et le lac de Serre-Ponçon.",
      "Rafting & canyoning between Embrun and Lake Serre-Ponçon.",
    ),
    phones: [
      { _key: "patrick", label: "Patrick", number: "+33 7 66 01 05 09" },
      { _key: "xavier", label: "Xavier", number: "+33 6 83 56 42 84" },
    ],
    email: "activites.nature@gmail.com",
    address: "Z.A. Les Portes du Lac, 05200 Baratier, France",
    facebookUrl: "https://www.facebook.com/natureactivites",
    facebookHandle: "natureactivites",
    trustItems: [
      { _key: "guides", icon: "guides", label: loc("Guides diplômés d'État", "State-certified guides") },
      {
        _key: "experience",
        icon: "experience",
        label: loc("30 ans d'expérience cumulée", "30 years of combined experience"),
      },
      {
        _key: "season",
        icon: "season",
        label: loc("Ouvert du 1er avril au 2 octobre", "Open April 1 – October 2"),
      },
      {
        _key: "location",
        icon: "location",
        label: loc("Basés à Baratier, lac de Serre-Ponçon", "Based in Baratier, Lake Serre-Ponçon"),
      },
    ],
  });

  await upsert({
    _id: "homeSections",
    _type: "homeSections",
    activitiesSection: {
      eyebrow: loc("Nos activités", "Our activities"),
      title: loc("Une aventure pour chaque envie", "An adventure for every mood"),
      subtitle: loc(
        "Du rafting familial sur la Durance aux canyons sportifs des Écrins : nos guides adaptent chaque sortie à votre niveau.",
        "From family-friendly rafting on the Durance to sportier canyons in the Écrins: our guides tailor every trip to your level.",
      ),
    },
    aboutSection: {
      eyebrow: loc("Qui sommes-nous", "About us"),
      title: loc(
        "Xavier & Patrick, moniteurs passionnés d'eau vive",
        "Xavier & Patrick, passionate whitewater guides",
      ),
      body: loc(
        "Activités Nature, c'est avant tout deux moniteurs indépendants installés à Baratier, au bord du lac de Serre-Ponçon, à deux pas d'Embrun. Guides de moyenne montagne et titulaires de brevets d'État, Xavier et Patrick cumulent plus de 30 ans d'expérience en rafting et canyoning dans les Hautes-Alpes. Leur objectif : partager leur terrain de jeu avec des groupes, des familles et des débutants, dans une ambiance conviviale et sécurisée.",
        "Activités Nature is run by two independent guides based in Baratier, on the shore of Lake Serre-Ponçon, right next to Embrun. Mountain guides and state-certified instructors, Xavier and Patrick share over 30 years of combined experience in rafting and canyoning across the Hautes-Alpes. Their goal: share their playground with groups, families and beginners, in a friendly and safe atmosphere.",
      ),
      certifications: loc(
        "Diplômes d'État, brevets professionnels J.S.",
        "State diplomas, professional J.S. certifications",
      ),
    },
    practicalInfoSection: {
      eyebrow: loc("Infos pratiques", "Good to know"),
      title: loc("Ce qu'il faut savoir avant de venir", "What to know before you come"),
      items: [
        {
          _key: "season",
          key: "season",
          label: loc("Saison", "Season"),
          value: loc("Du 1er avril au 2 octobre, tous les jours", "April 1 to October 2, every day"),
        },
        {
          _key: "duration",
          key: "duration",
          label: loc("Durée", "Duration"),
          value: loc(
            "Demi-journée, environ 2h30 dont 1h30 de pratique",
            "Half-day, about 2h30 including 1h30 of active time",
          ),
        },
        {
          _key: "group",
          key: "group",
          label: loc("Groupes", "Groups"),
          value: loc("Tarif réduit à partir de 3 participants", "Discounted rate from 3 participants"),
        },
        {
          _key: "equipment",
          key: "equipment",
          label: loc("Matériel fourni", "Gear provided"),
          value: loc(
            "Combinaison néoprène, gilet, chaussons, casque, baudrier",
            "Neoprene wetsuit, vest, water shoes, helmet, harness",
          ),
        },
        {
          _key: "bring",
          key: "bring",
          label: loc("À prévoir", "What to bring"),
          value: loc(
            "Maillot de bain, chaussures fermées, serviette et vêtements de rechange",
            "Swimsuit, closed-toe shoes, towel and a change of clothes",
          ),
        },
      ],
    },
    testimonialsSection: {
      eyebrow: loc("Avis", "Reviews"),
      title: loc("Ce que nos aventuriers en disent", "What our adventurers say"),
      emptyMessage: loc(
        "Les avis clients arrivent bientôt sur cette page.",
        "Customer reviews are coming soon to this page.",
      ),
      ctaLabel: loc("Voir nos avis sur Facebook", "See our reviews on Facebook"),
    },
    gallerySection: {
      eyebrow: loc("Galerie", "Gallery"),
      title: loc("L'aventure en images", "The adventure in pictures"),
      subtitle: loc(
        "Rafting sur la Durance, canyoning dans les Écrins : un aperçu de nos sorties. Plus de photos sur notre page Facebook.",
        "Rafting on the Durance, canyoning in the Écrins: a look at our trips. More photos on our Facebook page.",
      ),
    },
  });

  await upsert({
    _id: "contactPage",
    _type: "contactPage",
    eyebrow: loc("Contact", "Contact"),
    title: loc("Prêts pour l'aventure ?", "Ready for the adventure?"),
    subtitle: loc(
      "Un projet de sortie, une question, une réservation de groupe ? Contactez Xavier et Patrick directement.",
      "A trip idea, a question, a group booking? Get in touch with Xavier and Patrick directly.",
    ),
  });

  await upsert({
    _id: "pricingPage",
    _type: "pricingPage",
    eyebrow: loc("Tarifs", "Pricing"),
    title: loc("Des formules pour tous les groupes", "Options for every group"),
    subtitle: loc(
      "Tarifs indicatifs pour la saison — contactez-nous pour un devis précis selon votre groupe et vos dates.",
      "Indicative season pricing — get in touch for an exact quote for your group and dates.",
    ),
    placeholderNotice: loc(
      "Tarifs à confirmer avec Xavier et Patrick avant réservation.",
      "Prices to be confirmed with Xavier and Patrick before booking.",
    ),
    ctaLabel: loc("Demander un devis", "Request a quote"),
  });

  await upsert({
    _id: "departuresPage",
    _type: "departuresPage",
    eyebrow: loc("Prochains départs", "Upcoming departures"),
    title: loc("Réservez votre prochaine sortie", "Book your next trip"),
    subtitle: loc(
      "Choisissez un jour dans le calendrier pour voir les départs programmés et réserver directement en ligne.",
      "Pick a day on the calendar to see scheduled departures and book directly online.",
    ),
    emptyMessage: loc(
      "Aucun départ programmé pour le moment — contactez-nous pour organiser une sortie sur mesure.",
      "No departures scheduled right now — get in touch to arrange a custom trip.",
    ),
    noBookingLinkMessage: loc("Bientôt en ligne", "Coming soon"),
  });

  await upsert({
    _id: "activity-rafting",
    _type: "activity",
    type: "rafting",
    heroEyebrow: loc("Eau vive · Rivière Durance", "Whitewater · Durance river"),
    heroTitle: loc("Dévalez la Durance en rafting", "Ride the Durance rapids"),
    heroSubtitle: loc(
      "Embarquez avec Xavier et Patrick pour une descente rythmée par les rapides de la Durance, entre falaises et forêts des Hautes-Alpes. Sensations garanties, encadrement pro.",
      "Join Xavier and Patrick for a run down the Durance river's rapids, between cliffs and forests in the French Alps. Real thrills, professional guiding.",
    ),
    ctaLabel: loc("Réserver une descente", "Book a descent"),
    cta2Label: loc("Voir le rafting", "Discover rafting"),
    heroImage: await image("images/rafting/rafting-05.jpg"),
    cardImage: await image("images/rafting/rafting-01.jpg"),
    pageHeroImage: await image("images/rafting/rafting-04.jpg"),
    title: loc("Rafting sur la Durance", "Rafting on the Durance"),
    description: loc(
      "À bord d'un raft mené par un moniteur diplômé d'État, dévalez les rapides de la Durance dans un cadre grandiose, entre falaises calcaires et forêts des Hautes-Alpes. La descente s'adapte au niveau et aux envies du groupe, des passages ludiques aux rapides plus toniques, sans expérience préalable requise. Une activité conviviale et rafraîchissante, parfaite entre amis, en famille ou pour un enterrement de vie de garçon ou de jeune fille.",
      "Aboard a raft led by a state-certified guide, ride the Durance river's rapids through a spectacular setting of limestone cliffs and forests in the Hautes-Alpes. The descent adapts to the group's level and mood, from playful stretches to livelier rapids, with no prior experience required. A friendly, refreshing activity — perfect with friends, family, or for a stag or hen party.",
    ),
    highlights: [
      loc("Rivière Durance, au pied d'Embrun", "Durance river, right by Embrun"),
      loc("Encadrement par moniteur diplômé", "Led by a certified instructor"),
      loc("Matériel complet fourni", "Full gear provided"),
      loc("Idéal groupes, familles, EVG/EVJF", "Great for groups, families, stag/hen parties"),
      loc("Aucune expérience requise", "No experience needed"),
      loc("Descente rythmée, sensations garanties", "A lively ride, real thrills guaranteed"),
    ].map((v, i) => ({ ...v, _key: `h${i}` })),
  });

  await upsert({
    _id: "activity-canyoning",
    _type: "activity",
    type: "canyoning",
    heroEyebrow: loc("Eau vive · Canyons des Écrins", "Whitewater · Écrins canyons"),
    heroTitle: loc("Plongez au cœur des canyons", "Dive into the canyons"),
    heroSubtitle: loc(
      "Sauts, toboggans naturels, rappels et bains de cascade : nos guides de moyenne montagne vous font découvrir les plus beaux canyons autour d'Embrun, en toute sécurité.",
      "Jumps, natural slides, abseils and waterfall pools: our mountain guides take you through the finest canyons around Embrun, safely and at your pace.",
    ),
    ctaLabel: loc("Réserver un canyon", "Book a canyon trip"),
    cta2Label: loc("Voir le canyoning", "Discover canyoning"),
    heroImage: await image("images/canyoning/canyoning-06.jpg"),
    cardImage: await image("images/canyoning/canyoning-05.jpg"),
    pageHeroImage: await image("images/canyoning/canyoning-11.jpg"),
    title: loc("Canyoning dans les Écrins", "Canyoning in the Écrins"),
    description: loc(
      "Marche dans le torrent, sauts, toboggans naturels et petits rappels : nos guides choisissent le canyon selon votre niveau.",
      "Wading through the torrent, jumps, natural slides and short abseils: our guides pick the canyon that matches your level.",
    ),
    highlights: [
      loc("Deux parcours selon le niveau", "Two routes depending on level"),
      loc("Matériel néoprène complet fourni", "Full neoprene gear provided"),
      loc("Groupes réduits, encadrement rapproché", "Small groups, close guiding"),
      loc("Zone d'entraînement avant les sauts", "Practice area before the jumps"),
    ].map((v, i) => ({ ...v, _key: `h${i}` })),
  });

  await upsert({
    _id: "itinerary-le-couleau",
    _type: "itinerary",
    activityType: "canyoning",
    order: 0,
    name: "Le Couleau",
    tag: loc("Familial", "Family"),
    minAge: loc("Dès 7 ans", "Ages 7+"),
    description: loc(
      "Randonnée aquatique en douceur : marche, petits sauts, toboggans et grottes. Idéal en famille.",
      "A gentle aquatic hike: wading, small jumps, slides and caves. Perfect as a family.",
    ),
  });

  await upsert({
    _id: "itinerary-canyon-du-fournel",
    _type: "itinerary",
    activityType: "canyoning",
    order: 1,
    name: "Canyon du Fournel",
    tag: loc("Sportif", "Sporty"),
    minAge: loc("Dès 12 ans", "Ages 12+"),
    description: loc(
      "À Argentière-la-Bessée, 40 min d'Embrun : sauts de 2 à 7 mètres, toboggan naturel et passage en via ferrata.",
      "In Argentière-la-Bessée, 40 minutes from Embrun: 2–7 metre jumps, a natural slide and a via ferrata section.",
    ),
  });

  await upsert({
    _id: "team-patrick",
    _type: "teamMember",
    order: 0,
    name: "Patrick",
    role: loc("Guide de moyenne montagne, encadrant eau vive", "Mountain guide, whitewater instructor"),
  });

  await upsert({
    _id: "team-xavier",
    _type: "teamMember",
    order: 1,
    name: "Xavier",
    role: loc("Moniteur diplômé d'État, encadrant eau vive", "State-certified whitewater instructor"),
  });

  const galleryTiles = [
    { path: "images/rafting/rafting-06.jpg", activityType: "rafting", alt: loc("Rafting dans les rapides de la Durance", "Rafting through the Durance rapids") },
    { path: "images/canyoning/canyoning-09.jpg", activityType: "canyoning", alt: loc("Toboggan naturel en canyoning", "Natural rock slide while canyoning") },
    { path: "images/rafting/rafting-02.jpg", activityType: "rafting", alt: loc("Groupe de rafting au bord de la Durance", "Rafting group by the Durance river") },
    { path: "images/canyoning/canyoning-03.jpg", activityType: "canyoning", alt: loc("Saut en canyoning dans un bassin", "Canyoning jump into a pool") },
    { path: "images/rafting/rafting-07.jpg", activityType: "rafting", alt: loc("Famille souriante en rafting", "A smiling family rafting") },
    { path: "images/canyoning/canyoning-08.jpg", activityType: "canyoning", alt: loc("Parent et enfant en canyoning", "Parent and child canyoning") },
    { path: "images/rafting/rafting-12.jpg", activityType: "rafting", alt: loc("Rafting sportif dans les rapides", "Sporty rafting through the rapids") },
    { path: "images/canyoning/canyoning-11.jpg", activityType: "canyoning", alt: loc("Guide encadrant une descente en rappel", "Guide leading an abseil descent") },
  ];

  for (const [index, tile] of galleryTiles.entries()) {
    const slug = tile.path.split("/").pop().replace(/\.[a-z]+$/, "");
    await upsert({
      _id: `gallery-${slug}`,
      _type: "galleryImage",
      order: index,
      activityType: tile.activityType,
      alt: tile.alt,
      image: await image(tile.path),
    });
  }

  console.log("\nDone.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
