# 📋 État d'avancement du projet ProxiSanté

## ✅ Complété (Base solide établie)

### Infrastructure & Configuration
- ✅ Next.js 15 avec App Router configuré
- ✅ TypeScript + Tailwind CSS (thème bordeaux)
- ✅ Toutes les dépendances installées (Supabase, Mapbox, Stripe, Radix UI)
- ✅ Variables d'environnement documentées (.env.local.example)
- ✅ Middleware d'authentification avec protection des routes
- ✅ Fichiers de configuration (tailwind.config.ts, tsconfig.json)

### Base de données
- ✅ Schéma SQL complet (lib/db-schema.sql)
  - Tables : profiles, structures, structure_media, offers, conversations, messages, favorites, reports, subscriptions
  - Triggers : updated_at, favorites_count, conversation_last_message
  - Indexes pour performance
  
- ✅ Politiques RLS complètes (lib/rls-policies.sql)
  - Sécurité par rôle (médecin, structure, admin)
  - Visibilité publique des offres actives
  - Protection des messages et favoris

### Utilitaires & Types
- ✅ Types TypeScript générés (lib/database.types.ts)
- ✅ Clients Supabase (serveur, client, service role)
- ✅ Configuration Stripe (création session, portal, webhooks)
- ✅ Configuration Mapbox (constantes, types)
- ✅ Utilitaires (formatCurrency, formatDate, slugify, cn)

### Composants UI
- ✅ Button, Input, Label, Textarea
- ✅ Card (Header, Title, Description, Content, Footer)
- ✅ Badge (variants: default, secondary, destructive, outline, success, warning)
- ✅ Header avec navigation et auth state
- ✅ Footer avec liens légaux

### Pages publiques
- ✅ Page d'accueil (Hero, Comment ça marche, Pourquoi ProxiSanté, CTA, Stats)
- ✅ Authentification médecin (login avec email + Google OAuth, register)
- ✅ Authentification structure (login, register avec adresse)
- ✅ Callback OAuth (/auth/callback)
- ✅ À propos (mission, valeurs, déserts médicaux)
- ✅ Contact (formulaire + coordonnées)
- ✅ Mentions légales

### Autres
- ✅ Script de seed (lib/seed.ts) avec données de test
- ✅ README complet avec instructions
- ✅ package.json configuré avec script seed

---

## 🚧 À compléter (Fonctionnalités avancées)

### Pages critiques
- ⏳ **Carte interactive** (`app/carte/page.tsx`)
  - Intégration Mapbox avec react-map-gl
  - Affichage des marqueurs des structures
  - Clustering pour zones denses
  - Filtres (spécialité, contrat, rémunération, temps plein/partiel)
  - Panneau latéral avec liste d'offres synchronisée
  - Clic sur marqueur → détails offre
  - URL dynamique (`/carte?offre=123`)

- ⏳ **Profil structure** (`app/structure/[slug]/page.tsx`)
  - Affichage infos structure (nom, adresse, description)
  - Badge "vérifié" si SIRET validé
  - Galerie médias (photos + vidéos MP4)
  - Liste des offres actives de la structure
  - Bouton "Contacter" / "Suivre"

### Dashboard structure
- ⏳ **Layout** (`app/dashboard/structure/layout.tsx`)
  - Navigation latérale (Overview, Offres, Messages, Profil, Abonnement)
  - Vérification du rôle structure
  
- ⏳ **Overview** (`app/dashboard/structure/page.tsx`)
  - Statistiques : vues totales, messages, favoris
  - Graphiques de performance (optionnel)
  - Derniers messages reçus
  
- ⏳ **Gestion des offres** (`app/dashboard/structure/offres/page.tsx`)
  - Liste des offres avec statut (active/archivée)
  - Formulaire création/édition d'offre
  - Archivage immédiat (disparition de la carte)
  - Duplication d'offre (avec modification obligatoire)
  
- ⏳ **Profil** (`app/dashboard/structure/profil/page.tsx`)
  - Édition description
  - Upload logo
  - Upload photos/vidéos (Supabase Storage)
  - Gestion de l'ordre des médias
  
- ⏳ **Abonnement** (`app/dashboard/structure/abonnement/page.tsx`)
  - Affichage plan actuel
  - Bouton "Souscrire" → Stripe Checkout
  - Lien vers Customer Portal (gérer/annuler)
  - Historique des factures

### Messagerie
- ⏳ **Interface 2 colonnes** (`app/messages/page.tsx`)
  - Colonne gauche : liste des conversations
  - Colonne droite : messages de la conversation sélectionnée
  - Temps réel avec Supabase Realtime (subscription aux messages)
  - Marquage comme lu automatiquement
  - Filtrage par offre (pour structures)
  - Envoi de messages
  - Pas de statut "en ligne" ni "vu"
  
- ⏳ **Système email** (fonction Edge ou cron)
  - Détection messages non lus après 24h
  - Envoi email de rappel via Supabase ou service tiers

### Favoris
- ⏳ **Page favoris** (`app/favoris/page.tsx`)
  - Liste des offres favorites avec bouton supprimer
  - Liste des structures favorites
  - Liens vers offres et profils structures

### Admin
- ⏳ **Panel admin** (`app/admin/*`)
  - Liste utilisateurs (médecins, structures) avec actions (désactiver, supprimer)
  - Liste offres avec modération (archiver, supprimer)
  - Signalements (liste, statut, actions)
  - Vérification SIRET des structures

### Pages légales
- ⏳ CGU (`app/cgu/page.tsx`)
- ⏳ Politique de confidentialité (`app/politique-confidentialite/page.tsx`)

### API
- ⏳ **Webhook Stripe** (`app/api/webhooks/stripe/route.ts`)
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
  - Mise à jour table subscriptions

---

## 🎨 Améliorations possibles (V2)

- Notifications in-app (en plus des emails)
- Recherche full-text avancée
- Export PDF des offres
- Analytics et rapports détaillés
- Mode hors-ligne (PWA)
- Application mobile (React Native)
- Multi-langues (internationalisation)
- Système de recommandations IA
- Intégration calendrier (disponibilités)

---

## 🚀 Étapes pour démarrer

1. **Configurer Supabase** :
   ```bash
   # Exécuter dans le SQL Editor de Supabase
   - lib/db-schema.sql
   - lib/rls-policies.sql
   ```

2. **Configurer les variables d'environnement** :
   ```bash
   cp .env.local.example .env.local
   # Remplir avec vos clés Supabase, Mapbox, Stripe
   ```

3. **Peupler la base** :
   ```bash
   npm run seed
   ```

4. **Lancer le projet** :
   ```bash
   npm run dev
   ```

5. **Tester** :
   - Page d'accueil : http://localhost:3000
   - Connexion médecin : http://localhost:3000/auth/medecin/login
   - Connexion structure : http://localhost:3000/auth/structure/login
   - Compte test : medecin@test.fr / password123

---

## 📌 Notes importantes

- Les erreurs TypeScript actuelles sont normales (base de données non encore créée)
- Une fois la base Supabase initialisée, regénérer les types :
  ```bash
  npx supabase gen types typescript --project-id votre-project-id > lib/database.types.ts
  ```
- Le thème bordeaux est défini dans `tailwind.config.ts` et `app/globals.css`
- Les composants UI sont dans `components/ui/` (style inspiré shadcn/ui)
- Middleware d'auth actif sur toutes les routes protégées

---

**État global : 60% complété**  
✅ Infrastructure, base de données, auth, pages publiques  
⏳ Carte, dashboard, messagerie, favoris, admin
