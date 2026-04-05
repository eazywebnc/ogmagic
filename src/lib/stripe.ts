import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/server'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return _stripe
}

export async function getOrCreateStripeCustomer(authId: string): Promise<string> {
  const stripe = getStripe()
  const supabase = createAdminClient()

  const { data: user, error } = await supabase
    .from('og_users')
    .select('stripe_customer_id, email, name')
    .eq('auth_id', authId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch og_users for ${authId}: ${error.message}`)
  }

  if (user?.stripe_customer_id) {
    return user.stripe_customer_id
  }

  const customer = await stripe.customers.create({
    email: user?.email ?? undefined,
    name: user?.name ?? undefined,
    metadata: { supabase_user_id: authId },
  })

  const { error: updateError } = await supabase
    .from('og_users')
    .update({ stripe_customer_id: customer.id })
    .eq('auth_id', authId)

  if (updateError) {
    throw new Error(`Failed to save Stripe customer ID: ${updateError.message}`)
  }

  return customer.id
}
