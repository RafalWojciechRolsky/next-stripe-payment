import { redirect } from "next/navigation";
import { FC } from "react";
import Stripe from "stripe";

interface IPropsTypes {
  name?: string;
}

const cart = {
  id: 1,
  orderItems: [
    {
      product: {
        name: "Koszulka programisty",
        price: 1999,
      },
      quantity: 2,
    },
    {
      product: {
        name: "Kubek programisty",
        price: 1299,
      },
      quantity: 1,
    },
  ],
};

const CartPage: FC<IPropsTypes> = (props) => {
  async function handleStripePaymentAction() {
    "use server";

    const striperSecretKey = process.env.STRIPE_SECRET_KEY as string;

    const stripe = new Stripe(striperSecretKey, {
      apiVersion: "2023-10-16",
      typescript: true,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        cartId: cart.id,
      },
      line_items: cart.orderItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cart/canceled`,
    });
    console.log(checkoutSession);
    if (checkoutSession.url) {
      redirect(checkoutSession.url);
    }
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cart.orderItems.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${item.product.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action={handleStripePaymentAction}>
        <button
          type="submit"
          className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200 w-full"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CartPage;
