import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createClient()
  
  try {
    const { data: listing, error } = await supabase
      .from('listings')
      .select(`
        *,
        listing_photos(url, sort),
        users!listings_host_id_fkey(
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .eq('status', 'listed')
      .single()

    if (error) {
      console.error('Error fetching listing:', error)
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Transform the data
    const transformedListing = {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      price: listing.price_amount,
      priceUnit: listing.price_unit,
      capacity: listing.capacity,
      amenities: listing.amenities || [],
      address: listing.address,
      city: listing.city,
      country: listing.country,
      location: `${listing.city}, ${listing.country}`,
      coordinates: listing.geo ? [listing.geo.coordinates[0], listing.geo.coordinates[1]] : null,
      instantBook: listing.instant_book,
      rating: listing.rating_avg || 0,
      reviews: listing.rating_count || 0,
      images: listing.listing_photos?.map((photo: { url: string; sort: number }) => photo.url).sort((a: string, b: string) => a.localeCompare(b)) || [],
      host: {
        id: listing.users.id,
        name: listing.users.name || 'Host',
        email: listing.users.email
      },
      policies: {
        checkIn: '9:00 AM',
        checkOut: '6:00 PM',
        cancellation: 'Flexible'
      }
    }

    return NextResponse.json({ listing: transformedListing })

  } catch (error) {
    console.error('Error in listing detail API:', error)
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
    
    // Check if user owns this listing
    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('host_id')
      .eq('id', id)
      .single()

    if (fetchError || listing.host_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: updatedListing, error } = await supabase
      .from('listings')
      .update({
        title: body.title,
        description: body.description,
        price_amount: body.price_amount,
        price_unit: body.price_unit,
        capacity: body.capacity,
        amenities: body.amenities,
        address: body.address,
        city: body.city,
        country: body.country,
        timezone: body.timezone,
        geo: body.coordinates ? {
          type: 'Point',
          coordinates: body.coordinates
        } : null,
        instant_book: body.instant_book,
        status: body.status
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating listing:', error)
      return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 })
    }

    return NextResponse.json({ listing: updatedListing })

  } catch (error) {
    console.error('Error in update listing API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
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

    // Check if user owns this listing or is admin
    const { data: userProfile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userProfile?.role !== 'admin') {
      const { data: listing } = await supabase
        .from('listings')
        .select('host_id')
        .eq('id', id)
        .single()

      if (listing?.host_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting listing:', error)
      return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Listing deleted successfully' })

  } catch (error) {
    console.error('Error in delete listing API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
