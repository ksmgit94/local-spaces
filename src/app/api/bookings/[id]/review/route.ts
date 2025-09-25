import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
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

    // Get booking details
    const { data: booking, error: bookingError } = await supabase
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
      .eq('id', id)
      .eq('renter_id', user.id)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return NextResponse.json({ 
        error: 'Can only review completed bookings' 
      }, { status: 400 })
    }

    // Check if review already exists
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('*')
      .eq('booking_id', id)
      .single()

    return NextResponse.json({
      booking,
      existingReview: existingReview || null,
      canReview: !existingReview && booking.status === 'completed'
    })

  } catch (error) {
    console.error('Error in get review page API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
