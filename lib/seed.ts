// To run: node --loader ts-node/esm lib/seed.ts
// Or add to package.json: "seed": "tsx lib/seed.ts"

import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

type StructureInsert = Database['public']['Tables']['structures']['Insert']
type StructureRow = Database['public']['Tables']['structures']['Row']
type OfferInsert = Database['public']['Tables']['offers']['Insert']

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('>> Starting seed...')

  // Create test doctor user
  const { error: medecinError } = await supabase.auth.admin.createUser({
    email: 'medecin@test.fr',
    password: 'password123',
    email_confirm: true,
    user_metadata: {
      role: 'medecin',
      full_name: 'Dr. Sophie Martin',
    },
  })

  if (medecinError) {
    console.error('Error creating medecin:', medecinError)
    return
  }

  console.log('✓ Medecin created')

  // Create test structure users
  const structures = [
    {
      email: 'structure1@test.fr',
      name: 'Cabinet Medical Central',
      city: 'Paris',
      postal_code: '75001',
      address: '1 Place de la Concorde',
      latitude: 48.8656,
      longitude: 2.3212,
      is_verified: true,
    },
    {
      email: 'structure2@test.fr',
      name: 'Maison de Sante Rurale',
      city: 'Limoges',
      postal_code: '87000',
      address: '15 Rue de la Republique',
      latitude: 45.8336,
      longitude: 1.2611,
      is_verified: false,
    },
    {
      email: 'structure3@test.fr',
      name: 'Centre Medical Maritime',
      city: 'Brest',
      postal_code: '29200',
      address: '42 Rue du Port',
      latitude: 48.3905,
      longitude: -4.486,
      is_verified: false,
    },
  ]

  for (const structure of structures) {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: structure.email,
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        role: 'structure',
        full_name: structure.name,
      },
    })

    if (authError) {
      console.error(`Error creating structure ${structure.name}:`, authError)
      continue
    }

    if (!authData.user) {
      console.error(`Supabase did not return a user for ${structure.name}`)
      continue
    }

    const structurePayload: StructureInsert = {
      user_id: authData.user.id,
      name: structure.name,
      slug: structure.name.toLowerCase().replace(/\s+/g, '-'),
      address: structure.address,
      city: structure.city,
      postal_code: structure.postal_code,
      latitude: structure.latitude,
      longitude: structure.longitude,
      is_verified: structure.is_verified,
      description: `${structure.name} est une structure de sante moderne et accueillante.`,
    }

    const { error: structureError } = await supabase
      .from('structures')
      .insert(structurePayload as any)

    if (structureError) {
      console.error(`Error creating structure profile ${structure.name}:`, structureError)
    } else {
      console.log(`✓ Structure created: ${structure.name}`)
    }
  }

  const { data: structuresList } = await supabase
    .from('structures')
    .select('id, name')
    .limit(3)

  const typedStructures = (structuresList ?? []) as Pick<StructureRow, 'id' | 'name'>[]

  if (typedStructures.length > 0) {
    const getStructureId = (index: number) => typedStructures[index]?.id ?? typedStructures[0]?.id ?? ''

    const offers: OfferInsert[] = [
      {
        structure_id: getStructureId(0),
        title: 'Medecin generaliste - CDI temps plein',
        specialty: 'Medecine generale',
        contract_type: 'CDI',
        is_full_time: true,
        salary_min: 60_000,
        salary_max: 80_000,
        description:
          'Nous recherchons un medecin generaliste pour rejoindre notre cabinet en plein centre de Paris.',
      } as OfferInsert,
      {
        structure_id: getStructureId(1),
        title: 'Medecin generaliste - Remplacement',
        specialty: 'Medecine generale',
        contract_type: 'Remplacement',
        is_full_time: true,
        salary_min: 5_000,
        salary_max: 7_000,
        description: 'Remplacement de 3 mois dans une maison de sante rurale accueillante.',
      } as OfferInsert,
      {
        structure_id: getStructureId(0),
        title: 'Cardiologue - Liberal',
        specialty: 'Cardiologie',
        contract_type: 'Libéral',
        is_full_time: false,
        salary_min: null,
        salary_max: null,
        description: 'Installation en liberal au sein d un cabinet pluridisciplinaire.',
      } as OfferInsert,
      {
        structure_id: getStructureId(2),
        title: 'Medecin urgentiste - CDD 6 mois',
        specialty: 'Medecine d urgence',
        contract_type: 'CDD',
        is_full_time: true,
        salary_min: 4_500,
        salary_max: 5_500,
        description: 'CDD de 6 mois renouvelable pour un poste d urgentiste.',
      } as OfferInsert,
    ]

    for (const offer of offers) {
      if (!offer.structure_id) continue

      const { error } = await supabase.from('offers').insert(offer as any)
      if (error) {
        console.error('Error creating offer:', error)
      }
    }

    console.log(`✓ ${offers.length} offers created`)
  }

  const { error: adminError } = await supabase.auth.admin.createUser({
    email: 'admin@proxisante.fr',
    password: 'admin123',
    email_confirm: true,
    user_metadata: {
      role: 'admin',
      full_name: 'Admin ProxiSante',
    },
  })

  if (adminError) {
    console.error('Error creating admin:', adminError)
  } else {
    console.log('✓ Admin created')
  }

  console.log('>> Seed completed!')
}

seed()
