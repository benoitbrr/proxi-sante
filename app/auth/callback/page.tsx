import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code: string }
}) {
  const supabase = await createClient()

  if (searchParams.code) {
    await supabase.auth.exchangeCodeForSession(searchParams.code)
  }

  redirect('/carte')
}
