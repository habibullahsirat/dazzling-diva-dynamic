import ProductGrid from "@/components/Product/ProductGrid";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <ProductGrid
      title="All Products"
      subtitle="Explore our collection"
      products={products}
    />
  );
}
