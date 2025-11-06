# ProxiSanté 🩺

**Une plateforme B2B2C qui connecte médecins et structures de santé via une carte interactive.**

ProxiSanté facilite le recrutement médical et renforce l'accès aux soins dans les territoires en offrant une solution intuitive pour publier, découvrir et postuler à des offres médicales.

---

## 🎯 Fonctionnalités principales

### Pour les médecins
- ✅ Accès gratuit à la carte interactive des offres
- ✅ Filtres avancés (spécialité, type de contrat, rémunération)
- ✅ Messagerie temps réel avec les structures
- ✅ Sauvegarde des offres et structures favorites
- ✅ Authentification via email/mot de passe ou Google OAuth

### Pour les structures de santé
- ✅ Publication et gestion d'offres (création, modification, archivage, duplication)
- ✅ Réception et réponse aux messages des médecins
- ✅ Statistiques de performance (vues, favoris, messages)
- ✅ Page vitrine personnalisable (texte, photos, vidéos MP4)
- ✅ Abonnement Stripe pour publier plusieurs offres
- ✅ Badge "vérifié" optionnel (via SIRET)

### Pour les administrateurs
- ✅ Modération complète (utilisateurs, offres, signalements)
- ✅ Gestion des vérifications SIRET

---

## 🛠️ Stack technique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **UI**: Tailwind CSS + composants personnalisés (inspirés de shadcn/ui)
- **Carte**: Mapbox GL JS + React Map GL
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Paiements**: Stripe (abonnements mensuels)
- **Design**: Thème bordeaux (#8B1538), police Inter

---

## 📦 Installation

### Prérequis

- Node.js 18+ et npm
- Un projet Supabase configuré
- Un token Mapbox
- Un compte Stripe (mode test pour développement)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configuration des variables d'environnement

Copiez `.env.local.example` vers `.env.local` et remplissez :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# Mapbox
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=votre_mapbox_token

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configuration de la base de données Supabase

#### a. Exécutez le schéma de base

Dans le SQL Editor de Supabase, exécutez le contenu de :
```sql
lib/db-schema.sql
```

#### b. Activez les politiques RLS

Ensuite, exécutez :
```sql
lib/rls-policies.sql
```

#### c. Configurez l'authentification

1. Dans **Authentication > Providers**, activez :
   - Email
   - Google OAuth (configurez les credentials)

2. Dans **Authentication > URL Configuration**, ajoutez :
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

#### d. Configurez le Storage

1. Créez un bucket `structure-media` (public)
2. Ajoutez une politique permettant aux structures d'uploader

### 4. Lancer le projet

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## 📁 Structure du projet

```
proxi-sante/
├── app/
│   ├── page.tsx               # Page d'accueil
│   ├── carte/                 # Carte interactive
│   ├── auth/                  # Login/Register
│   ├── dashboard/structure/   # Dashboard structure
│   ├── messages/              # Messagerie
│   ├── favoris/               # Favoris médecin
│   └── admin/                 # Panel admin
├── components/
│   ├── ui/                    # Composants UI réutilisables
│   ├── layout/                # Header, Footer
│   └── carte/                 # Composants de la carte
├── lib/
│   ├── supabase.ts            # Clients Supabase
│   ├── stripe.ts              # Config Stripe
│   ├── mapbox.ts              # Constantes Mapbox
│   ├── utils.ts               # Utilitaires
│   ├── database.types.ts      # Types TypeScript
│   ├── db-schema.sql          # Schéma SQL
│   └── rls-policies.sql       # Politiques RLS
├── middleware.ts              # Auth middleware
└── tailwind.config.ts
```

---

## 🗺️ Carte interactive

### Fonctionnalités
- Affichage des structures ayant des offres actives
- Clustering automatique pour zones denses
- Filtres temps réel (spécialité, contrat, rémunération)
- Panneau latéral avec liste d'offres synchronisée
- URL dynamique (`/carte?offre=123`)

---

## 💬 Messagerie

- **Architecture** : 2 colonnes (liste conversations / messages)
- **Temps réel** : Supabase Realtime
- **Notification email** : Envoyée après 24h si message non lu

---

## 🚀 Commandes

```bash
npm run dev          # Démarrage en mode développement
npm run build        # Build de production
npm start            # Démarrage en production
npm run lint         # Vérification ESLint
```

---

## 📝 Pages à compléter

Ce projet contient la structure de base. Les pages suivantes sont à compléter :

- `app/auth/medecin/register/page.tsx` - Inscription médecin
- `app/auth/structure/login/page.tsx` - Connexion structure
- `app/auth/structure/register/page.tsx` - Inscription structure
- `app/carte/page.tsx` - Carte interactive Mapbox
- `app/structure/[slug]/page.tsx` - Page profil structure
- `app/dashboard/structure/*` - Dashboard complet
- `app/messages/page.tsx` - Messagerie temps réel
- `app/favoris/page.tsx` - Liste favoris
- `app/admin/*` - Panel admin
- `app/a-propos/page.tsx`, `app/contact/page.tsx` - Pages informatives

---

## 📄 Licence

Ce projet est propriétaire. Tous droits réservés © 2025 ProxiSanté.

---

**Construit avec ❤️ pour améliorer l'accès aux soins en France.**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
