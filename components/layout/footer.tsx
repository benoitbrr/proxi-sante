import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-bordeaux-800">ProxiSanté</h3>
            <p className="mt-4 text-sm text-gray-600">
              Connecter médecins et structures de santé pour renforcer l'accès aux soins.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-bordeaux-800">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/carte" className="text-gray-600 hover:text-bordeaux-800">
                  Carte des offres
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-600 hover:text-bordeaux-800">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-bordeaux-800">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Légal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-gray-600 hover:text-bordeaux-800">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-gray-600 hover:text-bordeaux-800">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-gray-600 hover:text-bordeaux-800">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Email: contact@proxisante.fr</li>
              <li>Téléphone: 01 23 45 67 89</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} ProxiSanté. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
