import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { generateApiKey, hashApiKey } from '@/lib/utils'

// GET /api/images — list user's images
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: ogUser } = await supabase
    .from('og_users')
    .select('id')
    .eq('auth_id', user.id)
    .single()

  if (!ogUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 100)
  const offset = parseInt(searchParams.get('offset') ?? '0', 10)

  const { data: images, count } = await supabase
    .from('og_images')
    .select('*', { count: 'exact' })
    .eq('user_id', ogUser.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  return NextResponse.json({ images, total: count })
}

// POST /api/images — create API key or other actions
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  if (body.action === 'create_api_key') {
    const admin = createAdminClient()
    const rawKey = generateApiKey()
    const keyHash = hashApiKey(rawKey)

    const { error } = await admin.from('og_api_keys').insert({
      user_id: body.user_id,
      key_hash: keyHash,
      name: body.name || 'Default',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ key: rawKey })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
