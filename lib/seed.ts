// To run: npm run seed

import { createClient, type AuthUser, type SupabaseClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import { slugify } from './utils'

type Role = Database['public']['Tables']['profiles']['Row']['role']
type StructureInsert = Database['public']['Tables']['structures']['Insert']
type OfferInsert = Database['public']['Tables']['offers']['Insert']

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set before running the seed.'
  )
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

interface SeedUser {
  email: string
  password: string
  role: Role
  fullName: string
}

interface StructureSeed {
  email: string
  name: string
  address: string
  city: string
  postalCode: string
  latitude: number
  longitude: number
  isVerified: boolean
  description: string
}

interface OfferSeed {
  structureEmail: string
  title: string
  specialty: string
  contractType: OfferInsert['contract_type']
  isFullTime: boolean
  salaryMin: number | null
  salaryMax: number | null
  description: string
}

const DOCTOR_PASSWORD = 'password123'
const STRUCTURE_PASSWORD = 'password123'
const ADMIN_PASSWORD = 'admin123'

const doctorUser: SeedUser = {
  email: 'medecin@test.fr',
  password: DOCTOR_PASSWORD,
  role: 'medecin',
  fullName: 'Dr. Sophie Martin',
}

const adminUser: SeedUser = {
  email: 'admin@proxisante.fr',
  password: ADMIN_PASSWORD,
  role: 'admin',
  fullName: 'Admin ProxiSante',
}

const structureSeeds: StructureSeed[] = [
  {
    email: 'structure1@test.fr',
    name: 'Cabinet Medical Central',
    city: 'Paris',
    postalCode: '75001',
    address: '1 Place de la Concorde',
    latitude: 48.8656,
    longitude: 2.3212,
    isVerified: true,
    description: 'Cabinet medical situe au coeur de Paris avec une patientele variee.',
  },
  {
    email: 'structure2@test.fr',
    name: 'Maison de Sante Rurale',
    city: 'Limoges',
    postalCode: '87000',
    address: '15 Rue de la Republique',
    latitude: 45.8336,
    longitude: 1.2611,
    isVerified: false,
    description: 'Maison de sante pluridisciplinaire desservant les communes rurales voisines.',
  },
  {
    email: 'structure3@test.fr',
    name: 'Centre Medical Maritime',
    city: 'Brest',
    postalCode: '29200',
    address: '42 Rue du Port',
    latitude: 48.3905,
    longitude: -4.486,
    isVerified: false,
    description: 'Centre dedie aux professionnels du littoral et aux familles de marins.',
  },
  {
    email: 'structure4@test.fr',
    name: 'Clinique du Sud',
    city: 'Marseille',
    postalCode: '13001',
    address: '25 Cours Belsunce',
    latitude: 43.2965,
    longitude: 5.3698,
    isVerified: true,
    description: 'Clinique privee moderne specialisee en chirurgie et gynecologie.',
  },
  {
    email: 'structure5@test.fr',
    name: 'Hopital de la Garonne',
    city: 'Toulouse',
    postalCode: '31000',
    address: '8 Place du Capitole',
    latitude: 43.6047,
    longitude: 1.4442,
    isVerified: true,
    description: 'Hopital public avec plateau technique complet et service d urgence.',
  },
  {
    email: 'structure6@test.fr',
    name: 'Centre Medical des Alpes',
    city: 'Grenoble',
    postalCode: '38000',
    address: '12 Rue Felix Poulat',
    latitude: 45.1885,
    longitude: 5.7245,
    isVerified: false,
    description: 'Centre specialise dans la medecine du sport et la readaptation.',
  },
  {
    email: 'structure7@test.fr',
    name: 'Cabinet Medical de la Cote',
    city: 'Nice',
    postalCode: '06000',
    address: '5 Promenade des Anglais',
    latitude: 43.6962,
    longitude: 7.2661,
    isVerified: true,
    description: 'Cabinet de groupe offrant un suivi medical personnalise sur la Cote d Azur.',
  },
  {
    email: 'structure8@test.fr',
    name: 'Maison de Sante de Strasbourg',
    city: 'Strasbourg',
    postalCode: '67000',
    address: '18 Place Kleber',
    latitude: 48.5734,
    longitude: 7.7521,
    isVerified: false,
    description: 'Maison de sante urbaine avec equipe pluridisciplinaire et plateau technique.',
  },
]

