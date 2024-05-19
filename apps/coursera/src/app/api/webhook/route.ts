import { Session } from 'lucia';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { buyCourse, buyCourses, emptyCart, getUserCourses } from './helpers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const endpointSecret = 'whsec_23af65fd0856b9fc84a7ca275a76783571136454f460efbc861bdb982164f19b';

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
    const paymentIntent = event.data.object;
    const courseId = parseInt(paymentIntent.metadata.courseId);
    const courseIds = JSON.parse(paymentIntent.metadata.courseIds);
    const session: Session = JSON.parse(paymentIntent.metadata.authSession);

    const purchasedCourses = await getUserCourses(session.userId);
    if (purchasedCourses instanceof Response) {
      const response = purchasedCourses;
      return response;
    }
    const courseAlreadyPurchased = purchasedCourses.find((t) => t.id === courseId);
    if (courseAlreadyPurchased) {
      // return apiResponse({ message: "already purchased the course" }, 409)
      console.log(`Already purchased the course. PaymentIntent for ${paymentIntent.amount} failed.`)
      return new Response("Already purchased the course.");
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const courseId = parseInt(paymentIntent.metadata.courseId);
    const courseIds: number[] = JSON.parse(paymentIntent.metadata.courseIds);
    const session: Session = JSON.parse(paymentIntent.metadata.authSession);

    console.log(courseId)
    console.log(courseIds)


    try {
      if (!isNaN(courseId)) {
        await buyCourse(session, courseId);
      }
      if (courseIds.length > 0) {
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