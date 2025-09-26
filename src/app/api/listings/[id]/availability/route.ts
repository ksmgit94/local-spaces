import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  
  try {
    const { id } = await params
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start and end dates are required' }, { status: 400 })
    }

    // Get listing details
    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .select('id, title, price_amount, instant_book')
      .eq('id', id)
      .eq('status', 'listed')
      .single()

    if (listingError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Check for existing bookings that overlap with the requested dates
    const { data: conflictingBookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('id, start_ts, end_ts, status')
      .eq('listing_id', id)
      .in('status', ['confirmed', 'authorized', 'awaiting_host'])
      .or(`and(start_ts.lte.${endDate},end_ts.gte.${startDate})`)

    if (bookingsError) {
      console.error('Error checking bookings:', bookingsError)
      return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
    }

    // Check availability rules
    const { data: availabilityRules, error: rulesError } = await supabase
      .from('availability_rules')
      .select('rule_type, rrule, timezone')
      .eq('listing_id', id)

    if (rulesError) {
      console.error('Error checking availability rules:', rulesError)
      return NextResponse.json({ error: 'Failed to check availability rules' }, { status: 500 })
    }

    // For now, we'll implement basic availability checking
    // In a full implementation, this would use the rrule library to check complex availability patterns
    const isAvailable = conflictingBookings?.length === 0

    // Calculate pricing
    const start = new Date(startDate)
    const end = new Date(endDate)
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const subtotal = listing.price_amount * nights
    const platformFee = Math.round(subtotal * 0.05)
    const taxes = Math.round(subtotal * 0.25) // 25% VAT
    const total = subtotal + platformFee + taxes

    return NextResponse.json({
      available: isAvailable,
      listing: {
        id: listing.id,
        title: listing.title,
        price_amount: listing.price_amount,
        instant_book: listing.instant_book
      },
      dates: {
        start: startDate,
        end: endDate,
        nights
      },
      pricing: {
        subtotal,
        platform_fee: platformFee,
        taxes,
        total
      },
      conflicting_bookings: conflictingBookings || [],
      availability_rules: availabilityRules || []
    })

  } catch (error) {
    console.error('Error in availability API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient()
  
  try {
    const { id } = await params
    const body = await request.json()
    const { start_date, end_date, guests, user_id } = body

    if (!start_date || !end_date || !guests || !user_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user || user.id !== user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // First check availability
    const availabilityResponse = await fetch(`${request.nextUrl.origin}/api/listings/${id}/availability?start=${start_date}&end=${end_date}`)
    const availabilityData = await availabilityResponse.json()

    if (!availabilityData.available) {
      return NextResponse.json({ error: 'Dates not available' }, { status: 409 })
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        listing_id: id,
        renter_id: user_id,
        start_ts: start_date,
        end_ts: end_date,
        guests,
        subtotal_cents: availabilityData.pricing.subtotal * 100,
        fees_platform_cents: availabilityData.pricing.platform_fee * 100,
        taxes_cents: availabilityData.pricing.taxes * 100,
        total_cents: availabilityData.pricing.total * 100,
        currency: 'EUR',
        policy_key: 'standard', // Default policy
        status: availabilityData.listing.instant_book ? 'confirmed' : 'awaiting_host'
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Error creating booking:', bookingError)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    return NextResponse.json({ 
      booking,
      availability: availabilityData
    })

  } catch (error) {
    console.error('Error in booking creation API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
