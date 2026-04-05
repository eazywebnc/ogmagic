'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

const floatingCards = [
  {
    title: 'How to Build APIs',
    subtitle: 'yourblog.com/post',
    gradient: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/20',
    rotation: '-rotate-6',
    position: 'top-32 -left-8 lg:left-12',
    delay: 0,
  },
  {
    title: 'Launching v2.0',
    subtitle: 'producthunt.com',
    gradient: 'from-violet-500/20 to-purple-600/20',
    border: 'border-violet-500/20',
    rotation: 'rotate-3',
    position: 'top-48 -right-4 lg:right-16',
    delay: 0.3,
  },
  {
    title: 'React Conf 2026',
    subtitle: 'March 15-17',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-500/20',
    rotation: '-rotate-3',
    position: 'bottom-24 left-4 lg:left-24',
    delay: 0.6,
  },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.25_0.12_195),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.2_0.15_290),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.15_0.1_195),transparent_40%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating OG image cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + card.delay, duration: 0.8 }}
          className={`absolute ${card.position} hidden lg:block`}
        >
          <div
            className={`${card.rotation} animate-float-slow w-64 h-36 rounded-xl bg-gradient-to-br ${card.gradient} border ${card.border} backdrop-blur-sm p-5 flex flex-col justify-between`}
            style={{ animationDelay: `${card.delay * 2}s` }}
          >
            <p className="text-sm font-semibold text-white/80 truncate">{card.title}</p>
            <p className="text-xs text-white/40">{card.subtitle}</p>
          </div>
        </motion.div>
      ))}

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-cyan-400 mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>AI-powered OG image generation</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          Generate{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            stunning OG images
          </span>
          <br />
          in seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Pick a template, customize with AI, and export beautiful social banners
          for every platform. API included.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-semibold text-lg transition-all animate-pulse-glow"
          >
            Start generating free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/10 text-foreground font-medium text-lg transition-all"
          >
            Browse templates
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          50 free images/month. No credit card required.
        </motion.p>
      </div>
    </section>
  )
}
