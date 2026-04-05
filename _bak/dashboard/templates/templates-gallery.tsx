'use client'

import { useState } from 'react'
import type { OGTemplate, Plan, TemplateCategory } from '@/lib/types'
import { TEMPLATE_CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Lock, Wand2 } from 'lucide-react'

interface TemplatesGalleryProps {
  templates: OGTemplate[]
  userPlan: Plan
}

export function TemplatesGallery({ templates, userPlan }: TemplatesGalleryProps) {
  const [category, setCategory] = useState<TemplateCategory | 'all'>('all')

  const filtered = category === 'all'
    ? templates
    : templates.filter((t) => t.category === category)

  const canUsePremium = userPlan !== 'free'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Templates</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Choose a template to start generating images.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory('all')}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
            category === 'all'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          All
        </button>
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              category === cat.value
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template) => {
          const bg = template.layers.find((l) => l.type === 'background')
          const bgStyle = bg && 'gradient' in bg && bg.gradient
            ? { background: bg.gradient }
            : bg && 'color' in bg && bg.color
            ? { background: bg.color }
            : { background: 'linear-gradient(135deg, #0f172a, #1e1b4b)' }

          const textLayers = template.layers.filter((l) => l.type === 'text') as Array<{
            type: 'text'; key: string; default_value: string; font_size: number; font_weight: string; color: string
          }>

          const locked = template.is_premium && !canUsePremium

          return (
            <div key={template.id} className="group">
              <div className={cn(
                'glass-card rounded-2xl overflow-hidden transition-colors',
                locked ? 'opacity-75' : 'hover:border-cyan-500/30'
              )}>
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
                    <Link
                      href={`/dashboard/generate?template=${template.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      <Wand2 className="w-3 h-3" />
                      Use
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">No templates in this category yet.</p>
        </div>
      )}
    </div>
  )
}
