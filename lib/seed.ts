// To run: node --loader ts-node/esm lib/seed.ts
// Or add to package.json: "seed": "tsx lib/seed.ts"

import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('🌱 Starting seed...')

  // Create test medecin user
  const { data: medecinAuth, error: medecinError } = await supabase.auth.admin.createUser({
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

  console.log('✅ Médecin créé')

  // Create test structure users
  const structures = [
    {
      email: 'structure1@test.fr',
      name: 'Cabinet Médical Central',
      city: 'Paris',
      postal_code: '75001',
      address: '1 Place de la Concorde',
      latitude: 48.8656,
      longitude: 2.3212,
      is_verified: true,
    },
    {
      email: 'structure2@test.fr',
      name: 'Maison de Santé Rurale',
      city: 'Limoges',
      postal_code: '87000',
      address: '15 Rue de la République',
      latitude: 45.8336,
      longitude: 1.2611,
      is_verified: false,
    },
    {
      email: 'structure3@test.fr',
      name: 'Centre Médical Maritime',
      city: 'Brest',
      postal_code: '29200',
      address: '42 Rue du Port',
      latitude: 48.3905,
      longitude: -4.4860,
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

    // Create structure profile
    const { error: structureError } = await supabase.from('structures').insert({
      user_id: authData.user!.id,
      name: structure.name,
      slug: structure.name.toLowerCase().replace(/\s+/g, '-'),
      address: structure.address,
      city: structure.city,
      postal_code: structure.postal_code,
      latitude: structure.latitude,
      longitude: structure.longitude,
      is_verified: structure.is_verified,
      description: `${structure.name} est une structure de santé moderne et accueillante.`,
    })

    if (structureError) {
      console.error(`Error creating structure profile ${structure.name}:`, structureError)
    } else {
      console.log(`✅ Structure créée: ${structure.name}`)
    }
  }

  // Get structures for creating offers
  const { data: structuresList } = await supabase
    .from('structures')
    .select('id, name')
    .limit(3)

  if (structuresList && structuresList.length > 0) {
    // Create test offers
    const offers = [
      {
        structure_id: structuresList[0].id,
        title: 'Médecin généraliste - CDI temps plein',
        specialty: 'Médecine générale',
        contract_type: 'CDI',
        is_full_time: true,
        salary_min: 60000,
        salary_max: 80000,
        description: 'Nous recherchons un médecin généraliste pour rejoindre notre cabinet en plein centre de Paris.',
      },
      {
        structure_id: structuresList[1].id,
        title: 'Médecin généraliste - Remplacement',
        specialty: 'Médecine générale',
        contract_type: 'Remplacement',
        is_full_time: true,
        salary_min: 5000,
        salary_max: 7000,
        description: 'Remplacement de 3 mois dans une maison de santé rurale accueillante.',
      },
      {
        structure_id: structuresList[0].id,
        title: 'Cardiologue - Libéral',
        specialty: 'Cardiologie',
        contract_type: 'Libéral',
        is_full_time: false,
        salary_min: null,
        salary_max: null,
        description: 'Installation en libéral au sein d\'un cabinet pluridisciplinaire.',
      },
      {
        structure_id: structuresList[2].id,
        title: 'Médecin urgentiste - CDD 6 mois',
        specialty: 'Médecine d\'urgence',
        contract_type: 'CDD',
        is_full_time: true,
        salary_min: 4500,
        salary_max: 5500,
        description: 'CDD de 6 mois renouvelable pour un poste d\'urgentiste.',
      },
    ]

    for (const offer of offers) {
      const { error } = await supabase.from('offers').insert(offer)
      if (error) {
        console.error('Error creating offer:', error)
      }
    }

    console.log(`✅ ${offers.length} offres créées`)
  }

  // Create admin user
  const { error: adminError } = await supabase.auth.admin.createUser({
    email: 'admin@proxisante.fr',
    password: 'admin123',
    email_confirm: true,
    user_metadata: {
      role: 'admin',
      full_name: 'Admin ProxiSanté',
    },
  })

  if (adminError) {
    console.error('Error creating admin:', adminError)
  } else {
    console.log('✅ Admin créé')
  }

  console.log('🎉 Seed completed!')
}

seed()
