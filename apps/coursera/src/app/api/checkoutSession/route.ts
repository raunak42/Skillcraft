import { BASE_URL_DEV } from '@/lib/constants';
import { MetadataParam } from '@stripe/stripe-js';
import { handleApiError } from 'helpers';
import { Session, User } from 'lucia';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface BodyType {
    course: {
        name: string;
        price: number;
        imageLink: string;
        id: string | number
    },
    authSession: Session | null;
    user: User | null
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
});

export async function POST(req: Request) {
    try {
        const body: BodyType = await req.json()
        const { course, authSession, user } = body;

        const metadata: MetadataParam = {
            courseId: course.id,
            courseIds: JSON.stringify([]), //empty array because this is not cart
            authSession: JSON.stringify(authSession),
            user: JSON.stringify(user)
        }

        const session = await stripe.checkout.sessions.create({
            currency: 'inr',
            ui_mode: 'embedded',
            submit_type: 'pay',
            line_items: [
                {
                    price_data: {
                        unit_amount: course.price * 100,
                        currency: 'inr',
                        product_data: {
                            name: course.name,
                        },
                    },
                    quantity: 1,

                }
            ],
            mode: 'payment',
            return_url: `${BASE_URL_DEV}/return?session_id={CHECKOUT_SESSION_ID}&courseId=${course.id}&userId=${authSession?.userId}`,
            payment_intent_data: {
                description: course.name,
                metadata: metadata
            },
            phone_number_collection: { enabled: true },
            billing_address_collection: 'required',
        });

        return NextResponse.json({ clientSecret: session.client_secret });
    } catch (err: any) {
        return handleApiError(err)
    }
}

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.nextUrl.searchParams.get('session_id');
        if (!sessionId) {
            return new NextResponse('Missing session_id', { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return NextResponse.json({
            status: session.status,
            customer_email: session.customer_details?.email,
        });
    } catch (err: any) {
        return new NextResponse(`Error: ${err.message}`, { status: err.statusCode || 500 });
    }
}
