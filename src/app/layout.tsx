import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OGMagic — AI-Powered OG Image & Social Banner Generator',
  description:
    'Generate stunning OG images and social banners in seconds. 30+ templates, AI-powered customization, and a powerful API. Free to start.',
  keywords: [
    'og image generator',
    'social media preview',
    'open graph creator',
    'social banner generator',
    'og image API',
    'meta image generator',
    'dynamic OG images API',
    'social media banner tool',
    'open graph image maker',
    'automated social preview',
    'og image generator free',
  ],
  authors: [{ name: 'EazyWebNC', url: 'https://eazyweb.nc' }],
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  metadataBase: new URL('https://ogmagic.eazyweb.nc'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OGMagic — AI-Powered OG Image Generator',
    description: 'Generate stunning OG images and social banners in seconds.',
    url: 'https://ogmagic.eazyweb.nc',
    siteName: 'OGMagic',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, type: 'image/webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OGMagic — AI-Powered OG Image Generator',
    description: 'Generate stunning OG images and social banners in seconds.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'OGMagic',
      url: 'https://ogmagic.eazyweb.nc',
      publisher: {
        '@type': 'Organization',
        name: 'EazyWebNC',
        url: 'https://eazyweb.nc',
        logo: { '@type': 'ImageObject', url: 'https://eazyweb.nc/logo.png' },
        sameAs: [
          'https://www.facebook.com/eazywebnc',
          'https://www.linkedin.com/company/eazywebnc',
          'https://x.com/eazywebnc',
        ],
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OGMagic',
      applicationCategory: 'DesignApplication',
      applicationSubCategory: 'Image Generation',
      operatingSystem: 'Web',
      url: 'https://ogmagic.eazyweb.nc',
      description:
        'Generate stunning OG images and social banners in seconds. 30+ templates, AI-powered customization, and a powerful API.',
      featureList:
        'AI image generation, 30+ templates, Dynamic OG images API, Social media banners, Custom branding, Batch generation',
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '0',
        highPrice: '49',
        priceCurrency: 'USD',
        offerCount: '3',
      },
      creator: {
        '@type': 'Organization',
        name: 'EazyWebNC',
        url: 'https://eazyweb.nc',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OGMagic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OGMagic is an AI-powered OG image and social banner generator. Create beautiful social media preview images for your website, blog posts, and social media content in seconds.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is OGMagic free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! OGMagic offers a free plan with access to templates and basic generation. Upgrade for more templates, API access, and higher resolution exports.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does OGMagic have an API?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, OGMagic provides a powerful API for automated OG image generation. Integrate it into your CMS, blog platform, or CI/CD pipeline for automatic social previews.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <main id="main-content" role="main" aria-label="Main content">
          {children}
        </main>
      </body>
    </html>
  )
}
