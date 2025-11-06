import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Target, Users, Heart } from 'lucide-react'
import Link from 'next/link'

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bordeaux-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              À propos de ProxiSanté
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Notre mission : faciliter l'accès aux soins et lutter contre les déserts médicaux en France
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre mission</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                ProxiSanté est née d'un constat alarmant : les déserts médicaux touchent de plus en plus
                de territoires français, privant des millions de citoyens d'un accès équitable aux soins.
              </p>
              <p className="mt-4">
                Face à cette situation, nous avons créé une plateforme innovante qui connecte directement
                les professionnels de santé avec les structures médicales en recherche de personnel qualifié.
              </p>
              <p className="mt-4">
                Notre objectif : simplifier le recrutement médical, améliorer la visibilité des opportunités
                professionnelles et contribuer activement au maillage territorial des soins de santé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nos valeurs</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bordeaux-100">
                    <Target className="h-6 w-6 text-bordeaux-800" />
                  </div>
                  <CardTitle>Transparence</CardTitle>
                  <CardDescription>
                    Toutes les offres sont clairement détaillées : type de contrat, rémunération, localisation.
                    Pas de mauvaises surprises.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bordeaux-100">
                    <Users className="h-6 w-6 text-bordeaux-800" />
                  </div>
                  <CardTitle>Accessibilité</CardTitle>
                  <CardDescription>
                    Médecins et structures ont accès à des outils simples et intuitifs. Notre plateforme
                    est conçue pour tous.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bordeaux-100">
                    <MapPin className="h-6 w-6 text-bordeaux-800" />
                  </div>
                  <CardTitle>Territorialité</CardTitle>
                  <CardDescription>
                    Nous mettons en avant les zones en tension et favorisons l'installation dans les
                    territoires qui en ont le plus besoin.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bordeaux-100">
                    <Heart className="h-6 w-6 text-bordeaux-800" />
                  </div>
                  <CardTitle>Engagement</CardTitle>
                  <CardDescription>
                    ProxiSanté s'engage pour un système de santé plus fort, plus équitable et proche
                    de chaque citoyen.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Le problème des déserts médicaux */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Le défi des déserts médicaux en France
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                En 2024, près de <strong>6 millions de Français</strong> vivent dans un désert médical,
                c'est-à-dire une zone où l'accès à un médecin généraliste est difficile ou très limité.
              </p>
              <p className="mt-4">
                Cette situation s'aggrave chaque année avec le départ à la retraite de nombreux praticiens
                et une répartition inégale des jeunes médecins sur le territoire.
              </p>
              <p className="mt-4">
                <strong>ProxiSanté</strong> agit comme un facilitateur en :
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Rendant visibles les opportunités dans toutes les régions</li>
                <li>Simplifiant la mise en relation entre médecins et structures</li>
                <li>Accélérant les processus de recrutement</li>
                <li>Valorisant les zones prioritaires</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bordeaux-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Rejoignez-nous dans cette mission
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Ensemble, construisons un système de santé plus accessible pour tous
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/medecin/register">
                <Button size="lg">Je suis médecin</Button>
              </Link>
              <Link href="/auth/structure/register">
                <Button variant="outline" size="lg">
                  Je suis une structure
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
