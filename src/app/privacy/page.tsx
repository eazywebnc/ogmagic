import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — OGMagic',
  description:
    'OGMagic privacy policy. Learn how we collect, use, and protect your data when using the OG image generator.',
  metadataBase: new URL('https://ogmagic.eazyweb.nc'),
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      '**Account data:** Your email address and display name, collected via Supabase Auth when you register or use a social login provider.',
      '**Generated images:** OG images you create — including your input text, layout choices, template selections, and brand colours — are stored in Supabase Storage.',
      '**API usage data:** When you use the OGMagic API, we log your API key identifier, endpoint calls, and generation parameters for billing and rate-limiting purposes.',
      '**Usage analytics:** Anonymised metrics on feature usage, template popularity, and session behaviour. No personally identifiable information is included.',
      '**Technical data:** IP address, browser type, device, and referral source collected automatically.',
    ],
  },
  {
    title: '2. How We Use Your Data',
    content: [
      'To generate, store, and serve your OG images via CDN.',
      'To authenticate you and maintain a secure session.',
      'To enforce API rate limits and calculate usage for billing on paid plans.',
      'To send transactional emails (image export links, API key notifications). You may opt out of marketing emails at any time.',
      'To improve templates and features based on aggregated, anonymised usage patterns.',
    ],
  },
  {
    title: '3. Data Storage & Security',
    content: [
      'All metadata and account data is stored in Supabase (PostgreSQL) on secure cloud infrastructure. Data is encrypted at rest and in transit via TLS/HTTPS.',
      'Generated images are stored in Supabase Storage and served via Cloudflare CDN with signed URLs where applicable.',
      'Row-level security (RLS) policies ensure each user can only access their own images and settings.',
      'We retain your data for as long as your account is active. You may request deletion at any time.',
    ],
  },
  {
    title: '4. Cookies',
    content: [
      '**Authentication cookies:** Secure, HTTP-only cookies to maintain your login session via Supabase Auth.',
      '**Preference cookies:** UI settings (template defaults, colour preferences) stored in localStorage.',
      '**Analytics cookies:** Privacy-respecting analytics that do not track individuals across sites.',
      'Disabling cookies may prevent you from logging in or retaining your preferences.',
    ],
  },
  {
    title: '5. API & Third-Party Integrations',
    content: [
      'The OGMagic API allows third-party applications to generate OG images programmatically using your API key.',
      'API keys are hashed before storage. Treat your API key like a password — do not expose it in client-side code.',
      'OG images served via CDN URLs may be publicly accessible if shared. Do not include sensitive information in image content.',
      'Other subprocessors: Supabase (database & storage), Cloudflare (CDN & edge), Stripe (payments).',
    ],
  },
  {
    title: '6. Your Rights (GDPR & Privacy)',
    content: [
      '**Access:** Request a copy of all personal data we hold about you.',
      '**Rectification:** Correct inaccurate personal data.',
      '**Erasure:** Request deletion of your account and all generated images.',
      '**Portability:** Download all your images from your dashboard at any time.',
      '**Objection:** Object to processing based on legitimate interests.',
      'To exercise these rights, email contact@eazyweb.nc. We respond within 30 days.',
    ],
  },
  {
    title: '7. Image Content',
    content: [
      'You are responsible for the content of OG images you generate. Do not use OGMagic to create images containing illegal, defamatory, or infringing content.',
      'We do not review image content except in response to valid legal complaints or abuse reports.',
      'Publicly shared image URLs are accessible to anyone with the link. Use caution with sensitive content.',
    ],
  },
  {
    title: '8. Children\'s Privacy',
    content: [
      'OGMagic is not directed at children under 16. We do not knowingly collect data from minors.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    content: [
      'We may update this policy to reflect changes in our practices or legal requirements. We will notify you via email or in-app notice at least 14 days before material changes take effect.',
    ],
  },
  {
    title: '10. Contact',
    content: [
      'EazyWebNC — contact@eazyweb.nc',
      'Nouméa, New Caledonia',
      'eazyweb.nc',
    ],
  },
]

export default function PrivacyPage() {
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
          Privacy{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Policy
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          OGMagic is operated by EazyWebNC. This policy explains what data we
          collect, how we use it, and the rights you have over your information.
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
                  <li key={i} className="text-white/55 leading-relaxed text-sm">
                    {item.startsWith('**') ? (
                      <span>
                        <span className="font-semibold text-white/80">
                          {item.match(/\*\*(.*?)\*\*/)?.[1]}
                        </span>
                        {item.replace(/\*\*(.*?)\*\*/, '')}
                      </span>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/[0.07] to-violet-500/[0.07] border border-cyan-500/20 text-center">
          <p className="text-white/50 mb-4 text-sm">
            Questions about your data or privacy? We&apos;re happy to help.
          </p>
          <a
            href="mailto:contact@eazyweb.nc"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-medium text-sm hover:from-cyan-500 hover:to-violet-500 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
