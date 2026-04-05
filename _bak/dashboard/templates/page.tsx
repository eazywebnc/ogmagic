import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TemplatesGallery } from './templates-gallery'

export default async function TemplatesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: ogUser } = await supabase
    .from('og_users')
    .select('plan')
    .eq('auth_id', user.id)
    .single()

  const { data: templates } = await supabase
    .from('og_templates')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <TemplatesGallery
      templates={templates ?? []}
      userPlan={ogUser?.plan ?? 'free'}
    />
  )
}
