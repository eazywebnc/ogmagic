'use client'

import { motion } from 'framer-motion'
import { PLANS } from '@/lib/constants'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 tracking-wider uppercase mb-4">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free, upgrade when you need more. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'relative rounded-2xl p-8 flex flex-col',
                plan.is_popular
                  ? 'glass border-2 border-cyan-500/40 shadow-[0_0_40px_oklch(0.72_0.19_195/15%)]'
                  : 'glass-card'
              )}
            >
              {plan.is_popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-extrabold">
                  ${plan.price_monthly}
                </span>
                {plan.price_monthly > 0 && (
                  <span className="text-muted-foreground ml-1">/mo</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/login"
                className={cn(
                  'block text-center py-3 rounded-xl font-medium text-sm transition-all',
                  plan.is_popular
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white'
                    : 'glass hover:bg-white/10 text-foreground'
                )}
              >
                {plan.price_monthly === 0 ? 'Get started free' : 'Start free trial'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
