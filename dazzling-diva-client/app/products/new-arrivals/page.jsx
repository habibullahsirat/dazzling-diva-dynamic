import ProductGrid from "@/components/Product/ProductGrid";

async function getNewArrivals() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/new-arrivals-products`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch new arrivals");
  }

  return res.json();
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <ProductGrid
      title="New Arrivals"
      subtitle="Fresh drops"
      products={products}
    />
  );
}
