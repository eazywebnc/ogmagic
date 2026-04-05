'use client'

import { motion } from 'framer-motion'
import { SEED_TEMPLATES } from '@/lib/templates'

export function TemplatesShowcase() {
  const displayTemplates = SEED_TEMPLATES.slice(0, 6)

  return (
    <section id="templates" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-cyan-400 tracking-wider uppercase mb-4">
            Templates
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Start with a{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              pro template
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professionally designed templates for every use case. Customize everything or use as-is.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTemplates.map((template, i) => {
            const bg = template.layers.find((l) => l.type === 'background')
            const bgStyle = bg && 'gradient' in bg && bg.gradient
              ? { background: bg.gradient }
              : bg && 'color' in bg && bg.color
              ? { background: bg.color }
              : { background: 'linear-gradient(135deg, #0f172a, #1e1b4b)' }

            const textLayers = template.layers.filter((l) => l.type === 'text') as Array<{
              type: 'text'
              key: string
              default_value: string
              font_size: number
              font_weight: string
              color: string
            }>

            return (
              <motion.div
                key={template.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="glass-card rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-colors">
                  {/* Template preview */}
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
                  </div>
                  {/* Template info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {template.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
