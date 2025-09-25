import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { listing_id, start_ts, end_ts, guests, policy_key } = body

    // Validate required fields
    if (!listing_id || !start_ts || !end_ts || !guests || !policy_key) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if listing exists and is available
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

    // Check availability using the database function
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

    // Determine booking status
    let status = 'pending'
    if (listing.instant_book) {
      status = 'authorized' // Will be confirmed after payment
    } else {
      status = 'awaiting_host' // Needs host approval
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        listing_id,
        renter_id: user.id,
        start_ts,
        end_ts,
        guests,
        status,
        subtotal_cents,
        fees_platform_cents,
        taxes_cents,
        total_cents,
        currency: 'EUR',
        policy_key
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Error creating booking:', bookingError)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    return NextResponse.json({ booking }, { status: 201 })

  } catch (error) {
    console.error('Error in create booking API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const supabase = createClient()
  
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    let query = supabase
      .from('bookings')
      .select(`
        *,
        listings(
          id,
          title,
          address,
          city,
          country,
          listing_photos(url, sort)
        )
      `)
      .or(`renter_id.eq.${user.id},listings.host_id.eq.${user.id}`)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    query = query.range(offset, offset + limit - 1)

    const { data: bookings, error } = await query

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    return NextResponse.json({
      bookings: bookings || [],
      pagination: {
        page,
        limit,
        hasMore: bookings?.length === limit
      }
    })

  } catch (error) {
    console.error('Error in get bookings API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
