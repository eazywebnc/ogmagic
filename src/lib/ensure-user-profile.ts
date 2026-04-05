import { createAdminClient } from '@/lib/supabase/server'

/**
 * Ensures the authenticated user has an og_users record.
 * Called on first dashboard access to support cross-SaaS login.
 */
export async function ensureUserProfile(userId: string, email: string) {
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('og_users')
    .select('auth_id')
    .eq('auth_id', userId)
    .single()

  if (existing) return

  await supabase.from('og_users').upsert(
    {
      auth_id: userId,
      email,
      plan: 'free',
    },
    { onConflict: 'auth_id' }
  )
}