const offerSeeds: OfferSeed[] = [
  {
    structureEmail: 'structure1@test.fr',
    title: 'Medecin generaliste - CDI temps plein',
    specialty: 'Medecine generale',
    contractType: 'CDI',
    isFullTime: true,
    salaryMin: 60000,
    salaryMax: 80000,
    description:
      'Cabinet parisien recherche un medecin generaliste pour renforcer une equipe de quatre praticiens.',
  },
  {
    structureEmail: 'structure1@test.fr',
    title: 'Infirmier coordinateur - CDI',
    specialty: 'Soins infirmiers',
    contractType: 'CDI',
    isFullTime: true,
    salaryMin: 38000,
    salaryMax: 42000,
    description: 'Coordination des soins au sein du cabinet et liens avec les partenaires de sante locaux.',
  },
  {
    structureEmail: 'structure2@test.fr',
    title: 'Medecin generaliste - Remplacement',
    specialty: 'Medecine generale',
    contractType: 'Remplacement',
    isFullTime: true,
    salaryMin: 5000,
    salaryMax: 7000,
    description: 'Remplacement de trois mois dans une maison de sante rurale accueillante.',
  },
  {
    structureEmail: 'structure2@test.fr',
    title: 'Sage femme - CDD 6 mois',
    specialty: 'Sage femme',
    contractType: 'CDD',
    isFullTime: true,
    salaryMin: 36000,
    salaryMax: 42000,
    description: 'Accompagnement des patientes dans un cadre rural et travail en reseau avec les hopitaux proches.',
  },
  {
    structureEmail: 'structure3@test.fr',
    title: 'Cardiologue - Liberal',
    specialty: 'Cardiologie',
    contractType: 'Liberal',
    isFullTime: false,
    salaryMin: null,
    salaryMax: null,
    description: 'Installation en liberal au sein d un cabinet pluridisciplinaire proche du port.',
  },
  {
    structureEmail: 'structure3@test.fr',
    title: 'Medecin urgentiste - CDD 6 mois',
    specialty: 'Medecine d urgence',
    contractType: 'CDD',
    isFullTime: true,
    salaryMin: 4500,
    salaryMax: 5500,
    description: 'Renfort saisonnier pour le service d urgence. Possibilite de prolongation.',
  },
  {
    structureEmail: 'structure4@test.fr',
    title: 'Gynecologue - Liberal',
    specialty: 'Gynecologie',
    contractType: 'Liberal',
    isFullTime: true,
    salaryMin: null,
    salaryMax: null,
    description: 'Installation au sein d une clinique specialisee disposant d un bloc operatoire moderne.',
  },
  {
    structureEmail: 'structure4@test.fr',
    title: 'Anesthesiste reanimateur - CDI',
    specialty: 'Anesthesie',
    contractType: 'CDI',
    isFullTime: true,
    salaryMin: 80000,
    salaryMax: 110000,
    description: 'Recherche anesthesiste pour bloc operatoire moderne. Gardes organisees et equipe experimentee.',
  },
  {
    structureEmail: 'structure5@test.fr',
    title: 'Medecin generaliste - CDI',
    specialty: 'Medecine generale',
    contractType: 'CDI',
    isFullTime: true,
    salaryMin: 55000,
    salaryMax: 70000,
    description: 'Poste de medecin generaliste dans un hopital dynamique avec plateau technique complet.',
  },
  {
    structureEmail: 'structure5@test.fr',
    title: 'Pediatre - Temps partiel',
    specialty: 'Pediatrie',
    contractType: 'CDD',
    isFullTime: false,
    salaryMin: 40000,
    salaryMax: 55000,
    description: 'Temps partiel sur deux jours pour suivi pediatrique et consultations specialisees.',
  },
  {
    structureEmail: 'structure6@test.fr',
    title: 'Ophtalmologue - CDI temps partiel',
    specialty: 'Ophtalmologie',
    contractType: 'CDI',
    isFullTime: false,
    salaryMin: 50000,
    salaryMax: 70000,
    description: 'Recherche ophtalmologue pour consultations trois jours par semaine dans un cadre de montagne.',
  },
  {
    structureEmail: 'structure6@test.fr',
    title: 'Radiologue - CDI',
    specialty: 'Radiologie',
    contractType: 'CDI',
    isFullTime: true,
    salaryMin: 75000,
    salaryMax: 95000,
    description: 'Centre d imagerie medicale equipe d IRM et scanner de derniere generation.',
  },
  {
    structureEmail: 'structure7@test.fr',
    title: 'Medecin generaliste - Remplacement ponctuel',
    specialty: 'Medecine generale',
    contractType: 'Remplacement ponctuel',
    isFullTime: true,
    salaryMin: 400,
    salaryMax: 600,
    description: 'Remplacements ponctuels pour conges et formations. Remuneration journaliere attractive.',
  },
  {
    structureEmail: 'structure7@test.fr',
    title: 'Psychiatre - Liberal',
    specialty: 'Psychiatrie',
    contractType: 'Liberal',
    isFullTime: false,
    salaryMin: null,
    salaryMax: null,
    description: 'Cabinet de groupe recherche un psychiatre pour consultations sur rendez-vous.',
  },
  {
    structureEmail: 'structure8@test.fr',
    title: 'Medecin generaliste - CDI',
    specialty: 'Medecine generale',
    contractType: 'CDI',
    isFullTime: true,
    salaryMin: 58000,
    salaryMax: 75000,
    description: 'Maison de sante collaborative recherche un medecin generaliste pour patientele mixte.',
  },
  {
    structureEmail: 'structure8@test.fr',
    title: 'Dermatologue - Stage pratique',
    specialty: 'Dermatologie',
    contractType: 'Stage',
    isFullTime: true,
    salaryMin: 1500,
    salaryMax: 1800,
    description: 'Stage pratique de six mois pour interne en dermatologie au sein d une equipe experimentee.',
  },
]

