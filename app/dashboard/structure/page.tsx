export default function StructureDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Vues totales</h3>
              <p className="text-3xl font-bold text-bordeaux-800">245</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Messages reçus</h3>
              <p className="text-3xl font-bold text-bordeaux-800">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Favoris</h3>
              <p className="text-3xl font-bold text-bordeaux-800">8</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-4">
              Tableau de bord avec statistiques de la structure.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✅ Statistiques (vues, messages, favoris)</p>
              <p>✅ Navigation vers : Offres / Messages / Profil / Abonnement</p>
              <p>✅ Graphiques de performance (optionnel)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
