import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  try {
    const body = await request.json()
    const { listing_id, start_ts, end_ts, guests } = body

    // Validate required fields
    if (!listing_id || !start_ts || !end_ts || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get listing details
    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .select('*')
      .eq('id', listing_id)
      .eq('status', 'listed')
      .single()

    if (listingError || !listing) {
      return NextResponse.json({ error: 'Listing not found or not available' }, { status: 404 })
    }

    // Check capacity
    if (guests > listing.capacity) {
      return NextResponse.json({ error: 'Guest count exceeds listing capacity' }, { status: 400 })
    }

    // Check availability
    const { data: isAvailable, error: availabilityError } = await supabase
      .rpc('check_booking_availability', {
        p_listing_id: listing_id,
        p_start_ts: start_ts,
        p_end_ts: end_ts
      })

    if (availabilityError || !isAvailable) {
      return NextResponse.json({ error: 'Space is not available for the selected dates' }, { status: 400 })
    }

    // Calculate pricing
    const startDate = new Date(start_ts)
    const endDate = new Date(end_ts)
    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    
    const subtotal_cents = listing.price_amount * durationDays * 100 // Convert to cents
    const fees_platform_cents = Math.round(subtotal_cents * 0.05) // 5% platform fee
    const taxes_cents = Math.round(subtotal_cents * 0.25) // 25% VAT (Denmark)
    const total_cents = subtotal_cents + fees_platform_cents + taxes_cents

    // Determine booking policy
    const policy = {
      key: 'flexible',
      name: 'Flexible',
      description: 'Free cancellation for 48 hours, then 50% refund up to 24 hours before check-in'
    }

    return NextResponse.json({
      quote: {
        listing_id,
        start_ts,
        end_ts,
        guests,
        duration_days: durationDays,
        subtotal_cents,
        fees_platform_cents,
        taxes_cents,
        total_cents,
        currency: 'EUR',
        policy,
        available: true
      }
    })

  } catch (error) {
    console.error('Error in booking quote API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
