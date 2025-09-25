import { createClient } from '@/lib/auth'
import { createPaymentIntent } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createClient()
  
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { payment_method_id } = body

    // Get the booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        listings(
          host_id,
          title
        ),
        users!bookings_renter_id_fkey(
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if user is the renter
    if (booking.renter_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if booking is in a valid state for payment
    if (!['pending', 'authorized'].includes(booking.status)) {
      return NextResponse.json({ 
        error: `Booking cannot be paid (status: ${booking.status})` 
      }, { status: 400 })
    }

    // Get host's Stripe Connect account
    const { data: host, error: hostError } = await supabase
      .from('hosts')
      .select('stripe_connect_account_id')
      .eq('user_id', booking.listings.host_id)
      .single()

    if (hostError || !host?.stripe_connect_account_id) {
      return NextResponse.json({ 
        error: 'Host has not set up payment processing' 
      }, { status: 400 })
    }

    // Create or update payment intent
    try {
      const paymentIntent = await createPaymentIntent(
        booking.total_cents,
        'eur',
        host.stripe_connect_account_id,
        {
          booking_id: booking.id,
          listing_id: booking.listing_id,
          renter_id: booking.renter_id,
          host_id: booking.listings.host_id
        }
      )

      // Update booking with payment intent
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'authorized' // Will be confirmed when payment succeeds
        })
        .eq('id', booking.id)

      if (updateError) {
        console.error('Error updating booking:', updateError)
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
      }

      // Create payment record
      await supabase
        .from('booking_payments')
        .upsert({
          booking_id: booking.id,
          stripe_payment_intent_id: paymentIntent.paymentIntentId,
          application_fee_cents: paymentIntent.applicationFeeAmount,
          transfer_destination: host.stripe_connect_account_id,
          status: 'pending'
        })

      return NextResponse.json({
        client_secret: paymentIntent.clientSecret,
        payment_intent_id: paymentIntent.paymentIntentId
      })

    } catch (stripeError) {
      console.error('Stripe error:', stripeError)
      return NextResponse.json({ 
        error: 'Payment processing failed' 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error in payment API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
