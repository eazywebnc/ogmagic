import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    console.error('[auth/callback] exchangeCodeForSession error:', error)
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  const user = data.user

  try {
    const admin = createAdminClient()

    const { data: existing } = await admin
      .from('og_users')
      .select('id')
      .eq('auth_id', user.id)
      .single()

    if (!existing) {
      const name =
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email?.split('@')[0] ??
        'User'

      await admin.from('og_users').insert({
        auth_id: user.id,
        email: user.email,
        name,
        plan: 'free',
        images_this_month: 0,
      })
    }
  } catch (err) {
    console.error('[auth/callback] og_users upsert error:', err)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
