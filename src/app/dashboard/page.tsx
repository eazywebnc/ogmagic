import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardContent } from './dashboard-content'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: ogUser } = await supabase
    .from('og_users')
    .select('*')
    .eq('auth_id', user.id)
    .single()

  const { data: images } = await supabase
    .from('og_images')
    .select('*')
    .eq('user_id', ogUser?.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const { count: totalImages } = await supabase
    .from('og_images')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', ogUser?.id)

  const { count: apiKeysCount } = await supabase
    .from('og_api_keys')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', ogUser?.id)

  return (
    <DashboardContent
      user={ogUser}
      images={images ?? []}
      totalImages={totalImages ?? 0}
      apiKeysCount={apiKeysCount ?? 0}
    />
  )
}
