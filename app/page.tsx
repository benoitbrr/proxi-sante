import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Users, Heart, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-bordeaux-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Connecter médecins et structures de santé
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              ProxiSanté facilite le recrutement médical et renforce l'accès aux soins dans les territoires
              grâce à une plateforme interactive et intuitive.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/carte">
                <Button size="lg" className="text-base">
                  Accéder à la carte des offres
                </Button>
              </Link>
              <Link href="/a-propos">
                <Button variant="outline" size="lg" className="text-base">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trois étapes simples pour connecter médecins et structures de santé
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bordeaux-100">
                  <MapPin className="h-6 w-6 text-bordeaux-800" />
                </div>
                <CardTitle>1. Explorer</CardTitle>
                <CardDescription>
                  Découvrez les offres médicales sur une carte interactive et filtrez par spécialité,
                  type de contrat et localisation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bordeaux-100">
                  <Users className="h-6 w-6 text-bordeaux-800" />
                </div>
                <CardTitle>2. Contacter</CardTitle>
                <CardDescription>
                  Connectez-vous pour échanger directement avec les structures de santé via notre
                  messagerie intégrée.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bordeaux-100">
                  <Heart className="h-6 w-6 text-bordeaux-800" />
                </div>
                <CardTitle>3. Recruter</CardTitle>
                <CardDescription>
                  Les structures publient leurs offres et gèrent leurs candidatures simplement depuis
                  leur tableau de bord.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pourquoi ProxiSanté */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pourquoi ProxiSanté ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Notre mission : faciliter l'accès aux soins et lutter contre les déserts médicaux
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pour les médecins</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Accès gratuit à toutes les offres
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Visualisation géographique intuitive
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Contact direct avec les structures
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Sauvegarde de vos offres favorites
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pour les structures</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Publication d'offres simplifiée
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Visibilité accrue auprès des médecins
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Gestion centralisée des candidatures
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-bordeaux-800">✓</span>
                      Statistiques de performance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="flex justify-center">
                  <TrendingUp className="h-8 w-8 text-bordeaux-800" />
                </div>
                <div className="mt-4 text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Offres actives</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="flex justify-center">
                  <Users className="h-8 w-8 text-bordeaux-800" />
                </div>
                <div className="mt-4 text-3xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">Structures partenaires</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="flex justify-center">
                  <Heart className="h-8 w-8 text-bordeaux-800" />
                </div>
                <div className="mt-4 text-3xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Prêt à commencer ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Rejoignez ProxiSanté dès aujourd'hui et participez à l'amélioration de l'accès aux soins
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
