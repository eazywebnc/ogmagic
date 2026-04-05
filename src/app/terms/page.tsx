import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — OGMagic',
  description:
    'OGMagic terms of service. Read the conditions governing your use of the OG image generator.',
  metadataBase: new URL('https://ogmagic.eazyweb.nc'),
  alternates: { canonical: '/terms' },
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account or using OGMagic ("the Service"), you agree to these Terms of Service.',
      'If you use the Service on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.',
      'These Terms are governed by the laws of New Caledonia (French legal framework). Disputes shall be resolved in the courts of Nouméa.',
    ],
  },
  {
    title: '2. Description of Service',
    content: [
      'OGMagic is a SaaS tool for generating OG images and social media banners using AI-powered customisation and pre-built templates.',
      'The Service includes a web dashboard, a REST API for programmatic generation, and a CDN-backed image delivery network.',
      'The Service is operated by EazyWebNC, based in Nouméa, New Caledonia.',
    ],
  },
  {
    title: '3. Account Responsibilities',
    content: [
      'You must provide accurate information when creating an account.',
      'You are responsible for keeping your credentials and API keys secure.',
      'You must not share API keys publicly (e.g. in client-side code, public repositories).',
      'You are responsible for all usage and charges incurred under your account, including API calls made with your keys.',
      'You must be at least 16 years old to use the Service.',
    ],
  },
  {
    title: '4. Acceptable Use',
    content: [
      'You may only use OGMagic to generate lawful image content.',
      'You must not generate images containing illegal, defamatory, obscene, infringing, or harmful content.',
      'You must not use the Service to impersonate other brands or individuals without authorisation.',
      'You must not attempt to circumvent rate limits, abuse the API, or reverse-engineer the Service.',
      'We reserve the right to remove generated images that violate these rules without prior notice.',
    ],
  },
  {
    title: '5. Generated Images & Intellectual Property',
    content: [
      'You retain ownership of OG images you generate using the Service, subject to third-party rights in any content you input.',
      'You are responsible for ensuring you have the necessary rights to any logos, fonts, or brand assets used in your images.',
      'EazyWebNC retains ownership of all templates, design assets, and proprietary technology underlying the Service.',
      'EazyWebNC grants you a non-exclusive licence to use generated images for any lawful commercial or personal purpose.',
    ],
  },
  {
    title: '6. API Usage',
    content: [
      'API access is available on Pro and Scale plans. Rate limits apply per plan as listed on the pricing page.',
      'You must not use the API to resell OG image generation as a standalone service without a separate commercial agreement with EazyWebNC.',
      'We reserve the right to throttle or revoke API access that causes platform instability or violates acceptable use.',
    ],
  },
  {
    title: '7. Plans, Billing & Cancellation',
    content: [
      'OGMagic offers Free, Pro, and Scale plans. Details are listed on the pricing page.',
      'Paid plans are billed monthly or annually via Stripe. All prices are in USD unless stated otherwise.',
      'You may cancel at any time. Access continues until the end of the billing period. No refunds for unused partial periods.',
      'We reserve the right to change pricing with 30 days\' notice. Existing subscribers are not affected mid-period.',
    ],
  },
  {
    title: '8. Image Storage & Delivery',
    content: [
      'Generated images are stored in Supabase Storage and delivered via Cloudflare CDN.',
      'Free plan images may be purged after 90 days of inactivity. Pro and Scale images are retained indefinitely.',
      'Publicly accessible image CDN URLs can be shared and accessed by anyone with the link. Do not embed sensitive information in images.',
    ],
  },
  {
    title: '9. Service Availability',
    content: [
      'We target 99.9% uptime. Scheduled maintenance will be announced in advance where possible.',
      'Image generation and API availability may be affected by third-party AI API or CDN provider outages beyond our control.',
    ],
  },
  {
    title: '10. Termination',
    content: [
      'We may suspend or terminate accounts that violate these Terms, with or without prior notice.',
      'You may delete your account at any time from Settings. Images and data are permanently deleted within 30 days.',
      'Download any images you wish to keep before deleting your account.',
    ],
  },
  {
    title: '11. Disclaimer of Warranties',
    content: [
      'The Service is provided "as is" without warranties of any kind. EazyWebNC disclaims all implied warranties.',
      'We do not guarantee that generated images will meet your specific design or platform requirements.',
    ],
  },
  {
    title: '12. Limitation of Liability',
    content: [
      'To the maximum extent permitted by law, EazyWebNC shall not be liable for indirect, incidental, or consequential damages.',
      'Our total liability shall not exceed the amount you paid in the 12 months preceding the claim.',
    ],
  },
  {
    title: '13. Changes to Terms',
    content: [
      'We may update these Terms at any time. Material changes will be communicated by email or in-app notice at least 14 days in advance.',
      'Continued use after changes constitutes acceptance of the new Terms.',
    ],
  },
  {
    title: '14. Contact',
    content: [
      'EazyWebNC — contact@eazyweb.nc',
      'Nouméa, New Caledonia',
      'eazyweb.nc',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#08080f] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to OGMagic
          </Link>
          <div className="text-sm text-white/30">Last updated: April 2026</div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-6">
          Legal
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Terms of{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Service
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          These terms govern your use of OGMagic, operated by EazyWebNC. Please
          read them before using the platform or API.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border border-white/[0.07] rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.035] transition-colors"
            >
              <h2 className="text-lg font-semibold mb-5 text-white">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="text-white/55 leading-relaxed text-sm flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-wrap gap-4 items-center justify-between p-6 rounded-xl border border-white/[0.07] bg-white/[0.02]">
          <p className="text-white/40 text-sm">
            Also review our{' '}
            <Link
              href="/privacy"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </p>
          <a
            href="mailto:contact@eazyweb.nc"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            contact@eazyweb.nc
          </a>
        </div>
      </div>
    </div>
  )
}
