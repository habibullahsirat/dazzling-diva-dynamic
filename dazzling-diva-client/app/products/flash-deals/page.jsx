import ProductGrid from "@/components/Product/ProductGrid";

async function getFlashDeals() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/flash-deals-products`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch flash deals");
  }

  return res.json();
}

export default async function FlashDealsPage() {
  const products = await getFlashDeals();

  return (
    <ProductGrid
      title="Flash Deals"
      subtitle="Limited time offers"
      products={products}
    />
  );
}
