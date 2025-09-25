'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MapPin, Star, Heart, Users, Wifi, Car, Coffee, Camera, Shield, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import MapboxMap from '@/components/map/mapbox-map'
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
  images: string[]
  instantBook: boolean
  capacity: number
  amenities: string[]
  host: {
    name: string
    avatar: string
    rating: number
    responseTime: string
  }
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
  }
}

export default function ListingDetailPage() {
  const params = useParams()
  const listingId = params.id as string
  
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedDates, setSelectedDates] = useState<{start: Date | null, end: Date | null}>({
    start: null,
    end: null
  })
  const [guests, setGuests] = useState(1)

  // Mock data - replace with actual API call
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const mockListing: Listing = {
        id: listingId,
        title: 'Modern Conference Room in Downtown Copenhagen',
        description: 'Perfect for business meetings with modern amenities and professional atmosphere. This spacious conference room offers state-of-the-art technology, comfortable seating for up to 12 people, and excellent natural lighting. Located in the heart of Copenhagen with easy access to public transportation.',
        price: 45,
        rating: 4.9,
        reviews: 127,
        location: 'Copenhagen, Denmark',
        coordinates: [12.5683, 55.6761],
        images: [
          '/api/placeholder/800/600',
          '/api/placeholder/800/600',
          '/api/placeholder/800/600',
          '/api/placeholder/800/600'
        ],
        instantBook: true,
        capacity: 12,
        amenities: ['WiFi', 'Projector', 'Whiteboard', 'Coffee', 'Parking'],
        host: {
          name: 'Maria Andersen',
          avatar: '/api/placeholder/50/50',
          rating: 4.8,
          responseTime: 'within an hour'
        },
        policies: {
          checkIn: '9:00 AM',
          checkOut: '6:00 PM',
          cancellation: 'Flexible'
        }
      }
      setListing(mockListing)
      setLoading(false)
    }, 1000)
  }, [listingId])

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-5 h-5" />
      case 'parking':
        return <Car className="w-5 h-5" />
      case 'coffee':
        return <Coffee className="w-5 h-5" />
      case 'photography equipment':
        return <Camera className="w-5 h-5" />
      case 'security':
        return <Shield className="w-5 h-5" />
      default:
        return <div className="w-5 h-5 bg-primary rounded-full" />
    }
  }

  const calculateTotal = () => {
    if (!listing || !selectedDates.start || !selectedDates.end) return 0
    
    const nights = Math.ceil((selectedDates.end.getTime() - selectedDates.start.getTime()) / (1000 * 60 * 60 * 24))
    const subtotal = listing.price * nights
    const platformFee = Math.round(subtotal * 0.05)
    const taxes = Math.round(subtotal * 0.25) // 25% VAT
    return subtotal + platformFee + taxes
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-textSecondary">Loading space details...</div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-textPrimary mb-2">Space not found</h1>
          <p className="text-textSecondary mb-4">The space you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/search">
            <Button>Browse all spaces</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Image Gallery */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="w-full h-full bg-backgroundAlt flex items-center justify-center">
          <span className="text-textSecondary">Image placeholder {currentImageIndex + 1}</span>
        </div>
        
        {/* Navigation arrows */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                prev === 0 ? listing.images.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                prev === listing.images.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {listing.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Favorite button */}
        <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
          <Heart className="w-5 h-5 text-textSecondary" />
        </button>
      </div>

      <div className="max-w-container mx-auto px-container-padding py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-headline text-headline tracking-headline mb-2">{listing.title}</h1>
              <div className="flex items-center space-x-4 text-textSecondary">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-warning fill-current mr-1" />
                  <span>{listing.rating}</span>
                  <span className="ml-1">({listing.reviews} reviews)</span>
                </div>
                <span>•</span>
                <span>{listing.location}</span>
                {listing.instantBook && (
                  <>
                    <span>•</span>
                    <span className="text-success font-medium">Instant Book</span>
                  </>
                )}
              </div>
            </div>

            {/* Host Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-backgroundAlt rounded-full flex items-center justify-center">
                    <span className="text-textSecondary">Host</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-textPrimary">Hosted by {listing.host.name}</h3>
                    <p className="text-textSecondary text-sm">
                      Response time: {listing.host.responseTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">About this space</h2>
              <p className="text-textSecondary leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {getAmenityIcon(amenity)}
                    <span className="text-textPrimary">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">Where you&apos;ll be</h2>
              <div className="h-64 rounded-lg overflow-hidden border border-border">
                <MapboxMap
                  center={listing.coordinates}
                  zoom={15}
                  listings={[{
                    id: listing.id,
                    title: listing.title,
                    price: listing.price,
                    rating: listing.rating,
                    coordinates: listing.coordinates
                  }]}
                />
              </div>
              <p className="text-textSecondary mt-2">{listing.location}</p>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">
                Reviews ({listing.reviews})
              </h2>
              <div className="space-y-4">
                {/* Mock reviews */}
                {[1, 2, 3].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-10 h-10 bg-backgroundAlt rounded-full flex items-center justify-center">
                          <span className="text-textSecondary text-sm">U{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-textPrimary">User {index + 1}</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-warning fill-current mr-1" />
                            <span className="text-sm text-textSecondary">5.0</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-textSecondary">
                        Great space! Everything was as described and the host was very responsive. 
                        Perfect for our team meeting.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-semibold text-textPrimary">€{listing.price}</span>
                    <span className="text-textSecondary"> / day</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-warning fill-current mr-1" />
                    <span className="text-sm text-textSecondary">{listing.rating}</span>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        className="w-full h-10 px-3 border border-border rounded-md text-sm"
                        onChange={(e) => setSelectedDates(prev => ({...prev, start: new Date(e.target.value)}))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        className="w-full h-10 px-3 border border-border rounded-md text-sm"
                        onChange={(e) => setSelectedDates(prev => ({...prev, end: new Date(e.target.value)}))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full h-10 px-3 border border-border rounded-md text-sm"
                    >
                      {Array.from({length: listing.capacity}, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>

                  <Button className="w-full" size="lg">
                    {listing.instantBook ? 'Reserve' : 'Request to Book'}
                  </Button>

                  {selectedDates.start && selectedDates.end && (
                    <div className="pt-4 border-t border-border">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-textSecondary">€{listing.price} × nights</span>
                          <span>€{listing.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-textSecondary">Platform fee</span>
                          <span>€{Math.round(listing.price * 0.05)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-textSecondary">Taxes</span>
                          <span>€{Math.round(listing.price * 0.25)}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t border-border">
                          <span>Total</span>
                          <span>€{calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
