'use client'

import { Image, Wand2, Key, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  imagesThisMonth: number
  totalImages: number
  planLimit: number | 'unlimited'
  apiKeysCount: number
}

export function StatsCards({ imagesThisMonth, totalImages, planLimit, apiKeysCount }: StatsCardsProps) {
  const limitText = planLimit === 'unlimited' ? 'Unlimited' : `${planLimit}`
  const usagePercent = planLimit === 'unlimited' ? 0 : Math.min((imagesThisMonth / planLimit) * 100, 100)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm text-muted-foreground">This Month</span>
        </div>
        <p className="text-2xl font-bold">{imagesThisMonth}</p>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Usage</span>
            <span>{imagesThisMonth} / {limitText}</span>
          </div>
          {planLimit !== 'unlimited' && (
            <div className="h-1.5 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Image className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-sm text-muted-foreground">Total Images</span>
        </div>
        <p className="text-2xl font-bold">{totalImages}</p>
      </div>

      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm text-muted-foreground">Templates</span>
        </div>
        <p className="text-2xl font-bold">10+</p>
      </div>

      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Key className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-sm text-muted-foreground">API Keys</span>
        </div>
        <p className="text-2xl font-bold">{apiKeysCount}</p>
      </div>
    </div>
  )
}
