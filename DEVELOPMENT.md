# 🧑‍💻 Guide de développement ProxiSanté

## Structure du projet

```
proxi-sante/
├── app/                        # Pages et routes Next.js
│   ├── (public)/              # Pages publiques (sans layout spécifique)
│   ├── (app)/                 # Pages protégées (avec auth)
│   ├── api/                   # API routes (webhooks, etc.)
│   ├── layout.tsx             # Layout racine avec Header/Footer
│   └── globals.css            # Styles globaux
├── components/
│   ├── ui/                    # Composants UI réutilisables
│   ├── layout/                # Header, Footer
│   └── [feature]/             # Composants par fonctionnalité
├── lib/
│   ├── supabase.ts            # Clients Supabase
│   ├── stripe.ts              # Helpers Stripe
│   ├── mapbox.ts              # Config Mapbox
│   ├── utils.ts               # Utilitaires généraux
│   ├── database.types.ts      # Types générés depuis Supabase
│   ├── db-schema.sql          # Schéma de la base
│   ├── rls-policies.sql       # Politiques de sécurité
│   └── seed.ts                # Script de seed
├── public/                    # Assets statiques
├── middleware.ts              # Auth middleware
└── [config files]             # tailwind, tsconfig, etc.
```

---

## 🎨 Design System

### Couleurs
```css
/* Bordeaux (couleur principale) */
--primary: #8B1538
--primary-light: #B52857
--primary-dark: #610F27

/* Nuances bordeaux */
bordeaux-50   #FDF2F5
bordeaux-100  #FAE5EB
bordeaux-800  #8B1538  (principal)
bordeaux-900  #610F27
```

### Composants UI
Tous les composants sont dans `components/ui/` :
- `Button` : variants (default, outline, ghost, link, destructive, secondary)
- `Input`, `Textarea`, `Label` : formulaires
- `Card` : conteneur avec Header, Title, Description, Content, Footer
- `Badge` : étiquettes colorées

### Utilisation
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Button variant="default" size="lg">Bouton principal</Button>
<Button variant="outline">Bouton secondaire</Button>
```

---

## 🔐 Authentification

### Rôles
- `medecin` : accès carte, favoris, messages
- `structure` : dashboard, offres, profil, abonnement
- `admin` : panel admin, modération

### Middleware
Le fichier `middleware.ts` protège automatiquement :
- `/dashboard/*` → nécessite auth
- `/dashboard/structure/*` → nécessite rôle `structure`
- `/admin/*` → nécessite rôle `admin`
- `/messages`, `/favoris` → nécessite auth

### Vérifier l'utilisateur côté serveur
```tsx
// Dans un Server Component
import { createServerSupabaseClient } from '@/lib/supabase'

export default async function Page() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/medecin/login')
  }
  
  // Récupérer le profil avec rôle
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
}
```

### Vérifier l'utilisateur côté client
```tsx
'use client'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function Page() {
  const [user, setUser] = useState(null)
  const supabase = createClient()
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    
    return () => subscription.unsubscribe()
  }, [])
}
```

---

## 🗄️ Base de données

### Requêtes Supabase

#### Lire des données
```tsx
// Toutes les offres actives
const { data: offers, error } = await supabase
  .from('offers')
  .select(`
    *,
    structure:structures(*)
  `)
  .eq('is_active', true)
  .order('created_at', { ascending: false })

// Une structure avec ses offres
const { data: structure } = await supabase
  .from('structures')
  .select(`
    *,
    offers(*)
  `)
  .eq('slug', 'mon-cabinet')
  .single()
```

#### Créer des données
```tsx
const { data, error } = await supabase
  .from('offers')
  .insert({
    structure_id: 'uuid',
    title: 'Médecin généraliste',
    specialty: 'Médecine générale',
    contract_type: 'CDI',
    is_full_time: true,
    salary_min: 60000,
  })
  .select()
  .single()
```

#### Mettre à jour
```tsx
const { error } = await supabase
  .from('offers')
  .update({ is_active: false })
  .eq('id', offerId)
```

#### Supprimer
```tsx
const { error } = await supabase
  .from('offers')
  .delete()
  .eq('id', offerId)
```

### Realtime (Messagerie)
```tsx
'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function Messages() {
  const supabase = createClient()
  
  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log('Nouveau message:', payload.new)
          // Ajouter le message à l'état
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId])
}
```

---

## 💳 Stripe

### Créer une session de paiement
```tsx
import { stripe } from '@/lib/stripe'

const session = await stripe.checkout.sessions.create({
  customer: customerId,
  mode: 'subscription',
  line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
  success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/structure/abonnement?success=true`,
  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/structure/abonnement?canceled=true`,
})

// Rediriger vers Stripe
redirect(session.url)
```

### Webhook Stripe
```tsx
// app/api/webhooks/stripe/route.ts
import { NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceRoleClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
  
  const supabase = createServiceRoleClient()
  
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object
      await supabase
        .from('subscriptions')
        .upsert({
          structure_id: subscription.metadata.structure_id,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer,
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })
      break
      
    case 'customer.subscription.deleted':
      await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', event.data.object.id)
      break
  }
  
  return new Response(JSON.stringify({ received: true }), { status: 200 })
}
```

---

## 🗺️ Mapbox

### Configuration de base
```tsx
'use client'
import { useRef, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM } from '@/lib/mapbox'

export default function MapComponent() {
  const mapRef = useRef(null)
  const [viewport, setViewport] = useState({
    latitude: DEFAULT_CENTER[1],
    longitude: DEFAULT_CENTER[0],
    zoom: DEFAULT_ZOOM,
  })
  
  return (
    <Map
      ref={mapRef}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* Marqueurs */}
      <Marker latitude={48.8566} longitude={2.3522}>
        <div className="marker">📍</div>
      </Marker>
    </Map>
  )
}
```

### Clustering
Utilisez `supercluster` pour grouper les marqueurs :
```bash
npm install supercluster
```

---

## 📤 Upload de fichiers (Supabase Storage)

### Upload d'une image
```tsx
'use client'
import { createClient } from '@/lib/supabase'

async function uploadImage(file: File, structureId: string) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${structureId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('structure-media')
    .upload(fileName, file)
  
  if (error) throw error
  
  // Récupérer l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('structure-media')
    .getPublicUrl(fileName)
  
  // Enregistrer dans la base
  await supabase.from('structure_media').insert({
    structure_id: structureId,
    type: 'image',
    url: publicUrl,
  })
  
  return publicUrl
}
```

---

## 🧪 Testing

### Comptes de test (après seed)
```
Médecin:
- Email: medecin@test.fr
- Password: password123

Structure:
- Email: structure1@test.fr
- Password: password123

Admin:
- Email: admin@proxisante.fr
- Password: admin123
```

---

## 🚀 Déploiement

### Vercel
1. Push sur GitHub
2. Connecter le repo sur Vercel
3. Ajouter les variables d'environnement
4. Déployer

### Variables d'environnement en production
```env
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://proxisante.fr
```

---

## 📚 Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

---

## 🐛 Problèmes courants

### "Invalid JWT" sur Supabase
→ Vérifier les clés dans `.env.local`

### Carte Mapbox ne s'affiche pas
→ Vérifier le token et import CSS `mapbox-gl/dist/mapbox-gl.css`

### Erreurs TypeScript sur les tables
→ La base n'est pas encore créée ou types pas régénérés

### Webhook Stripe ne fonctionne pas
→ En dev, utiliser Stripe CLI : `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

---

Bon développement ! 🚀
