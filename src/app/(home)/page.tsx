import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <h1 className="mb-10">Stripe Payment</h1>
      <Link href={"/cart"} className="bg-slate-400 py-2 px-4">
        koszyk
      </Link>
    </main>
  );
}
