import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
// import { buffer } from 'micro';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';



export async function POST(req: Request) {
  const headersList = headers();
  const sig = headersList.get('stripe-signature')!;
  let event;

  try {
    const buf = await req.text();
    const rawBody = Buffer.from(buf);
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const data = event.data.object as Stripe.Subscription;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscriptionId = data.id;
      const stripeCustomerId = data.customer;
      const subscriptionStatus = data.status;

      // Update subscription status in your database
      try {
        await prisma.user.updateMany({
          where: { stripeCustomerId: stripeCustomerId.toString() },
          data: {
        subscriptionStatus,
        stripeSubscriptionId: subscriptionId,
          },
        });
        console.log("DOES THIS MEAN IT WORKED???????", stripeCustomerId, subscriptionStatus,subscriptionId)
      } catch (error) {
        console.error('Failed to update subscription status:', error);
        return NextResponse.json(
          { error: 'Failed to update subscription status' },
          { status: 500 }
        );
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
