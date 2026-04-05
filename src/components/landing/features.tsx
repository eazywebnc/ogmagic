'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  LayoutTemplate,
  Code2,
  Download,
  Palette,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: string
  bg: string
  colSpan: 1 | 2
  visual?: 'og-preview' | 'code-snippet'
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description:
      'Describe what you want and let AI generate the perfect OG image. Smart text placement and color suggestions.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    colSpan: 2,
    visual: 'og-preview',
  },
  {
    icon: LayoutTemplate,
    title: '30+ Premium Templates',
    description:
      'Blog posts, product launches, events, tutorials, quotes, stats and more. All professionally designed.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    colSpan: 1,
  },
  {
    icon: Download,
    title: 'Multi-Format Export',
    description:
      'Export as PNG, JPEG, or WebP. Optimized for every social platform: Twitter, Facebook, LinkedIn, and more.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    colSpan: 1,
  },
  {
    icon: Code2,
    title: 'Powerful API',
    description:
      'Generate images programmatically with our REST API. Perfect for automating OG images for your blog or SaaS.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    colSpan: 2,
    visual: 'code-snippet',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description:
      'Custom fonts, colors, gradients, and layouts. Make every image match your brand identity perfectly.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    colSpan: 1,
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Images generated in under 2 seconds. Edge-rendered for maximum performance worldwide.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    colSpan: 1,
  },
]

/* ------------------------------------------------------------------ */
/*  Visual: OG image preview mockup (CSS-only)                         */
/* ------------------------------------------------------------------ */

function OgPreviewVisual() {
  return (
    <div className="relative w-full aspect-[1.91/1] max-w-[340px] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-violet-600 to-fuchsia-600" />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.3),transparent_60%)]" />

      {/* Content mock */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5">
        {/* Logo placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white/30" />
          <div className="h-2.5 w-16 rounded-full bg-white/30" />
        </div>

        {/* Title block */}
        <div className="space-y-2">
          <div className="h-4 w-4/5 rounded-full bg-white/90" />
          <div className="h-4 w-3/5 rounded-full bg-white/70" />
          <div className="h-2.5 w-2/5 rounded-full bg-white/40 mt-3" />
        </div>
      </div>

      {/* Shimmer animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Visual: Code snippet mockup                                        */
/* ------------------------------------------------------------------ */

function CodeSnippetVisual() {
  return (
    <div className="w-full max-w-[380px] rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl shadow-emerald-500/10 font-mono text-[11px] leading-relaxed">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 text-[10px] text-white/30">generate.ts</span>
      </div>

      {/* Code lines */}
      <div className="px-4 py-3 space-y-1 overflow-hidden">
        <p>
          <span className="text-violet-400">const</span>{' '}
          <span className="text-cyan-300">res</span>{' '}
          <span className="text-white/50">=</span>{' '}
          <span className="text-violet-400">await</span>{' '}
          <span className="text-yellow-300">fetch</span>
          <span className="text-white/40">(</span>
        </p>
        <p className="pl-4">
          <span className="text-emerald-400">{`"https://api.ogmagic.com/v1/generate"`}</span>
          <span className="text-white/40">,</span>
        </p>
        <p className="pl-4">
          <span className="text-white/40">{'{'}</span>{' '}
          <span className="text-cyan-300">method</span>
          <span className="text-white/40">:</span>{' '}
          <span className="text-emerald-400">{`"POST"`}</span>
          <span className="text-white/40">,</span>
        </p>
        <p className="pl-6">
          <span className="text-cyan-300">body</span>
          <span className="text-white/40">:</span>{' '}
          <span className="text-yellow-300">JSON</span>
          <span className="text-white/40">.</span>
          <span className="text-yellow-300">stringify</span>
          <span className="text-white/40">({'{'}</span>
        </p>
        <p className="pl-8">
          <span className="text-cyan-300">title</span>
          <span className="text-white/40">:</span>{' '}
          <span className="text-emerald-400">{`"My Article"`}</span>
          <span className="text-white/40">,</span>
        </p>
        <p className="pl-8">
          <span className="text-cyan-300">template</span>
          <span className="text-white/40">:</span>{' '}
          <span className="text-emerald-400">{`"blog"`}</span>
        </p>
        <p className="pl-6">
          <span className="text-white/40">{'}'})</span>{' '}
          <span className="text-white/40">{'}'}</span>
        </p>
        <p>
          <span className="text-white/40">);</span>
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Bento card                                                         */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const isWide = feature.colSpan === 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`
        glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors group relative overflow-hidden
        ${isWide ? 'md:col-span-2' : 'md:col-span-1'}
      `}
    >
      {/* Subtle gradient glow on hover */}
      <div
        className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          feature.color.replace('text-', 'bg-').replace('400', '500/5')
        }`}
      />

      <div className={`relative z-10 ${isWide ? 'flex flex-col md:flex-row md:items-center md:gap-10' : ''}`}>
        {/* Text content */}
        <div className={isWide ? 'flex-1' : ''}>
          <div
            className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5`}
          >
            <feature.icon className={`w-6 h-6 ${feature.color}`} />
          </div>
          <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Visual element for wide cards */}
        {isWide && feature.visual && (
          <div className="mt-6 md:mt-0 flex-shrink-0 flex items-center justify-center">
            {feature.visual === 'og-preview' && <OgPreviewVisual />}
            {feature.visual === 'code-snippet' && <CodeSnippetVisual />}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const gridY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px'])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4])

  return (
    <section id="features" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
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
            From quick one-off banners to automated API pipelines, OGMagic
            covers every use case.
          </p>
        </motion.div>

        {/* Bento grid with scroll parallax */}
        <motion.div
          style={{ y: gridY, opacity: gridOpacity }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
