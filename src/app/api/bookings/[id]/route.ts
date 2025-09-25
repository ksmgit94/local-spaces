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

    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        listings(
          id,
          title,
          description,
          address,
          city,
          country,
          instant_book,
          listing_photos(url, sort)
        ),
        users!bookings_renter_id_fkey(
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching booking:', error)
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if user has access to this booking
    const { data: listing } = await supabase
      .from('listings')
      .select('host_id')
      .eq('id', booking.listing_id)
      .single()

    if (booking.renter_id !== user.id && listing?.host_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ booking })

  } catch (error) {
    console.error('Error in get booking API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
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
    const { status, reason } = body

    // Get the booking to check permissions
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select(`
        *,
        listings(
          host_id
        )
      `)
      .eq('id', id)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if user has permission to update this booking
    const isHost = booking.listings.host_id === user.id
    const isRenter = booking.renter_id === user.id

    if (!isHost && !isRenter) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      'pending': ['canceled'],
      'awaiting_host': ['confirmed', 'canceled'],
      'authorized': ['confirmed', 'canceled'],
      'confirmed': ['completed', 'canceled'],
      'completed': [], // Final state
      'canceled': [], // Final state
      'refunded': [], // Final state
      'disputed': [] // Final state
    }

    if (!validTransitions[booking.status]?.includes(status)) {
      return NextResponse.json({ 
        error: `Invalid status transition from ${booking.status} to ${status}` 
      }, { status: 400 })
    }

    // Host-specific actions
    if (status === 'confirmed' && !isHost) {
      return NextResponse.json({ error: 'Only hosts can confirm bookings' }, { status: 403 })
    }

    // Update booking
    const { data: updatedBooking, error: updateError } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating booking:', updateError)
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
    }

    // Log the action
    await supabase
      .from('audit_log')
      .insert({
        actor_id: user.id,
        action: `booking_${status}`,
        target_type: 'booking',
        target_id: id,
        metadata: { reason, previous_status: booking.status }
      })

    return NextResponse.json({ booking: updatedBooking })

  } catch (error) {
    console.error('Error in update booking API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
