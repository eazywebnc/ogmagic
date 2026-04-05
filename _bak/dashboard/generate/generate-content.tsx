'use client'

import { useState } from 'react'
import type { OGTemplate, Plan, ImageFormat, ImageSettings, TextLayer } from '@/lib/types'
import { PLAN_MAP, FONTS, IMAGE_SIZES } from '@/lib/constants'
import { TemplatePicker } from '@/components/generator/template-picker'
import { CustomizeForm } from '@/components/generator/customize-form'
import { Preview } from '@/components/generator/preview'
import { Loader2, Download, Wand2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface GenerateContentProps {
  userId: string
  userPlan: Plan
  imagesThisMonth: number
  templates: OGTemplate[]
}

export function GenerateContent({ userId, userPlan, imagesThisMonth, templates }: GenerateContentProps) {
  const [step, setStep] = useState<'pick' | 'customize'>('pick')
  const [selectedTemplate, setSelectedTemplate] = useState<OGTemplate | null>(null)
  const [settings, setSettings] = useState<ImageSettings>({ texts: {} })
  const [format, setFormat] = useState<ImageFormat>('png')
  const [sizeIndex, setSizeIndex] = useState(0)
  const [font, setFont] = useState('Inter')
  const [generating, setGenerating] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const plan = PLAN_MAP[userPlan]
  const limit = plan?.limits?.images_per_month
  const atLimit = limit !== 'unlimited' && imagesThisMonth >= (limit ?? 50)

  function handleSelectTemplate(template: OGTemplate) {
    setSelectedTemplate(template)
    // Initialize settings from template defaults
    const texts: Record<string, string> = {}
    template.layers
      .filter((l): l is TextLayer => l.type === 'text')
      .forEach((l) => {
        texts[l.key] = l.default_value
      })
    setSettings({ texts, font })
    setGeneratedUrl(null)
    setError('')
    setStep('customize')
  }

  async function handleGenerate() {
    if (!selectedTemplate || atLimit) return
    setGenerating(true)
    setError('')

    try {
      const size = IMAGE_SIZES[sizeIndex]
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: selectedTemplate.id,
          title: settings.texts['title'] ?? 'Untitled',
          settings: { ...settings, font },
          format,
          width: size.width,
          height: size.height,
          user_id: userId,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Generation failed')
      }

      // Response is an image blob
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setGeneratedUrl(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    }
    setGenerating(false)
  }

  function handleDownload() {
    if (!generatedUrl) return
    const a = document.createElement('a')
    a.href = generatedUrl
    a.download = `ogmagic-${Date.now()}.${format}`
    a.click()
  }

  if (step === 'pick') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Generate Image</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Step 1: Choose a template to start.
          </p>
        </div>
        <TemplatePicker
          templates={templates}
          userPlan={userPlan}
          onSelect={handleSelectTemplate}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStep('pick')}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Customize</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Template: {selectedTemplate?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {generatedUrl && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-white/10 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating || atLimit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-medium text-sm disabled:opacity-50"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            Generate
          </button>
        </div>
      </div>

      {atLimit && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400">
          You&apos;ve reached your monthly limit.{' '}
          <Link href="/dashboard/billing" className="underline font-medium">Upgrade</Link> for more.
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <CustomizeForm
          template={selectedTemplate!}
          settings={settings}
          onSettingsChange={setSettings}
          format={format}
          onFormatChange={setFormat}
          sizeIndex={sizeIndex}
          onSizeIndexChange={setSizeIndex}
          font={font}
          onFontChange={setFont}
        />

        {/* Right: Preview */}
        <Preview
          template={selectedTemplate!}
          settings={{ ...settings, font }}
          generatedUrl={generatedUrl}
          width={IMAGE_SIZES[sizeIndex].width}
          height={IMAGE_SIZES[sizeIndex].height}
        />
      </div>
    </div>
  )
}
