export default function FavorisPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes favoris</h1>
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-4">
              Cette page affichera vos offres et structures favorites.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✅ Liste des offres sauvegardées</p>
              <p>✅ Liste des structures favorites</p>
              <p>✅ Bouton de suppression des favoris</p>
              <p>✅ Liens vers les offres et profils</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
