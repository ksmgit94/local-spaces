-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE user_role AS ENUM ('renter', 'host', 'admin');
CREATE TYPE price_unit AS ENUM ('day', 'hour');
CREATE TYPE listing_status AS ENUM ('draft', 'listed', 'paused');
CREATE TYPE booking_status AS ENUM ('pending', 'awaiting_host', 'authorized', 'confirmed', 'completed', 'canceled', 'refunded', 'disputed');
CREATE TYPE rule_type AS ENUM ('open', 'closed');
CREATE TYPE thread_status AS ENUM ('open', 'closed');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role user_role DEFAULT 'renter',
    stripe_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hosts table (extends users)
CREATE TABLE hosts (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    stripe_connect_account_id TEXT UNIQUE,
    payout_status TEXT,
    verification_status TEXT
);

-- Listings table
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price_amount INTEGER NOT NULL CHECK (price_amount > 0),
    price_unit price_unit NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    amenities JSONB DEFAULT '[]',
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'UTC',
    geo GEOGRAPHY(POINT, 4326),
    instant_book BOOLEAN DEFAULT FALSE,
    status listing_status DEFAULT 'draft',
    rating_avg NUMERIC(3,2) CHECK (rating_avg >= 1 AND rating_avg <= 5),
    rating_count INTEGER DEFAULT 0 CHECK (rating_count >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listing photos table
CREATE TABLE listing_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    sort INTEGER NOT NULL DEFAULT 0
);

-- Availability rules table
CREATE TABLE availability_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    rule_type rule_type NOT NULL,
    rrule TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'UTC',
    notes TEXT
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    renter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_ts TIMESTAMPTZ NOT NULL,
    end_ts TIMESTAMPTZ NOT NULL,
    guests INTEGER NOT NULL CHECK (guests > 0),
    status booking_status DEFAULT 'pending',
    subtotal_cents INTEGER NOT NULL CHECK (subtotal_cents > 0),
    fees_platform_cents INTEGER NOT NULL CHECK (fees_platform_cents >= 0),
    taxes_cents INTEGER NOT NULL CHECK (taxes_cents >= 0),
    total_cents INTEGER NOT NULL CHECK (total_cents > 0),
    currency TEXT NOT NULL DEFAULT 'EUR',
    policy_key TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Ensure no overlapping bookings for the same listing
    EXCLUDE USING GIST (listing_id WITH =, tstzrange(start_ts, end_ts) WITH &&)
);

-- Booking payments table
CREATE TABLE booking_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT,
    stripe_charge_id TEXT,
    application_fee_cents INTEGER CHECK (application_fee_cents >= 0),
    transfer_destination TEXT,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Threads table for messaging
CREATE TABLE threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    renter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status thread_status DEFAULT 'open'
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    attachment_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhook events table
CREATE TABLE webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    received_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit log table
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id UUID,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_listings_geo ON listings USING GIST (geo);
CREATE INDEX idx_listings_fts ON listings USING GIN (to_tsvector('simple', COALESCE(title,'') || ' ' || COALESCE(description,'')));
CREATE INDEX idx_listings_host_id ON listings (host_id);
CREATE INDEX idx_listings_status ON listings (status);
CREATE INDEX idx_listings_city ON listings (city);
CREATE INDEX idx_listings_price ON listings (price_amount);

CREATE INDEX idx_bookings_listing_time ON bookings (listing_id, start_ts);
CREATE INDEX idx_bookings_renter_id ON bookings (renter_id);
CREATE INDEX idx_bookings_status ON bookings (status);

CREATE INDEX idx_messages_thread_time ON messages (thread_id, created_at);
CREATE INDEX idx_messages_sender ON messages (sender_id);

CREATE INDEX idx_reviews_booking_id ON reviews (booking_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews (reviewee_id);

CREATE INDEX idx_webhook_events_provider ON webhook_events (provider, received_at);
CREATE INDEX idx_audit_log_actor ON audit_log (actor_id, created_at);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Hosts policies
CREATE POLICY "Hosts can view own data" ON hosts
    FOR ALL USING (auth.uid() = user_id);

-- Listings policies
CREATE POLICY "Anyone can view listed listings" ON listings
    FOR SELECT USING (status = 'listed');

CREATE POLICY "Hosts can manage own listings" ON listings
    FOR ALL USING (auth.uid() = host_id);

-- Listing photos policies
CREATE POLICY "Anyone can view photos of listed listings" ON listing_photos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM listings 
            WHERE id = listing_photos.listing_id 
            AND status = 'listed'
        )
    );

CREATE POLICY "Hosts can manage photos of own listings" ON listing_photos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM listings 
            WHERE id = listing_photos.listing_id 
            AND host_id = auth.uid()
        )
    );

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (
        auth.uid() = renter_id OR 
        EXISTS (
            SELECT 1 FROM listings 
            WHERE id = bookings.listing_id 
            AND host_id = auth.uid()
        )
    );

CREATE POLICY "Users can create bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Hosts can update bookings for own listings" ON bookings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM listings 
            WHERE id = bookings.listing_id 
            AND host_id = auth.uid()
        )
    );

-- Messages policies
CREATE POLICY "Users can view messages in own threads" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM threads 
            WHERE id = messages.thread_id 
            AND (renter_id = auth.uid() OR host_id = auth.uid())
        )
    );

CREATE POLICY "Users can send messages in own threads" ON messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM threads 
            WHERE id = messages.thread_id 
            AND (renter_id = auth.uid() OR host_id = auth.uid())
        )
    );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for own bookings" ON reviews
    FOR INSERT WITH CHECK (
        auth.uid() = reviewer_id AND
        EXISTS (
            SELECT 1 FROM bookings 
            WHERE id = reviews.booking_id 
            AND renter_id = auth.uid()
        )
    );

-- Webhook events policies (admin only)
CREATE POLICY "Only service role can access webhook events" ON webhook_events
    FOR ALL USING (auth.role() = 'service_role');

-- Audit log policies
CREATE POLICY "Users can view own audit log entries" ON audit_log
    FOR SELECT USING (auth.uid() = actor_id);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE listings 
    SET 
        rating_avg = (
            SELECT AVG(rating)::NUMERIC(3,2)
            FROM reviews r
            JOIN bookings b ON r.booking_id = b.id
            WHERE b.listing_id = NEW.booking_id
        ),
        rating_count = (
            SELECT COUNT(*)
            FROM reviews r
            JOIN bookings b ON r.booking_id = b.id
            WHERE b.listing_id = NEW.booking_id
        )
    WHERE id = (
        SELECT listing_id 
        FROM bookings 
        WHERE id = NEW.booking_id
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update listing ratings when reviews are added
CREATE TRIGGER update_listing_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_listing_rating();

-- Function to check booking availability
CREATE OR REPLACE FUNCTION check_booking_availability(
    p_listing_id UUID,
    p_start_ts TIMESTAMPTZ,
    p_end_ts TIMESTAMPTZ
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM bookings 
        WHERE listing_id = p_listing_id 
        AND status IN ('confirmed', 'authorized', 'awaiting_host')
        AND tstzrange(start_ts, end_ts) && tstzrange(p_start_ts, p_end_ts)
    );
END;
$$ LANGUAGE plpgsql;