'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, MapPin, Star, Users, CreditCard, Shield, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'

interface BookingData {
  id: string
  listing_id: string
  renter_id: string
  start_ts: string
  end_ts: string
  guests: number
  status: string
  subtotal_cents: number
  fees_platform_cents: number
  taxes_cents: number
  total_cents: number
  currency: string
  created_at: string
  listing: {
    id: string
    title: string
    address: string
    city: string
    country: string
    price_amount: number
    price_unit: string
    capacity: number
    instant_book: boolean
    rating_avg: number
    rating_count: number
    listing_photos: Array<{ url: string; sort: number }>
  }
}

export default function BookingConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string
  
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch booking')
        }
        
        const data = await response.json()
        setBooking(data.booking)
      } catch (error) {
        console.error('Error fetching booking:', error)
        setError('Failed to load booking details')
      } finally {
        setLoading(false)
      }
    }

    if (bookingId) {
      fetchBooking()
    }
  }, [bookingId])

  const handlePayment = async () => {
    if (!booking) return

    setProcessing(true)
    setError(null)

    try {
      const response = await fetch(`/api/bookings/${bookingId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: bookingId,
          payment_method: 'card' // In real app, this would come from Stripe Elements
        })
      })

      if (!response.ok) {
        throw new Error('Payment failed')
      }

      const data = await response.json()
      
      if (data.payment_intent?.client_secret) {
        // In a real app, you would use Stripe Elements to confirm the payment
        // For now, we'll simulate a successful payment
        router.push(`/booking/${bookingId}/success`)
      }
    } catch (error) {
      console.error('Payment error:', error)
      setError('Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'awaiting_host':
        return <Calendar className="w-5 h-5 text-yellow-600" />
      case 'pending':
        return <CreditCard className="w-5 h-5 text-blue-600" />
      case 'canceled':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Calendar className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'awaiting_host':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
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
        <div className="text-gray-600">Loading booking details...</div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#F8DEFF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Booking not found</h1>
          <p className="text-gray-600 mb-4">{error || 'The booking you\'re looking for doesn\'t exist.'}</p>
          <Button onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8DEFF]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-headline text-headline tracking-headline mb-2">
            Booking Confirmation
          </h1>
          <p className="text-gray-600">Review your booking details and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Status */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Booking Status</h2>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(booking.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Booking ID:</span>
                    <div className="font-medium">{booking.id}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Created:</span>
                    <div className="font-medium">
                      {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Space Details */}
            <Card>
              <CardHeader>
                <CardTitle>Space Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    {booking.listing.listing_photos?.[0]?.url ? (
                      <img 
                        src={booking.listing.listing_photos[0].url} 
                        alt={booking.listing.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs">Image</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {booking.listing.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.listing.address}, {booking.listing.city}, {booking.listing.country}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {booking.guests} guests
                      </div>
                      {booking.listing.rating_avg && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {booking.listing.rating_avg} ({booking.listing.rating_count} reviews)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dates */}
            <Card>
              <CardHeader>
                <CardTitle>Dates & Guests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">Check-in</span>
                    <div className="font-medium">
                      {format(new Date(booking.start_ts), 'EEEE, MMMM do, yyyy')}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Check-out</span>
                    <div className="font-medium">
                      {format(new Date(booking.end_ts), 'EEEE, MMMM do, yyyy')}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Duration</span>
                    <div className="font-medium">
                      {Math.ceil((new Date(booking.end_ts).getTime() - new Date(booking.start_ts).getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Guests</span>
                    <div className="font-medium">{booking.guests} guests</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        €{booking.listing.price_amount} × {Math.ceil((new Date(booking.end_ts).getTime() - new Date(booking.start_ts).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                      <span>{formatPrice(booking.subtotal_cents)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform fee</span>
                      <span>{formatPrice(booking.fees_platform_cents)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes</span>
                      <span>{formatPrice(booking.taxes_cents)}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>{formatPrice(booking.total_cents)}</span>
                    </div>
                  </div>

                  {/* Payment Button */}
                  {booking.status === 'pending' && (
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handlePayment}
                      disabled={processing}
                    >
                      {processing ? 'Processing...' : 'Complete Payment'}
                    </Button>
                  )}

                  {booking.status === 'confirmed' && (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-600 font-medium">Payment Confirmed</p>
                      <p className="text-gray-600 text-sm">Your booking is confirmed</p>
                    </div>
                  )}

                  {booking.status === 'awaiting_host' && (
                    <div className="text-center">
                      <Calendar className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                      <p className="text-yellow-600 font-medium">Awaiting Host Approval</p>
                      <p className="text-gray-600 text-sm">Your request is being reviewed</p>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="flex items-center text-xs text-gray-500">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
