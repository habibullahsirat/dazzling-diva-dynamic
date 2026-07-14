import ProductGrid from "@/components/Product/ProductGrid";

async function getMostLovedProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/most-loved-products`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch most loved products");
  }

  return res.json();
}

export default async function MostLovedPage() {
  const products = await getMostLovedProducts();

  return (
    <ProductGrid
      title="Most Loved"
      subtitle="Customer favorites"
      products={products}
    />
  );
}
