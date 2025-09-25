'use client'

import { useState, useEffect } from 'react'
import { Calendar, DollarSign, Eye, Heart, MapPin, Plus, Settings, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Listing {
  id: string
  title: string
  status: 'draft' | 'listed' | 'paused'
  price_amount: number
  price_unit: 'day' | 'hour'
  capacity: number
  rating_avg: number | null
  rating_count: number | null
  city: string
  country: string
  instant_book: boolean
}

interface Booking {
  id: string
  status: string
  start_ts: string
  end_ts: string
  guests: number
  total_cents: number
  currency: string
  users: {
    name: string
    email: string
  }
  listings: {
    title: string
  }
}

interface DashboardStats {
  totalListings: number
  activeListings: number
  totalBookings: number
  pendingBookings: number
  totalEarnings: number
  thisMonthEarnings: number
}

export default function HostDashboard() {
  const [listings, setListings] = useState<Listing[]>([])
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    activeListings: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalEarnings: 0,
    thisMonthEarnings: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // In a real app, these would be separate API calls
      // For now, using mock data
      setTimeout(() => {
        setListings([
          {
            id: '1',
            title: 'Modern Conference Room in Downtown',
            status: 'listed',
            price_amount: 45,
            price_unit: 'day',
            capacity: 12,
            rating_avg: 4.9,
            rating_count: 127,
            city: 'Copenhagen',
            country: 'Denmark',
            instant_book: true
          },
          {
            id: '2',
            title: 'Creative Photography Studio',
            status: 'draft',
            price_amount: 65,
            price_unit: 'day',
            capacity: 8,
            rating_avg: 4.8,
            rating_count: 89,
            city: 'Aarhus',
            country: 'Denmark',
            instant_book: false
          }
        ])

        setRecentBookings([
          {
            id: '1',
            status: 'confirmed',
            start_ts: '2024-10-15T09:00:00Z',
            end_ts: '2024-10-15T17:00:00Z',
            guests: 8,
            total_cents: 36000,
            currency: 'EUR',
            users: {
              name: 'John Smith',
              email: 'john@example.com'
            },
            listings: {
              title: 'Modern Conference Room in Downtown'
            }
          },
          {
            id: '2',
            status: 'awaiting_host',
            start_ts: '2024-10-20T10:00:00Z',
            end_ts: '2024-10-20T16:00:00Z',
            guests: 6,
            total_cents: 27000,
            currency: 'EUR',
            users: {
              name: 'Sarah Johnson',
              email: 'sarah@example.com'
            },
            listings: {
              title: 'Modern Conference Room in Downtown'
            }
          }
        ])

        setStats({
          totalListings: 2,
          activeListings: 1,
          totalBookings: 15,
          pendingBookings: 2,
          totalEarnings: 125000,
          thisMonthEarnings: 8500
        })

        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  const formatPrice = (cents: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(cents / 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'awaiting_host':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'canceled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8DEFF] flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8DEFF]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-headline text-headline tracking-headline">Host Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your listings and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.thisMonthEarnings)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listings */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Listings</h2>
              <Link href="/host/listings/create">
                <Button className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Listing
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            listing.status === 'listed' 
                              ? 'bg-green-100 text-green-800'
                              : listing.status === 'paused'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {listing.status}
                          </span>
                          {listing.instant_book && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              Instant Book
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {listing.city}, {listing.country}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {listing.capacity} guests
                          </div>
                          {listing.rating_avg && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                              {listing.rating_avg} ({listing.rating_count})
                            </div>
                          )}
                        </div>

                        <p className="text-lg font-semibold text-gray-900">
                          €{listing.price_amount}/{listing.price_unit}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Link href={`/host/listings/${listing.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/spaces/${listing.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {listings.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="text-gray-500 mb-4">
                      <Plus className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                      <p className="text-gray-600 mb-6">Create your first listing to start earning money</p>
                      <Link href="/host/listings/create">
                        <Button>Create Listing</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h2>
            
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{booking.listings.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">
                      {booking.users.name} • {booking.guests} guests
                    </p>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {formatDate(booking.start_ts)} - {formatDate(booking.end_ts)}
                    </p>
                    
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(booking.total_cents, booking.currency)}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {recentBookings.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 text-sm">No bookings yet</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="mt-6">
              <Link href="/host/bookings">
                <Button variant="outline" className="w-full">
                  View All Bookings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
