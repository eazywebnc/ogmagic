import type { PricingPlan, TemplateCategory } from '@/lib/types'

export const APP_NAME = 'OGMagic'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://ogmagic.eazyweb.nc'
export const SUPPORT_EMAIL = 'support@ogmagic.eazyweb.nc'

export const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out OG image generation.',
    price_monthly: 0,
    stripe_price_id: '',
    is_popular: false,
    limits: {
      images_per_month: 50,
      premium_templates: false,
      api_access: false,
      custom_fonts: false,
      no_watermark: false,
      priority_rendering: false,
    },
    features: [
      '50 images per month',
      '10 starter templates',
      'PNG & JPEG export',
      '1200x630 OG format',
      'Basic customization',
      'OGMagic watermark',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For developers and content creators who ship fast.',
    price_monthly: 12,
    stripe_price_id: 'price_ogmagic_pro',
    is_popular: true,
    limits: {
      images_per_month: 500,
      premium_templates: true,
      api_access: true,
      custom_fonts: true,
      no_watermark: true,
      priority_rendering: false,
    },
    features: [
      '500 images per month',
      'All 30+ templates',
      'API access with key',
      'PNG, JPEG & WebP export',
      'Custom fonts & colors',
      'No watermark',
      'Multiple sizes',
      'Priority support',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For teams and agencies with high-volume needs.',
    price_monthly: 29,
    stripe_price_id: 'price_ogmagic_scale',
    is_popular: false,
    limits: {
      images_per_month: 'unlimited',
      premium_templates: true,
      api_access: true,
      custom_fonts: true,
      no_watermark: true,
      priority_rendering: true,
    },
    features: [
      'Unlimited images',
      'Everything in Pro',
      'Priority rendering',
      'Bulk generation API',
      'Custom template builder',
      'Webhook notifications',
      'Team collaboration',
      'Dedicated support',
    ],
  },
]

export const PLAN_MAP = Object.fromEntries(PLANS.map((p) => [p.id, p])) as Record<
  string,
  PricingPlan
>

export const TEMPLATE_CATEGORIES: { value: TemplateCategory; label: string }[] = [
  { value: 'blog', label: 'Blog & Articles' },
  { value: 'product', label: 'Product Launch' },
  { value: 'event', label: 'Events' },
  { value: 'tutorial', label: 'Tutorials & Guides' },
  { value: 'social', label: 'Social Media' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'creative', label: 'Creative' },
]

export const FONTS = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Playfair Display',
  'Space Grotesk',
  'JetBrains Mono',
  'DM Sans',
] as const

export const IMAGE_SIZES = [
  { label: 'OG Image (1200x630)', width: 1200, height: 630 },
  { label: 'Twitter Card (1200x628)', width: 1200, height: 628 },
  { label: 'Facebook Post (1200x630)', width: 1200, height: 630 },
  { label: 'LinkedIn Post (1200x627)', width: 1200, height: 627 },
  { label: 'Instagram Square (1080x1080)', width: 1080, height: 1080 },
  { label: 'YouTube Thumbnail (1280x720)', width: 1280, height: 720 },
] as const
