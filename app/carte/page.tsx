export default function CartePage() {
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Carte interactive</h1>
          <p className="text-gray-600 mb-8">
            Cette page contiendra la carte Mapbox interactive avec les offres médicales.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>✅ Affichage des marqueurs des structures</p>
            <p>✅ Filtres (spécialité, contrat, rémunération)</p>
            <p>✅ Clustering pour zones denses</p>
            <p>✅ Panneau latéral avec liste d'offres</p>
            <p>✅ URL dynamique (/carte?offre=123)</p>
          </div>
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>À implémenter :</strong> Composant MapboxMap avec react-map-gl, 
              filtres dynamiques, et intégration Supabase pour récupérer les offres.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
