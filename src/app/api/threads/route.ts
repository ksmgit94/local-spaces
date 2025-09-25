import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

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
    const offset = (page - 1) * limit

    // Get threads where user is either renter or host
    const { data: threads, error } = await supabase
      .from('threads')
      .select(`
        *,
        listings(
          id,
          title,
          address,
          city,
          country,
          listing_photos(url, sort)
        ),
        bookings(
          id,
          status,
          start_ts,
          end_ts
        ),
        renter:users!threads_renter_id_fkey(
          id,
          name,
          email
        ),
        host:users!threads_host_id_fkey(
          id,
          name,
          email
        ),
        messages(
          id,
          body,
          created_at,
          sender_id
        )
      `)
      .or(`renter_id.eq.${user.id},host_id.eq.${user.id}`)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching threads:', error)
      return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 })
    }

    // Transform the data
    const transformedThreads = threads?.map(thread => ({
      id: thread.id,
      listing: thread.listings,
      booking: thread.bookings,
      otherUser: user.id === thread.renter_id ? thread.host : thread.renter,
      lastMessage: thread.messages?.[0] || null,
      status: thread.status,
      unreadCount: 0 // TODO: Implement unread count logic
    })) || []

    return NextResponse.json({
      threads: transformedThreads,
      pagination: {
        page,
        limit,
        hasMore: threads?.length === limit
      }
    })

  } catch (error) {
    console.error('Error in get threads API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { listing_id, booking_id, other_user_id } = body

    // Validate required fields
    if (!other_user_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if thread already exists
    const { data: existingThread } = await supabase
      .from('threads')
      .select('*')
      .or(`and(renter_id.eq.${user.id},host_id.eq.${other_user_id}),and(renter_id.eq.${other_user_id},host_id.eq.${user.id})`)
      .single()

    if (existingThread) {
      return NextResponse.json({ thread: existingThread })
    }

    // Determine who is the renter and who is the host
    let renter_id = user.id
    let host_id = other_user_id

    // If user is a host, swap the roles
    const { data: userProfile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userProfile?.role === 'host') {
      renter_id = other_user_id
      host_id = user.id
    }

    // Create new thread
    const { data: thread, error } = await supabase
      .from('threads')
      .insert({
        listing_id: listing_id || null,
        booking_id: booking_id || null,
        renter_id,
        host_id,
        status: 'open'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating thread:', error)
      return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 })
    }

    return NextResponse.json({ thread }, { status: 201 })

  } catch (error) {
    console.error('Error in create thread API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
