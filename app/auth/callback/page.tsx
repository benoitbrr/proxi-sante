import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code: string }
}) {
  const supabase = await createServerSupabaseClient()

  if (searchParams.code) {
    await supabase.auth.exchangeCodeForSession(searchParams.code)
  }

  redirect('/carte')
}
