import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { createClient } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    const event = constructWebhookEvent(body, signature)
    const supabase = createClient()

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as unknown as Record<string, unknown>, supabase)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as unknown as Record<string, unknown>, supabase)
        break
      
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as unknown as Record<string, unknown>, supabase)
        break
      
      case 'account.updated':
        await handleAccountUpdated(event.data.object as unknown as Record<string, unknown>, supabase)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function handlePaymentSucceeded(paymentIntent: Record<string, unknown>, supabase: ReturnType<typeof createClient>) {
  const bookingId = (paymentIntent.metadata as Record<string, unknown>)?.booking_id
  
  if (!bookingId) {
    console.error('No booking_id in payment intent metadata')
    return
  }

  // Update booking status
  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
    })
    .eq('id', bookingId)

  if (error) {
    console.error('Error updating booking status:', error)
    return
  }

  // Create or update payment record
  await supabase
    .from('booking_payments')
    .upsert({
      booking_id: bookingId,
      stripe_payment_intent_id: paymentIntent.id,
      stripe_charge_id: paymentIntent.latest_charge,
      application_fee_cents: paymentIntent.application_fee_amount,
      transfer_destination: (paymentIntent.transfer_data as Record<string, unknown>)?.destination,
      status: 'succeeded',
    })

  // Log webhook event
  await supabase
    .from('webhook_events')
    .insert({
      provider: 'stripe',
      event_type: 'payment_intent.succeeded',
      payload: paymentIntent,
    })

  console.log(`Payment succeeded for booking ${bookingId}`)
}

async function handlePaymentFailed(paymentIntent: Record<string, unknown>, supabase: ReturnType<typeof createClient>) {
  const bookingId = (paymentIntent.metadata as Record<string, unknown>)?.booking_id
  
  if (!bookingId) {
    console.error('No booking_id in payment intent metadata')
    return
  }

  // Update booking status
  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'canceled',
    })
    .eq('id', bookingId)

  if (error) {
    console.error('Error updating booking status:', error)
    return
  }

  // Log webhook event
  await supabase
    .from('webhook_events')
    .insert({
      provider: 'stripe',
      event_type: 'payment_intent.payment_failed',
      payload: paymentIntent,
    })

  console.log(`Payment failed for booking ${bookingId}`)
}

async function handleChargeRefunded(charge: Record<string, unknown>, supabase: ReturnType<typeof createClient>) {
  const paymentIntentId = charge.payment_intent
  
  if (!paymentIntentId) {
    console.error('No payment_intent in charge')
    return
  }

  // Find the booking by payment intent
  const { data: payment, error: paymentError } = await supabase
    .from('booking_payments')
    .select('booking_id')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .single()

  if (paymentError || !payment) {
    console.error('Payment record not found for refund:', paymentIntentId)
    return
  }

  // Update booking status to refunded
  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'refunded',
    })
    .eq('id', payment.booking_id)

  if (error) {
    console.error('Error updating booking status for refund:', error)
    return
  }

  // Log webhook event
  await supabase
    .from('webhook_events')
    .insert({
      provider: 'stripe',
      event_type: 'charge.refunded',
      payload: charge,
    })

  console.log(`Charge refunded for booking ${payment.booking_id}`)
}

async function handleAccountUpdated(account: Record<string, unknown>, supabase: ReturnType<typeof createClient>) {
  // Update host's Stripe account status
  const { error } = await supabase
    .from('hosts')
    .update({
      verification_status: account.charges_enabled ? 'verified' : 'pending',
      payout_status: account.payouts_enabled ? 'enabled' : 'disabled',
    })
    .eq('stripe_connect_account_id', account.id)

  if (error) {
    console.error('Error updating host account status:', error)
    return
  }

  // Log webhook event
  await supabase
    .from('webhook_events')
    .insert({
      provider: 'stripe',
      event_type: 'account.updated',
      payload: account,
    })

  console.log(`Account updated for ${account.id}`)
}
