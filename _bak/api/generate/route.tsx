import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { PLAN_MAP } from '@/lib/constants'
import type { ImageSettings, TextLayer, BackgroundLayer, ShapeLayer } from '@/lib/types'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { template_id, title, settings, format, width, height, user_id } = body as {
    template_id: string
    title: string
    settings: ImageSettings
    format: string
    width: number
    height: number
    user_id: string
  }

  const admin = createAdminClient()

  // Get user and check limits
  const { data: ogUser } = await admin
    .from('og_users')
    .select('id, plan, images_this_month')
    .eq('id', user_id)
    .single()

  if (!ogUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const plan = PLAN_MAP[ogUser.plan]
  const limit = plan?.limits?.images_per_month
  if (limit !== 'unlimited' && ogUser.images_this_month >= (limit ?? 50)) {
    return NextResponse.json({ error: 'Monthly limit reached' }, { status: 429 })
  }

  // Get template
  const { data: template } = await admin
    .from('og_templates')
    .select('*')
    .eq('id', template_id)
    .single()

  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 })
  }

  // Check premium access
  if (template.is_premium && ogUser.plan === 'free') {
    return NextResponse.json({ error: 'Premium template requires Pro or Scale plan' }, { status: 403 })
  }

  const layers = template.layers as (BackgroundLayer | TextLayer | ShapeLayer)[]
  const bg = layers.find((l): l is BackgroundLayer => l.type === 'background')
  const textLayers = layers.filter((l): l is TextLayer => l.type === 'text')
  const shapeLayers = layers.filter((l): l is ShapeLayer => l.type === 'shape')

  const imgWidth = width ?? 1200
  const imgHeight = height ?? 630

  // Build the image using @vercel/og
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
              fontFamily: settings?.font ?? 'Inter',
              lineHeight: 1.2,
              display: 'flex',
            }}
          >
            {settings?.texts?.[layer.key] ?? layer.default_value}
          </div>
        ))}

        {ogUser.plan === 'free' && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              right: 16,
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Inter',
              display: 'flex',
            }}
          >
            Made with OGMagic
          </div>
        )}
      </div>
    ),
    {
      width: imgWidth,
      height: imgHeight,
    }
  )

  // Increment usage
  await admin
    .from('og_users')
    .update({
      images_this_month: ogUser.images_this_month + 1,
      updated_at: new Date().toISOString(),
    })
    .eq('id', ogUser.id)

  // Save image record
  await admin.from('og_images').insert({
    user_id: ogUser.id,
    template_id,
    title: title || 'Untitled',
    settings: settings ?? {},
    format: format ?? 'png',
    width: imgWidth,
    height: imgHeight,
  })

  return imageResponse
}
