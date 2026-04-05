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
  ],
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
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
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
      '@type': 'SoftwareApplication',
      name: 'OGMagic',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Web',
      url: 'https://ogmagic.eazyweb.nc',
      description:
        'Generate stunning OG images and social banners in seconds. 30+ templates, AI-powered customization, and a powerful API.',
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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
