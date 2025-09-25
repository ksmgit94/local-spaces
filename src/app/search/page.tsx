'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, MapPin, Filter, Star, Heart, Users } from 'lucide-react'
import MapboxMap from '@/components/map/mapbox-map'
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
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState<[number, number]>([12.5683, 55.6761])
  const [mapZoom, setMapZoom] = useState(12)

  // Mock data - replace with actual API call
  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
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
          image: '/api/placeholder/400/300',
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
          image: '/api/placeholder/400/300',
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
          image: '/api/placeholder/400/300',
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
          image: '/api/placeholder/400/300',
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
          image: '/api/placeholder/400/300',
          instantBook: false,
          capacity: 30,
          amenities: ['WiFi', 'Lighting', 'Security', 'Parking']
        }
      ]
      setListings(mockListings)
      setLoading(false)
    }, 1000)
  }, [searchQuery, location, guests])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Trigger new search
    setLoading(true)
    // In a real app, this would update the URL and trigger a new API call
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/spaces/${listing.id}`}>
                <div id={`listing-${listing.id}`} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500">Image placeholder</span>
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-shadow">
                      <Heart className="w-4 h-4 text-gray-500" />
                    </button>
                    {listing.instantBook && (
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Instant Book
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[#484149] line-clamp-2">
                        {listing.title}
                      </h3>
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-[#6F6470] ml-1">{listing.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-[#6F6470] text-sm mb-2">{listing.location}</p>
                    <p className="text-[#6F6470] text-sm mb-3 line-clamp-2">{listing.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold text-[#484149]">€{listing.price}</span>
                        <span className="text-[#6F6470] text-sm">/day</span>
                      </div>
                      <span className="text-[#6F6470] text-sm">({listing.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
