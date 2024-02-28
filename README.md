NEXT*PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test*
STRIPE*SECRET_KEY=sk_test*
STRIPE*WEBHOOK_SECRET=whsec*

# stripe listen --forward-to localhost:3000/api/webhook/stripe

# stripe trigger checkout.session.completed --add checkout_session:metadata.cartId=123
