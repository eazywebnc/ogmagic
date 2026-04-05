import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BillingContent } from './billing-content'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: ogUser } = await supabase
    .from('og_users')
    .select('*')
    .eq('auth_id', user.id)
    .single()

  return <BillingContent user={ogUser} authId={user.id} />
}
