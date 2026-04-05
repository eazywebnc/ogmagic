import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found — OGMagic',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.3_0.12_195),transparent_60%)]" />

      <div className="relative text-center max-w-md px-6">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
