// File: /app/api/stripe-webhook.js

import { buffer } from 'micro';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let data, eventType;

    // Read the incoming webhook payload and header
    const reqBuffer = await buffer(req);
    const sig = req.headers['stripe-signature'];

    try {
      let event = stripe.webhooks.constructEvent(reqBuffer, sig, webhookSecret);
      data = event.data;
      eventType = event.type;

      if (eventType === 'checkout.session.completed') {
        const session = data.object;

        // Call your function to handle the post-payment logic
        await handleSuccessfulPayment(session);
        res.status(200).json({ received: true });
      }

    } catch (error) {
      console.error(`Webhook Error: ${error.message}`);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleSuccessfulPayment(session) {
  // Implement your logic to record the transaction
  const response = await fetch(`${process.env.HOST}/api/record-transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: session.metadata.user_id, // Ensure you set user_id in metadata when creating the session
      date: new Date().toISOString().slice(0, 10),
      detail: 'Completed',
      price: session.amount_total / 100, // Convert from cents to dollars
      credits: session.amount_total / 100, // Assuming 1 credit per dollar spent
      currency: session.currency,
    }),
  });
}
    