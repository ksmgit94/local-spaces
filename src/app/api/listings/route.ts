import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  
  try {
    // Parse search parameters
    const bbox = searchParams.get('bbox')
    const text = searchParams.get('text')
    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')
    const capacity = searchParams.get('capacity')
    const instantBook = searchParams.get('instantBook')
    const amenities = searchParams.getAll('amenities[]')
    const dates = searchParams.get('dates')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    let query = supabase
      .from('listings')
      .select(`
        id,
        title,
        description,
        price_amount,
        price_unit,
        capacity,
        amenities,
        address,
        city,
        country,
        instant_book,
        rating_avg,
        rating_count,
        geo,
        listing_photos!inner(url, sort)
      `)
      .eq('status', 'listed')
      .order('created_at', { ascending: false })

    // Text search
    if (text) {
      query = query.textSearch('fts', text, {
        type: 'websearch',
        config: 'english'
      })
    }

    // Price range
    if (priceMin) {
      query = query.gte('price_amount', parseInt(priceMin))
    }
    if (priceMax) {
      query = query.lte('price_amount', parseInt(priceMax))
    }

    // Capacity
    if (capacity) {
      query = query.gte('capacity', parseInt(capacity))
    }

    // Instant book
    if (instantBook === 'true') {
      query = query.eq('instant_book', true)
    }

    // Amenities filter
    if (amenities.length > 0) {
      query = query.contains('amenities', amenities)
    }

    // Geographic bounding box
    // For now, skip geo filtering - will implement proper PostGIS queries later
    // if (bbox) {
    //   const [minLng, minLat, maxLng, maxLat] = bbox.split(',').map(Number)
    //   query = query.intersects('geo', {
    //     type: 'Polygon',
    //     coordinates: [[
    //       [minLng, minLat],
    //       [maxLng, minLat],
    //       [maxLng, maxLat],
    //       [minLng, maxLat],
    //       [minLng, minLat]
    //     ]]
    //   })
    // }

    // Date availability (check for conflicts)
    if (dates) {
      const [startDate, endDate] = dates.split(',')
      if (startDate && endDate) {
        // This would need a more complex query to check availability
        // For now, we'll just return all listings
      }
    }

    // Pagination
    query = query.range(offset, offset + limit - 1)

    const { data: listings, error } = await query

    if (error) {
      console.error('Error fetching listings:', error)
      return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 })
    }

    // Transform the data for the frontend
    const transformedListings = listings?.map(listing => ({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      price: listing.price_amount,
      priceUnit: listing.price_unit,
      capacity: listing.capacity,
      amenities: listing.amenities || [],
      location: `${listing.city}, ${listing.country}`,
      coordinates: listing.geo ? [listing.geo.coordinates[0], listing.geo.coordinates[1]] : null,
      instantBook: listing.instant_book,
      rating: listing.rating_avg || 0,
      reviews: listing.rating_count || 0,
      image: listing.listing_photos?.[0]?.url || null
    })) || []

    return NextResponse.json({
      listings: transformedListings,
      pagination: {
        page,
        limit,
        hasMore: listings?.length === limit
      }
    })

  } catch (error) {
    console.error('Error in listings API:', error)
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

    // Check if user is a host
    const { data: userProfile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userProfile?.role !== 'host' && userProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Host access required' }, { status: 403 })
    }

    const body = await request.json()
    
    const { data: listing, error } = await supabase
      .from('listings')
      .insert({
        host_id: user.id,
        title: body.title,
        description: body.description,
        price_amount: body.price_amount,
        price_unit: body.price_unit,
        capacity: body.capacity,
        amenities: body.amenities || [],
        address: body.address,
        city: body.city,
        country: body.country,
        timezone: body.timezone || 'UTC',
        geo: body.coordinates ? {
          type: 'Point',
          coordinates: body.coordinates
        } : null,
        instant_book: body.instant_book || false,
        status: 'draft'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating listing:', error)
      return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
    }

    return NextResponse.json({ listing }, { status: 201 })

  } catch (error) {
    console.error('Error in create listing API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
