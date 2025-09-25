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
    const { booking_id, rating, text } = body

    // Validate required fields
    if (!booking_id || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Check if booking exists and user has access
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        listings(
          host_id,
          title
        )
      `)
      .eq('id', booking_id)
      .eq('renter_id', user.id)
      .eq('status', 'completed')
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ 
        error: 'Booking not found or you cannot review this booking' 
      }, { status: 404 })
    }

    // Check if review already exists
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('booking_id', booking_id)
      .single()

    if (existingReview) {
      return NextResponse.json({ 
        error: 'Review already exists for this booking' 
      }, { status: 400 })
    }

    // Create review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        booking_id,
        reviewer_id: user.id,
        reviewee_id: booking.listings.host_id,
        rating,
        text: text || null
      })
      .select(`
        *,
        reviewer:users!reviews_reviewer_id_fkey(
          id,
          name
        )
      `)
      .single()

    if (error) {
      console.error('Error creating review:', error)
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
    }

    return NextResponse.json({ review }, { status: 201 })

  } catch (error) {
    console.error('Error in create review API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const supabase = createClient()
  
  try {
    const { searchParams } = new URL(request.url)
    const listing_id = searchParams.get('listing_id')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    if (!listing_id) {
      return NextResponse.json({ error: 'listing_id is required' }, { status: 400 })
    }

    let query = supabase
      .from('reviews')
      .select(`
        *,
        reviewer:users!reviews_reviewer_id_fkey(
          id,
          name
        ),
        bookings(
          id,
          start_ts,
          end_ts,
          guests
        )
      `)
      .eq('bookings.listing_id', listing_id)
      .order('created_at', { ascending: false })

    query = query.range(offset, offset + limit - 1)

    const { data: reviews, error } = await query

    if (error) {
      console.error('Error fetching reviews:', error)
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }

    // Calculate average rating
    const { data: stats } = await supabase
      .from('reviews')
      .select('rating')
      .eq('bookings.listing_id', listing_id)

    const avgRating = stats?.length ? 
      stats.reduce((sum, r) => sum + r.rating, 0) / stats.length : 0

    return NextResponse.json({
      reviews: reviews || [],
      stats: {
        average: Math.round(avgRating * 10) / 10,
        total: stats?.length || 0
      },
      pagination: {
        page,
        limit,
        hasMore: reviews?.length === limit
      }
    })

  } catch (error) {
    console.error('Error in get reviews API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