async function findUserByEmail(email: string): Promise<AuthUser | null> {
  let page = 1

  while (true) {
    const response = await supabase.auth.admin.listUsers({ page, perPage: 200 })
    if (response.error) {
      throw new Error(`Unable to list users (page ${page}): ${response.error.message}`)
    }

    const match =
      response.data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase()) ?? null

    if (match) {
      return match
    }

    if (!response.data.nextPage || response.data.nextPage === page) {
      break
    }

    page = response.data.nextPage
  }

  return null
}

type ProfileIdRow = Pick<Database['public']['Tables']['profiles']['Row'], 'id'>

async function findExistingAuthUser(email: string): Promise<AuthUser | null> {
  const fromAuth = await findUserByEmail(email)
  if (fromAuth) {
    return fromAuth
  }

  const { data: profile } = await supabase
    .from('profiles' as const)
    .select('id')
    .eq('email', email)
    .maybeSingle<ProfileIdRow>()

  if (profile?.id) {
    const { data, error } = await supabase.auth.admin.getUserById(profile.id)
    if (!error && data?.user) {
      return data.user
    }
  }

  return null
}

async function upsertProfile(params: { id: string; email: string; role: Role; fullName: string }) {
  const payload: Database['public']['Tables']['profiles']['Insert'] = {
    id: params.id,
    email: params.email,
    role: params.role,
    full_name: params.fullName,
  }

  const { error } = await supabase
    .from('profiles')
    .upsert([payload], { onConflict: 'id' })

  if (error) {
    throw new Error(`Unable to upsert profile for ${params.email}: ${error.message}`)
  }
}

async function ensureUser(input: SeedUser): Promise<AuthUser> {
  let existing = await findExistingAuthUser(input.email)

  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password: input.password,
      user_metadata: {
        ...(existing.user_metadata ?? {}),
        role: input.role,
        full_name: input.fullName,
      },
    })

    if (error) {
      throw new Error(`Unable to update user ${input.email}: ${error.message}`)
    }

    await upsertProfile({
      id: existing.id,
      email: input.email,
      role: input.role,
      fullName: input.fullName,
    })

    return existing
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
    user_metadata: {
      role: input.role,
      full_name: input.fullName,
    },
  })

  if (error || !data.user) {
    existing = await findExistingAuthUser(input.email)
    if (!existing) {
      throw new Error(`Unable to create user ${input.email}: ${error?.message ?? 'unknown error'}`)
    }

    await upsertProfile({
      id: existing.id,
      email: input.email,
      role: input.role,
      fullName: input.fullName,
    })

    return existing
  }

  await upsertProfile({
    id: data.user.id,
    email: input.email,
    role: input.role,
    fullName: input.fullName,
  })

  return data.user
}

