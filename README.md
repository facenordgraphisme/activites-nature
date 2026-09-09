# Activités Nature — site web

Site vitrine pour Xavier & Patrick (Activités Nature), moniteurs indépendants de
rafting et canyoning basés à Baratier, près d'Embrun (Hautes-Alpes).

Stack : **Next.js 16** (App Router, Turbopack) · **Tailwind CSS v4** · **Sanity**
(CMS) · **Motion** (animations) · **next-intl** (FR/EN).

## Démarrer

```bash
npm install
npm run dev
```

Le site tourne en local sans configuration supplémentaire : tout le contenu
(guides, activités, coordonnées) est déjà rempli avec les vraies informations
collectées (Google Maps, Facebook, sites partenaires). Les **tarifs et les
photos sont des placeholders** clairement identifiés — à remplacer avec Xavier
et Patrick avant mise en ligne.

## La fonctionnalité phare : bascule Rafting ↔ Canyoning

Dans le hero de la page d'accueil (`src/components/sections/hero.tsx`), le
sélecteur d'activité déclenche :
- un changement de palette immédiat sur les accents de toute la page,
- une animation de "bloom" circulaire en fond de hero (voir
  `src/components/activity/activity-theme-layer.tsx`) qui part du point cliqué,
- un crossfade du contenu (titre, sous-titre, CTA).

Les pages `/rafting` et `/canyoning` reprennent la palette correspondante de
façon statique (pas d'animation nécessaire, la couleur est déjà la bonne au
chargement).

## Sanity (CMS)

Le Studio est scaffoldé (`sanity.config.ts`, schémas dans `sanity/schemaTypes`)
mais **aucun projet Sanity n'est encore connecté**. Pour l'activer :

```bash
npx sanity login
npx sanity init   # récupère le projectId, ou en crée un nouveau
```

Puis renseigne `.env.local` (copie `.env.local.example`) avec ton
`NEXT_PUBLIC_SANITY_PROJECT_ID`. Le Studio sera alors accessible sur
`/studio`. Tant que ce n'est pas fait, le site fonctionne quand même : les
pages utilisent des données de secours dans `src/lib/business-data.ts` et
`messages/{fr,en}.json`.

## MCP Magic (21st.dev)

`.mcp.json` référence le serveur MCP de 21st.dev pour générer/affiner des
composants UI directement depuis Claude Code. Il faut une clé API :

1. Génère une clé sur https://21st.dev/mcp
2. Ajoute-la comme `TWENTY_FIRST_API_KEY` dans ton environnement (ou dans la
   config MCP de Claude Code)

## Skills d'Emil Kowalski

Installés dans `.agents/skills/` (symlinkés dans `.claude/skills/`) — guident
les décisions d'animation (courbes, durées, `prefers-reduced-motion`) utilisées
dans tout le projet. Voir `.agents/skills/animate/SKILL.md`.

## Ce qu'il reste à faire avant mise en ligne

- [ ] Remplacer les tarifs indicatifs par les vrais prix (page `/tarifs`)
- [ ] Ajouter les vraies photos (remplacent les visuels en dégradé) via Sanity
- [ ] Connecter un vrai projet Sanity (`npx sanity init`)
- [ ] Relire/valider tous les textes FR et EN avec Xavier et Patrick
- [ ] Décider d'un hébergement (Vercel recommandé) quand le design est validé
