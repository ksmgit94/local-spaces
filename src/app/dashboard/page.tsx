'use client'

import { useState, useEffect } from 'react'
import { Calendar, Heart, MapPin, Star, Clock, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Booking {
  id: string
  status: string
  start_ts: string
  end_ts: string
  guests: number
  total_cents: number
  currency: string
  listings: {
    id: string
    title: string
    address: string
    city: string
    country: string
    listing_photos: Array<{ url: string; sort: number }>
  }
}

interface DashboardStats {
  totalBookings: number
  upcomingBookings: number
  completedBookings: number
  totalSpent: number
}

export default function RenterDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Mock data - replace with actual API calls
      setTimeout(() => {
        const mockBookings: Booking[] = [
          {
            id: '1',
            status: 'confirmed',
            start_ts: '2024-10-15T09:00:00Z',
            end_ts: '2024-10-15T17:00:00Z',
            guests: 8,
            total_cents: 36000,
            currency: 'EUR',
            listings: {
              id: '1',
              title: 'Modern Conference Room in Downtown',
              address: '123 Main St',
              city: 'Copenhagen',
              country: 'Denmark',
              listing_photos: [{ url: '/api/placeholder/400/300', sort: 0 }]
            }
          },
          {
            id: '2',
            status: 'confirmed',
            start_ts: '2024-10-22T10:00:00Z',
            end_ts: '2024-10-22T16:00:00Z',
            guests: 6,
            total_cents: 27000,
            currency: 'EUR',
            listings: {
              id: '2',
              title: 'Creative Photography Studio',
              address: '456 Art Ave',
              city: 'Aarhus',
              country: 'Denmark',
              listing_photos: [{ url: '/api/placeholder/400/300', sort: 0 }]
            }
          },
          {
            id: '3',
            status: 'completed',
            start_ts: '2024-09-28T09:00:00Z',
            end_ts: '2024-09-28T17:00:00Z',
            guests: 12,
            total_cents: 45000,
            currency: 'EUR',
            listings: {
              id: '1',
              title: 'Modern Conference Room in Downtown',
              address: '123 Main St',
              city: 'Copenhagen',
              country: 'Denmark',
              listing_photos: [{ url: '/api/placeholder/400/300', sort: 0 }]
            }
          }
        ]

        setBookings(mockBookings)
        setStats({
          totalBookings: mockBookings.length,
          upcomingBookings: mockBookings.filter(b => ['confirmed', 'awaiting_host'].includes(b.status)).length,
          completedBookings: mockBookings.filter(b => b.status === 'completed').length,
          totalSpent: mockBookings.reduce((sum, b) => sum + b.total_cents, 0)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'awaiting_host':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'canceled':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
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

  const upcomingBookings = bookings.filter(booking => 
    ['confirmed', 'awaiting_host'].includes(booking.status)
  )

  const pastBookings = bookings.filter(booking => 
    ['completed', 'canceled'].includes(booking.status)
  )

  const currentBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings

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
          <h1 className="text-3xl font-headline text-headline tracking-headline">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your bookings and discover new spaces</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
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
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.upcomingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSpent)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-headline text-headline tracking-headline">My Bookings</h2>
              <Link href="/search">
                <Button>Find More Spaces</Button>
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upcoming ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Past ({pastBookings.length})
              </button>
            </div>

            <div className="space-y-4">
              {currentBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Image</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link 
                              href={`/spaces/${booking.listings.id}`}
                              className="text-lg font-semibold text-gray-900 hover:text-red-500 transition-colors"
                            >
                              {booking.listings.title}
                            </Link>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {booking.listings.city}, {booking.listings.country}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(booking.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Check-in:</span> {formatDate(booking.start_ts)}
                          </div>
                          <div>
                            <span className="font-medium">Check-out:</span> {formatDate(booking.end_ts)}
                          </div>
                          <div>
                            <span className="font-medium">Guests:</span> {booking.guests}
                          </div>
                          <div>
                            <span className="font-medium">Total:</span> {formatPrice(booking.total_cents, booking.currency)}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link href={`/bookings/${booking.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          {booking.status === 'confirmed' && (
                            <Button variant="outline" size="sm">
                              Contact Host
                            </Button>
                          )}
                          {booking.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              Write Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {currentBookings.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="text-gray-500 mb-4">
                      <Calendar className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {activeTab === 'upcoming' 
                          ? 'Start exploring spaces to book your next event'
                          : 'Your completed bookings will appear here'
                        }
                      </p>
                      <Link href="/search">
                        <Button>
                          {activeTab === 'upcoming' ? 'Find Spaces' : 'Explore Spaces'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-headline text-headline tracking-headline mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Discover Spaces</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Find the perfect space for your next event
                  </p>
                  <Link href="/search">
                    <Button className="w-full">Browse Spaces</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Become a Host</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    List your space and start earning money
                  </p>
                  <Link href="/become-a-host">
                    <Button variant="outline" className="w-full">Start Hosting</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Saved Spaces</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    View your favorite spaces
                  </p>
                  <Button variant="outline" className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    View Saved
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
