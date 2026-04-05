export type Plan = 'free' | 'pro' | 'scale'

export type ImageFormat = 'png' | 'jpeg' | 'webp'

export type TemplateCategory =
  | 'blog'
  | 'product'
  | 'event'
  | 'tutorial'
  | 'social'
  | 'marketing'
  | 'minimal'
  | 'creative'

// ---------------------------------------------------------------------------
// Database row types
// ---------------------------------------------------------------------------

export interface OGUser {
  id: string
  auth_id: string
  email: string
  name: string | null
  plan: Plan
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  images_this_month: number
  api_key: string | null
  created_at: string
  updated_at: string
}

export interface OGTemplate {
  id: string
  name: string
  slug: string
  category: TemplateCategory
  thumbnail_url: string | null
  width: number
  height: number
  layers: TemplateLayer[]
  is_premium: boolean
  sort_order: number
  created_at: string
}

export interface OGImage {
  id: string
  user_id: string
  template_id: string | null
  title: string
  settings: ImageSettings
  image_url: string | null
  format: ImageFormat
  width: number
  height: number
  created_at: string
}

export interface OGApiKey {
  id: string
  user_id: string
  key_hash: string
  name: string
  last_used_at: string | null
  created_at: string
}

// ---------------------------------------------------------------------------
// Template layer structure
// ---------------------------------------------------------------------------

export type TemplateLayer =
  | BackgroundLayer
  | TextLayer
  | ShapeLayer
  | ImageLayer

export interface BackgroundLayer {
  type: 'background'
  color?: string
  gradient?: string
  image_url?: string
}

export interface TextLayer {
  type: 'text'
  key: string
  label: string
  default_value: string
  x: number
  y: number
  font_size: number
  font_weight: string
  color: string
  max_width?: number
  align?: 'left' | 'center' | 'right'
}

export interface ShapeLayer {
  type: 'shape'
  shape: 'rect' | 'circle' | 'line'
  x: number
  y: number
  width: number
  height: number
  color: string
  opacity?: number
  border_radius?: number
}

export interface ImageLayer {
  type: 'image'
  key: string
  label: string
  x: number
  y: number
  width: number
  height: number
  default_url?: string
}

// ---------------------------------------------------------------------------
// Image generation settings
// ---------------------------------------------------------------------------

export interface ImageSettings {
  texts: Record<string, string>
  colors?: Record<string, string>
  images?: Record<string, string>
  font?: string
}

// ---------------------------------------------------------------------------
// Pricing / plan metadata
// ---------------------------------------------------------------------------

export interface PlanLimits {
  images_per_month: number | 'unlimited'
  premium_templates: boolean
  api_access: boolean
  custom_fonts: boolean
  no_watermark: boolean
  priority_rendering: boolean
}

export interface PricingPlan {
  id: Plan
  name: string
  description: string
  price_monthly: number
  stripe_price_id: string
  features: string[]
  limits: PlanLimits
  is_popular: boolean
}
