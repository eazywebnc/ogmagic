import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ApiKeysContent } from './api-keys-content'

export default async function ApiKeysPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: ogUser } = await supabase
    .from('og_users')
    .select('id, plan')
    .eq('auth_id', user.id)
    .single()

  const { data: keys } = await supabase
    .from('og_api_keys')
    .select('*')
    .eq('user_id', ogUser?.id)
    .order('created_at', { ascending: false })

  return (
    <ApiKeysContent
      keys={keys ?? []}
      userPlan={ogUser?.plan ?? 'free'}
      userId={ogUser?.id ?? ''}
    />
  )
}
