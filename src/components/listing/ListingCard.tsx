'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Star, MapPin, Users, Wifi, Car, Coffee, Camera, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

interface ListingCardProps {
  listing: {
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
  onFavorite?: (listingId: string) => void
  isFavorite?: boolean
}

export function ListingCard({ listing, onFavorite, isFavorite = false }: ListingCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />
      case 'parking':
        return <Car className="w-4 h-4" />
      case 'coffee':
        return <Coffee className="w-4 h-4" />
      case 'photography equipment':
        return <Camera className="w-4 h-4" />
      case 'security':
        return <Shield className="w-4 h-4" />
      default:
        return <div className="w-4 h-4 bg-primary rounded-full" />
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFavorite?.(listing.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/spaces/${listing.id}`}>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          {/* Image */}
          <div className="relative h-48 bg-gray-100">
            {!imageError ? (
              <img
                src={listing.image}
                alt={listing.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-500 text-sm">Image unavailable</span>
              </div>
            )}
            
            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'
                }`} 
              />
            </button>

            {/* Instant Book Badge */}
            {listing.instantBook && (
              <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                Instant Book
              </div>
            )}

            {/* Popular Badge */}
            {listing.reviews > 50 && (
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-black px-2 py-1 rounded-full text-xs font-medium">
                Popular
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-[#484149] line-clamp-2 group-hover:text-[#EFADFF] transition-colors">
                {listing.title}
              </h3>
              <div className="flex items-center ml-2 flex-shrink-0">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-[#6F6470] ml-1">{listing.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-[#6F6470] text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">{listing.location}</span>
            </div>

            {/* Description */}
            <p className="text-[#6F6470] text-sm mb-3 line-clamp-2">{listing.description}</p>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <div className="flex items-center space-x-2 mb-3">
                {listing.amenities.slice(0, 3).map((amenity, index) => (
                  <div key={index} className="flex items-center text-[#6F6470] text-xs">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1 hidden sm:inline">{amenity}</span>
                  </div>
                ))}
                {listing.amenities.length > 3 && (
                  <span className="text-[#6F6470] text-xs">+{listing.amenities.length - 3} more</span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div>
                  <span className="text-lg font-semibold text-[#484149]">€{listing.price}</span>
                  <span className="text-[#6F6470] text-sm">/day</span>
                </div>
                <div className="flex items-center text-[#6F6470] text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{listing.capacity}</span>
                </div>
              </div>
              <span className="text-[#6F6470] text-sm">({listing.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
