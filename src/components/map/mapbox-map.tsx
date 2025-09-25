'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

interface MapboxMapProps {
  center?: [number, number]
  zoom?: number
  listings?: Array<{
    id: string
    title: string
    price: number
    rating: number
    coordinates: [number, number]
  }>
  onListingClick?: (listingId: string) => void
  onMove?: (center: [number, number], zoom: number) => void
  className?: string
}

export default function MapboxMap({
  center = [12.5683, 55.6761], // Copenhagen default
  zoom = 12,
  listings = [],
  onListingClick,
  onMove,
  className = 'w-full h-full'
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (map.current) return // initialize map only once

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!mapboxToken) {
      console.error('Mapbox token not found')
      return
    }

    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
      attributionControl: false
    })

    map.current.on('load', () => {
      setIsLoaded(true)
    })

    map.current.on('moveend', () => {
      if (onMove && map.current) {
        const center = map.current.getCenter()
        const zoom = map.current.getZoom()
        onMove([center.lng, center.lat], zoom)
      }
    })

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      map.current?.remove()
    }
  }, [])

  // Update markers when listings change
  useEffect(() => {
    if (!isLoaded || !map.current) return

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Add new markers
    listings.forEach(listing => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.cssText = `
        background-color: var(--color-primary);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      `

      const marker = new mapboxgl.Marker(el)
        .setLngLat(listing.coordinates)
        .addTo(map.current!)

      // Add click handler
      el.addEventListener('click', () => {
        onListingClick?.(listing.id)
      })

      // Add popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold text-sm">${listing.title}</h3>
          <p class="text-xs text-textSecondary">€${listing.price}/day</p>
          <div class="flex items-center mt-1">
            <span class="text-xs text-warning">★</span>
            <span class="text-xs text-textSecondary ml-1">${listing.rating}</span>
          </div>
        </div>
      `)

      marker.setPopup(popup)

      markers.current.push(marker)
    })
  }, [listings, isLoaded, onListingClick])

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-backgroundAlt rounded-lg">
          <div className="text-textSecondary">Loading map...</div>
        </div>
      )}
    </div>
  )
}
