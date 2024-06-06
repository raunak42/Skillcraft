import { Session } from 'lucia';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { buyCourse, buyCourses, emptyCart, getUserCourses } from './helpers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINTSECRET!

export async function POST(req: NextRequest) {

  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ message: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err);
    return NextResponse.json({ message: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'payment_intent.created') {
    console.log("Payment intent created")
    //This if-check has to have some logic, a mere console log even, for the logic in the next if statement to work.
    //And this if-check has to exist.
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const courseId = parseInt(paymentIntent.metadata.courseId);
    const courseIds: number[] = JSON.parse(paymentIntent.metadata.courseIds);
    const session: Session = JSON.parse(paymentIntent.metadata.authSession);

    console.log("courseIds", courseIds)

    try {
      if (!isNaN(courseId)) { //for checkoutSession
        await buyCourse(session, courseId);
      }
      if (courseIds.length > 0) { //for cartCheckoutSession
        await buyCourses(session, courseIds);
        await emptyCart(session)
      }
    } catch (error) {
      console.error(error);
    }

    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

  } else if (event.type === 'payment_method.attached') {
    const paymentMethod = event.data.object;
    // Add your business logic here 

  } else {
    console.log(`Unhandled event type ${event.type}.`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}