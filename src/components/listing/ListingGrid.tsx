'use client'

import { useState } from 'react'
import { ListingCard } from './ListingCard'

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

interface ListingGridProps {
  listings: Listing[]
  loading?: boolean
  onFavorite?: (listingId: string) => void
  favorites?: string[]
}

export function ListingGrid({ listings, loading = false, onFavorite, favorites = [] }: ListingGridProps) {
  const [favoriteListings, setFavoriteListings] = useState<string[]>(favorites)

  const handleFavorite = (listingId: string) => {
    setFavoriteListings(prev => {
      const isCurrentlyFavorite = prev.includes(listingId)
      const newFavorites = isCurrentlyFavorite 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
      
      onFavorite?.(listingId)
      return newFavorites
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces found</h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your search criteria or explore different locations
        </p>
        <button 
          onClick={() => window.location.href = '/search'}
          className="bg-[#EFADFF] hover:bg-[#D298E0] text-white px-6 py-2 rounded-lg transition-colors"
        >
          Browse All Spaces
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing, index) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onFavorite={handleFavorite}
          isFavorite={favoriteListings.includes(listing.id)}
        />
      ))}
    </div>
  )
}
