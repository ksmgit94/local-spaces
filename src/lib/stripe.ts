import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export const createPaymentIntent = async (
  amount: number,
  currency: string = 'eur',
  hostAccountId: string,
  metadata: Record<string, string> = {}
) => {
  try {
    const applicationFeeAmount = Math.round(amount * 0.05) // 5% platform fee
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      application_fee_amount: applicationFeeAmount,
      transfer_data: {
        destination: hostAccountId,
      },
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      applicationFeeAmount,
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw new Error('Failed to create payment intent')
  }
}

export const createConnectAccount = async (email: string) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    })

    return account
  } catch (error) {
    console.error('Error creating Connect account:', error)
    throw new Error('Failed to create Connect account')
  }
}

export const createAccountLink = async (accountId: string, refreshUrl: string, returnUrl: string) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    })

    return accountLink
  } catch (error) {
    console.error('Error creating account link:', error)
    throw new Error('Failed to create account link')
  }
}

export const createLoginLink = async (accountId: string) => {
  try {
    const loginLink = await stripe.accounts.createLoginLink(accountId)
    return loginLink
  } catch (error) {
    console.error('Error creating login link:', error)
    throw new Error('Failed to create login link')
  }
}

export const getAccount = async (accountId: string) => {
  try {
    const account = await stripe.accounts.retrieve(accountId)
    return account
  } catch (error) {
    console.error('Error retrieving account:', error)
    throw new Error('Failed to retrieve account')
  }
}

export const constructWebhookEvent = (payload: string | Buffer, signature: string) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    return event
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw new Error('Invalid webhook signature')
  }
}
