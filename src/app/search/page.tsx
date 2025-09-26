'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, MapPin, Filter, Star, Heart, Users } from 'lucide-react'
import MapboxMap from '@/components/map/mapbox-map'
import { ListingGrid } from '@/components/listing/ListingGrid'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface Listing {
  id: string
  title: string
  description: string
  price: number
  rating: number
  reviews: number
  location: string
  coordinates: [number, number]
  image: string
  instantBook: boolean
  capacity: number
  amenities: string[]
}

function SearchContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [guests, setGuests] = useState(searchParams.get('guests') || '1')
  const [checkin, setCheckin] = useState(searchParams.get('checkin') || '')
  const [checkout, setCheckout] = useState(searchParams.get('checkout') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState<[number, number]>([12.5683, 55.6761])
  const [mapZoom, setMapZoom] = useState(12)

  // Fetch real data from API with fallback to mock data
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchQuery) params.set('text', searchQuery)
        if (location) params.set('location', location)
        if (guests) params.set('capacity', guests)
        if (checkin) params.set('checkin', checkin)
        if (checkout) params.set('checkout', checkout)
        
        const response = await fetch(`/api/listings?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch listings')
        }
        
        const data = await response.json()
        
        // Transform API data to match our interface
        const transformedListings: Listing[] = data.listings?.map((listing: any) => ({
          id: listing.id,
          title: listing.title,
          description: listing.description || '',
          price: listing.price_amount,
          rating: listing.rating_avg || 0,
          reviews: listing.rating_count || 0,
          location: `${listing.city}, ${listing.country}`,
          coordinates: listing.geo ? [listing.geo.coordinates[0], listing.geo.coordinates[1]] : [0, 0],
          image: listing.listing_photos?.[0]?.url || '/api/placeholder/400/300',
          instantBook: listing.instant_book,
          capacity: listing.capacity,
          amenities: listing.amenities || []
        })) || []
        
        setListings(transformedListings)
      } catch (error) {
        console.error('Error fetching listings:', error)
        // Fallback to mock data when API fails
        const mockListings: Listing[] = [
          {
            id: '1',
            title: 'Modern Conference Room in Downtown',
            description: 'Perfect for business meetings with modern amenities',
            price: 45,
            rating: 4.9,
            reviews: 127,
            location: 'Copenhagen, Denmark',
            coordinates: [12.5683, 55.6761],
            image: '/images/photostudios/2083fbe6dc030f224d9634513073793252711562.png',
            instantBook: true,
            capacity: 12,
            amenities: ['WiFi', 'Projector', 'Whiteboard', 'Coffee']
          },
          {
            id: '2',
            title: 'Creative Photography Studio',
            description: 'Professional studio with natural light and equipment',
            price: 65,
            rating: 4.8,
            reviews: 89,
            location: 'Aarhus, Denmark',
            coordinates: [10.2039, 56.1572],
            image: '/images/photostudios/689da4915f5a961d7fde59fd5c2088cd43895ab2.png',
            instantBook: false,
            capacity: 8,
            amenities: ['WiFi', 'Photography Equipment', 'Changing Room', 'Parking']
          },
          {
            id: '3',
            title: 'Elegant Event Venue with Garden',
            description: 'Beautiful venue perfect for weddings and celebrations',
            price: 150,
            rating: 4.9,
            reviews: 203,
            location: 'Odense, Denmark',
            coordinates: [10.4024, 55.4038],
            image: '/images/photostudios/79d5f710f747bf7bcc951f0a55348d500cb92049.png',
            instantBook: true,
            capacity: 50,
            amenities: ['WiFi', 'Sound System', 'Garden', 'Parking', 'Kitchen']
          },
          {
            id: '4',
            title: 'Co-working Space - Private Office',
            description: 'Quiet private office in modern co-working space',
            price: 35,
            rating: 4.7,
            reviews: 156,
            location: 'Aalborg, Denmark',
            coordinates: [9.9217, 57.0488],
            image: '/images/photostudios/9d6428d71a04a212d3425f0ad9dac0d21cde4e33.png',
            instantBook: true,
            capacity: 4,
            amenities: ['WiFi', 'Printer', 'Coffee', 'Reception']
          },
          {
            id: '5',
            title: 'Art Gallery Event Space',
            description: 'Unique gallery space for exhibitions and events',
            price: 85,
            rating: 4.6,
            reviews: 94,
            location: 'Copenhagen, Denmark',
            coordinates: [12.5719, 55.6759],
            image: '/images/photostudios/9f2ccc682b3eb2b90162328bc521d584cd769cc7.png',
            instantBook: false,
            capacity: 30,
            amenities: ['WiFi', 'Lighting', 'Security', 'Parking']
          },
          {
            id: '6',
            title: 'Industrial Loft for Events',
            description: 'Spacious industrial loft perfect for large gatherings',
            price: 120,
            rating: 4.8,
            reviews: 67,
            location: 'Aarhus, Denmark',
            coordinates: [10.2039, 56.1572],
            image: '/images/photostudios/a813a406f6410ce1c05b65426496482113ebe50d.png',
            instantBook: true,
            capacity: 40,
            amenities: ['WiFi', 'Sound System', 'Kitchen', 'Parking']
          },
          {
            id: '7',
            title: 'Modern Meeting Room',
            description: 'Professional meeting room with video conferencing',
            price: 55,
            rating: 4.9,
            reviews: 134,
            location: 'Copenhagen, Denmark',
            coordinates: [12.5683, 55.6761],
            image: '/images/photostudios/ec18898850b581c9cfef6c22da3ccd5ff291b9a4.png',
            instantBook: true,
            capacity: 10,
            amenities: ['WiFi', 'Video Conferencing', 'Whiteboard', 'Coffee']
          }
        ]
        setListings(mockListings)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [searchQuery, location, guests, checkin, checkout])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (location) params.set('location', location)
    if (guests) params.set('guests', guests)
    if (checkin) params.set('checkin', checkin)
    if (checkout) params.set('checkout', checkout)
    
    // Update URL without page reload
    window.history.pushState({}, '', `/search?${params.toString()}`)
    
    // The useEffect will automatically trigger a new search
  }

  const handleListingClick = (listingId: string) => {
    // Scroll to listing in list view or highlight it
    const element = document.getElementById(`listing-${listingId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleMapMove = (center: [number, number], zoom: number) => {
    setMapCenter(center)
    setMapZoom(zoom)
    // In a real app, this would trigger a new search for listings in the visible area
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
           <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
             <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex flex-col md:flex-row gap-2 items-center hover:shadow-xl transition-shadow">
               <div className="flex-1 flex items-center px-4 py-3 rounded-full hover:bg-[#F8DEFF] transition-colors">
                 <Search className="w-5 h-5 text-gray-500 mr-3" />
                 <input 
                   type="text" 
                   placeholder="What are you looking for?" 
                   className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-500"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <div className="flex-1 flex items-center px-4 py-3 rounded-full hover:bg-[#F8DEFF] transition-colors">
                 <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                 <input 
                   type="text" 
                   placeholder="Where?" 
                   className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-500"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                 />
               </div>
               <div className="flex items-center px-4 py-3 rounded-full hover:bg-[#F8DEFF] transition-colors">
                 <Users className="w-5 h-5 text-gray-500 mr-3" />
                 <select 
                   className="bg-transparent outline-none text-lg"
                   value={guests}
                   onChange={(e) => setGuests(e.target.value)}
                 >
                   <option value="1">1 guest</option>
                   <option value="2">2 guests</option>
                   <option value="3">3 guests</option>
                   <option value="4">4 guests</option>
                   <option value="5+">5+ guests</option>
                 </select>
               </div>
               <button 
                 type="submit" 
                 className="bg-[#EFADFF] hover:bg-[#D298E0] text-white rounded-full w-14 h-14 flex items-center justify-center transition-colors border-0 outline-none shadow-md hover:shadow-lg"
               >
                 <Search className="w-6 h-6" />
               </button>
             </div>
           </form>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-headline text-text-primary tracking-subheadline">
              {listings.length} spaces found
            </h1>
            <p className="text-[#6F6470]">
              {location ? `in ${location}` : 'in Denmark'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#F8DEFF] transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium ${
                  viewMode === 'list' 
                    ? 'bg-[#EFADFF] text-white' 
                    : 'bg-white text-[#6F6470] hover:bg-[#F8DEFF]'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 text-sm font-medium ${
                  viewMode === 'map' 
                    ? 'bg-[#EFADFF] text-white' 
                    : 'bg-white text-[#6F6470] hover:bg-[#F8DEFF]'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#484149] mb-2">
                    Price range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input placeholder="Min" className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm" />
                    <span className="text-gray-500">-</span>
                    <input placeholder="Max" className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#484149] mb-2">
                    Capacity
                  </label>
                  <select className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm">
                    <option>Any capacity</option>
                    <option>1-5 people</option>
                    <option>6-15 people</option>
                    <option>16-30 people</option>
                    <option>30+ people</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#484149] mb-2">
                    Amenities
                  </label>
                  <select className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm">
                    <option>All amenities</option>
                    <option>WiFi</option>
                    <option>Parking</option>
                    <option>Projector</option>
                    <option>Kitchen</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#484149] mb-2">
                    Instant Book
                  </label>
                  <select className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm">
                    <option>Any</option>
                    <option>Instant Book only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-[#6F6470]">Loading spaces...</div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="pb-16">
            <ListingGrid 
              listings={listings} 
              loading={loading}
              onFavorite={(listingId) => {
                // TODO: Implement favorite functionality
                console.log('Favorite clicked:', listingId)
              }}
            />
          </div>
        ) : (
          <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
            <MapboxMap
              center={mapCenter}
              zoom={mapZoom}
              listings={listings.map(listing => ({
                id: listing.id,
                title: listing.title,
                price: listing.price,
                rating: listing.rating,
                coordinates: listing.coordinates
              }))}
              onListingClick={handleListingClick}
              onMove={handleMapMove}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
