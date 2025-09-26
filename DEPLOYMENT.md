# Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration

### 2. Environment Variables
Add these in Vercel Dashboard → Project Settings → Environment Variables:

#### Required Variables:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_PLATFORM_CURRENCY=EUR
NEXT_PUBLIC_PLATFORM_FEE_PERCENT=5
```

#### Optional Variables:
```bash
# Email (if using Resend)
RESEND_KEY=your_resend_key

# Analytics (if using PostHog)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host

# Error Tracking (if using Sentry)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### 3. Build Configuration
Vercel will automatically detect:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Stripe Webhook Configuration
After deployment, configure your Stripe webhook:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. **Endpoint URL**: `https://your-vercel-domain.vercel.app/api/stripe/webhook`
4. **Events to send**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
   - `account.updated`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 5. Deploy
1. Click "Deploy" in Vercel dashboard
2. Wait for build to complete
3. Test your deployment

## 🔧 Configuration Files

### vercel.json
- Configures build settings and API function timeouts
- Sets CORS headers for API routes
- Optimizes webhook endpoint handling

### .vercelignore
- Excludes unnecessary files from deployment
- Reduces build size and deployment time

## 🧪 Testing Deployment

### 1. Basic Functionality
- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] User authentication works
- [ ] Space listings display

### 2. Payment System
- [ ] Stripe integration works
- [ ] Webhook receives events
- [ ] Booking payments process
- [ ] Host payouts work

### 3. Database
- [ ] Supabase connection works
- [ ] Data persists correctly
- [ ] Real-time features work

## 🚨 Common Issues

### Build Failures
- Check environment variables are set
- Verify all dependencies are in package.json
- Check for TypeScript errors

### API Errors
- Verify webhook secret matches Stripe
- Check Supabase connection strings
- Ensure CORS is configured correctly

### Performance Issues
- Monitor function execution time
- Check for memory leaks
- Optimize database queries

## 📊 Monitoring

### Vercel Analytics
- Enable in project settings
- Monitor Core Web Vitals
- Track user behavior

### Error Tracking
- Set up Sentry for error monitoring
- Configure alerts for critical errors
- Monitor API endpoint performance

## 🔄 Continuous Deployment

### Automatic Deployments
- Push to `main` branch triggers deployment
- Preview deployments for pull requests
- Rollback to previous deployments if needed

### Environment Management
- Use different environments for staging/production
- Manage secrets securely
- Test changes in preview deployments

## 📝 Post-Deployment Checklist

- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Configure Stripe webhook endpoint
- [ ] Test all payment flows
- [ ] Verify email notifications work
- [ ] Check analytics tracking
- [ ] Monitor error rates
- [ ] Set up monitoring alerts
- [ ] Update DNS if using custom domain

## 🆘 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review environment variables
3. Test API endpoints individually
4. Check Stripe webhook logs
5. Verify Supabase connection

---

**Ready to deploy?** Follow the steps above and your Nooko platform will be live on Vercel! 🎉

