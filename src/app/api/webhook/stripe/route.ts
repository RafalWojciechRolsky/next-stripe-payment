/// <reference types="stripe-event-types" />

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined");
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ message: "No Signature" }, { status: 401 });
  }

  const event = stripe.webhooks.constructEvent(
    await req.text(),
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  ) as Stripe.DiscriminatedEvent;

  switch (event.type) {
    case "checkout.session.completed": {
      // mutacja do backenda
      console.log(event.data.object.metadata);

      event.data.object.metadata?.cartId as string;
    }
    case "checkout.session.async_payment_succeeded": {
      // mutacja do backenda
      event.data.object;
    }
    case "checkout.session.expired": {
      // mutacja do backenda
    }
    case "checkout.session.async_payment_failed": {
      // mutacja do backenda
    }
    default: {
      // mutacja do backenda
    }
  }

  return NextResponse.json("OK", { status: 200 });
}
export async function GET(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json("OK", { status: 200 });
}
