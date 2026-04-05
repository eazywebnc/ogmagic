import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { GenerateContent } from './generate-content'

export default async function GeneratePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: ogUser } = await supabase
    .from('og_users')
    .select('id, plan, images_this_month')
    .eq('auth_id', user.id)
    .single()

  const { data: templates } = await supabase
    .from('og_templates')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <GenerateContent
      userId={ogUser?.id ?? ''}
      userPlan={ogUser?.plan ?? 'free'}
      imagesThisMonth={ogUser?.images_this_month ?? 0}
      templates={templates ?? []}
    />
  )
}
