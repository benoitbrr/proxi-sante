export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions légales</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
              <p>
                <strong>ProxiSanté</strong><br />
                Société par actions simplifiée<br />
                Capital social : 10 000 €<br />
                Siège social : Paris, France<br />
                RCS Paris : XXX XXX XXX<br />
                SIRET : XXX XXX XXX XXXXX
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de la publication</h2>
              <p>Nom du directeur de publication</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergeur</h2>
              <p>
                <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p>
                Email : contact@proxisante.fr<br />
                Téléphone : 01 23 45 67 89
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est la propriété
                exclusive de ProxiSanté, sauf mention contraire. Toute reproduction, distribution, modification
                ou utilisation non autorisée est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Données personnelles</h2>
              <p>
                Pour toute information concernant le traitement de vos données personnelles, veuillez consulter
                notre <a href="/politique-confidentialite" className="text-bordeaux-800 hover:underline">
                  Politique de confidentialité
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
