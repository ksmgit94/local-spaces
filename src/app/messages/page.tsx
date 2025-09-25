'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Clock, User, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface Thread {
  id: string
  listing: {
    id: string
    title: string
    address: string
    city: string
    country: string
    listing_photos: Array<{ url: string; sort: number }>
  }
  booking: {
    id: string
    status: string
    start_ts: string
    end_ts: string
  } | null
  otherUser: {
    id: string
    name: string
    email: string
  }
  lastMessage: {
    id: string
    body: string
    created_at: string
    sender_id: string
  } | null
  status: string
  unreadCount: number
}

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchThreads()
  }, [])

  const fetchThreads = async () => {
    setLoading(true)
    try {
      // Mock data - replace with actual API call
      setTimeout(() => {
        const mockThreads: Thread[] = [
          {
            id: '1',
            listing: {
              id: '1',
              title: 'Modern Conference Room in Downtown',
              address: '123 Main St',
              city: 'Copenhagen',
              country: 'Denmark',
              listing_photos: [{ url: '/api/placeholder/400/300', sort: 0 }]
            },
            booking: {
              id: '1',
              status: 'confirmed',
              start_ts: '2024-10-15T09:00:00Z',
              end_ts: '2024-10-15T17:00:00Z'
            },
            otherUser: {
              id: '2',
              name: 'Maria Andersen',
              email: 'maria@example.com'
            },
            lastMessage: {
              id: '1',
              body: 'Looking forward to hosting your team meeting!',
              created_at: '2024-10-10T14:30:00Z',
              sender_id: '2'
            },
            status: 'open',
            unreadCount: 0
          },
          {
            id: '2',
            listing: {
              id: '2',
              title: 'Creative Photography Studio',
              address: '456 Art Ave',
              city: 'Aarhus',
              country: 'Denmark',
              listing_photos: [{ url: '/api/placeholder/400/300', sort: 0 }]
            },
            booking: {
              id: '2',
              status: 'awaiting_host',
              start_ts: '2024-10-20T10:00:00Z',
              end_ts: '2024-10-20T16:00:00Z'
            },
            otherUser: {
              id: '3',
              name: 'Sarah Johnson',
              email: 'sarah@example.com'
            },
            lastMessage: {
              id: '2',
              body: 'I\'m interested in booking your studio for a photo shoot. Is it available next week?',
              created_at: '2024-10-09T16:45:00Z',
              sender_id: '3'
            },
            status: 'open',
            unreadCount: 1
          }
        ]

        setThreads(mockThreads)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching threads:', error)
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8DEFF] flex items-center justify-center">
        <div className="text-gray-600">Loading messages...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8DEFF]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-headline text-headline tracking-headline">Messages</h1>
          <p className="text-gray-600 mt-2">Communicate with hosts and guests</p>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {threads.map((thread) => (
            <Link key={thread.id} href={`/messages/${thread.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    {/* Listing Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Image</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {thread.listing.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <User className="w-4 h-4 mr-1" />
                            {thread.otherUser.name}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {thread.lastMessage && (
                            <span className="text-sm text-gray-500">
                              {formatDate(thread.lastMessage.created_at)}
                            </span>
                          )}
                          {thread.unreadCount > 0 && (
                            <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              {thread.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {thread.listing.city}, {thread.listing.country}
                      </div>

                      {/* Booking Status */}
                      {thread.booking && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(thread.booking.status)}`}>
                            {thread.booking.status.replace('_', ' ')}
                          </span>
                          <span className="text-sm text-gray-600">
                            {new Date(thread.booking.start_ts).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {/* Last Message */}
                      {thread.lastMessage && (
                        <p className="text-gray-600 text-sm truncate">
                          {thread.lastMessage.body}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {threads.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-500 mb-4">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start a conversation by booking a space or hosting guests
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link href="/search">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                        Find Spaces
                      </button>
                    </Link>
                    <Link href="/become-a-host">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-[#F8DEFF] transition-colors">
                        Become a Host
                      </button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
