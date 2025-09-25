import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'renter' | 'host' | 'admin'
          stripe_customer_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: 'renter' | 'host' | 'admin'
          stripe_customer_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'renter' | 'host' | 'admin'
          stripe_customer_id?: string | null
          created_at?: string
        }
      }
      hosts: {
        Row: {
          user_id: string
          stripe_connect_account_id: string | null
          payout_status: string | null
          verification_status: string | null
        }
        Insert: {
          user_id: string
          stripe_connect_account_id?: string | null
          payout_status?: string | null
          verification_status?: string | null
        }
        Update: {
          user_id?: string
          stripe_connect_account_id?: string | null
          payout_status?: string | null
          verification_status?: string | null
        }
      }
      listings: {
        Row: {
          id: string
          host_id: string
          title: string
          description: string | null
          price_amount: number
          price_unit: 'day' | 'hour'
          capacity: number
          amenities: string[]
          address: string
          city: string
          country: string
          timezone: string
          geo: { type: 'Point'; coordinates: [number, number] } | null
          instant_book: boolean
          status: 'draft' | 'listed' | 'paused'
          rating_avg: number | null
          rating_count: number | null
          created_at: string
        }
        Insert: {
          id?: string
          host_id: string
          title: string
          description?: string | null
          price_amount: number
          price_unit: 'day' | 'hour'
          capacity: number
          amenities?: string[]
          address: string
          city: string
          country: string
          timezone: string
          geo?: { type: 'Point'; coordinates: [number, number] } | null
          instant_book?: boolean
          status?: 'draft' | 'listed' | 'paused'
          rating_avg?: number | null
          rating_count?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          title?: string
          description?: string | null
          price_amount?: number
          price_unit?: 'day' | 'hour'
          capacity?: number
          amenities?: string[]
          address?: string
          city?: string
          country?: string
          timezone?: string
          geo?: { type: 'Point'; coordinates: [number, number] } | null
          instant_book?: boolean
          status?: 'draft' | 'listed' | 'paused'
          rating_avg?: number | null
          rating_count?: number | null
          created_at?: string
        }
      }
      listing_photos: {
        Row: {
          id: string
          listing_id: string
          url: string
          sort: number
        }
        Insert: {
          id?: string
          listing_id: string
          url: string
          sort: number
        }
        Update: {
          id?: string
          listing_id?: string
          url?: string
          sort?: number
        }
      }
      bookings: {
        Row: {
          id: string
          listing_id: string
          renter_id: string
          start_ts: string
          end_ts: string
          guests: number
          status: 'pending' | 'awaiting_host' | 'authorized' | 'confirmed' | 'completed' | 'canceled' | 'refunded' | 'disputed'
          subtotal_cents: number
          fees_platform_cents: number
          taxes_cents: number
          total_cents: number
          currency: string
          policy_key: string
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          renter_id: string
          start_ts: string
          end_ts: string
          guests: number
          status?: 'pending' | 'awaiting_host' | 'authorized' | 'confirmed' | 'completed' | 'canceled' | 'refunded' | 'disputed'
          subtotal_cents: number
          fees_platform_cents: number
          taxes_cents: number
          total_cents: number
          currency: string
          policy_key: string
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          renter_id?: string
          start_ts?: string
          end_ts?: string
          guests?: number
          status?: 'pending' | 'awaiting_host' | 'authorized' | 'confirmed' | 'completed' | 'canceled' | 'refunded' | 'disputed'
          subtotal_cents?: number
          fees_platform_cents?: number
          taxes_cents?: number
          total_cents?: number
          currency?: string
          policy_key?: string
          created_at?: string
        }
      }
    }
  }
}