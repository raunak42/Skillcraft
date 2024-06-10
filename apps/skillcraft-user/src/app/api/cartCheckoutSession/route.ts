import { BASE_URL } from '@/lib/constants';
import { handleApiError } from 'helpers';
import { Session, User } from 'lucia';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaCourseOutput } from 'types';

interface BodyType {
    courses: PrismaCourseOutput<{ select: {}, include: { admin: true, users: true } }>[],
    authSession: Session | null;
    user: User | null
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
});

export async function POST(req: Request) {
    try {
        const body: BodyType = await req.json()
        const { courses, authSession, user } = body;

        var items = []
        var courseIds = []
        for (let i = 0; i < courses.length; i++) {
            items.push(
                {
                    price_data: {
                        unit_amount: courses[i].price! * 100,
                        currency: 'inr',
                        product_data: {
                            name: courses[i].title,
                        },
                    },
                    quantity: 1,

                }
            )
            courseIds.push(courses[i].id)
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            submit_type: 'pay',
            line_items: items as [],
            mode: 'payment',
            return_url: `${BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}&courseIds=${courseIds}&userId=${authSession?.userId}`,
            payment_intent_data: {
                description: courses[0].description!,
                metadata: {
                    courseIds: JSON.stringify(courseIds),
                    authSession: JSON.stringify(authSession),
                    user: JSON.stringify(user)
                }
            },
            phone_number_collection: { enabled: true },
            billing_address_collection: "required"
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
