'use client'

import type { OGTemplate, ImageSettings, ImageFormat, TextLayer } from '@/lib/types'
import { FONTS, IMAGE_SIZES } from '@/lib/constants'

interface CustomizeFormProps {
  template: OGTemplate
  settings: ImageSettings
  onSettingsChange: (settings: ImageSettings) => void
  format: ImageFormat
  onFormatChange: (format: ImageFormat) => void
  sizeIndex: number
  onSizeIndexChange: (index: number) => void
  font: string
  onFontChange: (font: string) => void
}

export function CustomizeForm({
  template,
  settings,
  onSettingsChange,
  format,
  onFormatChange,
  sizeIndex,
  onSizeIndexChange,
  font,
  onFontChange,
}: CustomizeFormProps) {
  const textLayers = template.layers.filter((l): l is TextLayer => l.type === 'text')

  function updateText(key: string, value: string) {
    onSettingsChange({
      ...settings,
      texts: { ...settings.texts, [key]: value },
    })
  }

  return (
    <div className="space-y-6">
      {/* Text fields */}
      <div className="glass-card rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Text Content
        </h3>
        {textLayers.map((layer) => (
          <div key={layer.key} className="space-y-1.5">
            <label className="text-sm font-medium">{layer.label}</label>
            {layer.max_width && layer.max_width > 400 ? (
              <textarea
                value={settings.texts[layer.key] ?? layer.default_value}
                onChange={(e) => updateText(layer.key, e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none"
              />
            ) : (
              <input
                type="text"
                value={settings.texts[layer.key] ?? layer.default_value}
                onChange={(e) => updateText(layer.key, e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
            )}
          </div>
        ))}
      </div>

      {/* Style options */}
      <div className="glass-card rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Style
        </h3>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Font</label>
          <select
            value={font}
            onChange={(e) => onFontChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Size</label>
          <select
            value={sizeIndex}
            onChange={(e) => onSizeIndexChange(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          >
            {IMAGE_SIZES.map((s, i) => (
              <option key={i} value={i}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Format</label>
          <div className="flex gap-2">
            {(['png', 'jpeg', 'webp'] as ImageFormat[]).map((f) => (
              <button
                key={f}
                onClick={() => onFormatChange(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  format === f
                    ? 'bg-primary/10 text-primary border border-primary/30'
                    : 'bg-background border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
