'use client'

import { useState } from 'react'
import type { OGUser } from '@/lib/types'
import { PLANS, PLAN_MAP } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Check, Loader2, Sparkles } from 'lucide-react'

interface BillingContentProps {
  user: OGUser | null
  authId: string
}

export function BillingContent({ user, authId }: BillingContentProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const currentPlan = user?.plan ?? 'free'

  async function handleUpgrade(priceId: string) {
    setLoading(priceId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
    }
    setLoading(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your subscription and plan.
        </p>
      </div>

      {/* Current plan */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold">Current plan</h3>
        </div>
        <p className="text-3xl font-bold capitalize">{currentPlan}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {PLAN_MAP[currentPlan]?.description}
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan
          return (
            <div
              key={plan.id}
              className={cn(
                'rounded-2xl p-6 flex flex-col',
                plan.is_popular
                  ? 'glass border-2 border-cyan-500/40'
                  : 'glass-card'
              )}
            >
              {plan.is_popular && (
                <span className="text-xs font-semibold text-cyan-400 mb-3">Most Popular</span>
              )}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold">${plan.price_monthly}</span>
                {plan.price_monthly > 0 && <span className="text-muted-foreground">/mo</span>}
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => plan.stripe_price_id && handleUpgrade(plan.stripe_price_id)}
                disabled={isCurrent || !plan.stripe_price_id || loading !== null}
                className={cn(
                  'w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2',
                  isCurrent
                    ? 'bg-muted text-muted-foreground cursor-default'
                    : plan.is_popular
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-600 hover:to-violet-700'
                    : 'glass hover:bg-white/10'
                )}
              >
                {loading === plan.stripe_price_id && <Loader2 className="w-4 h-4 animate-spin" />}
                {isCurrent ? 'Current plan' : plan.price_monthly === 0 ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
