'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  LayoutTemplate,
  Code2,
  Download,
  Palette,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Describe what you want and let AI generate the perfect OG image. Smart text placement and color suggestions.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: LayoutTemplate,
    title: '30+ Premium Templates',
    description: 'Blog posts, product launches, events, tutorials, quotes, stats and more. All professionally designed.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Code2,
    title: 'Powerful API',
    description: 'Generate images programmatically with our REST API. Perfect for automating OG images for your blog or SaaS.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Download,
    title: 'Multi-Format Export',
    description: 'Export as PNG, JPEG, or WebP. Optimized for every social platform: Twitter, Facebook, LinkedIn, and more.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description: 'Custom fonts, colors, gradients, and layouts. Make every image match your brand identity perfectly.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Images generated in under 2 seconds. Edge-rendered for maximum performance worldwide.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-cyan-400 tracking-wider uppercase mb-4">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Everything you need for{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              perfect social images
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From quick one-off banners to automated API pipelines, OGMagic covers every use case.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
