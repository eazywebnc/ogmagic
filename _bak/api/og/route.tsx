import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { createAdminClient } from '@/lib/supabase/server'
import { hashApiKey } from '@/lib/utils'
import { PLAN_MAP } from '@/lib/constants'
import type { TextLayer, BackgroundLayer, ShapeLayer } from '@/lib/types'

/**
 * PUBLIC API endpoint: Generate OG images via API key
 *
 * POST /api/og
 * Headers: Authorization: Bearer og_xxxxx
 * Body: { template: "blog-post", texts: { title: "..." }, format: "png", width: 1200, height: 630 }
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 })
  }

  const apiKey = authHeader.slice(7)
  const keyHash = hashApiKey(apiKey)

  const admin = createAdminClient()

  // Look up API key
  const { data: keyRecord } = await admin
    .from('og_api_keys')
    .select('id, user_id')
    .eq('key_hash', keyHash)
    .single()

  if (!keyRecord) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }

  // Update last used
  await admin
    .from('og_api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', keyRecord.id)

  // Get user
  const { data: ogUser } = await admin
    .from('og_users')
    .select('id, plan, images_this_month')
    .eq('id', keyRecord.user_id)
    .single()

  if (!ogUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Check plan has API access
  const plan = PLAN_MAP[ogUser.plan]
  if (!plan?.limits?.api_access) {
    return NextResponse.json({ error: 'API access requires Pro or Scale plan' }, { status: 403 })
  }

  // Check limits
  const limit = plan.limits.images_per_month
  if (limit !== 'unlimited' && ogUser.images_this_month >= limit) {
    return NextResponse.json({ error: 'Monthly limit reached' }, { status: 429 })
  }

  const body = await request.json()
  const { template: templateSlug, texts, format, width, height } = body as {
    template: string
    texts: Record<string, string>
    format?: string
    width?: number
    height?: number
  }

  // Get template by slug
  const { data: template } = await admin
    .from('og_templates')
    .select('*')
    .eq('slug', templateSlug)
    .single()

  if (!template) {
    return NextResponse.json({ error: `Template "${templateSlug}" not found` }, { status: 404 })
  }

  const imgWidth = width ?? template.width ?? 1200
  const imgHeight = height ?? template.height ?? 630

  const layers = template.layers as (BackgroundLayer | TextLayer | ShapeLayer)[]
  const bg = layers.find((l): l is BackgroundLayer => l.type === 'background')
  const textLayers = layers.filter((l): l is TextLayer => l.type === 'text')
  const shapeLayers = layers.filter((l): l is ShapeLayer => l.type === 'shape')

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: imgWidth,
          height: imgHeight,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          ...(bg?.gradient
            ? { backgroundImage: bg.gradient }
            : bg?.color
            ? { backgroundColor: bg.color }
            : { backgroundColor: '#0f172a' }),
        }}
      >
        {shapeLayers.map((shape, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              width: shape.width,
              height: shape.height,
              backgroundColor: shape.color,
              opacity: shape.opacity ?? 1,
              borderRadius: shape.border_radius ?? 0,
            }}
          />
        ))}
        {textLayers.map((layer) => (
          <div
            key={layer.key}
            style={{
              position: 'absolute',
              left: layer.x,
              top: layer.y,
              fontSize: layer.font_size,
              fontWeight: layer.font_weight === '700' || layer.font_weight === '800' ? 'bold' : 'normal',
              color: layer.color,
              maxWidth: layer.max_width ?? 'auto',
              lineHeight: 1.2,
              display: 'flex',
            }}
          >
            {texts?.[layer.key] ?? layer.default_value}
          </div>
        ))}
      </div>
    ),
    { width: imgWidth, height: imgHeight }
  )

  // Increment usage
  await admin
    .from('og_users')
    .update({
      images_this_month: ogUser.images_this_month + 1,
      updated_at: new Date().toISOString(),
    })
    .eq('id', ogUser.id)

  // Save record
  await admin.from('og_images').insert({
    user_id: ogUser.id,
    template_id: template.id,
    title: texts?.title ?? 'API Generated',
    settings: { texts },
    format: format ?? 'png',
    width: imgWidth,
    height: imgHeight,
  })

  return imageResponse
}
