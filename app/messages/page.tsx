export default function MessagesPage() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="flex h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Messagerie</h1>
            <p className="text-gray-600 mb-8">
              Interface de messagerie temps réel entre médecins et structures.
            </p>
            <div className="space-y-2 text-sm text-gray-500 text-left bg-white p-6 rounded-lg border">
              <p className="font-semibold mb-2">Fonctionnalités à implémenter :</p>
              <p>✅ 2 colonnes : liste conversations / messages</p>
              <p>✅ Temps réel avec Supabase Realtime</p>
              <p>✅ Filtrage par offre (pour structures)</p>
              <p>✅ Marquage des messages comme lus</p>
              <p>✅ Email automatique après 24h si non lu</p>
              <p>✅ Pas de statut "en ligne" ni "vu"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
