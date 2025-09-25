# LocalSpaces - Space Rental Marketplace

A modern marketplace for renting local spaces including meeting rooms, studios, event spaces, and offices. Built with Next.js 14, Supabase, and Stripe.

## 🚀 Features

- **Space Discovery**: Search and filter spaces by location, type, amenities, and availability
- **Interactive Maps**: Mapbox integration for location-based search and navigation
- **Booking System**: Real-time availability checking with instant booking or host approval
- **Payment Processing**: Stripe Connect integration with 5% platform fee
- **User Management**: Separate flows for renters and hosts with role-based access
- **Messaging**: Built-in communication between hosts and renters
- **Reviews**: Rating and review system for completed bookings
- **Admin Panel**: Management interface for disputes and platform oversight

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL with PostGIS, RLS)
- **Authentication**: Supabase Auth
- **Payments**: Stripe Connect Standard
- **Maps**: Mapbox GL JS
- **Email**: Resend
- **Analytics**: PostHog
- **Error Tracking**: Sentry
- **Hosting**: Vercel

## 📋 Current Progress

### ✅ Completed
- [x] Project scaffolding with Next.js 14, TypeScript, and Tailwind
- [x] Design system implementation with exact color and typography specifications
- [x] Global layout with responsive navbar and footer
- [x] Homepage with search functionality and featured spaces
- [x] Search page with map integration and filtering
- [x] Listing detail pages with booking flow
- [x] Database schema with PostgreSQL, PostGIS, and RLS policies
- [x] Authentication system with Supabase Auth
- [x] API routes for listings CRUD operations
- [x] Stripe Connect integration with webhook handling
- [x] Payment processing with 5% platform fee

### 🚧 In Progress
- [ ] Booking system with availability checks
- [ ] User dashboards (renter and host)
- [ ] Messaging system
- [ ] Review system
- [ ] Admin console
- [ ] Email notifications
- [ ] Testing and deployment

## 🚀 Quick Start

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
   - `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox access token
   - `STRIPE_SECRET_KEY` - Stripe secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
   - `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
   - `RESEND_KEY` - Resend API key

3. **Set up the database**:
   ```bash
   # Create a new Supabase project at https://supabase.com
   # Run the migration file in your Supabase SQL editor:
   # supabase/migrations/001_initial_schema.sql
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄 Database Setup

The application uses Supabase with the following key features:

- **PostgreSQL** with PostGIS for geospatial queries
- **Row Level Security (RLS)** for data protection
- **Full-text search** with pg_trgm extension
- **Exclusion constraints** to prevent double bookings
- **Triggers** for automatic rating calculations

Run the migration file `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor to set up the complete schema.

## 🎨 Design System

The application follows a strict design system with:

- **Colors**: Airbnb-inspired palette with #FF385C primary color
- **Typography**: Circular Std font family with proper weights and sizes
- **Spacing**: Consistent 4px-based spacing scale
- **Components**: Standardized button, input, and card styles
- **Responsive**: Mobile-first design with Tailwind CSS

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── listings/      # Listings CRUD
│   │   └── stripe/        # Payment webhooks
│   ├── search/            # Search results page
│   ├── spaces/[id]/       # Individual space details
│   ├── dashboard/         # User dashboard
│   ├── host/              # Host management
│   └── admin/             # Admin panel
├── components/            # Reusable React components
│   ├── layout/           # Layout components (navbar, footer)
│   ├── ui/               # Base UI components
│   ├── map/              # Mapbox integration
│   └── forms/            # Form components
├── lib/                  # Utility functions and configurations
│   ├── auth.ts           # Authentication helpers
│   ├── supabase.ts       # Supabase client setup
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Helper functions
└── styles/               # Global styles and design tokens
    └── globals.css       # Tailwind CSS with custom properties
```

## 💳 Payment Integration

The application uses Stripe Connect for marketplace payments:

- **Host Onboarding**: Express accounts for easy setup
- **Payment Processing**: Destination charges with application fees
- **Platform Fee**: 5% automatically calculated and collected
- **Webhook Handling**: Real-time payment status updates
- **Refund Support**: Automatic refund processing

## 🔐 Security Features

- **Row Level Security**: Database-level access control
- **Authentication**: Supabase Auth with email/password
- **Role-based Access**: Renter, Host, and Admin roles
- **API Protection**: Authenticated endpoints with user verification
- **Data Validation**: Input sanitization and type checking

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

Make sure to configure your Stripe webhook endpoint to point to your production domain.

## 🧪 Development

- **TypeScript**: Full type safety with strict configuration
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Component Library**: Reusable UI components with Radix UI primitives

## 📝 API Endpoints

### Listings
- `GET /api/listings` - Search and filter listings
- `POST /api/listings` - Create new listing (host only)
- `GET /api/listings/[id]` - Get listing details
- `PATCH /api/listings/[id]` - Update listing (host only)
- `DELETE /api/listings/[id]` - Delete listing (host/admin only)

### Authentication
- `GET /api/auth/callback` - OAuth callback handler

### Payments
- `POST /api/stripe/webhook` - Stripe webhook handler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For support and questions, please open an issue on GitHub or contact the development team.