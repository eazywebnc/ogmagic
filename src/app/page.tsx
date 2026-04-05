import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { TemplatesShowcase } from '@/components/landing/templates-showcase'
import { Pricing } from '@/components/landing/pricing'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <TemplatesShowcase />
      <section id="api" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              REST API
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Generate OG images programmatically. Integrate with your CMS, blog, or CI/CD pipeline for automatic social previews.
          </p>
          <div className="glass rounded-2xl p-6 text-left font-mono text-sm overflow-x-auto">
            <div className="text-muted-foreground mb-2"># Generate an OG image via the API</div>
            <div>
              <span className="text-cyan-400">curl</span>{' '}
              <span className="text-violet-400">-X POST</span>{' '}
              https://ogmagic.eazyweb.nc/api/generate \
            </div>
            <div className="pl-4">
              <span className="text-violet-400">-H</span>{' '}
              <span className="text-emerald-400">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span> \
            </div>
            <div className="pl-4">
              <span className="text-violet-400">-H</span>{' '}
              <span className="text-emerald-400">&quot;Content-Type: application/json&quot;</span> \
            </div>
            <div className="pl-4">
              <span className="text-violet-400">-d</span>{' '}
              <span className="text-emerald-400">&apos;{'{"template":"minimal","title":"My Blog Post","subtitle":"A great article"}'}&apos;</span>
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-6 text-left">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">30+ Templates</h3>
              <p className="text-sm text-muted-foreground">Choose from our library of professionally designed templates.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Auto-generate</h3>
              <p className="text-sm text-muted-foreground">Integrate once, generate beautiful OG images on every publish.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">High Performance</h3>
              <p className="text-sm text-muted-foreground">Edge-cached images with sub-100ms response times globally.</p>
            </div>
          </div>
        </div>
      </section>
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
