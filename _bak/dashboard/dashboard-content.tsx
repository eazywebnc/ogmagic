'use client'

import type { OGUser, OGImage } from '@/lib/types'
import { PLAN_MAP } from '@/lib/constants'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ImageCard } from '@/components/dashboard/image-card'
import Link from 'next/link'
import { Wand2, Plus } from 'lucide-react'

interface DashboardContentProps {
  user: OGUser | null
  images: OGImage[]
  totalImages: number
  apiKeysCount: number
}

export function DashboardContent({ user, images, totalImages, apiKeysCount }: DashboardContentProps) {
  const plan = user ? PLAN_MAP[user.plan] : PLAN_MAP['free']
  const planLimit = plan?.limits?.images_per_month ?? 50

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Images</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, {user?.name ?? 'there'}
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-medium text-sm transition-all"
        >
          <Wand2 className="w-4 h-4" />
          Generate
        </Link>
      </div>

      <StatsCards
        imagesThisMonth={user?.images_this_month ?? 0}
        totalImages={totalImages}
        planLimit={planLimit}
        apiKeysCount={apiKeysCount}
      />

      {images.length === 0 ? (
        <div className="glass-card rounded-2xl p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No images yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Generate your first OG image in seconds.
          </p>
          <Link
            href="/dashboard/generate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-medium text-sm transition-all"
          >
            <Wand2 className="w-4 h-4" />
            Generate your first image
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  )
}
