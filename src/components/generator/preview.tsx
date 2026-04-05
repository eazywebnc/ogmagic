'use client'

import type { OGTemplate, ImageSettings, TextLayer, BackgroundLayer, ShapeLayer } from '@/lib/types'

interface PreviewProps {
  template: OGTemplate
  settings: ImageSettings
  generatedUrl: string | null
  width: number
  height: number
}

export function Preview({ template, settings, generatedUrl, width, height }: PreviewProps) {
  const aspectRatio = width / height

  if (generatedUrl) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Generated Image
        </h3>
        <div className="glass-card rounded-xl overflow-hidden">
          <img
            src={generatedUrl}
            alt="Generated OG image"
            className="w-full"
            style={{ aspectRatio: `${width}/${height}` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {width}x{height}
        </p>
      </div>
    )
  }

  // Live CSS preview
  const bg = template.layers.find((l): l is BackgroundLayer => l.type === 'background')
  const bgStyle = bg?.gradient
    ? { background: bg.gradient }
    : bg?.color
    ? { background: bg.color }
    : { background: '#0f172a' }

  const textLayers = template.layers.filter((l): l is TextLayer => l.type === 'text')
  const shapeLayers = template.layers.filter((l): l is ShapeLayer => l.type === 'shape')

  // Scale factor: preview width is ~100%, map template coords proportionally
  const scaleX = 100 / template.width
  const scaleY = 100 / template.height

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
        Live Preview
      </h3>
      <div
        className="glass-card rounded-xl overflow-hidden relative"
        style={{ ...bgStyle, aspectRatio: `${width}/${height}` }}
      >
        {/* Shapes */}
        {shapeLayers.map((shape, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${shape.x * scaleX}%`,
              top: `${shape.y * scaleY}%`,
              width: `${shape.width * scaleX}%`,
              height: `${shape.height * scaleY}%`,
              backgroundColor: shape.color,
              opacity: shape.opacity ?? 1,
              borderRadius: shape.border_radius ? `${shape.border_radius * scaleX}%` : 0,
            }}
          />
        ))}

        {/* Text layers */}
        {textLayers.map((layer) => {
          const text = settings.texts[layer.key] ?? layer.default_value
          const fontSize = Math.max(layer.font_size * scaleX * 0.6, 8)

          return (
            <div
              key={layer.key}
              className="absolute leading-tight break-words"
              style={{
                left: `${layer.x * scaleX}%`,
                top: `${layer.y * scaleY}%`,
                fontSize: `${fontSize}px`,
                fontWeight: layer.font_weight,
                color: layer.color,
                maxWidth: layer.max_width ? `${layer.max_width * scaleX}%` : 'auto',
                fontFamily: settings.font ?? 'Inter',
                textAlign: layer.align ?? 'left',
              }}
            >
              {text}
            </div>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Preview ({width}x{height}) - Generate to see the final result
      </p>
    </div>
  )
}
