import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function CartSuccess({
  searchParams,
}: {
  searchParams: { sessionId: string };
}) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!searchParams.sessionId) {
    redirect("/");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(
    searchParams.sessionId
  );

  return (
    <section className="mt-10 flex flex-col justify-center items-center gap-2">
      <h2>{stripeCheckoutSession.payment_status}</h2>
      <Link href={"/"} className="bg-slate-400 py-2 px-4">
        koszyk
      </Link>
    </section>
  );
}
