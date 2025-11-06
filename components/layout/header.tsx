'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export function Header() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-bordeaux-800">ProxiSanté</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-bordeaux-800 ${
                pathname === '/' ? 'text-bordeaux-800' : 'text-gray-600'
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/carte"
              className={`transition-colors hover:text-bordeaux-800 ${
                pathname === '/carte' ? 'text-bordeaux-800' : 'text-gray-600'
              }`}
            >
              Carte des offres
            </Link>
            <Link
              href="/a-propos"
              className={`transition-colors hover:text-bordeaux-800 ${
                pathname === '/a-propos' ? 'text-bordeaux-800' : 'text-gray-600'
              }`}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className={`transition-colors hover:text-bordeaux-800 ${
                pathname === '/contact' ? 'text-bordeaux-800' : 'text-gray-600'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/messages">
                <Button variant="ghost">Messages</Button>
              </Link>
              <Link href="/favoris">
                <Button variant="ghost">Favoris</Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/medecin/login">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link href="/auth/structure/register">
                <Button>Créer un compte structure</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