async function ensureStructure(userId: string, seed: StructureSeed) {
  const slug = slugify(seed.name)

  const { data: existing, error: lookupError } = await supabase
    .from('structures' as const)
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (lookupError) {
    throw new Error(`Unable to fetch structure ${seed.name}: ${lookupError.message}`)
  }

  const payload: StructureInsert = {
    user_id: userId,
    name: seed.name,
    slug,
    address: seed.address,
    city: seed.city,
    postal_code: seed.postalCode,
    latitude: seed.latitude,
    longitude: seed.longitude,
    is_verified: seed.isVerified,
    description: seed.description,
    is_active: true,
  }

  if (existing) {
    const updatePayload: Database['public']['Tables']['structures']['Update'] = {
      ...payload,
    }

    const { error: updateError } = await supabase
      .from('structures' as const)
      .update(updatePayload)
      .eq('id', existing.id)

    if (updateError) {
      throw new Error(`Unable to update structure ${seed.name}: ${updateError.message}`)
    }

    return { id: existing.id, slug }
  }

  const { data: inserted, error: insertError } = await supabase
    .from('structures' as const)
    .insert([payload])
    .select('id')
    .single()

  if (insertError || !inserted) {
    throw new Error(`Unable to create structure ${seed.name}: ${insertError?.message ?? 'unknown error'}`)
  }

  return { id: inserted.id, slug }
}

async function seedOffers(structureMap: Map<string, { id: string; slug: string }>) {
  if (structureMap.size === 0) {
    return
  }

  const structureIds = Array.from(structureMap.values()).map((entry) => entry.id)

  const { error: deleteError } = await supabase
    .from('offers' as const)
    .delete()
    .in('structure_id', structureIds)

  if (deleteError) {
    throw new Error(`Unable to clean offers: ${deleteError.message}`)
  }

  const rows: OfferInsert[] = offerSeeds.reduce<OfferInsert[]>((acc, offer) => {
    const structure = structureMap.get(offer.structureEmail)
    if (!structure) {
      console.warn(
        `Skipping offer "${offer.title}" because ${offer.structureEmail} was not seeded as a structure.`
      )
      return acc
    }

    acc.push({
      structure_id: structure.id,
      title: offer.title,
      specialty: offer.specialty,
      contract_type: offer.contractType,
      is_full_time: offer.isFullTime,
      salary_min: offer.salaryMin,
      salary_max: offer.salaryMax,
      description: offer.description,
      requirements: null,
      is_active: true,
    })

    return acc
  }, [])

  if (rows.length === 0) {
    return
  }

  const { error } = await supabase.from('offers' as const).insert(rows)
  if (error) {
    throw new Error(`Unable to insert offers: ${error.message}`)
  }
}

async function seed() {
  console.log('> Seeding data...')

  const medecin = await ensureUser(doctorUser)
  console.log(`- Doctor ready: ${doctorUser.email} (id: ${medecin.id})`)

  const structureMap = new Map<string, { id: string; slug: string }>()

  for (const structureSeed of structureSeeds) {
    const user = await ensureUser({
      email: structureSeed.email,
      password: STRUCTURE_PASSWORD,
      role: 'structure',
      fullName: structureSeed.name,
    })

    const structure = await ensureStructure(user.id, structureSeed)
    structureMap.set(structureSeed.email, structure)
    console.log(`- Structure ready: ${structureSeed.name} (slug: ${structure.slug})`)
  }

  await seedOffers(structureMap)
  console.log(`- Offers inserted: ${offerSeeds.length}`)

  const admin = await ensureUser(adminUser)
  console.log(`- Admin ready: ${admin.email} (id: ${admin.id})`)

  console.log('[done] Seed completed')
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exitCode = 1
})
