import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsContent } from './settings-content'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: ogUser } = await supabase
    .from('og_users')
    .select('*')
    .eq('auth_id', user.id)
    .single()

  return <SettingsContent user={ogUser} />
}
