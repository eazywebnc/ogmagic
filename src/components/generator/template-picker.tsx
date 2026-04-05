'use client'

import type { OGTemplate, Plan, TextLayer } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Lock, Wand2 } from 'lucide-react'

interface TemplatePickerProps {
  templates: OGTemplate[]
  userPlan: Plan
  onSelect: (template: OGTemplate) => void
}

export function TemplatePicker({ templates, userPlan, onSelect }: TemplatePickerProps) {
  const canUsePremium = userPlan !== 'free'

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => {
        const bg = template.layers.find((l) => l.type === 'background')
        const bgStyle = bg && 'gradient' in bg && bg.gradient
          ? { background: bg.gradient }
          : bg && 'color' in bg && bg.color
          ? { background: bg.color }
          : { background: 'linear-gradient(135deg, #0f172a, #1e1b4b)' }

        const textLayers = template.layers.filter((l): l is TextLayer => l.type === 'text')
        const locked = template.is_premium && !canUsePremium

        return (
          <button
            key={template.id}
            onClick={() => !locked && onSelect(template)}
            disabled={locked}
            className={cn(
              'text-left glass-card rounded-2xl overflow-hidden transition-all',
              locked ? 'opacity-60 cursor-not-allowed' : 'hover:border-cyan-500/30 hover:scale-[1.02]'
            )}
          >
            <div
              className="aspect-[1200/630] relative overflow-hidden p-6 flex flex-col justify-center"
              style={bgStyle}
            >
              {textLayers.slice(0, 3).map((layer, j) => (
                <p
                  key={j}
                  className="truncate leading-tight"
                  style={{
                    fontSize: `${Math.min(layer.font_size * 0.35, 24)}px`,
                    fontWeight: layer.font_weight,
                    color: layer.color,
                    marginBottom: '4px',
                  }}
                >
                  {layer.default_value}
                </p>
              ))}
              {template.is_premium && (
                <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                  PRO
                </span>
              )}
              {locked && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white/60" />
                </div>
              )}
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">{template.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{template.category}</p>
              </div>
              {!locked && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                  <Wand2 className="w-3 h-3" />
                  Use
                </span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
