'use client'
import Image from "next/image";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const floatingCards = [
  {
    title: 'How to Build APIs',
    subtitle: 'yourblog.com/post',
    gradient: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/20',
    rotation: '-rotate-6',
    position: 'top-32 -left-8 lg:left-12',
    delay: 0,
    parallaxSpeed: -80,
  },
  {
    title: 'Launching v2.0',
    subtitle: 'producthunt.com',
    gradient: 'from-sky-500/20 to-blue-600/20',
    border: 'border-sky-500/20',
    rotation: 'rotate-3',
    position: 'top-48 -right-4 lg:right-16',
    delay: 0.3,
    parallaxSpeed: -120,
  },
  {
    title: 'React Conf 2026',
    subtitle: 'March 15-17',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-500/20',
    rotation: '-rotate-3',
    position: 'bottom-24 left-4 lg:left-24',
    delay: 0.6,
    parallaxSpeed: -50,
  },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Floating cards parallax (different speeds per card) ---
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const speed = floatingCards[i].parallaxSpeed
        gsap.to(el, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // --- Dashboard zoom-in on scroll ---
      if (dashboardRef.current) {
        gsap.fromTo(
          dashboardRef.current,
          { scale: 0.92, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: dashboardRef.current,
              start: 'top 90%',
              end: 'top 40%',
              scrub: true,
            },
          }
        )
      }

      // --- Headline split-text reveal (word by word) ---
      if (headlineRef.current) {
        // Wrap each word in a span for animation
        const h1 = headlineRef.current
        const originalHTML = h1.innerHTML

        // Split text nodes into word spans while preserving existing HTML elements
        const wrapWords = (node: ChildNode): string => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || ''
            return text
              .split(/(\s+)/)
              .map((part) =>
                part.trim()
                  ? `<span class="gsap-word" style="display:inline-block;opacity:0;transform:translateY(18px)">${part}</span>`
                  : part
              )
              .join('')
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement
            const tag = el.tagName.toLowerCase()
            // Preserve the element but wrap text children inside it
            const attrs = Array.from(el.attributes)
              .map((a) => `${a.name}="${a.value}"`)
              .join(' ')
            const inner = Array.from(el.childNodes).map(wrapWords).join('')
            return `<${tag}${attrs ? ' ' + attrs : ''}>${inner}</${tag}>`
          }
          return ''
        }

        const wrapped = Array.from(h1.childNodes).map(wrapWords).join('')
        h1.innerHTML = wrapped

        const words = h1.querySelectorAll<HTMLElement>('.gsap-word')

        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: h1,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        })

        // Cleanup function restores original HTML
        return () => {
          h1.innerHTML = originalHTML
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.25_0.12_195),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.3_0.18_230),transparent_50%)]" />
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
          ref={(el) => { cardRefs.current[i] = el }}
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-sky-400 mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>AI-powered OG image generation</span>
          </div>
        </motion.div>

        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          Generate{' '}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            stunning OG images
          </span>
          {' '}<br />
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold text-lg transition-all animate-pulse-glow"
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

        {/* Dashboard Preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div
            ref={dashboardRef}
            className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-sky-400/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image
              src="/images/dashboard.webp"
              alt="OGMagic OG image generator dashboard"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
